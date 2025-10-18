/**
 * SlideNumber Component
 * Slide number display indicator
 */

import { SlideNumberProps } from '../types';
import { usePresentationContext } from './Presentation';

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
  const { currentCard, totalCards } = usePresentationContext();
  const currentSlide = currentCard;
  const totalSlides = totalCards;

  const displayNumber = format === 'fraction'
    ? `${currentSlide + 1} / ${totalSlides}`
    : `${currentSlide + 1}`;

  return (
    <div
      className={`presentation-number presentation-number-${position} ${className}`}
      aria-label={`Slide ${currentSlide + 1} of ${totalSlides}`}
    >
      {displayNumber}
    </div>
  );
}
