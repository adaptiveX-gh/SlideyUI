/**
 * SlideProgress Component
 * Progress bar showing presentation progress
 */

import { SlideProgressProps } from '../types';
import { usePresentationContext } from './Presentation';

/**
 * Progress indicator showing current position in presentation
 *
 * @example
 * ```tsx
 * <SlideProgress position="top" showPercentage />
 * ```
 */
export function SlideProgress({
  position = 'top',
  showPercentage = false,
  className = '',
}: SlideProgressProps) {
  const { currentCard, totalCards } = usePresentationContext();
  const currentSlide = currentCard;
  const totalSlides = totalCards;

  const progress = totalSlides > 0 ? ((currentSlide + 1) / totalSlides) * 100 : 0;
  const percentage = Math.round(progress);

  return (
    <div
      className={`presentation-progress presentation-progress-${position} ${className}`}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Slide ${currentSlide + 1} of ${totalSlides}`}
    >
      <div
        className="presentation-progress-bar"
        style={{ width: `${progress}%` }}
      />
      {showPercentage && (
        <span className="presentation-progress-text">
          {percentage}%
        </span>
      )}
    </div>
  );
}
