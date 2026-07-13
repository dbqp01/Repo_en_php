<?php
// rooms.php - Room pricing and metadata (shared data + endpoint)

$rooms = [
  'doble-superior' => [
    'id' => 'doble-superior',
    'slug' => 'doble-superior',
    'name' => [ 'en' => 'Double Superior Room', 'es' => 'Habitación Doble Superior' ],
    'pricePerNight' => 90
  ],
  'matrimonial' => [
    'id' => 'matrimonial',
    'slug' => 'matrimonial',
    'name' => [ 'en' => 'Superior Matrimonial Room', 'es' => 'Habitación Matrimonial Superior' ],
    'pricePerNight' => 90
  ],
  'familiar-superior' => [
    'id' => 'familiar-superior',
    'slug' => 'familiar-superior',
    'name' => [ 'en' => 'Family Superior Room', 'es' => 'Habitación Familiar Superior' ],
    'pricePerNight' => 150
  ],
  'triple-standar' => [
    'id' => 'triple-standar',
    'slug' => 'triple-standar',
    'name' => [ 'en' => 'Triple Standard Room', 'es' => 'Habitación Triple Estándar' ],
    'pricePerNight' => 120
  ]
];

// Serve as JSON endpoint only when this file is the entry point (not require'd by another script)
if (realpath($_SERVER['SCRIPT_FILENAME']) === realpath(__FILE__)) {
    require_once __DIR__ . '/db.php';
    sendJson(array_values($rooms));
}
