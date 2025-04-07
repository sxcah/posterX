<?php

session_start();
include "connect-db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = isset($_POST["username"]) ? trim($_POST["username"]) : "";
    $password = isset($_POST["password"]) ? $_POST["password"] : "";

    if (empty($username) || empty($password)) {
        http_response_code(400);
        echo json_encode(array("error" => "Username and password are required."));
        exit();
    }

    $stmt = $conn->prepare("SELECT ua.userID, ua.password FROM user_account ua WHERE ua.username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($userID, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            $_SESSION["username"] = $username;
            // Authentication successful
            // You might want to start a session or create a token here
            echo json_encode(array("success" => true, "userID" => $userID, "message" => "Login successful!"));
        } else {
            // Incorrect password
            http_response_code(401); // Unauthorized
            echo json_encode(array("error" => "Invalid username or password."));
        }
    } else {
        // Username not found
        http_response_code(401); // Unauthorized
        echo json_encode(array("error" => "Invalid username or password."));
    }

    $stmt->close();
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("error" => "Invalid request method."));
}

$conn->close();

?>