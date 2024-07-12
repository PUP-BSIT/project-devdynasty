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

$searchTerm = isset($_GET['term']) ? $_GET['term'] : '';
$jobType = isset($_GET['jobType']) ? $_GET['jobType'] : '';

date_default_timezone_set('Asia/Manila');
$currentDate = date('Y-m-d H:i:s');

$searchTermPattern = "%{$searchTerm}%";

$sql = "SELECT 
        j.JobID, 
        j.Title, 
        j.Description, 
        j.Location, 
        j.JobType, 
        j.Rate, 
        j.Date AS end_date
    FROM jobposts j
    JOIN applications a ON j.JobID = a.JobID
    WHERE a.UserID = ? AND j.Date < NOW() AND (j.Title LIKE ? OR j.Description LIKE ? OR j.Location LIKE ?)";

if (!empty($jobType)) {
    $sql .= " AND j.JobType = ?";
}

$sql .= " ORDER BY j.Date DESC";

$stmt = $conn->prepare($sql);

if (!empty($jobType)) {
    $stmt->bind_param("issss", $userID, $searchTermPattern, $searchTermPattern, $searchTermPattern, $jobType);
} else {
    $stmt->bind_param("isss", $userID, $searchTermPattern, $searchTermPattern, $searchTermPattern);
}

$stmt->execute();
$result = $stmt->get_result();

$withdrawn_jobs = array();

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $job = $row;

        if (strtotime($row['end_date']) < time()) {
            $job['status'] = 'No longer accepts applicants';
            $withdrawn_jobs[] = $job;
        }
    }
    echo json_encode($withdrawn_jobs);
} else {
    echo json_encode(["error" => $conn->error]);
}

$stmt->close();
$conn->close();
?>
