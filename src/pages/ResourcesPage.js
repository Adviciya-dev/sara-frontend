import { motion } from 'framer-motion';
import { ArrowRight, Download, FileText, Video, BookOpen, Calculator, CheckSquare, PlayCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const ResourcesPage = () => {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();

  const featuredResources = [
    {
      id: 1,
      title: isRTL ? 'دليل الامتثال للوائح العمل السعودية 2024' : 'Saudi Labor Law Compliance Guide 2024',
      type: isRTL ? 'كتاب إلكتروني' : 'E-Book',
      icon: BookOpen,
      description: isRTL 
        ? 'دليل شامل لفهم وتطبيق نظام العمل السعودي الجديد وتحديثاته الأخيرة'
        : 'Comprehensive guide to understanding and implementing Saudi labor regulations and recent updates',
      category: 'HR',
      pages: 45,
      downloadUrl: '#',
      image: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: isRTL ? 'قائمة تدقيق مقيم للمنشآت' : 'MUQEEM Compliance Checklist for Enterprises',
      type: isRTL ? 'قائمة تدقيق' : 'Checklist',
      icon: CheckSquare,
      description: isRTL 
        ? 'قائمة تدقيق شاملة لضمان الامتثال الكامل لمتطلبات نظام مقيم'
        : 'Complete checklist to ensure full compliance with MUQEEM system requirements',
      category: 'Government',
      items: 32,
      downloadUrl: '#',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: isRTL ? 'حاسبة عائد الاستثمار لإدارة الأسطول' : 'Fleet Management ROI Calculator',
      type: isRTL ? 'أداة حسابية' : 'Calculator Tool',
      icon: Calculator,
      description: isRTL 
        ? 'احسب العائد المتوقع على الاستثمار من تنفيذ نظام إدارة الأسطول'
        : 'Calculate your expected ROI from implementing a fleet management system',
      category: 'Fleet',
      downloadUrl: '#',
      image: 'https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  const resources = [
    {
      id: 4,
      title: isRTL ? 'دليل SEO للسوق السعودي' : 'SEO Guide for Saudi Market',
      type: isRTL ? 'كتاب إلكتروني' : 'E-Book',
      icon: BookOpen,
      description: isRTL 
        ? 'استراتيجيات تحسين محركات البحث المصممة خصيصاً للسوق السعودي والخليجي'
        : 'Search optimization strategies tailored for Saudi and GCC markets',
      category: 'Marketing',
    },
    {
      id: 5,
      title: isRTL ? 'عرض راصد التوضيحي' : 'RASID Fleet System Demo',
      type: isRTL ? 'فيديو' : 'Video',
      icon: PlayCircle,
      description: isRTL 
        ? 'شاهد عرضاً توضيحياً شاملاً لنظام راصد لتتبع وإدارة الأسطول'
        : 'Watch a comprehensive demo of RASID fleet tracking and management system',
      category: 'Fleet',
      duration: '12:45',
    },
    {
      id: 6,
      title: isRTL ? 'دليل Cloud PBX للمبتدئين' : 'Cloud PBX Beginner Guide',
      type: isRTL ? 'كتاب إلكتروني' : 'E-Book',
      icon: BookOpen,
      description: isRTL 
        ? 'كل ما تحتاج معرفته عن أنظمة الهاتف السحابية للشركات'
        : 'Everything you need to know about cloud phone systems for businesses',
      category: 'Telecom',
    },
    {
      id: 7,
      title: isRTL ? 'قالب خطة التحول الرقمي' : 'Digital Transformation Plan Template',
      type: isRTL ? 'قالب' : 'Template',
      icon: FileText,
      description: isRTL 
        ? 'قالب جاهز للاستخدام لتخطيط وتنفيذ مشاريع التحول الرقمي'
        : 'Ready-to-use template for planning and executing digital transformation projects',
      category: 'Strategy',
    },
    {
      id: 8,
      title: isRTL ? 'ندوة: الذكاء الاصطناعي في خدمة العملاء' : 'Webinar: AI in Customer Service',
      type: isRTL ? 'تسجيل ندوة' : 'Webinar Recording',
      icon: Video,
      description: isRTL 
        ? 'تسجيل ندوة حول كيفية استخدام الذكاء الاصطناعي لتحسين خدمة العملاء'
        : 'Recording of webinar on using AI to improve customer service',
      category: 'AI',
      duration: '45:00',
    },
    {
      id: 9,
      title: isRTL ? 'مقارنة أنظمة HR السحابية' : 'Cloud HR Systems Comparison',
      type: isRTL ? 'تقرير' : 'Report',
      icon: FileText,
      description: isRTL 
        ? 'مقارنة شاملة بين أنظمة الموارد البشرية السحابية المتاحة في السوق السعودي'
        : 'Comprehensive comparison of cloud HR systems available in the Saudi market',
      category: 'HR',
    },
    {
      id: 10,
      title: isRTL ? 'دليل تكامل TAMM' : 'TAMM Integration Guide',
      type: isRTL ? 'دليل تقني' : 'Technical Guide',
      icon: BookOpen,
      description: isRTL 
        ? 'دليل تقني للتكامل مع منصة تم لخدمات حكومة أبوظبي'
        : 'Technical guide for integrating with TAMM platform for Abu Dhabi government services',
      category: 'Government',
    },
    {
      id: 11,
      title: isRTL ? 'أفضل ممارسات أمن البيانات' : 'Data Security Best Practices',
      type: isRTL ? 'قائمة تدقيق' : 'Checklist',
      icon: CheckSquare,
      description: isRTL 
        ? 'أفضل الممارسات لحماية بيانات شركتك وفقاً للمعايير السعودية والدولية'
        : 'Best practices for protecting your company data according to Saudi and international standards',
      category: 'Security',
    },
    {
      id: 12,
      title: isRTL ? 'عرض تجريبي: نظام بيزات' : 'BAYZAT System Demo',
      type: isRTL ? 'فيديو' : 'Video',
      icon: PlayCircle,
      description: isRTL 
        ? 'جولة تفاعلية في نظام بيزات للموارد البشرية والرواتب والتأمين'
        : 'Interactive tour of BAYZAT HR, payroll, and insurance system',
      category: 'HR',
      duration: '15:30',
    },
  ];

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
                      <Button className="w-full bg-sara-cyan hover:bg-sara-cyanHover text-white">
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
