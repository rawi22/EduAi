from http.server import BaseHTTPRequestHandler
import json

def handler(request, response):
    """
    Simple handler function for Vercel serverless functions
    """
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({
            "message": "Python API is running on Vercel. This is a simplified handler."
        })
    }

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        response = {
            "message": "Python API is running on Vercel. This is a simplified handler."
        }
        
        self.wfile.write(json.dumps(response).encode())
        return