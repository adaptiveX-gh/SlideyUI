/**
 * SlideNumber Component
 * Slide number display indicator
 */

import { SlideNumberProps } from '../types';
import { useSlideContext } from '../hooks/useSlideContext';

/**
 * Slide number indicator showing current slide position
 *
 * @example
 * ```tsx
 * <SlideNumber position="bottom-right" format="fraction" />
 * ```
 */
export function SlideNumber({
  position = 'bottom-right',
  format = 'fraction',
  className = '',
}: SlideNumberProps) {
  const { currentSlide, totalSlides } = useSlideContext();

  const displayNumber = format === 'fraction'
    ? `${currentSlide + 1} / ${totalSlides}`
    : `${currentSlide + 1}`;

  return (
    <div
      className={`slide-number slide-number-${position} ${className}`}
      aria-label={`Slide ${currentSlide + 1} of ${totalSlides}`}
    >
      {displayNumber}
    </div>
  );
}
