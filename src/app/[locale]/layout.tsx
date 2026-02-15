import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Exo_2, Noto_Sans_JP, JetBrains_Mono } from 'next/font/google';
import { Header, Footer } from "@/components/layout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { locales, type Locale } from '@/i18n';

const exo2 = Exo_2({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-exo2',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LokaLingo",
    alternateName: "Accent Language 株式会社",
    url: "https://lokalingo.com",
    logo: "https://lokalingo.com/logo.png",
    description: "LokaLingo empowers language educators with AI-powered tools and gives learners a curriculum built from their real conversations.",
    inLanguage: locale,
    contactPoint: {
      "@type": "ContactPoint",
      email: "ryan@lokalingo.com",
    },
  };

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${exo2.variable} ${notoSansJP.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className="flex-1 overflow-visible">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
