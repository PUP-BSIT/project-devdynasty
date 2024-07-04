<?php
require 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input) || !isset($input['user_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input data']);
        exit;
    }

    $user_id = $input['user_id'];

    $conn = db_connect();

    $result = $conn->query("SHOW COLUMNS FROM users LIKE 'userID'");
    if ($result->num_rows == 0) {
        echo json_encode(['status' => 'error', 'message' => 'Column id does not exist in users table']);
        db_close($conn);
        exit;
    }

    $stmt = $conn->prepare("
        SELECT 
        u.name, 
        u.email, 
        p.description, 
        p.skills, 
        p.profile_picture, 
        p.phone_number, 
        p.location 
    FROM 
        users u 
    JOIN 
        profiles p 
    ON 
        u.userID = p.userID 
    WHERE 
        u.userID = ?
    ");
    if ($stmt) {
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user_details = $result->fetch_assoc();
            echo json_encode(['status' => 'success', 'data' => $user_details]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
        }

        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to prepare statement']);
    }

    db_close($conn);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
