import os
import json

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

async def analyze_resume_text(text: str) -> dict:
    """
    Analyzes the extracted resume text against Gemini.
    Uses a mock if the API key is not present.
    """
    if not GEMINI_API_KEY or GEMINI_API_KEY == "placeholder_key":
        # Mock Response
        return {
            "score": 75,
            "keywords_missing": ["React", "FastAPI", "PostgreSQL"],
            "suggestions": [
                "Quantify your achievements with metrics.",
                "Ensure your summary is tailored to the specific role.",
                "Highlight more cloud deployment experience."
            ]
        }
    
    # Real Implementation using google-generativeai
    try:
        import google.generativeai as genai
        
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        prompt = f"""
        Analyze the following resume text. Return a strict JSON object with:
        1. "score": integer (0-100) indicating ATS compatibility.
        2. "keywords_missing": list of strings indicating important tech or soft skill keywords missing.
        3. "suggestions": list of strings for improvement.
        
        Resume Text:
        {text[:3000]}
        """
        
        response = model.generate_content(prompt)
        
        # Clean up response to dict
        raw_text = response.text
        # Strip potential markdown blocks
        if "```json" in raw_text:
            raw_text = raw_text.split("```json")[1].split("```")[0].strip()
        elif "```" in raw_text:
            raw_text = raw_text.split("```")[1].strip()
            
        data = json.loads(raw_text)
        return {
            "score": data.get("score", 70),
            "keywords_missing": data.get("keywords_missing", []),
            "suggestions": data.get("suggestions", [])
        }
    except Exception as e:
        print(f"Gemini API Error: {e}")
        # Fallback mock
        return {
            "score": 68,
            "keywords_missing": ["Could not parse keywords"],
            "suggestions": [
                "AI analysis encountered an issue. Please try again.",
                "Make sure your resume includes relevant technical keywords.",
                "Add quantifiable metrics to your achievements."
            ]
        }
