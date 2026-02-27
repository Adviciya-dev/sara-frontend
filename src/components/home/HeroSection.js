'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Award, Users, Building2, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const HeroSection = () => {
  const { isRTL, language, t } = useLanguage();
  const { isDark } = useTheme();

  // Bilingual content
  const content = {
    en: {
      badge: 'Official Partner of Elm & Bahamdan Group',
      headline: 'Government & Enterprise Business Solutions Company in Saudi Arabia',
      subheadline: 'Your Complete Business Solutions Company in Saudi Arabia. Official partner of Elm and Bahamdan Group.',
      ctaPrimary: 'Book a Free Consultation',
      ctaSecondary: 'Explore All Solutions',
      trustBadges: [
        { icon: Award, text: '20+ Years Experience' },
        { icon: Users, text: '20,000+ Clients' },
        { icon: Building2, text: 'Partner of ELM & Bahamdan' },
      ],
      commandCenter: 'Command Center',
      stats: { clients: 'Clients', uptime: 'Uptime', support: 'Support' }
    },
    ar: {
      badge: 'شريك رسمي لشركة علم ومجموعة باهمدان',
      headline: 'شركة حلول الأعمال الحكومية والمؤسسية في المملكة العربية السعودية',
      subheadline: 'شركتك المتكاملة لحلول الأعمال في المملكة العربية السعودية. شريك رسمي لشركة علم ومجموعة باهمدان.',
      ctaPrimary: 'احجز استشارة مجانية',
      ctaSecondary: 'استكشف جميع الحلول',
      trustBadges: [
        { icon: Award, text: '+20 عاماً من الخبرة' },
        { icon: Users, text: '+20,000 عميل' },
        { icon: Building2, text: 'شريك علم وباهمدان' },
      ],
      commandCenter: 'مركز القيادة',
      stats: { clients: 'عميل', uptime: 'وقت التشغيل', support: 'الدعم' }
    }
  };

  const c = content[language] || content.en;
  
  const floatingCards = [
    { name: language === 'ar' ? 'مقيم' : 'MUQEEM', slug: 'muqeem', color: '#2563EB', position: { top: '8%', [isRTL ? 'right' : 'left']: '-5%' }, delay: 0 },
    { name: language === 'ar' ? 'تم' : 'TAMM', slug: 'tamm', color: '#2563EB', position: { top: '25%', [isRTL ? 'left' : 'right']: '-3%' }, delay: 0.15 },
    { name: language === 'ar' ? 'بيزات' : 'BAYZAT', slug: 'bayzat', color: '#7C3AED', position: { top: '45%', [isRTL ? 'right' : 'left']: '-8%' }, delay: 0.3 },
    { name: language === 'ar' ? 'راصد' : 'RASID', slug: 'rasid', color: '#10B981', position: { top: '65%', [isRTL ? 'left' : 'right']: '-5%' }, delay: 0.45 },
    { name: language === 'ar' ? 'كلاود PBX' : 'Cloud PBX', slug: 'cloud-pbx', color: '#F97316', position: { top: '10%', [isRTL ? 'left' : 'right']: '10%' }, delay: 0.6 },
    { name: language === 'ar' ? 'كليم AI' : 'Kaleem AI', slug: 'kaleem', color: '#D946EF', position: { top: '80%', [isRTL ? 'right' : 'left']: '5%' }, delay: 0.75 },
    { name: language === 'ar' ? 'تحسين محركات البحث' : 'SEO/AEO', slug: 'seo-aeo-geo', color: '#2DD4BF', position: { top: '85%', [isRTL ? 'left' : 'right']: '8%' }, delay: 0.9 },
  ];

  return (
    <section 
      className={`relative min-h-screen flex items-center pt-20 overflow-hidden ${
        isDark ? 'bg-sara-navy' : 'bg-gradient-to-br from-slate-50 via-white to-cyan-50'
      }`} 
      data-testid="hero-section"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className={`absolute top-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/5'
          }`}
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className={`absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-purple-500/10' : 'bg-purple-500/5'
          }`}
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Grid pattern */}
        <div 
          className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-[0.02]'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${isDark ? 'bg-sara-cyan/30' : 'bg-sara-cyan/20'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge 
                variant="outline" 
                className={`text-sara-cyan border-sara-cyan/30 ${
                  isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/5'
                }`}
              >
                <Sparkles className={`w-3 h-3 ${isRTL ? 'ms-1' : 'me-1'}`} />
                {c.badge}
              </Badge>
            </motion.div>
            
            <motion.h1 
              className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {c.headline}
            </motion.h1>
            
            <motion.p 
              className={`text-base lg:text-lg max-w-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {c.subheadline}
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-sara-cyan hover:bg-sara-cyanHover text-white rounded-full px-6 md:px-8 shadow-lg shadow-sara-cyan/30"
                  data-testid="hero-cta-primary"
                >
                  {c.ctaPrimary}
                  <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`rounded-full px-6 md:px-8 ${
                    isDark ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-100'
                  }`}
                  data-testid="hero-cta-secondary"
                >
                  {c.ctaSecondary}
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="flex flex-wrap items-center gap-4 md:gap-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {c.trustBadges.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-sara-cyan flex-shrink-0" />
                  <span className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Animated Control Deck */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Central Card */}
              <motion.div
                className={`absolute inset-8 rounded-3xl p-6 flex flex-col items-center justify-center border ${
                  isDark 
                    ? 'bg-sara-surface/80 backdrop-blur-xl border-white/10' 
                    : 'bg-white/90 backdrop-blur-xl border-gray-200 shadow-2xl'
                }`}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="https://customer-assets.emergentagent.com/job_command-center-sa/artifacts/fwhjuivt_logo-1-2048x531.png"
                  alt="SARA"
                  className="h-12 mb-4"
                />
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {c.commandCenter}
                </h3>
                <div className="grid grid-cols-3 gap-4 w-full">
                  <div className="text-center">
                    <p className="text-xl font-bold text-sara-cyan">20K+</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{c.stats.clients}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-sara-cyan">99.9%</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{c.stats.uptime}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-sara-cyan">24/7</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{c.stats.support}</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Service Cards */}
              {floatingCards.map((card, index) => (
                <motion.div
                  key={card.name}
                  className="absolute"
                  style={card.position}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    delay: card.delay, 
                    duration: 0.5,
                    y: {
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Link href={`/service/${card.slug}`}>
                    <motion.div 
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-all ${
                        isDark 
                          ? 'bg-sara-surface/80 backdrop-blur-sm hover:bg-sara-surface' 
                          : 'bg-white shadow-lg hover:shadow-xl'
                      }`}
                      style={{ 
                        borderWidth: 2, 
                        borderColor: card.color,
                        color: card.color 
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {card.name}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(6, 182, 212, 0.3)" />
                    <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                  </linearGradient>
                </defs>
                {[...Array(6)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx="50%"
                    cy="50%"
                    r={100 + i * 30}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    strokeDasharray="5 5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3, rotate: 360 }}
                    transition={{ 
                      opacity: { delay: i * 0.2 },
                      rotate: { duration: 30 + i * 10, repeat: Infinity, ease: "linear" }
                    }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-1 ${
          isDark ? 'border-white/30' : 'border-gray-400'
        }`}>
          <div className="w-1.5 h-2.5 bg-sara-cyan rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
