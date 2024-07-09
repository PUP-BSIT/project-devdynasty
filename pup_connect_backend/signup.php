<?php
require_once 'config.php';

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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

function is_email_registered_pending($email)
{
    $conn = db_connect();
    $sql = "SELECT userID, token FROM users WHERE email = ? AND verified = 0";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $param_email);
    $param_email = $email;
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);
    $result = mysqli_stmt_num_rows($stmt) > 0;
    mysqli_stmt_close($stmt);
    db_close($conn);
    return $result;
}

function resend_verification_email($email, $new_token)
{
    $conn = db_connect();
    
    // Update the token in the database
    $sql_update_token = "UPDATE users SET token = ? WHERE email = ?";
    $stmt_update_token = mysqli_prepare($conn, $sql_update_token);
    mysqli_stmt_bind_param($stmt_update_token, "ss", $param_new_token, $param_email);
    $param_new_token = $new_token;
    $param_email = $email;
    mysqli_stmt_execute($stmt_update_token);
    mysqli_stmt_close($stmt_update_token);
    db_close($conn);

    // Send verification email with the updated token
    try {
        $mail = new PHPMailer(true);
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'devdynasty5@gmail.com';
        $mail->Password   = 'futstycgkntxuldm';
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom('devdynasty5@gmail.com');
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->Subject = 'Email Verification';
        $mail->Body    = "Please click the link below to verify your email address:<br>";
        $mail->Body   .= "<a href='https://pupconnect.online/profile-setup/$new_token'>Set up your profile</a>";

        if ($mail->send()) {
            echo json_encode(["status" => "success", "message" => "Verification email resent to your email address."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
}

function register_user($name, $email, $password, $new_token)
{
    $conn = db_connect();

    if (is_email_registered_pending($email)) {
        resend_verification_email($email, $new_token);
        return;
    }
    $sql = "INSERT INTO users (name, email, password, token, verified) VALUES (?, ?, ?, ?, 0)";
    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "ssss", $param_name, $param_email, $param_password, $param_token);
        $param_name = $name;
        $param_email = $email;
        $param_password = $password;
        $param_token = $new_token;

        if (mysqli_stmt_execute($stmt)) {
            resend_verification_email($email, $new_token);
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

        $new_token = bin2hex(random_bytes(16));

        register_user($name, $email, $password, $new_token);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid input."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
