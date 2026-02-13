import type { Metadata } from 'next';
import { getTranslations, getLocale, getMessages } from 'next-intl/server';
import { getAllBlogPosts, type BlogMessages } from '@/lib/blog';
import { FadeIn } from '@/components/ui/animated-card';
import { generatePageMetadata, siteConfig } from '@/lib/seo';
import { BlogPostList } from '@/components/blog/BlogPostList';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata('blog', locale, '/blog');
}

export default async function BlogPage() {
  const t = await getTranslations('blog');
  const messages = await getMessages() as unknown as BlogMessages;
  const locale = await getLocale();
  const posts = getAllBlogPosts(messages);

  const translations = {
    allCategories: t('allCategories'),
    categories: {
      'Language Learning': t('categories.Language Learning'),
      'EdTech': t('categories.EdTech'),
      'Teaching Methods': t('categories.Teaching Methods'),
      'AI in Education': t('categories.AI in Education'),
    },
    readMore: t('readMore'),
    noPostsInCategory: t('noPostsInCategory'),
    pagination: {
      previous: t('pagination.previous'),
      next: t('pagination.next'),
      page: t('pagination.page'),
    },
  };

  return (
    <>
      {/* Hero */}
      <section className="py-hero bg-gradient-to-b from-white to-muted dark:from-background dark:to-muted">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-h1 mb-6">{t('pageTitle')}</h1>
              <p className="text-xl text-text">{t('pageSubtitle')}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-section bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {posts.length > 0 ? (
              <BlogPostList posts={posts} locale={locale} translations={translations} />
            ) : (
              <FadeIn>
                <div className="text-center py-12">
                  <p className="text-text text-lg">{t('noPostsInCategory')}</p>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
