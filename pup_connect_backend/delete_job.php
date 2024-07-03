<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
include 'config.php';

$conn = db_connect();

if (isset($_GET['JobID'])) {
    $id = $_GET['JobID'];

    // Disable foreign key checks
    $conn->query('SET FOREIGN_KEY_CHECKS=0');

    // Delete related data in applications table
    $sql_delete_applications = "DELETE FROM applications WHERE JobID = ?";
    $stmt_delete_applications = $conn->prepare($sql_delete_applications);
    if ($stmt_delete_applications) {
        $stmt_delete_applications->bind_param("i", $id);
        $stmt_delete_applications->execute();
        $stmt_delete_applications->close();
    }

    // Delete job post
    $sql = "DELETE FROM jobposts WHERE JobID = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(array('message' => 'Job and related applications deleted successfully.'));
        } else {
            echo json_encode(array('message' => 'Failed to delete job.'));
        }

        $stmt->close();
    } else {
        echo json_encode(array('message' => 'Failed to prepare statement.'));
    }

    // Enable foreign key checks
    $conn->query('SET FOREIGN_KEY_CHECKS=1');
} else {
    echo json_encode(array('message' => 'Job ID not provided.'));
}

db_close($conn);
?>
