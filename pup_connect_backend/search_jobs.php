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
date_default_timezone_set('Asia/Manila');
$currentDate = date('Y-m-d H:i:s');

$searchTermPattern = "%{$searchTerm}%";

$query = "SELECT jobposts.*, users.name
          FROM jobposts 
          JOIN users ON jobposts.UserID = users.userID   
          WHERE (jobposts.Title LIKE ? OR jobposts.Description LIKE ? OR jobposts.Location LIKE ?)
          AND jobposts.UserID != ?
          AND jobposts.JobID NOT IN (
              SELECT JobID 
              FROM applications 
              WHERE UserID = ?
          ) AND jobposts.Date >= ?";

$paramTypes = "sssiss";
$params = [$searchTermPattern, $searchTermPattern, $searchTermPattern, $userID, $userID, $currentDate];

if (!empty($jobType)) {
    $query .= " AND JobType LIKE ?";
    $paramTypes .= "s";
    $params[] = $jobType;
}

$stmt = $conn->prepare($query);

if ($stmt === false) {
    echo json_encode(array('message' => 'Statement preparation failed.'));
    exit();
}

function refValues($arr)
{
    $refs = [];
    foreach ($arr as $key => $value) {
        $refs[$key] = &$arr[$key];
    }
    return $refs;
}

$paramsRefs = refValues($params);
array_unshift($paramsRefs, $paramTypes);

call_user_func_array([$stmt, 'bind_param'], $paramsRefs);

$stmt->execute();

$result = $stmt->get_result();

$jobs = [];
while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

echo json_encode($jobs);

$stmt->close();
$conn->close();
?>