import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { ArrowRight, GraduationCap, BookOpen, Building } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo';
import { AnimatedCard, FadeIn } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata('useCases', locale, '/use-cases');
}

export default async function UseCasesPage() {
  const t = await getTranslations('useCases');
  const locale = await getLocale();

  const useCases = [
    {
      icon: GraduationCap,
      audience: t('cases.0.audience'),
      title: t('cases.0.title'),
      challenge: t('cases.0.challenge'),
      solution: t('cases.0.solution'),
      result: t('cases.0.result'),
      href: `/${locale}/for-educators`,
    },
    {
      icon: BookOpen,
      audience: t('cases.1.audience'),
      title: t('cases.1.title'),
      challenge: t('cases.1.challenge'),
      solution: t('cases.1.solution'),
      result: t('cases.1.result'),
      href: `/${locale}/for-learners`,
    },
    {
      icon: Building,
      audience: t('cases.2.audience'),
      title: t('cases.2.title'),
      challenge: t('cases.2.challenge'),
      solution: t('cases.2.solution'),
      result: t('cases.2.result'),
      href: `/${locale}/for-schools`,
    },
  ];

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

      {/* Use Cases */}
      <section className="py-section bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-16">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <FadeIn key={i} delay={i * 100}>
                  <AnimatedCard className="p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-accent">{uc.audience}</span>
                        <h2 className="text-h3">{uc.title}</h2>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-muted dark:bg-background rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">{t('labels.challenge')}</h3>
                        <p className="text-text text-sm">{uc.challenge}</p>
                      </div>
                      <div className="bg-muted dark:bg-background rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">{t('labels.solution')}</h3>
                        <p className="text-text text-sm">{uc.solution}</p>
                      </div>
                      <div className="bg-muted dark:bg-background rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">{t('labels.result')}</h3>
                        <p className="text-text text-sm">{uc.result}</p>
                      </div>
                    </div>

                    <Button asChild variant="outline" size="lg">
                      <Link href={uc.href}>
                        {t('learnMore')}<ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </AnimatedCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-gradient-to-b from-muted to-background dark:from-card dark:to-background">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h2 mb-4">{t('cta.title')}</h2>
              <p className="text-xl text-text mb-8">{t('cta.subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="accent" size="xl">
                  <Link href={`https://thelivingtextbook.lokalingo.com/${locale}`}>
                    {t('cta.primaryButton')}<ArrowRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link href={`/${locale}/contact`}>
                    {t('cta.secondaryButton')}
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
