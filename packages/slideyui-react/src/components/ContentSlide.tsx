/**
 * ContentSlide Component
 * Standard content slide with title and flexible layout options
 *
 * @deprecated Use ContentCard component instead for modern card-based presentations
 * @see {@link ContentCard}
 */

import { ContentSlideProps } from '../types';
import { ContentCard } from './cards/ContentCard';
import clsx from 'clsx';

/**
 * Standard content slide with title and customizable layouts
 *
 * @deprecated Use ContentCard component instead. This component is maintained for backwards compatibility.
 *
 * Migration:
 * ```tsx
 * // Old (deprecated):
 * <ContentSlide title="Key Features" subtitle="What we offer" layout="centered">
 *   <ul className="slide-list">
 *     <li>Feature 1</li>
 *     <li>Feature 2</li>
 *   </ul>
 * </ContentSlide>
 *
 * // New (recommended):
 * <ContentCard title="Key Features" subtitle="What we offer">
 *   <ul className="slide-list">
 *     <li>Feature 1</li>
 *     <li>Feature 2</li>
 *   </ul>
 * </ContentCard>
 * ```
 *
 * @example
 * ```tsx
 * <ContentSlide title="Key Features" layout="centered">
 *   <ul className="slide-list">
 *     <li>Feature 1</li>
 *     <li>Feature 2</li>
 *   </ul>
 * </ContentSlide>
 * ```
 */
export function ContentSlide({
  title,
  subtitle,
  layout = 'default',
  divider: _divider = false, // Ignored in card-based implementation
  className = '',
  children,
  backgroundImage,
  backgroundColor,
}: ContentSlideProps) {
  // Map layout prop to className for backward compatibility
  const layoutClass = layout !== 'default' ? `slide-layout-${layout}` : '';

  return (
    <ContentCard
      title={title}
      subtitle={subtitle}
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      className={clsx(layoutClass, className)}
      // Force slide-like appearance
      mode="full"
      aspectRatio="16/9"
    >
      {children}
    </ContentCard>
  );
}
