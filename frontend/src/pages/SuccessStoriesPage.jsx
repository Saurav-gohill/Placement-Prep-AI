import React from 'react';
import TopNavBar from '../components/layout/TopNavBar';
import Footer from '../components/layout/Footer';
import { FloatingShapes, GlowOrbs, ParticleField } from '../components/animations/Animations3D';
import { Link } from 'react-router-dom';

const stories = [
  {
    name: 'Aarav Sharma',
    role: 'Software Engineer',
    company: 'Google',
    image: 'A',
    color: 'from-primary-container to-secondary-container',
    quote: 'PlacementAI completely transformed my interview prep. The AI mock interviews felt incredibly real — the questions were exactly what I faced at Google. I went from failing whiteboard rounds to receiving an L4 offer in just 3 months.',
    stats: { ats: 96, interviews: 42, offers: 3 },
    badge: 'FAANG',
  },
  {
    name: 'Priya Menon',
    role: 'Data Scientist',
    company: 'Meta',
    image: 'P',
    color: 'from-secondary-container to-tertiary-container',
    quote: 'The resume analyzer boosted my ATS score from 52 to 94. Within two weeks of optimization, I started getting callbacks from companies I thought were out of reach. The coding sandbox is exceptional for DS&A practice.',
    stats: { ats: 94, interviews: 28, offers: 4 },
    badge: 'Data Science',
  },
  {
    name: 'Rohan Patel',
    role: 'Frontend Developer',
    company: 'Netflix',
    image: 'R',
    color: 'from-tertiary-container to-primary-container',
    quote: 'As a tier-3 college graduate, I thought Netflix was impossible. The aptitude training sharpened my logical reasoning, and the interview simulator gave me the confidence I needed. Surreal feeling to get that offer email.',
    stats: { ats: 91, interviews: 35, offers: 2 },
    badge: 'Top Performer',
  },
  {
    name: 'Sneha Gupta',
    role: 'Backend Engineer',
    company: 'Amazon',
    image: 'S',
    color: 'from-primary-container to-tertiary-container',
    quote: 'The coding practice module with its hint system is brilliant. I solved 200+ problems in 6 weeks. The behavioral interview prep specifically designed for Amazon Leadership Principles was a game-changer.',
    stats: { ats: 89, interviews: 50, offers: 5 },
    badge: 'Most Active',
  },
  {
    name: 'Karthik Rajan',
    role: 'ML Engineer',
    company: 'Microsoft',
    image: 'K',
    color: 'from-secondary-container to-primary-container',
    quote: 'I credit PlacementAI for my career switch from mechanical engineering to ML. The AI-driven analytics showed me exactly where to focus my preparation. The personalized career roadmap is incredibly detailed.',
    stats: { ats: 92, interviews: 30, offers: 3 },
    badge: 'Career Switch',
  },
  {
    name: 'Divya Nair',
    role: 'Product Manager',
    company: 'Flipkart',
    image: 'D',
    color: 'from-tertiary-container to-secondary-container',
    quote: 'Even for non-tech roles, the platform is phenomenal. Mock interviews adapted to PM case studies, and the resume feedback was laser-precise about what hiring managers look for. Got placed with a 45% salary bump.',
    stats: { ats: 88, interviews: 22, offers: 2 },
    badge: 'Non-Tech',
  },
];

const metrics = [
  { value: '50,000+', label: 'Students Placed', icon: 'school' },
  { value: '94%', label: 'Avg ATS Improvement', icon: 'trending_up' },
  { value: '3.2x', label: 'More Interview Calls', icon: 'call' },
  { value: '89%', label: 'Offer Success Rate', icon: 'verified' },
];

export default function SuccessStoriesPage() {
  return (
    <div className="selection:bg-primary-container selection:text-white flex flex-col min-h-screen">
      <TopNavBar />

      <main className="relative flex-grow">
        {/* Hero */}
        <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
          <FloatingShapes variant="hero" />
          <ParticleField count={20} />
          <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container-high glass-edge text-primary text-xs font-bold tracking-widest uppercase mb-6 anim-fade-in-up anim-delay-1">
              Real Results. Real Careers.
            </span>
            <h1 className="text-5xl lg:text-7xl font-headline font-extrabold tracking-tight text-on-surface mb-6 anim-fade-in-up anim-delay-2">
              Success <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Stories</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed anim-fade-in-up anim-delay-3">
              From first-generation graduates to career switchers — hear how PlacementAI helped 50,000+ students land roles at the world's best companies.
            </p>
          </div>
        </section>

        {/* Metrics Bar */}
        <section className="relative -mt-10 z-20 max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <div key={i} className={`bg-surface-container-high rounded-xl p-6 glass-edge text-center anim-fade-in-up anim-delay-${i + 1} anim-hover-lift`}>
                <span className="material-symbols-outlined text-primary text-2xl mb-2">{m.icon}</span>
                <p className="font-headline text-3xl font-extrabold text-white">{m.value}</p>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stories Grid */}
        <section className="py-24 max-w-7xl mx-auto px-8 relative">
          <GlowOrbs count={3} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {stories.map((story, i) => (
              <div
                key={i}
                className={`bg-surface-container-low rounded-xl p-8 glass-edge flex flex-col justify-between anim-fade-in-up anim-delay-${(i % 3) + 1} anim-hover-lift group`}
              >
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${story.color} flex items-center justify-center text-white font-headline font-bold text-xl shadow-lg`}>
                        {story.image}
                      </div>
                      <div>
                        <p className="font-headline font-bold text-white text-lg">{story.name}</p>
                        <p className="text-on-surface-variant text-xs">{story.role} @ <span className="text-primary font-semibold">{story.company}</span></p>
                      </div>
                    </div>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border border-primary/20">{story.badge}</span>
                  </div>

                  {/* Quote */}
                  <div className="relative mb-8">
                    <span className="material-symbols-outlined text-primary/20 text-6xl absolute -top-4 -left-2">format_quote</span>
                    <p className="text-on-surface-variant text-sm leading-relaxed pl-6 italic">{story.quote}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4 pt-6 border-t border-outline-variant/15">
                  <div className="flex-1 text-center">
                    <p className="font-headline font-extrabold text-white text-xl">{story.stats.ats}%</p>
                    <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">ATS Score</p>
                  </div>
                  <div className="w-[1px] bg-outline-variant/20"></div>
                  <div className="flex-1 text-center">
                    <p className="font-headline font-extrabold text-white text-xl">{story.stats.interviews}</p>
                    <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Mocks Done</p>
                  </div>
                  <div className="w-[1px] bg-outline-variant/20"></div>
                  <div className="flex-1 text-center">
                    <p className="font-headline font-extrabold text-tertiary text-xl">{story.stats.offers}</p>
                    <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Offers</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-8">
            <div className="relative bg-gradient-to-br from-[#131b2e] to-[#0b1326] rounded-3xl p-12 lg:p-16 text-center glass-edge overflow-hidden shadow-2xl">
              <FloatingShapes variant="minimal" />
              <h2 className="text-3xl lg:text-4xl font-headline font-bold mb-6 relative z-10">Write your own success story</h2>
              <p className="text-on-surface-variant text-lg max-w-xl mx-auto mb-10 relative z-10">Join thousands who've transformed their careers with AI-powered preparation.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <Link to="/signup" className="px-10 py-4 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl font-headline font-bold text-white shadow-xl shadow-primary-container/25 hover:scale-105 transition-transform active:scale-95">
                  Start Free Trial
                </Link>
                <Link to="/pricing" className="px-10 py-4 bg-surface-bright/50 glass-edge rounded-xl font-headline font-bold text-on-surface hover:bg-surface-bright transition-all active:scale-95">
                  View Plans
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
