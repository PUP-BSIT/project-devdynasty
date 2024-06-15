<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include 'config.php';

$conn = db_connect();

if (!$conn) {
    echo json_encode(array('message' => 'Database connection failed.'));
    exit();
}

$jobID = isset($_GET['id']) ? intval($_GET['id']) : 0;
$data = json_decode(file_get_contents("php://input"));

if ($jobID > 0 && !empty($data->Title) && !empty($data->Description) && !empty($data->Location) && !empty($data->JobType) && !empty($data->Rate) && !empty($data->Date)) {
    $sql = "UPDATE jobposts SET Title = ?, Description = ?, Location = ?, JobType = ?, Rate = ?, Date = ? WHERE JobID = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        echo json_encode(array('message' => 'Failed to prepare statement.', 'error' => $conn->error));
        exit();
    }
    $stmt->bind_param("ssssssi", $data->Title, $data->Description, $data->Location, $data->JobType, $data->Rate, $data->Date, $jobID);

    if ($stmt->execute()) {
        echo json_encode(array('message' => 'Job updated successfully.'));
    } else {
        echo json_encode(array('message' => 'Failed to update job.', 'error' => $stmt->error));
    }

    $stmt->close();
} else {
    echo json_encode(array('message' => 'Incomplete job data or invalid job ID.'));
}

$conn->close();
?>
