from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_current_user
from database import get_db
from models import AptitudeSubmitRequest
from supabase import Client

router = APIRouter()

@router.get('/questions')
async def get_aptitude_questions():
    try:
        db: Client = get_db()
        resp = db.table("aptitude_questions").select("*").limit(10).execute()
        return {"questions": resp.data}
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))

@router.post('/submit')
async def submit_aptitude(
    req: AptitudeSubmitRequest,
    user_id: str = Depends(get_current_user)
):
    try:
        db: Client = get_db()
        
        # In a real app we'd validate against correct answers in the DB
        # For this prototype we will assume score calculation happens here or is mocked
        total_q = len(req.answers)
        score = int(total_q * 0.8) if total_q > 0 else 0 # 80% mock logic 
        
        resp = db.table("aptitude_results").insert({
            "user_id": user_id,
            "score": score,
            "total_questions": total_q,
            "time_taken_seconds": 600
        }).execute()

        return {"score": score, "total": total_q, "result_id": resp.data[0]['id']}
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))
