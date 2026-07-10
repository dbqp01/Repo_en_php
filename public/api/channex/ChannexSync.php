<?php
// ChannexSync.php - Handles synchronization with Channex Channel Manager

require_once __DIR__ . '/../db.php';

class ChannexSync {
    private $apiKey;
    private $apiUrl;

    public function __construct() {
        $this->apiKey = getEnvValue('CHANNEX_API_KEY');
        $this->apiUrl = getEnvValue('CHANNEX_API_URL', 'https://api.channex.io/api/v1');
    }

    /**
     * Pushes a confirmed booking from QloApp to Channex to block inventory in OTAs
     */
    public function pushBooking($bookingId, $checkIn, $checkOut, $roomId, $totalPrice, $guestName, $guestEmail, $guestPhone) {
        if (!$this->apiKey) {
            error_log("[ChannexSync] Mock mode: Skipped pushing booking $bookingId to Channex");
            return true;
        }

        try {
            $nameParts = explode(' ', trim($guestName), 2);
            $firstName = $nameParts[0];
            $lastName = isset($nameParts[1]) ? $nameParts[1] : 'Guest';

            // Get Channex room ID mapping from env
            $envKey = 'CHANNEX_ROOM_' . strtoupper(str_replace('-', '_', $roomId));
            $channexRoomId = getEnvValue($envKey);
            $ratePlanId = getEnvValue('CHANNEX_RATE_PLAN_ID');

            if (!$channexRoomId || !$ratePlanId) {
                error_log("[ChannexSync Error] Missing Channex Room Mapping for $roomId");
                return false;
            }

            $bookingPayload = [
                'booking' => [
                    'status' => 'new',
                    'reservation_id' => 'USG-' . $bookingId,
                    'arrival_date' => $checkIn,
                    'departure_date' => $checkOut,
                    'currency' => 'USD',
                    'payment_collect' => 'property',
                    'payment_type' => 'credit_card',
                    'customer' => [
                        'name' => $firstName,
                        'surname' => $lastName,
                        'mail' => $guestEmail,
                        'phone' => $guestPhone,
                        'country' => 'PE'
                    ],
                    'rooms' => [
                        [
                            'index' => 0,
                            'room_type_code' => $channexRoomId,
                            'rate_plan_code' => $ratePlanId,
                            'occupancy' => [
                                'adults' => 2,
                                'children' => 0,
                                'infants' => 0
                            ]
                        ]
                    ]
                ]
            ];

            // Using the Open Channel API endpoint as documented
            $endpoint = "{$this->apiUrl}/channel_webhooks/open_channel/new_booking";
            
            $ch = curl_init($endpoint);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                "api-key: {$this->apiKey}",
                "Content-Type: application/json"
            ]);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($bookingPayload));
            
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode === 200 || $httpCode === 201) {
                error_log("[ChannexSync Success] Pushed booking $bookingId to Channex");
                return true;
            } else {
                error_log("[ChannexSync Error] HTTP Code: {$httpCode}. Response: " . $response);
                return false;
            }
        } catch (Exception $e) {
            error_log("[ChannexSync Exception] " . $e->getMessage());
            return false;
        }
    }
}
