import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        <p className="text-slate-500 mb-8 italic">Last Updated: February 2026</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Information We Collect</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Diplomacy Lab ("we," "us," or "our") collects information to provide better services to our delegates. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li><strong>Personal Identifiers:</strong> Name and email address when you register for classes or subscribe to the Research Portal.</li>
            <li><strong>Submitted Content:</strong> Position papers, speeches, and research queries submitted for review or processed via our AI tools.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our Research Portal, including search trends to improve our AI's performance.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">2. How We Use Your Information</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            The information we collect is used exclusively for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>Providing detailed, expert feedback on your MUN materials.</li>
            <li>Maintaining and securing the Research Portal.</li>
            <li>Processing payments for subscriptions and academic sessions.</li>
            <li>Communicating updates regarding our services and upcoming lectures.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Data Processing and AI Disclosure</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Our Research Portal utilizes the Google Gemini API. While your research queries are processed by these models to generate responses, Diplomacy Lab does not sell your specific query data to third parties. We leverage these technologies solely to provide high-quality research grounding for your academic success.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Security</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            We implement industry-standard security measures to protect your data. Access to the Research Portal is password-protected, and sensitive documents are handled with strict confidentiality by our founding team.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Contact Us</h2>
          <p className="text-slate-600 leading-relaxed">
            If you have questions about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:arjunmadaan29@gmail.com" className="text-blue-700 font-bold hover:underline">arjunmadaan29@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;