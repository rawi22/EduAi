from fastapi import APIRouter, HTTPException, Depends
from ...models.api_models import StudentInfo
from ...db.firebase import db
from firebase_admin import firestore
from typing import Dict, Any

router = APIRouter()

@router.post("/student/update")
async def update_student_info(student_data: Dict[str, Any]):
    """
    Update student information
    
    This endpoint saves or updates student information in the database.
    It includes details like name, school, grade, and subjects.
    """
    try:
        user_id = student_data.get("user_id")
        if not user_id:
            raise HTTPException(
                status_code=400,
                detail="User ID is required"
            )
        
        # Remove user_id from the data to be stored
        data_to_store = {k: v for k, v in student_data.items() if k != "user_id"}
        
        # Add timestamp
        data_to_store["updated_at"] = firestore.SERVER_TIMESTAMP
        
        # Update or create student document
        student_ref = db.collection("students").document(user_id)
        student_ref.set(data_to_store, merge=True)
        
        return {"success": True, "message": "Student information updated successfully"}
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error updating student information: {str(e)}"
        )

@router.get("/student/{user_id}")
async def get_student_info(user_id: str):
    """
    Get student information
    
    This endpoint retrieves student information from the database
    based on the user ID.
    """
    try:
        student_ref = db.collection("students").document(user_id)
        student_doc = student_ref.get()
        
        if not student_doc.exists:
            return {"success": False, "message": "Student not found"}
        
        student_data = student_doc.to_dict()
        return {"success": True, "data": student_data}
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving student information: {str(e)}"
        )