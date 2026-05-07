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
        
        # Fetch Best Resume Score (column is ats_score, not score)
        best_resume_score = 0
        try:
            resume_data = db.table("resumes").select("ats_score").eq("user_id", user_id).order("ats_score", desc=True).limit(1).execute()
            best_resume_score = resume_data.data[0]["ats_score"] if resume_data.data else 0
        except Exception:
            pass
        
        # Fetch Coding Count
        total_coding = 0
        try:
            coding_data = db.table("coding_submissions").select("submission_id", count="exact").eq("user_id", user_id).execute()
            total_coding = coding_data.count if coding_data.count else 0
        except Exception:
            pass
        
        # Fetch Aptitude Average
        apt_avg = 0
        try:
            aptitude_data = db.table("aptitude_results").select("score, total_questions").eq("user_id", user_id).execute()
            if aptitude_data.data:
                scores = [r['score'] for r in aptitude_data.data if r.get('score') is not None]
                apt_avg = sum(scores) / len(scores) if scores else 0
        except Exception:
            pass
        
        # Fetch Interview Avg (column is score, not overall_score)
        int_avg = 0
        try:
            interview_data = db.table("interview_sessions").select("score").eq("user_id", user_id).execute()
            if interview_data.data:
                scores = [r['score'] for r in interview_data.data if r.get('score') is not None]
                int_avg = sum(scores) / len(scores) if scores else 0
        except Exception:
            pass

        return {
            "best_resume_score": best_resume_score,
            "total_coding_submissions": total_coding,
            "aptitude_average": apt_avg,
            "interview_readiness": int_avg
        }
        
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))
