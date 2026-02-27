'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ServiceProcess = ({ 
  title, 
  subtitle,
  steps = [],
  categoryColor 
}) => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      ref={ref}
      className={`py-16 ${isDark ? 'bg-sara-navy' : 'bg-white'}`}
      data-testid="service-process"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 -translate-x-1/2 z-0">
                  <motion.div 
                    className="h-full"
                    style={{ backgroundColor: `${categoryColor}30` }}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                  />
                </div>
              )}

              <motion.div
                whileHover={{ y: -5 }}
                className={`relative z-10 p-6 rounded-2xl border h-full transition-all ${
                  isDark 
                    ? 'bg-sara-surface border-sara-border hover:border-opacity-50' 
                    : 'bg-gray-50 border-gray-200 hover:shadow-lg'
                }`}
              >
                {/* Step Number */}
                <motion.div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4 text-white font-bold"
                  style={{ backgroundColor: categoryColor }}
                  whileHover={{ scale: 1.1 }}
                >
                  {index + 1}
                </motion.div>

                <h3 className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
