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

    prompt_template = """Analyze this resume section for ATS compatibility and provide detailed feedback:

    Original Heading: {heading}
    Content: {content}

    Evaluate based on these criteria (provide scores for each):
    1. Keyword Optimization (0-20 points)
       - Industry-specific keywords
       - Job title relevance
       - Technical skills alignment
    2. Content Structure (0-20 points)
       - Clear organization
       - Proper formatting
       - Logical flow
    3. Achievement Quantification (0-20 points)
       - Use of metrics and numbers
       - Impact statements
       - Results-oriented language
    4. Action Verb Usage (0-20 points)
       - Strong action verbs
       - Present/past tense consistency
       - Active voice
    5. Relevance & Impact (0-20 points)
       - Job description alignment
       - Career progression
       - Value proposition

    Provide:
    1. Overall ATS Score (sum of all criteria)
    2. Detailed breakdown of scores for each criterion
    3. Improved heading suggestion (if needed)
    4. Specific recommendations for improvement

    Format response as (dont add any special character in the response just add bullets if required):
    ATS Score: [XX/100]
    Score Breakdown:
    - Keyword Optimization: [X/20]
    - Content Structure: [X/20]
    - Achievement Quantification: [X/20]
    - Action Verb Usage: [X/20]
    - Relevance & Impact: [X/20]
    Suggested Heading: [Improved heading]
    Recommendations:
    - [Recommendation 1]
    - [Recommendation 2]
    - [Recommendation 3]
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

    try:
        # Extract overall ATS score
        ats_score_match = re.search(r"ATS Score:\s*(\d+)", response)
        ats_score = int(ats_score_match.group(1)) if ats_score_match else 0

        # Extract score breakdown
        score_breakdown = {}
        for criterion in ["Keyword Optimization", "Content Structure", "Achievement Quantification", 
                         "Action Verb Usage", "Relevance & Impact"]:
            score_match = re.search(rf"{criterion}:\s*(\d+)/20", response)
            score_breakdown[criterion] = int(score_match.group(1)) if score_match else 0

        # Extract suggested heading
        suggested_heading_match = re.search(r"Suggested Heading:\s*(.+)", response)
        suggested_heading = suggested_heading_match.group(1) if suggested_heading_match else original_heading

        # Extract recommendations
        recommendations = re.findall(r"-\s*(.+?)(?=\n-|\n$)", response, re.DOTALL)
        if not isinstance(recommendations, list):
            recommendations = []

    except (AttributeError, ValueError) as e:
        print(f"Error parsing response: {e}")
        suggested_heading = original_heading
        ats_score = 0
        score_breakdown = {criterion: 0 for criterion in ["Keyword Optimization", "Content Structure", 
                                                        "Achievement Quantification", "Action Verb Usage", 
                                                        "Relevance & Impact"]}
        recommendations = ["Failed to parse suggestions"]

    return {
        "original_heading": original_heading,
        "suggested_heading": suggested_heading,
        "ats_score": ats_score,
        "score_breakdown": score_breakdown,
        "recommendations": recommendations,
        "section_preview": section_text[:100]
    }
