<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include 'config.php';

$conn = db_connect();

$userID = intval($_GET['userID']);

date_default_timezone_set('Asia/Manila');
$currentDate = date('Y-m-d H:i:s');

$sql = "SELECT jobposts.JobID, jobposts.Title, jobposts.Description, jobposts.Location, jobposts.JobType, jobposts.Rate, jobposts.Date
        FROM applications
        JOIN jobposts ON applications.JobID = jobposts.JobID
        WHERE applications.UserID = ? AND jobposts.Date > ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID, $currentDate);
$stmt->execute();
$result = $stmt->get_result();

$appliedJobs = array();
while($row = $result->fetch_assoc()) {
    $appliedJobs[] = $row;
}

$stmt->close();
db_close($conn);

echo json_encode($appliedJobs);
?>