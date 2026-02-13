'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { locales, type Locale } from '@/i18n';

const languageNames: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
  ko: '한국어',
};

const languageFlags: Record<Locale, string> = {
  en: '\u{1F1EC}\u{1F1E7}',
  ja: '\u{1F1EF}\u{1F1F5}',
  ko: '\u{1F1F0}\u{1F1F7}',
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: Locale) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${currentPath}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-text hover:text-primary transition-colors rounded-lg hover:bg-muted"
      >
        <span className="text-lg">{languageFlags[locale]}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-card rounded-lg shadow-lg border border-border py-2 min-w-[160px]">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-muted transition-colors ${
                  locale === loc ? 'text-primary font-medium bg-muted' : 'text-text'
                }`}
              >
                <span>{languageFlags[loc]}</span>
                <span>{languageNames[loc]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
