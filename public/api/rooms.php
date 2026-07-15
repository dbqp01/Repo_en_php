<?php
// rooms.php - Room pricing and metadata (reads from TinaCMS JSON + QloApps live data)

// Read room data from TinaCMS-managed JSON (single source of truth for content)
$jsonPath = __DIR__ . '/../../src/content/rooms/rooms.json';
$rooms = [];

if (file_exists($jsonPath)) {
    $tinaData = json_decode(file_get_contents($jsonPath), true);
    if ($tinaData && isset($tinaData['rooms'])) {
        foreach ($tinaData['rooms'] as $r) {
            $rooms[$r['id']] = [
                'id' => $r['id'],
                'slug' => $r['slug'],
                'name' => ['en' => $r['name_en'], 'es' => $r['name_es']],
                'pricePerNight' => (float)$r['pricePerNight']
            ];
        }
    }
}

// Hardcoded fallback only if JSON read fails
if (empty($rooms)) {
    $rooms = [
        'doble-superior' => ['id' => 'doble-superior', 'slug' => 'doble-superior', 'name' => ['en' => 'Double Superior Room', 'es' => 'Habitación Doble Superior'], 'pricePerNight' => 90],
        'matrimonial' => ['id' => 'matrimonial', 'slug' => 'matrimonial', 'name' => ['en' => 'Superior Matrimonial Room', 'es' => 'Habitación Matrimonial Superior'], 'pricePerNight' => 90],
        'familiar-superior' => ['id' => 'familiar-superior', 'slug' => 'familiar-superior', 'name' => ['en' => 'Family Superior Room', 'es' => 'Habitación Familiar Superior'], 'pricePerNight' => 150],
        'triple-standar' => ['id' => 'triple-standar', 'slug' => 'triple-standar', 'name' => ['en' => 'Triple Standard Room', 'es' => 'Habitación Triple Estándar'], 'pricePerNight' => 120],
    ];
}


// Serve as JSON endpoint only when this file is the entry point (not require'd by another script)
if (realpath($_SERVER['SCRIPT_FILENAME']) === realpath(__FILE__)) {
    require_once __DIR__ . '/db.php';
    require_once __DIR__ . '/qloapp/QloAppReader.php';

    $hotelId = isset($_GET['hotelId']) ? (int)$_GET['hotelId'] : 1;
    $checkIn = isset($_GET['checkIn']) ? $_GET['checkIn'] : date('Y-m-d');
    $checkOut = isset($_GET['checkOut']) ? $_GET['checkOut'] : date('Y-m-d', strtotime('+1 day'));

    $reader = new QloAppReader();
    $dbRooms = $reader->getAvailableRooms($checkIn, $checkOut, $hotelId);

    if ($dbRooms !== null && count($dbRooms) > 0) {
        $responseRooms = [];
        // Map database rooms to frontend schema structure
        foreach ($dbRooms as $dbRoom) {
            // Find static metadata matching this room by matching slugs or database room names
            // We use simple mapping: e.g. mapping database name to matching slug
            $nameLower = strtolower($dbRoom['room_name']);
            $matchedKey = 'doble-superior';
            
            if (strpos($nameLower, 'matrimonial') !== false) {
                $matchedKey = 'matrimonial';
            } elseif (strpos($nameLower, 'familiar') !== false || strpos($nameLower, 'family') !== false) {
                $matchedKey = 'familiar-superior';
            } elseif (strpos($nameLower, 'triple') !== false) {
                $matchedKey = 'triple-standar';
            }

            if (isset($rooms[$matchedKey])) {
                $mappedRoom = $rooms[$matchedKey];
                // Overwrite with dynamic price from DB
                $mappedRoom['pricePerNight'] = (float)$dbRoom['price'];
                $mappedRoom['db_id_room_type'] = $dbRoom['id_room_type'];
                $responseRooms[] = $mappedRoom;
            }
        }
        sendJson($responseRooms);
    } else {
        // Fallback to static list
        sendJson(array_values($rooms));
    }
}
