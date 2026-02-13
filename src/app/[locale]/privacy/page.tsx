import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import { FadeIn } from '@/components/ui/animated-card';
import { BlogContent } from '@/components/blog/BlogContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata('privacy', locale, '/privacy');
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy');

  return (
    <section className="py-section bg-background">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h1 className="text-h1 mb-8">{t('title')}</h1>
            <div className="prose prose-lg prose-headings:text-primary prose-p:text-text prose-strong:text-primary prose-a:text-accent dark:prose-invert max-w-none">
              <BlogContent content={t('content')} />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
