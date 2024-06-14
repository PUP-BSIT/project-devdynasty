<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
include 'config.php';

$conn = db_connect();

if (isset($_GET['JobID'])) {
    $id = $_GET['JobID'];

    $sql = "DELETE FROM jobposts WHERE JobID = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(array('message' => 'Job deleted successfully.'));
        } else {
            echo json_encode(array('message' => 'Failed to delete job.'));
        }

        $stmt->close();
    } else {
        echo json_encode(array('message' => 'Failed to prepare statement.'));
    }
} else {
    echo json_encode(array('message' => 'Job ID not provided.'));
}

db_close($conn);
?>
