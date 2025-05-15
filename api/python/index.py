from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs
import json
import sys
import os

# Add the backend directory to the Python path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend'))
sys.path.append(backend_path)
print(f"Added backend path: {backend_path}")
print(f"Python path: {sys.path}")

try:
    # Import the FastAPI app
    from main import app
    print("Successfully imported FastAPI app")
except Exception as e:
    print(f"Error importing FastAPI app: {e}")
    # Fallback to a simple handler if import fails
    from fastapi import FastAPI
    app = FastAPI()
    
    @app.get("/")
    async def root():
        return {"message": "Fallback API is running. Import error occurred."}

# Import ASGI handler
from mangum import Mangum

# Create an ASGI handler for the FastAPI app
handler = Mangum(app)

def handle(req, res):
    """
    Adapter function to convert between HTTP and ASGI
    """
    return handler(req, res)

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        # Forward to FastAPI app
        response = {
            "message": "Python API is running. Use the specific endpoints for functionality."
        }
        
        self.wfile.write(json.dumps(response).encode())
        return