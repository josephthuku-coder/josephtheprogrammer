<?php
// Contact Form Handler - Saves to localStorage and sends email

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : 'Contact Form Message';

// Validate
if (empty($name) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Name and message are required']);
    exit;
}

// Save to localStorage (via JavaScript response)
$messageData = [
    'id' => time() * 1000 + rand(0, 999), // Unique ID based on timestamp
    'name' => $name,
    'email' => $email,
    'subject' => $subject,
    'message' => $message,
    'timestamp' => time() * 1000, // JavaScript timestamp (milliseconds)
    'replied' => false,
    'read' => false
];

// Try to send email
$to = 'josephgthuku@gmail.com';
$email_headers = "From: $name <$email>\r\n";
$email_headers .= "Reply-To: $email\r\n";
$email_headers .= "MIME-Version: 1.0\r\n";
$email_headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$email_body = "
<html>
<head>
    <title>Contact Form Message</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: linear-gradient(145deg, #1a1a1a, #2d2d2d); color: white; padding: 20px; border-radius: 10px; }
        .content { background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 10px; }
        .footer { color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='header'>
        <h2>🎵 New Contact Form Message</h2>
        <h3>From: Josee's Finest Website</h3>
    </div>
    
    <div class='content'>
        <h3>Message Details:</h3>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Subject:</strong> $subject</p>
        <hr>
        <h3>Message:</h3>
        <p>" . nl2br(htmlspecialchars($message)) . "</p>
    </div>
    
    <div class='footer'>
        <p>Sent from Josee's Finest Website</p>
        <p>You can reply directly to this email to respond to: $email</p>
        <p>Or check your admin inbox for more options.</p>
    </div>
</body>
</html>
";

$mail_sent = mail($to, $subject . " - From: $name", $email_body, $email_headers);

if ($mail_sent) {
    echo json_encode([
        'success' => true, 
        'message' => 'Message sent successfully! We\'ll respond soon.',
        'data' => $messageData
    ]);
} else {
    // Even if email fails, save the message
    echo json_encode([
        'success' => true, 
        'message' => 'Message saved! Email notification may be delayed.',
        'data' => $messageData,
        'email_failed' => true
    ]);
}
?>
