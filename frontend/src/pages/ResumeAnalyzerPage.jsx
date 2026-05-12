import React, { useState } from 'react';
import SideNavBar from '../components/layout/SideNavBar';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../lib/api';
import { FloatingShapes, GlowOrbs } from '../components/animations/Animations3D';

const severityConfig = {
  critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/40', icon: 'error', label: 'Critical' },
  warning: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/40', icon: 'warning', label: 'Warning' },
  info: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/40', icon: 'info', label: 'Tip' },
};

const statusConfig = {
  good: { color: 'text-emerald-400', bg: 'bg-emerald-500/15', label: 'Good' },
  moderate: { color: 'text-amber-400', bg: 'bg-amber-500/15', label: 'Moderate' },
  needs_work: { color: 'text-orange-400', bg: 'bg-orange-500/15', label: 'Needs Work' },
  critical: { color: 'text-red-400', bg: 'bg-red-500/15', label: 'Critical' },
};

export default function ResumeAnalyzerPage() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsData, setAtsData] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  
  const handleFileChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
          setFile(e.target.files[0]);
          setAtsData(null); // Reset previous results
      }
  };

  const handleAnalyze = async () => {
      if (!file) {
          alert("Please select a file first.");
          return;
      }
      setIsAnalyzing(true);
      try {
          const formData = new FormData();
          formData.append("file", file);
          
          const response = await fetchApi('/resume/analyze', {
              method: 'POST',
              body: formData
          });
          
          setAtsData(response.data.analysis_data);
          setExpandedSection(null);
      } catch (err) {
          alert("Error analyzing resume: " + err.message);
      } finally {
          setIsAnalyzing(false);
      }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-emerald-500 to-emerald-400';
    if (score >= 60) return 'from-amber-500 to-amber-400';
    return 'from-red-500 to-red-400';
  };
  
  return (
    <div className="flex bg-surface min-h-screen text-on-surface">
      <SideNavBar />
      
      <main className="md:ml-64 flex-1 flex flex-col min-h-screen p-6 lg:p-10 overflow-y-auto no-scrollbar relative">
        <FloatingShapes variant="ambient" />
        <GlowOrbs count={2} />

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10 anim-fade-in-up anim-delay-1">
            <div>
                <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface">
                    Resume <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-tertiary">Analyzer</span>
                </h1>
                <p className="text-on-surface-variant mt-3 max-w-xl font-body text-base">
                    Get section-by-section analysis with precise rewrite suggestions to maximize your ATS score.
                </p>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="font-headline font-bold text-white text-lg leading-tight">{user?.user_metadata?.full_name || 'Student'}</p>
                    <p className="text-primary text-xs font-semibold uppercase tracking-widest">Premium Member</p>
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 bg-surface-container-highest flex items-center justify-center font-bold text-primary text-xl">
                    {user?.user_metadata?.full_name?.charAt(0) || 'S'}
                </div>
            </div>
        </header>

        {/* Upload Section */}
        <section className="bg-surface-container-low rounded-xl p-8 glass-edge mb-8 relative z-10 anim-fade-in-up anim-delay-2 anim-hover-lift">
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline text-xl font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">cloud_upload</span>
                    Upload Resume
                </h2>
                <span className="text-xs font-semibold text-on-surface-variant bg-surface-container-highest px-3 py-1 rounded-full uppercase tracking-widest">PDF Only • Max 5MB</span>
            </div>
            
            <div className="relative group border-2 border-dashed border-outline-variant/30 hover:border-primary/50 rounded-xl p-10 flex flex-col items-center justify-center transition-all bg-surface-container-lowest/50">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl text-primary">upload_file</span>
                </div>
                <p className="font-headline text-lg text-on-surface font-medium text-center">
                    {file ? file.name : "Drag and drop your resume here"}
                </p>
                <p className="text-on-surface-variant text-sm mt-1 text-center">
                    {file ? `${(file.size / 1024).toFixed(1)} KB — Ready for analysis` : 'PDF format for best results'}
                </p>
                
                <input type="file" id="resume-upload" className="hidden" accept=".pdf" onChange={handleFileChange} />
                
                <div className="flex gap-4 mt-6">
                    <label htmlFor="resume-upload" className="px-8 py-3 bg-surface-container-highest cursor-pointer text-on-surface font-semibold rounded-xl hover:bg-surface-variant transition-all">
                        Select File
                    </label>
                    <button 
                        onClick={handleAnalyze} 
                        disabled={isAnalyzing || !file}
                        className="px-8 py-3 bg-gradient-to-r from-primary-container to-secondary-container text-white font-semibold rounded-xl disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
                        {isAnalyzing ? (
                            <>
                                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                                Analyze with AI
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>

        {/* Results — only show after analysis */}
        {atsData && (
          <div className="space-y-8 relative z-10 anim-fade-in-up">

            {/* Score Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Main Score */}
              <div className="lg:col-span-4 bg-surface-container-high rounded-xl p-8 glass-edge relative overflow-hidden anim-hover-lift">
                <h2 className="font-headline text-lg font-semibold mb-6">ATS Match Score</h2>
                <div className="flex flex-col items-center justify-center py-4">
                    <div className="relative w-44 h-44 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle className="text-surface-container-highest" cx="88" cy="88" fill="transparent" r="80" stroke="currentColor" strokeWidth="10"></circle>
                            <circle cx="88" cy="88" fill="transparent" r="80" stroke="url(#scoreGradient)" strokeDasharray="502.6" strokeDashoffset={502.6 - (502.6 * atsData.score / 100)} strokeLinecap="round" strokeWidth="10" className="transition-all duration-1000"></circle>
                            <defs>
                                <linearGradient id="scoreGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                                    <stop offset="0%" stopColor={atsData.score >= 80 ? '#10b981' : atsData.score >= 60 ? '#f59e0b' : '#ef4444'}></stop>
                                    <stop offset="100%" stopColor={atsData.score >= 80 ? '#34d399' : atsData.score >= 60 ? '#fbbf24' : '#f87171'}></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className={`text-5xl font-headline font-black ${getScoreColor(atsData.score)}`}>{atsData.score}</span>
                            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mt-1">/ 100</span>
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-[60px]"></div>
              </div>

              {/* Summary + Top Improvements */}
              <div className="lg:col-span-8 space-y-6">
                {/* Summary */}
                <div className="bg-surface-container-low rounded-xl p-6 glass-edge">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-primary">psychology</span>
                    </div>
                    <div>
                      <h3 className="font-headline font-semibold text-white mb-1">AI Assessment</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{atsData.summary}</p>
                    </div>
                  </div>
                </div>

                {/* Top Improvements - Quick Wins */}
                {atsData.top_improvements?.length > 0 && (
                  <div className="bg-surface-container-low rounded-xl p-6 glass-edge">
                    <h3 className="font-headline font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary text-lg">rocket_launch</span>
                      Quick Wins — Highest Impact Changes
                    </h3>
                    <div className="space-y-3">
                      {atsData.top_improvements.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-surface-container-highest/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 bg-tertiary/20 rounded-full flex items-center justify-center text-tertiary text-xs font-bold">{i + 1}</span>
                            <span className="text-sm text-on-surface">{item.action}</span>
                          </div>
                          <span className="text-emerald-400 text-xs font-bold font-headline whitespace-nowrap">{item.score_boost}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Keywords Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Present Keywords */}
              {atsData.keywords_present?.length > 0 && (
                <div className="bg-surface-container-low rounded-xl p-6 glass-edge anim-hover-lift">
                  <h3 className="font-headline font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400 text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                    Keywords Found
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {atsData.keywords_present.map((kw, i) => (
                      <span key={i} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-semibold">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Missing Keywords */}
              {atsData.keywords_missing?.length > 0 && (
                <div className="bg-surface-container-low rounded-xl p-6 glass-edge anim-hover-lift">
                  <h3 className="font-headline font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-400 text-lg">cancel</span>
                    Missing Keywords — Add These
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {atsData.keywords_missing.map((kw, i) => (
                      <span key={i} className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Format Issues */}
            {atsData.format_issues?.length > 0 && (
              <div className="bg-surface-container-low rounded-xl p-6 glass-edge anim-hover-lift">
                <h3 className="font-headline font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-lg">format_list_bulleted</span>
                  Formatting Issues
                </h3>
                <div className="space-y-2">
                  {atsData.format_issues.map((issue, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-amber-500/5 rounded-lg border border-amber-500/10">
                      <span className="material-symbols-outlined text-amber-400 text-sm mt-0.5">warning</span>
                      <span className="text-sm text-on-surface-variant">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section-by-Section Deep Dive */}
            {atsData.sections?.length > 0 && (
              <div>
                <h2 className="font-headline text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">find_in_page</span>
                  Section-by-Section Analysis
                </h2>
                <div className="space-y-4">
                  {atsData.sections.map((section, idx) => {
                    const status = statusConfig[section.status] || statusConfig.moderate;
                    const isExpanded = expandedSection === idx;
                    const criticalCount = section.issues?.filter(i => i.severity === 'critical').length || 0;
                    const warningCount = section.issues?.filter(i => i.severity === 'warning').length || 0;
                    
                    return (
                      <div key={idx} className="bg-surface-container-low rounded-xl glass-edge overflow-hidden anim-hover-lift">
                        {/* Section Header — always visible */}
                        <button
                          onClick={() => setExpandedSection(isExpanded ? null : idx)}
                          className="w-full flex items-center justify-between p-6 hover:bg-surface-container-highest/20 transition-colors text-left"
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className={`w-12 h-12 rounded-xl ${status.bg} flex items-center justify-center`}>
                                <span className={`font-headline font-bold text-lg ${status.color}`}>{section.score}</span>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-headline font-bold text-white text-lg">{section.name}</h3>
                              <div className="flex items-center gap-3 mt-1">
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${status.color}`}>{status.label}</span>
                                {criticalCount > 0 && (
                                  <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">{criticalCount} critical</span>
                                )}
                                {warningCount > 0 && (
                                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">{warningCount} warning</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {/* Score bar mini */}
                            <div className="hidden sm:block w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                              <div className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(section.score)} transition-all duration-500`} style={{width: `${section.score}%`}}></div>
                            </div>
                            <span className={`material-symbols-outlined text-on-surface-variant transition-transform ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
                          </div>
                        </button>

                        {/* Expanded Issues */}
                        {isExpanded && section.issues?.length > 0 && (
                          <div className="px-6 pb-6 space-y-4 border-t border-outline-variant/10 pt-4">
                            {section.issues.map((issue, iIdx) => {
                              const sev = severityConfig[issue.severity] || severityConfig.info;
                              return (
                                <div key={iIdx} className={`rounded-xl border ${sev.border} overflow-hidden`}>
                                  {/* Issue header */}
                                  <div className={`px-5 py-3 ${sev.bg} flex items-center gap-2`}>
                                    <span className={`material-symbols-outlined text-sm ${sev.color}`}>{sev.icon}</span>
                                    <span className={`text-xs font-bold uppercase tracking-widest ${sev.color}`}>{sev.label}</span>
                                  </div>
                                  
                                  <div className="p-5 space-y-4">
                                    {/* Found */}
                                    <div>
                                      <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1.5">
                                        <span className="material-symbols-outlined text-[10px] align-middle mr-1">close</span>
                                        Found in your resume
                                      </p>
                                      <div className="bg-red-500/5 border border-red-500/15 rounded-lg px-4 py-3">
                                        <p className="text-sm text-on-surface font-mono leading-relaxed">{issue.found}</p>
                                      </div>
                                    </div>

                                    {/* Fix */}
                                    <div>
                                      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5">
                                        <span className="material-symbols-outlined text-[10px] align-middle mr-1">check</span>
                                        Replace with
                                      </p>
                                      <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-lg px-4 py-3">
                                        <p className="text-sm text-on-surface leading-relaxed whitespace-pre-line">{issue.fix}</p>
                                      </div>
                                    </div>

                                    {/* Impact */}
                                    <div className="flex items-start gap-2 pt-1">
                                      <span className="material-symbols-outlined text-blue-400 text-sm mt-0.5">lightbulb</span>
                                      <p className="text-xs text-blue-400 leading-relaxed"><strong>Why it matters:</strong> {issue.impact}</p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Expanded but no issues */}
                        {isExpanded && (!section.issues || section.issues.length === 0) && (
                          <div className="px-6 pb-6 border-t border-outline-variant/10 pt-4">
                            <div className="flex items-center gap-2 text-emerald-400">
                              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                              <span className="text-sm font-semibold">This section looks great! No issues found.</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Legacy fallback — if only suggestions exist (old format) */}
            {!atsData.sections?.length && atsData.suggestions?.length > 0 && (
              <div>
                <h2 className="font-headline text-2xl font-bold mb-6">AI Suggestions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {atsData.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="bg-surface-container-low rounded-xl p-6 glass-edge border-l-4 border-tertiary">
                      <div className="w-10 h-10 bg-tertiary-container/20 rounded-lg flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
                      </div>
                      <h4 className="font-headline font-semibold text-white mb-2">Suggestion {idx + 1}</h4>
                      <p className="text-sm text-on-surface-variant font-body leading-relaxed">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resume Pro Tips */}
            <div>
              <h2 className="font-headline text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">tips_and_updates</span>
                Resume Pro Tips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: 'format_size', title: 'One Page Rule', desc: 'Keep your resume to 1 page for 0-5 years of experience. Recruiters spend ~7 seconds on initial screening.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { icon: 'speed', title: 'Action Verbs First', desc: 'Start every bullet with a strong verb: Designed, Built, Led, Automated, Reduced, Increased — not "Responsible for".', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                  { icon: 'bar_chart', title: 'Quantify Everything', desc: '"Improved performance by 40%", "Led a team of 5", "Reduced costs by $10K/month" — numbers catch attention.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { icon: 'key', title: 'Mirror Job Keywords', desc: 'Read the job description and include exact keywords. ATS systems match your resume against the JD keyword-by-keyword.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
                  { icon: 'view_headline', title: 'Standard Section Names', desc: 'Use "Experience", "Education", "Skills", "Projects" — creative headers like "My Journey" confuse ATS parsers.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
                  { icon: 'text_format', title: 'Simple Formatting', desc: 'No tables, columns, headers/footers, or images. Use standard fonts (Arial, Calibri). ATS can\'t read complex layouts.', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                ].map((tip, i) => (
                  <div key={i} className="bg-surface-container-low rounded-xl p-5 glass-edge anim-hover-lift">
                    <div className={`w-10 h-10 ${tip.bg} rounded-xl flex items-center justify-center mb-3`}>
                      <span className={`material-symbols-outlined ${tip.color}`}>{tip.icon}</span>
                    </div>
                    <h4 className="font-headline font-bold text-white text-sm mb-1.5">{tip.title}</h4>
                    <p className="text-on-surface-variant text-xs leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Re-analyze */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => { setAtsData(null); setFile(null); setExpandedSection(null); }}
                className="px-8 py-3 bg-surface-container-highest text-on-surface font-semibold rounded-xl hover:bg-surface-variant transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                Analyze Another Resume
              </button>
            </div>
          </div>
        )}

        {/* Empty State — before analysis */}
        {!atsData && !isAnalyzing && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 anim-fade-in-up anim-delay-3">
            <div className="bg-surface-container-low rounded-xl p-6 glass-edge anim-hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-2xl">find_in_page</span>
              </div>
              <h3 className="font-headline font-bold text-white mb-2">Section-by-Section</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Every section scored independently — Summary, Experience, Skills, Projects, Education.</p>
            </div>
            <div className="bg-surface-container-low rounded-xl p-6 glass-edge anim-hover-lift">
              <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-tertiary text-2xl">compare_arrows</span>
              </div>
              <h3 className="font-headline font-bold text-white mb-2">Exact Rewrites</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">See exactly what to change — with before/after text you can copy-paste directly.</p>
            </div>
            <div className="bg-surface-container-low rounded-xl p-6 glass-edge anim-hover-lift">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-secondary text-2xl">trending_up</span>
              </div>
              <h3 className="font-headline font-bold text-white mb-2">Score Boost Map</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Ranked quick wins showing exactly how many points each change adds to your score.</p>
            </div>
          </div>
        )}

        <div className="h-16 md:h-0"></div>
      </main>
    </div>
  );
}
