'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const FeaturedServicesSection = () => {
  const { isRTL, language } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Bilingual content
  const content = {
    en: {
      learnMore: 'Learn More',
      serviceCategories: [
        {
          title: 'Featured Government Platforms',
          subtitle: 'Government services for businesses like Muqeem and Tamm',
          color: '#2563EB',
          services: [
            {
              name: 'Muqeem',
              slug: 'muqeem',
              description: 'Complete Muqeem service provider with visa management.',
              tags: ['Visa', 'Government', 'Services'],
            },
            {
              name: 'Tamm',
              slug: 'tamm',
              description: 'Vehicle registration, transfers, and traffic services.',
              tags: ['Vehicles', 'Government', 'KSA'],
            },
          ],
        },
        {
          title: 'HR & Performance',
          subtitle: 'Customised HR solutions for companies',
          color: '#7C3AED',
          services: [
            {
              name: 'BAYZAT',
              slug: 'bayzat',
              description: 'Complete HR with payroll and insurance platform.',
              tags: ['HR', 'Payroll', 'Insurance'],
            },
            {
              name: 'SOLUT',
              slug: 'solut',
              description: 'Performance management and employee engagement.',
              tags: ['HR', 'Performance', 'Engagement'],
            },
          ],
        },
        {
          title: 'Fleet Management',
          subtitle: 'Fleet management with real-time reporting',
          color: '#10B981',
          services: [
            {
              name: 'RASID',
              slug: 'rasid',
              description: 'Operational efficiency with GPS tracking and reports.',
              tags: ['Fleet', 'Logistics', 'GPS'],
            },
          ],
        },
        {
          title: 'Telecom',
          subtitle: 'Business solutions with quality setup and support',
          color: '#F97316',
          services: [
            {
              name: 'Cloud PBX',
              slug: 'cloud-pbx',
              description: 'Seamless and efficient business communication.',
              tags: ['Cloud', 'VoIP', 'Communication'],
            },
          ],
        },
      ],
      advancedServices: {
        title: 'Advanced Solutions & Technology',
        subtitle: 'Digital solutions to accelerate business growth',
        color: '#2DD4BF',
        services: [
          { name: 'SEO, AEO & GEO', slug: 'seo-aeo-geo', description: 'Rank in search and AI models with professional SEO/AEO.', tags: ['SEO', 'AI', 'Growth'] },
          { name: 'Content Marketing', slug: 'content-marketing', description: 'High-quality content to build trust and conversion.', tags: ['Marketing', 'Content', 'Strategy'] },
          { name: 'Growth Marketing', slug: 'growth-marketing', description: 'Data-driven campaigns on Google, Meta, LinkedIn.', tags: ['Ads', 'Growth', 'Analytics'] },
          { name: 'Web Development', slug: 'web-development', description: 'Clean design with powerful backend architecture.', tags: ['Web', 'Development', 'Enterprise'] },
          { name: 'Mobile Apps', slug: 'mobile-development', description: 'High-performing mobile app development services.', tags: ['Mobile', 'iOS', 'Android'] },
          { name: 'QA & Testing', slug: 'qa-testing', description: 'Quality assurance with manual and automated testing.', tags: ['QA', 'Testing', 'Security'] },
        ],
      },
      aiServices: {
        title: 'AI Solutions',
        subtitle: 'Intelligent automation and AI-powered tools',
        color: '#D946EF',
        services: [
          { name: 'Kaleem', slug: 'kaleem', description: 'AI chatbots and virtual assistants for business.', tags: ['AI', 'Chatbot', 'Automation'] },
          { name: 'ReviuAI', slug: 'reviuai', description: 'AI-powered review management to boost rankings.', tags: ['AI', 'Review', 'SEO'], externalLink: 'https://reviuai.com/' },
        ],
      }
    },
    ar: {
      learnMore: 'المزيد',
      serviceCategories: [
        {
          title: 'المنصات الحكومية المميزة',
          subtitle: 'خدمات حكومية للشركات مثل مقيم وتم',
          color: '#2563EB',
          services: [
            {
              name: 'مقيم',
              slug: 'muqeem',
              description: 'مزود خدمة مقيم الشامل لإدارة التأشيرات.',
              tags: ['تأشيرات', 'حكومي', 'خدمات'],
            },
            {
              name: 'تم',
              slug: 'tamm',
              description: 'تسجيل المركبات ونقل الملكية والمرور.',
              tags: ['مركبات', 'حكومي', 'السعودية'],
            },
          ],
        },
        {
          title: 'الموارد البشرية والأداء',
          subtitle: 'حلول موارد بشرية مخصصة للشركات',
          color: '#7C3AED',
          services: [
            {
              name: 'بيزات',
              slug: 'bayzat',
              description: 'حلول موارد بشرية شاملة مع الرواتب والتأمين.',
              tags: ['HR', 'رواتب', 'تأمين'],
            },
            {
              name: 'سولوت',
              slug: 'solut',
              description: 'إدارة الأداء ومشاركة الموظفين.',
              tags: ['HR', 'أداء', 'مشاركة'],
            },
          ],
        },
        {
          title: 'إدارة الأسطول',
          subtitle: 'إدارة الأسطول مع التقارير الفورية',
          color: '#10B981',
          services: [
            {
              name: 'راصد',
              slug: 'rasid',
              description: 'الكفاءة التشغيلية مع تتبع GPS والتقارير.',
              tags: ['أسطول', 'لوجستيات', 'GPS'],
            },
          ],
        },
        {
          title: 'الاتصالات',
          subtitle: 'حلول أعمال مع إعداد ودعم عالي الجودة',
          color: '#F97316',
          services: [
            {
              name: 'كلاود PBX',
              slug: 'cloud-pbx',
              description: 'اتصالات أعمال سلسة وفعالة.',
              tags: ['سحابي', 'VoIP', 'اتصالات'],
            },
          ],
        },
      ],
      advancedServices: {
        title: 'الحلول المتقدمة والتقنية',
        subtitle: 'حلول رقمية لتسريع نمو الأعمال',
        color: '#2DD4BF',
        services: [
          { name: 'SEO و AEO و GEO', slug: 'seo-aeo-geo', description: 'تصدر نتائج البحث والذكاء الاصطناعي المهني.', tags: ['SEO', 'ذكاء', 'نمو'] },
          { name: 'تسويق المحتوى', slug: 'content-marketing', description: 'محتوى عالي الجودة لبناء الثقة والتحويل.', tags: ['تسويق', 'محتوى', 'استراتيجية'] },
          { name: 'تسويق النمو', slug: 'growth-marketing', description: 'حملات مبنية على البيانات عبر Google وMeta.', tags: ['إعلانات', 'نمو', 'تحليلات'] },
          { name: 'تطوير الويب', slug: 'web-development', description: 'تصميم نظيف مع بنية خلفية قوية.', tags: ['ويب', 'تطوير', 'مؤسسات'] },
          { name: 'تطبيقات الجوال', slug: 'mobile-development', description: 'خدمات تطوير تطبيقات جوال عالية الأداء.', tags: ['جوال', 'iOS', 'Android'] },
          { name: 'ضمان الجودة', slug: 'qa-testing', description: 'ضمان الجودة مع الاختبار اليدوي والآلي.', tags: ['جودة', 'اختبار', 'أمان'] },
        ],
      },
      aiServices: {
        title: 'حلول الذكاء الاصطناعي',
        subtitle: 'أدوات الأتمتة الذكية والذكاء الاصطناعي',
        color: '#D946EF',
        services: [
          { name: 'كليم', slug: 'kaleem', description: 'روبوتات محادثة ومساعدين افتراضيين للأعمال.', tags: ['ذكاء', 'شات بوت', 'أتمتة'] },
          { name: 'ReviuAI', slug: 'reviuai', description: 'إدارة مراجعات بالذكاء الاصطناعي لتعزيز التصنيف.', tags: ['ذكاء', 'مراجعات', 'SEO'], externalLink: 'https://reviuai.com/' },
        ],
      }
    }
  };

  const c = content[language] || content.en;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const ServiceCard = ({ service, color }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3 }}
      className={`p-4 md:p-5 rounded-xl border transition-all h-full flex flex-col ${
        isDark 
          ? 'bg-sara-surface border-sara-border hover:border-opacity-50' 
          : 'bg-white border-gray-200 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {service.name}
        </h4>
        {service.externalLink && (
          <a 
            href={service.externalLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sara-cyan hover:scale-110 transition-transform flex-shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      <p className={`text-sm mb-3 flex-grow min-h-[2.5rem] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {service.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {service.tags.map((tag) => (
          <Badge 
            key={tag} 
            variant="secondary" 
            className="text-xs"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <Link href={`/service/${service.slug}`} className="mt-auto">
        <span className={`inline-flex items-center text-sm font-medium ${isRTL ? 'flex-row-reverse' : ''}`} style={{ color }}>
          {c.learnMore}
          <ArrowRight className={`w-3 h-3 ${isRTL ? 'me-1 rotate-180' : 'ms-1'}`} />
        </span>
      </Link>
    </motion.div>
  );

  return (
    <section 
      ref={ref}
      className={`py-16 md:py-20 ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}
      data-testid="featured-services-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Categories Grid */}
        <div className="space-y-12 md:space-y-16">
          {/* Government & HR Services - 2x2 grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div 
                className="w-1 h-8 rounded-full" 
                style={{ backgroundColor: c.serviceCategories[0].color }} 
              />
              <div className={isRTL ? 'text-right' : ''}>
                <h2 className={`text-xl md:text-2xl font-bold font-heading ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {c.serviceCategories[0].title}
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {c.serviceCategories[0].subtitle}
                </p>
              </div>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {c.serviceCategories[0].services.map((service) => (
                <ServiceCard key={service.slug} service={service} color={c.serviceCategories[0].color} />
              ))}
            </motion.div>
          </motion.div>

          {/* HR & Performance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div 
                className="w-1 h-8 rounded-full" 
                style={{ backgroundColor: c.serviceCategories[1].color }} 
              />
              <div className={isRTL ? 'text-right' : ''}>
                <h2 className={`text-xl md:text-2xl font-bold font-heading ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {c.serviceCategories[1].title}
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {c.serviceCategories[1].subtitle}
                </p>
              </div>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {c.serviceCategories[1].services.map((service) => (
                <ServiceCard key={service.slug} service={service} color={c.serviceCategories[1].color} />
              ))}
            </motion.div>
          </motion.div>

          {/* Fleet & Telecom - Side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Fleet Management */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div 
                  className="w-1 h-8 rounded-full" 
                  style={{ backgroundColor: c.serviceCategories[2].color }} 
                />
                <div className={isRTL ? 'text-right' : ''}>
                  <h2 className={`text-xl md:text-2xl font-bold font-heading ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {c.serviceCategories[2].title}
                  </h2>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {c.serviceCategories[2].subtitle}
                  </p>
                </div>
              </div>
              <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                {c.serviceCategories[2].services.map((service) => (
                  <ServiceCard key={service.slug} service={service} color={c.serviceCategories[2].color} />
                ))}
              </motion.div>
            </motion.div>

            {/* Telecom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div 
                  className="w-1 h-8 rounded-full" 
                  style={{ backgroundColor: c.serviceCategories[3].color }} 
                />
                <div className={isRTL ? 'text-right' : ''}>
                  <h2 className={`text-xl md:text-2xl font-bold font-heading ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {c.serviceCategories[3].title}
                  </h2>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {c.serviceCategories[3].subtitle}
                  </p>
                </div>
              </div>
              <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                {c.serviceCategories[3].services.map((service) => (
                  <ServiceCard key={service.slug} service={service} color={c.serviceCategories[3].color} />
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Advanced Solutions - 3 per row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div 
                className="w-1 h-8 rounded-full" 
                style={{ backgroundColor: c.advancedServices.color }} 
              />
              <div className={isRTL ? 'text-right' : ''}>
                <h2 className={`text-xl md:text-2xl font-bold font-heading ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {c.advancedServices.title}
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {c.advancedServices.subtitle}
                </p>
              </div>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {c.advancedServices.services.map((service) => (
                <ServiceCard key={service.slug} service={service} color={c.advancedServices.color} />
              ))}
            </motion.div>
          </motion.div>

          {/* AI Solutions - 2 per row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div 
                className="w-1 h-8 rounded-full" 
                style={{ backgroundColor: c.aiServices.color }} 
              />
              <div className={isRTL ? 'text-right' : ''}>
                <h2 className={`text-xl md:text-2xl font-bold font-heading ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {c.aiServices.title}
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {c.aiServices.subtitle}
                </p>
              </div>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {c.aiServices.services.map((service) => (
                <ServiceCard key={service.slug} service={service} color={c.aiServices.color} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServicesSection;
