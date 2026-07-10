<?php
// create-preference.php - Handles Mercado Pago preference creation

require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

$inputJSON = file_get_contents('php://input');
$body = json_decode($inputJSON, TRUE);

$bookingId = isset($body['bookingId']) ? $body['bookingId'] : null;
$roomId = isset($body['roomId']) ? $body['roomId'] : null;
$checkIn = isset($body['checkIn']) ? $body['checkIn'] : null;
$checkOut = isset($body['checkOut']) ? $body['checkOut'] : null;
$guestName = isset($body['guestName']) ? $body['guestName'] : null;
$guestEmail = isset($body['guestEmail']) ? $body['guestEmail'] : null;

if (!$bookingId || !$checkIn || !$checkOut || !$guestName || !$guestEmail) {
    sendError('Missing required preference parameters', 400);
}

$nights = daysBetween($checkIn, $checkOut);
// Fallback total price if no DB lookup is performed here
$totalPrice = 50 * $nights; 

$mpAccessToken = getEnvValue('MERCADO_PAGO_ACCESS_TOKEN');
$siteUrl = getEnvValue('SITE_URL', 'http://localhost:4321');

if (empty($mpAccessToken) || strpos($mpAccessToken, 'APP_USR') === false) {
    // Mock mode
    $params = http_build_query([
        'bookingId' => $bookingId,
        'amount' => $totalPrice,
        'checkIn' => $checkIn,
        'checkOut' => $checkOut,
        'guestName' => $guestName,
        'guestEmail' => $guestEmail
    ]);
    $initPoint = "/book/mock-payment?" . $params;
    sendJson([
        'id' => 'MOCK-PREF-' . time(),
        'init_point' => $initPoint,
        'sandbox_init_point' => $initPoint
    ]);
}

// Production: Call real Mercado Pago API
$mpBody = [
    'items' => [[
        'title' => "USGAR Hotels — Room " . $roomId,
        'description' => "{$nights} noches ({$checkIn} → {$checkOut})",
        'quantity' => 1,
        'unit_price' => (float)$totalPrice,
        'currency_id' => 'USD'
    ]],
    'external_reference' => (string)$bookingId, // Passes the QloApp Cart ID to Mercado Pago
    'back_urls' => [
        'success' => "{$siteUrl}/book/success?bookingId={$bookingId}",
        'failure' => "{$siteUrl}/book?error=payment_failed&bookingId={$bookingId}",
        'pending' => "{$siteUrl}/book/success?status=pending&bookingId={$bookingId}"
    ],
    'auto_return' => 'approved',
    'notification_url' => "{$siteUrl}/api/webhook-mercado-pago"
];

$ch = curl_init('https://api.mercadopago.com/checkout/preferences');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer {$mpAccessToken}",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($mpBody));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 400 || empty($response)) {
    error_log("[Mercado Pago Error] HTTP {$httpCode}: {$response}");
    sendError('Failed to create Mercado Pago preference', 500);
}

header('Content-Type: application/json');
echo $response;
exit();
