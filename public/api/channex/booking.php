<?php
// booking.php - Creates a new booking in pending state using QloApp API

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../rooms.php';
require_once __DIR__ . '/../qloapp/QloAppWriter.php';

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

if (!$roomId || !$checkIn || !$checkOut || !$guestName || !$guestEmail || !$guestPhone) {
    sendError('Missing required booking fields', 400);
}

// 1. Calculate price dynamically based on room type rates
$nights = daysBetween($checkIn, $checkOut);
$pricePerNight = 90.0;
if (isset($rooms[$roomId])) {
    $pricePerNight = (float)$rooms[$roomId]['pricePerNight'];
}
$totalPrice = $pricePerNight * $nights; 

// 2. Create Cart in QloApp via API
$qloWriter = new QloAppWriter();
$cartId = $qloWriter->createCart($checkIn, $checkOut, $roomId, $guests);

if (!$cartId) {
    sendError('Failed to initialize booking in QloApp', 500);
}

// 3. Return the payload to the frontend. The bookingId will be the QloApp cartId.
$newBooking = [
    'id' => $cartId,
    'status' => 'pending_payment',
    'totalPrice' => $totalPrice,
    'nights' => $nights,
    'roomId' => $roomId,
    'checkIn' => $checkIn,
    'checkOut' => $checkOut,
    'guestName' => htmlspecialchars(trim($guestName)),
    'guestEmail' => $guestEmail
];

sendJson($newBooking, 201);
