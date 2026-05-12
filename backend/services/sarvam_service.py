import os
import json
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
SARVAM_API_KEY = os.environ.get("SARVAM_API_KEY")

async def get_interview_questions(role: str) -> list[str]:
    """Generates interview questions using Gemini AI for the given role."""
    
    if GEMINI_API_KEY and GEMINI_API_KEY != "placeholder_key":
        try:
            import google.generativeai as genai
            genai.configure(api_key=GEMINI_API_KEY)
            model = genai.GenerativeModel('gemini-2.0-flash')
            
            prompt = f"""You are a senior technical interviewer at a FAANG company. Generate exactly 5 interview questions for a {role} position.

Mix of question types:
1. One behavioral/introduction question
2. Two technical concept questions
3. One problem-solving/scenario question
4. One system design or architecture question

Return ONLY a JSON array of 5 strings. No markdown, no explanation.
Example: ["Question 1?", "Question 2?", "Question 3?", "Question 4?", "Question 5?"]"""

            response = model.generate_content(prompt)
            raw = response.text.strip()
            if "```json" in raw:
                raw = raw.split("```json")[1].split("```")[0].strip()
            elif "```" in raw:
                raw = raw.split("```")[1].split("```")[0].strip()
            
            questions = json.loads(raw)
            if isinstance(questions, list) and len(questions) >= 3:
                return questions[:5]
        except Exception as e:
            print(f"Gemini question gen error: {e}")
    
    # Fallback mock questions
    role_lower = role.lower()
    if "frontend" in role_lower:
        return [
            "Tell me about yourself and your experience with frontend development.",
            "What exactly is the Virtual DOM in React, and how does it improve performance?",
            "Explain the difference between useMemo and useCallback hooks with real-world examples.",
            "You're building a dashboard that loads data from 5 different APIs. How would you optimize the loading experience?",
            "How would you architect a micro-frontend system for a large e-commerce platform?"
        ]
    elif "backend" in role_lower:
        return [
            "Walk me through your most challenging backend project.",
            "Explain the CAP theorem and how it influences your database choices.",
            "How does connection pooling work and why is it important in production?",
            "A critical API endpoint is timing out under load. Walk me through your debugging process.",
            "Design a rate-limiting system that handles 10,000 requests per second."
        ]
    elif "data" in role_lower:
        return [
            "What drew you to data analysis and what's your analytical approach?",
            "Explain the difference between correlation and causation with a business example.",
            "When would you use a window function vs a GROUP BY in SQL?",
            "You notice a 30% drop in user engagement. How would you investigate this?",
            "Design a real-time analytics pipeline for an e-commerce platform."
        ]
    else:
        return [
            f"Tell me about yourself and why you're interested in the {role} position.",
            "Describe a time you solved a complex technical problem under pressure.",
            "What's a technology you recently learned and how did you apply it?",
            "Your team disagrees on a technical approach. How do you handle it?",
            "Where do you see yourself in 3-5 years and how does this role fit in?"
        ]


async def evaluate_interview_response(role: str, question: str, response_text: str) -> dict:
    """Evaluates the interview answer using Gemini AI with detailed feedback."""
    
    if GEMINI_API_KEY and GEMINI_API_KEY != "placeholder_key":
        try:
            import google.generativeai as genai
            genai.configure(api_key=GEMINI_API_KEY)
            model = genai.GenerativeModel('gemini-2.0-flash')
            
            prompt = f"""You are a senior interviewer evaluating a candidate's response. Be constructive but honest.

Role: {role}
Question: {question}
Candidate's Answer: {response_text}

Return a strict JSON object:
{{
  "technical_accuracy": <integer 0-100>,
  "communication": <integer 0-100>,
  "confidence": <integer 0-100>,
  "feedback": "<2-3 sentences of specific, actionable feedback. Mention what was good AND what to improve. Reference specific parts of their answer.>",
  "improved_answer_hint": "<1 sentence suggesting what an ideal answer would include that was missing>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<improvement 1>", "<improvement 2>"]
}}

Return ONLY valid JSON. No markdown."""

            response = model.generate_content(prompt)
            raw = response.text.strip()
            if "```json" in raw:
                raw = raw.split("```json")[1].split("```")[0].strip()
            elif "```" in raw:
                raw = raw.split("```")[1].split("```")[0].strip()
            
            data = json.loads(raw)
            return {
                "technical_accuracy": data.get("technical_accuracy", 70),
                "communication": data.get("communication", 70),
                "confidence": data.get("confidence", 70),
                "feedback": data.get("feedback", "Good response. Try adding more specific examples."),
                "improved_answer_hint": data.get("improved_answer_hint", ""),
                "strengths": data.get("strengths", []),
                "improvements": data.get("improvements", [])
            }
        except Exception as e:
            print(f"Gemini evaluate error: {e}")
    
    # Fallback mock evaluation
    word_count = len(response_text.split())
    
    if word_count < 10:
        return {
            "technical_accuracy": 30,
            "communication": 40,
            "confidence": 35,
            "feedback": "Your response was too brief. Interviewers expect detailed answers with examples. Try using the STAR method: Situation, Task, Action, Result.",
            "improved_answer_hint": "Expand with a concrete example from your experience and explain the technical reasoning.",
            "strengths": ["Concise"],
            "improvements": ["Add technical depth", "Include real examples", "Elaborate on reasoning"]
        }
    elif word_count > 50:
        return {
            "technical_accuracy": 82,
            "communication": 88,
            "confidence": 85,
            "feedback": "Strong answer with good detail. You demonstrated solid understanding of the concepts. Consider structuring your response more clearly with an intro statement before diving into details.",
            "improved_answer_hint": "Add a brief concluding statement that ties back to the original question.",
            "strengths": ["Good technical depth", "Clear articulation"],
            "improvements": ["Structure with intro-body-conclusion", "Be slightly more concise"]
        }
    else:
        return {
            "technical_accuracy": 65,
            "communication": 72,
            "confidence": 68,
            "feedback": "Decent response covering the basics. You could strengthen it by adding a real-world example from your own experience and explaining the 'why' behind your technical choices.",
            "improved_answer_hint": "Add a specific project example where you applied this concept and the outcome.",
            "strengths": ["Covers fundamentals"],
            "improvements": ["Add depth with examples", "Explain trade-offs", "Show practical experience"]
        }
