import type { Metadata } from 'next';

export const locales = ['en', 'ja', 'ko'] as const;
export type Locale = typeof locales[number];

export const siteConfig = {
  name: 'LokaLingo',
  url: 'https://lokalingo.com',
  description: 'LokaLingo empowers language educators with AI-powered tools and gives learners a curriculum built from their real conversations.',
};

export function generateAlternates(path: string, locale: string) {
  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = `${siteConfig.url}/${loc}${path}`;
  });
  languages['x-default'] = `${siteConfig.url}/en${path}`;

  return {
    canonical: `${siteConfig.url}/${locale}${path}`,
    languages,
  };
}

export function generateOgImageUrl(title: string, subtitle?: string) {
  const params = new URLSearchParams({
    title,
    ...(subtitle && { subtitle }),
  });
  return `${siteConfig.url}/api/og?${params.toString()}`;
}

export function generateOpenGraph(
  title: string,
  description: string,
  locale: string,
  path: string,
  subtitle?: string,
  heroImage?: string
) {
  const ogImageUrl = heroImage || generateOgImageUrl(title, subtitle);
  return {
    title,
    description,
    url: `${siteConfig.url}/${locale}${path}`,
    siteName: siteConfig.name,
    locale: locale === 'en' ? 'en_US' : locale,
    type: 'website' as const,
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
  };
}

export function generateTwitterCard(title: string, description: string, subtitle?: string) {
  return {
    card: 'summary_large_image' as const,
    title,
    description,
    images: [generateOgImageUrl(title, subtitle)],
  };
}

export const pageSeo: Record<string, Record<Locale, { title: string; description: string; keywords: string[] }>> = {
  home: {
    en: {
      title: 'Where Corrections Inspire Progress',
      description: 'LokaLingo empowers language educators with AI-powered tools and gives learners a curriculum built from their real conversations. $6/seat, no commissions.',
      keywords: ['language learning', 'EdTech', 'AI curriculum', 'language teaching', 'CIP', 'LokaLingo', 'The Living Textbook'],
    },
    ja: {
      title: '修正が進歩を生む場所',
      description: 'LokaLingoはAIツールで語学教育者を支援し、実際の会話から学習者のカリキュラムを構築します。月額$6/席、手数料なし。',
      keywords: ['語学学習', 'EdTech', 'AIカリキュラム', '語学教育', 'CIP', 'LokaLingo'],
    },
    ko: {
      title: '수정이 진보를 만드는 곳',
      description: 'LokaLingo는 AI 도구로 어학 교육자를 지원하고 실제 대화에서 학습자 맞춤형 커리큘럼을 구축합니다. 좌석당 월 $6, 수수료 없음.',
      keywords: ['어학 학습', 'EdTech', 'AI 커리큘럼', '어학 교육', 'CIP', 'LokaLingo'],
    },
  },
  educators: {
    en: {
      title: 'For Educators - Teach Your Way, Keep Your Earnings',
      description: 'Flat $6/seat. No commissions. AI-powered assessments, automated curriculum, and tools to run your teaching business independently.',
      keywords: ['language teacher tools', 'teaching platform', 'educator earnings', 'AI assessment', 'no commission teaching'],
    },
    ja: {
      title: '教育者向け - あなたらしく教え、収益を守る',
      description: '月額$6/席の定額制。手数料なし。AI評価、自動カリキュラム、独立した教育ビジネスのためのツール。',
      keywords: ['語学教師ツール', '教育プラットフォーム', '教育者収益', 'AI評価'],
    },
    ko: {
      title: '교육자용 - 당신만의 방식으로 가르치고 수익을 지키세요',
      description: '좌석당 월 $6 정액제. 수수료 없음. AI 평가, 자동 커리큘럼, 독립적인 교육 비즈니스를 위한 도구.',
      keywords: ['어학 교사 도구', '교육 플랫폼', '교육자 수익', 'AI 평가'],
    },
  },
  learners: {
    en: {
      title: 'For Learners - Your Mistakes Are Your Best Teacher',
      description: 'Loka builds a curriculum unique to you from your real conversations. Every correction inspires your next step forward.',
      keywords: ['personalized learning', 'language learner', 'AI tutor', 'CIP learning', 'adaptive curriculum'],
    },
    ja: {
      title: '学習者向け - あなたの間違いが最高の先生',
      description: '実際の会話からあなただけのカリキュラムを構築。すべての修正が次のステップへの原動力に。',
      keywords: ['パーソナライズド学習', '語学学習者', 'AIチューター', 'CIP学習'],
    },
    ko: {
      title: '학습자용 - 당신의 실수가 최고의 스승',
      description: '실제 대화에서 당신만의 커리큘럼을 구축합니다. 모든 수정이 다음 단계로의 원동력이 됩니다.',
      keywords: ['맞춤형 학습', '어학 학습자', 'AI 튜터', 'CIP 학습'],
    },
  },
  schools: {
    en: {
      title: 'For Schools - Scale Your Language School with AI',
      description: 'Predictable costs, automated assessments, and a platform built by someone who\'s run a school for 23 years. $6/seat.',
      keywords: ['language school software', 'school management', 'AI school platform', 'education business'],
    },
    ja: {
      title: '学校向け - AIで語学スクールを拡大',
      description: '予測可能なコスト、自動評価、23年の学校運営経験から生まれたプラットフォーム。月額$6/席。',
      keywords: ['語学学校ソフトウェア', '学校管理', 'AI学校プラットフォーム', '教育ビジネス'],
    },
    ko: {
      title: '학교용 - AI로 어학원을 확장하세요',
      description: '예측 가능한 비용, 자동 평가, 23년 학교 운영 경험에서 탄생한 플랫폼. 좌석당 월 $6.',
      keywords: ['어학원 소프트웨어', '학교 관리', 'AI 학교 플랫폼', '교육 비즈니스'],
    },
  },
  pricing: {
    en: {
      title: 'Pricing - $6 Per Seat, No Commissions',
      description: 'Simple, transparent pricing. $6 per active seat per month. No commissions, no hidden fees, no lock-in. Add seats as you grow.',
      keywords: ['LokaLingo pricing', 'teaching platform cost', '$6 per seat', 'no commission'],
    },
    ja: {
      title: '料金 - 月額$6/席、手数料なし',
      description: 'シンプルで透明な料金体系。月額$6/アクティブ席。手数料なし、隠れた費用なし、契約縛りなし。',
      keywords: ['LokaLingo料金', '教育プラットフォームコスト', '月額$6'],
    },
    ko: {
      title: '가격 - 좌석당 월 $6, 수수료 없음',
      description: '간단하고 투명한 가격. 활성 좌석당 월 $6. 수수료 없음, 숨겨진 비용 없음, 잠금 없음.',
      keywords: ['LokaLingo 가격', '교육 플랫폼 비용', '좌석당 월 $6'],
    },
  },
  story: {
    en: {
      title: 'The Loka Story - Where Corrections Inspire Progress',
      description: 'From Sanskrit to software: how 23 years of language teaching inspired a platform that turns every correction into a learning opportunity.',
      keywords: ['LokaLingo story', 'CIP philosophy', 'language teaching history', 'Loka etymology'],
    },
    ja: {
      title: 'Lokaストーリー - 修正が進歩を生む場所',
      description: 'サンスクリット語からソフトウェアへ：23年の語学教育がすべての修正を学びの機会に変えるプラットフォームを生んだ物語。',
      keywords: ['LokaLingoの物語', 'CIP哲学', '語学教育の歴史'],
    },
    ko: {
      title: 'Loka 이야기 - 수정이 진보를 만드는 곳',
      description: '산스크리트어에서 소프트웨어로: 23년의 어학 교육이 모든 수정을 학습 기회로 바꾸는 플랫폼을 탄생시킨 이야기.',
      keywords: ['LokaLingo 이야기', 'CIP 철학', '어학 교육 역사'],
    },
  },
  blog: {
    en: {
      title: 'Blog - Language Education Insights',
      description: 'Insights on language learning, EdTech, teaching methods, and AI in education from the LokaLingo team.',
      keywords: ['language learning blog', 'EdTech insights', 'teaching methods', 'AI education'],
    },
    ja: {
      title: 'ブログ - 語学教育インサイト',
      description: 'LokaLingoチームによる語学学習、EdTech、教育方法、AI教育に関するインサイト。',
      keywords: ['語学学習ブログ', 'EdTechインサイト', '教育方法', 'AI教育'],
    },
    ko: {
      title: '블로그 - 어학 교육 인사이트',
      description: 'LokaLingo 팀의 어학 학습, EdTech, 교수법, AI 교육에 관한 인사이트.',
      keywords: ['어학 학습 블로그', 'EdTech 인사이트', '교수법', 'AI 교육'],
    },
  },
  contact: {
    en: {
      title: 'Contact - Book a Free Demo',
      description: 'Book a free demo to see how LokaLingo can empower your teaching. Contact us at ryan@lokalingo.com.',
      keywords: ['contact LokaLingo', 'book demo', 'language teaching demo'],
    },
    ja: {
      title: 'お問い合わせ - 無料デモを予約',
      description: 'LokaLingoがあなたの教育をどう変えるか、無料デモでご確認ください。ryan@lokalingo.comまで。',
      keywords: ['LokaLingoに連絡', 'デモ予約', '語学教育デモ'],
    },
    ko: {
      title: '문의 - 무료 데모 예약',
      description: 'LokaLingo가 당신의 교육을 어떻게 변화시킬 수 있는지 무료 데모로 확인하세요.',
      keywords: ['LokaLingo 문의', '데모 예약', '어학 교육 데모'],
    },
  },
  privacy: {
    en: { title: 'Privacy Policy', description: 'LokaLingo Privacy Policy.', keywords: ['privacy policy'] },
    ja: { title: 'プライバシーポリシー', description: 'LokaLingoプライバシーポリシー。', keywords: ['プライバシーポリシー'] },
    ko: { title: '개인정보 처리방침', description: 'LokaLingo 개인정보 처리방침.', keywords: ['개인정보 처리방침'] },
  },
  terms: {
    en: { title: 'Terms of Service', description: 'LokaLingo Terms of Service.', keywords: ['terms of service'] },
    ja: { title: '利用規約', description: 'LokaLingo利用規約。', keywords: ['利用規約'] },
    ko: { title: '이용약관', description: 'LokaLingo 이용약관.', keywords: ['이용약관'] },
  },
  cookies: {
    en: { title: 'Cookie Policy', description: 'LokaLingo Cookie Policy.', keywords: ['cookie policy'] },
    ja: { title: 'Cookieポリシー', description: 'LokaLingo Cookieポリシー。', keywords: ['Cookieポリシー'] },
    ko: { title: '쿠키 정책', description: 'LokaLingo 쿠키 정책.', keywords: ['쿠키 정책'] },
  },
};

export function generatePageMetadata(
  pageKey: keyof typeof pageSeo,
  locale: string,
  path: string
): Metadata {
  const seo = pageSeo[pageKey]?.[locale as Locale] || pageSeo[pageKey]?.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: generateAlternates(path, locale),
    openGraph: generateOpenGraph(seo.title, seo.description, locale, path),
    twitter: generateTwitterCard(seo.title, seo.description),
  };
}
