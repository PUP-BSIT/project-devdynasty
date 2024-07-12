<?php
require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PATCH");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

function updatePassword($email, $newPassword)
{
    $conn = db_connect();

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
    $stmt->bind_param('ss', $newPassword, $email); // No hashing
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $result = true;
    } else {
        $result = false;
    }

    $stmt->close();
    $conn->close();

    return $result;
}

function emailExists($email)
{
    $conn = db_connect();

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    $exists = $result->num_rows > 0;

    $stmt->close();
    $conn->close();

    return $exists;
}

if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    $input = json_decode(file_get_contents("php://input"), true);
    $email = trim($input['email']);
    $newPassword = $input['new_password'];
    
    if (emailExists($email)) {
        if (updatePassword($email, $newPassword)) {
            echo json_encode(['status' => 'success', 'message' => 'Password has been updated successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update the password']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Email address not found']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
