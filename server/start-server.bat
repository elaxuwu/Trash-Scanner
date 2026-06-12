@echo off
setlocal
title Trash Scanner Local Server

cd /d "%~dp0\.."

set "PORT=%~1"
if "%PORT%"=="" set "PORT=8000"

echo.
echo Trash Scanner local server
echo Project: %CD%
echo Port: %PORT%
echo URL: http://127.0.0.1:%PORT%/index.html
echo Health: http://127.0.0.1:%PORT%/health
echo.
echo Do not close this window while testing.
echo Press Ctrl+C to stop the server.
echo.

where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js was not found on PATH.
    echo Install Node.js or run this project from an environment where node is available.
    echo.
    pause
    exit /b 1
)

if not exist "server\local-server.js" (
    echo ERROR: server\local-server.js was not found.
    echo Make sure this script is inside the Trash-Scanner project folder.
    echo.
    pause
    exit /b 1
)

if not exist "index.html" (
    echo ERROR: index.html was not found in the project root.
    echo.
    pause
    exit /b 1
)

echo Status: starting with Node.js...
echo.
node server\local-server.js %PORT%

echo.
echo Server stopped or failed to start.
echo If the port is already in use, try: .\server\start-server.bat 5500
echo.
pause
