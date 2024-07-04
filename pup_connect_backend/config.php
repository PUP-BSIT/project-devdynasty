<?php

define('DB_SERVER', '127.0.0.1:3306');
define('DB_USERNAME', 'u659407534_pup_connect');
define('DB_PASSWORD', 'PUPConnect05');
define('DB_NAME', 'u659407534_pupconnect');

function db_connect()
{
    $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}

function db_close($conn)
{
    $conn->close();
}
