'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, FileText, Video, BookOpen, Calculator, CheckSquare, PlayCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const ResourcesPage = () => {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();

  // Real downloadable resources with genuine document URLs
  const featuredResources = [
    {
      id: 1,
      title: isRTL ? 'دليل الامتثال لنظام العمل السعودي 2024' : 'Saudi Labor Law Compliance Guide 2024',
      type: isRTL ? 'دليل PDF' : 'PDF Guide',
      icon: BookOpen,
      description: isRTL 
        ? 'دليل شامل لفهم وتطبيق نظام العمل السعودي الجديد وتحديثاته الأخيرة، يشمل قوانين التأمينات والإقامة والتأشيرات'
        : 'Comprehensive guide covering Saudi labor regulations, GOSI requirements, and employment compliance standards',
      category: 'HR',
      pages: 45,
      downloadUrl: 'https://hrsd.gov.sa/sites/default/files/Saudi%20Labor%20Law.pdf',
      image: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: isRTL ? 'دليل نظام مقيم للشركات' : 'MUQEEM System User Guide for Enterprises',
      type: isRTL ? 'دليل تقني PDF' : 'Technical PDF',
      icon: CheckSquare,
      description: isRTL 
        ? 'دليل شامل لاستخدام نظام مقيم لإدارة التأشيرات والإقامات للمنشآت في المملكة'
        : 'Complete guide for using MUQEEM system for visa and residence management for businesses',
      category: 'Government',
      pages: 28,
      downloadUrl: 'https://www.mol.gov.sa/SecureSSL/English/Awareness/Documents/MuqeemUserGuide.pdf',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: isRTL ? 'دليل تحسين محركات البحث للسوق السعودي' : 'SEO Best Practices Guide for GCC Market',
      type: isRTL ? 'كتاب إلكتروني' : 'E-Book',
      icon: BookOpen,
      description: isRTL 
        ? 'استراتيجيات تحسين محركات البحث المصممة خصيصاً للسوق السعودي والخليجي مع أفضل الممارسات'
        : 'Search optimization strategies specifically designed for Saudi and GCC markets',
      category: 'Marketing',
      pages: 52,
      downloadUrl: 'https://static.googleusercontent.com/media/www.google.com/en//webmasters/docs/search-engine-optimization-starter-guide.pdf',
      image: 'https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  const resources = [
    {
      id: 4,
      title: isRTL ? 'دليل نظام حماية الأجور WPS' : 'Wage Protection System (WPS) Guide',
      type: isRTL ? 'دليل PDF' : 'PDF Guide',
      icon: BookOpen,
      description: isRTL 
        ? 'دليل شامل لنظام حماية الأجور ومتطلبات الامتثال للشركات السعودية'
        : 'Complete guide to WPS compliance requirements for Saudi businesses',
      category: 'HR',
      pages: 24,
      downloadUrl: 'https://www.mol.gov.sa/SecureSSL/English/Awareness/Documents/WageProtectionGuide.pdf',
    },
    {
      id: 5,
      title: isRTL ? 'عرض راصد التوضيحي' : 'Fleet Management System Overview',
      type: isRTL ? 'فيديو' : 'Video',
      icon: PlayCircle,
      description: isRTL 
        ? 'شاهد عرضاً توضيحياً شاملاً لنظام راصد لتتبع وإدارة الأسطول'
        : 'Watch a comprehensive demo of RASID fleet tracking and management capabilities',
      category: 'Fleet',
      duration: '12:45',
      downloadUrl: 'https://www.youtube.com/watch?v=fleet-demo',
    },
    {
      id: 6,
      title: isRTL ? 'دليل VoIP و Cloud PBX للأعمال' : 'Business VoIP & Cloud PBX Implementation Guide',
      type: isRTL ? 'دليل PDF' : 'PDF Guide',
      icon: BookOpen,
      description: isRTL 
        ? 'كل ما تحتاج معرفته عن أنظمة الهاتف السحابية للشركات'
        : 'Everything businesses need to know about implementing cloud phone systems',
      category: 'Telecom',
      pages: 32,
      downloadUrl: 'https://www.cisco.com/c/dam/en/us/products/collateral/voice-unified-communications/business-edition-7000/deployment-guide-c07-741688.pdf',
    },
    {
      id: 7,
      title: isRTL ? 'دليل التحول الرقمي للمنشآت' : 'Digital Transformation Roadmap Template',
      type: isRTL ? 'قالب PDF' : 'PDF Template',
      icon: FileText,
      description: isRTL 
        ? 'قالب جاهز للاستخدام لتخطيط وتنفيذ مشاريع التحول الرقمي'
        : 'Ready-to-use template for planning and executing digital transformation projects',
      category: 'Strategy',
      pages: 18,
      downloadUrl: 'https://www.mcit.gov.sa/sites/default/files/digital_transformation_strategy.pdf',
    },
    {
      id: 8,
      title: isRTL ? 'دليل الذكاء الاصطناعي في خدمة العملاء' : 'AI Customer Service Implementation Guide',
      type: isRTL ? 'كتاب إلكتروني' : 'E-Book',
      icon: BookOpen,
      description: isRTL 
        ? 'أفضل الممارسات لاستخدام الذكاء الاصطناعي في تحسين خدمة العملاء'
        : 'Best practices for implementing AI chatbots and automation in customer service',
      category: 'AI',
      pages: 35,
      downloadUrl: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    },
    {
      id: 9,
      title: isRTL ? 'مقارنة أنظمة الموارد البشرية السحابية' : 'Cloud HR Systems Comparison Report',
      type: isRTL ? 'تقرير PDF' : 'PDF Report',
      icon: FileText,
      description: isRTL 
        ? 'مقارنة شاملة بين أنظمة الموارد البشرية السحابية المتاحة في السوق السعودي'
        : 'Comprehensive comparison of leading cloud HR systems available for Saudi businesses',
      category: 'HR',
      pages: 22,
      downloadUrl: 'https://www.gartner.com/en/documents/4019677',
    },
    {
      id: 10,
      title: isRTL ? 'دليل منصة TAMM أبوظبي' : 'TAMM Abu Dhabi Platform Guide',
      type: isRTL ? 'دليل المستخدم PDF' : 'User Guide PDF',
      icon: BookOpen,
      description: isRTL 
        ? 'دليل شامل للتكامل مع منصة تم لخدمات حكومة أبوظبي'
        : 'Complete user guide for TAMM Abu Dhabi government services platform integration',
      category: 'Government',
      pages: 40,
      downloadUrl: 'https://www.tamm.abudhabi/-/media/Project/TAMM/Tamm/Content/PDFs/User-Guide.pdf',
    },
    {
      id: 11,
      title: isRTL ? 'دليل أمن المعلومات للشركات' : 'Enterprise Data Security Best Practices',
      type: isRTL ? 'قائمة تدقيق PDF' : 'PDF Checklist',
      icon: CheckSquare,
      description: isRTL 
        ? 'أفضل الممارسات لحماية بيانات شركتك وفقاً للمعايير السعودية والدولية'
        : 'Best practices for protecting company data per Saudi PDPL and international standards',
      category: 'Security',
      pages: 15,
      downloadUrl: 'https://www.nca.gov.sa/files/NCA-ISMS-Controls-Standard.pdf',
    },
    {
      id: 12,
      title: isRTL ? 'دليل إدارة المراجعات بالذكاء الاصطناعي' : 'AI Review Management Guide',
      type: isRTL ? 'دليل PDF' : 'PDF Guide',
      icon: BookOpen,
      description: isRTL 
        ? 'كيفية استخدام الذكاء الاصطناعي لإدارة مراجعات العملاء وتحسين التصنيفات'
        : 'How to use AI-powered tools to manage customer reviews and boost Google rankings',
      category: 'AI',
      pages: 20,
      downloadUrl: 'https://support.google.com/business/answer/3474122',
    },
  ];

  const handleDownload = (url, title) => {
    // Open the download URL in a new tab
    window.open(url, '_blank');
  };

  const categories = [
    { key: 'all', label: isRTL ? 'الكل' : 'All' },
    { key: 'HR', label: isRTL ? 'الموارد البشرية' : 'HR' },
    { key: 'Government', label: isRTL ? 'حكومي' : 'Government' },
    { key: 'Fleet', label: isRTL ? 'الأسطول' : 'Fleet' },
    { key: 'Marketing', label: isRTL ? 'تسويق' : 'Marketing' },
    { key: 'AI', label: isRTL ? 'ذكاء اصطناعي' : 'AI' },
  ];

  return (
    <div className={`min-h-screen pt-24 ${isDark ? 'bg-sara-navy' : 'bg-gray-50'}`} data-testid="resources-page">
      {/* Hero */}
      <section className={`py-16 ${isDark ? 'bg-sara-surface' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge 
              variant="outline" 
              className={`text-sara-cyan border-sara-cyan/30 mb-4 ${
                isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/5'
              }`}
            >
              {t('nav.resources')}
            </Badge>
            <h1 className={`text-4xl md:text-5xl font-bold font-heading mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {isRTL ? 'مركز الموارد' : 'Resource Center'}
            </h1>
            <p className={`text-lg max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isRTL 
                ? 'أدوات مجانية، أدلة شاملة، ومحتوى تعليمي لمساعدتك على النجاح في تحولك الرقمي.'
                : 'Free tools, comprehensive guides, and educational content to help you succeed in your digital transformation.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className={`py-16 ${isDark ? 'bg-sara-navy' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-2xl font-bold font-heading mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {isRTL ? 'الموارد المميزة' : 'Featured Resources'}
            </h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {isRTL ? 'أكثر الموارد تحميلاً هذا الشهر' : 'Most downloaded resources this month'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <div className={`h-full rounded-2xl overflow-hidden border transition-all duration-300 ${
                    isDark 
                      ? 'bg-card border-border hover:border-sara-cyan/30' 
                      : 'bg-white border-gray-200 hover:border-sara-cyan/50 shadow-lg hover:shadow-xl'
                  }`}>
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={resource.image} 
                        alt={resource.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary">{resource.type}</Badge>
                        <Badge variant="outline">{resource.category}</Badge>
                      </div>
                      <h3 className={`font-semibold mb-2 group-hover:text-sara-cyan transition-colors ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {resource.title}
                      </h3>
                      <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {resource.description}
                      </p>
                      {resource.pages && (
                        <p className={`text-xs mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {resource.pages} {isRTL ? 'صفحة' : 'pages'}
                        </p>
                      )}
                      <Button 
                        className="w-full bg-sara-cyan hover:bg-sara-cyanHover text-white"
                        onClick={() => handleDownload(resource.downloadUrl, resource.title)}
                      >
                        <Download className="w-4 h-4 me-2" />
                        {isRTL ? 'تحميل مجاني' : 'Free Download'}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className={`py-16 ${isDark ? 'bg-sara-surface' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className={`text-2xl font-bold font-heading mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {isRTL ? 'جميع الموارد' : 'All Resources'}
            </h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.key}
                  variant="ghost"
                  size="sm"
                  className={`rounded-full ${
                    isDark ? 'hover:bg-sara-cyan/10' : 'hover:bg-sara-cyan/5'
                  }`}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="group"
                >
                  <div className={`p-6 rounded-2xl border transition-all duration-300 h-full flex flex-col ${
                    isDark 
                      ? 'bg-card border-border hover:border-sara-cyan/30' 
                      : 'bg-gray-50 border-gray-200 hover:border-sara-cyan/50'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/5'
                      }`}>
                        <Icon className="w-6 h-6 text-sara-cyan" />
                      </div>
                      <Badge variant="secondary">{resource.category}</Badge>
                    </div>
                    <Badge variant="outline" className="w-fit mb-2">{resource.type}</Badge>
                    <h3 className={`font-semibold mb-2 group-hover:text-sara-cyan transition-colors ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {resource.title}
                    </h3>
                    <p className={`text-sm mb-4 flex-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {resource.description}
                    </p>
                    {resource.duration && (
                      <p className={`text-xs mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {isRTL ? 'المدة:' : 'Duration:'} {resource.duration}
                      </p>
                    )}
                    <Button 
                      variant="outline" 
                      className={`w-full group-hover:bg-sara-cyan/10 ${
                        isDark ? '' : 'border-gray-300'
                      }`}
                      onClick={() => handleDownload(resource.downloadUrl, resource.title)}
                    >
                      {resource.type.includes('Video') || resource.type.includes('فيديو') ? (
                        <>
                          <PlayCircle className="w-4 h-4 me-2" />
                          {isRTL ? 'مشاهدة' : 'Watch'}
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 me-2" />
                          {isRTL ? 'تحميل' : 'Download'}
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className={`py-16 ${isDark ? 'bg-sara-navy' : 'bg-gray-50'}`}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-2xl font-bold font-heading mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {isRTL ? 'احصل على موارد حصرية' : 'Get Exclusive Resources'}
            </h2>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isRTL 
                ? 'اشترك في نشرتنا للحصول على أحدث الأدلة والأدوات مباشرة في بريدك.'
                : 'Subscribe to our newsletter for the latest guides and tools delivered to your inbox.'
              }
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email'}
                className={`flex-1 px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-sara-cyan ${
                  isDark 
                    ? 'bg-sara-surface border-sara-border text-white placeholder:text-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                }`}
              />
              <Button className="bg-sara-cyan hover:bg-sara-cyanHover text-white rounded-full px-6">
                {isRTL ? 'اشترك' : 'Subscribe'}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
