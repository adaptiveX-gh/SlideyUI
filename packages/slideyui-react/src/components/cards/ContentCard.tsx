/**
 * ContentCard Component
 * Text-heavy presentation card with header, body, and footer sections
 * Optimized for readability at presentation scale
 */

import { ContentCardProps } from '../../types';
import { CardContainer } from './CardContainer';
import clsx from 'clsx';

/**
 * Content-focused card for text-heavy slides
 *
 * @example
 * ```tsx
 * <ContentCard
 *   title="Key Features"
 *   subtitle="What makes us different"
 *   badge={<span className="card-badge">New</span>}
 *   footer={<p className="text-sm">Learn more →</p>}
 *   density="concise"
 *   padding="default"
 * >
 *   <ul className="card-list">
 *     <li>Feature 1</li>
 *     <li>Feature 2</li>
 *   </ul>
 * </ContentCard>
 * ```
 */
export function ContentCard({
  title,
  subtitle,
  children,
  badge,
  header,
  footer,
  icon,
  variant = 'default',
  density = 'detailed',
  padding = 'default',
  className = '',
  ...containerProps
}: ContentCardProps) {
  const paddingClass = {
    compact: 'slide-card-compact',
    default: '',
    spacious: 'slide-card-spacious',
    none: 'slide-card-flush',
  }[padding];

  return (
    <CardContainer {...containerProps} className={clsx('flex flex-col', paddingClass, className)}>
      {/* Header */}
      {header ? (
        header
      ) : (
        (title || subtitle || badge || icon) && (
          <div className={clsx('slide-card-header', variant === 'featured' && 'bg-slidey-accent/10')}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                {icon && <div className="flex-shrink-0 mt-1">{icon}</div>}
                <div className="flex-1">
                  {title && (
                    <h3
                      className={clsx(
                        'slide-card-title',
                        variant === 'minimal' && 'text-2xl font-normal'
                      )}
                    >
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className="slide-card-description mt-1">{subtitle}</p>
                  )}
                </div>
              </div>
              {badge && <div className="flex-shrink-0">{badge}</div>}
            </div>
          </div>
        )
      )}

      {/* Body */}
      {children && (
        <div className={clsx('slide-card-body flex-1 overflow-auto', `slide-card-density-${density}`)}>
          {children}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className="slide-card-footer">
          {footer}
        </div>
      )}
    </CardContainer>
  );
}
