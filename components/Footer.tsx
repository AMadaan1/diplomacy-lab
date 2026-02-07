import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-[10px]">DL</div>
            <span className="text-xl font-bold tracking-tight text-white">Diplomacy Lab</span>
          </div>
          
          <div className="flex gap-8 text-slate-400 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <a href="mailto:arjunmadaan29@gmail.com" className="hover:text-white transition-colors">Contact Support</a>
          </div>
          
          <div className="text-slate-500 text-xs text-center md:text-right leading-relaxed">
            &copy; {new Date().getFullYear()} Diplomacy Lab.<br />
            Specialized Model UN Consultancy.
          </div>
        </div>
      </div>
    </footer>
  );
};