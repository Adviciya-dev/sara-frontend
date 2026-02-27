'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, FileText, CheckCircle, FileCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../context/ThemeContext';

const ServiceForms = ({ 
  title, 
  subtitle,
  forms = [],
  categoryColor 
}) => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const icons = [FileText, CheckCircle, FileCheck];

  return (
    <section 
      id="forms"
      ref={ref}
      className={`py-16 ${isDark ? 'bg-sara-navy' : 'bg-white'}`}
      data-testid="service-forms"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p 
            className="text-sm font-medium uppercase tracking-wider mb-2"
            style={{ color: categoryColor }}
          >
            {title}
          </p>
          <h2 className={`text-2xl md:text-3xl font-bold font-heading mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {subtitle}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {forms.map((form, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl border transition-all ${
                  isDark 
                    ? 'bg-sara-surface border-sara-border' 
                    : 'bg-gray-50 border-gray-200 hover:shadow-lg'
                }`}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${categoryColor}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: categoryColor }} />
                </div>

                <h3 className={`text-lg font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {form.title}
                </h3>
                
                <p className={`text-sm leading-relaxed mb-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {form.description}
                </p>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full"
                  style={{ borderColor: `${categoryColor}50`, color: categoryColor }}
                  onClick={() => form.downloadUrl && window.open(form.downloadUrl, '_blank')}
                  data-testid={`download-form-${index}`}
                >
                  <Download className="w-4 h-4 me-2" />
                  Download PDF
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceForms;
