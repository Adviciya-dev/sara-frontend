import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Rocket, Building2, Users, Truck, Phone, Brain } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageContext';
import servicesData from '../data/services.json';

const ServicesPage = () => {
  const { t, getLocalizedValue, isRTL } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const icons = {
    'advanced-solutions-technology': Rocket,
    'government-portals': Building2,
    'hr-performance': Users,
    'fleet-management': Truck,
    'telecom': Phone,
    'ai-solutions': Brain,
  };

  return (
    <div className="min-h-screen pt-24" data-testid="services-page">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-sara-navy dark:via-sara-surface dark:to-sara-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="outline" className="text-sara-cyan border-sara-cyan/30 bg-sara-cyan/10 mb-4">
              {t('nav.services')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">
              {isRTL ? 'حلولنا الشاملة' : 'Our Comprehensive Solutions'}
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {isRTL 
                ? 'من البوابات الحكومية إلى حلول الذكاء الاصطناعي، نقدم مجموعة كاملة من الخدمات الرقمية للمؤسسات السعودية.'
                : 'From government portals to AI solutions, we offer a complete suite of digital services for Saudi enterprises.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section ref={ref} className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.categories.map((category, index) => {
              const Icon = icons[category.id] || Rocket;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={`/services/${category.slug}`}
                    className="block group h-full"
                    data-testid={`category-card-${category.id}`}
                  >
                    <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-opacity-50 transition-all duration-300 flex flex-col">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: category.color }} />
                      </div>
                      <h3 className="text-xl font-bold font-heading text-foreground mb-3 group-hover:text-sara-cyan transition-colors">
                        {getLocalizedValue(category.name)}
                      </h3>
                      <p className="text-muted-foreground mb-6 flex-1">
                        {getLocalizedValue(category.description)}
                      </p>
                      <div className="space-y-2 mb-6">
                        {category.services.slice(0, 3).map((service) => (
                          <div key={service.id} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: category.color }} />
                            {getLocalizedValue(service.name)}
                          </div>
                        ))}
                        {category.services.length > 3 && (
                          <div className="text-sm text-muted-foreground">
                            +{category.services.length - 3} more
                          </div>
                        )}
                      </div>
                      <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform" style={{ color: category.color }}>
                        {isRTL ? 'استكشف الخدمات' : 'Explore services'}
                        <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 dark:bg-sara-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-4">
            {isRTL ? 'لم تجد ما تبحث عنه؟' : "Can't find what you're looking for?"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isRTL 
              ? 'تواصل معنا وسنساعدك في إيجاد الحل المناسب لاحتياجات عملك.'
              : "Get in touch with us and we'll help you find the right solution for your business needs."
            }
          </p>
          <Link to="/contact">
            <Button className="bg-sara-cyan hover:bg-sara-cyanHover text-white rounded-full px-8">
              {t('nav.contact')}
              <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
