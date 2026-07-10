Plan de Cambios y Especificaciones Técnicas: USGAR HotelsProyecto: Rediseño e Integración de Contenido para USGAR Hotels (San Pedro, Cusco)Entorno Tecnológico: Arquitectura PHP (Repo_en_php)Fecha: 10 de julio de 20261. Introducción y ObjetivosEste documento actúa como guía maestra para la reestructuración visual, de experiencia de usuario (UX/UI) y de contenido del sitio web de USGAR Hotels. Los objetivos principales son:Consolidar la nueva identidad corporativa basada en la Opción 3 de diseño de marca.Actualizar el contenido institucional de la empresa (misión, visión, valores).Refinar la oferta de servicios del hotel tanto generales como dentro de la habitación.Sincronizar las tarifas y nombres de las habitaciones.Proveer una guía técnica para realizar los cambios directamente en la estructura de un repositorio PHP.2. Identidad Visual e Identidad de Marca (Opción 3)2.1 LogotipoEl logotipo seleccionado es la Opción 3, que cuenta con un isotipo en forma de "U" con líneas curvas internas y una disposición tipográfica específica.Isotipo (Emblema): Símbolo con forma de "U" estilizada con arcos concéntricos.Tipografías del Logotipo:"USGAR": Tipografía principal en fuente A AKHIN TAHUN (caracteres en caja alta, bold y robustos)."HOTELS": Subtexto en fuente Kravitz extra THERMAL (estilo serif con terminaciones marcadas y extendidas).Variantes de Aplicación:Fondo Claro (Light Mode / Header Estándar): Isotipo en colores corporativos (ver sección 2.2), texto "USGAR HOTELS" en negro o gris oscuro.Fondo Oscuro (Dark Mode / Hero Section / Footer): Isotipo en colores corporativos, texto "USGAR HOTELS" en color blanco puro (#FFFFFF).2.2 Paleta de Colores OficialSe implementará el esquema cromático detallado en la marca para la interfaz de usuario (fondos, botones, enlaces, bordes, elementos decorativos):CategoríaNombre SugeridoCódigo HexadecimalUso Recomendado en UIMoradosMorado Oscuro#4A3056Encabezados, botones primarios, fondos de contrasteMorado Medio#9360ACElementos activos, hover en botones primariosMorado Suave#A980BDBordes, iconos decorativosMorado Pastel#D4BFDEFondos secundarios de tarjetasMorado Ultra Claro#E9DFEEFondo general de páginas o bloques de textoAmarillosDorado Oscuro#B09815Destacados de precios, estrellas de calificaciónAmarillo Base#EACA1CBotones de llamado a la acción (CTA) secundariosAmarillo Suave#F2DF77Fondos de avisos o promocionesCrema Activo#F7EAA4Sombreados de inputsCrema Fondo#FBF4D2Fondos de cajas de testimoniosVerdesVerde Pino#065952Texto de éxito, botones de reserva directaTurquesa#0CB2A3Enlaces dinámicos, detalles visualesVerde Menta#6DD1C8Iconos de serviciosVerde Pastel#9EE0DABordes de tarjetas de habitacionesVerde Ultra Claro#CEF0EDFondos de tarjetas de servicios2.3 Tipografía de la WebToda la tipografía global del sitio web debe migrar a la fuente elegida para mantener consistencia con la marca:Tipografía Primaria: A Akhin Tahun (para encabezados <h1>, <h2>, <h3> y elementos destacados del portal).Tipografía Secundaria: Una fuente sans-serif altamente legible (ej. Inter, Montserrat o Poppins) para textos de párrafos largos y descripciones detalladas.3. Cambios en la Interfaz de Usuario (UI/UX)Visibilidad y Tamaño de Iconos:Los iconos del portal (redes sociales, idiomas, menús desplegables) deben hacerse más grandes y con un mayor ratio de contraste.Se aplicará un tamaño mínimo de tap target de 44px x 44px en móviles para cumplir con estándares de usabilidad táctil.Ajustes de Botones:Los botones interactivos como "Reserva Tu Estadía" o "Explorar Habitaciones" deben tener un padding mayor (ej. padding: 12px 24px) y bordes ligeramente redondeados (border-radius: 8px), usando los colores de contraste (Morado Oscuro #4A3056 y Amarillo Base #EACA1C).Galería / Carrusel de Portada (Hero Section):Configurar el slider principal o el grid de portada para mostrar, de manera prioritaria y secuencial, fotos/videos de alta calidad de:El Patio del hotel (ambiente principal).La Recepción (calidez en la bienvenida).Habitación Matrimonial.Vista panorámica o de Cusco (contexto local).Fotografías de Habitaciones:Actualizar las tarjetas de las habitaciones en la sección de alojamiento. Cada una debe incluir un slider interno con:Vista de la habitación completa.Detalles decorativos/textiles locales.Enfoque en las camas de la habitación.4. Contenido e Información InstitucionalDebe sustituirse o agregarse el texto institucional en la sección "Nosotros" o "Quiénes Somos":4.1 Propósito, Misión y VisiónPropósito:Crear experiencias memorables que permitan a cada viajero descubrir la esencia de Cusco, brindando un servicio cálido, personalizado y de excelencia que haga de cada estadía un recuerdo inolvidable.Misión:Brindar una experiencia de hospedaje única en el corazón de Cusco, ofreciendo un servicio personalizado, cálido y de alta calidad que combine confort, hospitalidad y la riqueza de la cultura local. Nos comprometemos a superar las expectativas de nuestros huéspedes mediante una atención excepcional, un equipo humano apasionado y prácticas de turismo sostenible que generen recuerdos inolvidables.Visión:Ser el hotel referente de Cusco, manteniendo la esencia de nuestra cultura. Aspiramos a ser la primera elección de los viajeros que buscan excelencia, calidez y un servicio personalizado, distinguiéndonos por nuestra hospitalidad, innovación y compromiso con la sostenibilidad. Buscamos crear un impacto positivo en nuestros huéspedes, colaboradores y comunidad, promoviendo un turismo responsable que valore y preserve el patrimonio cultural y natural del Cusco.4.2 Valores de MarcaHospitalidad: Recibimos a cada huésped con calidez, amabilidad y un trato cercano, haciendo que se sienta como en casa desde su llegada.Excelencia: Buscamos la mejora continua para ofrecer un servicio de alta calidad que supere las expectativas de nuestros huéspedes.Autenticidad: Compartimos la riqueza cultural de Cusco a través de experiencias genuinas que conectan a nuestros visitantes con la identidad local.Respeto: Actuamos con integridad y consideración hacia nuestros huéspedes, colaboradores, proveedores, la comunidad y el medio ambiente.Compromiso: Trabajamos con responsabilidad, dedicación y pasión para garantizar una experiencia memorable en cada estancia.Sostenibilidad: Promovemos un turismo responsable mediante prácticas que contribuyen a la conservación del entorno natural y el patrimonio cultural.Trabajo en equipo: Fomentamos la colaboración, la comunicación y el apoyo mutuo para brindar un servicio eficiente y de excelencia.Innovación: Incorporamos nuevas ideas y soluciones que mejoran continuamente la experiencia de nuestros huéspedes y la calidad de nuestros servicios.5. Tarifas y Servicios Detallados5.1 Tabla de Habitaciones y TarifasSe debe actualizar el tarifario oficial de las habitaciones con los siguientes nombres comerciales y precios en USD (Dólares Americanos):Tipo de HabitaciónTarifa por Noche (USD)Habitación Matrimonial Superior$90.00 USDHabitación Doble Superior$90.00 USDHabitación Triple Estándar$120.00 USDHabitación Superior Familiar$150.00 USD5.2 Servicios Generales (Hotel)Desayuno buffet de 4:30 am – 10:00 am.Check-in: 12:00 hrs.Check-out: 10:30 hrs.Conexión Wi-Fi gratuita de alta velocidad en todo el establecimiento.Cafetería abierta hasta las 22:00 hrs.Servicio de oxígeno de cortesía (esencial para la aclimatación en Cusco).Estación de bebidas calientes de cortesía (mates tradicionales, café).Servicio de lavandería (con costo adicional).Servicio de traslado (con costo adicional).Tienda de souvenirs local.Habitaciones 100% libres de humo (No fumadores).Departamento de custodia de maletas y equipaje.Recepción disponible las 24 horas.Personal bilingüe (Español / Inglés).5.3 Servicios en la Habitación (Amenidades)Baño privado equipado con ducha de agua caliente.Secadora de cabello.Kit de infusiones de cortesía en la habitación.TV con servicio de cable.Teléfono de marcado interno.Caja de seguridad digital.Calefactor ambiental para noches frías.6. Guía Técnica de Implementación en el Repositorio PHPDado que el proyecto está estructurado sobre PHP, la estrategia de desarrollo se enfocará en modularidad y herencia de vistas utilizando los patrones comunes de desarrollo web en este entorno.6.1 Configuración de Fuentes y Estilos (CSS / SCSS)Para cargar las fuentes locales de manera correcta y asignar las variables de CSS en un archivo global (comúnmente style.css o main.css), se debe insertar el siguiente código:/* ==========================================================================
   Fuentes Corporativas - USGAR Hotels
   ========================================================================== */
@font-face {
    font-family: 'A Akhin Tahun';
    src: url('../fonts/a-akhin-tahun.woff2') format('woff2'),
         url('../fonts/a-akhin-tahun.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Kravitz Extra Thermal';
    src: url('../fonts/kravitz-extra-thermal.woff2') format('woff2'),
         url('../fonts/kravitz-extra-thermal.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

/* ==========================================================================
   Variables de Paleta de Colores y Tipografías
   ========================================================================== */
:root {
    /* Paleta Morados */
    --color-purple-dark: #4A3056;
    --color-purple-medium: #9360AC;
    --color-purple-light: #A980BD;
    --color-purple-pastel: #D4BFDE;
    --color-purple-bg: #E9DFEE;

    /* Paleta Amarillos / Dorados */
    --color-gold-dark: #B09815;
    --color-yellow-base: #EACA1C;
    --color-yellow-soft: #F2DF77;
    --color-cream-active: #F7EAA4;
    --color-cream-bg: #FBF4D2;

    /* Paleta Verdes / Turquesas */
    --color-green-dark: #065952;
    --color-turquoise: #0CB2A3;
    --color-mint: #6DD1C8;
    --color-green-pastel: #9EE0DA;
    --color-green-bg: #CEF0ED;

    /* Fuentes */
    --font-primary: 'A Akhin Tahun', sans-serif;
    --font-secondary: 'Montserrat', sans-serif;
}

/* Aplicación de Tipografía Global */
body {
    font-family: var(--font-secondary);
    background-color: #ffffff;
    color: #333333;
}

h1, h2, h3, h4, h5, h6, .brand-title {
    font-family: var(--font-primary);
    color: var(--color-purple-dark);
}

/* Botones interactivos más grandes */
.btn-primary {
    background-color: var(--color-purple-dark);
    color: #ffffff;
    padding: 12px 28px;
    border-radius: 8px;
    font-family: var(--font-secondary);
    font-weight: 600;
    transition: background-color 0.3s ease;
    border: none;
}

.btn-primary:hover {
    background-color: var(--color-purple-medium);
}

/* Iconos de Navegación más grandes */
.navbar-icon {
    font-size: 1.5rem; /* ~24px */
    padding: 8px;
    color: var(--color-purple-dark);
    transition: color 0.3s ease;
}
6.2 Modificación de Datos de Habitaciones (PHP Arrays)Si tu repositorio gestiona el contenido de manera dinámica mediante estructuras de datos PHP (lo cual es recomendado para no duplicar código en las vistas de habitaciones), actualiza la base de datos o el archivo de configuración config.php o habitaciones_data.php con el siguiente arreglo relacional:<?php
// habitaciones_data.php

$habitaciones = [
    'matrimonial-superior' => [
        'nombre' => 'Habitación Matrimonial Superior',
        'precio' => 90.00,
        'precio_formateado' => '$90.00 USD',
        'imagenes' => [
            'assets/img/habitaciones/matrimonial-completa.jpg',
            'assets/img/habitaciones/matrimonial-detalles.jpg',
            'assets/img/habitaciones/matrimonial-cama.jpg'
        ],
        'amenidades' => [
            'Baño privado con ducha',
            'Secadora de cabello',
            'Kit de infusiones de cortesía',
            'TV con cable',
            'Teléfono',
            'Caja de seguridad',
            'Calefactor'
        ]
    ],
    'doble-superior' => [
        'nombre' => 'Habitación Doble Superior',
        'precio' => 90.00,
        'precio_formateado' => '$90.00 USD',
        'imagenes' => [
            'assets/img/habitaciones/doble-completa.jpg',
            'assets/img/habitaciones/doble-detalles.jpg',
            'assets/img/habitaciones/doble-cama.jpg'
        ],
        'amenidades' => [
            'Baño privado con ducha',
            'Secadora de cabello',
            'Kit de infusiones de cortesía',
            'TV con cable',
            'Teléfono',
            'Caja de seguridad',
            'Calefactor'
        ]
    ],
    'triple-estandar' => [
        'nombre' => 'Habitación Triple Estándar',
        'precio' => 120.00,
        'precio_formateado' => '$120.00 USD',
        'imagenes' => [
            'assets/img/habitaciones/triple-completa.jpg',
            'assets/img/habitaciones/triple-detalles.jpg',
            'assets/img/habitaciones/triple-cama.jpg'
        ],
        'amenidades' => [
            'Baño privado con ducha',
            'Secadora de cabello',
            'Kit de infusiones de cortesía',
            'TV con cable',
            'Teléfono',
            'Caja de seguridad',
            'Calefactor'
        ]
    ],
    'superior-familiar' => [
        'nombre' => 'Habitación Superior Familiar',
        'precio' => 150.00,
        'precio_formateado' => '$150.00 USD',
        'imagenes' => [
            'assets/img/habitaciones/familiar-completa.jpg',
            'assets/img/habitaciones/familiar-detalles.jpg',
            'assets/img/habitaciones/familiar-cama.jpg'
        ],
        'amenidades' => [
            'Baño privado con ducha',
            'Secadora de cabello',
            'Kit de infusiones de cortesía',
            'TV con cable',
            'Teléfono',
            'Caja de seguridad',
            'Calefactor'
        ]
    ]
];
6.3 Distribución de Archivos en el Servidor (Estructura de Directorios)Para mantener ordenado el repositorio en GitHub, asegúrate de colocar cada recurso nuevo en su carpeta correspondiente dentro de tu arquitectura web:Repo_en_php/
│
├── assets/
│   ├── css/
│   │   └── style.css            <-- Configuración de las variables de color y fuentes
│   ├── fonts/
│   │   ├── a-akhin-tahun.woff2  <-- Archivo de la fuente principal
│   │   └── kravitz-thermal.woff2<-- Archivo de la fuente secundaria del logo
│   └── img/
│       ├── logo-usgar-light.svg <-- Logo Opción 3 para cabecera clara
│       ├── logo-usgar-dark.svg  <-- Logo Opción 3 para pie de página / Hero oscuro
│       ├── portada/
│       │   ├── 1-patio.jpg
│       │   ├── 2-recepcion.jpg
│       │   ├── 3-matrimonial.jpg
│       │   └── 4-cusco.jpg
│       └── habitaciones/
│           └── [fotos por habitación: completa, detalles, camas]
│
├── includes/
│   ├── header.php               <-- Modificar logotipo en la barra de navegación y tamaño de iconos
│   ├── footer.php               <-- Modificar logotipo en fondo oscuro y enlaces
│   └── habitaciones_data.php    <-- Archivo con el array de datos de habitaciones
│
├── index.php                    <-- Cambiar slider de portada y agregar Propósito, Misión y Visión
├── habitaciones.php             <-- Vista que carga el array dinámicamente y renderiza tarifas actualizadas
└── servicios.php                <-- Detallar la lista de servicios generales y de habitación
Fin de especificaciones para USGAR Hotels.