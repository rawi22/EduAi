from fastapi import APIRouter, HTTPException, Query
from ...models.api_models import RetrieveRequest, RetrieveResponse, Material
from ...db.firebase import get_materials_by_user_and_topic
from typing import List

router = APIRouter()

@router.get("/retrieve", response_model=RetrieveResponse)
async def retrieve_materials(
    user_id: str = Query(..., description="User ID"),
    topic: str = Query(..., description="Subject or topic")
):
    """
    Retrieve materials for a specific user and topic
    
    This endpoint returns a list of materials that match the specified user ID
    and topic. These can include uploaded documents, notes, or other educational
    resources.
    """
    try:
        # Query Firestore for relevant materials
        materials_docs = get_materials_by_user_and_topic(user_id, topic)
        
        # Convert to response model
        materials = []
        for doc in materials_docs:
            doc_data = doc.to_dict()
            materials.append(
                Material(
                    id=doc.id,
                    user_id=doc_data.get("user_id"),
                    subject=doc_data.get("subject"),
                    teacher=doc_data.get("teacher"),
                    file_url=doc_data.get("file_url"),
                    uploaded_at=doc_data.get("uploaded_at")
                )
            )
        
        return RetrieveResponse(materials=materials)
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving materials: {str(e)}"
        )