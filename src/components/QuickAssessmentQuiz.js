import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  Users, 
  Truck, 
  Phone, 
  Rocket, 
  Brain,
  CheckCircle2,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const QuickAssessmentQuiz = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();

  const questions = [
    {
      id: 'industry',
      title: isRTL ? 'ما هو مجال عملك؟' : 'What is your industry?',
      options: [
        { value: 'government', label: isRTL ? 'قطاع حكومي' : 'Government Sector', icon: '🏛️' },
        { value: 'healthcare', label: isRTL ? 'رعاية صحية' : 'Healthcare', icon: '🏥' },
        { value: 'logistics', label: isRTL ? 'نقل وخدمات لوجستية' : 'Logistics & Transport', icon: '🚚' },
        { value: 'retail', label: isRTL ? 'تجزئة وتجارة' : 'Retail & Commerce', icon: '🛒' },
        { value: 'construction', label: isRTL ? 'بناء ومقاولات' : 'Construction', icon: '🏗️' },
        { value: 'other', label: isRTL ? 'أخرى' : 'Other', icon: '🏢' },
      ]
    },
    {
      id: 'size',
      title: isRTL ? 'كم عدد موظفي شركتك؟' : 'How many employees in your company?',
      options: [
        { value: 'startup', label: isRTL ? '1-10 موظفين' : '1-10 employees', icon: '👤' },
        { value: 'small', label: isRTL ? '11-50 موظف' : '11-50 employees', icon: '👥' },
        { value: 'medium', label: isRTL ? '51-200 موظف' : '51-200 employees', icon: '🏢' },
        { value: 'large', label: isRTL ? '201-1000 موظف' : '201-1000 employees', icon: '🏬' },
        { value: 'enterprise', label: isRTL ? '+1000 موظف' : '1000+ employees', icon: '🌐' },
      ]
    },
    {
      id: 'challenge',
      title: isRTL ? 'ما هو التحدي الأكبر لديك؟' : 'What is your biggest challenge?',
      options: [
        { value: 'visa', label: isRTL ? 'إدارة التأشيرات والإقامات' : 'Visa & Residency Management', icon: '📋' },
        { value: 'hr', label: isRTL ? 'إدارة الموارد البشرية والرواتب' : 'HR & Payroll Management', icon: '💼' },
        { value: 'fleet', label: isRTL ? 'تتبع وإدارة الأسطول' : 'Fleet Tracking & Management', icon: '🚛' },
        { value: 'communication', label: isRTL ? 'اتصالات العمل' : 'Business Communication', icon: '📞' },
        { value: 'marketing', label: isRTL ? 'التسويق الرقمي' : 'Digital Marketing', icon: '📈' },
        { value: 'automation', label: isRTL ? 'أتمتة العمليات' : 'Process Automation', icon: '🤖' },
      ]
    },
    {
      id: 'timeline',
      title: isRTL ? 'متى تريد البدء؟' : 'When do you want to start?',
      options: [
        { value: 'urgent', label: isRTL ? 'فوراً' : 'Immediately', icon: '⚡' },
        { value: 'month', label: isRTL ? 'خلال شهر' : 'Within a month', icon: '📅' },
        { value: 'quarter', label: isRTL ? 'خلال 3 أشهر' : 'Within 3 months', icon: '🗓️' },
        { value: 'exploring', label: isRTL ? 'أستكشف فقط' : 'Just exploring', icon: '🔍' },
      ]
    },
    {
      id: 'budget',
      title: isRTL ? 'ما هي ميزانيتك التقريبية؟' : 'What is your approximate budget?',
      options: [
        { value: 'small', label: isRTL ? 'أقل من 50,000 ريال' : 'Under 50,000 SAR', icon: '💰' },
        { value: 'medium', label: isRTL ? '50,000 - 200,000 ريال' : '50,000 - 200,000 SAR', icon: '💵' },
        { value: 'large', label: isRTL ? '200,000 - 500,000 ريال' : '200,000 - 500,000 SAR', icon: '💎' },
        { value: 'enterprise', label: isRTL ? '+500,000 ريال' : '500,000+ SAR', icon: '🏆' },
        { value: 'unknown', label: isRTL ? 'غير محدد بعد' : 'Not decided yet', icon: '❓' },
      ]
    }
  ];

  const getRecommendations = () => {
    const recs = [];
    
    // Based on challenge
    if (answers.challenge === 'visa') {
      recs.push({
        name: 'MUQEEM',
        desc: isRTL ? 'نظام إدارة الوافدين والتأشيرات' : 'Expatriate & Visa Management System',
        match: 95,
        link: '/service/muqeem'
      });
    }
    if (answers.challenge === 'hr') {
      recs.push({
        name: 'BAYZAT',
        desc: isRTL ? 'منصة الموارد البشرية والرواتب' : 'HR & Payroll Platform',
        match: 95,
        link: '/service/bayzat'
      });
      recs.push({
        name: 'SOLUT',
        desc: isRTL ? 'نظام إدارة الأداء' : 'Performance Management System',
        match: 80,
        link: '/service/solut'
      });
    }
    if (answers.challenge === 'fleet') {
      recs.push({
        name: 'RASID',
        desc: isRTL ? 'نظام تتبع وإدارة الأسطول' : 'Fleet Tracking & Management',
        match: 95,
        link: '/service/rasid'
      });
    }
    if (answers.challenge === 'communication') {
      recs.push({
        name: 'Cloud PBX',
        desc: isRTL ? 'نظام الهاتف السحابي' : 'Cloud Phone System',
        match: 95,
        link: '/service/cloud-pbx'
      });
    }
    if (answers.challenge === 'marketing') {
      recs.push({
        name: isRTL ? 'خدمات SEO/AEO/GEO' : 'SEO/AEO/GEO Services',
        desc: isRTL ? 'تحسين محركات البحث' : 'Search Engine Optimization',
        match: 90,
        link: '/service/seo-aeo-geo'
      });
      recs.push({
        name: isRTL ? 'تسويق النمو' : 'Growth Marketing',
        desc: isRTL ? 'حملات إعلانية رقمية' : 'Digital Ad Campaigns',
        match: 85,
        link: '/service/growth-marketing'
      });
    }
    if (answers.challenge === 'automation') {
      recs.push({
        name: 'Kaleem AI',
        desc: isRTL ? 'مساعد الذكاء الاصطناعي' : 'AI Assistant',
        match: 95,
        link: '/service/kaleem'
      });
    }

    // Add general recommendations based on size
    if (answers.size === 'enterprise' || answers.size === 'large') {
      if (!recs.find(r => r.name === 'MUQEEM')) {
        recs.push({
          name: 'MUQEEM',
          desc: isRTL ? 'ضروري للشركات الكبيرة' : 'Essential for large companies',
          match: 75,
          link: '/service/muqeem'
        });
      }
    }

    // Sort by match percentage
    return recs.sort((a, b) => b.match - a.match).slice(0, 3);
  };

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [questions[step].id]: value });
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const recommendations = getRecommendations();

  return (
    <section 
      className={`py-16 ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}
      data-testid="quick-assessment-section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 mb-4">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className={`text-sm font-medium ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
              {isRTL ? 'تقييم سريع' : 'Quick Assessment'}
            </span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-bold font-heading mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {isRTL ? 'اكتشف الحل المثالي لعملك' : 'Discover Your Perfect Solution'}
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {isRTL 
              ? 'أجب على 5 أسئلة سريعة واحصل على توصيات مخصصة'
              : 'Answer 5 quick questions and get personalized recommendations'
            }
          </p>
        </motion.div>

        {/* Quiz Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-2xl overflow-hidden ${
            isDark 
              ? 'bg-sara-navy border border-white/10' 
              : 'bg-white shadow-xl border border-gray-100'
          }`}
        >
          {/* Progress Bar */}
          <div className={`h-1.5 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: '0%' }}
              animate={{ width: showResults ? '100%' : `${((step + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step indicator */}
                  <div className={`text-xs font-medium mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {isRTL ? `السؤال ${step + 1} من ${questions.length}` : `Question ${step + 1} of ${questions.length}`}
                  </div>

                  {/* Question */}
                  <h3 className={`text-lg md:text-xl font-semibold mb-6 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {questions[step].title}
                  </h3>

                  {/* Options */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {questions[step].options.map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(option.value)}
                        className={`p-4 rounded-xl text-left transition-all border ${
                          answers[questions[step].id] === option.value
                            ? 'border-purple-500 bg-purple-500/10'
                            : isDark 
                              ? 'border-white/10 hover:border-white/20 bg-white/5' 
                              : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                        }`}
                        data-testid={`quiz-option-${option.value}`}
                      >
                        <span className="text-2xl mb-2 block">{option.icon}</span>
                        <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                          {option.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Back button */}
                  {step > 0 && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => setStep(step - 1)}
                      className={`mt-6 flex items-center gap-2 text-sm ${
                        isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                      {isRTL ? 'السابق' : 'Back'}
                    </motion.button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {isRTL ? 'توصياتنا لك' : 'Our Recommendations'}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {isRTL ? 'بناءً على إجاباتك، نوصي بالحلول التالية:' : 'Based on your answers, we recommend:'}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {recommendations.map((rec, index) => (
                      <motion.div
                        key={rec.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <Link to={rec.link}>
                          <div className={`p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                            isDark 
                              ? 'bg-white/5 border-white/10 hover:border-purple-500/50' 
                              : 'bg-gray-50 border-gray-200 hover:border-purple-500/50'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {rec.name}
                                  </span>
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                    {rec.match}% {isRTL ? 'تطابق' : 'match'}
                                  </span>
                                </div>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {rec.desc}
                                </p>
                              </div>
                              <ArrowRight className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'} ${isRTL ? 'rotate-180' : ''}`} />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/contact" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                        {isRTL ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                        {isRTL ? <ArrowLeft className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={resetQuiz}
                      className={`flex-1 ${isDark ? 'border-white/20' : ''}`}
                    >
                      <RotateCcw className="w-4 h-4 me-2" />
                      {isRTL ? 'إعادة التقييم' : 'Retake Quiz'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickAssessmentQuiz;
