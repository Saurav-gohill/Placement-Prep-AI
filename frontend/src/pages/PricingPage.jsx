import React from 'react';
import TopNavBar from '../components/layout/TopNavBar';
import Footer from '../components/layout/Footer';
import { FloatingShapes, GlowOrbs, ParticleField } from '../components/animations/Animations3D';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free Starter',
    price: '$0',
    period: 'forever',
    description: 'Perfect for exploring the platform and getting started with basic prep.',
    features: [
      '3 Mock Interviews/month',
      'Basic Resume Scan',
      '10 Coding Problems',
      'Limited Aptitude Tests',
      'Community Forums',
    ],
    missing: [
      'AI Performance Analytics',
      'Company-specific Prep',
      'Priority Support',
    ],
    cta: 'Get Started Free',
    ctaLink: '/signup',
    style: 'bg-surface-container-low glass-edge',
    ctaStyle: 'bg-surface-bright/50 glass-edge text-on-surface hover:bg-surface-bright',
    badge: null,
  },
  {
    name: 'Pro Prep',
    price: '$99',
    period: '/ year',
    description: 'Unlock the full AI suite — the most popular choice for serious candidates.',
    features: [
      'Unlimited Mock Interviews',
      'Advanced Resume Analyzer + ATS Scoring',
      'Full Coding Sandbox (20+ languages)',
      'Unlimited Aptitude Practice',
      'Real-time AI Performance Analytics',
      'Company-specific Prep Paths',
      'Career Roadmap Generator',
      'Resume Optimization Engine',
      'Priority Email Support',
    ],
    missing: [],
    cta: 'Upgrade to Pro',
    ctaLink: '/payment',
    style: 'bg-gradient-to-br from-surface-container-high to-surface-container-low glass-edge ring-2 ring-primary/30',
    ctaStyle: 'bg-gradient-to-r from-primary-container to-secondary-container text-white shadow-xl shadow-primary-container/25',
    badge: 'Most Popular',
  },
  {
    name: 'Campus Elite',
    price: '$249',
    period: '/ year',
    description: 'For colleges and placement cells managing cohorts of 50+ students.',
    features: [
      'Everything in Pro Prep',
      'Cohort Management Dashboard',
      'Bulk Student Onboarding',
      'Placement Cell Analytics',
      'Custom Branding',
      'API Access',
      'Dedicated Account Manager',
      '24/7 Phone + Chat Support',
    ],
    missing: [],
    cta: 'Contact Sales',
    ctaLink: '#',
    style: 'bg-surface-container-low glass-edge',
    ctaStyle: 'bg-surface-bright/50 glass-edge text-on-surface hover:bg-surface-bright',
    badge: 'Enterprise',
  },
];

const faqs = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes! You can upgrade or downgrade at any time. When upgrading, you pay the prorated difference. Downgrades take effect at the end of your billing cycle.',
  },
  {
    q: 'Is there a money-back guarantee?',
    a: 'Absolutely. We offer a 7-day no-questions-asked refund policy on all paid plans. If you\'re not satisfied, contact us for a full refund.',
  },
  {
    q: 'Do you offer student discounts?',
    a: 'Yes! Students with a valid .edu email get 30% off Pro Prep. Use code STUDENT30 at checkout.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit/debit cards, UPI, net banking, and PayPal. Enterprise plans can use invoice-based billing.',
  },
];

export default function PricingPage() {
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
              Simple, Transparent Pricing
            </span>
            <h1 className="text-5xl lg:text-7xl font-headline font-extrabold tracking-tight text-on-surface mb-6 anim-fade-in-up anim-delay-2">
              Invest in Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Career</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed anim-fade-in-up anim-delay-3">
              Choose the plan that fits your preparation timeline. All plans include access to our core AI platform.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-8 pb-24">
          <GlowOrbs count={3} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 lg:p-10 flex flex-col ${plan.style} anim-fade-in-up anim-delay-${i + 1} anim-hover-lift relative`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-container to-secondary-container text-white px-5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="font-headline text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-on-surface-variant text-sm mb-6">{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span className="font-headline text-5xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-on-surface-variant text-sm mb-2">{plan.period}</span>
                  </div>
                </div>

                <div className="flex-grow space-y-4 mb-8">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-tertiary text-sm mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                      <span className="text-sm text-on-surface">{f}</span>
                    </div>
                  ))}
                  {plan.missing.map((m, j) => (
                    <div key={`m-${j}`} className="flex items-start gap-3 opacity-40">
                      <span className="material-symbols-outlined text-on-surface-variant text-sm mt-0.5">cancel</span>
                      <span className="text-sm text-on-surface-variant line-through">{m}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={plan.ctaLink}
                  className={`w-full py-4 rounded-xl font-headline font-bold text-center transition-all hover:scale-[1.02] active:scale-[0.98] block ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-headline font-bold text-center mb-12 anim-fade-in-up">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className={`bg-surface-container-low rounded-xl glass-edge group anim-fade-in-up anim-delay-${(i % 4) + 1}`}
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer font-headline font-semibold text-white hover:text-primary transition-colors list-none">
                  {faq.q}
                  <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-6 pb-6 text-on-surface-variant text-sm leading-relaxed -mt-2">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-8">
            <div className="relative bg-gradient-to-br from-[#131b2e] to-[#0b1326] rounded-3xl p-12 lg:p-16 text-center glass-edge overflow-hidden shadow-2xl">
              <FloatingShapes variant="minimal" />
              <h2 className="text-3xl lg:text-4xl font-headline font-bold mb-6 relative z-10">Still not sure?</h2>
              <p className="text-on-surface-variant text-lg max-w-xl mx-auto mb-10 relative z-10">Start with the free plan. No credit card required. Upgrade when you're ready.</p>
              <Link to="/signup" className="px-10 py-4 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl font-headline font-bold text-white shadow-xl shadow-primary-container/25 hover:scale-105 transition-transform active:scale-95 inline-block relative z-10">
                Start Free — No Card Needed
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
