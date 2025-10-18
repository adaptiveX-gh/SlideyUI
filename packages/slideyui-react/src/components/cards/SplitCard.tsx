/**
 * SplitCard Component
 * Two-column presentation card with flexible split ratios
 * Perfect for before/after, comparison, or image+text layouts
 */

import { SplitCardProps } from '../../types';
import { CardContainer } from './CardContainer';
import clsx from 'clsx';

const splitRatioStyles: Record<number, string> = {
  30: 'grid-cols-[30%_70%]',
  40: 'grid-cols-[40%_60%]',
  50: 'grid-cols-2',
  60: 'grid-cols-[60%_40%]',
  70: 'grid-cols-[70%_30%]',
};

/**
 * Split-layout card for two-column presentations
 *
 * @example
 * ```tsx
 * // Image + Text layout
 * <SplitCard
 *   split={40}
 *   left={<img src="/image.jpg" alt="Product" className="w-full h-full object-cover" />}
 *   right={
 *     <div className="p-6">
 *       <h3 className="text-2xl">Product Name</h3>
 *       <p>Description...</p>
 *     </div>
 *   }
 * />
 *
 * // Comparison with divider
 * <SplitCard
 *   divider
 *   left={<div className="p-6">Before</div>}
 *   right={<div className="p-6">After</div>}
 * />
 * ```
 */
export function SplitCard({
  left,
  right,
  split = 50,
  direction = 'horizontal',
  divider = false,
  reverse = false,
  padding = 'none',
  className = '',
  ...containerProps
}: SplitCardProps) {
  const content = reverse ? [right, left] : [left, right];

  const paddingClass = {
    compact: 'slide-card-compact',
    default: '',
    spacious: 'slide-card-spacious',
    none: 'slide-card-flush',
  }[padding];

  return (
    <CardContainer {...containerProps} className={clsx('overflow-hidden', paddingClass, className)}>
      <div
        className={clsx(
          'grid h-full',
          direction === 'horizontal'
            ? splitRatioStyles[split]
            : direction === 'vertical' && split === 50
              ? 'grid-rows-2'
              : 'grid-rows-1'
        )}
      >
        {/* Left/Top Section */}
        <div
          className={clsx(
            'relative',
            divider && direction === 'horizontal' && 'border-r border-slidey-border',
            divider && direction === 'vertical' && 'border-b border-slidey-border'
          )}
        >
          {content[0]}
        </div>

        {/* Right/Bottom Section */}
        <div className="relative">{content[1]}</div>
      </div>
    </CardContainer>
  );
}
