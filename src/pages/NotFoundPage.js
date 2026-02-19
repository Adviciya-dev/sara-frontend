import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useLanguage } from '../context/LanguageContext';

const NotFoundPage = () => {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-sara-navy" data-testid="not-found-page">
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-8xl md:text-9xl font-bold text-sara-cyan mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {isRTL 
              ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
              : "Sorry, the page you're looking for doesn't exist or has been moved."
            }
          </p>
          <Link to="/">
            <Button className="bg-sara-cyan hover:bg-sara-cyanHover text-white rounded-full px-8">
              <Home className="w-4 h-4 me-2" />
              {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
