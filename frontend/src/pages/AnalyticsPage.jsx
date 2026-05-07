import React, { useState, useEffect } from 'react';
import SideNavBar from '../components/layout/SideNavBar';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../lib/api';
import { FloatingShapes, GlowOrbs } from '../components/animations/Animations3D';

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     loadMetrics();
  }, []);

  const loadMetrics = async () => {
     try {
         const data = await fetchApi('/analytics/dashboard');
         setMetrics(data);
     } catch (err) {
         console.error("Failed to fetch analytics", err);
     } finally {
         setLoading(false);
     }
  };
  
  return (
    <div className="flex bg-background min-h-screen text-on-surface">
      <SideNavBar />

      <main className="md:ml-64 flex-1 flex flex-col min-h-screen overflow-y-auto no-scrollbar relative">
        <FloatingShapes variant="ambient" />
        <GlowOrbs count={2} />
        {/* Header Section */}
        <header className="px-6 md:px-8 pt-12 pb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6 relative z-10 anim-fade-in-up anim-delay-1">
            <div>
                <h1 className="font-headline text-5xl font-bold tracking-tight text-on-surface mb-2">Performance <span className="text-primary">Analytics</span></h1>
                <p className="text-on-surface-variant font-body text-lg">AI-powered insights across your career preparation journey.</p>
            </div>
            <div className="flex items-center gap-4">
                <button className="px-6 py-3 rounded-full bg-surface-container-high font-headline text-sm font-bold text-on-surface glass-edge flex items-center gap-2 hover:bg-surface-bright transition-colors border border-outline-variant/10">
                    <span className="material-symbols-outlined text-lg">file_download</span>
                    Export Report
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/30 hidden sm:flex">
                    <div className="text-right">
                        <p className="text-sm font-headline font-bold text-white">{user?.user_metadata?.full_name || 'Student'}</p>
                        <p className="text-xs text-slate-400">Student Profile</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-primary/20 bg-surface-container-highest flex items-center justify-center font-bold text-primary">
                        {user?.user_metadata?.full_name?.charAt(0) || 'S'}
                    </div>
                </div>
            </div>
        </header>

        {/* Analytics Grid */}
        <div className="px-6 md:px-8 pb-20 grid grid-cols-12 gap-6">
            
            {/* Hero Metric: Coding Performance */}
            <section className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl p-8 glass-edge relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 blur-[100px] -mr-32 -mt-32"></div>
                <div className="flex justify-between items-start mb-12 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-primary">code</span>
                            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Mastery Level</span>
                        </div>
                        <h2 className="font-headline text-3xl font-semibold text-white">Coding Proficiency</h2>
                    </div>
                    <div className="text-right">
                        <span className="text-5xl font-headline font-extrabold text-white">2,480</span>
                        <p className="text-xs text-tertiary font-bold">+12% from last week</p>
                    </div>
                </div>
                
                {/* Visualization Area */}
                <div className="h-64 flex items-end gap-2 mb-8 relative z-10">
                    {/* Custom Bar Chart Simulation */}
                    <div className="flex-1 bg-surface-container-highest rounded-t-lg h-[40%] hover:h-[45%] transition-all duration-300 relative group">
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
                    </div>
                    <div className="flex-1 bg-surface-container-highest rounded-t-lg h-[60%] hover:h-[65%] transition-all duration-300 relative group"></div>
                    <div className="flex-1 bg-gradient-to-t from-primary-container to-secondary-container rounded-t-lg h-[85%] relative group shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-bright px-2 py-1 rounded text-[10px] font-bold text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">TODAY</div>
                    </div>
                    <div className="flex-1 bg-surface-container-highest rounded-t-lg h-[55%] hover:h-[60%] transition-all duration-300 relative group"></div>
                    <div className="flex-1 bg-surface-container-highest rounded-t-lg h-[70%] hover:h-[75%] transition-all duration-300 relative group"></div>
                    <div className="flex-1 bg-surface-container-highest rounded-t-lg h-[45%] hover:h-[50%] transition-all duration-300 relative group"></div>
                    <div className="flex-1 bg-surface-container-highest rounded-t-lg h-[90%] hover:h-[95%] transition-all duration-300 relative group"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
                    <div className="p-4 rounded-lg bg-surface-container-high border-l-4 border-primary">
                        <p className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-widest">Total Solved</p>
                        <p className="text-xl font-headline font-bold text-white">{loading ? '...' : metrics?.total_coding_submissions || 0}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-surface-container-high border-l-4 border-secondary">
                        <p className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-widest">Resume ATS</p>
                        <p className="text-xl font-headline font-bold text-white">{loading ? '...' : metrics?.best_resume_score || 0}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-surface-container-high border-l-4 border-tertiary">
                        <p className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-widest">Aptitude Avg</p>
                        <p className="text-xl font-headline font-bold text-white">{loading ? '...' : Math.round(metrics?.aptitude_average || 0)}%</p>
                    </div>
                </div>
            </section>

            {/* Interview Ratings Module */}
            <section className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-xl p-8 glass-edge">
                <h3 className="font-headline text-xl font-semibold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">settings_voice</span>
                    Interview Readiness
                </h3>
                <div className="flex justify-center mb-8">
                    {/* Circular Progress Simulation */}
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle className="text-surface-container-highest" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="12"></circle>
                            <circle cx="80" cy="80" fill="transparent" r="70" stroke="url(#gradient-pie)" strokeDasharray="440" strokeDashoffset="110" strokeLinecap="round" strokeWidth="12"></circle>
                            <defs>
                                <linearGradient id="gradient-pie" x1="0%" x2="100%" y1="0%" y2="0%">
                                    <stop offset="0%" stopColor="#4f46e5"></stop>
                                    <stop offset="100%" stopColor="#571bc1"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-4xl font-headline font-black text-white">{loading ? '...' : Math.round(metrics?.interview_readiness || 0)}%</span>
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">Avg. Score</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4 pt-2">
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-on-surface-variant uppercase tracking-widest font-semibold">Technical Depth</span>
                            <span className="text-white font-bold">82%</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                            <div className="h-full bg-primary-container rounded-full" style={{width: '82%'}}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-on-surface-variant uppercase tracking-widest font-semibold">Communication</span>
                            <span className="text-white font-bold">64%</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                            <div className="h-full bg-secondary-container rounded-full" style={{width: '64%'}}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-on-surface-variant uppercase tracking-widest font-semibold">Problem Solving</span>
                            <span className="text-white font-bold">78%</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                            <div className="h-full bg-tertiary-container rounded-full" style={{width: '78%'}}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Aptitude Analysis */}
            <section className="col-span-12 lg:col-span-5 bg-surface-container-low rounded-xl p-8 glass-edge">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-headline text-xl font-semibold flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary">psychology</span>
                        Aptitude Scores
                    </h3>
                    <select className="bg-surface-container-high border border-outline-variant/20 rounded-lg text-xs font-bold py-1.5 pl-3 pr-8 focus:ring-1 focus:ring-primary text-white outline-none appearance-none cursor-pointer">
                        <option>Last 30 Days</option>
                        <option>Last 6 Months</option>
                    </select>
                </div>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                            <span className="text-lg font-headline font-black text-white">QA</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-white mb-2">Quantitative Ability</p>
                            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full bg-tertiary glow-track rounded-full" style={{width: '92%'}}></div>
                            </div>
                        </div>
                        <span className="text-sm font-headline font-bold text-tertiary pl-2">92/100</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                            <span className="text-lg font-headline font-black text-white">LR</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-white mb-2">Logical Reasoning</p>
                            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full bg-primary-container rounded-full" style={{width: '78%'}}></div>
                            </div>
                        </div>
                        <span className="text-sm font-headline font-bold text-primary pl-2">78/100</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                            <span className="text-lg font-headline font-black text-white">VA</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-white mb-2">Verbal Ability</p>
                            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full bg-secondary-container rounded-full" style={{width: '85%'}}></div>
                            </div>
                        </div>
                        <span className="text-sm font-headline font-bold text-secondary pl-2">85/100</span>
                    </div>
                </div>
                
                <div className="mt-8 p-4 bg-tertiary/5 rounded-lg border border-tertiary/20">
                    <div className="flex gap-3">
                        <span className="material-symbols-outlined text-tertiary text-xl">auto_awesome</span>
                        <div>
                            <p className="text-[10px] font-bold text-tertiary uppercase tracking-widest mb-1.5">AI Recommendation</p>
                            <p className="text-sm text-on-surface-variant leading-relaxed">Your Quantitative Ability is in the top 1% of candidates. Focus more on Verbal Ability practice sessions to balance your profile for top-tier consulting roles.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Weak Topics Highlight */}
            <section className="col-span-12 lg:col-span-7 bg-surface-container-low rounded-xl p-8 glass-edge">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-headline text-xl font-semibold flex items-center gap-2">
                        <span className="material-symbols-outlined text-error">priority_high</span>
                        Topics to Strengthen
                    </h3>
                    <a className="text-[10px] font-semibold text-primary hover:text-white transition-colors uppercase tracking-widest cursor-pointer">View Study Plan</a>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-surface-container-high p-5 rounded-xl hover:scale-[1.02] transition-transform cursor-pointer border border-outline-variant/10 group">
                        <div className="flex justify-between items-start mb-3">
                            <span className="px-2.5 py-1 bg-error/10 text-error text-[10px] font-bold rounded uppercase tracking-widest">High Priority</span>
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-white transition-colors text-sm">open_in_new</span>
                        </div>
                        <h4 className="text-lg font-headline font-bold text-white mb-1.5">Dynamic Programming</h4>
                        <p className="text-xs text-slate-400 mb-5 leading-relaxed">Mastering complex sub-problems and memoization techniques.</p>
                        <div className="flex items-center justify-between border-t border-outline-variant/10 pt-3 mt-auto">
                            <span className="text-xs text-on-surface-variant font-semibold">Last attempt: 42%</span>
                            <span className="text-xs font-bold text-white uppercase tracking-widest">4 Modules Left</span>
                        </div>
                    </div>
                    <div className="bg-surface-container-high p-5 rounded-xl hover:scale-[1.02] transition-transform cursor-pointer border border-outline-variant/10 group">
                        <div className="flex justify-between items-start mb-3">
                            <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded uppercase tracking-widest">Medium Priority</span>
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-white transition-colors text-sm">open_in_new</span>
                        </div>
                        <h4 className="text-lg font-headline font-bold text-white mb-1.5">System Design</h4>
                        <p className="text-xs text-slate-400 mb-5 leading-relaxed">Scalability patterns, load balancing, and database sharding basics.</p>
                        <div className="flex items-center justify-between border-t border-outline-variant/10 pt-3 mt-auto">
                            <span className="text-xs text-on-surface-variant font-semibold">Last attempt: 58%</span>
                            <span className="text-xs font-bold text-white uppercase tracking-widest">2 Modules Left</span>
                        </div>
                    </div>
                    <div className="bg-surface-container-high p-5 rounded-xl hover:scale-[1.02] transition-transform cursor-pointer border border-outline-variant/10 group">
                        <div className="flex justify-between items-start mb-3">
                            <span className="px-2.5 py-1 bg-error/10 text-error text-[10px] font-bold rounded uppercase tracking-widest">High Priority</span>
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-white transition-colors text-sm">open_in_new</span>
                        </div>
                        <h4 className="text-lg font-headline font-bold text-white mb-1.5">Greedy Algorithms</h4>
                        <p className="text-xs text-slate-400 mb-5 leading-relaxed">Optimizing local choices for global optimum solutions.</p>
                        <div className="flex items-center justify-between border-t border-outline-variant/10 pt-3 mt-auto">
                            <span className="text-xs text-on-surface-variant font-semibold">Last attempt: 31%</span>
                            <span className="text-xs font-bold text-white uppercase tracking-widest">6 Modules Left</span>
                        </div>
                    </div>
                    <div className="bg-surface-container-high p-5 rounded-xl hover:scale-[1.02] transition-transform cursor-pointer border border-outline-variant/10 group">
                        <div className="flex justify-between items-start mb-3">
                            <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded uppercase tracking-widest">Medium Priority</span>
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-white transition-colors text-sm">open_in_new</span>
                        </div>
                        <h4 className="text-lg font-headline font-bold text-white mb-1.5">Operating Systems</h4>
                        <p className="text-xs text-slate-400 mb-5 leading-relaxed">Memory management, process scheduling, and deadlocks.</p>
                        <div className="flex items-center justify-between border-t border-outline-variant/10 pt-3 mt-auto">
                            <span className="text-xs text-on-surface-variant font-semibold">Last attempt: 62%</span>
                            <span className="text-xs font-bold text-white uppercase tracking-widest">1 Module Left</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
