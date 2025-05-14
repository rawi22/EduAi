# UstazkAI - Bilingual AI Tutoring Platform

UstazkAI is a bilingual, AI-driven tutoring platform designed for Arab students in Israel (grades 1–12). It offers official school materials, interactive lessons, and an AI 'teacher' that simplifies complex topics in Arabic and Hebrew.

## Features

- **Bilingual Support**: Full support for both Arabic and Hebrew languages
- **AI-Powered Tutoring**: Personalized assistance using DeepSeek AI
- **Material Management**: Upload and organize educational materials
- **Progress Tracking**: Monitor student progress and performance
- **Vector Memory**: AI remembers previous interactions for personalized help

## Tech Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- i18next for internationalization
- Zustand for state management

### Backend
- FastAPI (Python)
- Firebase for authentication and database
- Pinecone for vector embeddings
- DeepSeek AI for natural language processing

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- Firebase account
- Pinecone account
- DeepSeek API key

### Environment Setup

1. Clone the repository
2. Set up environment variables in `.env` file:

```
# Supabase Configuration
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_SUPABASE_URL=your-supabase-url

# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket

# Pinecone Configuration
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=your-pinecone-environment
PINECONE_INDEX_NAME=your-pinecone-index-name

# DeepSeek AI Configuration
DEEPSEEK_API_KEY=your-deepseek-api-key
```

### Installation

#### Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

#### Backend

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn main:app --reload --port 3000
```

## Project Structure

```
ustazkai/
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Core functionality
│   │   ├── db/             # Database connections
│   │   ├── models/         # Data models
│   │   └── services/       # Business logic
│   ├── main.py             # FastAPI application
│   └── requirements.txt    # Python dependencies
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── i18n/               # Internationalization
│   ├── store/              # State management
│   ├── App.tsx             # Main application
│   └── main.tsx            # Entry point
├── .env                    # Environment variables
└── package.json            # Node.js dependencies
```

## Usage

1. Register a new account or log in
2. Complete the student profile with grade, subjects, etc.
3. Upload educational materials (worksheets, exams, notes)
4. Ask questions to the AI tutor in Arabic or Hebrew
5. Track progress through the dashboard

## Deployment

### Frontend

```bash
# Build for production
npm run build
```

### Backend

```bash
# Deploy to AWS EC2 with NVIDIA GPUs
# See deployment instructions in the documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- DeepSeek AI for natural language processing
- Firebase for authentication and database
- Pinecone for vector embeddings
- React and FastAPI communities for excellent documentation