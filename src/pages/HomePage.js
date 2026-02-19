import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { 
  ArrowRight, 
  Award, 
  Users, 
  Building2, 
  Rocket,
  Phone,
  Truck,
  Brain,
  ChevronRight,
  Play,
  Sparkles,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import servicesData from '../data/services.json';
import WizardSection from '../components/WizardSection';
import WhatsAppButton from '../components/WhatsAppButton';
import FloatingLeadForm from '../components/FloatingLeadForm';
import LeadFormSection from '../components/LeadFormSection';

import QuickAssessmentQuiz from '../components/QuickAssessmentQuiz';

const HomePage = () => {
  return (
    <div className="min-h-screen" data-testid="home-page">
      <HeroSection />
      <TrustBadgesSection />
      <ServiceUniverse />
      <CategoryOverviews />
      <QuickAssessmentQuiz />
      <VideoShowcase />
      <WizardSection />
      <LeadFormSection />
      <SuccessStoriesSection />
      <ProcessSection />
      <BlogPreviewSection />
      <FinalCTASection />
      <WhatsAppButton />
      <FloatingLeadForm />
    </div>
  );
};

const HeroSection = () => {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();
  
  const floatingCards = [
    { name: 'MUQEEM', color: '#2563EB', position: { top: '10%', left: '-5%' }, delay: 0 },
    { name: 'TAMM', color: '#2563EB', position: { top: '25%', right: '-8%' }, delay: 0.2 },
    { name: 'BAYZAT', color: '#7C3AED', position: { top: '55%', left: '-10%' }, delay: 0.4 },
    { name: 'RASID', color: '#10B981', position: { top: '70%', right: '-5%' }, delay: 0.6 },
    { name: 'Cloud PBX', color: '#F97316', position: { top: '5%', right: '5%' }, delay: 0.8 },
    { name: 'Kaleem AI', color: '#D946EF', position: { top: '85%', left: '5%' }, delay: 1 },
  ];

  return (
    <section 
      className={`relative min-h-screen flex items-center pt-20 overflow-hidden ${
        isDark ? 'bg-sara-navy' : 'bg-gradient-to-br from-slate-50 via-white to-cyan-50'
      }`} 
      data-testid="hero-section"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className={`absolute top-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/5'
          }`}
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className={`absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-purple-500/10' : 'bg-purple-500/5'
          }`}
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Grid pattern */}
        <div 
          className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-[0.02]'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${isDark ? 'bg-sara-cyan/30' : 'bg-sara-cyan/20'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge 
                variant="outline" 
                className={`text-sara-cyan border-sara-cyan/30 ${
                  isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/5'
                }`}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                {t('hero.eyebrow')}
              </Badge>
            </motion.div>
            
            <motion.h1 
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p 
              className={`text-lg max-w-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="bg-sara-cyan hover:bg-sara-cyanHover text-white rounded-full px-8 shadow-lg shadow-sara-cyan/30"
                  data-testid="hero-cta-primary"
                >
                  {t('hero.cta')}
                  <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
              <Link to="/services">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`rounded-full px-8 ${
                    isDark ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-100'
                  }`}
                  data-testid="hero-cta-secondary"
                >
                  {t('hero.ctaSecondary')}
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="flex flex-wrap items-center gap-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: Award, text: t('hero.stats.years') },
                { icon: Users, text: t('hero.stats.clients') },
                { icon: Building2, text: t('hero.stats.partners') },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon className="w-5 h-5 text-sara-cyan" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Animated Control Deck */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Central Card */}
              <motion.div
                className={`absolute inset-8 rounded-3xl p-6 flex flex-col items-center justify-center border ${
                  isDark 
                    ? 'bg-sara-surface/80 backdrop-blur-xl border-white/10' 
                    : 'bg-white/90 backdrop-blur-xl border-gray-200 shadow-2xl'
                }`}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="https://customer-assets.emergentagent.com/job_command-center-sa/artifacts/fwhjuivt_logo-1-2048x531.png"
                  alt="SARA"
                  className="h-14 mb-4"
                />
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Command Center
                </h3>
                <div className="grid grid-cols-3 gap-6 w-full">
                  <StatCard value="20K+" label="Clients" isDark={isDark} />
                  <StatCard value="99%" label="Uptime" isDark={isDark} />
                  <StatCard value="24/7" label="Support" isDark={isDark} />
                </div>
              </motion.div>

              {/* Floating Service Cards */}
              {floatingCards.map((card, index) => (
                <motion.div
                  key={card.name}
                  className="absolute"
                  style={card.position}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    delay: card.delay, 
                    duration: 0.5,
                    y: {
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <div 
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      isDark 
                        ? 'bg-sara-surface/80 backdrop-blur-sm' 
                        : 'bg-white shadow-lg'
                    }`}
                    style={{ 
                      borderWidth: 2, 
                      borderColor: card.color,
                      color: card.color 
                    }}
                  >
                    {card.name}
                  </div>
                </motion.div>
              ))}

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(6, 182, 212, 0.3)" />
                    <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                  </linearGradient>
                </defs>
                {[...Array(6)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx="50%"
                    cy="50%"
                    r={100 + i * 30}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    strokeDasharray="5 5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3, rotate: 360 }}
                    transition={{ 
                      opacity: { delay: i * 0.2 },
                      rotate: { duration: 30 + i * 10, repeat: Infinity, ease: "linear" }
                    }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-1 ${
          isDark ? 'border-white/30' : 'border-gray-400'
        }`}>
          <div className="w-1.5 h-2.5 bg-sara-cyan rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

const StatCard = ({ value, label, isDark }) => (
  <div className="text-center">
    <p className="text-xl font-bold text-sara-cyan">{value}</p>
    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
  </div>
);

const TrustBadgesSection = () => {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const clients = [
    { name: 'Elm', logo: '🏛️' },
    { name: 'Bahamdan Group', logo: '🏢' },
    { name: 'Saudi Aramco', logo: '⛽' },
    { name: 'STC', logo: '📱' },
    { name: 'SABIC', logo: '🏭' },
    { name: 'Al Rajhi Bank', logo: '🏦' },
  ];

  return (
    <section 
      ref={ref}
      className={`py-10 ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}
      data-testid="trust-badges-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <p className={`text-sm font-medium uppercase tracking-wider ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {isRTL ? 'موثوق به من قبل الشركات الرائدة' : 'Trusted by Leading Companies'}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-shadow ${
                isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white shadow-sm hover:shadow-md'
              }`}
            >
              <span className="text-2xl">{client.logo}</span>
              <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          {[
            { value: '20K+', label: isRTL ? 'عميل نشط' : 'Active Clients', icon: Users },
            { value: '99.9%', label: isRTL ? 'وقت التشغيل' : 'Uptime', icon: Shield },
            { value: '50+', label: isRTL ? 'حل متكامل' : 'Solutions', icon: Zap },
            { value: '24/7', label: isRTL ? 'دعم فني' : 'Support', icon: Globe },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`text-center p-4 rounded-2xl transition-shadow ${
                isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white shadow-md hover:shadow-lg'
              }`}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-sara-cyan" />
              <p className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const VideoShowcase = () => {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section 
      ref={ref} 
      className={`py-12 ${isDark ? 'bg-sara-navy' : 'bg-white'}`}
      data-testid="video-showcase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge 
            variant="outline" 
            className={`text-sara-cyan border-sara-cyan/30 mb-4 ${
              isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/5'
            }`}
          >
            {isRTL ? 'شاهد كيف نعمل' : 'See How We Work'}
          </Badge>
          <h2 className={`text-3xl md:text-4xl font-bold font-heading mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {isRTL ? 'تحويل الأعمال رقمياً' : 'Digital Transformation in Action'}
          </h2>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {isRTL 
              ? 'اكتشف كيف تساعد حلولنا الشركات السعودية على النمو والازدهار'
              : 'Discover how our solutions help Saudi businesses grow and thrive'
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className={`video-container aspect-video rounded-2xl overflow-hidden ${
            isDark ? 'bg-sara-surface' : 'bg-gray-200'
          }`}>
            {!isPlaying ? (
              <>
                <img 
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="video-overlay" />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                  data-testid="video-play-button"
                >
                  <motion.div 
                    className="w-20 h-20 rounded-full bg-sara-cyan/90 flex items-center justify-center shadow-lg shadow-sara-cyan/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-8 h-8 text-white ms-1" />
                  </motion.div>
                </button>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">
                    {isRTL ? 'قصة نجاح: شركة لوجستية كبرى' : 'Success Story: Major Logistics Company'}
                  </h3>
                  <p className="text-sm text-white/70">
                    {isRTL ? '3:45 دقيقة' : '3:45 minutes'}
                  </p>
                </div>
              </>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="SARA Business Solutions"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceUniverse = () => {
  const { t, getLocalizedValue, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const icons = {
    'government-portals': Building2,
    'hr-performance': Users,
    'fleet-management': Truck,
    'telecom': Phone,
    'advanced-solutions-technology': Rocket,
    'ai-solutions': Brain,
  };

  return (
    <section 
      ref={ref} 
      className={`py-12 relative overflow-hidden ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}
      data-testid="service-universe-section"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl ${
            isDark ? 'bg-purple-500/5' : 'bg-purple-500/10'
          }`}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className={`absolute bottom-20 right-10 w-64 h-64 rounded-full blur-3xl ${
            isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/10'
          }`}
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge 
            variant="outline" 
            className={`text-sara-cyan border-sara-cyan/30 mb-4 ${
              isDark ? 'bg-sara-cyan/10' : 'bg-sara-cyan/5'
            }`}
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Smart Solutions Hub
          </Badge>
          <h2 className={`text-3xl md:text-4xl font-bold font-heading mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('serviceUniverse.title')}
          </h2>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('serviceUniverse.subtitle')}
          </p>
        </motion.div>

        {/* Service Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {servicesData.categories.map((category, index) => {
            const Icon = icons[category.id] || Rocket;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/services/${category.slug}`}
                  className="block group"
                  data-testid={`service-universe-${category.id}`}
                >
                  <motion.div 
                    className={`relative p-6 rounded-2xl border transition-all duration-300 h-full ${
                      isDark 
                        ? 'bg-sara-navy border-sara-border hover:border-opacity-50' 
                        : 'bg-white border-gray-200 hover:border-gray-300 shadow-md hover:shadow-xl'
                    }`}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${category.color}20` }}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-6 h-6" style={{ color: category.color }} />
                    </motion.div>
                    <h3 className={`font-semibold mb-2 group-hover:text-sara-cyan transition-colors ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {getLocalizedValue(category.name)}
                    </h3>
                    <p className={`text-sm line-clamp-2 mb-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {getLocalizedValue(category.description)}
                    </p>
                    <div 
                      className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform"
                      style={{ color: category.color }}
                    >
                      {category.services.length} {isRTL ? 'خدمات' : 'services'}
                      <ChevronRight className={`w-4 h-4 ms-1 ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CategoryOverviews = () => {
  const { getLocalizedValue, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section 
      ref={ref} 
      className={`py-12 ${isDark ? 'bg-sara-navy' : 'bg-white'}`}
      data-testid="category-overviews-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {servicesData.categories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
            className="mb-10 last:mb-0"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-1.5 h-10 rounded-full"
                  style={{ backgroundColor: category.color }}
                  whileHover={{ scaleY: 1.2 }}
                />
                <div>
                  <h3 className={`text-xl font-bold font-heading ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {getLocalizedValue(category.name)}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {getLocalizedValue(category.description)}
                  </p>
                </div>
              </div>
              <Link to={`/services/${category.slug}`}>
                <Button variant="ghost" size="sm" className="group" style={{ color: category.color }}>
                  {isRTL ? 'عرض الكل' : 'View all'}
                  <ChevronRight className={`w-4 h-4 ms-1 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.services.map((service, serviceIndex) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: categoryIndex * 0.1 + serviceIndex * 0.05, duration: 0.3 }}
                >
                  <Link 
                    to={`/service/${service.slug}`}
                    className="block group"
                    data-testid={`service-card-${service.id}`}
                  >
                    <motion.div 
                      className={`p-4 rounded-xl border transition-all duration-300 h-full ${
                        isDark 
                          ? 'bg-card border-border hover:border-opacity-50' 
                          : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                      }`}
                      whileHover={{ y: -3 }}
                    >
                      <h4 className={`font-semibold mb-1 group-hover:text-sara-cyan transition-colors ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {getLocalizedValue(service.name)}
                      </h4>
                      <p className={`text-xs mb-3 line-clamp-2 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {getLocalizedValue(service.shortDesc)}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {service.tags.slice(0, 3).map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="text-[10px] px-2 py-0"
                            style={{ backgroundColor: `${category.color}15`, color: category.color }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const SuccessStoriesSection = () => {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stories = [
    {
      id: 1,
      client: isRTL ? 'شركة لوجستية كبرى' : 'Major Logistics Company',
      industry: isRTL ? 'النقل' : 'Transportation',
      challenge: isRTL ? 'تتبع يدوي للأسطول' : 'Manual fleet tracking',
      solution: 'RASID',
      result: isRTL ? 'خفض التكاليف 40%' : '40% cost reduction',
    },
    {
      id: 2,
      client: isRTL ? 'مجموعة رعاية صحية' : 'Healthcare Group',
      industry: isRTL ? 'الرعاية الصحية' : 'Healthcare',
      challenge: isRTL ? 'إدارة معقدة للموارد البشرية' : 'Complex HR management',
      solution: 'BAYZAT',
      result: isRTL ? 'توفير 60% من الوقت' : '60% time saved',
    },
    {
      id: 3,
      client: isRTL ? 'مقاول حكومي' : 'Government Contractor',
      industry: isRTL ? 'البناء' : 'Construction',
      challenge: isRTL ? 'مشاكل الامتثال' : 'Compliance issues',
      solution: 'MUQEEM',
      result: isRTL ? 'امتثال 100%' : '100% compliance',
    },
  ];

  return (
    <section 
      ref={ref} 
      className={`py-12 ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}
      data-testid="success-stories-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className={`text-2xl md:text-3xl font-bold font-heading mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('successStoriesSection.title')}
          </h2>
          <p className={`max-w-2xl mx-auto text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('successStoriesSection.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className={`p-5 rounded-xl border h-full flex flex-col transition-all ${
                isDark 
                  ? 'bg-card border-border hover:border-sara-cyan/30' 
                  : 'bg-white border-gray-200 hover:border-sara-cyan/50 shadow-md hover:shadow-lg'
              }`}>
                <Badge variant="outline" className="w-fit mb-3 text-xs">{story.industry}</Badge>
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {story.client}
                </h4>
                <div className="space-y-2 flex-1">
                  <div>
                    <p className={`text-[10px] uppercase tracking-wider mb-0.5 ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {isRTL ? 'التحدي' : 'Challenge'}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {story.challenge}
                    </p>
                  </div>
                  <div>
                    <p className={`text-[10px] uppercase tracking-wider mb-0.5 ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {isRTL ? 'الحل' : 'Solution'}
                    </p>
                    <p className="text-xs text-sara-cyan font-medium">{story.solution}</p>
                  </div>
                  <div>
                    <p className={`text-[10px] uppercase tracking-wider mb-0.5 ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {isRTL ? 'النتيجة' : 'Result'}
                    </p>
                    <p className="text-xs font-semibold text-green-500">{story.result}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link to="/success-stories">
            <Button variant="outline" size="sm" className={`rounded-full ${
              isDark ? '' : 'border-gray-300'
            }`}>
              {t('successStoriesSection.viewAll')}
              <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { key: 'discover', icon: '🔍', color: '#06b6d4' },
    { key: 'design', icon: '✏️', color: '#7C3AED' },
    { key: 'train', icon: '🚀', color: '#10B981' },
    { key: 'optimize', icon: '📈', color: '#F97316' },
  ];

  return (
    <section 
      ref={ref} 
      className={`py-12 ${isDark ? 'bg-sara-navy' : 'bg-white'}`}
      data-testid="process-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className={`text-2xl md:text-3xl font-bold font-heading mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('process.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              onClick={() => setActiveStep(index)}
              className="cursor-pointer"
            >
              <motion.div 
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeStep === index 
                    ? isDark 
                      ? 'bg-sara-cyan/10 border-sara-cyan' 
                      : 'bg-sara-cyan/5 border-sara-cyan shadow-lg'
                    : isDark 
                      ? 'bg-card border-border hover:border-sara-cyan/50' 
                      : 'bg-white border-gray-200 hover:border-sara-cyan/50 shadow-md'
                }`}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors`}
                    style={{ 
                      backgroundColor: activeStep === index ? step.color : isDark ? '#1e293b' : '#f1f5f9',
                      color: activeStep === index ? 'white' : step.color
                    }}
                    animate={activeStep === index ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {index + 1}
                  </motion.div>
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t(`process.steps.${step.key}.title`)}
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t(`process.steps.${step.key}.description`)}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogPreviewSection = () => {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const posts = [
    {
      id: 1,
      slug: 'muqeem-visa-management-2024',
      title: isRTL ? 'كيف يحدث مقيم ثورة في إدارة التأشيرات' : 'How MUQEEM Revolutionizes Visa Management',
      excerpt: isRTL ? 'اكتشف كيف يقوم مقيم بأتمتة إدارة الوافدين...' : 'Discover how MUQEEM automates expatriate management...',
      category: isRTL ? 'البوابات الحكومية' : 'Government Portals',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 2,
      slug: 'ai-hr-transformation',
      title: isRTL ? 'مستقبل الموارد البشرية بالذكاء الاصطناعي' : 'The Future of HR: AI-Powered Management',
      excerpt: isRTL ? 'تعلم كيف يحول الذكاء الاصطناعي عمليات الموارد البشرية...' : 'Learn how AI is transforming HR operations...',
      category: isRTL ? 'الموارد البشرية والتكنولوجيا' : 'HR & Technology',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 3,
      slug: 'fleet-optimization-rasid',
      title: isRTL ? 'تحسين الأسطول: كيف حقق راصد تخفيض 40%' : 'Fleet Optimization: 40% Cost Reduction with RASID',
      excerpt: isRTL ? 'دراسة حالة شركة لوجستية سعودية...' : 'Case study of a Saudi logistics company...',
      category: isRTL ? 'إدارة الأسطول' : 'Fleet Management',
      image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <section 
      ref={ref} 
      className={`py-12 ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}
      data-testid="blog-preview-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold font-heading mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('blog.title')}
            </h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('blog.subtitle')}</p>
          </div>
          <Link to="/blogs" className="hidden md:block">
            <Button variant="outline" size="sm" className={`rounded-full ${isDark ? '' : 'border-gray-300'}`}>
              {t('blog.viewAll')}
              <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="group"
            >
              <Link to={`/blogs/${post.slug}`}>
                <motion.div 
                  className={`rounded-xl overflow-hidden border ${
                    isDark 
                      ? 'bg-card border-border' 
                      : 'bg-white border-gray-200 shadow-md hover:shadow-lg'
                  }`}
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-video overflow-hidden">
                    <motion.img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2 text-xs">{post.category}</Badge>
                    <h4 className={`font-semibold mb-1 text-sm group-hover:text-sara-cyan transition-colors line-clamp-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {post.title}
                    </h4>
                    <p className={`text-xs line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center text-sara-cyan text-sm font-medium">
                      {t('blog.readArticle')}
                      <ArrowRight className={`w-4 h-4 ms-1 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/blogs">
            <Button variant="outline" className={`rounded-full ${isDark ? '' : 'border-gray-300'}`}>
              {t('blog.viewAll')}
              <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const FinalCTASection = () => {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();
  
  return (
    <section 
      className={`py-14 relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-sara-navy via-sara-surface to-sara-navy' 
          : 'bg-gradient-to-br from-cyan-50 via-white to-purple-50'
      }`}
      data-testid="final-cta-section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className={`absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl ${
            isDark ? 'bg-sara-cyan/5' : 'bg-sara-cyan/10'
          }`}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className={`absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full blur-3xl ${
            isDark ? 'bg-purple-500/5' : 'bg-purple-500/10'
          }`}
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sara-cyan/20 to-purple-500/20 mb-4"
          >
            <Sparkles className="w-4 h-4 text-sara-cyan" />
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {isRTL ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
            </span>
          </motion.div>

          <h2 className={`text-2xl md:text-3xl font-bold font-heading mb-5 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('cta.title')}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="bg-sara-cyan hover:bg-sara-cyanHover text-white rounded-full px-8 shadow-lg shadow-sara-cyan/30"
                  data-testid="final-cta-button"
                >
                  {t('cta.button')}
                  <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </motion.div>
            </Link>
            <a href="tel:+966123456789">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`rounded-full px-8 ${isDark ? '' : 'border-gray-300'}`}
                >
                  <Phone className="w-4 h-4 me-2" />
                  {t('cta.call')}
                </Button>
              </motion.div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePage;
