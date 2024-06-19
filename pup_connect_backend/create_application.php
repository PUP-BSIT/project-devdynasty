<?php
include 'config.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

$conn = db_connect();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['UserID']) && isset($input['JobID'])) {
        $UserID = $input['UserID'];
        $JobID = $input['JobID'];
        $ApplicationDate = isset($input['ApplicationDate']) ? $input['ApplicationDate'] : date('Y-m-d H:i:s');

        $stmt = $conn->prepare("INSERT INTO applications (UserID, JobID, ApplicationDate) VALUES (?, ?, ?)");
        $stmt->bind_param("iis", $UserID, $JobID, $ApplicationDate);

        if ($stmt->execute()) {
            $response = array("status" => "success", "message" => "ApplicationID:" . $stmt->insert_id);
        } else {
            $response = array("status" => "error", "message" => "Failed to insert data");
        }

        $stmt->close();
    } else {
        $response = array("status" => "error", "message" => "Invalid input");
    }
} else {
    $response = array("status" => "error", "message" => "Invalid request method");
}

$conn->close();

echo json_encode($response);
