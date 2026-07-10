<?php
// booking.php - Creates a new booking in pending state

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../rooms.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

$inputJSON = file_get_contents('php://input');
$body = json_decode($inputJSON, TRUE);

$roomId = isset($body['roomId']) ? $body['roomId'] : null;
$checkIn = isset($body['checkIn']) ? $body['checkIn'] : null;
$checkOut = isset($body['checkOut']) ? $body['checkOut'] : null;
$guests = isset($body['guests']) ? $body['guests'] : null;
$guestName = isset($body['guestName']) ? $body['guestName'] : null;
$guestEmail = isset($body['guestEmail']) ? $body['guestEmail'] : null;
$guestPhone = isset($body['guestPhone']) ? $body['guestPhone'] : null;
$airportPickup = isset($body['airportPickup']) ? (bool)$body['airportPickup'] : false;
$flightTime = isset($body['flightTime']) ? $body['flightTime'] : '';

if (!$roomId || !$checkIn || !$checkOut || !$guestName || !$guestEmail || !$guestPhone) {
    sendError('Missing required booking fields', 400);
}

// Validation
$guestEmail = trim(filter_var($guestEmail, FILTER_SANITIZE_EMAIL));
if (!filter_var($guestEmail, FILTER_VALIDATE_EMAIL)) {
    sendError('Invalid email format', 400);
}

$nights = daysBetween($checkIn, $checkOut);
global $rooms;
$pricePerNight = isset($rooms[$roomId]) ? $rooms[$roomId]['pricePerNight'] : 50;
$totalPrice = $pricePerNight * $nights;

$channexApiKey = getEnvValue('CHANNEX_API_KEY');
$isMock = empty($channexApiKey);

if ($isMock) {
    $bookingId = 'BK-' . round(microtime(true) * 1000) . '-' . rand(100, 999);
    $confirmationCode = 'USG-' . strtoupper(substr(md5(uniqid()), 0, 8));
} else {
    // Production Channex integration — Create booking via Channex API
    try {
        $nameParts = explode(' ', trim($guestName), 2);
        $firstName = $nameParts[0];
        $lastName = isset($nameParts[1]) ? $nameParts[1] : 'Guest';

        $envKey = 'CHANNEX_ROOM_' . strtoupper(str_replace('-', '_', $roomId));
        $channexRoomId = getEnvValue($envKey);
        $ratePlanId = getEnvValue('CHANNEX_RATE_PLAN_ID');
        $apiUrl = getEnvValue('CHANNEX_API_URL', 'https://api.channex.io/api/v1');

        $bookingPayload = [
            'booking' => [
                'ota_name' => 'DirectWebsite',
                'ota_reservation_code' => 'USG-' . strtoupper(substr(md5(uniqid()), 0, 8)),
                'arrival_date' => $checkIn,
                'departure_date' => $checkOut,
                'amount' => (float)$totalPrice,
                'currency' => 'USD',
                'customer' => [
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $guestEmail,
                    'phone' => $guestPhone
                ],
                'rooms' => [
                    [
                        'room_type_id' => $channexRoomId,
                        'rate_plan_id' => $ratePlanId
                    ]
                ]
            ]
        ];

        $ch = curl_init("{$apiUrl}/bookings");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "user-api-key: {$channexApiKey}",
            "Authorization: Bearer {$channexApiKey}",
            "Content-Type: application/json"
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($bookingPayload));
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $resData = json_decode($response, true);
        if ($httpCode === 200 || $httpCode === 201) {
            $bookingId = isset($resData['data']['id']) ? $resData['data']['id'] : 'BK-CHANNEX-' . round(microtime(true) * 1000);
            $confirmationCode = isset($resData['data']['attributes']['ota_reservation_code']) ? $resData['data']['attributes']['ota_reservation_code'] : 'USG-CHANNEX-' . strtoupper(substr(md5(uniqid()), 0, 6));
        } else {
            error_log("[Channex Booking Error] HTTP Code: {$httpCode}. Response: " . $response);
            $bookingId = 'BK-CHANNEX-ERR-' . round(microtime(true) * 1000);
            $confirmationCode = 'USG-CH-ERR-' . strtoupper(substr(md5(uniqid()), 0, 6));
        }
    } catch (Exception $e) {
        error_log("[Channex Booking Exception] " . $e->getMessage());
        $bookingId = 'BK-CHANNEX-EXC-' . round(microtime(true) * 1000);
        $confirmationCode = 'USG-CH-EXC-' . strtoupper(substr(md5(uniqid()), 0, 6));
    }
}

$newBooking = [
    'id' => $bookingId,
    'status' => 'pending_payment',
    'confirmationCode' => $confirmationCode,
    'totalPrice' => $totalPrice,
    'nights' => $nights,
    'createdAt' => date(DATE_ATOM),
    'roomId' => $roomId,
    'checkIn' => $checkIn,
    'checkOut' => $checkOut,
    'guests' => (int)$guests,
    'guestName' => htmlspecialchars(trim($guestName)),
    'guestEmail' => $guestEmail,
    'guestPhone' => htmlspecialchars(trim($guestPhone)),
    'airportPickup' => $airportPickup,
    'flightTime' => htmlspecialchars(trim($flightTime))
];

saveBooking($newBooking);

sendJson($newBooking, 201);
