import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sun, Moon, Globe, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import servicesData from '../data/services.json';

const Header = ({ onOpenPalette }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t, getLocalizedValue, isRTL } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/services', label: t('nav.services'), hasMegaMenu: true },
    { href: '/who-we-are', label: t('nav.whoWeAre') },
    { href: '/success-stories', label: t('nav.successStories') },
    { href: '/blogs', label: t('nav.blogs') },
    { href: '/resources', label: t('nav.resources') },
    { href: '/careers', label: t('nav.careers') },
  ];

  const getCategoryColor = (categoryId) => {
    const colors = {
      'advanced-solutions-technology': 'text-sara-advanced',
      'government-portals': 'text-sara-government',
      'hr-performance': 'text-sara-hr',
      'fleet-management': 'text-sara-fleet',
      'telecom': 'text-sara-telecom',
      'ai-solutions': 'text-sara-ai',
    };
    return colors[categoryId] || 'text-sara-cyan';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark 
            ? 'py-2 bg-sara-navy/90 backdrop-blur-xl border-b border-sara-border shadow-lg'
            : 'py-2 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-lg'
          : 'py-4 bg-transparent'
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 shrink-0"
            data-testid="logo-link"
          >
            <img
              src="https://customer-assets.emergentagent.com/job_command-center-sa/artifacts/fwhjuivt_logo-1-2048x531.png"
              alt="SARA Business Solutions"
              className={`transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10'}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.hasMegaMenu && setIsMegaMenuOpen(true)}
                onMouseLeave={() => link.hasMegaMenu && setIsMegaMenuOpen(false)}
              >
                {link.hasMegaMenu ? (
                  <button
                    className="nav-link flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="nav-services-trigger"
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={`nav-link text-sm font-medium transition-colors ${
                      location.pathname === link.href
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    data-testid={`nav-${link.href.replace('/', '') || 'home'}`}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Mega Menu */}
                {link.hasMegaMenu && (
                  <AnimatePresence>
                    {isMegaMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-screen max-w-5xl"
                        data-testid="mega-menu"
                      >
                        <div className={`rounded-2xl p-6 shadow-2xl backdrop-blur-xl border ${
                          isDark 
                            ? 'bg-sara-navy/95 border-white/10' 
                            : 'bg-white/95 border-gray-200'
                        }`}>
                          <div className="grid grid-cols-3 gap-6">
                            {servicesData.categories.map((category, index) => (
                              <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  to={`/services/${category.slug}`}
                                  className="flex items-center gap-2 mb-3 group"
                                  data-testid={`mega-menu-category-${category.id}`}
                                >
                                  <span className={`font-semibold group-hover:opacity-80`} style={{ color: category.color }}>
                                    {getLocalizedValue(category.name)}
                                  </span>
                                </Link>
                                <ul className="space-y-2">
                                  {category.services.map((service) => (
                                    <li key={service.id}>
                                      <Link
                                        to={`/service/${service.slug}`}
                                        className={`text-sm hover:ps-2 transition-all block py-1 border-s-2 border-transparent hover:border-sara-cyan ps-0 ${
                                          isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                        data-testid={`mega-menu-service-${service.id}`}
                                      >
                                        {getLocalizedValue(service.name)}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onOpenPalette}
              className="hidden sm:flex"
              data-testid="search-button"
            >
              <Search className="w-4 h-4" />
            </Button>

            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-xs font-medium"
              data-testid="language-switcher"
            >
              <Globe className="w-4 h-4 me-1" />
              {language === 'en' ? 'AR' : 'EN'}
            </Button>

            {/* Theme Switcher */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="theme-switcher"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* CTA Button */}
            <Link to="/contact" className="hidden md:block">
              <Button 
                className="bg-sara-cyan hover:bg-sara-cyanHover text-white rounded-full px-6"
                data-testid="header-cta"
              >
                {t('nav.contact')}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden backdrop-blur-xl border-t ${
              isDark 
                ? 'bg-sara-navy/95 border-sara-border' 
                : 'bg-white/95 border-gray-200'
            }`}
            data-testid="mobile-menu"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block py-3 px-4 rounded-lg transition-colors ${
                    location.pathname === link.href
                      ? 'bg-sara-cyan/10 text-sara-cyan'
                      : isDark 
                        ? 'text-gray-400 hover:bg-white/5 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  data-testid={`mobile-nav-${link.href.replace('/', '') || 'home'}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link to="/contact">
                  <Button className="w-full bg-sara-cyan hover:bg-sara-cyanHover text-white rounded-full">
                    {t('nav.contact')}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
