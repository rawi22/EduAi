from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class UserBase(BaseModel):
    email: str
    
class UserCreate(UserBase):
    password: str
    
class User(UserBase):
    id: str
    
    class Config:
        from_attributes = True

class StudentInfo(BaseModel):
    name: str
    school: Optional[str] = None
    grade: str
    subject: str
    notes: Optional[str] = None
    
    class Config:
        from_attributes = True

class AskRequest(BaseModel):
    question: str
    user_id: str
    grade: Optional[str] = None
    subject: Optional[str] = None
    school: Optional[str] = None

class AskResponse(BaseModel):
    response: str

class UploadRequest(BaseModel):
    user_id: str
    subject: str
    teacher: str
    
    class Config:
        from_attributes = True

class UploadResponse(BaseModel):
    url: str

class RetrieveRequest(BaseModel):
    user_id: str
    topic: str

class Material(BaseModel):
    id: str
    user_id: str
    subject: str
    teacher: str
    file_url: str
    uploaded_at: Any
    
    class Config:
        from_attributes = True

class RetrieveResponse(BaseModel):
    materials: List[Material]

class TrainRequest(BaseModel):
    user_id: str
    data: Optional[Dict[str, Any]] = None

class TrainResponse(BaseModel):
    message: str