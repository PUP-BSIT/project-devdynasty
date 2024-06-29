<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require 'config.php';

$conn = db_connect();

$sql = "SELECT w.JobID, w.UserID, w.WithdrawnDate, j.Title, j.Description, j.Location, j.JobType, j.Rate, j.Date 
        FROM withdrawn_jobs w 
        JOIN jobposts j ON w.JobID = j.JobID";

$result = $conn->query($sql);

$withdrawn_jobs = array();

if ($result) {
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $withdrawn_jobs[] = $row;
        }
    } else {
        echo json_encode(["message" => "No withdrawn jobs found"]);
        exit();
    }
} else {
    echo json_encode(["error" => $conn->error]);
    exit();
}

db_close($conn);

echo json_encode($withdrawn_jobs);
?>
