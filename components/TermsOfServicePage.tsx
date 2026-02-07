import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
        <p className="text-slate-500 mb-8 italic">Last Updated: February 2026</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Acceptance of Terms</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            By accessing or using the services provided by Diplomacy Lab ("the Company"), including our feedback services, lectures, and Research Portal, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Description of Services</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            The Company provides Model United Nations (MUN) consultancy, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>Feedback on position papers and speeches based on specific deadline tiers.</li>
            <li>Academic lectures on AI, Logical Reasoning, and Psychological Reasoning.</li>
            <li>Access to an AI-powered Research Portal for a one-time access fee.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Payment and Refunds</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Fees for reviews and classes are due at the time of booking. The Research Portal access is a one-time payment of $30 and is non-refundable. We reserve the right to change our pricing at any time. If we fail to deliver feedback within the agreed-upon timeframe, a partial or full refund may be issued at our discretion.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Intellectual Property</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            All lecture materials, proprietary frameworks, and software code related to the Research Portal are the intellectual property of Diplomacy Lab. Users are granted a limited, non-exclusive license to use these materials for personal academic growth only. Redistribution or commercial use is strictly prohibited.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Use of AI Tools</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            The Research Portal uses generative AI technologies. While we strive for accuracy, the Company does not guarantee the factual correctness of AI-generated content. Delegates are responsible for verifying all information before using it in a competitive MUN environment.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Limitation of Liability and Academic Integrity</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Diplomacy Lab is not liable for any awards lost, disqualifications, or academic penalties incurred by the user. Our services are intended for educational and preparatory purposes only.
          </p>
          <p className="text-slate-600 mb-4 leading-relaxed">
            The use of substantially writing papers from external sources is considered plagiarism and can result in disqualification (DQ) from conferences. While we strive to help delegates by providing expert feedback and strategic insight, we do not, in any way, substantially write the papers or speeches for users. It is the sole responsibility of the delegate to ensure that the work submitted to conferences remains their own original creation.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Governing Law</h2>
          <p className="text-slate-600 leading-relaxed">
            These terms are governed by the laws of the Commonwealth of Virginia, United States.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;