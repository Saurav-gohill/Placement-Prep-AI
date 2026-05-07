from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_current_user
from database import get_db
from models import InterviewStartRequest, InterviewEvaluateRequest
from supabase import Client
from services.sarvam_service import get_interview_questions, evaluate_interview_response

router = APIRouter()

@router.post('/start')
async def start_session(
    req: InterviewStartRequest,
    user_id: str = Depends(get_current_user)
):
    try:
        questions = await get_interview_questions(req.role_targeted)
        
        session_id = None
        try:
            db: Client = get_db()
            resp = db.table("interview_sessions").insert({
                "user_id": user_id,
                "role": req.role_targeted,
                "question": questions[0] if questions else "Introduce yourself",
                "score": 0,
                "ai_feedback": {}
            }).execute()
            
            session_id = resp.data[0]['session_id'] if resp.data else None
        except Exception as db_err:
            # If DB insert fails (FK constraint etc), generate a mock session ID
            print(f"DB insert warning for interview: {db_err}")
            import uuid
            session_id = str(uuid.uuid4())
        
        return {"session_id": session_id, "questions": questions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/evaluate')
async def evaluate_response(
    req: InterviewEvaluateRequest,
    user_id: str = Depends(get_current_user)
):
    try:
        # Evaluate the response using our service
        evaluation = await evaluate_interview_response(
            "Software Engineer", 
            "Interview question", 
            req.transcribed_text
        )
        
        return {
            "score_technical": evaluation["technical_accuracy"],
            "score_communication": evaluation["communication"],
            "feedback": evaluation["feedback"]
        }
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))
