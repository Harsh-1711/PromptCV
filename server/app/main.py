# from fastapi import FastAPI, Request, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import os
# from dotenv import load_dotenv
# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_core.prompts import ChatPromptTemplate
# from langchain_core.runnables import RunnableSequence

# load_dotenv()
# api_key = os.getenv("GEMINI_API_KEY")

# if not api_key:
#     raise ValueError("GEMINI_API_KEY not found in environment variables.")

# llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=api_key)

# app = FastAPI()

# # CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # For dev; change to specific domains in prod
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.post("/generate")
# async def generate_prompt(request: Request):
#     data = await request.json()
#     prompt_input = data.get("prompt", "").strip()

#     if not prompt_input:
#         raise HTTPException(status_code=400, detail="Prompt is required.")

#     try:
#         prompt = ChatPromptTemplate.from_template("You are an expert. Answer the following:\n\n{question}")
#         chain: RunnableSequence = prompt | llm

#         result = chain.invoke({"question": prompt_input})
#         return {"response": result.content}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.resume import router as resume_router

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router, prefix="/api/resume")

