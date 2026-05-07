import React, { useState } from 'react';
import SideNavBar from '../components/layout/SideNavBar';
import { fetchApi } from '../lib/api';
import { FloatingShapes } from '../components/animations/Animations3D';

export default function CodingPracticePage() {
  const [code, setCode] = useState("class Solution:\n    def findMedianSortedArrays(self, nums1, nums2):\n        # Implement binary search on the shorter array\n        pass");
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
      setIsRunning(true);
      try {
          const payload = {
              question_id: '004',
              code: code,
              language: 'python'
          };
          const data = await fetchApi('/coding/submit', {
              method: 'POST',
              body: JSON.stringify(payload)
          });
          setResult(data);
      } catch (err) {
          alert("Error executing code: " + err.message);
      } finally {
          setIsRunning(false);
      }
  };
  return (
    <div className="flex bg-background h-screen overflow-hidden text-on-surface">
      <SideNavBar />

      <main className="md:ml-64 flex-1 flex flex-col min-w-0 bg-background h-screen relative">
        <FloatingShapes variant="minimal" />
        {/* IDE Header (Replacing TopNavBar) */}
        <header className="flex items-center justify-between px-6 py-3 bg-[#0b1326]/60 backdrop-blur-xl border-b border-outline-variant/10 z-10 shrink-0">
            <div className="flex items-center gap-4">
                <button className="md:hidden text-on-surface">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div className="flex items-center gap-2">
                    <span className="text-primary-container material-symbols-outlined text-2xl">terminal</span>
                    <h1 className="font-headline font-bold text-lg tracking-tight">Median of Two Sorted Arrays</h1>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-surface-container-high px-3 py-1.5 rounded-full border border-outline-variant/10 hidden sm:flex">
                    <span className="material-symbols-outlined text-sm text-tertiary">timer</span>
                    <span className="text-xs font-manrope font-semibold text-on-surface-variant">42:15</span>
                </div>
                <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors hidden sm:block">
                    <span className="material-symbols-outlined">settings</span>
                </button>
                <button 
                    onClick={handleSubmit} 
                    disabled={isRunning}
                    className="bg-gradient-to-r from-primary-container to-secondary-container px-6 py-2 rounded-xl text-sm font-bold hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-primary-container/20">
                    {isRunning ? 'Running...' : 'Submit Solution'}
                </button>
            </div>
        </header>

        {/* Editor & Panel Grid */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-2 gap-2">
            
            {/* Left: Problem Description */}
            <section className="w-full lg:w-1/3 min-w-[320px] bg-surface-container-low rounded-xl flex flex-col overflow-hidden border border-outline-variant/5">
                <div className="flex border-b border-outline-variant/10 shrink-0">
                    <button className="flex-1 py-3 text-xs font-bold text-primary border-b-2 border-primary bg-surface-container-high/50">Description</button>
                    <button className="flex-1 py-3 text-xs font-bold text-on-surface-variant/60 hover:text-on-surface-variant transition-colors">Solutions</button>
                    <button className="flex-1 py-3 text-xs font-bold text-on-surface-variant/60 hover:text-on-surface-variant transition-colors">Submissions</button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-error-container/20 text-error text-[10px] font-bold tracking-widest uppercase">Hard</span>
                        <span className="text-xs text-on-surface-variant">ID: 004</span>
                        <span className="ml-auto material-symbols-outlined text-slate-400 cursor-pointer hover:text-white transition-colors">bookmark</span>
                    </div>
                    
                    <div className="prose prose-invert max-w-none text-sm text-on-surface font-body leading-relaxed">
                        <p>
                            Given two sorted arrays <code className="bg-surface-container-highest px-1 py-0.5 rounded text-secondary">nums1</code> and <code className="bg-surface-container-highest px-1 py-0.5 rounded text-secondary">nums2</code> of size <code className="bg-surface-container-highest px-1 py-0.5 rounded text-secondary">m</code> and <code className="bg-surface-container-highest px-1 py-0.5 rounded text-secondary">n</code> respectively, return the <span className="text-primary font-bold">median</span> of the two sorted arrays.
                        </p>
                        <p className="mt-4">
                            The overall run time complexity should be <code className="bg-surface-container-highest px-1 py-0.5 rounded text-primary-fixed-dim">O(log (m+n))</code>.
                        </p>
                    </div>

                    <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Example 1</span>
                            <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/5 font-mono text-xs leading-relaxed">
                                <div className="mb-1"><span className="text-on-surface-variant/50">Input:</span> nums1 = [1,3], nums2 = [2]</div>
                                <div className="mb-1"><span className="text-on-surface-variant/50">Output:</span> 2.00000</div>
                                <div><span className="text-on-surface-variant/50">Explanation:</span> merged array = [1,2,3] and median is 2.</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Constraints</span>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-on-surface-variant">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                                    <code>nums1.length == m</code>, <code>nums2.length == n</code>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-on-surface-variant">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                                    <code>0 &lt;= m, n &lt;= 1000</code>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-on-surface-variant">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                                    <code>-10^6 &lt;= nums1[i], nums2[i] &lt;= 10^6</code>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Center: Monaco-Style Editor Area */}
            <section className="flex-1 flex flex-col bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/5">
                <div className="flex items-center justify-between px-4 py-2 bg-surface-container-high/50 border-b border-outline-variant/10 shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="bg-surface-container px-3 py-1 rounded text-xs font-manrope font-semibold text-primary-fixed-dim flex items-center gap-2 cursor-pointer hover:bg-surface-container-high transition-colors">
                            Python 3 <span className="material-symbols-outlined text-xs">expand_more</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-surface-container-highest rounded-lg transition-colors text-slate-400 hover:text-white" title="Format Code">
                            <span className="material-symbols-outlined text-sm">format_align_left</span>
                        </button>
                        <button onClick={() => setCode("class Solution:\n    def findMedianSortedArrays(self, nums1, nums2):\n        # Implement binary search on the shorter array\n        pass")} className="p-1.5 hover:bg-surface-container-highest rounded-lg transition-colors text-slate-400 hover:text-white" title="Reset Code">
                            <span className="material-symbols-outlined text-sm">restart_alt</span>
                        </button>
                    </div>
                </div>

                {/* Editor */}
                <div className="flex-1 bg-gradient-to-b from-[#131b2e] to-[#0b1326] relative flex">
                    <textarea 
                        value={code} 
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full bg-transparent text-[#f8f8f2] font-mono text-sm leading-relaxed p-4 pl-12 resize-none outline-none focus:ring-0"
                        spellCheck="false"
                    />
                    <div className="absolute left-0 top-0 bottom-0 w-10 bg-surface-container-lowest/50 border-r border-outline-variant/5 flex flex-col items-center py-4 text-slate-600 select-none text-xs pointer-events-none">
                        {code.split('\n').map((_, i) => <span key={i}>{i + 1}</span>)}
                    </div>
                </div>

                {/* Bottom Terminal / Test Cases */}
                <div className="h-48 bg-surface-container-lowest border-t border-outline-variant/15 flex flex-col shrink-0">
                    <div className="flex items-center gap-4 px-6 border-b border-outline-variant/10 shrink-0">
                        <button className="py-2 text-[10px] font-bold uppercase tracking-widest text-primary border-b-2 border-primary">Test Cases</button>
                        <button className="py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300">Run History</button>
                        <button className="ml-auto flex items-center gap-1 py-1 px-3 bg-surface-container-high rounded text-[10px] font-bold text-on-surface hover:bg-surface-bright transition-colors">
                            <span className="material-symbols-outlined text-xs">play_arrow</span> Run Test
                        </button>
                    </div>
                    <div className="flex-1 p-4 flex gap-4 overflow-y-auto no-scrollbar">
                        {result ? (
                            <div className="w-full flex flex-col font-mono text-sm">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${result.passed ? 'bg-tertiary/20 text-tertiary' : 'bg-error/20 text-error'}`}>
                                        {result.passed ? 'Accepted' : 'Failed'}
                                    </span>
                                    <span className="text-xs text-on-surface-variant">Runtime: {result.execution_time_ms} ms</span>
                                </div>
                                <div className="p-3 bg-surface-container-lowest border border-outline-variant/10 rounded-lg whitespace-pre-wrap text-on-surface-variant">
                                    {result.output || 'No output.'}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full text-slate-500 text-sm font-mono italic">
                                Submit code to see execution results here...
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Right: Performance & AI Insights */}
            <section className="w-72 hidden xl:flex flex-col gap-2">
                {/* AI Insight Card */}
                <div className="bg-surface-container-high rounded-xl p-5 relative overflow-hidden border border-outline-variant/5 glass-edge group hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                        <span className="material-symbols-outlined text-4xl text-primary">auto_awesome</span>
                    </div>
                    <div className="relative z-10">
                        <div className="text-[10px] font-bold text-primary mb-3 flex items-center gap-1 uppercase tracking-widest">
                            <span className="material-symbols-outlined text-sm">bolt</span> AI RECOMMENDATION
                        </div>
                        <h4 className="text-sm font-bold mb-2 text-white">Optimize Space</h4>
                        <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                            Your current approach uses <span className="text-on-surface font-semibold">O(m+n)</span> space. Consider a binary search partition to achieve <span className="text-on-surface font-semibold">O(1)</span> space complexity.
                        </p>
                    </div>
                </div>

                {/* Skill Progress */}
                <div className="bg-surface-container-low rounded-xl p-5 flex-1 border border-outline-variant/5">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">Topic Mastery</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-[10px] font-bold mb-2">
                                <span className="text-on-surface-variant">Binary Search</span>
                                <span className="text-tertiary">84%</span>
                            </div>
                            <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full bg-tertiary shadow-[0_0_8px_#89ceff]" style={{width: '84%'}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] font-bold mb-2">
                                <span className="text-on-surface-variant">Arrays</span>
                                <span className="text-primary">92%</span>
                            </div>
                            <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full bg-primary shadow-[0_0_8px_#c3c0ff]" style={{width: '92%'}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] font-bold mb-2">
                                <span className="text-on-surface-variant">Complexity Analysis</span>
                                <span className="text-secondary">67%</span>
                            </div>
                            <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full bg-secondary shadow-[0_0_8px_#d0bcff]" style={{width: '67%'}}></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-outline-variant/10">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Upcoming Goals</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-surface-container-lowest/50 border border-outline-variant/5">
                                <span className="material-symbols-outlined text-sm text-tertiary">trophy</span>
                                <div className="text-[10px] font-semibold text-slate-300">Solve 5 Hard Problems</div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-surface-container-lowest/50 border border-outline-variant/5">
                                <span className="material-symbols-outlined text-sm text-on-surface-variant">schedule</span>
                                <div className="text-[10px] font-semibold text-slate-300">Maintain 7-day Streak</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Global Leaderboard Hook */}
                <div className="mt-auto py-2 flex justify-center shrink-0">
                    <button className="text-[10px] font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest">
                        View Global Leaderboard <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
