'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Phone, Mail, Building2, User, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const LeadFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/leads`, {
        ...formData,
        source: 'homepage_form'
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      }, 5000);
    } catch (error) {
      console.error('Lead submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className={`py-14 relative overflow-hidden ${isDark ? 'bg-sara-navy' : 'bg-gradient-to-br from-purple-50 via-white to-cyan-50'}`}
      data-testid="lead-form-section"
    >
      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-purple-500/10' : 'bg-purple-500/20'
          }`}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/20'
          }`}
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating icons */}
        <motion.div
          className="absolute top-20 left-[10%]"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white shadow-lg'}`}>
            <Phone className="w-6 h-6 text-cyan-500" />
          </div>
        </motion.div>
        
        <motion.div
          className="absolute top-40 right-[15%]"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
        >
          <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white shadow-lg'}`}>
            <Mail className="w-6 h-6 text-purple-500" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-[20%]"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        >
          <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white shadow-lg'}`}>
            <Building2 className="w-6 h-6 text-pink-500" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-48 right-[10%]"
          animate={{ y: [0, 25, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1.5 }}
        >
          <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white shadow-lg'}`}>
            <Sparkles className="w-6 h-6 text-orange-500" />
          </div>
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className={`text-sm font-medium ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                {isRTL ? 'استشارة مجانية' : 'Free Consultation'}
              </span>
            </motion.div>

            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {isRTL ? (
                <>
                  دعنا نساعدك في
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"> تحقيق النجاح</span>
                </>
              ) : (
                <>
                  Let's Help You
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"> Succeed</span>
                </>
              )}
            </h2>

            <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isRTL 
                ? 'فريقنا من الخبراء مستعد لمساعدتك في تحويل أعمالك رقمياً. احصل على استشارة مجانية اليوم!'
                : 'Our team of experts is ready to help you digitally transform your business. Get a free consultation today!'
              }
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: '✓', text: isRTL ? 'استجابة خلال 24 ساعة' : 'Response within 24 hours' },
                { icon: '✓', text: isRTL ? 'استشارة مجانية بدون التزام' : 'Free consultation, no obligation' },
                { icon: '✓', text: isRTL ? 'حلول مخصصة لاحتياجاتك' : 'Custom solutions for your needs' },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                    {benefit.icon}
                  </div>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={`p-8 rounded-3xl ${
              isDark 
                ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10' 
                : 'bg-white/80 backdrop-blur-xl shadow-2xl border border-gray-100'
            }`}>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {isRTL ? 'شكراً لتواصلك!' : 'Thank You!'}
                  </h3>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {isRTL 
                      ? 'سنتواصل معك في أقرب وقت ممكن'
                      : "We'll get back to you as soon as possible"
                    }
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-center mb-6">
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {isRTL ? 'احصل على استشارتك المجانية' : 'Get Your Free Consultation'}
                    </h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isRTL ? 'الاسم *' : 'Name *'}
                        required
                        className={`${isRTL ? 'pr-10' : 'pl-10'} ${
                          isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                        }`}
                        data-testid="section-lead-name"
                      />
                    </div>
                    <div className="relative">
                      <Mail className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={isRTL ? 'البريد الإلكتروني *' : 'Email *'}
                        required
                        className={`${isRTL ? 'pr-10' : 'pl-10'} ${
                          isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                        }`}
                        data-testid="section-lead-email"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <Building2 className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={isRTL ? 'الشركة' : 'Company'}
                        className={`${isRTL ? 'pr-10' : 'pl-10'} ${
                          isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                        }`}
                        data-testid="section-lead-company"
                      />
                    </div>
                    <div className="relative">
                      <Phone className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={isRTL ? 'الهاتف' : 'Phone'}
                        className={`${isRTL ? 'pr-10' : 'pl-10'} ${
                          isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                        }`}
                        data-testid="section-lead-phone"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <MessageSquare className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isRTL ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
                      rows={4}
                      className={`w-full rounded-lg p-3 ${isRTL ? 'pr-10' : 'pl-10'} text-sm resize-none ${
                        isDark 
                          ? 'bg-white/5 border border-white/10 text-white placeholder:text-gray-500' 
                          : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400'
                      }`}
                      data-testid="section-lead-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email}
                    className="w-full h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25"
                    data-testid="section-lead-submit"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        {isRTL ? 'إرسال الطلب' : 'Submit Request'}
                      </span>
                    )}
                  </Button>

                  <p className={`text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {isRTL 
                      ? 'بالإرسال، أنت توافق على سياسة الخصوصية'
                      : 'By submitting, you agree to our Privacy Policy'
                    }
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadFormSection;
