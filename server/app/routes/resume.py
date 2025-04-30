from fastapi import APIRouter, UploadFile, File
from app.utils.resume_parser import extract_text_from_pdf, split_sections
from app.services.gemini_service import get_resume_suggestions

router = APIRouter()

@router.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    contents = await file.read()
    with open("temp_resume.pdf", "wb") as f:
        f.write(contents)

    text = extract_text_from_pdf("temp_resume.pdf")
    sections = split_sections(text)

    results = {}
    for heading, content in sections.items():
        result = get_resume_suggestions(heading, content)
        results[heading] = result

    return {"filename": file.filename,"suggestions": results}
