<?php

// Prevent multiple executions - exit immediately if already run
if (defined('FORM_PROCESS_EXECUTED')) {
    exit;
}
define('FORM_PROCESS_EXECUTED', true);

// Don't display raw PHP errors to users
ini_set('display_errors', '0');
error_reporting(E_ALL);
ini_set('log_errors', '1');

// Check if vendor/autoload exists
if (!file_exists(__DIR__ . '/vendor/autoload.php')) {
    echo "Configuration error. Please run: composer install";
    error_log("Resend PHP SDK not installed");
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/.env.php';

function get_post_value($key)
{
    return trim((string) ($_POST[$key] ?? ""));
}

function require_post_value($key, $label, &$errors)
{
    $value = get_post_value($key);

    if ($value === "") {
        $errors[] = $label . " is required";
    }

    return $value;
}

function handle_logo_upload(&$errors)
{
    if (!isset($_FILES["logo_file"]) || $_FILES["logo_file"]["error"] === UPLOAD_ERR_NO_FILE) {
        return "";
    }

    $file = $_FILES["logo_file"];

    if ($file["error"] !== UPLOAD_ERR_OK) {
        $errors[] = "Logo upload failed";
        return "";
    }

    if ($file["size"] > 5 * 1024 * 1024) {
        $errors[] = "Logo file must be 5MB or smaller";
        return "";
    }

    $allowedExtensions = ["png", "jpg", "jpeg", "svg", "pdf"];
    $allowedMimeTypes = [
        "image/png",
        "image/jpeg",
        "image/svg+xml",
        "application/pdf"
    ];

    $extension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

    if (!in_array($extension, $allowedExtensions, true)) {
        $errors[] = "Logo file must be a PNG, JPG, SVG, or PDF";
        return "";
    }

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = $finfo ? finfo_file($finfo, $file["tmp_name"]) : "";

    if ($finfo) {
        finfo_close($finfo);
    }

    if ($mimeType === false || !in_array($mimeType, $allowedMimeTypes, true)) {
        $errors[] = "Logo file type is not allowed";
        return "";
    }

    $uploadDirectory = __DIR__ . DIRECTORY_SEPARATOR . "uploads" . DIRECTORY_SEPARATOR . "launchpad-logos";

    if (!is_dir($uploadDirectory) && !mkdir($uploadDirectory, 0755, true) && !is_dir($uploadDirectory)) {
        $errors[] = "Unable to create logo upload directory";
        return "";
    }

    $baseName = pathinfo($file["name"], PATHINFO_FILENAME);
    $safeBaseName = preg_replace('/[^A-Za-z0-9_-]/', '-', $baseName);

    if ($safeBaseName === "" || $safeBaseName === null) {
        $safeBaseName = "logo";
    }

    $fileName = $safeBaseName . "-" . date("YmdHis") . "." . $extension;
    $targetPath = $uploadDirectory . DIRECTORY_SEPARATOR . $fileName;

    if (!move_uploaded_file($file["tmp_name"], $targetPath)) {
        $errors[] = "Unable to save uploaded logo";
        return "";
    }

    return "assets/php/uploads/launchpad-logos/" . $fileName;
}

function createContactFormEmail($data)
{
    return '
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9fafb; padding: 20px; margin-top: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #1e40af; }
        .value { margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">' . htmlspecialchars($data['name']) . '</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">' . htmlspecialchars($data['email']) . '</div>
            </div>
            <div class="field">
                <div class="label">Phone:</div>
                <div class="value">' . htmlspecialchars($data['phone_number']) . '</div>
            </div>
            <div class="field">
                <div class="label">Subject:</div>
                <div class="value">' . htmlspecialchars($data['msg_subject']) . '</div>
            </div>
            <div class="field">
                <div class="label">Message:</div>
                <div class="value">' . nl2br(htmlspecialchars($data['message'])) . '</div>
            </div>
        </div>
    </div>
</body>
</html>';
}

function createYarderApplicationEmail($data)
{
    return '
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #059669; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f0fdf4; padding: 20px; margin-top: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #059669; }
        .value { margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Yarder Application</h2>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">' . htmlspecialchars($data['name']) . '</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">' . htmlspecialchars($data['email']) . '</div>
            </div>
            <div class="field">
                <div class="label">Area of Expertise:</div>
                <div class="value">' . htmlspecialchars($data['expertise']) . '</div>
            </div>
            <div class="field">
                <div class="label">Portfolio/LinkedIn:</div>
                <div class="value">' . htmlspecialchars($data['portfolio'] ?: 'Not provided') . '</div>
            </div>
            <div class="field">
                <div class="label">Key Skills:</div>
                <div class="value">' . htmlspecialchars($data['skills']) . '</div>
            </div>
            <div class="field">
                <div class="label">Statement:</div>
                <div class="value">' . nl2br(htmlspecialchars($data['statement'])) . '</div>
            </div>
        </div>
    </div>
</body>
</html>';
}

function createInvestorFormEmail($data)
{
    return '
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #7c3aed; color: white; padding: 20px; text-align: center; }
        .content { background-color: #faf5ff; padding: 20px; margin-top: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #7c3aed; }
        .value { margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New MHINO CareOS Enquiry</h2>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">' . htmlspecialchars($data['name']) . '</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">' . htmlspecialchars($data['email']) . '</div>
            </div>
            <div class="field">
                <div class="label">Phone:</div>
                <div class="value">' . htmlspecialchars($data['phone'] ?: 'Not provided') . '</div>
            </div>
            <div class="field">
                <div class="label">Organization:</div>
                <div class="value">' . htmlspecialchars($data['organization'] ?: 'Not provided') . '</div>
            </div>
            <div class="field">
                <div class="label">Interest Type:</div>
                <div class="value">' . htmlspecialchars($data['interest_type']) . '</div>
            </div>
            <div class="field">
                <div class="label">Message:</div>
                <div class="value">' . nl2br(htmlspecialchars($data['message'])) . '</div>
            </div>
        </div>
    </div>
</body>
</html>';
}

function createLaunchpadEmail($data)
{
    return '
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f59e0b; color: white; padding: 20px; text-align: center; }
        .content { background-color: #fffbeb; padding: 20px; margin-top: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #f59e0b; }
        .value { margin-top: 5px; }
        .package-badge { display: inline-block; background-color: #f59e0b; color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🚀 New LaunchPad Enquiry</h2>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Contact Information</div>
            </div>
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">' . htmlspecialchars($data['name']) . '</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">' . htmlspecialchars($data['email']) . '</div>
            </div>
            <div class="field">
                <div class="label">Phone:</div>
                <div class="value">' . htmlspecialchars($data['phone_number']) . '</div>
            </div>
            
            <div class="field" style="margin-top: 25px;">
                <div class="label">Business Details</div>
            </div>
            <div class="field">
                <div class="label">Business Name:</div>
                <div class="value">' . htmlspecialchars($data['business_name']) . '</div>
            </div>
            <div class="field">
                <div class="label">Package Selected:</div>
                <div class="value"><span class="package-badge">' . htmlspecialchars($data['package_type']) . '</span></div>
            </div>
            <div class="field">
                <div class="label">Preferred Domain:</div>
                <div class="value">' . htmlspecialchars($data['domain_name'] ?: 'Not provided') . '</div>
            </div>
            <div class="field">
                <div class="label">Business Type:</div>
                <div class="value">' . htmlspecialchars($data['business_type'] ?: 'Not provided') . '</div>
            </div>
            <div class="field">
                <div class="label">Current Website/Social:</div>
                <div class="value">' . htmlspecialchars($data['current_website'] ?: 'Not provided') . '</div>
            </div>
            <div class="field">
                <div class="label">Logo Upload:</div>
                <div class="value">' . htmlspecialchars($data['logo_path'] ?: 'No file uploaded') . '</div>
            </div>
            
            <div class="field" style="margin-top: 25px;">
                <div class="label">Project Requirements</div>
            </div>
            <div class="field">
                <div class="label">Business Description:</div>
                <div class="value">' . nl2br(htmlspecialchars($data['business_description'])) . '</div>
            </div>
            <div class="field">
                <div class="label">Services Needed:</div>
                <div class="value">' . nl2br(htmlspecialchars($data['services_needed'] ?: 'Not provided')) . '</div>
            </div>
            <div class="field">
                <div class="label">Timeline / Budget / Requirements:</div>
                <div class="value">' . nl2br(htmlspecialchars($data['timeline_budget'] ?: 'Not provided')) . '</div>
            </div>
        </div>
    </div>
</body>
</html>';
}

$errors = [];
$formType = get_post_value("form_type");
$isLaunchpadForm = $formType === "launchpad";
$isYarderForm = get_post_value("yarder_application") === "1";
$isInvestorForm = get_post_value("investor_form") === "1";

$name = require_post_value("name", "Name", $errors);
$email = require_post_value("email", "Email", $errors);

if ($email !== "" && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Email format is invalid";
}

// Initialize Resend client using the installed SDK entrypoint.
$resend = \Resend::client(RESEND_API_KEY);
$emailTo = TO_EMAIL;
$subject = '';
$htmlBody = '';

// Handle Yarder Application Form
if ($isYarderForm) {
    $expertise = require_post_value("expertise", "Expertise", $errors);
    $skills = require_post_value("skills", "Skills", $errors);
    $statement = require_post_value("statement", "Statement", $errors);
    $portfolio = get_post_value("portfolio");

    if (empty($errors)) {
        $subject = "New Yarder Application: " . $name;
        $htmlBody = createYarderApplicationEmail([
            'name' => $name,
            'email' => $email,
            'expertise' => $expertise,
            'portfolio' => $portfolio,
            'skills' => $skills,
            'statement' => $statement
        ]);
    }
}
// Handle Investor/Partner Form
elseif ($isInvestorForm) {
    $phone = get_post_value("phone");
    $organization = get_post_value("organization");
    $interestType = require_post_value("interest_type", "Interest Type", $errors);
    $message = require_post_value("message", "Message", $errors);

    if (empty($errors)) {
        $emailTo = "partner@mhino.co.uk";
        $subject = "MHINO CareOS Enquiry: " . $interestType . " - " . $name;
        $htmlBody = createInvestorFormEmail([
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'organization' => $organization,
            'interest_type' => $interestType,
            'message' => $message
        ]);
    }
}
// Handle LaunchPad Form
elseif ($isLaunchpadForm) {
    $phoneNumber = require_post_value("phone_number", "Phone number", $errors);
    $businessName = require_post_value("business_name", "Business name", $errors);
    $packageType = require_post_value("package_type", "Package", $errors);
    $businessDescription = require_post_value("business_description", "Business description", $errors);
    $domainName = get_post_value("domain_name");
    $businessType = get_post_value("business_type");
    $currentWebsite = get_post_value("current_website");
    $servicesNeeded = get_post_value("services_needed");
    $timelineBudget = get_post_value("timeline_budget");
    $allowedPackages = ["Starter", "Growth", "Premium"];

    if ($packageType !== "" && !in_array($packageType, $allowedPackages, true)) {
        $errors[] = "Selected package is invalid";
    }

    $logoPath = handle_logo_upload($errors);

    if (empty($errors)) {
        $emailTo = "launchpad@backyardtech.co.uk";
        $subject = "New LaunchPad Enquiry: " . $businessName . " (" . $packageType . ")";
        $htmlBody = createLaunchpadEmail([
            'name' => $name,
            'email' => $email,
            'phone_number' => $phoneNumber,
            'business_name' => $businessName,
            'package_type' => $packageType,
            'domain_name' => $domainName,
            'business_type' => $businessType,
            'current_website' => $currentWebsite,
            'logo_path' => $logoPath,
            'business_description' => $businessDescription,
            'services_needed' => $servicesNeeded,
            'timeline_budget' => $timelineBudget
        ]);
    }
}
// Handle Regular Contact Form
else {
    $phoneNumber = require_post_value("phone_number", "Phone number", $errors);
    $msgSubject = require_post_value("msg_subject", "Subject", $errors);
    $message = require_post_value("message", "Message", $errors);

    if (empty($errors)) {
        $subject = "Contact Form: " . $msgSubject;
        $htmlBody = createContactFormEmail([
            'name' => $name,
            'email' => $email,
            'phone_number' => $phoneNumber,
            'msg_subject' => $msgSubject,
            'message' => $message
        ]);
    }
}

if (!empty($errors)) {
    echo implode(" ", $errors);
    exit;
}

// Send email via Resend
try {
    $result = $resend->emails->send([
        'from' => FROM_EMAIL,
        'to' => [$emailTo],
        'subject' => $subject,
        'html' => $htmlBody
    ]);

    echo "success";
} catch (Exception $e) {
    error_log("Resend error: " . $e->getMessage());
    echo "Failed to send email: " . $e->getMessage();
}

?>