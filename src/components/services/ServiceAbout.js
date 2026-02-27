'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ServiceAbout = ({ 
  title, 
  subtitle, 
  description, 
  stats = [],
  categoryColor 
}) => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      ref={ref}
      className={`py-16 ${isDark ? 'bg-sara-navy' : 'bg-white'}`}
      data-testid="service-about"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.p 
              className="text-sm font-medium uppercase tracking-wider mb-2"
              style={{ color: categoryColor }}
            >
              {title}
            </motion.p>
            <h2 className={`text-2xl md:text-3xl font-bold font-heading mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {subtitle}
            </h2>
            <p className={`text-base leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {description}
            </p>
          </motion.div>

          {/* Stats */}
          {stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`p-6 rounded-2xl border text-center ${
                    isDark 
                      ? 'bg-sara-surface border-sara-border' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p 
                    className="text-3xl md:text-4xl font-bold mb-1"
                    style={{ color: categoryColor }}
                  >
                    {stat.value}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceAbout;
