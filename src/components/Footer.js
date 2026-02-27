'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Linkedin, Twitter, Settings } from 'lucide-react';
import servicesData from '../data/services.json';

const Footer = () => {
  const { t, getLocalizedValue, isRTL } = useLanguage();

  const quickLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/who-we-are', label: t('nav.whoWeAre') },
    { href: '/success-stories', label: t('nav.successStories') },
    { href: '/blogs', label: t('nav.blogs') },
    { href: '/careers', label: t('nav.careers') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer
      className="bg-sara-navy border-t border-sara-border"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <img
                src="https://customer-assets.emergentagent.com/job_command-center-sa/artifacts/fwhjuivt_logo-1-2048x531.png"
                alt="SARA Business Solutions"
                className="h-10"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 dark:bg-sara-surface hover:bg-sara-cyan/10 text-muted-foreground hover:text-sara-cyan transition-colors"
                data-testid="social-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 dark:bg-sara-surface hover:bg-sara-cyan/10 text-muted-foreground hover:text-sara-cyan transition-colors"
                data-testid="social-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-6 text-white">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-sara-cyan text-sm transition-colors"
                    data-testid={`footer-link-${link.href.replace("/", "") || "home"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-6 text-white">
              {t("footer.services")}
            </h4>
            <ul className="space-y-3">
              {servicesData.categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/services/${category.slug}`}
                    className="text-muted-foreground hover:text-sara-cyan text-sm transition-colors"
                    data-testid={`footer-service-${category.id}`}
                  >
                    {getLocalizedValue(category.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-6 text-white">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sara-cyan shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Riyadh, Saudi Arabia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sara-cyan shrink-0" />
                <a
                  href="tel:+966123456789"
                  className="text-muted-foreground hover:text-sara-cyan text-sm transition-colors"
                >
                  +966 12 345 6789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sara-cyan shrink-0" />
                <a
                  href="mailto:info@sara.sa"
                  className="text-muted-foreground hover:text-sara-cyan text-sm transition-colors"
                >
                  info@sara.sa
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-sara-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} SARA Business Solutions.{" "}
            {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Terms of Service
            </Link>
            {/* Hidden Admin Access */}
            <Link
              href="/admin/login"
              className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              title="Admin"
              data-testid="admin-access"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
