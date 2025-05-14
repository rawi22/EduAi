import os
import firebase_admin
from firebase_admin import credentials, firestore, storage
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Firebase Admin
cred = credentials.Certificate({
    "type": "service_account",
    "project_id": os.getenv("FIREBASE_PROJECT_ID"),
    "private_key_id": "your-private-key-id",
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY"),
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
    "client_id": "your-client-id",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": f"https://www.googleapis.com/robot/v1/metadata/x509/{os.getenv('FIREBASE_CLIENT_EMAIL').replace('@', '%40')}"
})

firebase_app = firebase_admin.initialize_app(
    cred, 
    {'storageBucket': os.getenv("FIREBASE_STORAGE_BUCKET")}
)

# Initialize Firestore
db = firestore.client()

# Initialize Storage
bucket = storage.bucket()

# Collections
users_collection = db.collection('users')
interactions_collection = db.collection('interactions')
materials_collection = db.collection('materials')

def get_user_by_id(user_id):
    """Get user document by ID"""
    return users_collection.document(user_id).get()

def add_interaction(user_id, question, response):
    """Add a new interaction to Firestore"""
    return interactions_collection.add({
        'user_id': user_id,
        'question': question,
        'response': response,
        'timestamp': firestore.SERVER_TIMESTAMP
    })

def add_material(user_id, subject, teacher, file_url):
    """Add a new material to Firestore"""
    return materials_collection.add({
        'user_id': user_id,
        'subject': subject,
        'teacher': teacher,
        'file_url': file_url,
        'uploaded_at': firestore.SERVER_TIMESTAMP
    })

def get_materials_by_user_and_topic(user_id, topic):
    """Get materials by user ID and topic"""
    return materials_collection.where('user_id', '==', user_id).where('subject', '==', topic).get()

def upload_file_to_storage(file_data, user_id, filename):
    """Upload a file to Firebase Storage"""
    blob = bucket.blob(f"{user_id}/{filename}")
    blob.upload_from_string(file_data)
    blob.make_public()
    return blob.public_url