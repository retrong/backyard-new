# Quick Start Guide - Contact Forms with Resend

## ⚠️ Important: You're Using PHP, Not Node.js

The contact forms are integrated with **PHP** and Resend email service. The Node.js server folder can be ignored.

## 🚀 Setup (5 minutes)

### Step 1: Install Composer (if not already installed)

1. Download Composer for Windows:
   https://getcomposer.org/Composer-Setup.exe

2. Run the installer and follow the prompts

3. Restart your terminal/command prompt

### Step 2: Install PHP Dependencies

**Option A: Using the batch file (easiest)**
Double-click `install-php-dependencies.bat`

**Option B: Manual installation**
```bash
cd assets/php
composer install
```

### Step 3: Start the Server

**Option A: Using the batch file (easiest)**
Double-click `start-server.bat`

**Option B: Manual start**
```bash
php -S localhost:8000
```

### Step 4: Test the Forms

Open in your browser:
- **Contact Form**: http://localhost:8000/contact.html
- **Yarders Application**: http://localhost:8000/careers.html  
- **MHINO CareOS**: http://localhost:8000/mhino-careos.html

Fill out and submit any form - you'll receive an email at `contact@backyardtech.co.uk`!

## 📧 Email Configuration

All settings are in `assets/php/.env.php`:

```php
define('RESEND_API_KEY', 're_eixSPhMi_FzxYwxzywiC1B2DJ8BDBU2tH');
define('FROM_EMAIL', 'onboarding@resend.dev');
define('TO_EMAIL', 'contact@backyardtech.co.uk');
```

**To use your own domain for sending:**
1. Add your domain in [Resend Dashboard](https://resend.com/domains)
2. Verify DNS records
3. Update `FROM_EMAIL` in `.env.php`

## ✅ What's Working Now

✅ Contact form integrated with Resend  
✅ Yarders application form integrated with Resend  
✅ MHINO CareOS investor/partner form integrated with Resend  
✅ Beautiful HTML email templates for each form  
✅ All forms send to your configured email address  

## 📁 File Structure

```
big-data/
├── contact.html               # Contact form page
├── careers.html               # Yarders application page
├── mhino-careos.html         # MHINO CareOS investor form
├── install-php-dependencies.bat  # Install dependencies (Windows)
├── start-server.bat          # Start PHP server (Windows)
├── README-FORMS-PHP.md       # Detailed documentation
└── assets/php/
    ├── .env.php              # Email configuration ⚠️ Keep secure!
    ├── composer.json         # PHP dependencies
    ├── form-process.php      # Main form handler
    └── vendor/              # Installed packages (auto-generated)
```

## 🆘 Troubleshooting

### "Composer not found"
Install Composer from: https://getcomposer.org/Composer-Setup.exe

### "PHP not found"
Install PHP from: https://www.php.net/downloads  
Or use XAMPP/WAMP which includes PHP

### "Class 'Resend\Resend' not found"
Run: `cd assets/php && composer install`

### Emails not sending
1. Check `assets/php/.env.php` has correct API key
2. Use `onboarding@resend.dev` as FROM_EMAIL for free accounts
3. Check PHP error logs for details

## 📚 More Information

- **Detailed Documentation**: See `README-FORMS-PHP.md`
- **Resend Documentation**: https://resend.com/docs
- **Support**: contact@backyardtech.co.uk

## 🔒 Security Note

Never commit `assets/php/.env.php` to public repositories - it contains your API key!

---

**Need Help?** Check `README-FORMS-PHP.md` for detailed troubleshooting.
