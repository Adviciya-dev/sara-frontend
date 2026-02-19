import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Check, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useLanguage } from '../context/LanguageContext';
import servicesData from '../data/services.json';

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const { t, getLocalizedValue, isRTL } = useLanguage();
  
  // Find the service and its category
  let service = null;
  let category = null;
  
  for (const cat of servicesData.categories) {
    const found = cat.services.find(s => s.slug === serviceSlug);
    if (found) {
      service = found;
      category = cat;
      break;
    }
  }

  if (!service || !category) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Service not found</h1>
          <Link to="/services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  const benefits = [
    isRTL ? 'توفير الوقت والجهد' : 'Save time and effort',
    isRTL ? 'تحسين الكفاءة التشغيلية' : 'Improve operational efficiency',
    isRTL ? 'امتثال كامل للوائح' : 'Full regulatory compliance',
    isRTL ? 'دعم فني متخصص 24/7' : '24/7 expert technical support',
    isRTL ? 'تكامل سلس مع أنظمتك' : 'Seamless integration with your systems',
  ];

  const faqs = [
    {
      q: isRTL ? 'كيف يمكنني البدء؟' : 'How do I get started?',
      a: isRTL ? 'يمكنك التواصل معنا عبر نموذج الاتصال أو الاتصال المباشر لحجز استشارة مجانية.' : 'You can reach out to us through the contact form or call us directly to schedule a free consultation.',
    },
    {
      q: isRTL ? 'ما هي مدة التنفيذ؟' : 'What is the implementation timeline?',
      a: isRTL ? 'يعتمد ذلك على حجم ومتطلبات مشروعك. عادة ما يستغرق التنفيذ من 2-4 أسابيع.' : 'It depends on the size and requirements of your project. Typically, implementation takes 2-4 weeks.',
    },
    {
      q: isRTL ? 'هل تقدمون التدريب؟' : 'Do you provide training?',
      a: isRTL ? 'نعم، نقدم تدريباً شاملاً لفريقك لضمان الاستخدام الأمثل للحل.' : 'Yes, we provide comprehensive training for your team to ensure optimal use of the solution.',
    },
    {
      q: isRTL ? 'ما هي خيارات الدعم المتاحة؟' : 'What support options are available?',
      a: isRTL ? 'نقدم دعماً فنياً على مدار الساعة عبر الهاتف والبريد الإلكتروني والدردشة المباشرة.' : 'We offer 24/7 technical support via phone, email, and live chat.',
    },
  ];

  return (
    <div className="min-h-screen pt-24" data-testid={`service-detail-page-${service.id}`}>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-sara-navy dark:via-sara-surface dark:to-sara-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">
              {t('nav.home')}
            </Link>
            <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            <Link to="/services" className="hover:text-white transition-colors">
              {t('nav.services')}
            </Link>
            <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            <Link to={`/services/${category.slug}`} className="hover:text-white transition-colors">
              {getLocalizedValue(category.name)}
            </Link>
            <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-white">{getLocalizedValue(service.name)}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge 
                className="mb-4"
                style={{ backgroundColor: `${category.color}30`, color: category.color }}
              >
                {getLocalizedValue(category.name)}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">
                {getLocalizedValue(service.name)}
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                {getLocalizedValue(service.shortDesc)}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {service.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-gray-500 text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 text-white"
                    style={{ backgroundColor: category.color }}
                    data-testid="service-cta-demo"
                  >
                    {isRTL ? 'طلب عرض توضيحي' : 'Request Demo'}
                    <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="rounded-full px-8 border-gray-500 text-white hover:bg-white/10">
                    {isRTL ? 'تحدث مع فريقنا' : 'Talk to our team'}
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div 
                className="aspect-video rounded-2xl overflow-hidden"
                style={{ backgroundColor: `${category.color}10` }}
              >
                <img
                  src={servicesData.categories.find(c => c.id === category.id) 
                    ? `https://images.unsplash.com/photo-1636108935910-0188b979550d?crop=entropy&cs=srgb&fm=jpg&q=85`
                    : 'https://images.unsplash.com/photo-1636108935910-0188b979550d?crop=entropy&cs=srgb&fm=jpg&q=85'
                  }
                  alt={getLocalizedValue(service.name)}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sara-navy/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-semibold text-lg">
                    {getLocalizedValue(service.name)}
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-heading text-foreground mb-4">
              {isRTL ? 'المزايا الرئيسية' : 'Key Benefits'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border"
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <Check className="w-4 h-4" style={{ color: category.color }} />
                </div>
                <p className="text-foreground font-medium">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-sara-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <HelpCircle className="w-12 h-12 mx-auto mb-4" style={{ color: category.color }} />
            <h2 className="text-3xl font-bold font-heading text-foreground mb-4">
              {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="bg-card border border-border rounded-xl px-6"
              >
                <AccordionTrigger className="text-foreground font-medium text-start hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold font-heading text-foreground mb-4">
              {isRTL ? 'هل أنت مستعد للبدء؟' : 'Ready to get started?'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isRTL 
                ? 'تواصل معنا اليوم واحصل على استشارة مجانية.'
                : 'Contact us today and get a free consultation.'
              }
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="rounded-full px-8"
                style={{ backgroundColor: category.color }}
              >
                {t('hero.cta')}
                <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
