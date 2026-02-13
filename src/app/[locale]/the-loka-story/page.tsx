import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import { FadeIn } from '@/components/ui/animated-card';
import { BlogContent } from '@/components/blog/BlogContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata('story', locale, '/the-loka-story');
}

export default async function StoryPage() {
  const t = await getTranslations('story');

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

      {/* Story Sections */}
      <section className="py-section bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-16">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <FadeIn key={i}>
                <div>
                  <h2 className="text-h2 mb-6">{t(`sections.${i}.title`)}</h2>
                  <div className="prose prose-lg prose-headings:text-primary prose-p:text-text prose-strong:text-primary prose-a:text-accent dark:prose-invert max-w-none">
                    <BlogContent content={t(`sections.${i}.content`)} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
