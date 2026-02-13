'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const categoryGradients: Record<string, string> = {
  'Language Learning': 'from-blue-600 via-cyan-500 to-teal-400',
  'EdTech': 'from-purple-600 via-violet-500 to-indigo-400',
  'Teaching Methods': 'from-amber-500 via-orange-500 to-red-400',
  'AI in Education': 'from-emerald-500 via-green-500 to-lime-400',
};

interface BlogHeroImageProps {
  src?: string;
  alt: string;
  category: string;
  priority?: boolean;
  className?: string;
}

export function BlogHeroImage({ src, alt, category, priority = false, className }: BlogHeroImageProps) {
  const [hasError, setHasError] = useState(false);
  const gradient = categoryGradients[category] || categoryGradients['EdTech'];

  if (!src || hasError) {
    return (
      <div className={cn('relative w-full aspect-video rounded-xl overflow-hidden', className)}>
        <div className={cn('absolute inset-0 bg-gradient-to-br', gradient, 'opacity-80')} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/30 text-6xl font-bold tracking-widest">{category.charAt(0)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full aspect-video rounded-xl overflow-hidden', className)}>
      <Image src={src} alt={alt} fill priority={priority} className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px" onError={() => setHasError(true)} />
    </div>
  );
}
