<?php
// PHP Database and Utility Helper

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

/**
 * Reads environment variables from the .env file
 */
function getEnvValue($key, $default = null) {
    static $env = null;
    if ($env === null) {
        $env = [];
        // Paths to search for the .env file
        $paths = [
            __DIR__ . '/../../.env',
            __DIR__ . '/../.env',
            __DIR__ . '/.env'
        ];
        
        foreach ($paths as $path) {
            if (file_exists($path)) {
                $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                foreach ($lines as $line) {
                    $line = trim($line);
                    if (empty($line) || strpos($line, '#') === 0) continue;
                    $parts = explode('=', $line, 2);
                    if (count($parts) === 2) {
                        $env[trim($parts[0])] = trim($parts[1], " '\"");
                    }
                }
                break; // Stop at first .env found
            }
        }
    }
    return isset($env[$key]) ? $env[$key] : (getenv($key) ?: $default);
}

/**
 * Returns the path to the persistent bookings.json database
 */
function getDbPath() {
    // Stored outside the public folder for security, fallback to local if permissions fail
    $securePath = __DIR__ . '/../../data/bookings.json';
    if (!file_exists(dirname($securePath))) {
        @mkdir(dirname($securePath), 0777, true);
    }
    if (is_writable(dirname($securePath)) || file_exists($securePath)) {
        return $securePath;
    }
    return __DIR__ . '/bookings.json';
}

/**
 * Retrieves all bookings from the JSON file
 */
function getBookings() {
    $path = getDbPath();
    if (!file_exists($path)) {
        file_put_contents($path, json_encode([]));
    }
    $content = file_get_contents($path);
    return json_decode($content, true) ?: [];
}

/**
 * Saves or updates a booking in the JSON file
 */
function saveBooking($booking) {
    $path = getDbPath();
    $bookings = getBookings();
    $bookings[$booking['id']] = $booking;
    file_put_contents($path, json_encode($bookings, JSON_PRETTY_PRINT));
}

/**
 * Retrieves a specific booking by ID
 */
function getBooking($id) {
    $bookings = getBookings();
    return isset($bookings[$id]) ? $bookings[$id] : null;
}

/**
 * Confirms a booking status
 */
function confirmBooking($id) {
    $booking = getBooking($id);
    if ($booking) {
        $booking['status'] = 'confirmed';
        saveBooking($booking);
        return true;
    }
    return false;
}

/**
 * Helper to calculate the difference in days between two date strings
 */
function daysBetween($date1, $date2) {
    $d1 = new DateTime($date1);
    $d2 = new DateTime($date2);
    $diff = $d1->diff($d2);
    return $diff->days;
}

/**
 * Helper to send a JSON error response
 */
function sendError($message, $status = 500) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode(['error' => $message]);
    exit();
}

/**
 * Helper to send a JSON success response
 */
function sendJson($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}
