'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Award } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const SuccessStoriesPreview = () => {
  const { isRTL, language } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const content = {
    en: {
      badge: 'Client Success',
      title: 'Success Stories',
      subtitle: 'See how we have transformed businesses across Saudi Arabia.',
      viewAll: 'View All Stories',
      stories: [
        {
          title: 'Major Logistics Company',
          stat: '40%',
          label: 'Cost Reduction',
          description: 'Fleet optimization using RASID GPS tracking',
          image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
          title: 'Enterprise HR Transformation',
          stat: '60%',
          label: 'Time Saved',
          description: 'Complete HR digitization with BAYZAT',
          image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
          title: 'Government Compliance',
          stat: '99%',
          label: 'Compliance Rate',
          description: 'Muqeem & TAMM service integration',
          image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
      ]
    },
    ar: {
      badge: 'نجاح العملاء',
      title: 'قصص النجاح',
      subtitle: 'اكتشف كيف حولنا الأعمال في جميع أنحاء المملكة العربية السعودية.',
      viewAll: 'عرض جميع القصص',
      stories: [
        {
          title: 'شركة لوجستية كبرى',
          stat: '40%',
          label: 'خفض التكاليف',
          description: 'تحسين الأسطول باستخدام تتبع راصد GPS',
          image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
          title: 'تحول الموارد البشرية',
          stat: '60%',
          label: 'توفير الوقت',
          description: 'رقمنة الموارد البشرية الكاملة مع بيزات',
          image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
          title: 'الامتثال الحكومي',
          stat: '99%',
          label: 'معدل الامتثال',
          description: 'تكامل خدمات مقيم وتم',
          image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
      ]
    }
  };

  const c = content[language] || content.en;

  return (
    <section 
      ref={ref}
      className={`py-16 md:py-20 ${isDark ? 'bg-sara-navy' : 'bg-white'}`}
      data-testid="success-stories-preview"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 ${isRTL ? 'md:flex-row-reverse' : ''}`}
        >
          <div className={isRTL ? 'text-right' : ''}>
            <Badge 
              variant="outline" 
              className={`mb-4 text-sara-cyan border-sara-cyan/30 ${
                isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/5'
              }`}
            >
              <Award className={`w-3 h-3 ${isRTL ? 'ms-1' : 'me-1'}`} />
              {c.badge}
            </Badge>
            <h2 className={`text-2xl md:text-3xl font-bold font-heading ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {c.title}
            </h2>
            <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {c.subtitle}
            </p>
          </div>
          <Link href="/success-stories">
            <Button 
              variant="outline" 
              className={`rounded-full ${
                isDark ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              {c.viewAll}
              <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.stories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`group rounded-2xl overflow-hidden border ${
                isDark 
                  ? 'bg-sara-surface border-sara-border' 
                  : 'bg-white border-gray-200 shadow-md hover:shadow-xl'
              }`}
            >
              <div className="aspect-video overflow-hidden relative">
                <motion.img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className={`absolute bottom-4 ${isRTL ? 'right-4 text-right' : 'left-4'}`}>
                  <div className={`flex items-baseline gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-3xl font-bold text-white">{story.stat}</span>
                    <span className="text-sm text-white/80">{story.label}</span>
                  </div>
                </div>
              </div>
              <div className={`p-5 ${isRTL ? 'text-right' : ''}`}>
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {story.title}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {story.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesPreview;
