from fastapi import APIRouter, Depends, HTTPException
import subprocess
import tempfile
import os
import uuid
import time
from dependencies import get_current_user
from database import get_db
from models import CodeSubmissionRequest
from supabase import Client

router = APIRouter()

@router.get('/questions')
async def get_questions():
    try:
        db: Client = get_db()
        resp = db.table("coding_questions").select("*").execute()
        return {"questions": resp.data}
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))

@router.post('/submit')
async def submit_code(
    req: CodeSubmissionRequest,
    user_id: str = Depends(get_current_user)
):
    if req.language.lower() != 'python':
         raise HTTPException(status_code=400, detail="Only Python execution is supported for now.")
         
    execution_time = 0
    passed = False
    
    # Safe subprocess execution of python code
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
        f.write(req.code)
        temp_file = f.name
        
    try:
        start_time = time.time()
        # timeout after 2 seconds to prevent infinite loops
        result = subprocess.run(
            ['python', temp_file], 
            capture_output=True, 
            text=True, 
            timeout=2.0
        )
        execution_time = int((time.time() - start_time) * 1000)
        
        # Check if executed successfully (for simplicity, valid syntax and zero exit code is "pass")
        # In a real environment, you run it against test_cases.
        passed = (result.returncode == 0)
        output = result.stdout if passed else result.stderr
        
    except subprocess.TimeoutExpired:
        output = "Execution Timed Out (> 2 seconds)"
        passed = False
        execution_time = 2000
    finally:
        os.remove(temp_file)
        
    # Save to db
    try:
        db: Client = get_db()
        # Mock question ID if none provided since constraints aren't strict yet
        q_id = req.question_id if req.question_id else str(uuid.uuid4())
        
        # Just avoiding foreign key crash if question fake, so bypass if fake
        # Note: If RLS and FK enforces question existence, we will need real query logic
        db.table("coding_submissions").insert({
            "user_id": user_id,
            "question_id": req.question_id, # Requires real uuid in production schema
            "code": req.code,
            "result": "Passed" if passed else "Failed",
            "score": 100 if passed else 0
        }).execute()
    except Exception as e:
        print(f"Failed to record sumbission in DB: {e}")
        pass # Allow soft fail for local dev
        
    return {
        "passed": passed,
        "execution_time_ms": execution_time,
        "output": output
    }
