<?php
// QloAppReader.php - Handles read operations directly from QloApp MySQL database

require_once __DIR__ . '/../db.php';

class QloAppReader {
    private $pdo;

    public function __construct() {
        $this->pdo = getDbConnection();
    }

    /**
     * Obtains the available rooms and their base prices for a specific hotel branch
     */
    public function getAvailableRooms($checkIn, $checkOut, $hotelId = 1) {
        if (!$this->pdo) {
            // Fallback mock if database isn't connected yet
            return null;
        }

        try {
            // Filter by hotelId using QloApps qlo_ prefix
            $stmt = $this->pdo->prepare("
                SELECT rt.id_room_type, rt.room_name, i.price
                FROM qlo_htl_room_type rt
                LEFT JOIN qlo_htl_room_information i ON i.id_room_type = rt.id_room_type
                WHERE rt.active = 1 AND rt.id_hotel = :id_hotel
            ");
            $stmt->execute([':id_hotel' => (int)$hotelId]);
            $rooms = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            return $rooms;
        } catch (PDOException $e) {
            error_log("[QloAppReader Error] " . $e->getMessage());
            return null;
        }
    }
}
