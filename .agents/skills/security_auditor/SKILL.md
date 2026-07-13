---
name: "security-auditor"
description: "Auditoría de seguridad del sitio USGAR Hotels. Busca vulnerabilidades asumiendo un usuario malicioso: SQL injection, XSS, CORS wildcard, credenciales expuestas, path traversal, SSRF, webhook sin verificación HMAC, mock bypass en producción, XML injection en QloApps, race conditions en JSON, falta de rate limiting y CSRF, validación de inputs en PHP."
---

# Auditoría de Seguridad — USGAR Hotels

## Propósito

Revisar todo el código PHP y frontend buscando vulnerabilidades de seguridad
que un usuario malicioso podría explotar. Se asume el peor caso: el atacante
conoce la estructura del código (es open source).

## MCPs Requeridos

- **filesystem** — Para leer todos los archivos PHP
- **sequential-thinking** — Para analizar cada vector de ataque
- **context7** — Para verificar best practices de seguridad

## OWASP Top 10 Relevante

Este proyecto es vulnerable principalmente a:
1. **A01: Broken Access Control** — No hay autenticación en endpoints
2. **A03: Injection** — SQL, XML, y command injection
3. **A05: Security Misconfiguration** — CORS wildcard, mock bypass
4. **A07: Identity and Auth Failures** — Webhook sin verificación de firma

## Checklist de Seguridad

### Vector 1: SQL Injection

**Archivos a revisar:**
- `public/api/qloapp/QloAppReader.php`

**Qué buscar:** Queries con variables interpoladas directamente (sin prepared statements).

**Estado actual:** `QloAppReader.php` usa prepared statements (`$pdo->prepare()`), pero
la query en línea 27-32 no tiene parámetros dinámicos del usuario, así que es segura.
Sin embargo, verificar si se agregan queries futuras con input del usuario.

**`db.php`:** Las funciones `saveBooking()` y `getBooking()` usan prepared statements ✅

### Vector 2: XSS (Cross-Site Scripting)

**Archivos a revisar:**
- `public/api/channex/booking.php` línea 48: solo `guestName` usa `htmlspecialchars()`
- `guestEmail` y `guestPhone` NO se sanitizan

**Verificar:** ¿Los datos de booking se muestran en alguna página sin escapar?
Si `book/success.astro` muestra `guestName` o `guestEmail`, hay riesgo de XSS almacenado.

**Acción requerida:** Aplicar `htmlspecialchars()` a TODOS los campos de texto del usuario.

### Vector 3: CORS Wildcard

**Archivo:** `public/api/db.php` línea 4

```php
header("Access-Control-Allow-Origin: *");
```

**Riesgo:** Cualquier sitio web puede hacer peticiones a tu API.
**Acción requerida:** Cambiar a:
```php
header("Access-Control-Allow-Origin: https://usgarhoteles.com");
```

### Vector 4: Webhook Mock Bypass

**Archivo:** `public/api/webhook-mercado-pago.php` línea 14

```php
$mock = isset($_GET['mock']) && $_GET['mock'] === 'true';
```

**Riesgo CRÍTICO:** Un atacante puede hacer:
```
GET /api/webhook-mercado-pago?topic=payment&id=123&mock=true&bookingId=CART-123
```
Esto confirma un pago SIN que se haya hecho realmente.

**Acción requerida:** Eliminar el parámetro `mock` en producción, o condicionarlo:
```php
$isDev = getEnvValue('APP_ENV', 'production') === 'development';
$mock = $isDev && isset($_GET['mock']) && $_GET['mock'] === 'true';
```

### Vector 5: Webhook sin Verificación HMAC

**Archivo:** `public/api/webhook-mercado-pago.php`

**Problema:** El webhook no verifica la firma HMAC de Mercado Pago.
Cualquiera que conozca la URL puede enviar webhooks falsos.

**Acción requerida:** Verificar el header `x-signature` de Mercado Pago.

### Vector 6: Path Traversal / LFI

**Archivo:** `router.php` línea 43-48

```php
if (preg_match('#^/api/([^/]+)$#', $uri, $matches)) {
    $script = __DIR__ . '/public/api/' . $matches[1] . '.php';
```

**Riesgo:** El regex `[^/]+` previene traversal con `/`, pero no con null bytes
o encodings alternativos en versiones antiguas de PHP.

**Estado:** En PHP 8.1+ los null bytes están bloqueados. Riesgo BAJO.

### Vector 7: XML Injection

**Archivo:** `public/api/qloapp/QloAppWriter.php` líneas 61-68 y 86-101

```php
$xmlData = <<<XML
<prestashop>
    <order>
        <id_cart>{$cartId}</id_cart>
        <total_paid>{$totalPrice}</total_paid>
```

**Riesgo:** Si `$cartId` o `$totalPrice` contienen caracteres XML especiales
(`<`, `>`, `&`), se puede inyectar XML arbitrario.

**Acción requerida:** Usar `htmlspecialchars($cartId, ENT_XML1)` o construir XML con DOM.

### Vector 8: Race Condition en JSON

**Archivo:** `public/api/db.php` línea 194

```php
file_put_contents($path, json_encode($bookings, JSON_PRETTY_PRINT));
```

**Riesgo:** Dos requests simultáneos pueden sobreescribir datos.
**Acción requerida:** Usar `LOCK_EX`:
```php
file_put_contents($path, json_encode($bookings, JSON_PRETTY_PRINT), LOCK_EX);
```

### Vector 9: Falta de Rate Limiting

**Ningún endpoint tiene rate limiting.**

**Riesgo:** Un atacante puede:
- Hacer miles de búsquedas de disponibilidad (DoS a Channex API)
- Crear miles de carritos en QloApps
- Enviar miles de webhooks falsos

**Acción requerida:** Implementar rate limiting básico por IP (usando archivo o Redis).

### Vector 10: Sin CSRF Protection

**Los formularios del frontend** no envían tokens CSRF.

**Riesgo:** Un sitio malicioso puede hacer que un usuario autenticado envíe
formularios a tu API sin su consentimiento.

**Nota:** Dado que no hay sesiones de usuario (el hotel no tiene login de huéspedes),
el riesgo es BAJO. Pero si se agrega un panel admin, es CRÍTICO.

### Vector 11: Validación de Inputs

**Archivos:** `availability.php`, `booking.php`, `create-preference.php`

**Verificar:**
- [ ] `checkIn` y `checkOut` validan formato de fecha (YYYY-MM-DD)
- [ ] `checkIn` no es en el pasado
- [ ] `checkOut` es posterior a `checkIn`
- [ ] `guests` es un número positivo razonable (1-20)
- [ ] `guestEmail` es un email válido
- [ ] `guestPhone` es un número de teléfono válido
- [ ] `roomId` existe en la lista de habitaciones válidas

### Vector 12: Archivos Sensibles Accesibles

**Verificar que estos archivos NO sean accesibles vía web:**
- [ ] `.env` — ¿Está fuera de `public/`? ✅
- [ ] `data/bookings.json` — ¿`getDbPath()` puede caer a `public/api/bookings.json`? ⚠️ SÍ (línea 89 de db.php)
- [ ] `router.php` — ¿Solo se ejecuta en dev? ✅

## Severidad de Hallazgos

| Vector | Severidad | Explotable Ahora |
|---|---|---|
| Mock Bypass Webhook | 🔴 CRÍTICA | Sí |
| Webhook sin HMAC | 🔴 CRÍTICA | Sí |
| CORS Wildcard | 🟠 ALTA | Sí |
| XML Injection | 🟠 ALTA | Solo con QloApps activo |
| XSS parcial | 🟡 MEDIA | Depende de output |
| Race Condition JSON | 🟡 MEDIA | Bajo volumen |
| Sin Rate Limiting | 🟡 MEDIA | Sí |
| Path Traversal | 🟢 BAJA | PHP 8.1+ mitiga |
| Sin CSRF | 🟢 BAJA | No hay sesiones |

## Formato de Reporte

Crear un artifact `audit_security_results.md` con:

```markdown
# Auditoría de Seguridad — Resultados
Fecha: [fecha]

## 🔴 Vulnerabilidades Críticas
- [descripción + archivo + línea + fix sugerido]

## 🟠 Vulnerabilidades Altas
- [descripción + archivo + línea + fix sugerido]

## 🟡 Vulnerabilidades Medias
- [descripción + archivo + línea + fix sugerido]

## 🟢 Vulnerabilidades Bajas
- [descripción + archivo + línea + fix sugerido]

## Resumen Ejecutivo
[párrafo de resumen para el dueño del proyecto]
```
