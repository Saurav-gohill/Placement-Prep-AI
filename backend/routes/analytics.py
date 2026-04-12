from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_current_user
from database import get_db
from supabase import Client

router = APIRouter()

@router.get('/dashboard')
async def get_dashboard_analytics(user_id: str = Depends(get_current_user)):
    """
    Fetches aggregate metrics for the dashboard across all tables for the current user.
    """
    try:
        db: Client = get_db()
        
        # Fetch Best Resume Score
        resume_data = db.table("resumes").select("score").eq("user_id", user_id).order("score", desc=True).limit(1).execute()
        best_resume_score = resume_data.data[0]["score"] if resume_data.data else 0
        
        # Fetch Coding Count
        coding_data = db.table("coding_submissions").select("id", count="exact").eq("user_id", user_id).execute()
        total_coding = coding_data.count if coding_data.count else 0
        
        # Fetch Aptitude Average
        aptitude_data = db.table("aptitude_results").select("score, total_questions").eq("user_id", user_id).execute()
        apt_avg = sum([r['score'] for r in aptitude_data.data]) / len(aptitude_data.data) if aptitude_data.data else 0
        
        # Fetch Interview Avg
        interview_data = db.table("interview_sessions").select("overall_score").eq("user_id", user_id).execute()
        int_avg = sum([r['overall_score'] for r in interview_data.data]) / len(interview_data.data) if interview_data.data else 0

        return {
            "best_resume_score": best_resume_score,
            "total_coding_submissions": total_coding,
            "aptitude_average": apt_avg,
            "interview_readiness": int_avg
        }
        
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))
