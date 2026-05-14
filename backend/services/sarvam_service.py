import os
import json
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")


def _get_gemini_model():
    """Lazy-load the Gemini model."""
    import google.generativeai as genai
    genai.configure(api_key=GEMINI_API_KEY)
    return genai.GenerativeModel('gemini-2.0-flash')


async def get_interview_questions(role: str) -> list[str]:
    """Generates dynamic interview questions using Gemini."""
    if not GEMINI_API_KEY or GEMINI_API_KEY == "placeholder_key":
        return _mock_questions(role)

    try:
        model = _get_gemini_model()
        prompt = f"""Generate exactly 5 technical interview questions for a {role} position.
Return as a JSON array of strings. No markdown, no explanation, just the JSON array.
Questions should progress from easy to hard. Mix behavioral and technical.
Example: ["question1", "question2", ...]"""

        response = model.generate_content(prompt)
        raw = response.text.strip()
        if "```json" in raw:
            raw = raw.split("```json")[1].split("```")[0].strip()
        elif "```" in raw:
            raw = raw.split("```")[1].split("```")[0].strip()
        return json.loads(raw)
    except Exception as e:
        print(f"Gemini questions error: {e}")
        return _mock_questions(role)


async def chat_interview(role: str, difficulty: str, conversation_history: list, user_message: str) -> dict:
    """
    Conducts a conversational interview using Gemini.
    Maintains full chat context for natural follow-ups.
    Returns the AI interviewer's response + live evaluation.
    """
    if not GEMINI_API_KEY or GEMINI_API_KEY == "placeholder_key":
        return _mock_chat_response(user_message)

    try:
        model = _get_gemini_model()

        # Build conversation context
        history_text = ""
        for msg in conversation_history:
            role_label = "Interviewer" if msg["role"] == "ai" else "Candidate"
            history_text += f"{role_label}: {msg['content']}\n"

        prompt = f"""You are an expert {difficulty}-level technical interviewer for a {role} position.
You are conducting a live, one-on-one voice interview with a candidate.

RULES:
- Be conversational and natural, like a real human interviewer
- Ask ONE question or follow-up at a time
- If the candidate's answer is vague, probe deeper with a follow-up question
- If the candidate's answer is strong, acknowledge it briefly and move to a new topic
- Mix technical questions with behavioral/situational questions
- Be encouraging but honest
- Keep your responses concise (2-4 sentences max) — this will be spoken aloud
- NEVER break character or mention you're an AI

CONVERSATION SO FAR:
{history_text}

Candidate's latest response: {user_message}

Now respond as the interviewer. Return ONLY a JSON object:
{{
  "response": "<your next question or follow-up — keep it natural and conversational>",
  "evaluation": {{
    "technical_score": <0-100, how technically accurate was the candidate's last answer>,
    "communication_score": <0-100, how well they communicated>,
    "confidence_score": <0-100, how confident they seemed based on word choice>
  }},
  "observation": "<one brief real-time observation about the candidate's performance, e.g., 'Good use of specific examples' or 'Consider mentioning scalability aspects'>"
}}"""

        response = model.generate_content(prompt)
        raw = response.text.strip()
        if "```json" in raw:
            raw = raw.split("```json")[1].split("```")[0].strip()
        elif "```" in raw:
            raw = raw.split("```")[1].split("```")[0].strip()

        data = json.loads(raw)
        return {
            "response": data.get("response", "Could you elaborate on that?"),
            "evaluation": data.get("evaluation", {"technical_score": 70, "communication_score": 70, "confidence_score": 70}),
            "observation": data.get("observation", "")
        }
    except Exception as e:
        print(f"Gemini chat error: {e}")
        return _mock_chat_response(user_message)


async def generate_interview_report(role: str, difficulty: str, conversation_history: list) -> dict:
    """
    Generates a comprehensive interview performance report.
    """
    if not GEMINI_API_KEY or GEMINI_API_KEY == "placeholder_key":
        return _mock_report()

    try:
        model = _get_gemini_model()

        history_text = ""
        for msg in conversation_history:
            role_label = "Interviewer" if msg["role"] == "ai" else "Candidate"
            history_text += f"{role_label}: {msg['content']}\n"

        prompt = f"""You just finished interviewing a candidate for a {difficulty}-level {role} position.
Here is the full conversation transcript:

{history_text}

Generate a comprehensive performance report. Return ONLY a JSON object:
{{
  "overall_score": <0-100>,
  "verdict": "<STRONG HIRE | HIRE | MAYBE | NO HIRE>",
  "summary": "<2-3 sentence overall assessment>",
  "scores": {{
    "technical_knowledge": <0-100>,
    "communication": <0-100>,
    "problem_solving": <0-100>,
    "confidence": <0-100>,
    "cultural_fit": <0-100>
  }},
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<area to improve 1>", "<area to improve 2>", "<area to improve 3>"],
  "question_breakdown": [
    {{
      "question": "<interviewer question>",
      "candidate_answer_summary": "<brief summary of what candidate said>",
      "score": <0-100>,
      "feedback": "<specific feedback for this answer>"
    }}
  ]
}}"""

        response = model.generate_content(prompt)
        raw = response.text.strip()
        if "```json" in raw:
            raw = raw.split("```json")[1].split("```")[0].strip()
        elif "```" in raw:
            raw = raw.split("```")[1].split("```")[0].strip()

        return json.loads(raw)
    except Exception as e:
        print(f"Gemini report error: {e}")
        return _mock_report()


async def evaluate_interview_response(role: str, question: str, response_text: str) -> dict:
    """Legacy evaluate function for backward compatibility."""
    result = await chat_interview(role, "Mid", [], response_text)
    return {
        "technical_accuracy": result["evaluation"]["technical_score"],
        "communication": result["evaluation"]["communication_score"],
        "feedback": result["response"]
    }


def _mock_questions(role):
    return [
        f"Tell me about yourself and why you're interested in {role}.",
        "Describe a challenging project you worked on recently.",
        "How do you approach debugging a complex issue?",
        "Explain a concept you're passionate about to a non-technical person.",
        "Where do you see yourself growing in the next 2-3 years?"
    ]


def _mock_chat_response(user_message):
    word_count = len(user_message.split())
    if word_count < 10:
        return {
            "response": "I see. Could you elaborate a bit more on that? Maybe walk me through a specific example from your experience?",
            "evaluation": {"technical_score": 40, "communication_score": 50, "confidence_score": 45},
            "observation": "Response was brief — try to provide more detail and examples."
        }
    elif word_count > 50:
        return {
            "response": "That's a thorough answer, I appreciate the detail. Let me ask you something different — how do you handle disagreements with team members about technical decisions?",
            "evaluation": {"technical_score": 82, "communication_score": 88, "confidence_score": 85},
            "observation": "Great depth in the response with specific examples. Strong communication."
        }
    else:
        return {
            "response": "Good answer. Can you tell me more about how you'd optimize that solution for scale? What would change if the user base grew 10x?",
            "evaluation": {"technical_score": 68, "communication_score": 72, "confidence_score": 70},
            "observation": "Solid foundation — consider adding scalability and performance context."
        }


def _mock_report():
    return {
        "overall_score": 74,
        "verdict": "HIRE",
        "summary": "The candidate demonstrated solid technical fundamentals with good communication skills. Areas for improvement include system design thinking and providing more quantified examples of impact.",
        "scores": {
            "technical_knowledge": 72,
            "communication": 80,
            "problem_solving": 70,
            "confidence": 75,
            "cultural_fit": 78
        },
        "strengths": [
            "Clear and structured communication style",
            "Good understanding of core concepts",
            "Shows genuine enthusiasm for learning"
        ],
        "improvements": [
            "Provide more specific metrics when discussing achievements",
            "Deepen system design and architecture knowledge",
            "Practice answering behavioral questions with the STAR method"
        ],
        "question_breakdown": [
            {
                "question": "Tell me about yourself",
                "candidate_answer_summary": "Gave background overview with relevant experience",
                "score": 75,
                "feedback": "Good overview but could be more concise and role-targeted"
            },
            {
                "question": "Describe a challenging project",
                "candidate_answer_summary": "Discussed a project with technical challenges",
                "score": 72,
                "feedback": "Good story but missing quantifiable outcomes"
            }
        ]
    }
