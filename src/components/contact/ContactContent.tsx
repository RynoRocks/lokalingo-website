'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Send, Calendar } from 'lucide-react';
import { FadeIn } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';

export default function ContactContent() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      type: (form.elements.namedItem('type') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      language: locale,
    };

    try {
      const res = await fetch('https://n8n.orbweva.cloud/webhook/loka-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="py-hero bg-gradient-to-b from-white via-blue-50/30 to-muted dark:from-background dark:via-[hsl(230,60%,8%)] dark:to-muted">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">{t('hero.title')}</h1>
              <p className="text-xl text-text">{t('hero.subtitle')}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-section bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <FadeIn>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">{t('form.name')}</label>
                  <input id="name" name="name" type="text" required className="input-field" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">{t('form.email')}</label>
                  <input id="email" name="email" type="email" required className="input-field" />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-primary mb-2">{t('form.type')}</label>
                  <select id="type" name="type" required className="input-field">
                    <option value="educator">{t('form.typeOptions.educator')}</option>
                    <option value="learner">{t('form.typeOptions.learner')}</option>
                    <option value="school">{t('form.typeOptions.school')}</option>
                    <option value="other">{t('form.typeOptions.other')}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">{t('form.message')}</label>
                  <textarea id="message" name="message" rows={5} required className="input-field resize-none" />
                </div>
                <Button type="submit" variant="accent" size="xl" className="w-full" disabled={status === 'sending'}>
                  <Send className="w-5 h-5 mr-2" />
                  {status === 'sending' ? '...' : t('form.submit')}
                </Button>
                {status === 'success' && <p className="text-accent text-sm">{t('form.success')}</p>}
                {status === 'error' && <p className="text-destructive text-sm">{t('form.error')}</p>}
              </form>
            </FadeIn>

            {/* Sidebar */}
            <FadeIn delay={200}>
              <div className="space-y-8">
                {/* Calendly */}
                <div className="bg-muted dark:bg-card rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-6 h-6 text-accent" />
                    <h3 className="text-h4">{t('calendly.title')}</h3>
                  </div>
                  <p className="text-text mb-4">{t('calendly.description')}</p>
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <a href="https://calendly.com/ryan-lokalingo/demo" target="_blank" rel="noopener noreferrer">
                      {t('calendly.title')}
                    </a>
                  </Button>
                </div>

                {/* Email */}
                <div className="bg-muted dark:bg-card rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-6 h-6 text-accent" />
                    <h3 className="text-h4">{t('email.title')}</h3>
                  </div>
                  <a href="mailto:ryan@lokalingo.com" className="text-accent hover:text-primary transition-colors font-medium">
                    {t('email.address')}
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
