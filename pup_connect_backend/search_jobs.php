<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'config.php';

if (!isset($_GET['userId'])) {
    echo json_encode(array('message' => 'User ID parameter is required.'));
    exit();
}

$userID = intval($_GET['userId']);

$searchTerm = isset($_GET['term']) ? $_GET['term'] : '';
$jobType = isset($_GET['jobType']) ? $_GET['jobType'] : '';

$conn = db_connect();

if (!$conn) {
    echo json_encode(array('message' => 'Database connection failed.'));
    exit();
}

$query = "SELECT * FROM jobposts 
          WHERE (title LIKE ? OR Description LIKE ? OR Location LIKE ?)
          AND UserID NOT IN (?)";

if (!empty($jobType)) {
    $query .= " AND JobType = ?";
}

$stmt = $conn->prepare($query);

$searchTermPattern = "%{$searchTerm}%";
$stmt->bind_param("ssis", $searchTermPattern, $searchTermPattern, $searchTermPattern, $userID);

if (!empty($jobType)) {
    $stmt->bind_param("s", $jobType);
}

$stmt->execute();

$result = $stmt->get_result();

$jobs = array();
while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

echo json_encode($jobs);

$stmt->close();
$conn->close();
