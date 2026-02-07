
import React, { useState, useEffect, useRef } from 'react';
import CheckoutModal from './CheckoutModal';

const ClassesPage: React.FC = () => {
  const [checkoutInfo, setCheckoutInfo] = useState<{ isOpen: boolean; service: string; price: string }>({
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

  const handleRegister = (service: string, price: string) => {
    setCheckoutInfo({ isOpen: true, service, price });
  };

  return (
    <div className="bg-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-24 reveal">
          <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Academic Excellence</span>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-slate-900 tracking-tighter">Advanced Sessions</h1>
          <p className="text-xl md:text-2xl text-slate-700 max-w-3xl font-light leading-relaxed">
            Our modules integrate international relations with the technical frameworks of the modern world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* AI Classes Card */}
          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <div className="group h-full bg-slate-50 rounded-[4rem] p-12 border border-slate-200 hover:border-blue-500 transition-all duration-700 hover:shadow-2xl hover:bg-white relative overflow-hidden">
              <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">🤖</div>
              <h2 className="text-4xl font-bold mb-4 tracking-tight text-slate-900">AI: Impact & Code</h2>
              <div className="inline-block px-5 py-2 bg-blue-700 text-white text-[10px] font-black tracking-[0.2em] rounded-full uppercase mb-8">$20 Per Session</div>
              <p className="text-slate-700 text-lg leading-relaxed mb-10 font-light">
                Understanding Transformers, LLMs, and the neural architectures that are reshaping sovereign security and international labor law.
              </p>
              <ul className="space-y-4 mb-12">
                {['Architectural Logic', 'Tech-Policy Ethics', 'Framework Coding', 'Global Disruption'].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-slate-800 font-semibold text-sm">
                    <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleRegister("AI Classes: Impact & Code", "$20")}
                className="w-full py-5 bg-slate-900 text-white font-bold rounded-full hover:bg-blue-700 transition-all text-lg shadow-xl"
              >
                Register for Session
              </button>
            </div>
          </div>

          {/* Reasoning Class Card */}
          <div className="reveal" style={{ transitionDelay: '300ms' }}>
            <div className="group h-full bg-slate-50 rounded-[4rem] p-12 border border-slate-200 hover:border-indigo-500 transition-all duration-700 hover:shadow-2xl hover:bg-white relative overflow-hidden">
              <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">🧠</div>
              <h2 className="text-4xl font-bold mb-4 tracking-tight text-slate-900">Cognitive Strategy</h2>
              <div className="inline-block px-5 py-2 bg-indigo-700 text-white text-[10px] font-black tracking-[0.2em] rounded-full uppercase mb-8">$20 Per Session</div>
              <p className="text-slate-700 text-lg leading-relaxed mb-10 font-light">
                Mastering game theory and linguistic framing to dismantle opposing arguments in high-pressure committee environments.
              </p>
              <ul className="space-y-4 mb-12">
                {['Strategic Fallacies', 'Negotiation Game Theory', 'Rhetorical Proofs', 'Structural Logic'].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-slate-800 font-semibold text-sm">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleRegister("Logical & Psychological Reasoning", "$20")}
                className="w-full py-5 bg-slate-900 text-white font-bold rounded-full hover:bg-indigo-700 transition-all text-lg shadow-xl"
              >
                Join Next Session
              </button>
            </div>
          </div>
        </div>

        <div className="mt-32 p-16 md:p-24 bg-slate-900 text-white rounded-[4rem] text-center reveal shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-white">Club Training</h2>
              <p className="text-slate-300 mb-12 max-w-2xl mx-auto text-xl font-light">Comprehensive 4-week modules designed for school delegations and competitive clubs looking for the technical edge.</p>
              <a href="mailto:arjunmadaan29@gmail.com" className="bg-white text-slate-900 px-12 py-6 rounded-full font-bold hover:bg-blue-600 hover:text-white hover:scale-105 transition-all inline-block text-xl">Get Club Pricing</a>
            </div>
            
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-96 h-96 bg-blue-600 rounded-full blur-[100px]"></div>
              <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-indigo-600 rounded-full blur-[100px]"></div>
            </div>
        </div>
      </div>

      <CheckoutModal 
        isOpen={checkoutInfo.isOpen}
        onClose={() => setCheckoutInfo({ ...checkoutInfo, isOpen: false })}
        serviceName={checkoutInfo.service}
        price={checkoutInfo.price}
      />
    </div>
  );
};

export default ClassesPage;
