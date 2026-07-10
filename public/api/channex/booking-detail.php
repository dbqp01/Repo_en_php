<?php
// booking-detail.php - Retrieves booking details and status

require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed', 405);
}

$id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$id) {
    sendError('Missing booking ID', 400);
}

$booking = getBooking($id);

if (!$booking) {
    sendError('Booking not found', 404);
}

sendJson($booking);
