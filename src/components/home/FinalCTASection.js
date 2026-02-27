'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const FinalCTASection = () => {
  const { isRTL, language } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const content = {
    en: {
      title: 'Looking for a Trusted Business Solutions Partner in Saudi Arabia?',
      subtitle: 'Partner with Sara Business Solutions and transform your operations with proven government and enterprise solutions.',
      cta: 'Connect to Our Experts'
    },
    ar: {
      title: 'هل تبحث عن شريك موثوق لحلول الأعمال في المملكة العربية السعودية؟',
      subtitle: 'تشارك مع سارا للحلول التجارية وحوّل عملياتك مع حلول حكومية ومؤسسية مثبتة.',
      cta: 'تواصل مع خبرائنا'
    }
  };

  const c = content[language] || content.en;

  return (
    <section 
      ref={ref}
      className={`py-16 md:py-20 relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-sara-cyan/20 via-sara-navy to-purple-900/20' 
          : 'bg-gradient-to-br from-sara-cyan/10 via-white to-purple-100'
      }`}
      data-testid="final-cta-section"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute -top-1/2 ${isRTL ? '-right-1/4' : '-left-1/4'} w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-sara-cyan/20' : 'bg-sara-cyan/30'
          }`}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={`absolute -bottom-1/2 ${isRTL ? '-left-1/4' : '-right-1/4'} w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-purple-500/20' : 'bg-purple-500/30'
          }`}
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold font-heading mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {c.title}
          </h2>
          <p className={`text-base md:text-lg mb-8 max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {c.subtitle}
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-sara-cyan hover:bg-sara-cyanHover text-white rounded-full px-8 shadow-lg shadow-sara-cyan/30"
                data-testid="final-cta-button"
              >
                {c.cta}
                <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
