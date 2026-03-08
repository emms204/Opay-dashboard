import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Wraps content and adds scroll-reveal animation when the section enters the viewport.
 */
export function ScrollRevealSection({ children, className = '', as: Component = 'section', delay = 0, style }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  return (
    <Component
      ref={ref}
      className={`${className} ${isVisible ? 'reveal-in' : 'reveal-out'}`.trim()}
      style={{ ...(delay ? { animationDelay: `${delay}ms` } : {}), ...style }}
    >
      {children}
    </Component>
  );
}
