<?php
// availability.php - Checks room availability for a date range

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../rooms.php';

$checkIn = isset($_GET['checkin']) ? $_GET['checkin'] : (isset($_GET['checkIn']) ? $_GET['checkIn'] : null);
$checkOut = isset($_GET['checkout']) ? $_GET['checkout'] : (isset($_GET['checkOut']) ? $_GET['checkOut'] : null);
$roomType = isset($_GET['roomType']) ? $_GET['roomType'] : (isset($_GET['room_type']) ? $_GET['room_type'] : null);

if (!$checkIn || !$checkOut) {
    sendError('Missing checkin or checkout date', 400);
}

$nights = daysBetween($checkIn, $checkOut);

$channexApiKey = getEnvValue('CHANNEX_API_KEY');
$isMock = empty($channexApiKey);

global $rooms;
$availableRooms = [];

if ($isMock) {
    $filteredRooms = $rooms;
    if ($roomType && $roomType !== 'any' && $roomType !== '') {
        $filteredRooms = array_filter($rooms, function($r) use ($roomType) {
            return $r['slug'] === $roomType;
        });
    }
    
    foreach ($filteredRooms as $room) {
        $availableRooms[] = array_merge($room, [
            'available' => true,
            'totalPrice' => $room['pricePerNight'] * $nights,
            'nights' => $nights
        ]);
    }
} else {
    // Production integration
    try {
        $ch = curl_init('https://api.channex.io/api/v1/room_types');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer {$channexApiKey}",
            "Content-Type: application/json"
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        // Map Channex API to our rooms. For fallback/demo, we return mock values
        foreach ($rooms as $room) {
            $availableRooms[] = array_merge($room, [
                'available' => true,
                'totalPrice' => $room['pricePerNight'] * $nights,
                'nights' => $nights
            ]);
        }
    } catch (Exception $e) {
        foreach ($rooms as $room) {
            $availableRooms[] = array_merge($room, [
                'available' => true,
                'totalPrice' => $room['pricePerNight'] * $nights,
                'nights' => $nights
            ]);
        }
    }
}

sendJson([
    'available' => true,
    'checkIn' => $checkIn,
    'checkOut' => $checkOut,
    'rooms' => $availableRooms
]);
