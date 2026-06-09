@echo off
echo Installing Resend PHP SDK...
echo.

REM Check if Composer is installed
where composer >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Composer is not installed!
    echo.
    echo Please install Composer first:
    echo 1. Download from: https://getcomposer.org/Composer-Setup.exe
    echo 2. Run the installer
    echo 3. Restart this terminal
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

REM Navigate to PHP directory
cd /d "%~dp0assets\php"

REM Install dependencies
echo Installing Resend PHP SDK via Composer...
composer install

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! Resend PHP SDK installed.
    echo ========================================
    echo.
    echo You can now use the contact forms.
    echo Check README-FORMS-PHP.md for usage instructions.
    echo.
) else (
    echo.
    echo ERROR: Installation failed!
    echo Please check the error messages above.
    echo.
)

pause
