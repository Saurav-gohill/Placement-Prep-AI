import os

SARVAM_API_KEY = os.environ.get("SARVAM_API_KEY")

async def get_interview_questions(role: str) -> list[str]:
    """Generates a list of interview questions for the given role."""
    
    # We will use mock questions for safety unless integrating a real LLM for generation
    if role.lower() == "frontend developer":
        return [
            "What exactly is the Virtual DOM in React, and how does it improve performance?",
            "Explain the difference between useMemo and useCallback hooks.",
            "How do you handle state management in a large-scale React application?"
        ]
    elif role.lower() == "backend developer":
        return [
            "Explain the concept of RESTful APIs.",
            "How does indexing work in PostgreSQL?",
            "Explain how you would handle background tasks in a web application."
        ]
    else:
        return [
            f"Why are you interested in the {role} position?",
            "Can you describe a time you overcame a difficult technical challenge?",
            "Where do you see yourself in 5 years?"
        ]

async def evaluate_interview_response(role: str, question: str, response_text: str) -> dict:
    """
    Evaluates the transcribed answer using an LLM.
    Uses mock if Sarvam implies LLM or if we don't have dedicated keys.
    """
    # Note: Sarvam AI is primarily for Indic language speech models, but they also have some LLM capabilities. 
    # For now, we mock the evaluation.
    
    word_count = len(response_text.split())
    
    if word_count < 10:
        return {
            "technical_accuracy": 30,
            "communication": 50,
            "feedback": "Your response was too brief. Try to elaborate on the underlying concepts and provide examples."
        }
    elif word_count > 50:
        return {
            "technical_accuracy": 85,
            "communication": 90,
            "feedback": "Excellent detailed response. You clearly articulated the concepts."
        }
    else:
        return {
            "technical_accuracy": 70,
            "communication": 75,
            "feedback": "Good response, but could use a bit more theoretical depth or a real-world example."
        }
