<?php
session_start();

include "api/connect-db.php";

// Initialize $username with a default value
$username = "Guest";

// Check if the username is set in the session
if (isset($_SESSION["username"])) {
    $username = $_SESSION["username"];
}
?>