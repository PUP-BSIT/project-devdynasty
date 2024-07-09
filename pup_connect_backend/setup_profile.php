<?php

require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $token = $_POST['userToken'];

    $conn = db_connect();

    $sql = "SELECT userID FROM users WHERE token = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        $userId = $user['userID'];

        $target_dir = "profile_img_uploads/";
        $target_file = $target_dir . basename($_FILES["profilePicture"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        $check = getimagesize($_FILES["profilePicture"]["tmp_name"]);
        if ($check !== false) {
            $uploadOk = 1;
        } else {
            echo json_encode(["error" => "File is not an image."]);
            $uploadOk = 0;
        }

        if ($_FILES["profilePicture"]["size"] > 5000000) {
            echo json_encode(["error" => "Sorry, your file is too large."]);
            $uploadOk = 0;
        }

        if (
            $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif"
        ) {
            echo json_encode(["error" => "Sorry, only JPG, JPEG, PNG & GIF files are allowed."]);
            $uploadOk = 0;
        }

        if ($uploadOk == 0) {
            echo json_encode(["error" => "Sorry, your file was not uploaded."]);
        } else {
            if (move_uploaded_file($_FILES["profilePicture"]["tmp_name"], $target_file)) {

                $description = $_POST['description'];
                $location = $_POST['location'];
                $phoneNumber = $_POST['phoneNumber'];
                $skills = $_POST['skills'];
                $profilePicture = $target_file;


                $sql = "INSERT INTO profiles (userID, description, location, phone_number, skills, profile_picture)
                        VALUES (?, ?, ?, ?, ?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("isssss", $userId, $description, $location, $phoneNumber, $skills, $profilePicture);

                if ($stmt->execute()) {
                    echo json_encode(["success" => "Profile completed. Please log in to your account."]);
                } else {
                    echo json_encode(["error" => "Error: " . $stmt->error]);
                }

                $stmt->close();
            } else {
                echo json_encode(["error" => "Sorry, there was an error uploading your file."]);
            }
        }
    } else {
        echo json_encode(["error" => "Invalid token. User not found."]);
    }

    $conn->close();
} else {
    echo json_encode(["error" => "Sorry, Invalid request."]);
}
