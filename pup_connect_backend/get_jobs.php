<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'config.php';

if (!isset($_GET['userId'])) {
    echo json_encode(array('message' => 'User ID parameter is required.'));
    exit();
}

$userID = intval($_GET['userId']);

$conn = db_connect();

if (!$conn) {
    echo json_encode(array('message' => 'Database connection failed.'));
    exit();
}

$sql = "SELECT jobposts.*, users.name
        FROM jobposts 
        JOIN users ON jobposts.UserID = users.userID
        WHERE jobposts.UserID != ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);

$stmt->execute();

$result = $stmt->get_result();

$jobs = array();
while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode($jobs);
