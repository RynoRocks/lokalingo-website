// Blog post metadata - managed by n8n workflow
// New posts are prepended to the array (newest first)

export interface BlogPostMeta {
  id: string;
  slug: string;
  slugs?: { ja?: string; ko?: string };
  date: string;
  category: string;
  readTime: string;
  author: string;
  heroImage?: string;
}

export interface BlogPost extends BlogPostMeta {
  title: string;
  excerpt: string;
  content: string;
}

export interface BlogMessages {
  blog: {
    pageTitle: string;
    pageSubtitle: string;
    backToBlog: string;
    readMore: string;
    noPosts?: string;
    posts: {
      [id: string]: {
        title: string;
        excerpt: string;
        content: string;
      };
    };
  };
}

// Blog posts array - n8n workflow prepends new posts here
// Start empty — posts added via n8n automation
export const blogPosts: BlogPostMeta[] = [
  {
    id: 'loka-1771294459023',
    slug: 'ai-language-teaching-assistant-2026-20260217',
    date: '2026-02-17',
    category: 'AI in Education',
    readTime: '8 min read',
    author: 'LokaLingo',
  },
];

export function getLocalizedSlug(post: BlogPostMeta, locale: string): string {
  if (locale === 'ja' && post.slugs?.ja) return post.slugs.ja;
  if (locale === 'ko' && post.slugs?.ko) return post.slugs.ko;
  return post.slug;
}

export function findSlugLocale(slug: string): { post: BlogPostMeta; locale: string } | undefined {
  const decodedSlug = decodeURIComponent(slug);
  for (const post of blogPosts) {
    if (post.slug === decodedSlug) return { post, locale: 'en' };
    if (post.slugs?.ja === decodedSlug) return { post, locale: 'ja' };
    if (post.slugs?.ko === decodedSlug) return { post, locale: 'ko' };
  }
  return undefined;
}

export function getBlogPost(slug: string, messages: BlogMessages, locale?: string): BlogPost | undefined {
  const decodedSlug = decodeURIComponent(slug);

  const meta = blogPosts.find(post => {
    if (locale === 'ja' && post.slugs?.ja === decodedSlug) return true;
    if (locale === 'ko' && post.slugs?.ko === decodedSlug) return true;
    return post.slug === decodedSlug;
  });
  if (!meta) return undefined;

  const postContent = messages.blog?.posts?.[meta.id];
  if (!postContent) return undefined;

  return { ...meta, ...postContent };
}

export function getAllBlogPosts(messages: BlogMessages): BlogPost[] {
  return blogPosts
    .map(meta => {
      const postContent = messages.blog?.posts?.[meta.id];
      if (!postContent) return null;
      return { ...meta, ...postContent };
    })
    .filter((post): post is BlogPost => post !== null);
}

export function getBlogPostsByCategory(category: string, messages: BlogMessages): BlogPost[] {
  return getAllBlogPosts(messages).filter(post => post.category === category);
}

// Loka blog categories — education-focused
export const blogCategories = ['Language Learning', 'EdTech', 'Teaching Methods', 'AI in Education'] as const;
export type BlogCategory = typeof blogCategories[number];
