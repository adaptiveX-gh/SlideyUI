/**
 * QuoteCard Component
 * Pull quotes and testimonials card
 * Presentation-optimized for impactful quotes
 */

import { QuoteCardProps } from '../../types';
import { CardContainer } from './CardContainer';
import clsx from 'clsx';

/**
 * Quote-focused card for testimonials and pull quotes
 *
 * @example
 * ```tsx
 * // Simple quote
 * <QuoteCard
 *   quote="This changed everything for our team."
 *   author="Jane Doe"
 *   source="CEO, Acme Corp"
 * />
 *
 * // Testimonial with avatar
 * <QuoteCard
 *   variant="testimonial"
 *   quote="The best presentation tool we've ever used."
 *   author="John Smith"
 *   source="Product Manager"
 *   avatar="/avatars/john.jpg"
 * />
 * ```
 */
export function QuoteCard({
  quote,
  author,
  source,
  avatar,
  variant = 'default',
  className = '',
  ...containerProps
}: QuoteCardProps) {
  return (
    <CardContainer
      {...containerProps}
      className={clsx(
        'flex flex-col justify-between p-8',
        variant === 'large' && 'p-12',
        variant === 'minimal' && 'p-6 border-none shadow-none',
        className
      )}
    >
      {/* Quote Mark (for non-minimal variants) */}
      {variant !== 'minimal' && (
        <div className="text-6xl text-slidey-accent/20 leading-none mb-4">
          &ldquo;
        </div>
      )}

      {/* Quote Text */}
      <div className="flex-1 mb-6">
        <blockquote
          className={clsx(
            'text-slidey-foreground',
            variant === 'large' ? 'text-3xl' : 'text-2xl',
            variant === 'minimal' && 'italic border-l-4 border-slidey-accent pl-4'
          )}
        >
          {quote}
        </blockquote>
      </div>

      {/* Author Attribution */}
      {(author || source || avatar) && (
        <div className="flex items-center gap-4 mt-auto">
          {avatar && (
            <img
              src={avatar}
              alt={author || 'Author'}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            {author && (
              <div
                className={clsx(
                  'font-semibold text-slidey-foreground',
                  variant === 'large' ? 'text-xl' : 'text-lg'
                )}
              >
                {author}
              </div>
            )}
            {source && (
              <div className="text-sm text-slidey-muted-foreground">
                {source}
              </div>
            )}
          </div>
        </div>
      )}
    </CardContainer>
  );
}
