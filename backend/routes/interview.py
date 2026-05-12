from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_current_user
from database import get_db
from models import InterviewStartRequest, InterviewEvaluateRequest
from supabase import Client
from services.sarvam_service import get_interview_questions, evaluate_interview_response

router = APIRouter()

# In-memory session store for tracking questions per session
_sessions = {}

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
            import uuid
            session_id = str(uuid.uuid4())
        
        # Store session data in memory for question tracking
        _sessions[session_id] = {
            "role": req.role_targeted,
            "questions": questions,
            "current_q": 0,
            "scores": []
        }
        
        return {"session_id": session_id, "questions": questions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/evaluate')
async def evaluate_response(
    req: InterviewEvaluateRequest,
    user_id: str = Depends(get_current_user)
):
    try:
        # Get session context for better evaluation
        session_data = _sessions.get(req.session_id, {})
        role = session_data.get("role", "Software Engineer")
        questions = session_data.get("questions", [])
        current_q = session_data.get("current_q", 0)
        
        # Get the current question being answered
        question = questions[current_q] if current_q < len(questions) else "Interview question"
        
        # Evaluate with AI
        evaluation = await evaluate_interview_response(
            role, 
            question, 
            req.transcribed_text
        )
        
        # Advance question counter
        if session_data:
            session_data["current_q"] = current_q + 1
            session_data["scores"].append({
                "technical": evaluation["technical_accuracy"],
                "communication": evaluation["communication"],
                "confidence": evaluation.get("confidence", 70)
            })
        
        return {
            "score_technical": evaluation["technical_accuracy"],
            "score_communication": evaluation["communication"],
            "score_confidence": evaluation.get("confidence", 70),
            "feedback": evaluation["feedback"],
            "improved_answer_hint": evaluation.get("improved_answer_hint", ""),
            "strengths": evaluation.get("strengths", []),
            "improvements": evaluation.get("improvements", [])
        }
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))

@router.post('/end')
async def end_session(
    req: dict,
    user_id: str = Depends(get_current_user)
):
    """End the interview session and return a full report."""
    session_id = req.get("session_id")
    session_data = _sessions.pop(session_id, None)
    
    if not session_data or not session_data.get("scores"):
        return {
            "overall_score": 0,
            "total_questions": 0,
            "summary": "No data available for this session."
        }
    
    scores = session_data["scores"]
    avg_tech = sum(s["technical"] for s in scores) // len(scores)
    avg_comm = sum(s["communication"] for s in scores) // len(scores)
    avg_conf = sum(s["confidence"] for s in scores) // len(scores)
    overall = (avg_tech + avg_comm + avg_conf) // 3
    
    return {
        "overall_score": overall,
        "avg_technical": avg_tech,
        "avg_communication": avg_comm,
        "avg_confidence": avg_conf,
        "total_questions": len(scores),
        "role": session_data["role"],
        "summary": f"You answered {len(scores)} questions for the {session_data['role']} role with an overall score of {overall}%."
    }
