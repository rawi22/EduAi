from fastapi import APIRouter, HTTPException, BackgroundTasks
from ...models.api_models import TrainRequest, TrainResponse
from ...services.ai_service import add_document_to_vectorstore

router = APIRouter()

async def background_training(user_id: str, data: dict):
    """Background task for training the model with new data"""
    try:
        # In a real implementation, this would involve more sophisticated
        # training or fine-tuning of the AI model. For now, we'll just
        # add the data to the vector store if it exists.
        
        if data and "text" in data:
            metadata = data.get("metadata", {})
            metadata["user_id"] = user_id
            
            add_document_to_vectorstore(
                user_id=user_id,
                text=data["text"],
                metadata=metadata
            )
    except Exception as e:
        print(f"Error in background training: {str(e)}")

@router.post("/train", response_model=TrainResponse)
async def train_model(request: TrainRequest, background_tasks: BackgroundTasks):
    """
    Train the AI model with new data
    
    This endpoint allows for updating the AI model with new data.
    The training is performed as a background task to avoid blocking
    the API response.
    """
    try:
        # Schedule the training as a background task
        background_tasks.add_task(
            background_training,
            user_id=request.user_id,
            data=request.data or {}
        )
        
        return TrainResponse(message="Training initiated")
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error initiating training: {str(e)}"
        )