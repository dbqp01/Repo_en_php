<?php
// webhook-mercado-pago.php - Processes Mercado Pago webhooks

require_once __DIR__ . '/db.php';

// Mercado Pago webhooks must respond 200 OK immediately
// We parse the data and run it.

$bookingId = isset($_GET['bookingId']) ? $_GET['bookingId'] : null;
$paymentStatus = 'approved';

$inputJSON = file_get_contents('php://input');
$body = json_decode($inputJSON, TRUE) ?: [];

if (isset($body['bookingId'])) {
    $bookingId = $body['bookingId'];
}
if (isset($body['status'])) {
    $paymentStatus = $body['status'];
}

// Handle Mock payment trigger
if ($bookingId) {
    if ($paymentStatus === 'approved') {
        $success = confirmBooking($bookingId);
        sendJson(['success' => $success, 'message' => 'Booking confirmed via mock payment']);
    } else {
        sendJson(['success' => false, 'message' => 'Payment status not approved in mock']);
    }
}

// Handle real Mercado Pago webhook format
$paymentId = null;
if (isset($body['data']['id'])) {
    $paymentId = $body['data']['id'];
} elseif (isset($_GET['id'])) {
    $paymentId = $_GET['id'];
}

$topic = null;
if (isset($body['type'])) {
    $topic = $body['type'];
} elseif (isset($_GET['topic'])) {
    $topic = $_GET['topic'];
}

$action = isset($body['action']) ? $body['action'] : '';

if ($paymentId && ($topic === 'payment' || strpos($action, 'payment.') === 0)) {
    $mpAccessToken = getEnvValue('MERCADO_PAGO_ACCESS_TOKEN');
    if ($mpAccessToken) {
        $ch = curl_init("https://api.mercadopago.com/v1/payments/{$paymentId}");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer {$mpAccessToken}"
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            $payData = json_decode($response, true);
            $extRef = isset($payData['external_reference']) ? $payData['external_reference'] : null;
            $status = isset($payData['status']) ? $payData['status'] : null;
            
            if ($extRef && $status === 'approved') {
                confirmBooking($extRef);
            }
        }
    }
}

// Always respond 200 OK to Mercado Pago to stop retries
sendJson(['received' => true]);
