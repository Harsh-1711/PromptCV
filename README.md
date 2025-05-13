# PromptCV – AI-Powered Resume Analyzer 🤖📄

**PromptCV** is an AI-powered resume analysis platform that checks your resume's ATS compatibility, highlights strengths and weaknesses, and offers intelligent, personalized suggestions to help you get noticed by recruiters. Built with a Python backend and a modern React + TypeScript frontend.

---

## ✨ Features

- 📄 Upload and analyze resumes (PDF format)
- 🧠 AI-generated feedback on key sections like Skills, Experience, and Education
- ✅ ATS (Applicant Tracking System) compatibility scoring
- 💡 Smart suggestions to improve your resume's impact
- 📊 Visual breakdowns with charts and progress bars
- 📥 Downloadable analysis report

---

## 🛠️ Tech Stack

- **Frontend:**

  - React + TypeScript
  - Vite for build tooling
  - TailwindCSS for styling
  - shadcn/ui for components
  - Firebase for authentication

- **Backend:**
  - FastAPI
  - Google Gemini AI for analysis
  - pdfplumber for PDF parsing.
  - Python-dotenv for environment management
  - Uvicorn for ASGI server

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Harsh-1711/PromptCV.git
cd PromptCV
```

### 2. Setup Backend

```bash
cd server
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the server directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

---

## 📂 Project Structure

```
PromptCV/
├── client/             # React + TypeScript frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/     # Page components
│   │   ├── context/   # React context providers
│   │   ├── lib/       # Utility functions
│   │   └── types/     # TypeScript type definitions
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies
│
├── server/            # Python backend
│   ├── main.py           # FastAPI application
│   ├── routes/           # API endpoints
│   ├── services/         # Business logic
│   ├── utils/            # Helper functions
│   ├── requirements.txt      # Python dependencies
│   └── .env                 # Environment variables
│
└── README.md
```

---

## ⚙️ API Endpoints

- `POST /api/resume/analyze` → Upload and analyze resume
- Returns ATS scores and suggestions for each section

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

## 🙌 Acknowledgements

- [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.
