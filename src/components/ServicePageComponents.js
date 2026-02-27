'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Download, ArrowRight, Check, FileText, ClipboardCheck, FileSignature } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

// Hero Section Component
export const ServiceHero = ({ 
  title, 
  subtitle, 
  breadcrumbs = [], 
  ctaButtons = [],
  metrics = [],
  color = '#2563EB'
}) => {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();

  return (
    <section 
      className={`relative pt-32 pb-20 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-sara-navy via-sara-surface to-sara-navy' 
          : 'bg-gradient-to-br from-slate-50 via-white to-cyan-50'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: color }}
        />
        <div 
          className="absolute bottom-20 left-20 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: color }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-2">
                {idx > 0 && <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-foreground transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          {ctaButtons.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {ctaButtons.map((btn, idx) => (
                <Button
                  key={idx}
                  variant={btn.variant || 'default'}
                  size="lg"
                  className={idx === 0 ? 'bg-sara-cyan hover:bg-sara-cyanHover text-white' : ''}
                  asChild={btn.href ? true : false}
                >
                  {btn.href ? (
                    <Link href={btn.href}>
                      {btn.icon && <btn.icon className="w-5 h-5 me-2" />}
                      {btn.label}
                    </Link>
                  ) : (
                    <span>
                      {btn.icon && <btn.icon className="w-5 h-5 me-2" />}
                      {btn.label}
                    </span>
                  )}
                </Button>
              ))}
            </motion.div>
          )}

          {/* Metrics */}
          {metrics.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {metrics.map((metric, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-sara-cyan">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

// About Section Component
export const ServiceAbout = ({ 
  tagline, 
  title, 
  description, 
  metrics = [],
  color = '#2563EB'
}) => {
  const { isDark } = useTheme();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Badge className="mb-4" style={{ backgroundColor: `${color}20`, color }}>
            {tagline}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-6">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            {description}
          </p>

          {/* Metrics Row */}
          {metrics.length > 0 && (
            <div className={`grid grid-cols-2 md:grid-cols-${metrics.length} gap-6 p-6 rounded-2xl ${
              isDark ? 'bg-sara-surface' : 'bg-gray-50'
            }`}>
              {metrics.map((metric, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold" style={{ color }}>{metric.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Why Choose Us Section
export const ServiceWhyChoose = ({ 
  title, 
  subtitle,
  reasons = [],
  color = '#2563EB'
}) => {
  const { isDark } = useTheme();

  return (
    <section className={`py-20 ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-2xl ${isDark ? 'bg-sara-navy' : 'bg-white'} border border-border`}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${color}15` }}
              >
                {reason.icon && <reason.icon className="w-6 h-6" style={{ color }} />}
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Process Section
export const ServiceProcess = ({ 
  title, 
  subtitle,
  steps = [],
  color = '#2563EB'
}) => {
  const { isDark } = useTheme();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className={`p-6 rounded-2xl h-full ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-4"
                  style={{ backgroundColor: color }}
                >
                  {idx + 1}
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-muted-foreground/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Solutions Section
export const ServiceSolutions = ({ 
  title, 
  subtitle,
  solutions = [],
  color = '#2563EB'
}) => {
  const { isDark } = useTheme();

  return (
    <section className={`py-20 ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-2xl ${isDark ? 'bg-sara-navy' : 'bg-white'} border border-border hover:border-sara-cyan/50 transition-colors`}
            >
              {solution.icon && (
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <solution.icon className="w-7 h-7" style={{ color }} />
                </div>
              )}
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                {solution.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Forms Section
export const ServiceForms = ({ 
  title, 
  subtitle,
  forms = [],
  color = '#2563EB'
}) => {
  const { isDark } = useTheme();

  const formIcons = [FileText, ClipboardCheck, FileSignature];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {forms.map((form, idx) => {
            const Icon = formIcons[idx % formIcons.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-2xl ${isDark ? 'bg-sara-surface' : 'bg-gray-50'} border border-border`}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {form.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {form.description}
                </p>
                <Button variant="outline" size="sm" className="w-full group">
                  <Download className="w-4 h-4 me-2 group-hover:animate-bounce" />
                  Download PDF
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// CTA Section
export const ServiceCTA = ({ 
  title, 
  description,
  buttonText = 'Start Your Application',
  buttonHref = '/contact',
  color = '#2563EB'
}) => {
  const { isDark } = useTheme();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-12 rounded-3xl relative overflow-hidden ${
            isDark ? 'bg-sara-surface' : 'bg-gradient-to-br from-slate-900 to-slate-800'
          }`}
        >
          {/* Background decoration */}
          <div 
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ background: color }}
          />
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {description}
            </p>
            <Button size="lg" className="bg-sara-cyan hover:bg-sara-cyanHover text-white" asChild>
              <Link href={buttonHref}>
                {buttonText}
                <ArrowRight className="w-5 h-5 ms-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// FAQ Section
export const ServiceFAQ = ({ 
  title = 'Frequently Asked Questions',
  subtitle,
  faqs = [],
  color = '#2563EB'
}) => {
  const { isDark } = useTheme();

  return (
    <section className={`py-20 ${isDark ? 'bg-sara-surface' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className={`rounded-xl px-6 ${isDark ? 'bg-sara-navy' : 'bg-white'} border border-border`}
              >
                <AccordionTrigger className="text-foreground font-medium hover:no-underline text-left py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default {
  ServiceHero,
  ServiceAbout,
  ServiceWhyChoose,
  ServiceProcess,
  ServiceSolutions,
  ServiceForms,
  ServiceCTA,
  ServiceFAQ
};
