@echo off
title AllTools Multi-Project Suite
echo ======================================================================
echo 🛠️ Starting AllTools (Next.js 14 + Python FastAPI)
echo Lead Architect: Santanu Batabyal
echo ======================================================================

echo.
echo [1/3] Checking Node.js dependencies...
if not exist node_modules (
    echo Installing npm dependencies...
    call npm install
)

echo.
echo [2/3] Starting Python FastAPI Backend on http://127.0.0.1:8000 ...
start "AllTools Python Backend" cmd /k "python -m uvicorn python_backend.main:app --host 127.0.0.1 --port 8000 --reload"

echo.
echo [3/3] Starting Next.js 14 Frontend on http://localhost:3000 ...
call npm run dev

pause
