from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Import routers
from app.api.routes.ask import router as ask_router
from app.api.routes.upload import router as upload_router
from app.api.routes.retrieve import router as retrieve_router
from app.api.routes.train import router as train_router
from app.api.routes.student import router as student_router

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="UstazkAI API",
    description="API for UstazkAI - A bilingual AI-driven tutoring platform for Arab students in Israel",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(ask_router, prefix="/api", tags=["Ask"])
app.include_router(upload_router, prefix="/api", tags=["Upload"])
app.include_router(retrieve_router, prefix="/api", tags=["Retrieve"])
app.include_router(train_router, prefix="/api", tags=["Train"])
app.include_router(student_router, prefix="/api", tags=["Student"])

@app.get("/")
async def root():
    return {"message": "Welcome to UstazkAI API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 3000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)