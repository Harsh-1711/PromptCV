from fastapi import APIRouter, UploadFile, File
from utils.resume_parser import extract_text_from_pdf, split_sections
from services.gemini_service import get_resume_suggestions

router = APIRouter()

@router.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    text = extract_text_from_pdf(file.file)
    sections = split_sections(text)

    results = {}
    for heading, content in sections.items():
        result = get_resume_suggestions(heading, content)
        results[heading] = result

    return {"filename": file.filename, "suggestions": results}