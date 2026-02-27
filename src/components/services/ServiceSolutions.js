'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const ServiceSolutions = ({ 
  title, 
  subtitle,
  solutions = [],
  categoryColor 
}) => {
  const { isDark } = useTheme();
  const { isRTL } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const iconStyles = [
    { rotate: 0, scale: 1 },
    { rotate: 45, scale: 0.9 },
    { rotate: -45, scale: 0.9 }
  ];

  return (
    <section 
      ref={ref}
      className={`py-16 ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}
      data-testid="service-solutions"
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
          <h2 className={`text-2xl md:text-3xl font-bold font-heading max-w-3xl mx-auto ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {subtitle}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`group p-6 rounded-2xl border transition-all h-full ${
                isDark 
                  ? 'bg-sara-navy border-sara-border hover:border-sara-cyan/30' 
                  : 'bg-white border-gray-200 shadow-md hover:shadow-xl'
              }`}
            >
              {/* Icon */}
              <motion.div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative overflow-hidden"
                style={{ backgroundColor: `${categoryColor}15` }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-6 h-6 rounded"
                  style={{ 
                    backgroundColor: categoryColor,
                    transform: `rotate(${iconStyles[index % 3].rotate}deg) scale(${iconStyles[index % 3].scale})`
                  }}
                />
              </motion.div>

              <h3 className={`text-xl font-semibold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {solution.title}
              </h3>
              
              <p className={`text-sm leading-relaxed mb-4 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {solution.description}
              </p>

              {/* Features list if available */}
              {solution.features && solution.features.length > 0 && (
                <ul className="space-y-2 mt-4">
                  {solution.features.map((feature, fIndex) => (
                    <li 
                      key={fIndex}
                      className={`flex items-center gap-2 text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <ArrowRight 
                        className={`w-3 h-3 flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`}
                        style={{ color: categoryColor }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSolutions;
