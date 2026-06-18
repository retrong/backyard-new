# Contact Forms - Resend PHP Integration

This project integrates all contact forms (Contact, Yarders, and MHINO CareOS) with Resend email service using PHP.

## Prerequisites

- PHP 7.4 or higher
- Composer (PHP dependency manager)
- Web server (Apache, Nginx, or PHP built-in server)

## Installation

### Step 1: Install Composer (if not already installed)

Download and install Composer from [getcomposer.org](https://getcomposer.org/download/)

For Windows, download the installer:
https://getcomposer.org/Composer-Setup.exe

### Step 2: Install Resend PHP SDK

Navigate to the PHP directory and run:

```bash
cd assets/php
composer install
```

This will install the Resend PHP SDK and create the `vendor` directory.

### Step 3: Configure Email Settings

The email configuration is in `assets/php/.env.php`:

```php
define('RESEND_API_KEY', 're_eixSPhMi_FzxYwxzywiC1B2DJ8BDBU2tH');
define('FROM_EMAIL', 'onboarding@resend.dev');
define('TO_EMAIL', 'contact@backyardtech.co.uk');
```

**Important Notes:**

1. **FROM_EMAIL**: 
   - Free Resend accounts can only send from `onboarding@resend.dev`
   - To use your own domain (e.g., `noreply@backyardtech.co.uk`):
     - Add and verify your domain in Resend dashboard
     - Update the `FROM_EMAIL` constant

2. **TO_EMAIL**: 
   - All form submissions will be sent to this address
   - Update as needed

3. **RESEND_API_KEY**: 
   - Your API key is already configured
   - Keep this secure - never commit to public repositories

### Step 4: Test the Setup

1. **Start a local PHP server:**

```bash
# From the project root directory
php -S localhost:8000
```

2. **Open the forms in your browser:**
   - Contact Form: http://localhost:8000/contact.html
   - Yarders Application: http://localhost:8000/careers.html
   - MHINO CareOS: http://localhost:8000/mhino-careos.html

3. **Submit a test form** and check your email!

## Form Types

### 1. General Contact Form (contact.html)
Handles general inquiries and sends to `contact@backyardtech.co.uk`

**Fields:**
- Name
- Email
- Phone Number
- Subject
- Message

### 2. Yarder Application Form (careers.html)
Handles job applications for the Yarders program

**Fields:**
- Full Name
- Email
- Area of Expertise
- Portfolio/LinkedIn
- Key Skills
- Statement

### 3. MHINO CareOS Investor/Partner Form (mhino-careos.html)
Handles partnership and investment inquiries

**Fields:**
- Full Name
- Email
- Phone (optional)
- Organization (optional)
- Interest Type
- Message

### 4. LaunchPad Form (existing)
The LaunchPad form continues to work and sends to `launchpad@backyardtech.co.uk`

## How It Works

1. User fills out and submits a form
2. Form data is posted to `assets/php/form-process.php`
3. PHP script validates the data
4. Email is sent via Resend API with HTML formatting
5. Success/error message is displayed to the user

## Email Templates

Each form type has its own styled HTML email template:

- **Contact Form**: Blue theme (#1e40af)
- **Yarder Application**: Green theme (#059669)
- **MHINO CareOS**: Purple theme (#7c3aed)

## Troubleshooting

### Issue: "Class 'Resend\Resend' not found"

**Solution:** 
```bash
cd assets/php
composer install
```

### Issue: Emails not being sent

**Solutions:**
1. Check that `vendor/autoload.php` exists in `assets/php/`
2. Verify your Resend API key is correct
3. Check PHP error logs for detailed error messages
4. Ensure FROM_EMAIL is `onboarding@resend.dev` (for free accounts)

### Issue: "Permission denied" when creating uploads directory

**Solution:** 
```bash
chmod 755 assets/php/uploads
```

### Issue: Form doesn't submit / blank page

**Solutions:**
1. Check PHP error logs: 
   - Windows: Check PHP error log location in php.ini
   - Can enable error display in development:
     ```php
     error_reporting(E_ALL);
     ini_set('display_errors', 1);
     ```
2. Verify the form action path is correct
3. Check browser console for JavaScript errors

## File Structure

```
assets/php/
├── .env.php              # Email configuration
├── composer.json         # Composer dependencies
├── composer.lock         # Locked dependency versions
├── form-process.php      # Main form handler
├── vendor/              # Composer packages (auto-generated)
└── uploads/
    └── launchpad-logos/ # Logo uploads for LaunchPad form
```

## Security Notes

- Never commit `.env.php` to public repositories
- The Resend API key should be kept secure
- In production, consider:
  - Moving sensitive config to environment variables
  - Adding CSRF protection
  - Implementing rate limiting
  - Using HTTPS

## Production Deployment

1. **Upload all files** to your web server
2. **Install Composer dependencies** on the server:
   ```bash
   cd assets/php
   composer install --no-dev
   ```
3. **Set proper permissions:**
   ```bash
   chmod 755 assets/php/uploads
   ```
4. **Configure domain in Resend** (to use custom FROM_EMAIL)
5. **Update .env.php** with production settings
6. **Test all forms** thoroughly

## Verifying Your Domain in Resend

To send emails from your own domain:

1. Log in to [Resend Dashboard](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `backyardtech.co.uk`)
4. Add the DNS records provided by Resend to your domain
5. Wait for verification (usually a few minutes)
6. Update `FROM_EMAIL` in `.env.php` to use your domain

## Support

For issues or questions:
- Email: contact@backyardtech.co.uk
- Check Resend logs: https://resend.com/emails

## License

Proprietary - Backyard Technology Limited
