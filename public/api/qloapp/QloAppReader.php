<?php
// QloAppReader.php - Handles read operations directly from QloApp MySQL database

require_once __DIR__ . '/../db.php';

class QloAppReader {
    private $pdo;

    public function __construct() {
        $this->pdo = getDbConnection();
    }

    /**
     * Obtains the available rooms and their base prices
     */
    public function getAvailableRooms($checkIn, $checkOut) {
        if (!$this->pdo) {
            // Fallback mock if database isn't connected yet
            return null;
        }

        try {
            // In QloApp, we need to check ps_htl_room_type and bookings.
            // This is a simplified query demonstrating the approach.
            // A full QloApp query would join ps_htl_room_information, ps_htl_room_type, etc.
            
            $stmt = $this->pdo->prepare("
                SELECT rt.id_room_type, rt.room_name, i.price
                FROM ps_htl_room_type rt
                LEFT JOIN ps_htl_room_information i ON i.id_room_type = rt.id_room_type
                WHERE rt.active = 1
            ");
            $stmt->execute();
            $rooms = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            return $rooms;
        } catch (PDOException $e) {
            error_log("[QloAppReader Error] " . $e->getMessage());
            return null;
        }
    }
}
