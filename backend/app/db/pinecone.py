import os
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv
import numpy as np

# Load environment variables
load_dotenv()

# Initialize Pinecone client
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Get or create index
index_name = os.getenv("PINECONE_INDEX_NAME", "ustazkai-embeddings")

# Check if index exists, if not create it
try:
    index = pc.Index(index_name)
    print(f"Connected to existing Pinecone index: {index_name}")
except Exception as e:
    print(f"Creating new Pinecone index: {index_name}")
    # Create a new index with the OpenAI embedding dimension (1536 for text-embedding-ada-002)
    pc.create_index(
        name=index_name,
        dimension=1536,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-west-2"
        )
    )
    index = pc.Index(index_name)

def store_embedding(vector, metadata, id=None):
    """
    Store an embedding vector in Pinecone
    
    Args:
        vector: The embedding vector (numpy array or list)
        metadata: Dictionary of metadata to store with the vector
        id: Optional ID for the vector, if not provided a UUID will be generated
    
    Returns:
        The ID of the stored vector
    """
    if isinstance(vector, np.ndarray):
        vector = vector.tolist()
    
    if id is None:
        import uuid
        id = str(uuid.uuid4())
    
    index.upsert(vectors=[(id, vector, metadata)])
    return id

def query_embeddings(query_vector, top_k=5, filter=None):
    """
    Query Pinecone for similar vectors
    
    Args:
        query_vector: The query embedding vector (numpy array or list)
        top_k: Number of results to return
        filter: Optional filter to apply to the query
    
    Returns:
        List of matches with their scores and metadata
    """
    if isinstance(query_vector, np.ndarray):
        query_vector = query_vector.tolist()
    
    results = index.query(
        vector=query_vector,
        top_k=top_k,
        include_metadata=True,
        filter=filter
    )
    
    return results.matches

def delete_embedding(id):
    """Delete an embedding by ID"""
    index.delete(ids=[id])

def delete_embeddings(filter):
    """Delete embeddings by filter"""
    index.delete(filter=filter)