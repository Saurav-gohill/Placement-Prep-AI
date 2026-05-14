from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_current_user
from database import get_db
from models import InterviewStartRequest, InterviewEvaluateRequest, InterviewChatRequest, InterviewReportRequest
from supabase import Client
from services.sarvam_service import get_interview_questions, evaluate_interview_response, chat_interview, generate_interview_report
import uuid

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
            print(f"DB insert warning for interview: {db_err}")
            session_id = str(uuid.uuid4())
        
        # Generate the opening message from the AI interviewer
        opening = f"Hi there! Welcome to your {req.difficulty}-level {req.role_targeted} interview. I'll be your interviewer today. Let's start with something simple — can you tell me a little about yourself and what interests you about {req.role_targeted}?"
        
        return {
            "session_id": session_id,
            "questions": questions,
            "opening_message": opening
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post('/chat')
async def chat_with_interviewer(
    req: InterviewChatRequest,
    user_id: str = Depends(get_current_user)
):
    """ChatGPT-style conversational interview endpoint."""
    try:
        result = await chat_interview(
            role=req.role,
            difficulty=req.difficulty,
            conversation_history=req.conversation_history,
            user_message=req.message
        )
        
        return {
            "response": result["response"],
            "evaluation": result["evaluation"],
            "observation": result["observation"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post('/report')
async def generate_report(
    req: InterviewReportRequest,
    user_id: str = Depends(get_current_user)
):
    """Generate a comprehensive performance report at the end of the interview."""
    try:
        report = await generate_interview_report(
            role=req.role,
            difficulty=req.difficulty,
            conversation_history=req.conversation_history
        )
        
        # Try to save to DB
        try:
            db: Client = get_db()
            db.table("interview_sessions").update({
                "score": report.get("overall_score", 0),
                "ai_feedback": report
            }).eq("session_id", req.session_id).execute()
        except Exception as db_err:
            print(f"DB update warning for report: {db_err}")
        
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post('/evaluate')
async def evaluate_response(
    req: InterviewEvaluateRequest,
    user_id: str = Depends(get_current_user)
):
    """Legacy evaluate endpoint for backward compatibility."""
    try:
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
