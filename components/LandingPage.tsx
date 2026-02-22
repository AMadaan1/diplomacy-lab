import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ServiceTier } from '../types';
import CheckoutModal from './CheckoutModal';

const TIERS: ServiceTier[] = [
  { price: '$5', deadline: 'Within 21 Days', description: 'Early-bird review for proactive delegates looking for foundational polish and basic grammar alignment.' },
  { price: '$10', deadline: 'Within 11 Days', description: 'Standard review for refined arguments, structural improvements, and better source integration.' },
  { price: '$15', deadline: 'Within 7 Days', description: 'Expedited review for tight schedules. Deep dive into policy accuracy and advanced rhetorical framing.' },
  { price: '$20', deadline: 'Within 5 Days', description: 'Emergency feedback. Strategic pivot advice and high-intensity structural optimization.' },
];

const LandingPage: React.FC = () => {
  const [checkoutConfig, setCheckoutConfig] = useState<{isOpen: boolean; service: string; price: string}>({
    isOpen: false,
    service: '',
    price: ''
  });

  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;
      
      const heroProgress = Math.min(1, scrolled / (vh * 0.8));
      document.documentElement.style.setProperty('--scroll-p', heroProgress.toString());

      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = Math.max(0, 1 - heroProgress * 6).toString();
        scrollIndicatorRef.current.style.transform = `translateX(-50%) translateY(${heroProgress * 60}px)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll(); 

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const handleBookFeedback = (idx: number) => {
    setCheckoutConfig({
      isOpen: true,
      service: `Consulting: ${TIERS[idx].deadline} Review`,
      price: TIERS[idx].price
    });
  };

  return (
    <div className="flex flex-col bg-black text-white selection:bg-blue-500 selection:text-white min-h-screen">
      
      {/* SECTION 1: HERO */}
      <section className="relative h-[150vh] z-0">
        <div className="hero-sticky gpu bg-black">
          {/* Cursor Light Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30"></div>
            <div 
              className="absolute w-[800px] h-[800px] bg-blue-600/25 blur-[120px] rounded-full mix-blend-screen transition-opacity duration-500"
              style={{ 
                left: 'var(--mouse-x)', 
                top: 'var(--mouse-y)', 
                transform: 'translate(-50%, -50%)',
                willChange: 'left, top'
              }}
            ></div>
          </div>

          <div 
            ref={heroContentRef}
            className="apple-transform relative z-10 text-center px-4 flex flex-col items-center justify-center max-w-6xl w-full pb-16 sm:pb-24 lg:pb-32 pt-32 sm:pt-40"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.5em] mb-4 sm:mb-8 border border-blue-500/20 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Established 2026
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-bold tracking-tighter leading-none mb-6 lg:mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 text-white">
              Diplomacy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white italic">Reimagined.</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-slate-300 max-w-2xl mx-auto font-light leading-snug mb-8 lg:mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 px-4">
              Technical literacy and expert strategic analysis for the next generation of global leaders.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-6 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300 px-6">
              <Link to="/consulting" className="group bg-white text-black px-8 lg:px-12 py-3 lg:py-5 rounded-full font-bold text-sm lg:text-lg hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3">
                Receive Consulting
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link to="/classes" className="bg-white/5 backdrop-blur-2xl text-white px-8 lg:px-12 py-3 lg:py-5 rounded-full font-bold text-sm lg:text-lg border border-white/10 hover:bg-white/10 transition-all hover:scale-105 flex items-center justify-center">Join a Class</Link>
            </div>

            {/* Stats Section moved to Section 2 */}
          </div>

          <div 
            ref={scrollIndicatorRef}
            className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 lg:gap-3 transition-opacity duration-300 pointer-events-none z-20"
          >
            <span className="text-[8px] lg:text-[9px] uppercase font-black tracking-[0.6em] text-white/40">Scroll to Explore</span>
            <div className="w-[1px] h-6 lg:h-10 bg-gradient-to-b from-blue-500/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE CURRICULUM */}
      <section className="relative z-10 bg-white text-slate-900 rounded-t-[4rem] md:rounded-t-[8rem] shadow-[0_-100px_100px_rgba(0,0,0,0.4)]">
        <div className="max-w-7xl mx-auto px-6 py-40 md:py-60">
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 reveal">
            <div className="bg-slate-900 p-10 rounded-[2.5rem] text-center text-white hover:scale-105 transition-transform duration-500 shadow-2xl">
               <div className="text-6xl font-black mb-4 tracking-tighter">1</div>
               <div className="text-xs uppercase tracking-[0.3em] text-blue-400 font-bold">Conference</div>
            </div>
            <div className="bg-blue-900 p-10 rounded-[2.5rem] text-center text-white hover:scale-105 transition-transform duration-500 shadow-2xl">
               <div className="text-6xl font-black mb-4 tracking-tighter">2</div>
               <div className="text-xs uppercase tracking-[0.3em] text-blue-200 font-bold">Awards</div>
            </div>
            <div className="bg-slate-900 p-10 rounded-[2.5rem] text-center text-white hover:scale-105 transition-transform duration-500 shadow-2xl">
               <div className="text-6xl font-black mb-4 tracking-tighter">1</div>
               <div className="text-xs uppercase tracking-[0.3em] text-blue-400 font-bold">Gavel</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-center">
            <div className="reveal">
              <span className="text-blue-600 font-black uppercase tracking-[0.5em] text-[10px] mb-8 block">01 / Technical Curriculum</span>
              <h2 className="text-5xl md:text-8xl font-bold mb-10 tracking-tighter leading-[1.1] text-slate-900">Architectural Advantage.</h2>
              <p className="text-slate-800 text-2xl font-light leading-relaxed mb-16">
                Model UN is no longer just a rhetorical exercise. It is a competition of data, technical strategy, and sovereign positioning. We bridge the gap between IR and computation.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "Technical Literacy", desc: "Deconstructing modern tech-policy frameworks (AI, Cyber, Energy) for committee use.", icon: "⚙️" },
                  { title: "Analytical Strategy", desc: "Using computational logic to map stakeholder positions and predict committee shifts.", icon: "📊" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-8 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 hover:shadow-xl transition-all group cursor-default">
                    <div className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-xl mb-1 text-slate-900">{item.title}</h4>
                      <p className="text-slate-700 text-sm font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link to="/classes" className="mt-16 inline-flex items-center gap-4 text-blue-700 font-bold text-xl hover:gap-6 transition-all group">
                View Full Track <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>

            <div className="relative reveal" style={{ transitionDelay: '150ms' }}>
              <div className="aspect-[4/5] bg-slate-950 rounded-[4rem] overflow-hidden relative group shadow-3xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-transparent"></div>
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center">
                    <div className="text-[10rem] mb-12 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-1000">🏛️</div>
                    <div className="text-white">
                      <h3 className="text-4xl font-bold tracking-tight mb-4 text-white">Advanced Training</h3>
                      <p className="text-slate-200 font-light text-lg">System 2 logic for high-stakes committee dynamics.</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE CONSULTING (Grid Layout) */}
      <section className="relative z-20 bg-slate-50 py-40 md:py-60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 reveal">
            <span className="text-blue-600 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">02 / Expert Consulting</span>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-slate-900 mb-6">The Feedback Standard.</h2>
            <p className="text-slate-600 text-xl md:text-2xl font-light max-w-2xl mx-auto">Surgical paper reviews by Gavel-winning veterans. Choose the tier that matches your competition cycle.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal" style={{ transitionDelay: '200ms' }}>
            {TIERS.map((tier, idx) => {
              const isPopular = tier.price === '$15';
              return (
                <div 
                  key={tier.deadline}
                  className={`group relative bg-white p-10 rounded-[3rem] border transition-all duration-500 hover:shadow-2xl flex flex-col justify-between ${
                    isPopular ? 'border-blue-500 shadow-xl scale-[1.02]' : 'border-slate-100'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] block mb-8 text-blue-600">
                      Tier 0{idx + 1} / {tier.deadline}
                    </span>
                    <div className={`text-6xl font-black mb-8 tracking-tighter transition-colors ${isPopular ? 'text-blue-700' : 'text-slate-900'}`}>
                      {tier.price}
                    </div>
                    <p className="text-sm font-light leading-relaxed text-slate-700 mb-12">
                      {tier.description}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => handleBookFeedback(idx)}
                    className={`w-full py-5 font-bold rounded-full transition-all text-sm shadow-xl active:scale-95 ${
                      isPopular 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-slate-900 text-white hover:bg-blue-600'
                    }`}
                  >
                    Select Tier →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: THE TERMINAL */}
      <section className="relative z-30 bg-black py-60 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25rem] font-black text-white/[0.03] pointer-events-none whitespace-nowrap tracking-tighter italic gpu transition-transform duration-75"
          style={{ transform: `translate3d(calc(-50% + var(--scroll-p) * 200px), -50%, 0)` } as any}
        >
          THE TERMINAL
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="glass-card p-24 md:p-32 rounded-[5rem] text-center border-white/5 reveal group bg-white/5 backdrop-blur-xl">
            <span className="text-blue-400 font-black uppercase tracking-[0.6em] text-[10px] mb-12 block">03 / Grounded Intelligence</span>
            <h2 className="text-6xl md:text-[8rem] font-bold mb-12 tracking-tighter leading-none text-white">The Research Portal.</h2>
            <p className="text-slate-200 mb-20 max-w-2xl mx-auto text-2xl font-light leading-snug">
              Ground your research in reality. Access real-time international relations intelligence at the speed of thought.
            </p>
            
            <div className="flex flex-col items-center gap-14">
              <Link to="/research" className="bg-white text-black px-16 py-8 rounded-full font-bold text-2xl hover:bg-blue-500 hover:text-white hover:scale-110 transition-all shadow-3xl">
                Enter Research Portal
              </Link>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-3xl">
                 <div className="text-left">
                   <span className="text-white font-bold text-xl block mb-1">Gemini 3</span>
                   <p className="text-slate-500 text-[9px] uppercase tracking-widest font-black">Core Engine</p>
                 </div>
                 <div className="text-left">
                   <span className="text-white font-bold text-xl block mb-1">2026</span>
                   <p className="text-slate-500 text-[9px] uppercase tracking-widest font-black">Data Grounding</p>
                 </div>
                 <div className="text-left">
                   <span className="text-white font-bold text-xl block mb-1">$30</span>
                   <p className="text-slate-500 text-[9px] uppercase tracking-widest font-black">Lifetime Access</p>
                 </div>
                 <div className="text-left">
                   <span className="text-white font-bold text-xl block mb-1">PDF+IMG</span>
                   <p className="text-slate-500 text-[9px] uppercase tracking-widest font-black">Multimodal</p>
                 </div>
              </div>
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

export default LandingPage;
