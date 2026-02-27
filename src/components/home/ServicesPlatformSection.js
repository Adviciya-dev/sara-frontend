'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Building2, Users, Truck, Phone, Rocket, Brain, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const ServicesPlatformSection = () => {
  const { isRTL, language } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Bilingual content
  const content = {
    en: {
      badge: 'Six Pillars of Excellence',
      title: 'Integrated Business & Government Solutions Platform',
      subtitle: 'Sara Business Solutions is an integrated platform built on six pillars of digital excellence.',
      explore: 'Explore',
      pillars: [
        {
          id: 'government-portals',
          slug: 'government-portals',
          icon: Building2,
          title: 'Government Portal Integration',
          description: 'Seamless e-government services for visa, residence, and compliance management in Saudi Arabia.',
          color: '#2563EB',
        },
        {
          id: 'hr-performance',
          slug: 'hr-performance',
          icon: Users,
          title: 'HR & Performance',
          description: 'Modern HR solutions for payroll, benefits, and employee management services.',
          color: '#7C3AED',
        },
        {
          id: 'fleet-management',
          slug: 'fleet-management',
          icon: Truck,
          title: 'Fleet Management',
          description: 'Real-time vehicle tracking and fleet optimization solutions in Saudi Arabia.',
          color: '#10B981',
        },
        {
          id: 'telecom',
          slug: 'telecom',
          icon: Phone,
          title: 'Telecom Solutions',
          description: 'Enterprise Cloud PBX communication solutions with quality setup and support.',
          color: '#F97316',
        },
        {
          id: 'advanced-solutions',
          slug: 'advanced-solutions-technology',
          icon: Rocket,
          title: 'Advanced Solutions',
          description: 'Digital marketing, web development, and quality assurance solutions.',
          color: '#2DD4BF',
        },
        {
          id: 'ai-solutions',
          slug: 'ai-solutions',
          icon: Brain,
          title: 'AI Solutions',
          description: 'AI-powered business solutions for automation and customer communication.',
          color: '#D946EF',
        },
      ]
    },
    ar: {
      badge: 'ستة أعمدة للتميز',
      title: 'منصة حلول الأعمال والخدمات الحكومية المتكاملة',
      subtitle: 'سارا للحلول التجارية منصة متكاملة مبنية على ستة أعمدة للتميز الرقمي.',
      explore: 'استكشف',
      pillars: [
        {
          id: 'government-portals',
          slug: 'government-portals',
          icon: Building2,
          title: 'تكامل البوابات الحكومية',
          description: 'خدمات حكومية إلكترونية سلسة للتأشيرات والإقامة وإدارة الامتثال.',
          color: '#2563EB',
        },
        {
          id: 'hr-performance',
          slug: 'hr-performance',
          icon: Users,
          title: 'الموارد البشرية والأداء',
          description: 'حلول موارد بشرية حديثة للرواتب والمزايا وإدارة الموظفين.',
          color: '#7C3AED',
        },
        {
          id: 'fleet-management',
          slug: 'fleet-management',
          icon: Truck,
          title: 'إدارة الأسطول',
          description: 'تتبع المركبات في الوقت الفعلي وحلول تحسين الأسطول.',
          color: '#10B981',
        },
        {
          id: 'telecom',
          slug: 'telecom',
          icon: Phone,
          title: 'حلول الاتصالات',
          description: 'حلول اتصالات المؤسسات Cloud PBX مع إعداد ودعم متميز.',
          color: '#F97316',
        },
        {
          id: 'advanced-solutions',
          slug: 'advanced-solutions-technology',
          icon: Rocket,
          title: 'الحلول المتقدمة',
          description: 'التسويق الرقمي وتطوير الويب وحلول ضمان الجودة.',
          color: '#2DD4BF',
        },
        {
          id: 'ai-solutions',
          slug: 'ai-solutions',
          icon: Brain,
          title: 'حلول الذكاء الاصطناعي',
          description: 'حلول أعمال مدعومة بالذكاء الاصطناعي للأتمتة والتواصل.',
          color: '#D946EF',
        },
      ]
    }
  };

  const c = content[language] || content.en;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section 
      ref={ref}
      className={`py-16 md:py-20 relative overflow-hidden ${isDark ? 'bg-sara-navy' : 'bg-white'}`}
      data-testid="services-platform-section"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-20 ${isRTL ? 'right-10' : 'left-10'} w-64 h-64 rounded-full blur-3xl ${
            isDark ? 'bg-purple-500/5' : 'bg-purple-500/10'
          }`}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className={`absolute bottom-20 ${isRTL ? 'left-10' : 'right-10'} w-64 h-64 rounded-full blur-3xl ${
            isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/10'
          }`}
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge 
            variant="outline" 
            className={`text-sara-cyan border-sara-cyan/30 mb-4 ${
              isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/5'
            }`}
          >
            <Sparkles className={`w-3 h-3 ${isRTL ? 'ms-1' : 'me-1'}`} />
            {c.badge}
          </Badge>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold font-heading mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {c.title}
          </h2>
          <p className={`max-w-2xl mx-auto text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {c.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {c.pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                variants={itemVariants}
                transition={{ duration: 0.5 }}
                className="flex"
              >
                <Link href={`/services/${pillar.slug}`} className="block group w-full">
                  <motion.div 
                    className={`relative p-5 md:p-6 rounded-2xl border transition-all duration-300 h-full flex flex-col ${
                      isDark 
                        ? 'bg-sara-surface border-sara-border hover:border-opacity-50' 
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-xl'
                    }`}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                      style={{ backgroundColor: `${pillar.color}15` }}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-6 h-6" style={{ color: pillar.color }} />
                    </motion.div>
                    <h3 className={`font-semibold text-base md:text-lg mb-2 group-hover:text-sara-cyan transition-colors ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {pillar.title}
                    </h3>
                    <p className={`text-sm leading-relaxed flex-grow min-h-[3rem] ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {pillar.description}
                    </p>
                    <div className={`flex items-center text-sara-cyan text-sm font-medium mt-4 group-hover:gap-2 transition-all ${
                      isRTL ? 'flex-row-reverse' : ''
                    }`}>
                      <span>{c.explore}</span>
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'me-1 rotate-180' : 'ms-1'} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPlatformSection;
