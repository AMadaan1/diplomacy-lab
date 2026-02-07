
import React, { useState, useEffect, useRef } from 'react';
import { ServiceTier } from '../types';
import CheckoutModal from './CheckoutModal';

const TIERS: ServiceTier[] = [
  { price: '$5', deadline: 'Within 21 Days', description: 'Early-bird review for proactive delegates looking for foundational polish and basic grammar alignment.' },
  { price: '$10', deadline: 'Within 11 Days', description: 'Standard review for refined arguments, structural improvements, and better source integration.' },
  { price: '$15', deadline: 'Within 7 Days', description: 'Expedited review for tight schedules. Deep dive into policy accuracy and advanced rhetorical framing.' },
  { price: '$20', deadline: 'Within 5 Days', description: 'Emergency feedback. Strategic pivot advice and high-intensity structural optimization.' },
];

const ConsultingPage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<number>(2);
  const [checkoutConfig, setCheckoutConfig] = useState<{isOpen: boolean; service: string; price: string}>({
    isOpen: false,
    service: '',
    price: ''
  });

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const handleBookFeedback = () => {
    setCheckoutConfig({
      isOpen: true,
      service: `Consulting: ${TIERS[selectedTier].deadline} Review`,
      price: TIERS[selectedTier].price
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="py-32 bg-slate-50 relative overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-24 reveal">
            <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Premium Intelligence</span>
            <h1 className="text-7xl md:text-[8rem] font-bold text-slate-900 mb-10 tracking-tighter leading-[0.9]">The Feedback <br/>Standard.</h1>
            <p className="text-2xl md:text-3xl text-slate-700 max-w-3xl font-light leading-tight">
              A dual-expert framework for delegates who demand more than generic critique. We provide tactical surgical reviews.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"></div>
        </div>
      </section>

      {/* The Methodology */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="reveal">
              <div className="text-4xl mb-8">⚖️</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Structural Rigor</h3>
              <p className="text-slate-700 font-light leading-relaxed">We analyze your paper’s logical flow, ensuring resolutions are grounded in actionable, sovereign-aligned policy.</p>
            </div>
            <div className="reveal" style={{ transitionDelay: '100ms' }}>
              <div className="text-4xl mb-8">⚡</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Rhetorical Impact</h3>
              <p className="text-slate-700 font-light leading-relaxed">Moving beyond dry data. We inject persuasive markers and linguistic pivots that capture chair attention instantly.</p>
            </div>
            <div className="reveal" style={{ transitionDelay: '200ms' }}>
              <div className="text-4xl mb-8">🛡️</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Policy Defense</h3>
              <p className="text-slate-700 font-light leading-relaxed">Anticipating counter-arguments. Our reviews highlight weak points in your stance before opposing delegates do.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Selection */}
      <section className="py-40 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-32 reveal">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-slate-900">Strategic Review Tiers</h2>
            <p className="text-slate-700 text-xl max-w-2xl mx-auto font-light">Select the turnaround time that matches your conference cycle.</p>
          </div>
          
          <div className="max-w-6xl mx-auto reveal">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-16 pb-6 px-3 bg-slate-100 rounded-[4rem] border border-slate-200">
              {TIERS.map((tier, idx) => (
                <button 
                  key={tier.deadline} 
                  onClick={() => setSelectedTier(idx)}
                  className={`tier-button relative p-10 rounded-[3.5rem] text-left group transition-all duration-300 ${
                    selectedTier === idx 
                    ? 'bg-white shadow-[0_40px_80px_rgba(0,0,0,0.12)] scale-[1.03] z-20 border border-slate-200' 
                    : 'hover:bg-white/60 border border-transparent'
                  }`}
                >
                  <span className={`text-[9px] font-black uppercase tracking-[0.3em] block mb-6 ${selectedTier === idx ? 'text-blue-600' : 'text-slate-500'}`}>
                    {tier.deadline}
                  </span>
                  <div className="mb-8">
                    <span className={`text-6xl font-black tracking-tighter ${selectedTier === idx ? 'text-slate-900' : 'text-slate-700'}`}>{tier.price}</span>
                  </div>
                  <p className={`text-base leading-snug font-light ${selectedTier === idx ? 'text-slate-700' : 'text-slate-600'}`}>
                    {tier.description}
                  </p>
                </button>
              ))}
            </div>
            
            <div className="mt-16 bg-slate-900 text-white p-14 md:p-20 rounded-[4rem] flex flex-col lg:flex-row items-center justify-between gap-12 reveal shadow-2xl relative overflow-hidden group">
              <div className="text-left relative z-10">
                <h4 className="font-bold text-4xl tracking-tighter mb-4 text-white">Ready for Analysis</h4>
                <p className="text-slate-300 text-xl font-light max-w-md leading-relaxed">
                  Partner-led review for <span className="text-blue-400 font-bold">{TIERS[selectedTier].deadline}</span> deadline.
                </p>
              </div>
              <button 
                onClick={handleBookFeedback}
                className="w-full lg:w-auto px-14 py-8 bg-white text-slate-900 font-bold rounded-full hover:bg-blue-600 hover:text-white hover:scale-[1.02] active:scale-95 transition-all text-2xl shadow-xl"
              >
                Secure Feedback ({TIERS[selectedTier].price})
              </button>
            </div>
          </div>
        </div>
      </section>

      <CheckoutModal 
        isOpen={checkoutConfig.isOpen} 
        onClose={() => setCheckoutConfig({ ...checkoutConfig, isOpen: false })}
        serviceName={checkoutConfig.service}
        price={checkoutConfig.price}
      />
    </div>
  );
};

export default ConsultingPage;
