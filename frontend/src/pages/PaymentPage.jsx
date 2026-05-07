import React, { useState } from 'react';
import SideNavBar from '../components/layout/SideNavBar';
import { useAuth } from '../context/AuthContext';
import { FloatingShapes, GlowOrbs, ParticleField } from '../components/animations/Animations3D';

export default function PaymentPage() {
  const { user } = useAuth();
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) return cleaned.slice(0, 2) + ' / ' + cleaned.slice(2);
    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPaymentComplete(true);
    setIsProcessing(false);
  };

  if (paymentComplete) {
    return (
      <div className="flex bg-background min-h-screen text-on-surface">
        <SideNavBar />
        <main className="md:ml-64 flex-1 flex flex-col min-h-screen items-center justify-center px-6 relative">
          <FloatingShapes variant="minimal" />
          <ParticleField count={15} />
          <div className="text-center max-w-md relative z-10 anim-fade-in-scale">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-container to-secondary-container flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary-container/30">
              <span className="material-symbols-outlined text-white text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
            </div>
            <h1 className="font-headline text-4xl font-bold text-white mb-4">Payment Successful!</h1>
            <p className="text-on-surface-variant text-lg mb-8">Welcome to Pro Prep. You now have full access to all AI-powered placement tools.</p>
            <a href="/dashboard" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container px-8 py-4 rounded-xl text-white font-headline font-bold hover:brightness-110 transition-all">
              Go to Dashboard
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-background min-h-screen text-on-surface">
      <SideNavBar />

      <main className="md:ml-64 flex-1 flex flex-col min-h-screen overflow-y-auto no-scrollbar relative">
        <FloatingShapes variant="ambient" />
        <GlowOrbs count={3} />
        {/* Main Content */}
        <div className="flex-grow w-full max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Order Summary */}
            <div className="lg:col-span-5 space-y-8 anim-slide-in-left anim-delay-1">
              <div>
                <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4">Complete your <span className="text-primary">Upgrade</span></h1>
                <p className="text-on-surface-variant text-lg">Invest in your career with our precision-engineered AI placement platform.</p>
              </div>

              <div className="bg-surface-container-low rounded-xl p-8 glass-edge relative overflow-hidden anim-hover-lift">
                <div className="absolute top-0 right-0 p-4">
                  <span className="bg-tertiary-container text-on-tertiary-container text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                </div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="font-headline text-2xl font-bold text-white">Pro Prep Annual</h2>
                    <p className="text-on-surface-variant text-sm">Full access to AI capabilities</p>
                  </div>
                  <div className="text-right">
                    <span className="font-headline text-3xl font-extrabold text-white">$99</span>
                    <span className="text-on-surface-variant block text-sm">/ year</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {['Unlimited Mock Interviews', 'Real-time AI Performance Analytics', 'Company-specific Prep Paths', 'Resume Optimization & Scoring'].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                      <span className="text-sm text-on-surface">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-outline-variant/15">
                  <div className="flex gap-2">
                    <input
                      className="flex-grow bg-surface-container-highest border-none rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-primary outline-none placeholder:text-outline"
                      placeholder="Discount Code"
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <button className="bg-surface-bright text-on-surface px-6 py-3 rounded-xl text-sm font-semibold glass-edge hover:bg-surface-container-high transition-colors">Apply</button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 p-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-gradient-to-br from-primary-container to-tertiary-container flex items-center justify-center text-white font-bold text-xs">A</div>
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-gradient-to-br from-secondary-container to-primary-container flex items-center justify-center text-white font-bold text-xs">R</div>
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-gradient-to-br from-tertiary-container to-secondary-container flex items-center justify-center text-white font-bold text-xs">M</div>
                </div>
                <div>
                  <p className="font-headline font-bold text-white">Trusted by 50,000+ students</p>
                  <p className="text-on-surface-variant text-xs">Join the top 1% of candidates worldwide.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Payment Form */}
            <div className="lg:col-span-7 anim-slide-in-right anim-delay-2">
              <div className="bg-surface-container-high rounded-xl p-8 md:p-12 glass-edge shadow-[0px_24px_48px_rgba(0,0,0,0.4)] anim-hover-lift">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-headline text-2xl font-semibold text-white">Payment Details</h3>
                  <div className="flex gap-3 items-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-2xl">credit_card</span>
                    <span className="material-symbols-outlined text-on-surface-variant text-2xl">account_balance</span>
                    <span className="material-symbols-outlined text-on-surface-variant text-2xl">currency_bitcoin</span>
                  </div>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Cardholder Name</label>
                    <input
                      className="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-primary outline-none transition-shadow placeholder:text-outline/50"
                      placeholder="e.g. Alexander Pierce"
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Card Number</label>
                    <div className="relative">
                      <input
                        className="w-full bg-surface-container-low border-none rounded-xl pl-5 pr-12 py-4 text-white font-mono focus:ring-2 focus:ring-primary outline-none transition-shadow placeholder:text-outline/50"
                        placeholder="•••• •••• •••• ••••"
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                        required
                      />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">lock</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Expiry Date</label>
                      <input
                        className="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-primary outline-none transition-shadow placeholder:text-outline/50"
                        placeholder="MM / YY"
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        maxLength={7}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">CVC</label>
                      <div className="relative">
                        <input
                          className="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-primary outline-none transition-shadow placeholder:text-outline/50"
                          placeholder="•••"
                          type="text"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          maxLength={3}
                          required
                        />
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" title="3-digit security code">help_outline</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center gap-3 mb-8">
                      <input
                        className="rounded bg-surface-container-low border-outline-variant text-primary-container focus:ring-primary-container focus:ring-offset-background"
                        id="save-card"
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                      />
                      <label className="text-sm text-on-surface-variant" htmlFor="save-card">Save card information for future renewals</label>
                    </div>

                    <button
                      className="w-full bg-gradient-to-r from-primary-container to-secondary-container py-5 rounded-xl text-white font-headline font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Complete Purchase</span>
                          <span className="material-symbols-outlined">arrow_forward</span>
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-on-surface-variant mt-6 flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-xs">shield_lock</span>
                      Encrypted 256-bit secure checkout
                    </p>
                  </div>
                </form>
              </div>

              <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                <div className="flex items-center gap-4 text-on-surface-variant">
                  <span className="material-symbols-outlined text-3xl">verified</span>
                  <div>
                    <p className="text-sm font-semibold text-white">Money-Back Guarantee</p>
                    <p className="text-xs">No questions asked within 7 days.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-on-surface-variant">
                  <span className="material-symbols-outlined text-3xl">chat_bubble</span>
                  <div>
                    <p className="text-sm font-semibold text-white">24/7 Expert Support</p>
                    <p className="text-xs">Always here to help you succeed.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
