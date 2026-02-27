'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useTheme } from '../../context/ThemeContext';

const ServiceFAQ = ({ 
  title = "Frequently Asked Questions",
  subtitle,
  faqs = [],
  categoryColor 
}) => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      ref={ref}
      className={`py-16 ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}
      data-testid="service-faq"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <HelpCircle 
            className="w-12 h-12 mx-auto mb-4" 
            style={{ color: categoryColor }} 
          />
          <h2 className={`text-2xl md:text-3xl font-bold font-heading mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {subtitle}
            </p>
          )}
        </motion.div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <AccordionItem 
                value={`faq-${index}`}
                className={`rounded-xl px-6 border ${
                  isDark 
                    ? 'bg-sara-navy border-sara-border' 
                    : 'bg-white border-gray-200 shadow-sm'
                }`}
              >
                <AccordionTrigger 
                  className={`text-start hover:no-underline py-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  <span className="font-medium text-base">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className={`pb-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
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

export default ServiceFAQ;
