/**
 * Quote Component
 * Quote block with author attribution
 */

import { SlideQuoteProps } from '../types';

/**
 * Styled quote block with author and source attribution
 *
 * @example
 * ```tsx
 * <Quote
 *   author="Steve Jobs"
 *   source="Apple CEO"
 *   variant="large"
 * >
 *   Stay hungry, stay foolish.
 * </Quote>
 * ```
 */
export function Quote({
  children,
  author,
  source,
  variant = 'default',
  className = '',
}: SlideQuoteProps) {
  return (
    <blockquote className={`slide-quote slide-quote-${variant} ${className}`}>
      <div className="slide-quote-mark">"</div>
      <div className="slide-quote-content">
        {children}
      </div>
      {(author || source) && (
        <footer className="slide-quote-footer">
          {author && <cite className="slide-quote-author">{author}</cite>}
          {source && <span className="slide-quote-source">{source}</span>}
        </footer>
      )}
    </blockquote>
  );
}
