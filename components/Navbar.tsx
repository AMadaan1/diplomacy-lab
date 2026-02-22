import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const location = useLocation();

  const navLinkClass = (path: string) => 
    `text-sm font-semibold transition-colors ${
      location.pathname === path ? 'text-blue-700' : 'text-slate-800 hover:text-blue-600'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-700 rounded-md flex items-center justify-center text-white font-bold text-xs">DL</div>
              <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">Diplomacy Lab</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link to="/consulting" className={navLinkClass('/consulting')}>Consulting</Link>
            <Link to="/classes" className={navLinkClass('/classes')}>Classes</Link>
            <Link to="/team" className={navLinkClass('/team')}>Our Team</Link>
            <Link 
              to="/research" 
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                location.pathname === '/research' 
                ? 'bg-blue-700 text-white shadow-lg shadow-blue-200' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {isLoggedIn ? 'Research Portal' : 'Access Portal'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
