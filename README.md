# Placement-Prep-AI

![GitHub stars](https://img.shields.io/github/stars/Saurav-gohill/Placement-Prep-AI.git?style=for-the-badge&logo=github) ![GitHub forks](https://img.shields.io/github/forks/Saurav-gohill/Placement-Prep-AI.git?style=for-the-badge&logo=github) ![GitHub issues](https://img.shields.io/github/issues/Saurav-gohill/Placement-Prep-AI.git?style=for-the-badge&logo=github) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)

## 📑 Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Key Dependencies](#key-dependencies)
- [Run Commands](#run-commands)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Contributing](#contributing)


## 📝 Description

Placement-Prep-AI is a comprehensive web application designed to empower students and job seekers in their career journey. Developed using React for a highly responsive user experience, this platform leverages the power of artificial intelligence to provide a personalized preparation suite tailored for competitive job placements. Users can engage with AI-driven mock interviews, receive instant feedback on their technical and soft skills, and access intelligent insights to bridge the gap between academic learning and professional expectations. By offering an interactive and accessible web-based environment, Placement-Prep-AI serves as a 24/7 career mentor, helping candidates build the confidence and expertise needed to secure their dream roles.

## ✨ Features

- 🕸️ Web


## 🛠️ Tech Stack

- ⚛️ React


## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/Saurav-gohill/Placement-Prep-AI.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📦 Key Dependencies

```
@monaco-editor/react: ^4.7.0
@supabase/supabase-js: ^2.103.0
@tailwindcss/postcss: ^4.2.2
axios: ^1.15.0
clsx: ^2.1.1
lucide-react: ^1.8.0
react: ^19.2.4
react-dom: ^19.2.4
react-router-dom: ^7.14.0
recharts: ^3.8.1
tailwind-merge: ^3.5.0
```

## 🚀 Run Commands

- **dev**: `npm run dev`
- **build**: `npm run build`
- **lint**: `npm run lint`
- **preview**: `npm run preview`


## 📸 Screenshots

> **Tip:** You can auto-generate a beautiful project mockup image using the **Screenshot** button above!

<p align="center">
  <img src="https://via.placeholder.com/800x400?text=Main+Application+View" alt="Main Application View" width="80%"/>
</p>

<p align="center">
  <img src="https://via.placeholder.com/800x400?text=Feature+Showcase" alt="Feature Showcase" width="80%"/>
</p>

## 📁 Project Structure

```
.
├── backend
│   ├── database.py
│   ├── dependencies.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   ├── routes
│   │   ├── __init__.py
│   │   ├── analytics.py
│   │   ├── aptitude.py
│   │   ├── auth.py
│   │   ├── coding.py
│   │   ├── interview.py
│   │   └── resume.py
│   └── services
│       ├── gemini_service.py
│       └── sarvam_service.py
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── components
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── layout
│   │   │       ├── Footer.jsx
│   │   │       ├── SideNavBar.jsx
│   │   │       └── TopNavBar.jsx
│   │   ├── context
│   │   │   └── AuthContext.jsx
│   │   ├── index.css
│   │   ├── lib
│   │   │   ├── api.js
│   │   │   └── supabaseClient.js
│   │   ├── main.jsx
│   │   └── pages
│   │       ├── AnalyticsPage.jsx
│   │       ├── AptitudePage.jsx
│   │       ├── AptitudePracticePage.jsx
│   │       ├── CodingPracticePage.jsx
│   │       ├── Dashboard.jsx
│   │       ├── InterviewPage.jsx
│   │       ├── LandingPage.jsx
│   │       ├── LoginPage.jsx
│   │       ├── ResumeAnalyzerPage.jsx
│   │       └── SignupPage.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
└── stitch
    ├── ai_mock_interview
    │   ├── code.html
    │   └── screen.png
    ├── ai_mock_interview_light
    │   ├── code.html
    │   └── screen.png
    ├── aptitude_practice
    │   ├── code.html
    │   └── screen.png
    ├── aptitude_practice_light
    │   ├── code.html
    │   └── screen.png
    ├── coding_practice
    │   ├── code.html
    │   └── screen.png
    ├── coding_practice_light
    │   ├── code.html
    │   └── screen.png
    ├── dashboard_light
    │   ├── code.html
    │   └── screen.png
    ├── landing_page
    │   ├── code.html
    │   └── screen.png
    ├── landing_page_light
    │   ├── code.html
    │   └── screen.png
    ├── login_signup
    │   ├── code.html
    │   └── screen.png
    ├── login_signup_light
    │   ├── code.html
    │   └── screen.png
    ├── lumina_clarity
    │   └── DESIGN.md
    ├── performance_analytics
    │   ├── code.html
    │   └── screen.png
    ├── performance_analytics_light
    │   ├── code.html
    │   └── screen.png
    ├── resume_analyzer
    │   ├── code.html
    │   └── screen.png
    ├── resume_analyzer_light
    │   ├── code.html
    │   └── screen.png
    ├── signup_dark_mode
    │   ├── code.html
    │   └── screen.png
    ├── signup_light_mode
    │   ├── code.html
    │   └── screen.png
    ├── student_dashboard
    │   ├── code.html
    │   └── screen.png
    └── synthetix_lumina
        └── DESIGN.md
```

## 🛠️ Development Setup

### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)


## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/Saurav-gohill/Placement-Prep-AI.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

Please ensure your code follows the project's style guidelines and includes tests where applicable.

---