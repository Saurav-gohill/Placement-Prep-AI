import React from 'react';
import SideNavBar from '../components/layout/SideNavBar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  
  return (
    <div className="flex bg-surface min-h-screen text-on-surface">
      <SideNavBar />
      
      <main className="md:ml-64 flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar relative">
        <header className="sticky top-0 z-30 bg-[#0b1326]/60 backdrop-blur-xl flex justify-between items-center w-full px-8 py-4">
          <div className="flex items-center gap-4">
            <h1 className="font-headline font-bold text-xl tracking-tight text-on-surface">Dashboard Overview</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/15">
              <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder:text-slate-500 w-48 outline-none ml-2" placeholder="Search insights..." type="text"/>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-white">{user?.user_metadata?.full_name || 'Student'}</p>
                    <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Premium Member</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-primary-container flex items-center justify-center bg-surface-container-highest text-primary font-bold">
                    {user?.user_metadata?.full_name?.charAt(0) || 'S'}
                </div>
            </div>
          </div>
        </header>

        <section className="p-8 max-w-7xl mx-auto space-y-8 w-full flex-grow">
          {/* Hero Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 relative overflow-hidden bg-surface-container-low rounded-xl p-8 glass-edge">
                  <div className="relative z-10">
                      <span className="bg-primary-container/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Predictive Insight</span>
                      <h2 className="font-headline text-3xl font-bold mt-4 mb-2 max-w-md">You're in the top 5% of candidates for FAANG roles.</h2>
                      <p className="text-on-surface-variant text-sm mb-6 max-w-sm">Based on your recent Coding Practice and Mock Interview performance. Keep up the momentum.</p>
                      <button className="bg-gradient-to-r from-primary-container to-secondary-container px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg shadow-primary-container/20 hover:scale-[1.02] transition-transform">View Career Roadmap</button>
                  </div>
                  <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-primary-container/10 blur-[80px] rounded-full"></div>
                  <div className="absolute right-8 top-8 opacity-20 pointer-events-none">
                      <span className="material-symbols-outlined text-[120px]">auto_awesome</span>
                  </div>
              </div>
              <div className="bg-surface-container-high rounded-xl p-6 flex flex-col justify-between glass-edge">
                  <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">ATS Resume Score</p>
                      <div className="flex items-end gap-2">
                          <span className="text-5xl font-headline font-extrabold text-white">84</span>
                          <span className="text-slate-500 mb-2">/100</span>
                      </div>
                  </div>
                  <div className="mt-6">
                      <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full w-[84%] bg-tertiary glow-track"></div>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-3 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px] text-emerald-400">trending_up</span>
                          +12 pts improvement from last week
                      </p>
                  </div>
              </div>
          </div>

          {/* Performance Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-surface-container-low p-5 rounded-xl glass-edge hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-emerald-400">code</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">Coding Practice</h3>
                  <p className="text-[10px] text-slate-500 mb-4">Advanced Algorithms</p>
                  <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">142 Solved</span>
                  </div>
              </div>
              <div className="bg-surface-container-low p-5 rounded-xl glass-edge hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#571bc1]/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#c4abff]">settings_voice</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Feedback</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">Mock Interview</h3>
                  <p className="text-[10px] text-slate-500 mb-4">Behavioral & Technical</p>
                  <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">4.2/5.0</span>
                  </div>
              </div>
              <div className="bg-surface-container-low p-5 rounded-xl glass-edge hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-orange-400">psychology</span>
                      </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">Aptitude Results</h3>
                  <p className="text-[10px] text-slate-500 mb-4">Logical Reasoning</p>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                      92% <span className="text-[10px] font-normal text-slate-500">Percentile</span>
                  </div>
              </div>
              <div className="bg-surface-container-low p-5 rounded-xl glass-edge hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-sky-400">timer</span>
                      </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">Weekly Prep</h3>
                  <p className="text-[10px] text-slate-500 mb-4">Study streak: 8 days</p>
                  <div className="text-xs font-bold text-white">24.5h <span className="text-[10px] font-normal text-slate-500">This week</span></div>
              </div>
          </div>
        </section>

        <Footer />
        <div className="h-16 md:h-0"></div> {/* Spacer for Mobile Nav */}
      </main>
    </div>
  );
}
