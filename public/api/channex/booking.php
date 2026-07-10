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
    // Production integration placeholder
    $bookingId = 'BK-CHANNEX-' . round(microtime(true) * 1000);
    $confirmationCode = 'USG-CHANNEX-' . strtoupper(substr(md5(uniqid()), 0, 6));
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
