import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import ContactContent from '@/components/contact/ContactContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata('contact', locale, '/contact');
}

export default function ContactPage() {
  return <ContactContent />;
}
