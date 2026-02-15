import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import PricingContent from '@/components/pricing/PricingContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata('pricing', locale, '/pricing');
}

export default function PricingPage() {
  return <PricingContent />;
}
