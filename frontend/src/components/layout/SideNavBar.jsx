import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';

export default function SideNavBar() {
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { name: 'Resume Analyzer', path: '/resume', icon: 'description' },
    { name: 'Mock Interview', path: '/interview', icon: 'settings_voice' },
    { name: 'Coding Practice', path: '/coding', icon: 'code' },
    { name: 'Aptitude', path: '/aptitude', icon: 'psychology' },
    { name: 'Analytics', path: '/analytics', icon: 'leaderboard' },
    { name: 'Profile', path: '/profile', icon: 'person' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[#131b2e] flex flex-col border-r border-[#464555]/15 z-40 hidden md:flex">
        <div className="text-xl font-black text-white px-6 py-8 font-headline tracking-tighter">
          PlacementAI
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => clsx(
                "py-3 px-6 flex items-center gap-3 font-manrope text-sm font-medium transition-all duration-200",
                isActive 
                  ? "border-l-2 border-[#4f46e5] text-[#c3c0ff] bg-gradient-to-r from-[#4f46e5]/10 to-transparent translate-x-1" 
                  : "text-slate-400 hover:text-white hover:bg-[#222a3d]"
              )}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="px-6 py-4 mt-auto space-y-1">
            <div className="bg-gradient-to-br from-secondary-container to-primary-container p-4 rounded-xl mb-6 shadow-lg shadow-primary-container/20 glass-edge">
                <p className="text-xs font-bold text-white mb-2 uppercase tracking-widest">Upgrade to Pro</p>
                <p className="text-[10px] text-white/80 mb-3 leading-relaxed">Unlock advanced AI analysis and unlimited coding mock tests.</p>
                <Link to="/payment" className="block w-full bg-white text-[#1d00a5] py-2 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors text-center">Claim Offer</Link>
            </div>
            <button onClick={handleLogout} className="w-full text-left text-slate-500 py-2 flex items-center gap-3 text-xs font-medium hover:text-red-400 transition-colors">
                <span className="material-symbols-outlined text-sm">logout</span>
                Sign Out
            </button>
        </div>
      </aside>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0b1326]/80 backdrop-blur-lg border-t border-outline-variant/15 flex justify-around py-3 px-2 z-50">
        <NavLink to="/dashboard" className={({isActive}) => clsx("flex flex-col items-center gap-1", isActive ? "text-[#c3c0ff]" : "text-slate-500")}>
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[8px] font-bold">Home</span>
        </NavLink>
        <NavLink to="/resume" className={({isActive}) => clsx("flex flex-col items-center gap-1", isActive ? "text-[#c3c0ff]" : "text-slate-500")}>
          <span className="material-symbols-outlined">description</span>
          <span className="text-[8px] font-bold">Resume</span>
        </NavLink>
        <NavLink to="/coding" className={({isActive}) => clsx("flex flex-col items-center gap-1", isActive ? "text-[#c3c0ff]" : "text-slate-500")}>
          <span className="material-symbols-outlined">code</span>
          <span className="text-[8px] font-bold">Code</span>
        </NavLink>
        <NavLink to="/interview" className={({isActive}) => clsx("flex flex-col items-center gap-1", isActive ? "text-[#c3c0ff]" : "text-slate-500")}>
          <span className="material-symbols-outlined">settings_voice</span>
          <span className="text-[8px] font-bold">Interview</span>
        </NavLink>
        <NavLink to="/profile" className={({isActive}) => clsx("flex flex-col items-center gap-1", isActive ? "text-[#c3c0ff]" : "text-slate-500")}>
          <span className="material-symbols-outlined">person</span>
          <span className="text-[8px] font-bold">Profile</span>
        </NavLink>
      </nav>
    </>
  );
}
