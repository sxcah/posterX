<?php

session_start();
include "connect-db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve data from the POST request
    $username = isset($_POST["username"]) ? trim($_POST["username"]) : "";
    $email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $contact_num = isset($_POST["contact-number"]) ? trim($_POST["email"]) : "";
    $fname = isset($_POST["first-name"]) ? trim($_POST["first-name"]) : "";
    $lname = isset($_POST["last-name"]) ? trim($_POST["last-name"]) : "";
    $password = isset($_POST["password"]) ? $_POST["password"] : "";
    $confirm_password = isset($_POST["confirm-password"]) ? $_POST["confirm-password"] : "";

    $errors = array();

    // --- Server-side validation ---

    // Validate username
    if (empty($username)) {
        $errors["username"] = "Username is required.";
    } elseif (!preg_match("/^[a-zA-Z0-9_]+$/", $username)) {
        $errors["username"] = "Username can only contain letters, numbers, and underscores.";
    }

    // Validate First Name and Last Name
    if (empty($fname)) {
        $errors["first-name"] = "FIrst Name is required.";
    } elseif (!preg_match("/^[a-zA-Z]+$/", $fname)) {
        $errors["first-name"] = "First Name can only contain letters.";
    }

    if (empty($lname)) {
        $errors["last-name"] = "First Name is required.";
    } elseif (!preg_match("/^[a-zA-Z]+$/", $lname)) {
        $errors["last-name"] = "Last Name can only contain letters.";
    }

    // Validate email
    if (empty($email)) {
        $errors["email"] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors["email"] = "Invalid email format.";
    }

    // Validate contact number
    if (empty($contact_num)) {
        $errors["contact-number"] = "Contact number is required.";
    } elseif (strlen($contact_num) < 11) {
        $errors["contact-number"] = "Contact number must be at least 11 digits.";
    }

    // Validate password
    if (empty($password)) {
        $errors["password"] = "Password is required.";
    } elseif (strlen($password) < 8) {
        $errors["password"] = "Password must be at least 8 characters long.";
    }

    // Validate confirm password
    if (empty($confirm_password)) {
        $errors["confirm_password"] = "Please confirm your password.";
    } elseif ($password !== $confirm_password) {
        $errors["confirm_password"] = "Passwords do not match.";
    }

    // Check for existing username or email
    $stmt_check = $conn->prepare("SELECT ui.userID FROM user_information ui JOIN user_account ua ON ui.userID = ua.userID WHERE ua.username = ? OR ui.email = ?");
    $stmt_check->bind_param("ss", $username, $email);
    $stmt_check->execute();
    $stmt_check->store_result();

    if ($stmt_check->num_rows > 0) {
        $errors["general"] = "Username or email already exists.";
    }
    $stmt_check->close();

    // If there are no validation errors, proceed with insertion
    if (empty($errors)) {
        // Hash the password securely
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Start transaction to ensure atomicity
        $conn->begin_transaction();

        try {
            // Insert email into user_information
            $stmt_info = $conn->prepare("INSERT INTO user_information (email, contact_num, `first-name`, `last-name`) VALUES (?, ?, ?, ?)");
            $stmt_info->bind_param("ssss", $email, $contact_num, $fname, $lname);

            if ($stmt_info->execute()) {
                $userID = $conn->insert_id; // Get the auto-generated userID
                $stmt_info->close();

                // Insert username and hashed password into user_account
                $stmt_account = $conn->prepare("INSERT INTO user_account (userID, username, password) VALUES (?, ?, ?)");
                $stmt_account->bind_param("iss", $userID, $username, $hashed_password);

                if ($stmt_account->execute()) {
                    $stmt_account->close();
                    $conn->commit(); // Commit the transaction
                    $response = array("success" => true, "message" => "Registration successful!");
                    echo json_encode($response);
                } else {
                    $conn->rollback(); // Rollback the transaction on error
                    $response = array("success" => false, "message" => "Error creating account details.", "error" => $stmt_account->error);
                    echo json_encode($response);
                    http_response_code(500);
                }
            } else {
                $conn->rollback(); // Rollback the transaction on error
                $response = array("success" => false, "message" => "Error saving user information.", "error" => $stmt_info->error);
                echo json_encode($response);
                http_response_code(500);
            }
        } catch (Exception $e) {
            $conn->rollback(); // Rollback on any exception
            $response = array("success" => false, "message" => "An unexpected error occurred.", "error" => $e->getMessage());
            echo json_encode($response);
            http_response_code(500);
        }
    } else {
        // If there are validation errors, send them back as JSON
        http_response_code(400); // Bad Request
        echo json_encode($errors);
    }
} else {
    // If the request method is not POST
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("error" => "Invalid request method."));
}

// Close the database connection
$conn->close();
?>