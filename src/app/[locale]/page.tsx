import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { ArrowRight, DollarSign, BookOpen, Users, Sparkles, Target, Zap } from 'lucide-react';
import { generatePageMetadata, siteConfig } from '@/lib/seo';
import { AnimatedCard, FadeIn } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { FAQAccordion } from '@/components/faq/FAQAccordion';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata('home', locale, '/');
}

export default async function HomePage() {
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');
  const locale = await getLocale();

  const differenceIcons = [Users, BookOpen, Sparkles];
  const differenceLinks = ['/for-educators', '/for-learners', '/for-schools'];
  const cipIcons = [Target, Sparkles, Zap];

  // FAQ schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: Array.from({ length: 7 }, (_, i) => ({
      '@type': 'Question',
      name: t(`faq.items.${i}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`faq.items.${i}.answer`),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="py-hero bg-gradient-to-b from-white via-blue-50/30 to-muted dark:from-background dark:via-[hsl(230,60%,8%)] dark:to-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(205,100%,60%,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,hsl(205,100%,60%,0.12),transparent_60%)]" />
        <div className="container-custom relative">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-balance">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-text mb-8 max-w-3xl mx-auto text-balance">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="accent" size="xl">
                  <Link href="https://thelivingtextbook.lokalingo.com">
                    {t('hero.primaryCta')}
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link href={`/${locale}/contact`}>{t('hero.secondaryCta')}</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-section bg-background">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h2 text-center mb-12">{t('problems.title')}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => (
              <FadeIn key={i} delay={i * 150}>
                <AnimatedCard className="p-8 h-full">
                  <h3 className="text-h4 mb-3">{t(`problems.cards.${i}.title`)}</h3>
                  <p className="text-text">{t(`problems.cards.${i}.description`)}</p>
                </AnimatedCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* The Loka Difference */}
      <section className="py-section bg-muted dark:bg-card">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h2 text-center mb-12">{t('difference.title')}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => {
              const Icon = differenceIcons[i];
              return (
                <FadeIn key={i} delay={i * 150}>
                  <AnimatedCard className="p-8 h-full">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-h4 mb-3">{t(`difference.cards.${i}.title`)}</h3>
                    <p className="text-text mb-4">{t(`difference.cards.${i}.description`)}</p>
                    <Link
                      href={`/${locale}${differenceLinks[i]}`}
                      className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
                    >
                      {t(`difference.cards.${i}.cta`)}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </AnimatedCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* How CIP Works */}
      <section className="py-section bg-background">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h2 text-center mb-4">{t('cip.title')}</h2>
            <p className="text-xl text-text text-center mb-12 max-w-2xl mx-auto">{t('cip.subtitle')}</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20" />
            {[0, 1, 2].map((i) => {
              const Icon = cipIcons[i];
              return (
                <FadeIn key={i} delay={i * 200}>
                  <div className="text-center relative">
                    <div className="w-14 h-14 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mx-auto mb-4 relative z-10 bg-background">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <div className="text-sm font-bold text-accent uppercase tracking-wider mb-2">
                      Step {i + 1}
                    </div>
                    <h3 className="text-h4 mb-2">{t(`cip.steps.${i}.title`)}</h3>
                    <p className="text-text">{t(`cip.steps.${i}.description`)}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Simple Pricing */}
      <section className="py-section bg-muted dark:bg-card">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-lg mx-auto">
              <AnimatedCard className="p-10 text-center">
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <DollarSign className="w-8 h-8 text-accent" />
                  <span className="text-6xl font-extrabold text-primary">6</span>
                </div>
                <p className="text-lg text-text mb-2">{t('pricing.period')}</p>
                <p className="text-text mb-6">{t('pricing.tagline')}</p>
                <p className="text-sm text-accent font-medium mb-6">{t('pricing.comparison')}</p>
                <Button asChild variant="accent" size="xl" className="w-full">
                  <Link href="https://thelivingtextbook.lokalingo.com/login">
                    {t('pricing.cta')}
                  </Link>
                </Button>
                <p className="text-small text-muted-foreground mt-3">{t('pricing.note')}</p>
              </AnimatedCard>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-section bg-background">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h2 text-center mb-12">{t('testimonials.title')}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[0, 1].map((i) => (
              <FadeIn key={i} delay={i * 150}>
                <AnimatedCard className="p-8 h-full">
                  <div className="text-4xl text-accent/30 mb-4">&ldquo;</div>
                  <p className="text-text text-lg italic mb-6">{t(`testimonials.items.${i}.quote`)}</p>
                  <div>
                    <p className="font-semibold text-primary">{t(`testimonials.items.${i}.name`)}</p>
                    <p className="text-small text-muted-foreground">{t(`testimonials.items.${i}.title`)}</p>
                  </div>
                </AnimatedCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-section bg-muted dark:bg-card">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h2 text-center mb-12">{t('faq.title')}</h2>
          </FadeIn>
          <FAQAccordion
            categories={[{
              title: '',
              items: Array.from({ length: 7 }, (_, i) => ({
                question: t(`faq.items.${i}.question`),
                answer: t(`faq.items.${i}.answer`),
              })),
            }]}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-section bg-gradient-to-b from-background to-muted dark:from-background dark:to-card">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h2 mb-4">{t('finalCta.title')}</h2>
              <p className="text-xl text-text mb-8">{t('finalCta.subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="accent" size="xl">
                  <Link href="https://thelivingtextbook.lokalingo.com">
                    {t('finalCta.primaryCta')}
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link href={`/${locale}/contact`}>{t('finalCta.secondaryCta')}</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
