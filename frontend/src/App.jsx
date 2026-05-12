import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import PricingPage from './pages/PricingPage';
import ResourcesPage from './pages/ResourcesPage';

// Protected Pages
import Dashboard from './pages/Dashboard';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import InterviewPage from './pages/InterviewPage';
import CodingPracticePage from './pages/CodingPracticePage';
import AptitudePracticePage from './pages/AptitudePracticePage';
import AnalyticsPage from './pages/AnalyticsPage';
import PaymentPage from './pages/PaymentPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/resources" element={<ResourcesPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume" element={<ResumeAnalyzerPage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/coding" element={<CodingPracticePage />} />
            <Route path="/aptitude" element={<AptitudePracticePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
