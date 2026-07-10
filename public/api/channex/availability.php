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
    // Production Channex Integration — Query availability restrictions
    try {
        $apiUrl = getEnvValue('CHANNEX_API_URL', 'https://api.channex.io/api/v1');
        $propertyId = getEnvValue('CHANNEX_PROPERTY_ID');
        
        $params = http_build_query([
            'filter' => [
                'property_id' => $propertyId,
                'date' => [
                    'gte' => $checkIn,
                    'lte' => date('Y-m-d', strtotime($checkOut . ' -1 day'))
                ]
            ]
        ]);
        
        $ch = curl_init("{$apiUrl}/restrictions?{$params}");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "user-api-key: {$channexApiKey}",
            "Authorization: Bearer {$channexApiKey}",
            "Content-Type: application/json"
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        $availabilityMap = [];
        $stopSellMap = [];
        
        if ($httpCode === 200) {
            $data = json_decode($response, true);
            if (isset($data['data'])) {
                foreach ($data['data'] as $item) {
                    if (isset($item['attributes'])) {
                        $rtId = $item['attributes']['room_type_id'];
                        $date = $item['attributes']['date'];
                        $avail = isset($item['attributes']['availability']) ? (int)$item['attributes']['availability'] : 1;
                        $stop = isset($item['attributes']['stop_sell']) ? (bool)$item['attributes']['stop_sell'] : false;
                        
                        if (!isset($availabilityMap[$rtId])) {
                            $availabilityMap[$rtId] = [];
                        }
                        $availabilityMap[$rtId][$date] = $avail;
                        
                        if (!isset($stopSellMap[$rtId])) {
                            $stopSellMap[$rtId] = [];
                        }
                        $stopSellMap[$rtId][$date] = $stop;
                    }
                }
            }
        }
        
        $filteredRooms = $rooms;
        if ($roomType && $roomType !== 'any' && $roomType !== '') {
            $filteredRooms = array_filter($rooms, function($r) use ($roomType) {
                return $r['slug'] === $roomType;
            });
        }

        foreach ($filteredRooms as $room) {
            $envKey = 'CHANNEX_ROOM_' . strtoupper(str_replace('-', '_', $room['slug']));
            $channexRoomId = getEnvValue($envKey);
            $isAvailable = true;
            
            if (!empty($channexRoomId)) {
                $start = new DateTime($checkIn);
                $end = new DateTime($checkOut);
                $interval = new DateInterval('P1D');
                $period = new DatePeriod($start, $interval, $end);
                
                foreach ($period as $dateObj) {
                    $dateStr = $dateObj->format('Y-m-d');
                    $avail = isset($availabilityMap[$channexRoomId][$dateStr]) ? $availabilityMap[$channexRoomId][$dateStr] : 1;
                    $stop = isset($stopSellMap[$channexRoomId][$dateStr]) ? $stopSellMap[$channexRoomId][$dateStr] : false;
                    if ($avail <= 0 || $stop) {
                        $isAvailable = false;
                        break;
                    }
                }
            }
            
            $availableRooms[] = array_merge($room, [
                'available' => $isAvailable,
                'totalPrice' => $room['pricePerNight'] * $nights,
                'nights' => $nights
            ]);
        }
    } catch (Exception $e) {
        error_log("[Channex API Error] " . $e->getMessage());
        // Fallback to optimistic availability
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
