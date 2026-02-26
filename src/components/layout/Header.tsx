'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('nav');
  const locale = useLocale();

  const solutionsItems = [
    { name: t('educators'), href: `/${locale}/for-educators` },
    { name: t('learners'), href: `/${locale}/for-learners` },
    { name: t('schools'), href: `/${locale}/for-schools` },
  ];

  const navigation = [
    { name: t('useCases'), href: `/${locale}/use-cases` },
    { name: t('pricing'), href: `/${locale}/pricing` },
    { name: t('blog'), href: `/${locale}/blog` },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container-custom flex items-center justify-between py-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image src="/logo.png" alt="LokaLingo" width={32} height={32} className="rounded" />
          <span className="text-2xl font-bold text-primary">LokaLingo</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Solutions Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              className="flex items-center gap-1 text-text hover:text-primary transition-colors font-medium"
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              onMouseEnter={() => setSolutionsOpen(true)}
            >
              {t('solutions')}
              <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            {solutionsOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2"
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                {solutionsItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-text hover:text-primary hover:bg-muted transition-colors text-sm font-medium"
                    onClick={() => setSolutionsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-text hover:text-primary transition-colors font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild variant="accent" size="lg">
            <Link href={`https://thelivingtextbook.lokalingo.com/${locale}`}>{t('cta')}</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 text-text"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="container-custom py-4 space-y-4">
            {/* Solutions Accordion */}
            <div>
              <button
                type="button"
                className="flex items-center justify-between w-full text-text hover:text-primary font-medium"
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
              >
                {t('solutions')}
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileSolutionsOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  {solutionsItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-text hover:text-primary text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-text hover:text-primary font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text font-medium">{t('language')}</span>
                <LanguageSwitcher />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text font-medium">{t('theme')}</span>
                <ThemeToggle />
              </div>
              <Button asChild variant="accent" className="w-full">
                <Link href={`https://thelivingtextbook.lokalingo.com/${locale}`} onClick={() => setMobileMenuOpen(false)}>
                  {t('cta')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
