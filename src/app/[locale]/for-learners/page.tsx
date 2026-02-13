import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { ArrowRight, Heart, Compass, Zap, BookOpen, BarChart3, Brain } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo';
import { AnimatedCard, FadeIn } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata('learners', locale, '/for-learners');
}

export default async function LearnersPage() {
  const t = await getTranslations('learners');
  const locale = await getLocale();

  const pillarIcons = [Heart, Compass, Zap];
  const differenceIcons = [BookOpen, BarChart3, Brain];

  return (
    <>
      {/* Hero */}
      <section className="py-hero bg-gradient-to-b from-white via-blue-50/30 to-muted dark:from-background dark:via-[hsl(230,60%,8%)] dark:to-muted relative overflow-hidden">
        <div className="container-custom relative">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">{t('hero.title')}</h1>
              <p className="text-xl text-text max-w-3xl mx-auto">{t('hero.subtitle')}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CIP Visual */}
      <section className="py-section bg-background">
        <div className="container-custom">
          <FadeIn><h2 className="text-h2 text-center mb-12">{t('cip.title')}</h2></FadeIn>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 max-w-4xl mx-auto">
            {[0, 1, 2, 3].map((i) => (
              <FadeIn key={i} delay={i * 150} className="flex items-center gap-2">
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 text-center min-w-[160px]">
                  <div className="text-sm font-bold text-accent uppercase tracking-wider mb-1">{t(`cip.steps.${i}.label`)}</div>
                  <p className="text-text text-sm">{t(`cip.steps.${i}.description`)}</p>
                </div>
                {i < 3 && <ArrowRight className="w-5 h-5 text-accent hidden md:block flex-shrink-0" />}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Loka Different */}
      <section className="py-section bg-muted dark:bg-card">
        <div className="container-custom">
          <FadeIn><h2 className="text-h2 text-center mb-12">{t('difference.title')}</h2></FadeIn>
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
                    <p className="text-text">{t(`difference.cards.${i}.description`)}</p>
                  </AnimatedCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-section bg-background">
        <div className="container-custom">
          <FadeIn><h2 className="text-h2 text-center mb-12">{t('pillars.title')}</h2></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => {
              const Icon = pillarIcons[i];
              return (
                <FadeIn key={i} delay={i * 150}>
                  <AnimatedCard className="p-8 h-full text-center">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-h4 mb-3">{t(`pillars.items.${i}.title`)}</h3>
                    <p className="text-text">{t(`pillars.items.${i}.description`)}</p>
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
