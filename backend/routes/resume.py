from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
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
        
        # Try pdfplumber first (more reliable), fallback to PyPDF2
        text = ""
        try:
            import pdfplumber
            with pdfplumber.open(io.BytesIO(contents)) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
        except Exception:
            import PyPDF2
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
            for page in pdf_reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
            
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF.")
            
        # Analyze with Gemini
        analysis = await analyze_resume_text(text)
        
        # Save to DB
        db: Client = get_db()
        
        # Mock file URL since we aren't uploading to Supabase Storage yet
        file_url = f"https://mockstorage.com/{uuid.uuid4()}.pdf"
        
        try:
            resp = db.table("resumes").insert({
                "user_id": user_id,
                "resume_url": file_url,
                "ats_score": analysis.get("score", 0),
                "ai_feedback": analysis
            }).execute()

            result_data = resp.data[0] if resp.data else {}
            result_data["analysis_data"] = analysis
            return {"message": "Success", "data": result_data}
        except Exception as db_err:
            # If DB insert fails (e.g. FK constraint because user not in users table),
            # still return the analysis - the AI result is the important part
            print(f"DB insert warning: {db_err}")
            return {
                "message": "Success (analysis only - DB save skipped)", 
                "data": {
                    "analysis_data": analysis,
                    "ats_score": analysis.get("score", 0)
                }
            }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
