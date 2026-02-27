'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageContext';

const SuccessStoriesPage = () => {
  const { t, isRTL } = useLanguage();

  const stories = [
    {
      id: 1,
      client: isRTL ? 'شركة لوجستية كبرى' : 'Major Logistics Company',
      industry: isRTL ? 'النقل' : 'Transportation',
      logo: '/logos/logistics.png',
      challenge: isRTL ? 'تتبع يدوي للأسطول يسبب تأخيرات وخسائر' : 'Manual fleet tracking causing delays and losses',
      solution: isRTL ? 'تطبيق نظام راصد للتتبع' : 'RASID Implementation',
      results: [
        { metric: '40%', label: isRTL ? 'خفض التكاليف' : 'Cost Reduction' },
        { metric: '60%', label: isRTL ? 'تحسين الكفاءة' : 'Efficiency Improvement' },
        { metric: '24/7', label: isRTL ? 'مراقبة مستمرة' : 'Continuous Monitoring' },
      ],
      quote: isRTL 
        ? 'حولت سارا عملياتنا اللوجستية بالكامل. الآن لدينا رؤية كاملة لأسطولنا.'
        : 'SARA completely transformed our logistics operations. We now have full visibility of our fleet.',
      image: 'https://images.pexels.com/photos/35501717/pexels-photo-35501717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      id: 2,
      client: isRTL ? 'مجموعة رعاية صحية' : 'Healthcare Group',
      industry: isRTL ? 'الرعاية الصحية' : 'Healthcare',
      logo: '/logos/healthcare.png',
      challenge: isRTL ? 'إدارة معقدة للموارد البشرية والرواتب' : 'Complex HR and payroll management',
      solution: isRTL ? 'تكامل بيزات' : 'BAYZAT Integration',
      results: [
        { metric: '60%', label: isRTL ? 'توفير الوقت' : 'Time Saved' },
        { metric: '100%', label: isRTL ? 'دقة الرواتب' : 'Payroll Accuracy' },
        { metric: '3x', label: isRTL ? 'رضا الموظفين' : 'Employee Satisfaction' },
      ],
      quote: isRTL 
        ? 'بيزات وفر علينا ساعات من العمل اليدوي كل أسبوع. فريقنا أصبح أكثر إنتاجية.'
        : 'BAYZAT saved us hours of manual work every week. Our team is now more productive.',
      image: 'https://images.pexels.com/photos/8554063/pexels-photo-8554063.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      id: 3,
      client: isRTL ? 'مقاول حكومي' : 'Government Contractor',
      industry: isRTL ? 'البناء' : 'Construction',
      logo: '/logos/construction.png',
      challenge: isRTL ? 'مشاكل الامتثال للتأشيرات' : 'Visa compliance issues',
      solution: isRTL ? 'خدمات مقيم' : 'MUQEEM Services',
      results: [
        { metric: '100%', label: isRTL ? 'الامتثال' : 'Compliance' },
        { metric: '0', label: isRTL ? 'مخالفات' : 'Violations' },
        { metric: '50%', label: isRTL ? 'توفير الوقت' : 'Time Saved' },
      ],
      quote: isRTL 
        ? 'مقيم جعل إدارة التأشيرات سهلة. لم نواجه أي مشاكل امتثال منذ التنفيذ.'
        : 'MUQEEM made visa management effortless. We haven\'t faced any compliance issues since implementation.',
      image: 'https://images.pexels.com/photos/29546669/pexels-photo-29546669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
  ];

  return (
    <div className="min-h-screen pt-24" data-testid="success-stories-page">
      {/* Hero */}
      <section className="py-16 bg-gray-50 dark:bg-sara-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="outline" className="text-sara-cyan border-sara-cyan/30 bg-sara-cyan/10 mb-4">
              {t('nav.successStories')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-6">
              {isRTL ? 'قصص نجاح عملائنا' : 'Client Success Stories'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {isRTL 
                ? 'اكتشف كيف ساعدنا المؤسسات السعودية على تحقيق أهدافها من خلال حلولنا الرقمية.'
                : 'Discover how we\'ve helped Saudi enterprises achieve their goals through our digital solutions.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <Badge variant="outline" className="mb-4">{story.industry}</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-4">
                    {story.client}
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        {isRTL ? 'التحدي' : 'Challenge'}
                      </h4>
                      <p className="text-foreground">{story.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        {isRTL ? 'الحل' : 'Solution'}
                      </h4>
                      <p className="text-sara-cyan font-medium">{story.solution}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {story.results.map((result, i) => (
                      <div key={i} className="text-center p-4 rounded-xl bg-card border border-border">
                        <p className="text-2xl font-bold text-sara-cyan">{result.metric}</p>
                        <p className="text-xs text-muted-foreground">{result.label}</p>
                      </div>
                    ))}
                  </div>

                  <blockquote className="border-s-4 border-sara-cyan ps-4 italic text-muted-foreground">
                    "{story.quote}"
                  </blockquote>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="rounded-2xl overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.client}
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 dark:bg-sara-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TrendingUp className="w-12 h-12 mx-auto text-sara-cyan mb-4" />
            <h2 className="text-3xl font-bold font-heading text-foreground mb-4">
              {isRTL ? 'كن قصة النجاح التالية' : 'Be Our Next Success Story'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isRTL 
                ? 'دعنا نساعدك في تحقيق أهداف عملك.'
                : 'Let us help you achieve your business goals.'
              }
            </p>
            <Link href="/contact">
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

export default SuccessStoriesPage;
