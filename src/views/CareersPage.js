'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Briefcase, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageContext';

const CareersPage = () => {
  const { t, isRTL } = useLanguage();

  const jobs = [
    {
      id: 1,
      title: isRTL ? 'مهندس برمجيات أول' : 'Senior Software Engineer',
      department: isRTL ? 'الهندسة' : 'Engineering',
      location: isRTL ? 'الرياض' : 'Riyadh',
      type: isRTL ? 'دوام كامل' : 'Full-time',
    },
    {
      id: 2,
      title: isRTL ? 'مدير منتج' : 'Product Manager',
      department: isRTL ? 'المنتجات' : 'Product',
      location: isRTL ? 'الرياض' : 'Riyadh',
      type: isRTL ? 'دوام كامل' : 'Full-time',
    },
    {
      id: 3,
      title: isRTL ? 'مصمم تجربة المستخدم' : 'UX Designer',
      department: isRTL ? 'التصميم' : 'Design',
      location: isRTL ? 'الرياض' : 'Riyadh',
      type: isRTL ? 'دوام كامل' : 'Full-time',
    },
    {
      id: 4,
      title: isRTL ? 'أخصائي مبيعات' : 'Sales Specialist',
      department: isRTL ? 'المبيعات' : 'Sales',
      location: isRTL ? 'جدة' : 'Jeddah',
      type: isRTL ? 'دوام كامل' : 'Full-time',
    },
    {
      id: 5,
      title: isRTL ? 'مهندس دعم فني' : 'Technical Support Engineer',
      department: isRTL ? 'الدعم' : 'Support',
      location: isRTL ? 'الرياض' : 'Riyadh',
      type: isRTL ? 'دوام كامل' : 'Full-time',
    },
  ];

  const benefits = [
    { icon: '💰', title: isRTL ? 'رواتب تنافسية' : 'Competitive Salary', desc: isRTL ? 'رواتب ومكافآت ممتازة' : 'Excellent pay and bonuses' },
    { icon: '🏥', title: isRTL ? 'تأمين صحي' : 'Health Insurance', desc: isRTL ? 'تغطية شاملة لك ولعائلتك' : 'Full coverage for you and family' },
    { icon: '📚', title: isRTL ? 'التعلم والتطوير' : 'Learning & Growth', desc: isRTL ? 'ميزانية تدريب سنوية' : 'Annual training budget' },
    { icon: '🏠', title: isRTL ? 'العمل المرن' : 'Flexible Work', desc: isRTL ? 'خيارات العمل من المنزل' : 'Remote work options' },
    { icon: '🎯', title: isRTL ? 'مسار وظيفي واضح' : 'Clear Career Path', desc: isRTL ? 'فرص ترقية حقيقية' : 'Real promotion opportunities' },
    { icon: '🌴', title: isRTL ? 'إجازات سخية' : 'Generous PTO', desc: isRTL ? '25+ يوم إجازة سنوياً' : '25+ days annual leave' },
  ];

  return (
    <div className="min-h-screen pt-24" data-testid="careers-page">
      {/* Hero */}
      <section className="py-20 bg-gray-50 dark:bg-sara-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="text-sara-cyan border-sara-cyan/30 bg-sara-cyan/10 mb-4">
              {t('nav.careers')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-6">
              {isRTL ? 'انضم إلى فريقنا' : 'Join Our Team'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isRTL 
                ? 'نبحث عن أشخاص موهوبين ومتحمسين للانضمام إلى مهمتنا في تحويل الأعمال السعودية رقمياً.'
                : "We're looking for talented and passionate people to join our mission of digitally transforming Saudi businesses."
              }
            </p>
          </motion.div>
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
              {isRTL ? 'لماذا سارا؟' : 'Why SARA?'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <span className="text-3xl mb-4 block">{benefit.icon}</span>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50 dark:bg-sara-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-heading text-foreground mb-4">
              {isRTL ? 'الوظائف المتاحة' : 'Open Positions'}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="p-6 rounded-xl bg-card border border-border hover:border-sara-cyan/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-sara-cyan transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Link href="/contact">
                    <Button variant="outline" className="rounded-full group-hover:bg-sara-cyan/10">
                      {isRTL ? 'قدم الآن' : 'Apply Now'}
                      <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">
              {isRTL ? 'لم تجد الوظيفة المناسبة؟' : "Don't see the right role?"}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isRTL 
                ? 'أرسل سيرتك الذاتية وسنتواصل معك عند توفر فرصة مناسبة.'
                : "Send us your resume and we'll reach out when a suitable opportunity arises."
              }
            </p>
            <Link href="/contact">
              <Button className="bg-sara-cyan hover:bg-sara-cyanHover text-white rounded-full px-8">
                {isRTL ? 'أرسل سيرتك الذاتية' : 'Send Your Resume'}
                <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
