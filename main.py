"""
Root entry point for Uvicorn / Gunicorn deployments (e.g. Render, Railway, Fly.io, Heroku)
Allows running `uvicorn main:app --host 0.0.0.0 --port $PORT` directly from root.
"""
import sys
import os

_current_dir = os.path.dirname(os.path.abspath(__file__))
if _current_dir not in sys.path:
    sys.path.insert(0, _current_dir)

try:
    from python_backend.main import app
except ImportError:
    from main import app

if __name__ == "__main__":
    import uvicorn
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host=host, port=port, reload=False)
