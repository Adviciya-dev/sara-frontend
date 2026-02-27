'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Rocket, Building2, Users, Truck, Phone, Brain } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageContext';
import servicesData from '../data/services.json';

const CategoryPage = () => {
  const params = useParams();
  const categorySlug = params?.categorySlug;
  const { t, getLocalizedValue, isRTL } = useLanguage();
  
  const category = servicesData.categories.find(c => c.slug === categorySlug);

  const icons = {
    'advanced-solutions-technology': Rocket,
    'government-portals': Building2,
    'hr-performance': Users,
    'fleet-management': Truck,
    'telecom': Phone,
    'ai-solutions': Brain,
  };

  if (!category) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Category not found</h1>
          <Link href="/services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = icons[category.id] || Rocket;

  return (
    <div className="min-h-screen pt-24" data-testid={`category-page-${category.id}`}>
      {/* Hero */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: `${category.color}10` }}
      >
        <div className="absolute inset-0 opacity-5" style={{ backgroundColor: category.color }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              {t('nav.home')}
            </Link>
            <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            <Link href="/services" className="hover:text-foreground transition-colors">
              {t('nav.services')}
            </Link>
            <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-foreground">{getLocalizedValue(category.name)}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-start gap-6"
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <Icon className="w-8 h-8" style={{ color: category.color }} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">
                {getLocalizedValue(category.name)}
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {getLocalizedValue(category.description)}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={`/service/${service.slug}`}
                  className="block group h-full"
                  data-testid={`service-link-${service.id}`}
                >
                  <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-opacity-50 transition-all duration-300 flex flex-col">
                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-sara-cyan transition-colors">
                      {getLocalizedValue(service.name)}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {getLocalizedValue(service.shortDesc)}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-xs"
                          style={{ backgroundColor: `${category.color}15`, color: category.color }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform" style={{ color: category.color }}>
                      {isRTL ? 'المزيد' : 'Learn more'}
                      <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 dark:bg-sara-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-4">
            {isRTL ? 'هل أنت مهتم بخدماتنا؟' : 'Interested in our services?'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isRTL 
              ? 'تواصل معنا اليوم للحصول على استشارة مجانية.'
              : 'Get in touch with us today for a free consultation.'
            }
          </p>
          <Link href="/contact">
            <Button 
              className="rounded-full px-8"
              style={{ backgroundColor: category.color }}
            >
              {t('nav.contact')}
              <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
