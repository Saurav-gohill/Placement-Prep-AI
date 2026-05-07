import React, { useState } from 'react';
import TopNavBar from '../components/layout/TopNavBar';
import Footer from '../components/layout/Footer';
import { FloatingShapes, GlowOrbs, ParticleField } from '../components/animations/Animations3D';
import { Link } from 'react-router-dom';

const categories = ['All', 'Interview Prep', 'Resume Tips', 'Coding', 'Career Growth', 'Aptitude'];

const resources = [
  {
    title: 'The Ultimate FAANG Interview Playbook',
    category: 'Interview Prep',
    type: 'Guide',
    icon: 'menu_book',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    description: 'A comprehensive 40-page guide covering behavioral, system design, and coding rounds at Google, Meta, Amazon, Apple, and Netflix.',
    readTime: '40 min read',
    tag: 'Most Popular',
  },
  {
    title: 'ATS-Proof Resume Template Pack',
    category: 'Resume Tips',
    type: 'Template',
    icon: 'description',
    color: 'text-tertiary',
    bgColor: 'bg-tertiary/10',
    description: 'Download our professionally designed resume templates optimized for ATS systems. Includes SDE, Data Science, PM, and DevOps variants.',
    readTime: '5 min setup',
    tag: 'Free Download',
  },
  {
    title: 'DSA Roadmap: 0 to Placement Ready',
    category: 'Coding',
    type: 'Roadmap',
    icon: 'route',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    description: 'A structured 12-week plan covering Arrays, Trees, Graphs, DP, and advanced topics. Includes daily problem sets and milestone checkpoints.',
    readTime: '12 weeks',
    tag: 'Roadmap',
  },
  {
    title: 'Behavioral Interview: STAR Method Masterclass',
    category: 'Interview Prep',
    type: 'Video',
    icon: 'play_circle',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    description: 'Learn how to structure your answers using the STAR method with real examples from candidates who cracked Amazon and Microsoft interviews.',
    readTime: '28 min video',
    tag: 'Video',
  },
  {
    title: 'Salary Negotiation Cheat Sheet',
    category: 'Career Growth',
    type: 'Guide',
    icon: 'payments',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    description: 'Data-backed strategies for negotiating your offer. Includes scripts, counter-offer templates, and compensation benchmarks for Indian tech market.',
    readTime: '15 min read',
    tag: 'Essential',
  },
  {
    title: 'Quantitative Aptitude Formula Book',
    category: 'Aptitude',
    type: 'Reference',
    icon: 'calculate',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    description: 'Quick-reference formula book covering Probability, Permutations, Time & Work, Profit & Loss, and Logical Reasoning patterns.',
    readTime: '10 min read',
    tag: 'Quick Ref',
  },
  {
    title: 'System Design Interview Bible',
    category: 'Interview Prep',
    type: 'Guide',
    icon: 'architecture',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    description: 'Deep dive into designing scalable systems — URL shorteners, chat apps, news feeds. Covers CAP theorem, sharding, caching, and load balancing.',
    readTime: '35 min read',
    tag: 'Advanced',
  },
  {
    title: 'Top 50 Most-Asked Coding Questions',
    category: 'Coding',
    type: 'Problem Set',
    icon: 'code',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    description: 'Curated from 10,000+ interview reports. Includes Two Sum, LRU Cache, Merge Intervals, and more — with solution walkthroughs and complexity analysis.',
    readTime: '20+ problems',
    tag: 'Must Solve',
  },
  {
    title: 'LinkedIn Profile Optimization Guide',
    category: 'Career Growth',
    type: 'Guide',
    icon: 'person_search',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    description: 'Transform your LinkedIn profile to attract recruiters. Learn headline formulas, about section templates, and content strategies that get noticed.',
    readTime: '12 min read',
    tag: 'Career',
  },
];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? resources
    : resources.filter(r => r.category === activeCategory);

  return (
    <div className="selection:bg-primary-container selection:text-white flex flex-col min-h-screen">
      <TopNavBar />

      <main className="relative flex-grow">
        {/* Hero */}
        <section className="relative pt-32 pb-16 hero-gradient overflow-hidden">
          <FloatingShapes variant="hero" />
          <ParticleField count={20} />
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container-high glass-edge text-primary text-xs font-bold tracking-widest uppercase mb-6 anim-fade-in-up anim-delay-1">
                Knowledge Hub
              </span>
              <h1 className="text-5xl lg:text-7xl font-headline font-extrabold tracking-tight text-on-surface mb-6 anim-fade-in-up anim-delay-2">
                Career <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-tertiary">Resources</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed anim-fade-in-up anim-delay-3">
                Free guides, templates, roadmaps, and video masterclasses curated by industry experts and top-placed alumni.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="sticky top-0 z-30 bg-[#0b1326]/80 backdrop-blur-xl border-b border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-8 py-4 flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-headline text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-surface-container-low text-slate-400 hover:text-white hover:bg-surface-container-high glass-edge'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-16 max-w-7xl mx-auto px-8 relative">
          <GlowOrbs count={2} />

          {/* Featured resource (first one) */}
          {activeCategory === 'All' && (
            <div className="mb-12 relative z-10">
              <div className="bg-gradient-to-br from-surface-container-high to-surface-container-low rounded-2xl p-10 glass-edge grid lg:grid-cols-2 gap-10 items-center anim-fade-in-up anim-delay-1 anim-hover-lift">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-primary/20">Featured</span>
                    <span className="text-on-surface-variant text-xs">Guide • 40 min read</span>
                  </div>
                  <h2 className="font-headline text-3xl font-bold text-white mb-4">{resources[0].title}</h2>
                  <p className="text-on-surface-variant leading-relaxed mb-8">{resources[0].description}</p>
                  <button className="px-8 py-3 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl font-headline font-bold text-white shadow-lg hover:scale-105 transition-transform active:scale-95">
                    Read Now
                  </button>
                </div>
                <div className="hidden lg:flex items-center justify-center">
                  <div className="relative">
                    <div className="w-48 h-64 bg-surface-container-highest rounded-xl glass-edge flex items-center justify-center rotate-3 shadow-2xl">
                      <span className="material-symbols-outlined text-primary text-7xl opacity-30">menu_book</span>
                    </div>
                    <div className="w-48 h-64 bg-surface-container-low rounded-xl glass-edge flex items-center justify-center -rotate-6 absolute top-4 left-8 shadow-2xl">
                      <span className="material-symbols-outlined text-tertiary text-6xl opacity-20">auto_stories</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {filtered.map((res, i) => (
              <div
                key={i}
                className={`bg-surface-container-low rounded-xl p-8 glass-edge flex flex-col justify-between group cursor-pointer anim-fade-in-up anim-delay-${(i % 3) + 1} anim-hover-lift`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl ${res.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <span className={`material-symbols-outlined ${res.color} text-2xl`}>{res.icon}</span>
                    </div>
                    <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase">{res.tag}</span>
                  </div>
                  <h3 className="font-headline text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{res.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{res.description}</p>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-outline-variant/15">
                  <div className="flex items-center gap-2">
                    <span className="bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded text-[9px] font-bold uppercase">{res.type}</span>
                    <span className="text-on-surface-variant text-xs">{res.readTime}</span>
                  </div>
                  <span className="material-symbols-outlined text-primary text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-8">
            <div className="relative bg-gradient-to-br from-[#131b2e] to-[#0b1326] rounded-3xl p-12 lg:p-16 glass-edge overflow-hidden shadow-2xl">
              <FloatingShapes variant="minimal" />
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-headline font-bold mb-4">Stay ahead of the curve</h2>
                  <p className="text-on-surface-variant">Get weekly placement tips, new resources, and career insights delivered to your inbox.</p>
                </div>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-surface-container-lowest border-none rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-primary outline-none placeholder:text-outline/50"
                  />
                  <button className="px-6 py-4 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl font-headline font-bold text-white shadow-lg hover:scale-105 transition-transform active:scale-95 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
