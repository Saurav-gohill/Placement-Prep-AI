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
        
        db: Client = get_db()
        session_data = {"questions": questions, "current_index": 0, "responses": []}
        
        resp = db.table("interview_sessions").insert({
            "user_id": user_id,
            "role_targeted": req.role_targeted,
            "session_data": session_data,
            "overall_score": 0,
            "feedback": ""
        }).execute()
        
        return {"session_id": resp.data[0]['id'], "questions": questions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/evaluate')
async def evaluate_response(
    req: InterviewEvaluateRequest,
    user_id: str = Depends(get_current_user)
):
    try:
        db: Client = get_db()
        
        # In a real app we fetch the current question from DB tracking. We'll mock the question passing.
        evaluation = await evaluate_interview_response(
            "Software Engineer", 
            "Generic mock question", 
            req.transcribed_text
        )
        
        # Optionally update DB snippet (mock updating)
        
        return {
            "score_technical": evaluation["technical_accuracy"],
            "score_communication": evaluation["communication"],
            "feedback": evaluation["feedback"]
        }
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))
