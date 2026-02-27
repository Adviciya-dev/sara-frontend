'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ServiceWhyChooseUs = ({ 
  title, 
  subtitle, 
  reasons = [],
  categoryColor 
}) => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      ref={ref}
      className={`py-16 ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}
      data-testid="service-why-choose"
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
          <h2 className={`text-2xl md:text-3xl font-bold font-heading ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {subtitle}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl border transition-all ${
                isDark 
                  ? 'bg-sara-navy border-sara-border hover:border-opacity-50' 
                  : 'bg-white border-gray-200 shadow-md hover:shadow-lg'
              }`}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${categoryColor}15` }}
              >
                <Check className="w-6 h-6" style={{ color: categoryColor }} />
              </div>
              <h3 className={`text-lg font-semibold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {reason.title}
              </h3>
              <p className={`text-sm leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceWhyChooseUs;
