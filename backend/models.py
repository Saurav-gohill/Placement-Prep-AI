from pydantic import BaseModel
from typing import List, Dict, Optional, Any

class InterviewStartRequest(BaseModel):
    role_targeted: str

class InterviewEvaluateRequest(BaseModel):
    session_id: str
    transcribed_text: str

class CodeSubmissionRequest(BaseModel):
    question_id: str
    code: str
    language: str = "python"

class AptitudeSubmitRequest(BaseModel):
    answers: Dict[str, str] # question_id -> chosen option string
