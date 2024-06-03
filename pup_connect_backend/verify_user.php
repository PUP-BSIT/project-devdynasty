<?php

require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if (isset($_GET['token'])) {
    $token = $_GET['token'];

    $conn = db_connect();

    $sql = "SELECT * FROM users WHERE token = ?";
    if ($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $token);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $user = mysqli_fetch_assoc($result);

        if ($user) {
            $sql = "UPDATE users SET verified = 1 WHERE token = ?";
            if ($stmt = mysqli_prepare($conn, $sql)) {
                mysqli_stmt_bind_param($stmt, "s", $token);
                mysqli_stmt_execute($stmt);
                echo json_encode(["status" => "success", "message" => "Email verified successfully."]);
                exit();
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid verification link."]);
        }

        mysqli_stmt_close($stmt);
    }

    mysqli_close($conn);
} else {
    echo json_encode(["status" => "error", "message" => "No token provided."]);
}
