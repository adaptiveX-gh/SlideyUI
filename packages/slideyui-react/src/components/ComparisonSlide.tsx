/**
 * ComparisonSlide Component
 * Two-column comparison slide for contrasting concepts
 *
 * @deprecated Use SplitCard component instead for modern card-based presentations
 * @see {@link SplitCard}
 */

import { ComparisonSlideProps } from '../types';
import { SplitCard } from './cards/SplitCard';
import clsx from 'clsx';

/**
 * Comparison slide with two-column layout for contrasting content
 *
 * @deprecated Use SplitCard component instead. This component is maintained for backwards compatibility.
 *
 * Migration:
 * ```tsx
 * // Old (deprecated):
 * <ComparisonSlide
 *   title="Before vs After"
 *   leftLabel="Before"
 *   rightLabel="After"
 *   variant="vs"
 *   leftContent={<div>Old approach...</div>}
 *   rightContent={<div>New approach...</div>}
 * />
 *
 * // New (recommended):
 * <SplitCard
 *   divider
 *   left={
 *     <div className="p-6">
 *       <h3 className="text-xl font-bold mb-4">Before</h3>
 *       <div>Old approach...</div>
 *     </div>
 *   }
 *   right={
 *     <div className="p-6">
 *       <h3 className="text-xl font-bold mb-4">After</h3>
 *       <div>New approach...</div>
 *     </div>
 *   }
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ComparisonSlide
 *   title="Before vs After"
 *   leftLabel="Before"
 *   rightLabel="After"
 *   variant="vs"
 *   leftContent={<div>Old approach...</div>}
 *   rightContent={<div>New approach...</div>}
 * />
 * ```
 */
export function ComparisonSlide({
  title: _title, // Ignored for backwards compatibility
  leftLabel,
  rightLabel,
  leftContent,
  rightContent,
  variant = 'default',
  className = '',
  children: _children, // Ignored for backwards compatibility
  backgroundImage,
  backgroundColor,
}: ComparisonSlideProps) {
  // Wrap content with labels
  const leftSide = (
    <div className="h-full flex flex-col p-6">
      {leftLabel && <h3 className="text-xl font-bold mb-4">{leftLabel}</h3>}
      <div className="flex-1">{leftContent}</div>
    </div>
  );

  const rightSide = (
    <div className="h-full flex flex-col p-6">
      {rightLabel && <h3 className="text-xl font-bold mb-4">{rightLabel}</h3>}
      <div className="flex-1">{rightContent}</div>
    </div>
  );

  // Use SplitCard with divider based on variant
  return (
    <SplitCard
      left={leftSide}
      right={rightSide}
      divider={variant === 'default'}
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      className={clsx('grid grid-cols-[1fr_auto_1fr] gap-6 items-center', className)}
      // Force slide-like appearance
      mode="full"
      aspectRatio="16/9"
    >
      {/* Note: SplitCard doesn't directly support title and children as separate props,
          but we maintain the API for backwards compatibility by ignoring these for now.
          Users should migrate to SplitCard directly for full control. */}
    </SplitCard>
  );
}
