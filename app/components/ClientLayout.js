'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import { useTheme } from '../../src/context/ThemeContext';
import { useVisitorTracking } from '../../src/hooks/useVisitorTracking';

// Dynamic imports for heavy components
const ChatbotWidget = dynamic(() => import('../../src/components/ChatbotWidget'), { ssr: false });
const CommandPalette = dynamic(() => import('../../src/components/CommandPalette'), { ssr: false });

export default function ClientLayout({ children }) {
  const { isDark } = useTheme();
  const [showChatbot, setShowChatbot] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  // Track visitor
  useVisitorTracking();

  // Load chatbot after initial render
  useEffect(() => {
    const timer = setTimeout(() => setShowChatbot(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Command palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowPalette(true);
      }
      if (e.key === 'Escape') {
        setShowPalette(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      <Header onOpenPalette={() => setShowPalette(true)} />
      
      <main className="flex-1" data-testid="main-content">
        {children}
      </main>
      
      <Footer />

      {/* Dynamic loaded components */}
      {showChatbot && <ChatbotWidget />}
      {showPalette && (
        <CommandPalette 
          isOpen={showPalette} 
          onClose={() => setShowPalette(false)} 
        />
      )}
    </div>
  );
}
