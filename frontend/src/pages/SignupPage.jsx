import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { FloatingShapes, ParticleField } from '../components/animations/Animations3D';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });
    
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden geometric-overlay">
      <FloatingShapes variant="minimal" />
      <ParticleField count={20} />
      <div className="w-full max-w-md bg-surface-container-low p-8 rounded-2xl glass-edge shadow-2xl relative z-10 anim-fade-in-scale">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5] to-[#571bc1] font-headline">PlacementAI</Link>
          <h2 className="text-2xl font-headline font-bold text-white mt-6 mb-2">Create an Account</h2>
          <p className="text-sm text-slate-400">Start your journey today</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">{error}</div>}
        {success && <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-500 p-3 rounded-lg text-sm mb-6 text-center">Registration successful! Check your email to confirm.</div>}

        {!success && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-[#0b1326] border border-[#464555] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
                placeholder="Alex Chen"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
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
              className="w-full bg-gradient-to-r from-[#4f46e5] to-[#571bc1] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-slate-400 mt-8">
          Already have an account? <Link to="/login" className="text-[#c3c0ff] hover:underline font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
