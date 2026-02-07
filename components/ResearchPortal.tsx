import React, { useState, useRef, useEffect } from 'react';
import { performResearch } from '../services/geminiService';
import { ChatMessage, FileData } from '../types';

interface ResearchPortalProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}

const ResearchPortal: React.FC<ResearchPortalProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Robust check: trimmed and case-insensitive
    const normalizedInput = password.trim().toUpperCase();
    if (normalizedInput === 'MUN2025' || normalizedInput === 'MUN2026') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid Access Key. Please check your credentials or subscription status.');
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = (event.target?.result as string).split(',')[1];
      setSelectedFile({
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        data: base64Data
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() && !selectedFile) return;

    const currentQuery = query;
    const currentFile = selectedFile;

    const userMsg: ChatMessage = { 
      role: 'user', 
      content: currentQuery || (currentFile ? `Shared a file: ${currentFile.name}` : ""),
      file: currentFile || undefined
    };

    setChatHistory(prev => [...prev, userMsg]);
    setQuery('');
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsLoading(true);

    try {
      const result = await performResearch(currentQuery, chatHistory, currentFile);
      const modelMsg: ChatMessage = { 
        role: 'model', 
        content: result.text, 
        sources: result.sources 
      };
      setChatHistory(prev => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-center mb-2 text-slate-900">Research Portal</h2>
          <p className="text-slate-500 text-center mb-8">One-time purchase required ($30). Enter your access code below.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Access Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
              />
            </div>
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <button type="submit" className="w-full bg-blue-700 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-100">
              Unlock Terminal
            </button>
          </form>
          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 mb-2">
              Don't have a key? Reserve one on the home page and pay $30 cash at your next class.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-grow bg-white border border-slate-200 rounded-[2rem] shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-slate-400 font-mono text-xs ml-2 tracking-widest uppercase">Research Assistant v2.5 Beta</span>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="text-slate-400 hover:text-white text-xs font-bold uppercase transition-colors"
          >
            Lock Session
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-white">
          {chatHistory.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto py-12">
              <div className="text-5xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold mb-2 text-slate-900">Begin Your Research</h3>
              <p className="text-slate-500">
                Ask about specific country policies, UN resolutions, or upload source PDFs/images. Powered by Gemini Pro with Real-time Grounding.
              </p>
            </div>
          )}
          
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-[1.5rem] p-5 shadow-sm ${
                msg.role === 'user' 
                ? 'bg-blue-700 text-white rounded-tr-none' 
                : 'bg-slate-50 text-slate-900 border border-slate-100 rounded-tl-none'
              }`}>
                {msg.file && (
                  <div className={`mb-3 p-2 rounded-lg flex items-center gap-2 text-xs font-bold ${msg.role === 'user' ? 'bg-white/10' : 'bg-slate-200'}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    {msg.file.name}
                  </div>
                )}
                <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                </div>
                
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200/50">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Intelligence Grounding:</p>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((src, sIdx) => src.web && (
                        <a 
                          key={sIdx}
                          href={src.web.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] text-blue-600 font-medium hover:border-blue-400 transition-colors truncate max-w-[200px]"
                          title={src.web.title}
                        >
                          {src.web.title || src.web.uri}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-[1.5rem] rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 bg-white shrink-0">
          {selectedFile && (
            <div className="mb-3 flex items-center gap-2 p-2 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 text-xs font-bold w-fit">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              {selectedFile.name}
              <button 
                onClick={() => setSelectedFile(null)}
                className="ml-2 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="application/pdf,image/*"
              />
            </button>
            
            <div className="flex-grow relative">
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about specific country policies or analyze a document..."
                className="w-full bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16 transition-all"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading || (!query.trim() && !selectedFile)}
                className="absolute right-2 top-2 bottom-2 w-12 bg-blue-700 text-white rounded-xl flex items-center justify-center hover:bg-blue-800 disabled:bg-slate-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
          <p className="text-[10px] text-center text-slate-400 mt-3 font-medium uppercase tracking-widest">
            AI can make mistakes. Verify critical facts with listed sources.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResearchPortal;