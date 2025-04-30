# import os
# from dotenv import load_dotenv
# import PyPDF2

# from langchain.prompts import PromptTemplate
# from langchain_google_genai import ChatGoogleGenerativeAI

# load_dotenv()
# api_key = os.getenv("GEMINI_API_KEY")

# llm = ChatGoogleGenerativeAI(
#     model="models/gemini-1.5-flash-001",
#     google_api_key=api_key
# )

# def extract_text_from_pdf(pdf_path):
#     with open(pdf_path, "rb") as file:
#         reader = PyPDF2.PdfReader(file)
#         text = ""
#         for page in reader.pages:
#             text += page.extract_text()
#         return text

# template = """
# You are an Applicant Tracking System (ATS) expert.

# Given the following resume text:
# "{resume_text}"

# 1. Evaluate the resume and provide an **ATS compatibility score (0-100)**.
# 2. Suggest **3-5 specific improvements** to increase the ATS score.
# 3. If applicable, point out missing keywords or formatting issues.

# Return the output clearly labeled.
# """

# prompt = PromptTemplate(
#     input_variables=["resume_text"],
#     template=template
# )

# runnable = prompt | llm

# pdf_path = "E:/Desktop/Harsh CV.pdf"
# resume_text = extract_text_from_pdf(pdf_path)

# if resume_text:
#     result = runnable.invoke({"resume_text": resume_text})
#     print("\n📊 ATS Evaluation:\n")
#     print(result.content)
# else:
#     print("❌ Failed to extract text from PDF.")



