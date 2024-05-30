<?php
require_once 'config.php';

header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function validate_input($data)
{
    $data = trim($data);             
    $data = stripslashes($data);     
    $data = htmlspecialchars($data); 
    return $data;                    
}

function is_email_registered($email)
{
    $conn = db_connect();
    $sql = "SELECT userID FROM users WHERE email = ?";

    if ($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $param_email);
        $param_email = $email;

        if (mysqli_stmt_execute($stmt)) {
            mysqli_stmt_store_result($stmt);

            if (mysqli_stmt_num_rows($stmt) > 0) {
                return true; 
            } else {
                return false; 
            }
        }

        mysqli_stmt_close($stmt);
    }

    db_close($conn);
    return false;
}

function register_user($name, $email, $password)
{
    $conn = db_connect();

    $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    if ($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "sss", $param_name, $param_email, $param_password);

        $param_name = $name;
        $param_email = $email;
        $param_password = $password; 

        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(["status" => "success", "message" => "Registration successful."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Something went wrong. Please try again later."]);
        }

        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(["status" => "error", "message" => "Could not prepare statement."]);
    }

    db_close($conn);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input = json_decode(file_get_contents("php://input"), true);

    if (isset($input['name']) && isset($input['email']) && isset($input['password']) && isset($input['confirmPassword'])) {
        $name = validate_input($input['name']);
        $email = validate_input($input['email']);
        $password = validate_input($input['password']);
        $confirm_password = validate_input($input['confirmPassword']);

        if ($password !== $confirm_password) {
            echo json_encode(["status" => "error", "message" => "Passwords do not match."]);
            exit;
        }

        if (is_email_registered($email)) {
            echo json_encode(["status" => "error", "message" => "Email is already registered."]);
            exit;
        }

        register_user($name, $email, $password);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid input."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}