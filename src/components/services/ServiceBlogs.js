'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const ServiceBlogs = ({ 
  title = "Our Latest Blogs",
  categoryColor,
  blogs = []
}) => {
  const { isDark } = useTheme();
  const { isRTL } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Default blogs if none provided
  const defaultBlogs = [
    {
      slug: 'muqeem-visa-management-2024',
      title: 'How MUQEEM Revolutionizes Visa Management',
      excerpt: 'Discover how MUQEEM automates expatriate management and improves compliance.',
      category: 'Government Portals',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      slug: 'fleet-optimization-rasid',
      title: 'Fleet Optimization: 40% Cost Reduction with RASID',
      excerpt: 'Case study of a Saudi logistics company achieving significant savings.',
      category: 'Fleet Management',
      image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      slug: 'seo-aeo-geo-complete-guide',
      title: 'Complete Guide to SEO, AEO & GEO',
      excerpt: 'Master search optimization strategies for modern digital presence.',
      category: 'Digital Marketing',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const displayBlogs = blogs.length > 0 ? blogs : defaultBlogs;

  return (
    <section 
      ref={ref}
      className={`py-16 ${isDark ? 'bg-sara-navy' : 'bg-white'}`}
      data-testid="service-blogs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10"
        >
          <h2 className={`text-2xl md:text-3xl font-bold font-heading ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h2>
          <Link href="/blogs" className="hidden md:block">
            <motion.span 
              className="flex items-center gap-1 text-sm font-medium"
              style={{ color: categoryColor }}
              whileHover={{ x: isRTL ? -5 : 5 }}
            >
              View All
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </motion.span>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayBlogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <Link href={`/blogs/${blog.slug}`}>
                <motion.div 
                  className={`rounded-xl overflow-hidden border h-full ${
                    isDark 
                      ? 'bg-sara-surface border-sara-border' 
                      : 'bg-white border-gray-200 shadow-md hover:shadow-lg'
                  }`}
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-video overflow-hidden">
                    <motion.img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="p-5">
                    <Badge 
                      variant="secondary" 
                      className="mb-3 text-xs"
                      style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}
                    >
                      {blog.category}
                    </Badge>
                    <h3 className={`font-semibold mb-2 line-clamp-2 group-hover:text-sara-cyan transition-colors ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {blog.title}
                    </h3>
                    <p className={`text-sm line-clamp-2 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {blog.excerpt}
                    </p>
                    <div 
                      className="mt-4 flex items-center text-sm font-medium"
                      style={{ color: categoryColor }}
                    >
                      Read Article
                      <ArrowRight className={`w-4 h-4 ms-1 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceBlogs;
