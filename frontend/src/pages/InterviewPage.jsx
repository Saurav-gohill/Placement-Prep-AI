import React, { useState, useEffect } from 'react';
import SideNavBar from '../components/layout/SideNavBar';
import { fetchApi } from '../lib/api';
import { FloatingShapes, GlowOrbs } from '../components/animations/Animations3D';

export default function InterviewPage() {
    const [role, setRole] = useState("Frontend");
    const [session, setSession] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [chatLog, setChatLog] = useState([]);
    const [inputVal, setInputVal] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [metrics, setMetrics] = useState({tech: 0, comm: 0, pac: 0});

    useEffect(() => {
        startInterview("Frontend");
    }, []);

    const startInterview = async (selectedRole) => {
        setIsLoading(true);
        setRole(selectedRole);
        try {
            const data = await fetchApi('/interview/start', {
                method: 'POST',
                body: JSON.stringify({ role_targeted: selectedRole })
            });
            setSession(data.session_id);
            setQuestions(data.questions);
            setCurrentQIndex(0);
            setChatLog([{ sender: 'ai', text: data.questions[0] }]);
            setMetrics({tech: 0, comm: 0, pac: 0});
        } catch (err) {
            alert("Error starting interview: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async () => {
        if (!inputVal.trim() || !session) return;
        const msg = inputVal;
        setInputVal("");
        setChatLog(prev => [...prev, { sender: 'user', text: msg }]);
        setIsLoading(true);

        try {
            const data = await fetchApi('/interview/evaluate', {
               method: 'POST',
               body: JSON.stringify({ session_id: session, transcribed_text: msg })
            });
            
            setMetrics({
               tech: data.score_technical,
               comm: data.score_communication,
               pac: Math.floor(Math.random() * 20) + 75 
            });
            setChatLog(prev => [...prev, { sender: 'ai', text: data.feedback }]);
            
            if (currentQIndex < questions.length - 1) {
                const nextQ = questions[currentQIndex + 1];
                setCurrentQIndex(prev => prev + 1);
                setTimeout(() => {
                    setChatLog(prev => [...prev, { sender: 'ai', text: nextQ }]);
                }, 1500);
            }
        } catch (err) {
            alert("Error evaluating response: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };
  return (
    <div className="flex bg-surface min-h-screen text-on-surface">
      <SideNavBar />

      <main className="md:ml-64 flex-1 flex flex-col min-h-screen p-6 md:p-10 overflow-y-auto no-scrollbar relative">
        <FloatingShapes variant="ambient" />
        <GlowOrbs count={2} />
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10 anim-fade-in-up anim-delay-1">
            <div className="max-w-2xl">
                <h1 className="font-headline text-5xl font-bold tracking-tight text-on-surface mb-4">
                    AI Mock <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Interview</span>
                </h1>
                <p className="text-on-surface-variant font-body text-lg">
                    Refine your presence. Receive real-time critique on your technical depth, soft skills, and body language.
                </p>
            </div>
            {/* Role Selector */}
            <div className="flex bg-surface-container-low p-1.5 rounded-full glass-edge border border-outline-variant/10">
                <button onClick={() => startInterview("Frontend")} className={`px-6 py-2 rounded-full font-headline text-sm font-semibold transition-colors ${role === 'Frontend' ? 'bg-surface-container-high text-primary shadow-lg' : 'text-slate-400 hover:text-on-surface'}`}>Frontend</button>
                <button onClick={() => startInterview("Backend")} className={`px-6 py-2 rounded-full font-headline text-sm font-semibold transition-colors ${role === 'Backend' ? 'bg-surface-container-high text-primary shadow-lg' : 'text-slate-400 hover:text-on-surface'}`}>Backend</button>
                <button onClick={() => startInterview("Data Analyst")} className={`px-6 py-2 rounded-full font-headline text-sm font-semibold transition-colors ${role === 'Data Analyst' ? 'bg-surface-container-high text-primary shadow-lg' : 'text-slate-400 hover:text-on-surface'}`}>Data Analyst</button>
            </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
            {/* Left: Interview Interaction (Chat & Question) */}
            <section className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Question Card */}
                <div className="bg-surface-container-low rounded-xl p-8 glass-edge relative overflow-hidden anim-fade-in-up anim-delay-2">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 text-[10px] font-bold tracking-widest uppercase">QUESTION {currentQIndex + 1}/{questions.length || 0}</span>
                    </div>
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-white">smart_toy</span>
                        </div>
                        <div>
                            <h3 className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest mb-1">Current Scenario</h3>
                            <p className="font-headline text-xl font-semibold leading-relaxed">
                                {questions.length > 0 ? questions[currentQIndex] : "Loading interview script..."}
                            </p>
                        </div>
                    </div>
                    {/* AI Progress Indicator */}
                    <div className="mt-8">
                        <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2 tracking-widest uppercase">
                            <span>REMAINING TIME</span>
                            <span>01:42</span>
                        </div>
                        <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-tertiary glow-track rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Chat/Transcript Interface */}
                <div className="bg-surface-container-low rounded-xl flex flex-col h-[500px] glass-edge anim-fade-in-up anim-delay-3">
                    <div className="p-4 border-b border-outline-variant/15 flex items-center justify-between">
                        <span className="font-headline text-sm font-bold text-slate-300">Live Transcript</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-[10px] font-semibold text-red-500 uppercase tracking-widest">Live Processing</span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {chatLog.map((log, i) => (
                            <div key={i} className={`flex gap-4 max-w-[85%] ${log.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${log.sender === 'user' ? 'bg-primary-container' : 'bg-surface-container-highest'}`}>
                                    <span className={`material-symbols-outlined text-xs ${log.sender === 'user' ? 'text-white' : 'text-primary'}`}>{log.sender === 'user' ? 'person' : 'psychology'}</span>
                                </div>
                                <div className={`p-4 rounded-2xl ${log.sender === 'user' ? 'bg-primary-container/20 rounded-tr-none border border-primary/10' : 'bg-surface-container-high rounded-tl-none'}`}>
                                    <p className={`text-sm leading-relaxed ${log.sender === 'user' ? 'text-primary' : 'text-on-surface-variant'}`}>{log.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Voice Recording Control (Text Mock Base) */}
                    <div className="p-4 bg-surface-container-highest/30 rounded-b-xl flex gap-2">
                        <input
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your spoken response here..."
                            disabled={isLoading}
                            className="flex-1 bg-surface-container-low text-on-surface p-3 rounded-lg border border-outline-variant/10 focus:outline-none focus:border-primary/50 text-sm disabled:opacity-50"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={isLoading}
                            className="px-6 py-3 bg-gradient-to-br from-primary-container to-secondary-container rounded-lg font-bold text-white shadow-lg hover:opacity-90 transition-all text-sm flex items-center justify-center disabled:opacity-50">
                            {isLoading ? '...' : 'Send'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Right: Feedback & Insights */}
            <section className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Live Video/Avatar Placeholder */}
                <div className="aspect-video bg-black rounded-xl overflow-hidden relative group glass-edge">
                    <img className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Video stream placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwpiRj8ppqtAGiWnEsN4d6AHySwfLy1UEU7fbw9IctbMVjtQxMp0epJU1i_O_GU-CencVbU47uW8EULIS2Sm94ZG_Cp-JY7QV46lkDdvFgZS2TVwhTmWp2oSP3ecIoG2ixHMXmUBl15JSE6eTAjG6e1sfMk1tQ6aWp4qIBcDs0MkxtZz3SZl7AuLsKzO2Y5a60RSAlkJA9NyUjpX5yUE1Xehic418lFX0U023Cf2LiE7dp_4MC0D9ZphducAFTqZfvvZPscGaz8xI"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-xs font-bold text-white font-headline">Webcam: Active</span>
                    </div>
                </div>

                {/* AI Insights Panel */}
                <div className="bg-surface-container-low rounded-xl p-6 glass-edge anim-fade-in-up anim-delay-3 anim-hover-lift">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-headline font-bold text-lg">AI Performance Metrics</h2>
                        <span className="material-symbols-outlined text-tertiary">query_stats</span>
                    </div>
                    <div className="space-y-6">
                        {/* Metric */}
                        <div className="p-4 bg-surface-container-high rounded-lg cursor-default border border-outline-variant/10">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Technical Accuracy</span>
                                <span className="font-headline font-bold text-primary">{metrics.tech}%</span>
                            </div>
                            <div className="h-1.5 bg-background rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{width: `${metrics.tech}%`}}></div>
                            </div>
                        </div>
                        {/* Metric */}
                        <div className="p-4 bg-surface-container-high rounded-lg cursor-default border border-outline-variant/10">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Communication Clarity</span>
                                <span className="font-headline font-bold text-tertiary">{metrics.comm}%</span>
                            </div>
                            <div className="h-1.5 bg-background rounded-full overflow-hidden">
                                <div className="h-full bg-tertiary rounded-full" style={{width: `${metrics.comm}%`}}></div>
                            </div>
                        </div>
                        {/* Metric */}
                        <div className="p-4 bg-surface-container-high rounded-lg cursor-default border border-outline-variant/10">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Confidence & Pace</span>
                                <span className="font-headline font-bold text-secondary">{metrics.pac}%</span>
                            </div>
                            <div className="h-1.5 bg-background rounded-full overflow-hidden">
                                <div className="h-full bg-secondary rounded-full" style={{width: `${metrics.pac}%`}}></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-outline-variant/15">
                        <h3 className="font-headline font-semibold text-sm mb-4">Real-time Observations</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-surface-container-highest/40 rounded-lg border border-outline-variant/5">
                                <span className="material-symbols-outlined text-primary text-lg">info</span>
                                <p className="text-xs text-on-surface-variant">Your pace is slightly fast. Try to pause for 2 seconds after finishing a key point.</p>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-surface-container-highest/40 rounded-lg border border-outline-variant/5">
                                <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                                <p className="text-xs text-on-surface-variant">Great articulation on the Module Federation architecture. Technical depth is solid.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="w-full py-4 rounded-xl border border-primary/20 bg-primary/5 text-primary font-headline font-bold hover:bg-primary/10 transition-colors">
                    End Session & Generate Full Report
                </button>
            </section>
        </div>
      </main>
    </div>
  );
}
