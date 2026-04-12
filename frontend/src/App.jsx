import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Protected Pages
import Dashboard from './pages/Dashboard';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import InterviewPage from './pages/InterviewPage';
import CodingPracticePage from './pages/CodingPracticePage';
import AptitudePracticePage from './pages/AptitudePracticePage';
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume" element={<ResumeAnalyzerPage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/coding" element={<CodingPracticePage />} />
            <Route path="/aptitude" element={<AptitudePracticePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
