import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-[#464555]/15 bg-[#0b1326] mt-auto">
      <div className="flex flex-col items-center gap-8 w-full px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between w-full items-center gap-8">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5] to-[#571bc1] font-headline">
            PlacementAI
          </Link>
          <div className="flex flex-wrap justify-center gap-8">
            <Link className="text-slate-500 hover:text-slate-300 transition-colors font-body text-sm" to="/success-stories">Success Stories</Link>
            <Link className="text-slate-500 hover:text-slate-300 transition-colors font-body text-sm" to="/pricing">Pricing</Link>
            <Link className="text-slate-500 hover:text-slate-300 transition-colors font-body text-sm" to="/resources">Resources</Link>
          </div>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container transition-all" href="#">
              <span className="material-symbols-outlined text-sm">public</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container transition-all" href="#">
              <span className="material-symbols-outlined text-sm">alternate_email</span>
            </a>
          </div>
        </div>
        <div className="text-slate-500 font-inter text-xs tracking-wide">
          © 2026 PlacementAI. Precision Engineered for Careers.
        </div>
      </div>
    </footer>
  );
}
