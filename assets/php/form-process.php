<?php

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

$errors = [];
$formType = get_post_value("form_type");
$isLaunchpadForm = $formType === "launchpad";

$name = require_post_value("name", "Name", $errors);
$email = require_post_value("email", "Email", $errors);
$phoneNumber = require_post_value("phone_number", "Phone number", $errors);

if ($email !== "" && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Email format is invalid";
}

if ($isLaunchpadForm) {
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

    $emailTo = "launchpad@backyardtech.co.uk";
    $subject = "New LaunchPad Enquiry";
    $body = "";
    $body .= "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Phone Number: " . $phoneNumber . "\n";
    $body .= "Business Name: " . $businessName . "\n";
    $body .= "Package: " . $packageType . "\n";
    $body .= "Preferred Domain: " . ($domainName !== "" ? $domainName : "Not provided") . "\n";
    $body .= "Business Type: " . ($businessType !== "" ? $businessType : "Not provided") . "\n";
    $body .= "Current Website or Social Link: " . ($currentWebsite !== "" ? $currentWebsite : "Not provided") . "\n";
    $body .= "Uploaded Logo Path: " . ($logoPath !== "" ? $logoPath : "No file uploaded") . "\n\n";
    $body .= "Business Description:\n" . $businessDescription . "\n\n";
    $body .= "Services Needed:\n" . ($servicesNeeded !== "" ? $servicesNeeded : "Not provided") . "\n\n";
    $body .= "Timeline / Budget / Special Requirements:\n" . ($timelineBudget !== "" ? $timelineBudget : "Not provided") . "\n";
} else {
    $msgSubject = require_post_value("msg_subject", "Subject", $errors);
    $message = require_post_value("message", "Message", $errors);

    $emailTo = "contact@backyardtech.co.uk";
    $subject = "New Message Received";
    $body = "";
    $body .= "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Subject: " . $msgSubject . "\n";
    $body .= "Phone Number: " . $phoneNumber . "\n";
    $body .= "Message: " . $message . "\n";
}

if (!empty($errors)) {
    echo implode(" ", $errors);
    exit;
}

$headers = "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$success = mail($emailTo, $subject, $body, $headers);

if ($success) {
    echo "success";
} else {
    echo "Something went wrong :(";
}

?>