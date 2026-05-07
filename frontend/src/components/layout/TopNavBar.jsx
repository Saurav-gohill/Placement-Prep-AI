import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function TopNavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Features', path: '/' },
    { label: 'Success Stories', path: '/success-stories' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Resources', path: '/resources' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#0b1326]/60 backdrop-blur-xl transition-all duration-300">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5] to-[#571bc1] font-headline">
          PlacementAI
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-headline font-semibold tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-all duration-300 ${
                isActive(link.path)
                  ? 'text-[#c3c0ff] border-b-2 border-[#4f46e5] pb-1'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
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

          {/* Mobile Hamburger */}
          <button className="md:hidden text-on-surface" onClick={() => setMobileOpen(!mobileOpen)}>
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0b1326]/95 backdrop-blur-xl border-t border-outline-variant/10 px-8 py-6 space-y-4 anim-fade-in-up">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block font-headline font-semibold py-2 transition-colors ${
                isActive(link.path) ? 'text-primary' : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
