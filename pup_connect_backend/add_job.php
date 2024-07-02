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

date_default_timezone_set('Asia/Manila');
$currentDateTime = date('Y-m-d H:i:s');

if (!empty($data->UserID) && !empty($data->Title) && !empty($data->Description) 
        && !empty($data->Location) && !empty($data->JobType) && !empty($data->Rate) 
        && !empty($data->Date)) {
    $sql = "INSERT INTO jobposts (UserID, Title, Description, Location, JobType, Rate, Date, Posted_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        echo json_encode(array('message' => 'Failed to prepare statement.'));
        exit();
    }
    $stmt->bind_param("issssiss", $data->UserID, $data->Title, $data->Description, $data->Location, $data->JobType, $data->Rate, $data->Date, $currentDateTime);

    if ($stmt->execute()) {
        echo json_encode(array('message' => 'Job added successfully.'));
    } else {
        echo json_encode(array('message' => 'Failed to add job.'));
    }

    $stmt->close();
} else {
    echo json_encode(array('message' => 'Incomplete job data.', "data" => $data));
}

db_close($conn);
?>
