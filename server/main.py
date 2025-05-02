from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.resume import router as resume_router
import os

app = FastAPI(title="PromptCV API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(resume_router, prefix="/api/resume")

# Root endpoint for health check
@app.get("/")
async def root():
    return {"status": "healthy", "message": "PromptCV API is running"}

