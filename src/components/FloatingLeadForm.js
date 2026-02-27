'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Send, Sparkles, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const FloatingLeadForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();

  // Show reminder pulse every 30 seconds if form not opened
  useEffect(() => {
    if (!isOpen && !isSubmitted) {
      const interval = setInterval(() => {
        setShowPulse(true);
        setTimeout(() => setShowPulse(false), 3000);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isOpen, isSubmitted]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/leads`, {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        service_interest: formData.interest,
        message: formData.message,
        source: 'floating_form'
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => {
          setIsSubmitted(false);
          setStep(1);
          setFormData({ name: '', email: '', company: '', phone: '', interest: '', message: '' });
        }, 500);
      }, 3000);
    } catch (error) {
      console.error('Lead submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const interests = [
    { value: 'government', label: isRTL ? 'البوابات الحكومية' : 'Government Portals', icon: '🏛️' },
    { value: 'hr', label: isRTL ? 'الموارد البشرية' : 'HR & Performance', icon: '👥' },
    { value: 'fleet', label: isRTL ? 'إدارة الأسطول' : 'Fleet Management', icon: '🚚' },
    { value: 'telecom', label: isRTL ? 'الاتصالات' : 'Telecom', icon: '📞' },
    { value: 'tech', label: isRTL ? 'التكنولوجيا' : 'Advanced Technology', icon: '🚀' },
    { value: 'ai', label: isRTL ? 'الذكاء الاصطناعي' : 'AI Solutions', icon: '🤖' },
  ];

  const canProceed = () => {
    if (step === 1) return formData.name && formData.email;
    if (step === 2) return formData.interest;
    return true;
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className={`fixed z-50 bottom-6 ${isRTL ? 'right-6' : 'left-6'}`}
            data-testid="floating-lead-trigger"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-60 animate-pulse" />
              
              {/* Main button */}
              <div className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl ${
                isDark 
                  ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400' 
                  : 'bg-gradient-to-br from-purple-500 via-pink-400 to-orange-300'
              }`}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              
              {/* Pulse ring */}
              {showPulse && (
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-purple-400"
                />
              )}
            </div>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap ${
                isRTL ? 'right-full mr-3' : 'left-full ml-3'
              }`}
            >
              <div className={`px-3 py-2 rounded-lg text-sm font-medium shadow-lg ${
                isDark ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
              }`}>
                {isRTL ? 'احصل على استشارة مجانية' : 'Get Free Consultation'}
              </div>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Lead Form Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Form Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`fixed z-50 bottom-20 w-full max-w-md mx-4 ${
                isRTL ? 'right-4' : 'left-4'
              }`}
              data-testid="floating-lead-form"
            >
              <div className={`rounded-3xl overflow-hidden shadow-2xl ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/10' 
                  : 'bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200'
              }`}>
                {/* Header */}
                <div className="relative p-6 pb-4">
                  {/* Decorative gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10" />
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {isRTL ? 'تواصل معنا' : 'Get In Touch'}
                        </h3>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {isRTL ? 'الخطوة' : 'Step'} {step} {isRTL ? 'من' : 'of'} 3
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className={`rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: '0%' }}
                      animate={{ width: `${(step / 3) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="py-8 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.2 }}
                          className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
                        >
                          <CheckCircle2 className="w-8 h-8 text-white" />
                        </motion.div>
                        <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {isRTL ? 'شكراً لك!' : 'Thank You!'}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {isRTL 
                            ? 'سنتواصل معك قريباً' 
                            : "We'll be in touch shortly"}
                        </p>
                      </motion.div>
                    ) : (
                      <>
                        {/* Step 1: Basic Info */}
                        {step === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                            className="space-y-4"
                          >
                            <div>
                              <label className={`text-sm font-medium mb-2 block ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {isRTL ? 'الاسم' : 'Name'} *
                              </label>
                              <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={isRTL ? 'أدخل اسمك' : 'Enter your name'}
                                className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}
                                data-testid="lead-form-name"
                              />
                            </div>
                            <div>
                              <label className={`text-sm font-medium mb-2 block ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {isRTL ? 'البريد الإلكتروني' : 'Email'} *
                              </label>
                              <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                                className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}
                                data-testid="lead-form-email"
                              />
                            </div>
                            <div>
                              <label className={`text-sm font-medium mb-2 block ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {isRTL ? 'الشركة' : 'Company'}
                              </label>
                              <Input
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                placeholder={isRTL ? 'اسم الشركة' : 'Company name'}
                                className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}
                                data-testid="lead-form-company"
                              />
                            </div>
                          </motion.div>
                        )}

                        {/* Step 2: Interest Selection */}
                        {step === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                            className="space-y-3"
                          >
                            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              {isRTL ? 'ما الذي يهمك؟' : 'What are you interested in?'}
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {interests.map((interest) => (
                                <motion.button
                                  key={interest.value}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setFormData({ ...formData, interest: interest.value })}
                                  className={`p-3 rounded-xl text-left transition-all ${
                                    formData.interest === interest.value
                                      ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500'
                                      : isDark 
                                        ? 'bg-white/5 border border-white/10 hover:border-white/20' 
                                        : 'bg-gray-50 border border-gray-200 hover:border-gray-300'
                                  }`}
                                  data-testid={`lead-form-interest-${interest.value}`}
                                >
                                  <span className="text-xl mb-1 block">{interest.icon}</span>
                                  <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {interest.label}
                                  </span>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Step 3: Message */}
                        {step === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                            className="space-y-4"
                          >
                            <div>
                              <label className={`text-sm font-medium mb-2 block ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {isRTL ? 'رقم الهاتف' : 'Phone'}
                              </label>
                              <Input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder={isRTL ? 'رقم الهاتف' : 'Your phone number'}
                                className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}
                                data-testid="lead-form-phone"
                              />
                            </div>
                            <div>
                              <label className={`text-sm font-medium mb-2 block ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {isRTL ? 'رسالتك' : 'Your Message'}
                              </label>
                              <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder={isRTL ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
                                rows={3}
                                className={`w-full rounded-lg p-3 text-sm resize-none ${
                                  isDark 
                                    ? 'bg-white/5 border border-white/10 text-white placeholder:text-gray-500' 
                                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400'
                                }`}
                                data-testid="lead-form-message"
                              />
                            </div>
                          </motion.div>
                        )}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Navigation */}
                  {!isSubmitted && (
                    <div className="flex justify-between mt-6">
                      {step > 1 ? (
                        <Button
                          variant="ghost"
                          onClick={() => setStep(step - 1)}
                          className={`gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                        >
                          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                          {isRTL ? 'السابق' : 'Back'}
                        </Button>
                      ) : (
                        <div />
                      )}
                      
                      {step < 3 ? (
                        <Button
                          onClick={() => setStep(step + 1)}
                          disabled={!canProceed()}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white gap-2"
                          data-testid="lead-form-next"
                        >
                          {isRTL ? 'التالي' : 'Next'}
                          {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white gap-2"
                          data-testid="lead-form-submit"
                        >
                          {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              {isRTL ? 'إرسال' : 'Submit'}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingLeadForm;
