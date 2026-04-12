import React from 'react';
import { Link } from 'react-router-dom';

export default function TopNavBar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-[#0b1326]/60 backdrop-blur-xl transition-all duration-300">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5] to-[#571bc1] font-headline">
          PlacementAI
        </Link>
        <div className="hidden md:flex items-center gap-8 font-headline font-semibold tracking-tight">
          <a className="text-[#c3c0ff] border-b-2 border-[#4f46e5] pb-1 hover:opacity-80 transition-all duration-300" href="#">Features</a>
          <a className="text-slate-400 hover:text-slate-100 hover:opacity-80 transition-all duration-300" href="#">Success Stories</a>
          <a className="text-slate-400 hover:text-slate-100 hover:opacity-80 transition-all duration-300" href="#">Pricing</a>
          <a className="text-slate-400 hover:text-slate-100 hover:opacity-80 transition-all duration-300" href="#">Resources</a>
        </div>
        <div className="flex items-center gap-4 font-headline font-semibold">
          <Link to="/login">
            <button className="hidden md:block text-slate-400 hover:text-slate-100 transition-all duration-300 active:scale-95">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="bg-gradient-to-r from-[#4f46e5] to-[#571bc1] text-white px-6 py-2.5 rounded-xl hover:opacity-80 transition-all duration-300 active:scale-95 shadow-lg shadow-primary-container/20">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
