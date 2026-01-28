import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

const ScrollReveal = ({ children, className }: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal({
    threshold: 0.05,
    rootMargin: '0px 0px -10px 0px',
  });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-opacity duration-1800 ease-out',
        isVisible 
          ? 'opacity-100' 
          : 'opacity-[0.65]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
