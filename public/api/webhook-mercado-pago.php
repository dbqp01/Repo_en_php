<?php
declare(strict_types=1);

// webhook-mercado-pago.php - Handles Mercado Pago notifications

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/qloapp/QloAppWriter.php';
require_once __DIR__ . '/channex/ChannexSync.php';

// For testing purposes: allows simulating webhooks via GET
$topic = isset($_GET['topic']) ? $_GET['topic'] : (isset($_GET['type']) ? $_GET['type'] : null);
$id = isset($_GET['id']) ? $_GET['id'] : (isset($_GET['data_id']) ? $_GET['data_id'] : null);
$mock = isset($_GET['mock']) && $_GET['mock'] === 'true';

// Read JSON body for actual webhooks
if (!$topic || !$id) {
    $inputJSON = file_get_contents('php://input');
    if ($inputJSON) {
        $body = json_decode($inputJSON, TRUE);
        $topic = isset($body['type']) ? $body['type'] : (isset($body['topic']) ? $body['topic'] : null);
        $id = isset($body['data']['id']) ? $body['data']['id'] : null;
    }
}

if ($topic !== 'payment' || !$id) {
    http_response_code(200); // MP expects a quick 200 OK even if ignored
    error_log("[Webhook] Ignored topic: $topic");
    exit();
}

$webhookSecret = getEnvValue('MERCADO_PAGO_WEBHOOK_SECRET');
$isProduction = !empty($webhookSecret);

// 1. Block mock requests in production environments
if ($mock && $isProduction) {
    error_log("[Webhook Security Alert] Mock requested but blocked in production.");
    http_response_code(403);
    exit();
}

// 2. Verify HMAC-SHA256 Signature to prevent spoofing
if ($isProduction) {
    $signatureHeader = $_SERVER['HTTP_X_SIGNATURE'] ?? '';
    $requestId = $_SERVER['HTTP_X_REQUEST_ID'] ?? '';

    $ts = '';
    $v1 = '';
    if (!empty($signatureHeader)) {
        $parts = explode(',', $signatureHeader);
        foreach ($parts as $part) {
            $kv = explode('=', trim($part), 2);
            if (count($kv) === 2) {
                if (trim($kv[0]) === 'ts') {
                    $ts = trim($kv[1]);
                } elseif (trim($kv[0]) === 'v1') {
                    $v1 = trim($kv[1]);
                }
            }
        }
    }

    if (empty($ts) || empty($v1) || empty($requestId)) {
        error_log("[Webhook Signature Error] Missing signature headers");
        http_response_code(401);
        exit();
    }

    // Construct the canonical string: id:<data.id>;request-id:<x-request-id>;ts:<ts>;
    $canonical = "id:{$id};request-id:{$requestId};ts:{$ts};";
    $expected = hash_hmac('sha256', $canonical, $webhookSecret);

    if (!hash_equals($expected, $v1)) {
        error_log("[Webhook Signature Error] Signature mismatch. Expected: {$expected}, Got: {$v1}");
        http_response_code(401);
        exit();
    }
}

// Respond 200 immediately to Mercado Pago (so they do not retry) and flush connection
http_response_code(200);
if (ob_get_level() > 0) ob_flush();
flush();

if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request();
}

// 3. Check payment status
$mpAccessToken = getEnvValue('MERCADO_PAGO_ACCESS_TOKEN');
$paymentStatus = 'pending';
$externalReference = null;
$totalPaid = 0.0;
$guestName = 'Guest';
$guestEmail = 'guest@example.com';
$guestPhone = '';
$roomId = 'UNKNOWN';
$checkIn = date('Y-m-d');
$checkOut = date('Y-m-d', strtotime('+1 day'));

if ($mock && !$isProduction) {
    // Mock successful payment (only allowed in non-production/dev)
    $paymentStatus = 'approved';
    $externalReference = isset($_GET['bookingId']) ? $_GET['bookingId'] : 'MOCK-CART-' . time();
    $totalPaid = 50.0;
    error_log("[Webhook] Processing MOCK payment for cart {$externalReference}");
} else {
    // Call Mercado Pago API to get real payment details
    $ch = curl_init("https://api.mercadopago.com/v1/payments/{$id}");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer {$mpAccessToken}"
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 400 || empty($response)) {
        error_log("[Webhook] Failed to fetch payment {$id}");
        exit();
    }

    $paymentData = json_decode($response, TRUE);
    $paymentStatus = $paymentData['status'];
    $externalReference = $paymentData['external_reference']; // QloApp Cart ID
    $totalPaid = (float)$paymentData['transaction_amount'];
}

// 2. If approved, confirm the order in QloApp and push to Channex
if ($paymentStatus === 'approved') {
    error_log("[Webhook] Payment Approved for Cart {$externalReference}");

    // Convert QloApp Cart to Order
    $qloWriter = new QloAppWriter();
    $orderId = $qloWriter->confirmOrder($externalReference, $totalPaid, $guestName, $guestEmail);

    if ($orderId) {
        error_log("[Webhook] Successfully created QloApp Order {$orderId}");
        
        // Block inventory in Channex
        $channex = new ChannexSync();
        $channex->pushBooking(
            $orderId, 
            $checkIn, 
            $checkOut, 
            $roomId, 
            $totalPaid, 
            $guestName, 
            $guestEmail, 
            $guestPhone
        );
    } else {
        error_log("[Webhook Error] Failed to create QloApp Order for Cart {$externalReference}");
    }
}
