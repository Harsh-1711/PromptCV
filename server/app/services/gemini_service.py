from langchain_core.prompts import PromptTemplate
from langchain_google_genai import GoogleGenerativeAI
import re
import os
from dotenv import load_dotenv

load_dotenv()

def get_resume_suggestions(original_heading, section_text):
    llm = GoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=os.getenv("GEMINI_API_KEY"),
    )

    prompt_template = """Analyze this resume section for ATS compatibility:

    Original Heading: {heading}
    Content: {content}

    Provide:
    1. Overall ATS compatibility score (0-100) based on:
    2. Improved heading suggestion (if needed)
       - Keyword optimization
       - Clear section structure
       - Quantifiable achievements
       - Action verb usage
       - Relevance to job description

    Format response as (dont add any special character in the response just add bullets if required):
    ATS Score: [XX/100]
    All Suggested Headings: [Improved heading]
    Suggestions:
    - [Suggestion 1]
    - [Suggestion 2]
    """

    prompt = PromptTemplate(
        input_variables=["heading", "content"],
        template=prompt_template
    )

    chain = prompt | llm
    response = chain.invoke({
        "heading": original_heading,
        "content": section_text
    })

    # print("Full Response: ", response)

    try:
        ats_score_match = re.search(r"ATS Score:\s*(\d+)", response)
        ats_score = int(ats_score_match.group(1)) if ats_score_match else 0

        suggested_heading_match = re.search(r"Suggested Heading:\s*(.+)", response)
        suggested_heading = suggested_heading_match.group(1) if suggested_heading_match else original_heading

        suggestions = re.findall(r"-\s*(.+?)(?=\n-|\n$)", response, re.DOTALL)
        if not isinstance(suggestions, list): 
            suggestions = []
    except (AttributeError, ValueError) as e:
        print(f"Error parsing response: {e}")
        suggested_heading = original_heading
        ats_score = 0
        suggestions = ["Failed to parse suggestions"]

    return {
        "original_heading": original_heading,
        "suggested_heading": suggested_heading,
        "ats_score": ats_score,
        "suggestions": suggestions,  
        "section_preview": section_text[:100] 
    }
