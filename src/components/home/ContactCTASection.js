'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check, Clock, MessageSquare, Sparkles, Settings } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const ContactCTASection = () => {
  const { isRTL, language } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const content = {
    en: {
      badge: 'Expert Team Ready',
      title: "Let's Help You Succeed",
      description: 'Our team of experts is ready to help you digitally transform your business. Get a free consultation today!',
      benefits: [
        { icon: Clock, text: 'Response within 24 hours' },
        { icon: MessageSquare, text: 'Free consultation, no obligation' },
        { icon: Settings, text: 'Custom solutions for your needs' },
      ],
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'View All Solutions'
    },
    ar: {
      badge: 'فريق خبراء جاهز',
      title: 'دعنا نساعدك على النجاح',
      description: 'فريقنا من الخبراء جاهز لمساعدتك في التحول الرقمي لأعمالك. احصل على استشارة مجانية اليوم!',
      benefits: [
        { icon: Clock, text: 'رد خلال 24 ساعة' },
        { icon: MessageSquare, text: 'استشارة مجانية بدون التزام' },
        { icon: Settings, text: 'حلول مخصصة لاحتياجاتك' },
      ],
      ctaPrimary: 'احصل على استشارة مجانية',
      ctaSecondary: 'عرض جميع الحلول'
    }
  };

  const c = content[language] || content.en;

  return (
    <section 
      ref={ref}
      className={`py-16 md:py-20 ${isDark ? 'bg-sara-navy' : 'bg-white'}`}
      data-testid="contact-cta-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`relative p-8 md:p-12 rounded-3xl overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-sara-surface to-sara-navy border border-white/10' 
              : 'bg-gradient-to-br from-cyan-50 to-purple-50 border border-gray-200 shadow-xl'
          }`}
        >
          {/* Background decoration */}
          <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-64 h-64 opacity-20`}>
            <motion.div
              className="w-full h-full rounded-full bg-sara-cyan blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className={isRTL ? 'text-right' : ''}>
              <Badge 
                variant="outline" 
                className={`mb-4 text-sara-cyan border-sara-cyan/30 ${
                  isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/5'
                }`}
              >
                <Sparkles className={`w-3 h-3 ${isRTL ? 'ms-1' : 'me-1'}`} />
                {c.badge}
              </Badge>
              <motion.h2 
                className={`text-2xl md:text-3xl font-bold font-heading mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                {c.title}
              </motion.h2>
              <motion.p 
                className={`text-base mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                {c.description}
              </motion.p>

              {/* Benefits */}
              <div className="space-y-3 mb-6">
                {c.benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-sara-cyan/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-sara-cyan" />
                    </div>
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {benefit.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className={`flex flex-col sm:flex-row lg:flex-col gap-4 ${isRTL ? 'lg:items-start' : 'lg:items-end'}`}
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <Button 
                  size="lg"
                  className="w-full bg-sara-cyan hover:bg-sara-cyanHover text-white rounded-full px-8 shadow-lg shadow-sara-cyan/30"
                  data-testid="contact-cta-button"
                >
                  {c.ctaPrimary}
                  <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button 
                  size="lg"
                  variant="outline"
                  className={`w-full rounded-full px-8 ${
                    isDark ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {c.ctaSecondary}
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTASection;
