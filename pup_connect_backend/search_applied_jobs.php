<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'config.php';

$conn = db_connect();

$userID = intval($_GET['userID']);
$searchTerm = isset($_GET['term']) ? $_GET['term'] : '';
$jobType = isset($_GET['jobType']) ? $_GET['jobType'] : '';

date_default_timezone_set('Asia/Manila');
$currentDate = date('Y-m-d H:i:s');

$searchTermPattern = "%{$searchTerm}%";

$query = "SELECT jobposts.JobID, jobposts.Title, jobposts.Description, jobposts.Location, jobposts.JobType, jobposts.Rate, jobposts.Date
          FROM jobposts 
          JOIN applications ON jobposts.JobID = applications.JobID 
          WHERE applications.UserID = ? 
          AND jobposts.Date > ? 
          AND (jobposts.Title LIKE ? 
          OR jobposts.Description LIKE ? 
          OR jobposts.Location LIKE ?)";

$params = [$userID, $currentDate, $searchTermPattern, $searchTermPattern, $searchTermPattern];
$paramTypes = "issss";

if ($jobType) {
    $query .= " AND jobposts.JobType = ?";
    $params[] = $jobType;
    $paramTypes .= "s";
}

$stmt = $conn->prepare($query);

if ($stmt === false) {
    echo json_encode(['message' => 'Statement preparation failed.', 'error' => $conn->error]);
    exit();
}

$stmt->bind_param($paramTypes, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$jobs = array();
while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode($jobs);
?>