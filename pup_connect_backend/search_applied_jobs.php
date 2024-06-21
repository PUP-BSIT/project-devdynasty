<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'config.php';

$conn = db_connect();

$userID = intval($_GET['userID']);
$searchTerm = isset($_GET['term']) ? $_GET['term'] : '';
$jobType = isset($_GET['jobType']) ? $_GET['jobType'] : '';

$query = "SELECT jobposts.* FROM jobposts 
          JOIN applications ON jobposts.JobID = applications.JobID 
          WHERE applications.UserID = $userID 
          AND (jobposts.Title LIKE '%$searchTerm%' 
          OR jobposts.Description LIKE '%$searchTerm%' 
          OR jobposts.Location LIKE '%$searchTerm%')";

if ($jobType) {
    $query .= " AND jobposts.JobType = '$jobType'";
}

$result = $conn->query($query);
$jobs = array();

while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

echo json_encode($jobs);

db_close($conn);
?>