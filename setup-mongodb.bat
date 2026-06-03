@echo off
REM MongoDB Setup Script for LeadFlow CRM
REM This script helps verify and setup MongoDB connection

echo.
echo =====================================
echo  LeadFlow CRM - MongoDB Setup Helper
echo =====================================
echo.

REM Check if mongod is in PATH
where mongod >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] MongoDB is installed and in PATH
    echo.
    echo Starting MongoDB service...
    echo.
    mongod
) else (
    echo [ERROR] MongoDB is not found in PATH
    echo.
    echo Options:
    echo 1. Install MongoDB Community Edition:
    echo    https://www.mongodb.com/try/download/community
    echo.
    echo 2. Or use MongoDB Atlas (Cloud):
    echo    https://www.mongodb.com/cloud/atlas
    echo.
    echo    After Atlas setup:
    echo    - Update backend\.env with your MongoDB URI
    echo    - Restart the backend server
    echo.
    pause
)
