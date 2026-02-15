'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, Check, DollarSign } from 'lucide-react';
import { AnimatedCard, FadeIn } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { FAQAccordion } from '@/components/faq/FAQAccordion';

export default function PricingContent() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const [students, setStudents] = useState(25);

  const lokaCost = students * 6;
  const commissionCost = students * 50 * 0.4;
  const savings = commissionCost - lokaCost;

  const features = Array.from({ length: 8 }, (_, i) => t(`card.features.${i}`));

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

      {/* Pricing Card */}
      <section className="py-section bg-background">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-md mx-auto">
              <AnimatedCard className="p-10">
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <DollarSign className="w-8 h-8 text-accent" />
                    <span className="text-7xl font-extrabold text-primary">6</span>
                  </div>
                  <p className="text-lg text-text">{t('card.period')}</p>
                  <p className="text-text mt-2">{t('card.description')}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-text">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="accent" size="xl" className="w-full">
                  <Link href="https://thelivingtextbook.lokalingo.com/login">
                    {t('card.cta')}<ArrowRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
              </AnimatedCard>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="py-section bg-muted dark:bg-card">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-lg mx-auto">
              <h2 className="text-h2 text-center mb-8">{t('calculator.title')}</h2>
              <div className="bg-background dark:bg-background rounded-2xl p-8">
                <label className="block mb-4">
                  <span className="text-text font-medium">{students} {t('calculator.students')}</span>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    value={students}
                    onChange={(e) => setStudents(parseInt(e.target.value))}
                    className="w-full mt-2 accent-accent"
                  />
                </label>
                <div className="space-y-4 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-text">{t('calculator.lokaMonthly')}</span>
                    <span className="text-2xl font-bold text-accent">${lokaCost}/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text">{t('calculator.commissionMonthly')}</span>
                    <span className="text-2xl font-bold text-muted-foreground line-through">${commissionCost.toLocaleString()}/mo</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between items-center">
                    <span className="text-primary font-semibold">{t('calculator.youSave')}</span>
                    <span className="text-3xl font-extrabold text-accent">${savings.toLocaleString()}/mo</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-section bg-background">
        <div className="container-custom">
          <FadeIn><h2 className="text-h2 text-center mb-12">{t('faq.title')}</h2></FadeIn>
          <FAQAccordion
            categories={[{
              title: '',
              items: Array.from({ length: 4 }, (_, i) => ({
                question: t(`faq.items.${i}.question`),
                answer: t(`faq.items.${i}.answer`),
              })),
            }]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-gradient-to-b from-muted to-background dark:from-card dark:to-background">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h2 mb-8">{t('cta.title')}</h2>
              <Button asChild variant="accent" size="xl">
                <Link href="https://thelivingtextbook.lokalingo.com/login">
                  {t('cta.button')}<ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
