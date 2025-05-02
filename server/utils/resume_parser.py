import pdfplumber
import re

HEADING_MAP = {
    "Objective": ["Objective", "Career Objective", "Professional Objective"],
    "Summary": ["Summary", "Professional Summary", "Profile", "About Me"],
    "Education": ["Education", "Academic Background", "Qualifications"],
    "Experience": ["Experience", "Work Experience", "Professional Experience", "Career History"],
    "Skills": ["Skills", "Technical Skills", "Core Competencies"],
    "Projects": ["Projects", "Key Projects", "Project Work"],
    "Certifications": ["Certifications", "Courses", "Licenses"]
}

def match_heading(line):
    for standard, variants in HEADING_MAP.items():
        if any(re.fullmatch(rf".*{re.escape(v)}.*", line.strip(), re.IGNORECASE) for v in variants):
            return standard
    return None

def extract_text_from_pdf(file_stream):
    with pdfplumber.open(file_stream) as pdf:
        return "\n".join(page.extract_text() or "" for page in pdf.pages)


def split_sections(text):
    sections = {}
    current_section = "General"
    sections[current_section] = []

    for line in text.splitlines():
        matched = match_heading(line)
        if matched:
            current_section = matched
            sections[current_section] = []
        else:
            sections.setdefault(current_section, []).append(line.strip())

    return {sec: "\n".join(lines).strip() for sec, lines in sections.items() if lines}