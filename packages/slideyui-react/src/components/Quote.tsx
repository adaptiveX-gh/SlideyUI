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
    <blockquote className={`card-quote card-quote-${variant} ${className}`}>
      <div className="card-quote-text">
        {children}
      </div>
      {(author || source) && (
        <footer className="card-quote-author">
          {author}
          {source && <span> — {source}</span>}
        </footer>
      )}
    </blockquote>
  );
}
