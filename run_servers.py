"""
AllTools Multi-Server Orchestrator
Concurrently launches:
1. Python FastAPI Backend Server on http://127.0.0.1:8000 (Swagger docs at /docs)
2. Next.js Frontend Portal on http://localhost:3000

Run via: python run_servers.py
"""

import subprocess
import sys
import os
import time

def run_all():
    print("=" * 70)
    print("AllTools - Unified Next.js + Python FastAPI Suite")
    print("=" * 70)
    print("Lead Architect: Santanu Batabyal\n")

    root_dir = os.path.dirname(os.path.abspath(__file__))
    python_cmd = sys.executable

    print("[1/2] Starting Python FastAPI Backend on http://127.0.0.1:8000 ...")
    api_process = None
    try:
        api_process = subprocess.Popen(
            [python_cmd, "-m", "uvicorn", "python_backend.main:app", "--host", "127.0.0.1", "--port", "8000", "--reload"],
            cwd=root_dir
        )
    except Exception as e:
        print(f"Warning: Could not start Python backend: {e}")

    time.sleep(1)

    print("[2/2] Starting Next.js Production Server on http://localhost:3000 ...")
    npm_cmd = "npm.cmd" if os.name == "nt" else "npm"
    frontend_process = subprocess.Popen(
        f"{npm_cmd} start",
        shell=True,
        cwd=root_dir
    )

    print("\n" + "=" * 70)
    print("AllTools servers are running successfully!")
    print(">> Next.js Frontend Portal: http://localhost:3000")
    print(">> Python FastAPI Swagger:  http://127.0.0.1:8000/docs")
    print(">> ReDoc API Specification: http://127.0.0.1:8000/redoc")
    print("=" * 70 + "\n")

    try:
        frontend_process.wait()
    except KeyboardInterrupt:
        print("\nStopping all AllTools servers...")
        if api_process:
            api_process.terminate()
        frontend_process.terminate()

if __name__ == "__main__":
    run_all()
