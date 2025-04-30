# PromptCV Server 🚀

This is the backend server for PromptCV, an AI-powered resume analysis platform. Built with FastAPI, it provides robust API endpoints for resume analysis, ATS compatibility checking, and AI-powered suggestions.

## 🛠️ Tech Stack

- **Framework:** FastAPI
- **AI Integration:** Google Gemini API
- **PDF Processing:** pdfplumber
- **Environment Management:** python-dotenv
- **API Documentation:** FastAPI's built-in Swagger UI
- **ASGI Server:** Uvicorn

## 📁 Project Structure

```
server/
├── app/
│   ├── main.py           # FastAPI application entry point
│   ├── check.py          # Resume checking and analysis logic
│   ├── routes/           # API route definitions
│   ├── services/         # Business logic and service layer
│   └── utils/            # Utility functions and helpers
├── requirements.txt      # Python dependencies
└── .env                 # Environment variables (create this file)
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip (Python package manager)
- Virtual environment (recommended)

### Installation

1. Create and activate a virtual environment:
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Unix or MacOS:
source venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the server directory with the following variables:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8000
```

### Running the Server

```bash
uvicorn app.main:app --reload
```

The server will start at `http://localhost:8000`

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🔑 Key Features

- Resume PDF parsing and text extraction
- ATS compatibility analysis
- AI-powered resume suggestions using Gemini API
- RESTful API endpoints for seamless frontend integration
- Real-time processing and analysis

## 🔄 API Endpoints

- `POST /api/upload` - Upload and process resume
- `POST /api/analyze` - Analyze resume content
- `GET /api/check` - Check ATS compatibility
- `GET /api/suggestions` - Get AI-powered suggestions

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| GEMINI_API_KEY | Google Gemini API key | Yes |
| PORT | Server port number | No (default: 8000) |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 