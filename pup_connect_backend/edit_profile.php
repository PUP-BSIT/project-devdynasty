<?php

require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = isset($_POST['userID']) ? $_POST['userID'] : null;
    $description = isset($_POST['description']) ? $_POST['description'] : null;
    $location = isset($_POST['location']) ? $_POST['location'] : null;
    $phoneNumber = isset($_POST['phoneNumber']) ? $_POST['phoneNumber'] : null;
    $skills = isset($_POST['skills']) ? $_POST['skills'] : null;
    $profilePicture = null;

    if (isset($_FILES['profilePicture'])) {
        $profilePicture = 'profile_img_uploads/' . uniqid() . '.jpg';
        move_uploaded_file($_FILES['profilePicture']['tmp_name'], $profilePicture);
    }

    $conn = db_connect();

    $sql = "SELECT userID FROM profiles WHERE userID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        $sql = "UPDATE profiles SET ";
        $params = [];
        $types = "";

        if ($description !== null) {
            $sql .= "description = ?, ";
            $params[] = $description;
            $types .= "s";
        }

        if ($location !== null) {
            $sql .= "location = ?, ";
            $params[] = $location;
            $types .= "s";
        }

        if ($phoneNumber !== null) {
            $sql .= "phone_number = ?, ";
            $params[] = $phoneNumber;
            $types .= "s";
        }

        if ($skills !== null) {
            $sql .= "skills = ?, ";
            $params[] = $skills;
            $types .= "s";
        }

        if ($profilePicture !== null) {
            $sql .= "profile_picture = ?, ";
            $params[] = $profilePicture;
            $types .= "s";
        }

        $sql = rtrim($sql, ", ") . " WHERE userID = ?";
        $params[] = $userId;
        $types .= "i";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param($types, ...$params);

        if ($stmt->execute()) {
            $response = ["message" => "Profile updated successfully."];
        } else {
            $response = ["message" => "Error: " . $stmt->error];
        }

        $stmt->close();
    } else {
        $response = ["message" => "Invalid userID. User not found."];
    }

    $conn->close();
} else {
    $response = ["message" => "Invalid request method."];
}

echo json_encode($response);
