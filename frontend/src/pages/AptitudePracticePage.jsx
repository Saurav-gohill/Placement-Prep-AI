import React, { useState, useEffect } from 'react';
import SideNavBar from '../components/layout/SideNavBar';
import { fetchApi } from '../lib/api';

export default function AptitudePracticePage() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        try {
            const data = await fetchApi('/aptitude/questions');
            setQuestions(data.questions || []);
        } catch (err) {
            console.error("Failed to load questions", err);
        }
    };

    const handleSelectOption = (index, optionLabel) => {
        setAnswers(prev => ({ ...prev, [index]: optionLabel }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const formattedAnswers = Object.keys(answers).map(k => ({
                question_id: questions[k].id,
                selected_option: answers[k]
            }));
            const data = await fetchApi('/aptitude/submit', {
                method: 'POST',
                body: JSON.stringify({ answers: formattedAnswers })
            });
            setResult(data);
        } catch (err) {
            alert("Error submitting: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (questions.length === 0 && !result) {
        return (
            <div className="flex bg-background min-h-screen text-on-surface">
              <SideNavBar />
              <main className="md:ml-64 flex-1 flex flex-col min-h-screen justify-center items-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </main>
            </div>
        );
    }
  return (
    <div className="flex bg-background min-h-screen text-on-surface">
      <SideNavBar />

      <main className="md:ml-64 flex-1 flex flex-col min-h-screen relative pb-20 overflow-y-auto no-scrollbar">
        {/* Top App Bar */}
        <header className="sticky top-0 w-full px-8 py-4 bg-[#0b1326]/60 backdrop-blur-xl z-40 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-headline font-extrabold tracking-tight text-white">Quantitative Aptitude</h1>
                <div className="h-4 w-px bg-outline-variant/30 hidden sm:block"></div>
                <span className="text-sm text-on-surface-variant font-medium hidden sm:block">Session: Speed & Distance</span>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full glass-edge">
                    <span className="material-symbols-outlined text-tertiary">timer</span>
                    <span className="font-headline font-bold text-lg tabular-nums">14:52</span>
                </div>
                <button className="px-6 py-2 rounded-xl bg-surface-bright text-sm font-semibold hover:bg-surface-variant transition-colors glass-edge hidden sm:block">
                    Save & Exit
                </button>
            </div>
        </header>

        {/* Progress Section */}
        <div className="px-6 lg:px-12 py-8 max-w-6xl mx-auto w-full">
            <div className="flex justify-between items-end mb-4">
                <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary font-bold">Progress</p>
                    <h2 className="text-2xl font-headline font-bold">Question {(currentIndex + 1).toString().padStart(2, '0')} <span className="text-on-surface-variant font-normal text-lg">/ {questions.length}</span></h2>
                </div>
                <div className="flex gap-1 hidden sm:flex">
                    {questions.map((_, idx) => (
                        <div key={idx} className={`h-2 rounded-full ${idx < currentIndex ? 'w-2 bg-primary-container' : idx === currentIndex ? 'w-8 bg-primary glow-track' : 'w-2 bg-surface-container-highest'}`}></div>
                    ))}
                </div>
            </div>

            {/* Quiz Interface: Two Column Editorial Layout */}
            {result ? (
                <div className="mt-12 pt-12 border-t border-outline-variant/10">
                    <div className="text-center mb-12">
                        <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4">Practice Completed</p>
                        <h2 className="text-5xl font-headline font-extrabold text-white mb-4">Performance Report</h2>
                        <p className="text-on-surface-variant max-w-lg mx-auto">Great effort! You've successfully completed the set. Here's how you performed.</p>
                    </div>
                    <div className="flex items-center justify-center gap-8">
                        <div className="p-8 bg-surface-container-low rounded-2xl text-center glass-edge min-w-[200px]">
                            <p className="text-4xl font-black text-primary mb-2">{result.score}</p>
                            <p className="text-xs uppercase tracking-widest text-slate-400">Total Score</p>
                        </div>
                        <div className="p-8 bg-surface-container-low rounded-2xl text-center glass-edge min-w-[200px]">
                            <p className="text-4xl font-black text-tertiary mb-2">{Math.round((result.score / result.total) * 100) || 0}%</p>
                            <p className="text-xs uppercase tracking-widest text-slate-400">Accuracy</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-12 gap-8 mt-8">
                    {/* Question Section */}
                    <div className="col-span-12 lg:col-span-7">
                        <div className="bg-surface-container-low rounded-xl p-10 glass-edge min-h-[300px] flex flex-col justify-center border border-outline-variant/10">
                            <span className="inline-block px-3 py-1 bg-tertiary-container/30 text-tertiary text-[10px] font-bold uppercase rounded-md mb-6 w-max tracking-widest">{questions[currentIndex]?.topic || 'General'}</span>
                            <p className="text-2xl font-headline leading-relaxed text-on-surface">
                                {questions[currentIndex]?.question_text}
                            </p>
                        </div>
                    </div>

                    {/* Options Section */}
                    <div className="col-span-12 lg:col-span-5 space-y-4">
                        {questions[currentIndex]?.options && Array.isArray(questions[currentIndex].options) ? (
                            questions[currentIndex].options.map((opt, oIdx) => {
                                const labels = ['A', 'B', 'C', 'D'];
                                const label = labels[oIdx] || String(oIdx);
                                const isSelected = answers[currentIndex] === opt;
                                return (
                                    <button 
                                        key={oIdx} 
                                        onClick={() => handleSelectOption(currentIndex, opt)}
                                        className={`w-full text-left p-6 rounded-xl glass-edge group transition-all duration-300 transform flex items-center justify-between border-2 ${isSelected ? 'border-primary-container bg-primary-container/10' : 'bg-surface-container-high border-transparent hover:bg-surface-bright hover:scale-[1.02]'}`}>
                                        <div className="flex items-center gap-6">
                                            <span className={`w-10 h-10 flex items-center justify-center rounded-lg font-headline font-bold transition-colors ${isSelected ? 'bg-primary-container text-white' : 'bg-surface-container-highest group-hover:bg-primary-container text-on-surface'}`}>{label}</span>
                                            <span className={`text-lg font-medium ${isSelected ? 'text-white' : ''}`}>{opt}</span>
                                        </div>
                                        <span className={`material-symbols-outlined text-primary transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} style={{fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0"}}>check_circle</span>
                                    </button>
                                );
                            })
                        ) : (
                           <div className="text-center p-8 bg-surface-container-high rounded-xl text-on-surface-variant font-mono text-sm">No options found.</div>
                        )}
                        
                        <div className="pt-8 flex gap-4">
                            <button 
                                onClick={handlePrevious} 
                                disabled={currentIndex === 0}
                                className="flex-1 bg-surface-container-high hover:bg-surface-bright py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 glass-edge disabled:opacity-50">
                                <span className="material-symbols-outlined">arrow_back</span> Previous
                            </button>
                            
                            {currentIndex === questions.length - 1 ? (
                                <button 
                                    onClick={handleSubmit} 
                                    disabled={isSubmitting}
                                    className="flex-1 bg-gradient-to-r from-tertiary-container to-primary-container py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 text-white">
                                    {isSubmitting ? '...' : 'Submit Final'} <span className="material-symbols-outlined">done_all</span>
                                </button>
                            ) : (
                                <button 
                                    onClick={handleNext}
                                    className="flex-1 bg-gradient-to-r from-primary-container to-secondary-container py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-container/20">
                                    Next <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Replaced logic above */}
        </div>
      </main>
    </div>
  );
}
