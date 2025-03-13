<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Your email address where the messages should be sent
    $to = "swethasksn@gmail.com";  // Replace with your actual email

    // Get form data
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $subject = isset($_POST['subject']) ? strip_tags(trim($_POST['subject'])) : 'New Contact Form Submission';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Validate form fields
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Please complete all fields correctly.";
        exit;
    }

    // Email Headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "OK";  // This tells the JS file that the email was sent successfully
    } else {
        echo "Error sending email. Please try again.";
    }
} else {
    echo "Invalid request.";
}
?>

