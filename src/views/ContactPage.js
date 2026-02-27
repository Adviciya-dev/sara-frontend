'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const ContactPage = () => {
  const { t, isRTL } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${API}/contact`, {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: formData.message,
        source: 'contact_form'
      });

      toast.success(isRTL ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24" data-testid="contact-page">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-sara-navy dark:via-sara-surface dark:to-sara-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="outline" className="text-sara-cyan border-sara-cyan/30 bg-sara-cyan/10 mb-4">
              {t('nav.contact')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.name')} *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-card"
                      data-testid="contact-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.email')} *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-card"
                      data-testid="contact-email"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.company')}
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-card"
                      data-testid="contact-company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-card"
                      data-testid="contact-phone"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-card resize-none"
                    data-testid="contact-message"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-sara-cyan hover:bg-sara-cyanHover text-white rounded-full"
                  data-testid="contact-submit"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 me-2 animate-spin" />
                      {isRTL ? 'جاري الإرسال...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 me-2" />
                      {t('contact.form.submit')}
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-6">
                  {isRTL ? 'معلومات الاتصال' : 'Contact Information'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sara-cyan/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-sara-cyan" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{isRTL ? 'العنوان' : 'Address'}</p>
                      <p className="text-muted-foreground text-sm">
                        {isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sara-cyan/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-sara-cyan" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{isRTL ? 'الهاتف' : 'Phone'}</p>
                      <a href="tel:+966123456789" className="text-muted-foreground text-sm hover:text-sara-cyan transition-colors">
                        +966 12 345 6789
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sara-cyan/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-sara-cyan" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{isRTL ? 'البريد الإلكتروني' : 'Email'}</p>
                      <a href="mailto:info@sara.sa" className="text-muted-foreground text-sm hover:text-sara-cyan transition-colors">
                        info@sara.sa
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-sara-surface border border-border">
                <h3 className="font-semibold text-foreground mb-4">
                  {isRTL ? 'ساعات العمل' : 'Business Hours'}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{isRTL ? 'الأحد - الخميس' : 'Sunday - Thursday'}</span>
                    <span className="text-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{isRTL ? 'الجمعة - السبت' : 'Friday - Saturday'}</span>
                    <span className="text-foreground">{isRTL ? 'مغلق' : 'Closed'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
