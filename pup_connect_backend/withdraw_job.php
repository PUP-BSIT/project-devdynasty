<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include 'config.php';

// Ensure you have UserID and JobID from POST data
$data = json_decode(file_get_contents("php://input"));

$userID = $data->UserID;
$jobID = $data->JobID;

$conn = db_connect();

// Move application data to withdrawn_jobs table
$sqlMove = "INSERT INTO withdrawn_jobs (UserID, JobID)
            SELECT UserID, JobID FROM applications
            WHERE UserID = ? AND JobID = ?";
$stmtMove = $conn->prepare($sqlMove);
$stmtMove->bind_param("ii", $userID, $jobID);

if ($stmtMove->execute()) {
    // Optionally, you can remove the application from applications table
    $sqlDelete = "DELETE FROM applications WHERE UserID = ? AND JobID = ?";
    $stmtDelete = $conn->prepare($sqlDelete);
    $stmtDelete->bind_param("ii", $userID, $jobID);
    $stmtDelete->execute();

    echo json_encode(array("message" => "Job application withdrawn successfully"));
} else {
    echo json_encode(array("message" => "Failed to withdraw job application"));
}

$stmtMove->close();
$stmtDelete->close();
db_close($conn);
?>
