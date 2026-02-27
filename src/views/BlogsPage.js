'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { useLanguage } from '../context/LanguageContext';

const BlogsPage = () => {
  const { t, isRTL } = useLanguage();

  const posts = [
    {
      id: 1,
      title: isRTL ? 'كيف يبسط مقيم إدارة التأشيرات للشركات السعودية' : 'How MUQEEM Simplifies Visa Management for Saudi Businesses',
      excerpt: isRTL ? 'تعرف على كيف يساعد تكامل البوابات الحكومية في تبسيط إدارة الوافدين...' : 'Learn how our government portal integration streamlines expatriate management...',
      category: isRTL ? 'حكومي' : 'Government',
      date: '2024-01-15',
      readTime: isRTL ? '5 دقائق' : '5 min read',
      image: 'https://images.pexels.com/photos/29546669/pexels-photo-29546669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      id: 2,
      title: isRTL ? 'مستقبل الموارد البشرية: إدارة القوى العاملة بالذكاء الاصطناعي' : 'The Future of HR: AI-Powered Workforce Management',
      excerpt: isRTL ? 'اكتشف كيف يحول الذكاء الاصطناعي الموارد البشرية في المؤسسات السعودية...' : 'Discover how AI is transforming human resources in Saudi enterprises...',
      category: isRTL ? 'الذكاء الاصطناعي' : 'AI & Technology',
      date: '2024-01-10',
      readTime: isRTL ? '7 دقائق' : '7 min read',
      image: 'https://images.unsplash.com/photo-1644350341494-2ddc19a69c8e?crop=entropy&cs=srgb&fm=jpg&q=85',
    },
    {
      id: 3,
      title: isRTL ? 'تحسين الأسطول: خفض التكاليف بنسبة 40%' : 'Fleet Optimization: Reducing Costs by 40%',
      excerpt: isRTL ? 'دراسة حالة حول كيف ساعد راصد شركة لوجستية في تحسين العمليات...' : 'Case study on how RASID helped a logistics company optimize operations...',
      category: isRTL ? 'إدارة الأسطول' : 'Fleet Management',
      date: '2024-01-05',
      readTime: isRTL ? '6 دقائق' : '6 min read',
      image: 'https://images.pexels.com/photos/35501717/pexels-photo-35501717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      id: 4,
      title: isRTL ? 'SEO للشركات السعودية: دليل شامل 2024' : 'SEO for Saudi Businesses: A Complete 2024 Guide',
      excerpt: isRTL ? 'استراتيجيات تحسين محركات البحث المصممة خصيصاً للسوق السعودي...' : 'Search engine optimization strategies tailored for the Saudi market...',
      category: isRTL ? 'تسويق' : 'Marketing',
      date: '2023-12-28',
      readTime: isRTL ? '10 دقائق' : '10 min read',
      image: 'https://images.unsplash.com/photo-1636108935910-0188b979550d?crop=entropy&cs=srgb&fm=jpg&q=85',
    },
    {
      id: 5,
      title: isRTL ? 'Cloud PBX: الدليل النهائي لاتصالات الأعمال' : 'Cloud PBX: The Ultimate Guide to Business Communications',
      excerpt: isRTL ? 'كل ما تحتاج معرفته عن أنظمة الهاتف السحابية للشركات...' : 'Everything you need to know about cloud phone systems for businesses...',
      category: isRTL ? 'الاتصالات' : 'Telecom',
      date: '2023-12-20',
      readTime: isRTL ? '8 دقائق' : '8 min read',
      image: 'https://images.pexels.com/photos/5480781/pexels-photo-5480781.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      id: 6,
      title: isRTL ? 'كليم: كيف يمكن للذكاء الاصطناعي تحسين خدمة العملاء' : 'Kaleem: How AI Can Transform Customer Service',
      excerpt: isRTL ? 'استكشف إمكانيات المساعد الذكي في تحسين تجربة العملاء...' : 'Explore how AI assistants can enhance customer experience...',
      category: isRTL ? 'الذكاء الاصطناعي' : 'AI & Technology',
      date: '2023-12-15',
      readTime: isRTL ? '5 دقائق' : '5 min read',
      image: 'https://images.unsplash.com/photo-1644350341494-2ddc19a69c8e?crop=entropy&cs=srgb&fm=jpg&q=85',
    },
  ];

  const categories = [
    isRTL ? 'الكل' : 'All',
    isRTL ? 'حكومي' : 'Government',
    isRTL ? 'الذكاء الاصطناعي' : 'AI & Technology',
    isRTL ? 'إدارة الأسطول' : 'Fleet Management',
    isRTL ? 'تسويق' : 'Marketing',
    isRTL ? 'الاتصالات' : 'Telecom',
  ];

  return (
    <div className="min-h-screen pt-24" data-testid="blogs-page">
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
              {t('nav.blogs')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-6">
              {t('blog.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                >
                  {cat}
                </Button>
              ))}
            </div>
            <div className="w-full md:w-64">
              <Input 
                placeholder={isRTL ? 'بحث في المقالات...' : 'Search articles...'} 
                className="bg-muted border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="blog-card group"
              >
                <Link href={`/blogs/${post.id}`} className="block">
                  <div className="rounded-2xl overflow-hidden bg-card border border-border h-full flex flex-col">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover blog-image"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="font-semibold text-foreground mb-2 group-hover:text-sara-cyan transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{post.excerpt}</p>
                      <div className="mt-4 flex items-center text-sara-cyan text-sm font-medium">
                        {t('blog.readArticle')}
                        <ArrowRight className={`w-4 h-4 ms-1 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50 dark:bg-sara-surface">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">
              {isRTL ? 'اشترك في نشرتنا الإخبارية' : 'Subscribe to Our Newsletter'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {isRTL 
                ? 'احصل على أحدث المقالات والأخبار مباشرة في بريدك الإلكتروني.'
                : 'Get the latest articles and news delivered directly to your inbox.'
              }
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email'} 
                className="flex-1 bg-background"
              />
              <Button className="bg-sara-cyan hover:bg-sara-cyanHover text-white">
                {isRTL ? 'اشترك' : 'Subscribe'}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
