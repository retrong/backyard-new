@echo off
echo Starting PHP Development Server...
echo.
echo Server will start at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Check if PHP is installed
where php >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: PHP is not installed or not in PATH!
    echo.
    echo Please install PHP first:
    echo Download from: https://www.php.net/downloads
    echo.
    pause
    exit /b 1
)

REM Start PHP server
php -S localhost:8000

pause
