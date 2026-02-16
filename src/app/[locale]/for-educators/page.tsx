import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { ArrowRight, Palette, Brain, BarChart3, CalendarDays, Globe, Award } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo';
import { AnimatedCard, FadeIn } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata('educators', locale, '/for-educators');
}

export default async function EducatorsPage() {
  const t = await getTranslations('educators');
  const locale = await getLocale();

  const featureIcons = [Palette, Brain, BarChart3, CalendarDays, Award, Globe];

  return (
    <>
      {/* Hero */}
      <section className="py-hero bg-gradient-to-b from-white via-blue-50/30 to-muted dark:from-background dark:via-[hsl(230,60%,8%)] dark:to-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(338,86%,53%,0.06),transparent_60%)]" />
        <div className="container-custom relative">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">{t('hero.title')}</h1>
              <p className="text-2xl text-accent font-semibold mb-4">{t('hero.subtitle')}</p>
              <p className="text-xl text-text max-w-3xl mx-auto">{t('hero.description')}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pain → Solution */}
      <section className="py-section bg-background">
        <div className="container-custom">
          <FadeIn><h2 className="text-h2 text-center mb-12">{t('painSolution.title')}</h2></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => (
              <FadeIn key={i} delay={i * 150}>
                <AnimatedCard className="p-8 h-full">
                  <p className="text-accent font-medium mb-2 line-through opacity-70">{t(`painSolution.cards.${i}.pain`)}</p>
                  <p className="text-primary font-semibold text-lg">{t(`painSolution.cards.${i}.solution`)}</p>
                </AnimatedCard>
              </FadeIn>
            ))}
          </div>
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

      {/* Earnings Comparison */}
      <section className="py-section bg-background">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h2 text-center mb-4">{t('earnings.title')}</h2>
            <p className="text-xl text-text text-center mb-12">{t('earnings.subtitle')}</p>
          </FadeIn>
          <FadeIn>
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <th key={i} className={`py-3 px-4 text-sm font-semibold ${i >= 4 ? 'text-muted-foreground' : 'text-primary'}`}>
                        {t(`earnings.headers.${i}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2, 3].map((row) => (
                    <tr key={row} className="border-b border-border">
                      {[0, 1, 2, 3, 4, 5].map((col) => (
                        <td key={col} className={`py-3 px-4 text-sm ${col === 3 ? 'text-accent font-semibold' : col >= 4 ? 'text-muted-foreground' : 'text-text'}`}>
                          {t(`earnings.rows.${row}.${col}`)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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
                <Link href="https://thelivingtextbook.lokalingo.com/start-free">
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
