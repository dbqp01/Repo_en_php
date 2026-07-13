<?php
// PHP Database and Utility Helper

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
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
 * Establishes a PDO MySQL connection if credentials are set, otherwise returns null (triggers JSON fallback).
 * Automatically handles migrations/auto-creation of the bookings table.
 */
function getDbConnection() {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $host = getEnvValue('DB_HOST');
    $user = getEnvValue('DB_USER');
    $pass = getEnvValue('DB_PASS');
    $name = getEnvValue('DB_NAME');

    if (empty($host) || empty($user) || empty($name)) {
        return null; // Silent fallback to JSON
    }

    try {
        $dsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
        
        // Conexión exitosa a la base de datos MySQL (QloApp)
        return $pdo;
    } catch (PDOException $e) {
        error_log("[Database Connection Error] Fallback to JSON. Details: " . $e->getMessage());
        return null;
    }
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
 * Retrieves all bookings from either MySQL or the JSON file
 */
function getBookings() {
    $pdo = getDbConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM bookings ORDER BY createdAt DESC");
            $rows = $stmt->fetchAll();
            return array_map(function($row) {
                $row['guests'] = (int)$row['guests'];
                $row['nights'] = (int)$row['nights'];
                $row['totalPrice'] = (float)$row['totalPrice'];
                $row['airportPickup'] = (bool)$row['airportPickup'];
                return $row;
            }, $rows);
        } catch (PDOException $e) {
            error_log("[Database SELECT Error] " . $e->getMessage());
            return [];
        }
    } else {
        $path = getDbPath();
        if (!file_exists($path)) {
            file_put_contents($path, json_encode([]));
        }
        $content = file_get_contents($path);
        return json_decode($content, true) ?: [];
    }
}

/**
 * Saves or updates a booking in either MySQL or the JSON file
 */
function saveBooking($booking) {
    $pdo = getDbConnection();
    if ($pdo) {
        try {
            $id = $booking['id'];
            $status = isset($booking['status']) ? $booking['status'] : 'pending_payment';
            $confirmationCode = $booking['confirmationCode'];
            $totalPrice = $booking['totalPrice'];
            $nights = $booking['nights'];
            $createdAt = $booking['createdAt'];
            $roomId = $booking['roomId'];
            $checkIn = $booking['checkIn'];
            $checkOut = $booking['checkOut'];
            $guests = $booking['guests'];
            $guestName = $booking['guestName'];
            $guestEmail = $booking['guestEmail'];
            $guestPhone = $booking['guestPhone'];
            $airportPickup = isset($booking['airportPickup']) ? ($booking['airportPickup'] ? 1 : 0) : 0;
            $flightTime = isset($booking['flightTime']) ? $booking['flightTime'] : '';
            $mercadoPagoPreferenceId = isset($booking['mercadoPagoPreferenceId']) ? $booking['mercadoPagoPreferenceId'] : '';
            $mercadoPagoPaymentId = isset($booking['mercadoPagoPaymentId']) ? $booking['mercadoPagoPaymentId'] : '';

            $stmt = $pdo->prepare("INSERT INTO bookings (
                id, status, confirmationCode, totalPrice, nights, createdAt, roomId, checkIn, checkOut, guests, guestName, guestEmail, guestPhone, airportPickup, flightTime, mercadoPagoPreferenceId, mercadoPagoPaymentId
            ) VALUES (
                :id, :status, :confirmationCode, :totalPrice, :nights, :createdAt, :roomId, :checkIn, :checkOut, :guests, :guestName, :guestEmail, :guestPhone, :airportPickup, :flightTime, :mercadoPagoPreferenceId, :mercadoPagoPaymentId
            ) ON DUPLICATE KEY UPDATE 
                status = VALUES(status),
                confirmationCode = VALUES(confirmationCode),
                totalPrice = VALUES(totalPrice),
                nights = VALUES(nights),
                roomId = VALUES(roomId),
                checkIn = VALUES(checkIn),
                checkOut = VALUES(checkOut),
                guests = VALUES(guests),
                guestName = VALUES(guestName),
                guestEmail = VALUES(guestEmail),
                guestPhone = VALUES(guestPhone),
                airportPickup = VALUES(airportPickup),
                flightTime = VALUES(flightTime),
                mercadoPagoPreferenceId = VALUES(mercadoPagoPreferenceId),
                mercadoPagoPaymentId = VALUES(mercadoPagoPaymentId)");
            
            $stmt->execute([
                ':id' => $id,
                ':status' => $status,
                ':confirmationCode' => $confirmationCode,
                ':totalPrice' => $totalPrice,
                ':nights' => $nights,
                ':createdAt' => $createdAt,
                ':roomId' => $roomId,
                ':checkIn' => $checkIn,
                ':checkOut' => $checkOut,
                ':guests' => $guests,
                ':guestName' => $guestName,
                ':guestEmail' => $guestEmail,
                ':guestPhone' => $guestPhone,
                ':airportPickup' => $airportPickup,
                ':flightTime' => $flightTime,
                ':mercadoPagoPreferenceId' => $mercadoPagoPreferenceId,
                ':mercadoPagoPaymentId' => $mercadoPagoPaymentId
            ]);
        } catch (PDOException $e) {
            error_log("[Database INSERT/UPDATE Error] " . $e->getMessage());
        }
    } else {
        $path = getDbPath();
        $bookings = getBookings();
        $bookings[$booking['id']] = $booking;
        file_put_contents($path, json_encode($bookings, JSON_PRETTY_PRINT));
    }
}

/**
 * Retrieves a specific booking by ID from either MySQL or the JSON file
 */
function getBooking($id) {
    $pdo = getDbConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM bookings WHERE id = :id");
            $stmt->execute([':id' => $id]);
            $row = $stmt->fetch();
            if ($row) {
                $row['guests'] = (int)$row['guests'];
                $row['nights'] = (int)$row['nights'];
                $row['totalPrice'] = (float)$row['totalPrice'];
                $row['airportPickup'] = (bool)$row['airportPickup'];
                return $row;
            }
            return null;
        } catch (PDOException $e) {
            error_log("[Database SELECT ID Error] " . $e->getMessage());
            return null;
        }
    } else {
        $bookings = getBookings();
        return isset($bookings[$id]) ? $bookings[$id] : null;
    }
}

/**
 * Confirms a booking status in either MySQL or the JSON file
 */
function confirmBooking($id) {
    $pdo = getDbConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("UPDATE bookings SET status = 'confirmed' WHERE id = :id");
            $stmt->execute([':id' => $id]);
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            error_log("[Database UPDATE Confirm Error] " . $e->getMessage());
            return false;
        }
    } else {
        $booking = getBooking($id);
        if ($booking) {
            $booking['status'] = 'confirmed';
            saveBooking($booking);
            return true;
        }
        return false;
    }
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
