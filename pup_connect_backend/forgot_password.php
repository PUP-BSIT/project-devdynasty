<?php
require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendVerificationCode($email, $code)
{
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'devdynasty5@gmail.com';
        $mail->Password = 'futstycgkntxuldm';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('devdynasty5@gmail.com', 'DevDynasty Team'); // Use your email and custom name
        $mail->addAddress($email);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Password Reset Verification Code';
        $mail->Body    = "Your verification code is: <b>$code</b>";
        $mail->AltBody = "Your verification code is: $code";

        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

function generateVerificationCode()
{
    return rand(100000, 999999);
}

function saveVerificationCode($email, $code)
{
    $conn = db_connect();

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Delete expired codes for the user
    // $stmt = $conn->prepare("DELETE FROM users WHERE email = ? AND code_expiry < NOW()");
    // $stmt->bind_param('s', $email);
    // $stmt->execute();
    // $stmt->close();

    // Insert new verification code
    $stmt = $conn->prepare("UPDATE users SET verification_code = ?, code_expiry = ? WHERE email = ?");
    $expiry_time = date('Y-m-d H:i:s', strtotime('+1 hour'));
    $stmt->bind_param('sss', $code, $expiry_time, $email);
    $stmt->execute();

    $stmt->close();
    $conn->close();
}

function verifyCode($email, $code)
{
    $conn = db_connect();

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the code is valid and not expired
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND verification_code = ? AND code_expiry > NOW()");
    $stmt->bind_param('ss', $email, $code);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Code is valid
        $stmt->close();

        // Optionally remove the code after successful verification
        $stmt = $conn->prepare("UPDATE users SET verification_code = NULL, code_expiry = NULL WHERE email = ?");
        $stmt->bind_param('s', $email);
        $stmt->execute();

        $stmt->close();
        $conn->close();
        return true;
    } else {
        // Code is invalid or expired
        $stmt->close();
        $conn->close();
        return false;
    }
}

function emailExists($email)
{
    $conn = db_connect();

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    $exists = $result->num_rows > 0;

    $stmt->close();
    $conn->close();

    return $exists;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $email = $input['email'];

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        if (emailExists($email)) {
            $code = generateVerificationCode();
            saveVerificationCode($email, $code);

            if (sendVerificationCode($email, $code)) {
                echo json_encode(['status' => 'success', 'message' => 'Verification code sent to your email']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to send verification code']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Email address not found']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email address']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
