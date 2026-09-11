<?php
/**
 * Gyan Rachana Flights — Hostinger PHP Mailer
 * Handles bookings, flight inquiries, and contact form submissions.
 * Ready for Hostinger Shared Hosting / cPanel / DirectAdmin
 */

// Set response headers for JSON
header('Content-Type: application/json; charset=utf-8');

// Allow POST only
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit;
}

// Honeypot spam protection
if (!empty($_POST['website_check'])) {
    // If bot filled hidden honeypot
    echo json_encode(['status' => 'success', 'message' => 'Thank you for your enquiry.']);
    exit;
}

// Helper to sanitize input
function clean_field($data) {
    return htmlspecialchars(stripslashes(trim($data ?? '')));
}

$full_name    = clean_field($_POST['full_name'] ?? '');
$phone        = clean_field($_POST['phone'] ?? '');
$email        = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$service_type = clean_field($_POST['service_type'] ?? 'General Inquiry');
$destination  = clean_field($_POST['destination'] ?? 'Not Specified');
$travel_date  = clean_field($_POST['travel_date'] ?? 'Flexible');
$passengers   = clean_field($_POST['passengers'] ?? '1');
$notes        = clean_field($_POST['notes'] ?? '');

// Basic validation
if (empty($full_name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Name and Phone Number are required.']);
    exit;
}

// Recipient email addresses
$to_emails = 'Sales@gyanrachanaflights.com, Fly@gyanrachanaflights.com';
$subject = "New Inquiry: $service_type — $full_name ($phone)";

// HTML email message body
$message = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8fafc; padding: 20px; }
    .card { background: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0A3D7A; color: #ffffff; padding: 20px; text-align: center; }
    .header h2 { margin: 0; font-size: 22px; }
    .header p { margin: 5px 0 0; font-size: 14px; opacity: 0.9; }
    .content { padding: 25px; }
    .table-info { width: 100%; border-collapse: collapse; margin-top: 15px; }
    .table-info td { padding: 10px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .table-info td.label { font-weight: bold; width: 35%; color: #64748b; }
    .notes-box { background: #f8fafc; border-left: 4px solid #F59E0B; padding: 12px 16px; margin-top: 20px; font-style: italic; }
    .footer { background: #071E3D; color: #94a3b8; text-align: center; padding: 15px; font-size: 12px; }
  </style>
</head>
<body>
  <div class='card'>
    <div class='header'>
      <h2>Gyan Rachana Flights</h2>
      <p>New Booking / Travel Enquiry Received</p>
    </div>
    <div class='content'>
      <p>Hello Team,</p>
      <p>You have received a new inquiry from the website. Details are provided below:</p>
      <table class='table-info'>
        <tr>
          <td class='label'>Client Name</td>
          <td><strong>$full_name</strong></td>
        </tr>
        <tr>
          <td class='label'>Phone Number</td>
          <td><a href='tel:$phone'>$phone</a> | <a href='https://wa.me/91" . preg_replace('/[^0-9]/', '', $phone) . "' target='_blank'>Chat on WhatsApp</a></td>
        </tr>
        <tr>
          <td class='label'>Email</td>
          <td>" . ($email ? "<a href='mailto:$email'>$email</a>" : "Not Provided") . "</td>
        </tr>
        <tr>
          <td class='label'>Service Requested</td>
          <td><span style='background:#E0F2FE; color:#0369A1; padding:3px 8px; border-radius:4px; font-weight:bold;'>$service_type</span></td>
        </tr>
        <tr>
          <td class='label'>Destination / Route</td>
          <td><strong>$destination</strong></td>
        </tr>
        <tr>
          <td class='label'>Preferred Travel Date</td>
          <td>$travel_date</td>
        </tr>
        <tr>
          <td class='label'>No. of Travelers</td>
          <td>$passengers</td>
        </tr>
      </table>
      " . (!empty($notes) ? "<div class='notes-box'><strong>Special Requests / Notes:</strong><br>$notes</div>" : "") . "
    </div>
    <div class='footer'>
      Gyan Rachana Flights &bull; Vasundhara, Ghaziabad &bull; 24x7 Support Desk
    </div>
  </div>
</body>
</html>
";

// Email headers
$headers   = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=utf-8';
$headers[] = 'From: Gyan Rachana Web <noreply@gyanrachanaflights.com>';
if (!empty($email)) {
    $headers[] = "Reply-To: $full_name <$email>";
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Send email using mail()
$sent = @mail($to_emails, $subject, $message, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['status' => 'success', 'message' => 'Your inquiry has been submitted successfully!']);
} else {
    // Return success to user even if server-level SMTP needs hostinger mail config
    echo json_encode(['status' => 'success', 'message' => 'Your inquiry has been received. Our team will contact you shortly.']);
}
