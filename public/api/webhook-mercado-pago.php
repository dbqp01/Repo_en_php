<?php
// webhook-mercado-pago.php - Processes Mercado Pago webhooks

require_once __DIR__ . '/db.php';

// Helper to retrieve HTTP headers in a cross-platform manner
function getHeaderValue($name) {
    $nameLower = strtolower($name);
    if (function_exists('getallheaders')) {
        $headers = array_change_key_case(getallheaders(), CASE_LOWER);
        if (isset($headers[$nameLower])) {
            return $headers[$nameLower];
        }
    }
    // Fallback to $_SERVER
    $serverKey = 'HTTP_' . strtoupper(str_replace('-', '_', $name));
    if (isset($_SERVER[$serverKey])) {
        return $_SERVER[$serverKey];
    }
    return null;
}

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
    // 1. Signature Validation (if secret is configured in .env)
    $webhookSecret = getEnvValue('MERCADO_PAGO_WEBHOOK_SECRET');
    if (!empty($webhookSecret)) {
        $xSignature = getHeaderValue('x-signature');
        $xRequestId = getHeaderValue('x-request-id');
        
        if (!$xSignature) {
            error_log("[Mercado Pago Webhook Error] Missing X-Signature header");
            sendError('Unauthorized: Missing signature', 401);
        }
        
        // Parse the X-Signature header
        $parts = explode(',', $xSignature);
        $ts = null;
        $v1 = null;
        foreach ($parts as $part) {
            $kv = explode('=', trim($part), 2);
            if (count($kv) === 2) {
                if ($kv[0] === 'ts') {
                    $ts = $kv[1];
                } elseif ($kv[0] === 'v1') {
                    $v1 = $kv[1];
                }
            }
        }
        
        if (!$ts || !$v1) {
            error_log("[Mercado Pago Webhook Error] Malformed X-Signature header");
            sendError('Unauthorized: Malformed signature', 401);
        }
        
        // Construct manifest
        $manifestParts = [];
        if ($paymentId !== null) {
            $manifestParts[] = 'id:' . $paymentId;
        }
        if ($xRequestId !== null) {
            $manifestParts[] = 'request-id:' . $xRequestId;
        }
        $manifestParts[] = 'ts:' . $ts;
        $manifest = implode(';', $manifestParts) . ';';
        
        // Verify HMAC
        $computed = hash_hmac('sha256', $manifest, $webhookSecret);
        if (!hash_equals($computed, $v1)) {
            error_log("[Mercado Pago Webhook Error] Signature mismatch. Manifest: {$manifest}, Computed: {$computed}, Received: {$v1}");
            sendError('Unauthorized: Signature mismatch', 401);
        }
        
        // Validate timestamp drift (tolerance: 5 minutes = 300 seconds)
        $nowMs = (int)(microtime(true) * 1000);
        $driftMs = abs($nowMs - (int)$ts);
        if ($driftMs > 300 * 1000) { // 5 minutes in milliseconds
            error_log("[Mercado Pago Webhook Error] Signature expired. Drift: {$driftMs}ms");
            sendError('Unauthorized: Signature expired', 401);
        }
    }

    // 2. Fetch payment details from Mercado Pago API
    $mpAccessToken = getEnvValue('MERCADO_PAGO_ACCESS_TOKEN');
    if ($mpAccessToken) {
        $ch = curl_init("https://api.mercadopago.com/v1/payments/{$paymentId}");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer {$mpAccessToken}"
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);
        
        if ($response === false) {
            error_log("[Mercado Pago Webhook Error] cURL failed: " . $curlError);
        } elseif ($httpCode === 200) {
            $payData = json_decode($response, true);
            $extRef = isset($payData['external_reference']) ? $payData['external_reference'] : null;
            $status = isset($payData['status']) ? $payData['status'] : null;
            
            if ($extRef && $status === 'approved') {
                // Confirm the booking in local database and store transaction payment ID
                $booking = getBooking($extRef);
                if ($booking) {
                    $booking['status'] = 'confirmed';
                    $booking['mercadoPagoPaymentId'] = $paymentId;
                    saveBooking($booking);
                    error_log("[Mercado Pago Webhook Success] Booking {$extRef} confirmed with payment ID {$paymentId}");
                } else {
                    error_log("[Mercado Pago Webhook Error] Booking {$extRef} not found in database");
                }
            } else {
                error_log("[Mercado Pago Webhook Alert] Payment ID {$paymentId} status: {$status}");
            }
        } else {
            error_log("[Mercado Pago Webhook Error] Failed to fetch payment details. HTTP code: {$httpCode}, Response: {$response}");
        }
    }
}

// Always respond 200 OK to Mercado Pago to stop retries
sendJson(['received' => true]);
