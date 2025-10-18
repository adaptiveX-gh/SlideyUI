/**
 * Hook to access slide context
 */

import { useContext } from 'react';
import { SlideContext } from '../context/SlideContext';

/**
 * Access the slide deck context
 * @returns Slide context value with navigation and state
 * @throws Error if used outside of a Deck component
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { currentSlide, totalSlides, nextSlide } = useSlideContext();
 *   return <div>Slide {currentSlide + 1} of {totalSlides}</div>;
 * }
 * ```
 */
export function useSlideContext() {
  const context = useContext(SlideContext);

  if (!context) {
    throw new Error('useSlideContext must be used within a Deck component');
  }

  return context;
}
