# AI Interview Simulator (Neural Recruiter)

A complete, modern, professional, AI-powered “Interview Simulator” web application built with a premium, futuristic, and highly animated UI.

## 🚀 Features

- **Futuristic UI/UX**: Built with Next.js, Tailwind CSS, Framer Motion, and Glassmorphism design principles.
- **AI Interviewer**: Powered by OpenAI, it asks intelligent, adaptive questions and provides real-time feedback.
- **Voice & Video Support**: Simulate real interviews with webcams and speech-to-text features.
- **Comprehensive Analytics**: Dashboard with Recharts to track your progress, scores, and skills over time.
- **Role-based Simulation**: Tailored questions for Software Engineers, AI/ML Engineers, Data Scientists, and more.

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Language**: TypeScript

### Backend
- **Framework**: Node.js & Express.js
- **Database**: MongoDB (Mongoose)
- **AI Integration**: OpenAI API
- **Auth**: Firebase Admin, JWT
- **Language**: TypeScript

## 📂 Project Structure

```text
Neural-Recruiter/
├── frontend/             # Next.js Application
│   ├── src/app/          # App Router pages (Dashboard, Interview, Analytics)
│   ├── src/components/   # Reusable UI components
│   └── package.json
└── backend/              # Node.js + Express Backend
    ├── src/config/       # DB configuration
    ├── src/controllers/  # Route logic
    ├── src/models/       # Mongoose Schemas (User, Interview)
    ├── src/routes/       # Express Routes
    ├── src/services/     # External services (OpenAI)
    └── package.json
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)
- OpenAI API Key

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in `backend/` and add:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ai-interview-simulator
   OPENAI_API_KEY=your_openai_api_key
   ```
4. Start the backend: `npm run dev`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the frontend: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌟 Future Enhancements
- Resume Parser (PDF/DOCX extraction)
- Live 3D Avatar Interviewer
- Emotional Analysis via Webcam
- Peer-to-Peer Mock Interviews