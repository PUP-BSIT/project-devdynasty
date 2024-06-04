<?php
require 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_SESSION['user_id']) && isset($_SESSION['username'])) {
        $user_id = $_SESSION['user_id'];
        $name = $_SESSION['username'];

        $conn = db_connect();

        $stmt = $conn->prepare("SELECT * FROM users WHERE id = ? AND name = ?");
        if ($stmt) {
            $stmt->bind_param("is", $user_id, $name);
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
        echo json_encode(['status' => 'error', 'message' => 'User ID or username not set in session']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
