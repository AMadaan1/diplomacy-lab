import React, { useEffect, useRef } from 'react';

const AboutPage: React.FC = () => {
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

  return (
    <div className="bg-white">
      {/* Leadership Header */}
      <section className="py-32 bg-slate-50 relative overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24 reveal">
            <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">Visionaries</span>
            <h1 className="text-7xl md:text-8xl font-bold text-slate-900 mb-8 tracking-tighter">The Co-Founders</h1>
            <p className="text-xl md:text-2xl text-slate-800 max-w-3xl mx-auto font-light leading-relaxed">
              We bridge the gap between high-stakes diplomacy and technical logic to redefine the competitive MUN landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* CEO Profile - Arjun Madaan */}
            <div className="reveal" style={{ transitionDelay: '100ms' }}>
              <div className="group h-full bg-slate-900 rounded-[4rem] p-12 flex flex-col justify-between shadow-2xl transition-all duration-700 hover:scale-[1.01] border border-white/5">
                <div>
                  <div className="mb-10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-blue-500/20">AM</div>
                    <div>
                      <h3 className="text-white text-3xl font-bold tracking-tight">Arjun Madaan</h3>
                      <p className="text-blue-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">CEO & Co-Founder</p>
                    </div>
                  </div>
                  <p className="text-slate-200 text-xl leading-relaxed font-light">
                    "A Harvard MUN veteran and Best Delegate recipient with a pedigree of 13+ conferences. Arjun balances master-level rhetoric with applied technical expertise from Stanford and Brown, engineering competitive excellence."
                  </p>
                </div>
                <div className="mt-12 flex flex-wrap gap-3">
                  <span className="px-5 py-2 bg-white/5 text-white text-[10px] font-bold rounded-full uppercase tracking-widest border border-white/10 backdrop-blur-sm text-white">Rhetoric Expert</span>
                  <span className="px-5 py-2 bg-white/5 text-white text-[10px] font-bold rounded-full uppercase tracking-widest border border-white/10 backdrop-blur-sm text-white">Tech Strategy</span>
                </div>
              </div>
            </div>

            {/* COO Profile - Sreekar Karra */}
            <div className="reveal" style={{ transitionDelay: '300ms' }}>
              <div className="group h-full bg-slate-950 rounded-[4rem] p-12 flex flex-col justify-between shadow-2xl transition-all duration-700 hover:scale-[1.01] border border-white/5">
                <div>
                  <div className="mb-10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-3xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-500/20">SK</div>
                    <div>
                      <h3 className="text-white text-3xl font-bold tracking-tight">Sreekar Karra</h3>
                      <p className="text-slate-200 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">COO & Co-Founder</p>
                    </div>
                  </div>
                  <p className="text-slate-200 text-xl leading-relaxed font-light">
                    "A decorated Gavel-winning specialist with over 10 conferences. Sreekar drives the operational excellence of Diplomacy Lab, ensuring every delegate receives high-bandwidth strategic guidance."
                  </p>
                </div>
                <div className="mt-12 flex flex-wrap gap-3">
                  <span className="px-5 py-2 bg-white/5 text-white text-[10px] font-bold rounded-full uppercase tracking-widest border border-white/10 backdrop-blur-sm text-white">Tactical Ops</span>
                  <span className="px-5 py-2 bg-white/5 text-white text-[10px] font-bold rounded-full uppercase tracking-widest border border-white/10 backdrop-blur-sm text-white">Strategic Advisor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-40">
            {/* Rhetoric & Diplomacy */}
            <div className="reveal">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-20 h-20 bg-blue-700 rounded-[2rem] flex items-center justify-center text-3xl shadow-2xl shadow-blue-500/30">
                  <span className="text-white">🎤</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter">The Art of Rhetoric</h2>
              </div>
              
              <div className="bg-slate-50 p-16 rounded-[4rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                  <div className="space-y-8">
                    <h4 className="font-bold text-slate-900 text-2xl tracking-tight">Psychological Leverage</h4>
                    <p className="text-slate-800 text-lg leading-relaxed font-light">
                      We teach delegates how to dominate the committee floor not just with facts, but with linguistic framing and tactical empathy.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md">01</div>
                        <p className="font-black text-slate-900 uppercase text-[10px] tracking-widest">Cognitive Persuasion</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md">02</div>
                        <p className="font-black text-slate-900 uppercase text-[10px] tracking-widest">Atmospheric Dominance</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center text-center p-10 bg-white rounded-[3rem] border border-blue-100 group-hover:scale-[1.02] transition-transform duration-700 shadow-sm">
                    <p className="text-blue-800 italic leading-relaxed text-2xl font-medium mb-4">
                      "A spoonful of honey will catch more flies than a gallon of vinegar."
                    </p>
                    <p className="text-blue-600 font-bold uppercase text-[10px] tracking-[0.2em]">— Benjamin Franklin</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Innovation */}
            <div className="reveal">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-20 h-20 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-3xl shadow-2xl">
                  <span className="text-white">🚀</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter">Technical Edge</h2>
              </div>
              
              <div className="bg-slate-900 p-16 rounded-[4rem] text-white overflow-hidden relative group">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                  <div className="space-y-8">
                    <h4 className="font-bold text-3xl tracking-tight text-white">Literacy & Reasoning</h4>
                    <p className="text-slate-200 text-lg leading-relaxed font-light">
                      We leverage deep expertise in neural architectures and computational logic to analyze global trends. We teach delegates to understand the tech-policy landscape, not automate the writing process.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-400 border border-white/5">Foundational Analysis</span>
                      <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-400 border border-white/5">Neural Logic</span>
                      <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-400 border border-white/5">Zero-Plagiarism</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
                      <p className="text-blue-400 font-bold text-xs mb-3 uppercase tracking-widest">Grounding, Not Generating</p>
                      <p className="text-slate-200 text-sm leading-relaxed font-light">We use tech to accelerate the research lifecycle through precision grounding, ensuring your work is 100% original and academically secure.</p>
                    </div>
                    <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
                      <p className="text-blue-400 font-bold text-xs mb-3 uppercase tracking-widest">Framework Intelligence</p>
                      <p className="text-slate-200 text-sm leading-relaxed font-light">Understand the underlying mechanics of international cyber-policy and algorithmic governance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;