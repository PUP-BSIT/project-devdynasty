<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include 'config.php';

$conn = db_connect();

if (!$conn) {
    echo json_encode(array('message' => 'Database connection failed.'));
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->UserID)) {
    $userID = intval($data->UserID);

    $sql = "SELECT * FROM jobposts WHERE UserID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userID);
    $stmt->execute();
    $result = $stmt->get_result();

    $jobs = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $jobs[] = $row;
        }
    } else {
        echo json_encode(array('message' => 'No jobs found for this UserID.'));
    }

    echo json_encode($jobs);
    $stmt->close();
} else {
    echo json_encode(array('message' => 'UserID is required.'));
}

$conn->close();
?>
