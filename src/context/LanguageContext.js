'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  // Read from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sara-language');
    if (saved) {
      setLanguage(saved);
    }
    setMounted(true);
  }, []);

  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = language === 'ar';

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem('sara-language', language);
    
    // Update font family based on language
    if (language === 'ar') {
      document.documentElement.style.setProperty('--font-heading', '"Cairo", sans-serif');
      document.documentElement.style.setProperty('--font-body', '"IBM Plex Sans Arabic", sans-serif');
    } else {
      document.documentElement.style.setProperty('--font-heading', '"Outfit", sans-serif');
      document.documentElement.style.setProperty('--font-body', '"Inter", sans-serif');
    }
  }, [language, direction, mounted]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const getLocalizedValue = (obj) => {
    if (!obj) return '';
    return obj[language] || obj.en || '';
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      direction,
      isRTL,
      toggleLanguage,
      t,
      getLocalizedValue
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
