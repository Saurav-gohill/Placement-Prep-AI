<p align="center">
  <img src="https://img.shields.io/badge/PlacementAI-Precision_Engineered_for_Careers-6C63FF?style=for-the-badge&labelColor=0b1326" alt="PlacementAI Banner" />
</p>

<h1 align="center">🚀 PlacementAI — AI-Powered Placement Preparation Platform</h1>

<p align="center">
  <em>Master every interview. Perfect your code. Land your dream role.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-0.104-009688?style=flat-square&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-Auth_&_DB-3FCF8E?style=flat-square&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini_AI-Powered-4285F4?style=flat-square&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-api-endpoints">API Endpoints</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 📖 About

**PlacementAI** is a full-stack, AI-powered career preparation platform designed to help students and job seekers crack placements at top-tier tech companies. It combines **Google's Gemini AI** for intelligent analysis with a modern **glassmorphic dark-mode UI** featuring 3D CSS animations.

Built with a **React + Vite** frontend and **FastAPI** backend, the platform offers five core AI modules — Resume Analysis, Mock Interviews, Coding Practice, Aptitude Tests, and Performance Analytics — all backed by **Supabase** for authentication and real-time database.

---

## ✨ Features

### 🎯 Core AI Modules

| Module | Description | AI-Powered |
|--------|-------------|:----------:|
| **📄 Resume Analyzer** | Upload PDF resumes for ATS scoring, keyword extraction, and AI-driven improvement suggestions | ✅ Gemini AI |
| **🎙️ Mock Interview** | Dynamic AI-generated interview questions with real-time answer evaluation and feedback | ✅ Gemini AI |
| **💻 Coding Practice** | Multi-language code sandbox with Monaco Editor, AI-powered hints and solution analysis | ✅ Gemini AI |
| **🧠 Aptitude Tests** | Quantitative and logical reasoning practice with AI-generated questions and explanations | ✅ Gemini AI |
| **📊 Performance Analytics** | Comprehensive dashboard tracking progress across all modules with visual charts | ✅ |

### 🎨 Design & UX

- **Dark Glassmorphism UI** — Premium dark theme with backdrop blur, glass edges, and gradient accents
- **3D CSS Animation System** — Floating geometric shapes, glow orbs, particle fields, and perspective-aware hover effects
- **Entrance Animations** — Staggered fade-in, slide-in, and scale animations for page transitions
- **Fully Responsive** — Desktop sidebar + mobile bottom navigation with hamburger menu
- **Accessibility** — All animations respect `prefers-reduced-motion` media query

### 🔐 Authentication & User Management

- **Supabase Auth** — Secure email/password signup and login with session persistence
- **Protected Routes** — Dashboard and AI modules require authentication
- **Profile Management** — Edit personal info, academic details, social links, and change password
- **JWT Token Verification** — Backend validates tokens via Supabase Auth API

### 📄 Public Pages

- **Landing Page** — Hero section with animated CTA, feature bento grid, and social proof
- **Success Stories** — 6 student testimonials with stats (ATS scores, mock counts, offers)
- **Pricing** — 3-tier pricing plans (Free, Pro, Campus Elite) with FAQ accordion
- **Resources** — 9 curated guides, templates, roadmaps with category filtering
- **Payment** — Checkout form with card formatting and processing simulation

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework with hooks and functional components |
| **Vite 8** | Lightning-fast build tool and dev server |
| **Tailwind CSS 4** | Utility-first styling with custom design tokens |
| **React Router 7** | Client-side routing with protected routes |
| **Recharts** | Data visualization for analytics dashboard |
| **Monaco Editor** | VS Code-grade code editor for coding practice |
| **Supabase JS** | Client-side auth and database operations |
| **Axios** | HTTP client for backend API calls |

### Backend
| Technology | Purpose |
|-----------|---------|
| **FastAPI** | High-performance Python API framework |
| **Uvicorn** | ASGI server for production deployment |
| **Google Generative AI** | Gemini model for AI-powered analysis |
| **Supabase Python** | Server-side database operations |
| **PDFPlumber** | PDF text extraction for resume parsing |
| **Pydantic** | Data validation and serialization |

### Infrastructure
| Service | Purpose |
|---------|---------|
| **Supabase** | PostgreSQL database + Auth + Row Level Security |
| **Google Gemini API** | AI/ML backbone for all intelligent features |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                     │
│  ┌─────────────────────────────────────────────────────┐ │
│  │          React 19 + Vite 8 + Tailwind CSS 4         │ │
│  │  ┌──────────┬──────────┬──────────┬──────────────┐  │ │
│  │  │ Landing  │Dashboard │ AI Tools │   Profile     │  │ │
│  │  │ Pages    │          │ (5 Mods) │   Payment     │  │ │
│  │  └──────────┴──────────┴──────────┴──────────────┘  │ │
│  │              │                    │                  │ │
│  │     Supabase Auth SDK      Axios HTTP Client        │ │
│  └──────────┬──────────────────────┬───────────────────┘ │
└─────────────┼──────────────────────┼─────────────────────┘
              │                      │
              ▼                      ▼
┌──────────────────┐   ┌──────────────────────────────────┐
│                  │   │         FastAPI Backend           │
│    Supabase      │   │  ┌────────────────────────────┐  │
│  ┌────────────┐  │   │  │     API Routes             │  │
│  │    Auth     │  │   │  │  /resume  /interview       │  │
│  │  (JWT+SSO)  │  │   │  │  /coding  /aptitude        │  │
│  ├────────────┤  │   │  │  /analytics /auth           │  │
│  │  PostgreSQL │  │◄─┼──│  └────────────────────────┘  │  │
│  │  Database   │  │   │  │           │                 │  │
│  │  (Tables)   │  │   │  │    Gemini AI Service        │  │
│  └────────────┘  │   │  │    PDFPlumber Parser         │  │
└──────────────────┘   │  └────────────────────────────┘  │
                       └──────────────────────────────────┘
                                     │
                                     ▼
                        ┌──────────────────────┐
                        │   Google Gemini API   │
                        │   (gemini-pro model)  │
                        └──────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **Python** ≥ 3.10
- **Supabase Account** — [supabase.com](https://supabase.com)
- **Google AI API Key** — [aistudio.google.com](https://aistudio.google.com/apikey)

### 1. Clone the Repository

```bash
git clone https://github.com/Saurav-gohill/Placement-Prep-AI.git
cd Placement-Prep-AI
```

### 2. Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env  # Then edit with your keys
```

**Backend `.env` configuration:**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
SARVAM_API_KEY=your_sarvam_api_key  # Optional: for voice features
```

**Start the backend:**
```bash
uvicorn main:app --reload
# Server runs at http://localhost:8000
```

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
```

**Frontend `.env` configuration:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_URL=http://localhost:8000
```

**Start the dev server:**
```bash
npm run dev
# App runs at http://localhost:5173
```

### 4. Supabase Database Setup

Create the following tables in your Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resume analyses
CREATE TABLE public.resume_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  file_name TEXT,
  score NUMERIC,
  feedback JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Interview sessions
CREATE TABLE public.interview_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  role TEXT,
  difficulty TEXT,
  score NUMERIC,
  feedback JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coding submissions
CREATE TABLE public.coding_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  problem_title TEXT,
  language TEXT,
  code TEXT,
  result JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 📁 Project Structure

```
PlacementPrep/
├── backend/
│   ├── main.py                    # FastAPI app entry point
│   ├── database.py                # Supabase client initialization
│   ├── dependencies.py            # Auth middleware (JWT verification)
│   ├── models.py                  # Pydantic models
│   ├── requirements.txt           # Python dependencies
│   ├── routes/
│   │   ├── auth.py                # Authentication endpoints
│   │   ├── resume.py              # Resume analysis endpoints
│   │   ├── interview.py           # Mock interview endpoints
│   │   ├── coding.py              # Code evaluation endpoints
│   │   ├── aptitude.py            # Aptitude test endpoints
│   │   └── analytics.py           # Performance analytics endpoints
│   └── services/
│       ├── gemini_service.py      # Google Gemini AI integration
│       └── sarvam_service.py      # Sarvam voice API integration
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx               # App bootstrap + CSS imports
│   │   ├── App.jsx                # Route definitions
│   │   ├── index.css              # Global styles + Tailwind
│   │   ├── App.css                # Component-level styles
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state management
│   │   ├── lib/
│   │   │   └── supabaseClient.js  # Supabase client config
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx # Route guard component
│   │   │   ├── layout/
│   │   │   │   ├── TopNavBar.jsx  # Public page navigation
│   │   │   │   ├── SideNavBar.jsx # Dashboard sidebar + mobile nav
│   │   │   │   └── Footer.jsx    # Site footer
│   │   │   └── animations/
│   │   │       ├── Animations3D.jsx   # Reusable 3D animation components
│   │   │       └── animations3d.css   # CSS keyframes & animation system
│   │   └── pages/
│   │       ├── LandingPage.jsx        # Public homepage
│   │       ├── LoginPage.jsx          # Sign in
│   │       ├── SignupPage.jsx         # Create account
│   │       ├── SuccessStoriesPage.jsx # Student testimonials
│   │       ├── PricingPage.jsx        # Pricing tiers
│   │       ├── ResourcesPage.jsx      # Guides & templates
│   │       ├── Dashboard.jsx          # Main dashboard
│   │       ├── ResumeAnalyzerPage.jsx # AI resume analysis
│   │       ├── InterviewPage.jsx      # AI mock interviews
│   │       ├── CodingPracticePage.jsx # Code sandbox
│   │       ├── AptitudePracticePage.jsx # Aptitude tests
│   │       ├── AnalyticsPage.jsx      # Performance charts
│   │       ├── ProfilePage.jsx        # User profile & settings
│   │       └── PaymentPage.jsx        # Checkout page
│   ├── package.json
│   └── vite.config.js
│
├── stitch/                        # Google Stitch design assets
├── docs/                          # Documentation
└── README.md
```

---

## 🔌 API Endpoints

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server health check |

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/verify` | Verify JWT token |

### Resume Analyzer
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/resume/analyze` | Upload & analyze resume PDF |
| `GET` | `/api/resume/history` | Get past analyses |

### Mock Interview
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/interview/start` | Start interview session |
| `POST` | `/api/interview/answer` | Submit answer for evaluation |

### Coding Practice
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/coding/evaluate` | Submit code for AI evaluation |
| `POST` | `/api/coding/hint` | Get AI-powered hints |

### Aptitude
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/aptitude/generate` | Generate aptitude questions |
| `POST` | `/api/aptitude/evaluate` | Evaluate aptitude answers |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/analytics/dashboard` | Get performance dashboard data |

> All protected endpoints require `Authorization: Bearer <token>` header.

---

## 🎨 Design System

The UI follows a custom **dark glassmorphism** design system:

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#070b14` | Page background |
| `--surface` | `#0b1326` | Card backgrounds |
| `--primary` | `#c3c0ff` | Accent text & highlights |
| `--primary-container` | `#4f46e5` | Buttons & gradients |
| `--secondary-container` | `#571bc1` | Gradient endpoints |
| Font: Headline | `Outfit` | Headings & buttons |
| Font: Body | `Inter` | Body text |
| Glass Effect | `backdrop-blur + border` | Card edges |

### Animation Components

| Component | Effect |
|-----------|--------|
| `<FloatingShapes>` | CSS 3D wireframe cubes, rings, pyramids floating in background |
| `<GlowOrbs>` | Large blurred gradient blobs that drift slowly |
| `<ParticleField>` | Tiny luminous floating dust particles |
| `<TiltCard>` | Mouse-tracked 3D perspective tilt on hover |

---

## 🖼️ Screenshots

> _Add screenshots of your deployed application here._

| Page | Description |
|------|-------------|
| Landing Page | Hero section with 3D animations and feature grid |
| Dashboard | Statistics overview with progress cards |
| Resume Analyzer | PDF upload with AI-powered ATS scoring |
| Mock Interview | Real-time AI question-answer interface |
| Coding Practice | Monaco Editor with multi-language support |
| Analytics | Recharts-powered performance visualizations |

---

## 🗺️ Roadmap

- [x] Core AI modules (Resume, Interview, Coding, Aptitude)
- [x] Supabase authentication & protected routes
- [x] Performance analytics dashboard with charts
- [x] 3D CSS animation system
- [x] Profile management with password change
- [x] Public pages (Success Stories, Pricing, Resources)
- [x] Payment page with checkout flow
- [ ] Real-time voice interviews (Sarvam API integration)
- [ ] Supabase Storage for resume file uploads
- [ ] Row-Level Security (RLS) policies for production
- [ ] Auto-create user record via Postgres trigger on signup
- [ ] Email notifications for interview reminders
- [ ] Dark/Light theme toggle
- [ ] PWA support for mobile

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing glassmorphism design system
- Use the animation components from `Animations3D.jsx` for consistency
- All new routes must be added to `App.jsx`
- Backend routes should include try/except for graceful error handling
- Protected pages should use the `<ProtectedRoute>` wrapper

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Saurav Gohill**

- GitHub: [@Saurav-gohill](https://github.com/Saurav-gohill)

---

<p align="center">
  <img src="https://img.shields.io/badge/Built_with-❤️_and_AI-6C63FF?style=for-the-badge&labelColor=0b1326" />
</p>

<p align="center">
  <em>If this project helped you, consider giving it a ⭐</em>
</p>
