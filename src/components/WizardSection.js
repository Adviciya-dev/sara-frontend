import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, RefreshCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';
import servicesData from '../data/services.json';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const WizardSection = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t, getLocalizedValue, isRTL } = useLanguage();

  const steps = [
    {
      id: 'area',
      title: t('wizard.step1.title'),
      options: [
        { value: 'government', label: t('wizard.step1.options.government'), icon: '🏛️' },
        { value: 'hr', label: t('wizard.step1.options.hr'), icon: '👥' },
        { value: 'fleet', label: t('wizard.step1.options.fleet'), icon: '🚚' },
        { value: 'telecom', label: t('wizard.step1.options.telecom'), icon: '📞' },
        { value: 'marketing', label: t('wizard.step1.options.marketing'), icon: '📈' },
        { value: 'ai', label: t('wizard.step1.options.ai'), icon: '🤖' },
      ],
    },
    {
      id: 'company_size',
      title: t('wizard.step2.title'),
      options: [
        { value: 'small', label: t('wizard.step2.options.small'), icon: '🏠' },
        { value: 'medium', label: t('wizard.step2.options.medium'), icon: '🏢' },
        { value: 'large', label: t('wizard.step2.options.large'), icon: '🏙️' },
      ],
    },
    {
      id: 'challenge',
      title: t('wizard.step3.title'),
      options: [
        { value: 'compliance', label: t('wizard.step3.options.compliance'), icon: '📋' },
        { value: 'paperwork', label: t('wizard.step3.options.paperwork'), icon: '📄' },
        { value: 'visibility', label: t('wizard.step3.options.visibility'), icon: '👁️' },
        { value: 'response', label: t('wizard.step3.options.response'), icon: '⏱️' },
        { value: 'leads', label: t('wizard.step3.options.leads'), icon: '🎯' },
        { value: 'aiIntro', label: t('wizard.step3.options.aiIntro'), icon: '💡' },
      ],
    },
  ];

  const handleSelect = (stepId, value) => {
    setAnswers(prev => ({ ...prev, [stepId]: value }));
    
    if (step < 3) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      fetchRecommendations({ ...answers, [stepId]: value });
    }
  };

  const fetchRecommendations = async (finalAnswers) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API}/wizard/recommend`, {
        area: finalAnswers.area,
        company_size: finalAnswers.company_size,
        challenge: finalAnswers.challenge,
      });
      
      const recommended = response.data.recommended_services;
      
      // Map service IDs to actual service data
      const serviceDetails = [];
      servicesData.categories.forEach(category => {
        category.services.forEach(service => {
          if (recommended.includes(service.id)) {
            serviceDetails.push({
              ...service,
              categoryName: category.name,
              categoryColor: category.color,
            });
          }
        });
      });
      
      setRecommendations(serviceDetails);
      setStep(4);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetWizard = () => {
    setStep(1);
    setAnswers({});
    setRecommendations([]);
  };

  const currentStep = steps[step - 1];
  const progress = step === 4 ? 100 : ((step - 1) / 3) * 100;

  return (
    <section className="py-24 bg-gray-50 dark:bg-sara-surface" data-testid="wizard-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
            {t('wizard.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('wizard.subtitle')}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="wizard-progress mb-8">
          <div 
            className="wizard-progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                s < step
                  ? 'bg-sara-cyan text-white'
                  : s === step
                  ? 'bg-sara-cyan/20 text-sara-cyan border-2 border-sara-cyan'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {s < step ? <Check className="w-5 h-5" /> : s}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="glass rounded-3xl p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {step <= 3 && (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                  {currentStep.title}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentStep.options.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(currentStep.id, option.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-start ${
                        answers[currentStep.id] === option.value
                          ? 'border-sara-cyan bg-sara-cyan/10'
                          : 'border-border hover:border-sara-cyan/50 bg-background/50'
                      }`}
                      data-testid={`wizard-option-${option.value}`}
                    >
                      <span className="text-2xl mb-2 block">{option.icon}</span>
                      <span className="text-sm font-medium text-foreground">
                        {option.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    {t('wizard.results.title')}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetWizard}
                    className="text-muted-foreground"
                    data-testid="wizard-reset"
                  >
                    <RefreshCcw className="w-4 h-4 me-2" />
                    {t('wizard.startOver')}
                  </Button>
                </div>

                <div className="grid gap-4">
                  {recommendations.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border hover:border-sara-cyan/50 transition-colors"
                      data-testid={`wizard-result-${service.id}`}
                    >
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {getLocalizedValue(service.name)}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {getLocalizedValue(service.shortDesc)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/service/${service.slug}`)}
                        >
                          {t('wizard.results.viewSolution')}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center pt-4">
                  <Button
                    onClick={() => navigate('/contact')}
                    className="bg-sara-cyan hover:bg-sara-cyanHover text-white rounded-full"
                    data-testid="wizard-contact-cta"
                  >
                    {t('wizard.results.talkToTeam')}
                    <ArrowRight className={`w-4 h-4 ms-2 ${isRTL ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
              </motion.div>
            )}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="w-12 h-12 border-4 border-sara-border rounded-full animate-spin border-t-sara-cyan"></div>
                <p className="mt-4 text-muted-foreground">Finding the best solutions...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {step > 1 && step < 4 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                data-testid="wizard-back"
              >
                {isRTL ? <ChevronRight className="w-4 h-4 me-2" /> : <ChevronLeft className="w-4 h-4 me-2" />}
                {t('wizard.back')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WizardSection;
