# LegalEase – AI-Powered Legal Document Assistant ⚖️

**LegalEase** is a powerful AI-driven web app that helps users understand, analyze, and create legal documents. Powered by Gemini or Langchain, it enables users to summarize legal terms, generate contracts, and detect risky clauses – all in plain English.

---

## 🔍 Features

- 📄 Upload & summarize legal documents (PDF/Text)
- 🧠 Plain-English legal Q&A powered by LLMs
- 📝 Smart contract generation for NDAs, Freelance Agreements, and more
- ⚠️ Clause risk detection with suggestions
- 🗂 Save and revisit uploaded documents (coming soon)
- 📥 Download generated documents

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite)
- **Backend:** Node.js, Express.js
- **AI Layer:** Langchain, Gemini API
- **Database:** MongoDB
- **Hosting:** Coming soon...

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/Harsh-1711/LegalEase.git
cd LegalEase
```

### Install server dependencies

```bash
cd server
npm install
```

### Install client dependencies

```bash
cd ../client
npm install
```

### Run the app

```bash
# In the server folder
npm start

# In the client folder (in a new terminal)
npm run dev
```

---

## 📂 Project Structure

```
LegalEase/
├── ai-service       # LLM using Gemini
├── client/          # Frontend React App
├── server/          # Backend with Express + AI logic
├── LICENSE
└── README.md
```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss the proposed changes.

---

## 🙌 Acknowledgements

- [Langchain](https://www.langchain.com/)
- [Gemini AI](https://deepmind.google/technologies/gemini/)
- [PDF Parse] (https://www.npmjs.com/package/pdf-parse)
