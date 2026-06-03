@echo off
REM LeadFlow CRM - Quick Start Script for Windows

echo.
echo =====================================
echo  LeadFlow CRM - Quick Start
echo =====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
echo.

REM Navigate to project root
cd /d "%~dp0"

REM Check if dependencies are installed
if not exist "backend\node_modules" (
    echo [WARNING] Backend dependencies not installed
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

if not exist "frontend\node_modules" (
    echo [WARNING] Frontend dependencies not installed
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo =====================================
echo  Starting LeadFlow CRM
echo =====================================
echo.
echo The servers will open in separate windows...
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173 or http://localhost:5174
echo.

REM Start backend in new window
echo Starting backend server...
start cmd /k "cd backend && npm start"

REM Wait a moment for backend to start
timeout /t 2 /nobreak

REM Start frontend in new window
echo Starting frontend server...
start cmd /k "cd frontend && npm run dev"

echo.
echo All servers started! Check the new windows.
echo.
pause
