import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ResearchPortal from './components/ResearchPortal';
import ClassesPage from './components/ClassesPage';
import ConsultingPage from './components/ConsultingPage';
import AboutPage from './components/AboutPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import AdminPage from './components/AdminPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar isLoggedIn={isLoggedIn} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/consulting" element={<ConsultingPage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/team" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route 
              path="/research" 
              element={<ResearchPortal isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
