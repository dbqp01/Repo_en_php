<?php
// create-preference.php - Handles Mercado Pago preference creation

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/rooms.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

// Get raw post data
$inputJSON = file_get_contents('php://input');
$body = json_decode($inputJSON, TRUE);

$bookingId = isset($body['bookingId']) ? $body['bookingId'] : null;
$roomId = isset($body['roomId']) ? $body['roomId'] : null;
$checkIn = isset($body['checkIn']) ? $body['checkIn'] : null;
$checkOut = isset($body['checkOut']) ? $body['checkOut'] : null;
$guests = isset($body['guests']) ? $body['guests'] : null;
$guestName = isset($body['guestName']) ? $body['guestName'] : null;
$guestEmail = isset($body['guestEmail']) ? $body['guestEmail'] : null;
$guestPhone = isset($body['guestPhone']) ? $body['guestPhone'] : '';

if (!$bookingId || !$roomId || !$checkIn || !$checkOut || !$guestName || !$guestEmail) {
    sendError('Missing required preference parameters', 400);
}

global $rooms;
if (!isset($rooms[$roomId])) {
    sendError('Invalid room type', 400);
}

$room = $rooms[$roomId];
$nights = daysBetween($checkIn, $checkOut);
$totalPrice = $room['pricePerNight'] * $nights;

$mpAccessToken = getEnvValue('MERCADO_PAGO_ACCESS_TOKEN');
$isMock = empty($mpAccessToken);

if ($isMock) {
    $params = http_build_query([
        'bookingId' => $bookingId,
        'roomName' => $room['name']['en'],
        'amount' => $totalPrice,
        'checkIn' => $checkIn,
        'checkOut' => $checkOut,
        'guestName' => $guestName,
        'guestEmail' => $guestEmail
    ]);
    
    $initPoint = "/book/mock-payment?" . $params;
    
    sendJson([
        'id' => 'MOCK-PREF-' . round(microtime(true) * 1000),
        'init_point' => $initPoint,
        'sandbox_init_point' => $initPoint,
        '_mock' => true
    ]);
}

// Production: Call real Mercado Pago API
$siteUrl = getEnvValue('SITE_URL', 'http://localhost:4321');

$mpBody = [
    'items' => [[
        'title' => "USGAR Hotels — " . $room['name']['en'],
        'description' => "{$nights} noches ({$checkIn} → {$checkOut})",
        'quantity' => 1,
        'unit_price' => $totalPrice,
        'currency_id' => 'USD'
    ]],
    'external_reference' => $bookingId,
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

if ($httpCode >= 400) {
    // Fallback if API fails
    $params = http_build_query([
        'bookingId' => $bookingId,
        'roomName' => $room['name']['en'],
        'amount' => $totalPrice,
        'checkIn' => $checkIn,
        'checkOut' => $checkOut,
        'guestName' => $guestName,
        'guestEmail' => $guestEmail
    ]);
    
    $initPoint = "/book/mock-payment?" . $params;
    
    sendJson([
        'id' => 'MOCK-PREF-FALLBACK-' . round(microtime(true) * 1000),
        'init_point' => $initPoint,
        'sandbox_init_point' => $initPoint,
        '_mock' => true
    ]);
}

header('Content-Type: application/json');
echo $response;
exit();
