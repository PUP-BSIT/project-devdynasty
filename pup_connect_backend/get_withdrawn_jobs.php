<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require 'config.php';

$conn = db_connect();

if (isset($_GET['userID'])) {
    $userID = intval($_GET['userID']);
} else {
    echo json_encode(["error" => "UserID not provided"]);
    exit();
}

$sql = "
    SELECT 
        j.JobID, 
        j.Title, 
        j.Description, 
        j.Location, 
        j.JobType, 
        j.Rate, 
        j.Date AS end_date
    FROM jobposts j
    JOIN applications a ON j.JobID = a.JobID
    WHERE a.UserID = ? AND j.Date < NOW()
    ORDER BY j.Date DESC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();

$withdrawn_jobs = array();

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $job = $row;

        if (strtotime($row['end_date']) < time()) {
            $job['status'] = 'No longer accepts applicants';
            $jobs[] = $job;
        }
    }
    echo json_encode($jobs);
} else {
    echo json_encode(["error" => $conn->error]);
}

$stmt->close();
$conn->close();
?>
