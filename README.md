# PromptCV – AI-Powered Resume Analyzer 🤖📄

**PromptCV** is an AI-powered resume analysis platform that checks your resume's ATS compatibility, highlights strengths and weaknesses, and offers intelligent, personalized suggestions to help you get noticed by recruiters. Built with a Python backend and a modern React + TypeScript frontend.

---

## ✨ Features

- 📄 Upload and analyze resumes (PDF/Text)
- 🧠 AI-generated feedback on key sections like Skills, Experience, and Education
- ✅ ATS (Applicant Tracking System) compatibility scoring
- 💡 Smart suggestions to improve your resume's impact
- 📊 Visual breakdowns with charts and progress bars
- 📥 Downloadable analysis report 

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite, TypeScript, TailwindCSS, ShadCN)
- **Backend:** Python (FastAPI or Flask)
- **AI Layer:** Gemini API or Langchain
- **PDF Parsing:** PyMuPDF
- **Authentication:** JWT 
- **Database:** MongoDB

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Harsh-1711/PromptCV.git
cd PromptCV
```

---

### 2. Setup the `.env` File (in `server/`)

```env
# server/.env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8000
```

---

### 3. Install Backend Dependencies

```bash
cd server
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

### 4. Run the Python Backend

```bash
uvicorn main:app --reload  # Or python main.py based on your framework
```

---

### 5. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

---

## 📂 Project Structure

```
PromptCV/
├── client/             # React + TSX frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
├── server/             # Python backend with AI logic
│   ├── main.py
│   ├── resume_parser.py
│   ├── ats_scoring.py
│   ├── suggestions.py
│   ├── utils/
│   └── .env
├── README.md
└── requirements.txt
```

---

## ⚙️ Example API Endpoints

- `POST /upload` → Upload and parse resume
- `POST /analyze` → Run AI scoring and suggestion engine
- `GET /score/:id` → Retrieve score breakdown
- `GET /download/:id` → Download resume report (coming soon)

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

## 🙌 Acknowledgements

- [Gemini API](https://deepmind.google/technologies/gemini/)
- [LangChain](https://www.langchain.com/)
- [PyMuPDF](https://pymupdf.readthedocs.io/)
- [ShadCN UI](https://ui.shadcn.dev/)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.
