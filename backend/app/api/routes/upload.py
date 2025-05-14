from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Depends
from ...models.api_models import UploadResponse
from ...db.firebase import upload_file_to_storage, add_material
from ...services.ai_service import add_document_to_vectorstore, generate_embedding
import io

router = APIRouter()

@router.post("/upload", response_model=UploadResponse)
async def upload_file(
    file: UploadFile = File(...),
    user_id: str = Form(...),
    subject: str = Form(...),
    teacher: str = Form(...)
):
    """
    Upload a file to the system
    
    This endpoint allows students to upload educational materials such as
    notes, exams, or worksheets. The file is stored in Firebase Storage,
    and its metadata is saved in Firestore. The content is also processed
    and stored as embeddings in Pinecone for future retrieval.
    """
    try:
        # Read file content
        file_content = await file.read()
        
        # Upload file to Firebase Storage
        file_url = upload_file_to_storage(
            file_data=file_content,
            user_id=user_id,
            filename=file.filename
        )
        
        # Store metadata in Firestore
        add_material(
            user_id=user_id,
            subject=subject,
            teacher=teacher,
            file_url=file_url
        )
        
        # Process file content for vector storage
        # For simplicity, we're just using the raw content
        # In a production app, you'd want to extract text properly based on file type
        try:
            # Try to decode as text
            text_content = file_content.decode('utf-8')
            
            # Add to vector store
            metadata = {
                "user_id": user_id,
                "subject": subject,
                "teacher": teacher,
                "filename": file.filename,
                "file_url": file_url
            }
            
            add_document_to_vectorstore(
                user_id=user_id,
                text=text_content,
                metadata=metadata
            )
        except UnicodeDecodeError:
            # If not text, we'd need more sophisticated processing
            # For binary files like PDFs, images, etc.
            pass
        
        return UploadResponse(url=file_url)
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error uploading file: {str(e)}"
        )