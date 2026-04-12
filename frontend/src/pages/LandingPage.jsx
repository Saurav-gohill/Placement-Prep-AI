import React from 'react';
import TopNavBar from '../components/layout/TopNavBar';
import Footer from '../components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="selection:bg-primary-container selection:text-white flex flex-col min-h-screen">
      <TopNavBar />
      
      <main className="relative flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen pt-32 pb-20 hero-gradient">
          <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container-high glass-edge text-primary text-xs font-bold tracking-widest uppercase mb-6">
                  The Future of Recruitment
              </span>
              <h1 className="text-5xl lg:text-7xl font-headline font-extrabold tracking-tight leading-tight text-on-surface mb-8">
                  AI-Powered <br/>Placement <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Preparation</span> Platform
              </h1>
              <p className="text-lg text-on-surface-variant max-w-lg mb-10 leading-relaxed">
                  Elevate your career trajectory with our predictive intelligence. Master every interview, perfect your code, and land your dream role with precision-engineered training.
              </p>
              <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl font-headline font-bold text-white transition-all hover:opacity-90 active:scale-95">
                      Start Preparation Now
                  </button>
                  <button className="px-8 py-4 bg-surface-bright/50 glass-edge rounded-xl font-headline font-bold text-on-surface hover:bg-surface-bright transition-all active:scale-95">
                      View Demo
                  </button>
              </div>
            </div>
            
            <div className="relative group hidden lg:block">
              <div className="absolute -inset-4 bg-primary-container/20 blur-3xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative aspect-square rounded-3xl overflow-hidden glass-edge surface-container-low shadow-2xl">
                  {/* Decorative 3D or visual element from original UI */}
                  <img className="w-full h-full object-cover opacity-80 mix-blend-screen" alt="Data abstract" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiv1-KgEFE7t9Zv03lswJxJnce40jn_b-Tjs2fgb8xTzr46QWIBSwZMtlXwchMJfX5LzRO4IIu48WFNNdcXPf_81RStcHd8hTGer8lRabMkLGVkb8Fnzl9F1HetNNluIvXtRid9aZl3uyVKtXYuBH4AQLWj8P5E_IIOITZmZmvI-eQbnC-qdva4jV8zRDF9HVhM2OhayL3edV9tadZTwpYuEdzqSjx-DpMVZ_VtHHzJvlFcCxCmSSJJ7aWYc-lgAr1rrXS7z2oHA4" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-24 max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-headline font-bold text-on-surface mb-4">The Predictive Toolkit</h2>
                <p className="text-on-surface-variant max-w-2xl mx-auto">Five core modules designed to simulate real-world recruitment cycles with pixel-perfect accuracy.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
                
                {/* Resume Analyzer */}
                <div className="md:col-span-7 bg-surface-container-low rounded-xl glass-edge p-8 group hover:scale-[1.02] transition-all duration-500 flex flex-col justify-between overflow-hidden relative">
                    <div className="z-10">
                        <span className="material-symbols-outlined text-4xl text-primary mb-4">description</span>
                        <h3 className="text-2xl font-headline font-bold mb-2">Resume Analyzer</h3>
                        <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">ATS-optimized scanning that scores your resume against 500+ top-tier job descriptions in seconds.</p>
                    </div>
                </div>

                {/* AI Mock Interview */}
                <div className="md:col-span-5 md:row-span-2 bg-surface-container-high rounded-xl glass-edge p-8 group hover:scale-[1.02] transition-all duration-500 flex flex-col relative overflow-hidden">
                    <span className="material-symbols-outlined text-4xl text-tertiary mb-6">settings_voice</span>
                    <h3 className="text-2xl font-headline font-bold mb-4">AI Mock Interview</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-8">Dynamic, voice-enabled AI avatars that simulate behavior-based and technical rounds with real-time sentiment analysis.</p>
                </div>

                {/* Coding Practice */}
                <div className="md:col-span-4 bg-surface-container-low rounded-xl glass-edge p-8 group hover:scale-[1.02] transition-all duration-500 flex flex-col relative overflow-hidden">
                    <span className="material-symbols-outlined text-4xl text-secondary mb-4">code</span>
                    <h3 className="text-xl font-headline font-bold mb-2">Coding Practice</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">Sandbox environment supporting 20+ languages with automated hint generation.</p>
                </div>

                {/* Aptitude */}
                <div className="md:col-span-3 bg-surface-container-low rounded-xl glass-edge p-8 group hover:scale-[1.02] transition-all duration-500 flex flex-col relative overflow-hidden">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">psychology</span>
                    <h3 className="text-xl font-headline font-bold mb-2">Aptitude</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">Quants and logical reasoning.</p>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-8">
            <div className="relative bg-gradient-to-br from-[#131b2e] to-[#0b1326] rounded-3xl p-12 lg:p-20 text-center glass-edge overflow-hidden shadow-2xl">
              <h2 className="text-4xl lg:text-5xl font-headline font-bold mb-8 relative z-10">Ready to secure your future?</h2>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-12 relative z-10 leading-relaxed">Join 50,000+ graduates who transitioned into tech roles at Google, Meta, and Netflix using our AI placement suite.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <button className="px-10 py-5 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl font-headline font-bold text-white shadow-xl shadow-primary-container/25 hover:scale-105 transition-transform active:scale-95">
                    Start Preparation Now
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
