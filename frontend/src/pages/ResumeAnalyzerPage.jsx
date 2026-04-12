import React, { useState } from 'react';
import SideNavBar from '../components/layout/SideNavBar';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../lib/api';

export default function ResumeAnalyzerPage() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsData, setAtsData] = useState(null);
  
  const handleFileChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
          setFile(e.target.files[0]);
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
          
          // Using fetchApi. Note: DO NOT set Content-Type header manually for FormData, browser does it with boundary
          const response = await fetchApi('/resume/analyze', {
              method: 'POST',
              body: formData
          });
          
          setAtsData(response.data.analysis_data);
      } catch (err) {
          alert("Error analyzing resume: " + err.message);
      } finally {
          setIsAnalyzing(false);
      }
  };
  
  return (
    <div className="flex bg-surface min-h-screen text-on-surface">
      <SideNavBar />
      
      <main className="md:ml-64 flex-1 flex flex-col min-h-screen p-8 lg:p-12 overflow-y-auto no-scrollbar">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
                <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight text-on-surface">
                    Resume <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-tertiary">Analyzer</span>
                </h1>
                <p className="text-on-surface-variant mt-4 max-w-xl font-body text-lg">
                    Optimizing your profile for ATS algorithms using predictive AI insights and precision career mapping.
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

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Upload Section */}
            <section className="lg:col-span-7 bg-surface-container-low rounded-xl p-8 glass-edge">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-headline text-xl font-semibold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">cloud_upload</span>
                        Upload Document
                    </h2>
                    <span className="text-xs font-semibold text-on-surface-variant bg-surface-container-highest px-3 py-1 rounded-full uppercase tracking-widest">PDF, DOCX Max 5MB</span>
                </div>
                
                <div className="relative group border-2 border-dashed border-outline-variant/30 hover:border-primary/50 rounded-xl p-12 flex flex-col items-center justify-center transition-all bg-surface-container-lowest/50 min-h-[300px]">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-4xl text-primary">upload_file</span>
                    </div>
                    <p className="font-headline text-lg text-on-surface font-medium text-center">{file ? file.name : "Drag and drop your resume here"}</p>
                    <p className="text-on-surface-variant text-sm mt-2 text-center">Our AI will parse your experience instantly</p>
                    
                    <input type="file" id="resume-upload" className="hidden" accept=".pdf" onChange={handleFileChange} />
                    
                    <div className="flex gap-4 mt-8">
                        <label htmlFor="resume-upload" className="px-8 py-3 bg-surface-container-highest cursor-pointer text-on-surface font-semibold rounded-xl hover:bg-surface-variant transition-all shadow-xl">
                            Select File
                        </label>
                        <button 
                            onClick={handleAnalyze} 
                            disabled={isAnalyzing || !file}
                            className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-container disabled:opacity-50 transition-all shadow-xl">
                            {isAnalyzing ? "Analyzing..." : "Analyze"}
                        </button>
                    </div>
                </div>
                
                {/* Recent Scans */}
                <div className="mt-10">
                    <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-4">Recently Analyzed</p>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-surface-container-highest/30 rounded-lg hover:scale-[1.02] transition-transform cursor-pointer">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-primary">picture_as_pdf</span>
                                <div>
                                    <p className="text-sm font-medium">Software_Engineer_v3.pdf</p>
                                    <p className="text-[10px] text-on-surface-variant">Analyzed 2 hours ago</p>
                                </div>
                            </div>
                            <span className="text-primary font-headline font-bold">84%</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Score Gauge Section */}
            <section className="lg:col-span-5 flex flex-col gap-8">
                {/* Score Meter */}
                <div className="bg-surface-container-high rounded-xl p-8 glass-edge relative overflow-hidden">
                    <h2 className="font-headline text-xl font-semibold mb-8">ATS Match Score</h2>
                    <div className="flex flex-col items-center justify-center py-6">
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90">
                                <circle className="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
                                <circle cx="96" cy="96" fill="transparent" r="88" stroke="url(#gradient)" strokeDasharray="552.9" strokeDashoffset={atsData ? 552.9 - (552.9 * atsData.score / 100) : 138} strokeLinecap="round" strokeWidth="12" className="transition-all duration-1000"></circle>
                                <defs>
                                    <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                                        <stop offset="0%" stopColor="#4f46e5"></stop>
                                        <stop offset="100%" stopColor="#571bc1"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <span className="text-5xl font-headline font-black text-white">{atsData ? atsData.score : '75'}</span>
                                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mt-1">Score</span>
                            </div>
                        </div>
                        <div className="mt-8 flex gap-8">
                            <div className="text-center">
                                <p className="text-[10px] font-semibold text-on-surface-variant uppercase mb-1 tracking-widest">Keywords</p>
                                <p className="font-headline font-bold text-lg text-primary">18/24</p>
                            </div>
                            <div className="w-[1px] h-10 bg-outline-variant/30"></div>
                            <div className="text-center">
                                <p className="text-[10px] font-semibold text-on-surface-variant uppercase mb-1 tracking-widest">Impact</p>
                                <p className="font-headline font-bold text-lg text-tertiary">Strong</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-[60px]"></div>
                </div>

                {/* Benchmarking */}
                <div className="bg-surface-container-low rounded-xl p-8 glass-edge">
                    <h3 className="font-headline text-sm font-semibold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary-fixed-dim">equalizer</span>
                        Industry Benchmarking
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-on-surface-variant">Technical Skills</span>
                                <span className="text-white">92%</span>
                            </div>
                            <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full w-[92%] bg-tertiary glow-track rounded-full"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-on-surface-variant">Quantifiable Results</span>
                                <span className="text-white">64%</span>
                            </div>
                            <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full w-[64%] bg-primary rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Feedback Panel */}
            <section className="lg:col-span-12 mt-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-headline text-2xl font-bold">AI Precision Feedback</h2>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">3 Critical</span>
                        <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase tracking-widest">5 Optimization</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {atsData?.suggestions?.length > 0 ? (
                        atsData.suggestions.map((suggestion, idx) => (
                            <div key={idx} className="bg-surface-container-low rounded-xl p-6 glass-edge border-l-4 border-tertiary hover:scale-[1.02] transition-transform cursor-pointer">
                                <div className="w-10 h-10 bg-tertiary-container/20 rounded-lg flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
                                </div>
                                <h4 className="font-headline font-semibold text-white mb-2">Suggestion {idx + 1}</h4>
                                <p className="text-sm text-on-surface-variant font-body leading-relaxed">{suggestion}</p>
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="bg-surface-container-low rounded-xl p-6 glass-edge border-l-4 border-error hover:scale-[1.02] transition-transform cursor-pointer">
                                <div className="w-10 h-10 bg-error-container/20 rounded-lg flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-error">error</span>
                                </div>
                                <h4 className="font-headline font-semibold text-white mb-2">Missing Power Verbs</h4>
                                <p className="text-sm text-on-surface-variant font-body leading-relaxed">Your experience section uses passive language. Replace "Responsible for" with "Orchestrated" or "Executed" to increase impact by 40%.</p>
                            </div>
                            <div className="bg-surface-container-low rounded-xl p-6 glass-edge border-l-4 border-tertiary hover:scale-[1.02] transition-transform cursor-pointer">
                                <div className="w-10 h-10 bg-tertiary-container/20 rounded-lg flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
                                </div>
                                <h4 className="font-headline font-semibold text-white mb-2">Quantify Outcomes</h4>
                                <p className="text-sm text-on-surface-variant font-body leading-relaxed">Add specific metrics to your "Project Lead" role. Mention team size, budget, or percentage growth achieved.</p>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
