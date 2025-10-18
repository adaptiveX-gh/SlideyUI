/**
 * Deck Component
 * Main presentation wrapper that manages slide state and navigation
 *
 * @deprecated Use Presentation component instead for modern card-based presentations
 * @see {@link Presentation}
 */

import { DeckProps } from '../types';
import { Presentation } from './Presentation';

/**
 * Main presentation deck wrapper component
 *
 * @deprecated Use Presentation component instead. This component is maintained for backwards compatibility.
 *
 * Migration:
 * ```tsx
 * // Old (deprecated):
 * <Deck theme="ocean" showProgress showSlideNumbers>
 *   <TitleSlide title="My Presentation" />
 *   <ContentSlide title="Slide 1">Content here</ContentSlide>
 * </Deck>
 *
 * // New (recommended):
 * <Presentation theme="ocean" showProgress showCardNumbers>
 *   <ContentCard title="My Presentation" variant="featured">...</ContentCard>
 *   <ContentCard title="Slide 1">Content here</ContentCard>
 * </Presentation>
 * ```
 *
 * @example
 * ```tsx
 * <Deck theme="ocean" showProgress showSlideNumbers>
 *   <TitleSlide title="My Presentation" />
 *   <ContentSlide title="Slide 1">Content here</ContentSlide>
 *   <ContentSlide title="Slide 2">More content</ContentSlide>
 * </Deck>
 * ```
 */
export function Deck({
  theme = 'ocean',
  children,
  className,
  initialSlide = 0,
  enableKeyboard = true,
  showProgress = false,
  progressPosition = 'top',
  showSlideNumbers = false,
  slideNumberPosition = 'bottom-right',
  onSlideChange,
}: DeckProps) {
  return (
    <Presentation
      theme={theme}
      className={className}
      initialCard={initialSlide}
      enableKeyboard={enableKeyboard}
      showProgress={showProgress}
      progressPosition={progressPosition}
      showCardNumbers={showSlideNumbers}
      cardNumberPosition={slideNumberPosition}
      onCardChange={onSlideChange}
    >
      {children}
    </Presentation>
  );
}
