'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const ServiceHero = ({ 
  categoryName, 
  categoryColor, 
  serviceName, 
  headline, 
  subheadline, 
  ctaPrimary, 
  ctaSecondary,
  breadcrumbs = []
}) => {
  const { isDark } = useTheme();
  const { isRTL, t } = useLanguage();

  return (
    <section 
      className={`relative pt-24 pb-16 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-slate-50 via-white to-cyan-50'
      }`}
      data-testid="service-hero"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className={`absolute top-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/5'
          }`}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className={`absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full blur-3xl`}
          style={{ backgroundColor: `${categoryColor}10` }}
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav 
          className={`flex items-center gap-2 text-sm mb-8 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className={`hover:text-sara-cyan transition-colors`}>
            {t('nav.home')}
          </Link>
          <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          <Link href="/services" className={`hover:text-sara-cyan transition-colors`}>
            {t('nav.services')}
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-2">
              <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              {crumb.href ? (
                <Link href={crumb.href} className={`hover:text-sara-cyan transition-colors`}>
                  {crumb.label}
                </Link>
              ) : (
                <span className={isDark ? 'text-white' : 'text-gray-900'}>{crumb.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Badge 
              className="text-sm"
              style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
            >
              {categoryName}
            </Badge>
            
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-heading leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {headline}
            </h1>
            
            <p className={`text-base lg:text-lg max-w-xl ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {subheadline}
            </p>

            <motion.div 
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {ctaPrimary && (
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 text-white shadow-lg"
                    style={{ backgroundColor: categoryColor }}
                    data-testid="hero-cta-primary"
                  >
                    {ctaPrimary}
                    <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
                  </Button>
                </Link>
              )}
              {ctaSecondary && (
                <Link href="#forms">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className={`rounded-full px-8 ${
                      isDark ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-100'
                    }`}
                    data-testid="hero-cta-secondary"
                  >
                    <Download className="w-4 h-4 me-2" />
                    {ctaSecondary}
                  </Button>
                </Link>
              )}
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <motion.div
                className={`p-8 rounded-3xl border ${
                  isDark 
                    ? 'bg-sara-surface/80 backdrop-blur-xl border-white/10' 
                    : 'bg-white/90 backdrop-blur-xl border-gray-200 shadow-2xl'
                }`}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${categoryColor}20` }}
                >
                  <div 
                    className="w-8 h-8 rounded-lg"
                    style={{ backgroundColor: categoryColor }}
                  />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {serviceName}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {categoryName}
                </p>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className={`absolute -top-4 -right-4 px-4 py-2 rounded-full text-sm font-medium ${
                  isDark ? 'bg-sara-surface border border-white/10' : 'bg-white shadow-lg'
                }`}
                style={{ color: categoryColor }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                24/7 Support
              </motion.div>
              <motion.div
                className={`absolute -bottom-4 -left-4 px-4 py-2 rounded-full text-sm font-medium ${
                  isDark ? 'bg-sara-surface border border-white/10' : 'bg-white shadow-lg'
                }`}
                style={{ color: '#10B981' }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                99.8% Success
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
