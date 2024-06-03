<?php
session_start();

require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input = json_decode(file_get_contents("php://input"), true);
    $email = $input['email'];
    $password = $input['password'];

    $conn = db_connect();

    $sql = "SELECT * FROM users WHERE email = ?";

    if ($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $email);
        if (mysqli_stmt_execute($stmt)) {
            $result = mysqli_stmt_get_result($stmt);
            if (mysqli_num_rows($result) == 1) {
                $row = mysqli_fetch_assoc($result);
                if ($password == $row['password']) {
                    if ($row['verified']) {
                        $_SESSION['user_id'] = $row['userID'];
                        $_SESSION['username'] = $row['name'];
                        echo json_encode(["status" => "success", "message" => "Login successful."]);
                    } else {
                        echo json_encode(["status" => "error", "message" => "Your email address has not been verified. Please check your email for the verification link.."]);
                    }
                } else {
                    echo json_encode(["status" => "error", "message" => "Incorrect password."]);
                }
            } else {
                echo json_encode(["status" => "error", "message" => "User not found."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Could not execute statement."]);
        }
        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(["status" => "error", "message" => "Could not prepare statement."]);
    }
    db_close($conn);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
