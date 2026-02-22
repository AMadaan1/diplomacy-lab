
import React, { useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  price: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, serviceName, price }) => {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [formData, setFormData] = useState({ name: '', email: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Save to localStorage
    const newRegistration = {
      id: crypto.randomUUID(),
      name: formData.name,
      email: formData.email,
      service: serviceName,
      price: price,
      date: new Date().toISOString()
    };

    const existingRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    localStorage.setItem('registrations', JSON.stringify([newRegistration, ...existingRegistrations]));

    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {step === 'details' && (
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Reserve Your Spot</h3>
                <p className="text-slate-500 text-sm">{serviceName}</p>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl mb-6 flex justify-between items-center border border-blue-100">
              <span className="text-blue-700 font-medium">Session Fee</span>
              <span className="text-2xl font-black text-blue-700">{price}</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Delegate Name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="delegate@school.edu"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  <strong>Note:</strong> To keep things simple, we do not process payments online. Please bring <strong>cash</strong> to the actual class or feedback session to finalize your booking.
                </p>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-blue-700 text-white font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-100 mt-4"
              >
                Confirm Reservation
              </button>
            </form>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Saving Reservation</h3>
            <p className="text-slate-500">Securing your spot for {serviceName}...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Reservation Confirmed</h3>
            <p className="text-slate-600 mb-4">We've reserved your spot, {formData.name.split(' ')[0]}!</p>
            <div className="bg-slate-50 p-4 rounded-2xl mb-8 border border-slate-200">
              <p className="text-sm text-slate-500 font-medium">
                Payment of <span className="text-blue-700 font-bold">{price}</span> is due in cash at the start of your session.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all w-full"
            >
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
