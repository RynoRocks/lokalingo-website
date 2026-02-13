import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { ArrowRight, Users, Brain, BookOpen, BarChart3, CalendarDays, Building } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo';
import { AnimatedCard, FadeIn } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata('schools', locale, '/for-schools');
}

export default async function SchoolsPage() {
  const t = await getTranslations('schools');
  const locale = await getLocale();

  const featureIcons = [Users, Brain, BookOpen, BarChart3, CalendarDays, Building];

  return (
    <>
      {/* Hero */}
      <section className="py-hero bg-gradient-to-b from-white via-blue-50/30 to-muted dark:from-background dark:via-[hsl(230,60%,8%)] dark:to-muted">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">{t('hero.title')}</h1>
              <p className="text-xl text-text max-w-3xl mx-auto">{t('hero.subtitle')}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 23-Year Advantage */}
      <section className="py-section bg-background">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h2 mb-6">{t('advantage.title')}</h2>
              <p className="text-xl text-text">{t('advantage.description')}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-section bg-muted dark:bg-card">
        <div className="container-custom">
          <FadeIn><h2 className="text-h2 text-center mb-12">{t('features.title')}</h2></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const Icon = featureIcons[i];
              return (
                <FadeIn key={i} delay={i * 100}>
                  <AnimatedCard className="p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-h4 mb-2">{t(`features.items.${i}.title`)}</h3>
                    <p className="text-text text-sm">{t(`features.items.${i}.description`)}</p>
                  </AnimatedCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cost Predictability */}
      <section className="py-section bg-background">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h2 mb-6">{t('cost.title')}</h2>
              <p className="text-xl text-text">{t('cost.description')}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-gradient-to-b from-muted to-background dark:from-card dark:to-background">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h2 mb-4">{t('cta.title')}</h2>
              <p className="text-xl text-text mb-8">{t('cta.subtitle')}</p>
              <Button asChild variant="accent" size="xl">
                <Link href={`/${locale}/contact`}>
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
