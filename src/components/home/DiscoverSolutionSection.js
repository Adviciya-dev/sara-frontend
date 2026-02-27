'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Search, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const DiscoverSolutionSection = () => {
  const { isRTL, language } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const content = {
    en: {
      quiz: {
        badge: 'Smart Recommendation',
        title: 'Discover Your Perfect Solution',
        description: 'Answer 5 quick questions and get personalised recommendations tailored to your business needs.',
        cta: 'Start Quiz'
      },
      wizard: {
        badge: 'Interactive Wizard',
        title: 'Find My Solution',
        description: 'Answer a few questions to discover perfect solutions for your business growth and digital transformation.',
        cta: 'Start Wizard'
      }
    },
    ar: {
      quiz: {
        badge: 'توصية ذكية',
        title: 'اكتشف الحل الأمثل لك',
        description: 'أجب على 5 أسئلة سريعة واحصل على توصيات مخصصة لاحتياجات عملك.',
        cta: 'ابدأ الاختبار'
      },
      wizard: {
        badge: 'معالج تفاعلي',
        title: 'اكتشف الحل المناسب',
        description: 'أجب على بعض الأسئلة لاكتشاف الحلول المثالية لنمو أعمالك والتحول الرقمي.',
        cta: 'ابدأ المعالج'
      }
    }
  };

  const c = content[language] || content.en;

  return (
    <section 
      ref={ref}
      className={`py-16 md:py-20 relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-sara-navy via-sara-surface to-sara-navy' 
          : 'bg-gradient-to-br from-cyan-50 via-white to-purple-50'
      }`}
      data-testid="discover-solution-section"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className={`absolute top-1/3 ${isRTL ? '-right-1/4' : '-left-1/4'} w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/20'
          }`}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div 
          className={`absolute bottom-1/3 ${isRTL ? '-left-1/4' : '-right-1/4'} w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-purple-500/10' : 'bg-purple-500/15'
          }`}
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Quiz CTA */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`p-6 md:p-8 rounded-2xl border ${
              isDark 
                ? 'bg-sara-surface/80 backdrop-blur-xl border-white/10' 
                : 'bg-white/90 backdrop-blur-xl border-gray-200 shadow-xl'
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sara-cyan to-purple-500 flex items-center justify-center mb-4"
            >
              <Search className="w-7 h-7 text-white" />
            </motion.div>
            <Badge 
              variant="outline" 
              className={`mb-3 text-sara-cyan border-sara-cyan/30 ${
                isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/5'
              }`}
            >
              <Sparkles className={`w-3 h-3 ${isRTL ? 'ms-1' : 'me-1'}`} />
              {c.quiz.badge}
            </Badge>
            <h2 className={`text-xl md:text-2xl font-bold font-heading mb-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {c.quiz.title}
            </h2>
            <p className={`mb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {c.quiz.description}
            </p>
            <Link href="#quiz-section">
              <Button 
                className="w-full sm:w-auto bg-gradient-to-r from-sara-cyan to-purple-500 hover:opacity-90 text-white rounded-full px-6"
                data-testid="discover-quiz-cta"
              >
                {c.quiz.cta}
                <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </motion.div>

          {/* Wizard CTA */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`p-6 md:p-8 rounded-2xl border ${
              isDark 
                ? 'bg-sara-surface/80 backdrop-blur-xl border-white/10' 
                : 'bg-white/90 backdrop-blur-xl border-gray-200 shadow-xl'
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.4, type: "spring" }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4"
            >
              <MessageSquare className="w-7 h-7 text-white" />
            </motion.div>
            <Badge 
              variant="outline" 
              className={`mb-3 text-purple-500 border-purple-500/30 ${
                isDark ? 'bg-purple-500/10' : 'bg-purple-500/5'
              }`}
            >
              <Sparkles className={`w-3 h-3 ${isRTL ? 'ms-1' : 'me-1'}`} />
              {c.wizard.badge}
            </Badge>
            <h2 className={`text-xl md:text-2xl font-bold font-heading mb-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {c.wizard.title}
            </h2>
            <p className={`mb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {c.wizard.description}
            </p>
            <Link href="#wizard-section">
              <Button 
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white rounded-full px-6"
                data-testid="find-solution-cta"
              >
                {c.wizard.cta}
                <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSolutionSection;
