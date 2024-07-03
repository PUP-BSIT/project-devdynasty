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

date_default_timezone_set('Asia/Manila');
$currentDate = date('Y-m-d H:i:s');

$sql = "SELECT jobposts.*, users.name
        FROM jobposts 
        JOIN users ON jobposts.UserID = users.userID
        WHERE jobposts.UserID != ?
        AND jobposts.JobID NOT IN (
            SELECT JobID 
            FROM applications 
            WHERE UserID = ?
        ) AND jobposts.Date >= ?";

$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(array('message' => 'Statement preparation failed.', 'error' => $conn->error));
    exit();
}

$stmt->bind_param("iis", $userID, $userID, $currentDate);

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
