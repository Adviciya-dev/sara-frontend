'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const ServiceCTA = ({ 
  headline, 
  description,
  ctaText,
  categoryColor 
}) => {
  const { isDark } = useTheme();
  const { isRTL } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section 
      ref={ref}
      className={`py-16 relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-sara-navy via-sara-surface to-sara-navy' 
          : 'bg-gradient-to-br from-cyan-50 via-white to-purple-50'
      }`}
      data-testid="service-cta"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl"
          style={{ backgroundColor: `${categoryColor}08` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className={`absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full blur-3xl ${
            isDark ? 'bg-purple-500/5' : 'bg-purple-500/10'
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
          <h2 className={`text-2xl md:text-3xl font-bold font-heading mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {headline}
          </h2>
          
          <p className={`max-w-2xl mx-auto mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {description}
          </p>

          <Link href="/contact">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button 
                size="lg"
                className="rounded-full px-10 text-white shadow-lg"
                style={{ backgroundColor: categoryColor }}
                data-testid="cta-button"
              >
                {ctaText}
                <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCTA;
