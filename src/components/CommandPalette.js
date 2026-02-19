import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Briefcase, BookOpen, ArrowRight } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { useLanguage } from '../context/LanguageContext';
import servicesData from '../data/services.json';

const CommandPalette = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t, getLocalizedValue } = useLanguage();

  const pages = [
    { href: '/', name: 'Home', nameAr: 'الرئيسية' },
    { href: '/services', name: 'All Services', nameAr: 'جميع الخدمات' },
    { href: '/who-we-are', name: 'Who We Are', nameAr: 'من نحن' },
    { href: '/success-stories', name: 'Success Stories', nameAr: 'قصص النجاح' },
    { href: '/blogs', name: 'Blogs', nameAr: 'المدونة' },
    { href: '/resources', name: 'Resources', nameAr: 'الموارد' },
    { href: '/careers', name: 'Careers', nameAr: 'الوظائف' },
    { href: '/contact', name: 'Contact', nameAr: 'تواصل معنا' },
  ];

  const allServices = useMemo(() => {
    const services = [];
    servicesData.categories.forEach((category) => {
      category.services.forEach((service) => {
        services.push({
          ...service,
          categoryId: category.id,
          categoryName: category.name,
        });
      });
    });
    return services;
  }, []);

  const handleSelect = (href) => {
    navigate(href);
    onClose();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput 
        placeholder={t('commandPalette.placeholder')} 
        data-testid="command-palette-input"
      />
      <CommandList>
        <CommandEmpty>{t('commandPalette.noResults')}</CommandEmpty>
        
        {/* Services */}
        <CommandGroup heading={t('commandPalette.categories.services')}>
          {allServices.map((service) => (
            <CommandItem
              key={service.id}
              value={`${getLocalizedValue(service.name)} ${getLocalizedValue(service.categoryName)}`}
              onSelect={() => handleSelect(`/service/${service.slug}`)}
              className="flex items-center gap-3 cursor-pointer"
              data-testid={`command-service-${service.id}`}
            >
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">{getLocalizedValue(service.name)}</p>
                <p className="text-xs text-muted-foreground">
                  {getLocalizedValue(service.categoryName)}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </CommandItem>
          ))}
        </CommandGroup>

        {/* Pages */}
        <CommandGroup heading={t('commandPalette.categories.pages')}>
          {pages.map((page) => (
            <CommandItem
              key={page.href}
              value={`${page.name} ${page.nameAr}`}
              onSelect={() => handleSelect(page.href)}
              className="flex items-center gap-3 cursor-pointer"
              data-testid={`command-page-${page.href.replace('/', '') || 'home'}`}
            >
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="flex-1">{getLocalizedValue({ en: page.name, ar: page.nameAr })}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
