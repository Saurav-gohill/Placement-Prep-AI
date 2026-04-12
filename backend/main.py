from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, resume, interview, coding, aptitude, analytics

app = FastAPI(title="PlacementPrep API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend deployment URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "PlacementPrep API is running"}

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(resume.router, prefix="/api/resume", tags=["Resume"])
app.include_router(interview.router, prefix="/api/interview", tags=["Interview"])
app.include_router(coding.router, prefix="/api/coding", tags=["Coding"])
app.include_router(aptitude.router, prefix="/api/aptitude", tags=["Aptitude"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
