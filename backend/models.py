from pydantic import BaseModel
from typing import List, Dict, Optional, Any

class InterviewStartRequest(BaseModel):
    role_targeted: str
    difficulty: str = "Mid"

class InterviewEvaluateRequest(BaseModel):
    session_id: str
    transcribed_text: str

class InterviewChatRequest(BaseModel):
    session_id: str
    message: str
    role: str = "Software Engineer"
    difficulty: str = "Mid"
    conversation_history: List[Dict[str, str]] = []

class InterviewReportRequest(BaseModel):
    session_id: str
    role: str = "Software Engineer"
    difficulty: str = "Mid"
    conversation_history: List[Dict[str, str]] = []

class CodeSubmissionRequest(BaseModel):
    question_id: str
    code: str
    language: str = "python"

class AptitudeSubmitRequest(BaseModel):
    answers: Dict[str, str] # question_id -> chosen option string
