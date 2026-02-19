import { Outlet } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

// Lazy load heavy components
const ChatbotWidget = lazy(() => import('./ChatbotWidget'));
const CommandPalette = lazy(() => import('./CommandPalette'));

const Layout = () => {
  const { isDark } = useTheme();
  const [showChatbot, setShowChatbot] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

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
        <Outlet />
      </main>
      
      <Footer />

      {/* Lazy loaded components */}
      <Suspense fallback={null}>
        {showChatbot && <ChatbotWidget />}
        {showPalette && (
          <CommandPalette 
            isOpen={showPalette} 
            onClose={() => setShowPalette(false)} 
          />
        )}
      </Suspense>
    </div>
  );
};

export default Layout;
