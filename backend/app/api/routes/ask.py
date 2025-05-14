from fastapi import APIRouter, HTTPException, Depends
from ...models.api_models import AskRequest, AskResponse
from ...services.ai_service import get_ai_response
from ...db.firebase import add_interaction

router = APIRouter()

@router.post("/ask", response_model=AskResponse)
async def ask_question(request: AskRequest):
    """
    Ask a question to the AI tutor
    
    This endpoint processes a question from a student and returns a personalized response
    from the AI tutor. The interaction is stored in the database for future reference.
    """
    try:
        # Get AI response
        response = get_ai_response(
            user_id=request.user_id,
            question=request.question,
            grade=request.grade or "Unknown",
            subject=request.subject or "General",
            school=request.school or "Unknown"
        )
        
        # Store the interaction in Firestore
        add_interaction(
            user_id=request.user_id,
            question=request.question,
            response=response
        )
        
        return AskResponse(response=response)
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing question: {str(e)}"
        )