from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs
import json
import sys
import os

# Add the backend directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend')))

# Import the FastAPI app
from main import app

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