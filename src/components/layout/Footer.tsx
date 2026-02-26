'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Youtube, Instagram, Mail } from 'lucide-react';

const socialLinks = [
  { name: 'YouTube', href: 'https://www.youtube.com/@lokalingo', icon: Youtube },
  { name: 'Instagram', href: 'https://www.instagram.com/lokalingo', icon: Instagram },
  { name: 'Email', href: 'mailto:ryan@lokalingo.com', icon: Mail },
];

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  const footerLinks = {
    platform: [
      { name: t('livingTextbook'), href: `https://thelivingtextbook.lokalingo.com/${locale}` },
      { name: tNav('educators'), href: `/${locale}/for-educators` },
      { name: tNav('learners'), href: `/${locale}/for-learners` },
      { name: tNav('schools'), href: `/${locale}/for-schools` },
    ],
    company: [
      { name: tNav('story'), href: `/${locale}/the-loka-story` },
      { name: tNav('useCases'), href: `/${locale}/use-cases` },
      { name: tNav('blog'), href: `/${locale}/blog` },
      { name: t('contact'), href: `/${locale}/contact` },
      { name: tNav('pricing'), href: `/${locale}/pricing` },
      { name: t('docs'), href: 'https://docs.lokalingo.com' },
    ],
    legal: [
      { name: t('privacy'), href: `/${locale}/privacy` },
      { name: t('terms'), href: `/${locale}/terms` },
      { name: t('cookies'), href: `/${locale}/cookies` },
    ],
  };

  return (
    <footer className="bg-primary dark:bg-[hsl(230,60%,8%)] text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <Image src="/logo.png" alt="LokaLingo" width={28} height={28} className="rounded" />
              <span className="text-2xl font-bold tracking-wide">LokaLingo</span>
            </Link>
            <p className="text-white/90 text-sm leading-relaxed">{t('tagline')}</p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('platformTitle')}</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/90 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('companyTitle')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/90 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('legalTitle')}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/90 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/80 text-sm text-center">
            &copy; {new Date().getFullYear()} LokaLingo {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
