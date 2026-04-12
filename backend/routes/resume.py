from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
import PyPDF2
import io
import uuid

from dependencies import get_current_user
from database import get_db
from supabase import Client
from services.gemini_service import analyze_resume_text

router = APIRouter()

@router.post('/analyze')
async def analyze_resume(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user)
):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
    try:
        contents = await file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
            
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF.")
            
        # Analyze with Gemini
        analysis = await analyze_resume_text(text)
        
        # Save to DB
        db: Client = get_db()
        
        # Mock file URL since we aren't uploading to Supabase Storage yet
        file_url = f"https://mockstorage.com/{uuid.uuid4()}.pdf"
        
        resp = db.table("resumes").insert({
            "user_id": user_id,
            "file_url": file_url,
            "score": analysis["score"],
            "analysis_data": analysis
        }).execute()

        return {"message": "Success", "data": resp.data[0]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
