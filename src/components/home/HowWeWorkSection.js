'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Settings, GraduationCap, Headphones, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const HowWeWorkSection = () => {
  const { isRTL, language } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const content = {
    en: {
      badge: 'Our Process',
      title: 'How We Work',
      steps: [
        {
          icon: Search,
          title: 'Discover & Consult',
          description: 'We analyse your business needs and find opportunities.',
          color: '#2563EB',
        },
        {
          icon: Settings,
          title: 'Design & Integrate',
          description: 'Designing business-orientated technical solutions.',
          color: '#7C3AED',
        },
        {
          icon: GraduationCap,
          title: 'Train & Launch',
          description: 'We train your team and ensure a smooth launch.',
          color: '#10B981',
        },
        {
          icon: Headphones,
          title: 'Optimise & Support',
          description: 'Ongoing support and updates for continuous growth.',
          color: '#F97316',
        },
      ]
    },
    ar: {
      badge: 'عمليتنا',
      title: 'كيف نعمل',
      steps: [
        {
          icon: Search,
          title: 'الاكتشاف والاستشارة',
          description: 'نحلل احتياجات عملك ونكتشف الفرص.',
          color: '#2563EB',
        },
        {
          icon: Settings,
          title: 'التصميم والتكامل',
          description: 'تصميم حلول تقنية موجهة للأعمال.',
          color: '#7C3AED',
        },
        {
          icon: GraduationCap,
          title: 'التدريب والإطلاق',
          description: 'ندرب فريقك ونضمن إطلاقاً سلساً.',
          color: '#10B981',
        },
        {
          icon: Headphones,
          title: 'التحسين والدعم',
          description: 'دعم مستمر وتحديثات للنمو المستدام.',
          color: '#F97316',
        },
      ]
    }
  };

  const c = content[language] || content.en;

  return (
    <section 
      ref={ref}
      className={`py-16 md:py-20 ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}
      data-testid="how-we-work-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge 
            variant="outline" 
            className={`mb-4 text-sara-cyan border-sara-cyan/30 ${
              isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/5'
            }`}
          >
            <Sparkles className={`w-3 h-3 ${isRTL ? 'ms-1' : 'me-1'}`} />
            {c.badge}
          </Badge>
          <h2 className={`text-2xl md:text-3xl font-bold font-heading ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {c.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative flex"
              >
                {/* Connector line */}
                {index < c.steps.length - 1 && (
                  <div className={`hidden lg:block absolute top-10 ${isRTL ? 'right-full' : 'left-full'} w-full h-0.5 ${isRTL ? 'translate-x-1/2' : '-translate-x-1/2'} z-0`}>
                    <motion.div 
                      className="h-full"
                      style={{ backgroundColor: `${step.color}30` }}
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                    />
                  </div>
                )}

                <motion.div
                  whileHover={{ y: -5 }}
                  className={`relative z-10 p-5 md:p-6 rounded-2xl border h-full w-full text-center flex flex-col ${
                    isDark 
                      ? 'bg-sara-navy border-sara-border' 
                      : 'bg-white border-gray-200 shadow-md hover:shadow-lg'
                  }`}
                >
                  {/* Step Number */}
                  <motion.div 
                    className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 text-white font-bold text-lg flex-shrink-0"
                    style={{ backgroundColor: step.color }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {index + 1}
                  </motion.div>

                  <div 
                    className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>

                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm flex-grow ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
