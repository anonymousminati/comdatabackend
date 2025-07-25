@echo off
echo Starting ComData Innovation Backend API...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if package.json exists
if not exist package.json (
    echo Error: package.json not found
    echo Please run this script from the backend directory
    pause
    exit /b 1
)

REM Check if node_modules exists, if not install dependencies
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
    echo.
)

REM Check if .env file exists
if not exist .env (
    echo Warning: .env file not found
    echo Copying .env.example to .env...
    copy .env.example .env
    echo.
    echo Please edit .env file with your actual configuration before running the server
    echo.
    pause
)

echo Starting server in development mode...
echo Press Ctrl+C to stop the server
echo.

npm run dev
