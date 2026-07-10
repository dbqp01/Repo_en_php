<?php
// QloAppWriter.php - Handles write operations via QloApp Web Services API

require_once __DIR__ . '/../db.php';

class QloAppWriter {
    private $apiUrl;
    private $apiKey;

    public function __construct() {
        // En tu entorno de Hostinger, usaremos el subdominio que acabas de crear
        $this->apiUrl = getEnvValue('QLOAPP_API_URL', 'https://cms.usgarhoteles.com/api');
        $this->apiKey = getEnvValue('QLOAPP_API_KEY');
    }

    /**
     * Executes a cURL request to the QloApp Web Services API
     */
    private function executeRequest($endpoint, $method = 'GET', $xmlData = null) {
        $url = rtrim($this->apiUrl, '/') . '/' . ltrim($endpoint, '/');
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // Using Basic Auth for Prestashop/QloApp Web Services (API key as username, empty password)
        curl_setopt($ch, CURLOPT_USERPWD, $this->apiKey . ':');
        
        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlData);
        } elseif ($method === 'PUT') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
            curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlData);
        }
        
        if ($xmlData) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: text/xml']);
        }
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode >= 400) {
            error_log("[QloApp API Error] HTTP {$httpCode}: " . $response);
            return null;
        }
        
        return $response ? simplexml_load_string($response) : null;
    }

    /**
     * Creates a temporary cart and returns the Cart ID.
     */
    public function createCart($checkIn, $checkOut, $roomId, $guests) {
        if (!$this->apiKey) {
            return 'MOCK-CART-' . time();
        }
        
        // Example XML payload for Prestashop Cart
        $xmlData = <<<XML
<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
    <cart>
        <id_currency>1</id_currency>
        <id_lang>1</id_lang>
    </cart>
</prestashop>
XML;
        
        $response = $this->executeRequest('carts', 'POST', $xmlData);
        if ($response && isset($response->cart->id)) {
            return (string) $response->cart->id;
        }
        
        return 'FALLBACK-CART-' . time();
    }

    /**
     * Confirms the order (after Mercado Pago payment is approved)
     */
    public function confirmOrder($cartId, $totalPrice, $guestName, $guestEmail) {
        if (!$this->apiKey || strpos($cartId, 'MOCK') !== false || strpos($cartId, 'FALLBACK') !== false) {
            return 'MOCK-ORDER-' . time();
        }
        
        $xmlData = <<<XML
<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
    <order>
        <id_cart>{$cartId}</id_cart>
        <id_currency>1</id_currency>
        <id_lang>1</id_lang>
        <module>mercadopago</module>
        <payment>Mercado Pago</payment>
        <total_paid>{$totalPrice}</total_paid>
        <total_paid_real>{$totalPrice}</total_paid_real>
        <total_products>{$totalPrice}</total_products>
        <total_products_wt>{$totalPrice}</total_products_wt>
        <current_state>2</current_state> <!-- 2 means Payment Accepted -->
    </order>
</prestashop>
XML;

        $response = $this->executeRequest('orders', 'POST', $xmlData);
        if ($response && isset($response->order->id)) {
            return (string) $response->order->id;
        }
        
        return null;
    }
}
