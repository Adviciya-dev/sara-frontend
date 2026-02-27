'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Shield, Zap, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const TrustedBySection = () => {
  const { isRTL, language } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Bilingual content
  const content = {
    en: {
      title: 'Trusted by Leading Government & Enterprise Organisations in Saudi Arabia',
      stats: [
        { value: '20K+', label: 'Active Clients', icon: Users },
        { value: '99.9%', label: 'Uptime', icon: Shield },
        { value: '50+', label: 'Solutions', icon: Zap },
        { value: '24/7', label: 'Support', icon: Globe },
      ]
    },
    ar: {
      title: 'موثوق به من قبل المؤسسات الحكومية والشركات الرائدة في المملكة العربية السعودية',
      stats: [
        { value: '+20 ألف', label: 'عميل نشط', icon: Users },
        { value: '99.9%', label: 'وقت التشغيل', icon: Shield },
        { value: '+50', label: 'حل متكامل', icon: Zap },
        { value: '24/7', label: 'الدعم الفني', icon: Globe },
      ]
    }
  };

  const c = content[language] || content.en;

  const partners = [
    { name: language === 'ar' ? 'علم' : 'Elm', logo: '🏛️' },
    { name: language === 'ar' ? 'مجموعة باهمدان' : 'Bahamdan Group', logo: '🏢' },
    { name: language === 'ar' ? 'أرامكو السعودية' : 'Saudi Aramco', logo: '⛽' },
    { name: language === 'ar' ? 'إس تي سي' : 'STC', logo: '📱' },
    { name: language === 'ar' ? 'سابك' : 'SABIC', logo: '🏭' },
    { name: language === 'ar' ? 'بنك الراجحي' : 'Al Rajhi Bank', logo: '🏦' },
  ];

  return (
    <section 
      ref={ref}
      className={`py-12 md:py-16 ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}
      data-testid="trusted-by-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <p className={`text-sm font-medium uppercase tracking-wider ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {c.title}
          </p>
        </motion.div>

        {/* Partner Logos */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white shadow-sm hover:shadow-md'
              }`}
            >
              <span className="text-2xl">{partner.logo}</span>
              <span className={`font-medium text-sm md:text-base whitespace-nowrap ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {c.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -2 }}
              className={`text-center p-4 md:p-6 rounded-2xl transition-all ${
                isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white shadow-md hover:shadow-lg'
              }`}
            >
              <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-sara-cyan" />
              <motion.p 
                className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                {stat.value}
              </motion.p>
              <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
