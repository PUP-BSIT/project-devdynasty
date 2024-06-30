<?php
require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

$verification_code = isset($_POST['code']) ? $_POST['code'] : '';

if (empty($verification_code) || !preg_match('/^\d{6}$/', $verification_code)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid verification code']);
    exit();
}

$conn = db_connect();

$sql = "SELECT email, code_expiry FROM users WHERE verification_code = ?";
$stmt = mysqli_prepare($conn, $sql);

if ($stmt === false) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . mysqli_error($conn)]);
    exit();
}

mysqli_stmt_bind_param($stmt, 's', $verification_code);
mysqli_stmt_execute($stmt);
mysqli_stmt_bind_result($stmt, $email, $code_expiry);
mysqli_stmt_fetch($stmt);

if ($email) {
    $current_time = new DateTime();
    $created_time = new DateTime($code_expiry);
    $interval = $current_time->diff($created_time);

    if ($interval->h < 1 && $interval->invert == 0) { // Check if the code was created within the last hour
        echo json_encode(['status' => 'success', 'message' => $email]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Verification code has expired']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Verification code not found']);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
