<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include 'config.php';

$conn = db_connect();

$jobId = intval($_GET['jobId']);

$sql = "SELECT applications.ApplicationID, applications.UserID, applications.ApplicationDate, 
                users.name, users.email,
                profiles.profile_picture, profiles.location, profiles.phone_number, profiles.description, profiles.skills
        FROM applications
        JOIN users ON applications.UserID = users.UserID
        JOIN profiles ON users.UserID = profiles.UserID
        WHERE applications.JobID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $jobId);
$stmt->execute();
$result = $stmt->get_result();

$applicants = array();
while($row = $result->fetch_assoc()) {
    $applicants[] = $row;
}

$stmt->close();
db_close($conn);

echo json_encode($applicants);
?>