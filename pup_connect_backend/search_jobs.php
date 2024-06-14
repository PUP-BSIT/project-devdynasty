<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'config.php';

$conn = db_connect();

$searchTerm = isset($_GET['term']) ? $_GET['term'] : '';
$jobType = isset($_GET['jobType']) ? $_GET['jobType'] : '';

$query = "SELECT * FROM jobposts WHERE (title LIKE '%$searchTerm%' OR Description LIKE '%$searchTerm%' OR Location LIKE '%$searchTerm%')";

if ($jobType) {
    $query .= " AND JobType = '$jobType'";
}

$result = $conn->query($query);
$jobs = array();

while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

echo json_encode($jobs);

db_close($conn);
?>
