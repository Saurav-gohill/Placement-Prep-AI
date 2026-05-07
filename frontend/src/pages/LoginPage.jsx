import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { FloatingShapes, ParticleField } from '../components/animations/Animations3D';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
  };

  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin + '/dashboard' }
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden geometric-overlay">
      <FloatingShapes variant="minimal" />
      <ParticleField count={20} />
      <div className="w-full max-w-md bg-surface-container-low p-8 rounded-2xl glass-edge shadow-2xl relative z-10 anim-fade-in-scale">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5] to-[#571bc1] font-headline">PlacementAI</Link>
          <h2 className="text-2xl font-headline font-bold text-white mt-6 mb-2">Welcome Back</h2>
          <p className="text-sm text-slate-400">Sign in to your account</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">{error}</div>}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-[#0b1326] border border-[#464555] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-[#0b1326] border border-[#464555] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#4f46e5] to-[#571bc1] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#464555]/50"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface-container-low px-2 text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button onClick={() => handleOAuthLogin('google')} className="bg-[#0b1326] border border-[#464555] p-3 rounded-xl hover:bg-[#131b2e] transition-colors flex justify-center">
              Google
            </button>
            <button onClick={() => handleOAuthLogin('github')} className="bg-[#0b1326] border border-[#464555] p-3 rounded-xl hover:bg-[#131b2e] transition-colors flex justify-center">
              GitHub
            </button>
            <button onClick={() => handleOAuthLogin('linkedin_oidc')} className="bg-[#0b1326] border border-[#464555] p-3 rounded-xl hover:bg-[#131b2e] transition-colors flex justify-center">
              LinkedIn
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-slate-400 mt-8">
          Don't have an account? <Link to="/signup" className="text-[#c3c0ff] hover:underline font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
