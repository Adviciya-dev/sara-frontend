import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Building2, Target, Heart, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageContext';

const WhoWeArePage = () => {
  const { t, isRTL } = useLanguage();

  const values = [
    { icon: Target, title: isRTL ? 'التميز' : 'Excellence', desc: isRTL ? 'نسعى للتميز في كل ما نقدمه' : 'We strive for excellence in everything we deliver' },
    { icon: Heart, title: isRTL ? 'الثقة' : 'Trust', desc: isRTL ? 'نبني علاقات طويلة الأمد مع عملائنا' : 'We build long-term relationships with our clients' },
    { icon: Lightbulb, title: isRTL ? 'الابتكار' : 'Innovation', desc: isRTL ? 'نتبنى أحدث التقنيات والحلول' : 'We embrace the latest technologies and solutions' },
  ];

  const milestones = [
    { year: '2004', event: isRTL ? 'تأسيس الشركة' : 'Company Founded' },
    { year: '2010', event: isRTL ? 'الشراكة مع علم' : 'Partnership with Elm' },
    { year: '2015', event: isRTL ? 'إطلاق حلول الموارد البشرية' : 'HR Solutions Launch' },
    { year: '2020', event: isRTL ? 'إطلاق منصة الذكاء الاصطناعي' : 'AI Platform Launch' },
    { year: '2024', event: isRTL ? 'خدمة أكثر من 20,000 عميل' : 'Serving 20,000+ Clients' },
  ];

  return (
    <div className="min-h-screen pt-24" data-testid="who-we-are-page">
      {/* Hero */}
      <section className="py-20 bg-gray-50 dark:bg-sara-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.pexels.com/photos/5257001/pexels-photo-5257001.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge variant="outline" className="text-sara-cyan border-sara-cyan/30 bg-sara-cyan/10 mb-4">
              {t('nav.whoWeAre')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-6">
              {isRTL 
                ? 'تمكين المؤسسات السعودية منذ 2004'
                : 'Empowering Saudi Enterprises Since 2004'
              }
            </h1>
            <p className="text-lg text-muted-foreground">
              {isRTL 
                ? 'سارا لحلول الأعمال هي شركة سعودية رائدة في تقديم الحلول الرقمية والحكومية المتكاملة للمؤسسات.'
                : 'SARA Business Solutions is a leading Saudi company providing integrated digital and government solutions for enterprises.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '20+', label: isRTL ? 'سنوات الخبرة' : 'Years Experience' },
              { value: '20K+', label: isRTL ? 'عميل' : 'Clients' },
              { value: '50+', label: isRTL ? 'شريك' : 'Partners' },
              { value: '99%', label: isRTL ? 'رضا العملاء' : 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-sara-cyan mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50 dark:bg-sara-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-heading text-foreground mb-4">
              {isRTL ? 'قيمنا' : 'Our Values'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="text-center p-8 rounded-2xl bg-card border border-border"
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-sara-cyan/10 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-sara-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-heading text-foreground mb-4">
              {isRTL ? 'رحلتنا' : 'Our Journey'}
            </h2>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-6"
              >
                <div className="w-20 shrink-0">
                  <span className="text-2xl font-bold text-sara-cyan">{milestone.year}</span>
                </div>
                <div className="w-4 h-4 rounded-full bg-sara-cyan shrink-0" />
                <div className="flex-1 p-4 rounded-xl bg-card border border-border">
                  <p className="text-foreground font-medium">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-gray-50 dark:bg-sara-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold font-heading text-foreground mb-4">
              {isRTL ? 'شركاؤنا' : 'Our Partners'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isRTL 
                ? 'شراكات استراتيجية تعزز قدراتنا'
                : 'Strategic partnerships that enhance our capabilities'
              }
            </p>
            <div className="flex justify-center items-center gap-12 flex-wrap">
              <div className="text-2xl font-bold text-muted-foreground">Elm</div>
              <div className="text-2xl font-bold text-muted-foreground">Bahamdan Group</div>
            </div>
          </motion.div>
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
              {isRTL ? 'انضم إلى عملائنا الناجحين' : 'Join Our Successful Clients'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isRTL 
                ? 'ابدأ رحلة التحول الرقمي معنا اليوم'
                : 'Start your digital transformation journey with us today'
              }
            </p>
            <Link to="/contact">
              <Button className="bg-sara-cyan hover:bg-sara-cyanHover text-white rounded-full px-8">
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

export default WhoWeArePage;
