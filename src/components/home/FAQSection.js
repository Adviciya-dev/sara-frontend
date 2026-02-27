'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const FAQSection = () => {
  const { isDark } = useTheme();
  const { language, isRTL } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const content = {
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our services',
      faqs: [
        {
          question: 'What does Sara Business Solutions do in Saudi Arabia?',
          answer: 'Sara Business Solutions is a government-integrated business solution company in Saudi Arabia. Sara offers services of Muqeem, TAMM, fleet management, HR platforms, telecom solutions, AI solutions, and advanced digital services for both public and private sector organisations.',
        },
        {
          question: 'Is Sara Business Solutions an authorised Muqeem and TAMM service provider?',
          answer: 'Yes, Sara Business Solutions is a certified Muqeem and TAMM service provider and helps businesses with subscription management, onboarding, user training, compliance guidance, and accurate ongoing support.',
        },
        {
          question: "Which businesses in Saudi Arabia can use Sara's government and enterprise services?",
          answer: 'Sara supports different scales of businesses operating in Saudi Arabia, from SMEs, large enterprises, fleet operators, logistics companies, corporates, healthcare facilities, car rental firms, construction companies, educational institutions, and government organisations.',
        },
        {
          question: 'Does Sara provide ongoing support after onboarding government platforms?',
          answer: 'Yes. Sara Business Solutions provides continuous post-onboarding support from issue resolutions, renewals, user access management, upgrades, compliance assistance, and operational guidance. This ensures a smooth and uninterrupted platform usage.',
        },
        {
          question: 'Why choose Sara Business Solutions instead of direct government platform access?',
          answer: 'For the effective processing of business solutions, Sara offers professional hands-on expert support, faster issue resolutions, structured onboarding, practical and effective user training, and real operational guidance. This ensures a clear advantage that many direct government platforms do not provide.',
        },
      ]
    },
    ar: {
      title: 'الأسئلة الشائعة',
      subtitle: 'اعثر على إجابات للأسئلة الشائعة حول خدماتنا',
      faqs: [
        {
          question: 'ماذا تفعل سارا للحلول التجارية في المملكة العربية السعودية؟',
          answer: 'سارا للحلول التجارية هي شركة حلول أعمال متكاملة مع الحكومة في المملكة العربية السعودية. تقدم سارا خدمات مقيم وتم وإدارة الأسطول ومنصات الموارد البشرية وحلول الاتصالات وحلول الذكاء الاصطناعي والخدمات الرقمية المتقدمة للمؤسسات العامة والخاصة.',
        },
        {
          question: 'هل سارا للحلول التجارية مزود معتمد لخدمات مقيم وتم؟',
          answer: 'نعم، سارا للحلول التجارية مزود معتمد لخدمات مقيم وتم وتساعد الشركات في إدارة الاشتراكات والتأهيل وتدريب المستخدمين وإرشادات الامتثال والدعم المستمر الدقيق.',
        },
        {
          question: 'ما هي الشركات في المملكة العربية السعودية التي يمكنها استخدام خدمات سارا الحكومية والمؤسسية؟',
          answer: 'تدعم سارا مختلف أحجام الشركات العاملة في المملكة العربية السعودية، من الشركات الصغيرة والمتوسطة والمؤسسات الكبيرة ومشغلي الأساطيل وشركات الخدمات اللوجستية والشركات والمنشآت الصحية وشركات تأجير السيارات وشركات البناء والمؤسسات التعليمية والمنظمات الحكومية.',
        },
        {
          question: 'هل تقدم سارا دعماً مستمراً بعد التأهيل على المنصات الحكومية؟',
          answer: 'نعم. تقدم سارا للحلول التجارية دعماً مستمراً بعد التأهيل من حل المشكلات والتجديدات وإدارة وصول المستخدمين والترقيات والمساعدة في الامتثال والتوجيه التشغيلي. هذا يضمن استخداماً سلساً ومتواصلاً للمنصة.',
        },
        {
          question: 'لماذا تختار سارا للحلول التجارية بدلاً من الوصول المباشر للمنصات الحكومية؟',
          answer: 'للمعالجة الفعالة لحلول الأعمال، تقدم سارا دعماً احترافياً عملياً من الخبراء وحلول مشكلات أسرع وتأهيلاً منظماً وتدريب مستخدمين عملياً وفعالاً وتوجيهاً تشغيلياً حقيقياً. هذا يضمن ميزة واضحة لا توفرها العديد من المنصات الحكومية المباشرة.',
        },
      ]
    }
  };

  const c = content[language] || content.en;

  return (
    <section 
      ref={ref}
      className={`py-16 md:py-20 ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}
      data-testid="faq-section"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <HelpCircle className="w-12 h-12 mx-auto mb-4 text-sara-cyan" />
          </motion.div>
          <h2 className={`text-2xl md:text-3xl font-bold font-heading mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {c.title}
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {c.subtitle}
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {c.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
            >
              <AccordionItem 
                value={`faq-${index}`}
                className={`rounded-xl px-5 border ${
                  isDark 
                    ? 'bg-sara-navy border-sara-border' 
                    : 'bg-white border-gray-200 shadow-sm'
                }`}
              >
                <AccordionTrigger 
                  className={`hover:no-underline py-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  } ${isRTL ? 'text-right flex-row-reverse' : 'text-start'}`}
                >
                  <span className="font-medium text-sm md:text-base pe-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className={`pb-4 text-sm leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                } ${isRTL ? 'text-right' : ''}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
