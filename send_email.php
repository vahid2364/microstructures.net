<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $to = "attari.v@tamu.edu";
    $subject = "New Contact Form Submission";
    $headers = "From: $email";

    $mailBody = "Name: $name\n";
    $mailBody .= "Email: $email\n\n";
    $mailBody .= "Message:\n$message";

    // Send email
    mail($to, $subject, $mailBody, $headers);

    // Redirect to a thank you page or back to the form
    header("Location: thank_you.html");
    exit();
}
?>
