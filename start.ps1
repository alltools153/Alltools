Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "🛠️ Starting AllTools (Next.js 14 + Python FastAPI)" -ForegroundColor Green
Write-Host "Lead Architect: Santanu Batabyal" -ForegroundColor Yellow
Write-Host "======================================================================"

if (-not (Test-Path "node_modules")) {
    Write-Host "`nInstalling npm dependencies..." -ForegroundColor Cyan
    npm install
}

Write-Host "`nStarting Python FastAPI Backend on http://127.0.0.1:8000 ..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "python -m uvicorn python_backend.main:app --host 127.0.0.1 --port 8000 --reload"

Write-Host "`nStarting Next.js Frontend on http://localhost:3000 ..." -ForegroundColor Green
npm run dev
