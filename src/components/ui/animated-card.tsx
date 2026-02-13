'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  borderTrace?: boolean;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, children, hoverEffect = true, borderTrace = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group relative rounded-xl bg-card text-card-foreground',
          hoverEffect && 'hover:-translate-y-1 hover:shadow-lg transition-all duration-300',
          className
        )}
        {...props}
      >
        {borderTrace && (
          <>
            <div className="absolute inset-0 rounded-xl border border-border transition-opacity duration-300 group-hover:opacity-0" />
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
              <div className="absolute inset-[-150%] animate-border-trace bg-[conic-gradient(from_0deg,transparent_0deg,hsl(var(--accent))_30deg,hsl(var(--accent))_90deg,transparent_120deg)]" />
              <div className="absolute inset-[1px] rounded-[11px] bg-card" />
            </div>
          </>
        )}
        <div className="relative z-10 h-full flex flex-col">
          {children}
        </div>
      </div>
    );
  }
);
AnimatedCard.displayName = 'AnimatedCard';

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const FadeIn = ({ className, children, delay = 0, direction = 'up', ...props }: FadeInProps) => {
  const [mounted, setMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => { setMounted(true); }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  const directionClasses = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all duration-700 ease-out',
        mounted && isVisible ? 'opacity-100 translate-x-0 translate-y-0' : mounted ? `opacity-0 ${directionClasses[direction]}` : 'opacity-100',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};
FadeIn.displayName = 'FadeIn';

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  speed?: number;
}

const Parallax = ({ className, children, speed = 0.5, ...props }: ParallaxProps) => {
  const [mounted, setMounted] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => { setMounted(true); }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const relativeScroll = scrolled - elementTop + window.innerHeight;
      if (relativeScroll > 0 && rect.bottom > 0) {
        setOffset(relativeScroll * speed * 0.1);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, mounted]);

  return (
    <div
      ref={elementRef}
      className={cn('will-change-transform', className)}
      style={{ transform: mounted ? `translateY(${offset}px)` : undefined }}
      {...props}
    >
      {children}
    </div>
  );
};
Parallax.displayName = 'Parallax';

export { AnimatedCard, FadeIn, Parallax };
