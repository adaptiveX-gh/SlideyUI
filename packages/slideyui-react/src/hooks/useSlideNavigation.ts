/**
 * Hook to handle slide navigation with keyboard controls
 */

import { useEffect } from 'react';
import { useSlideContext } from './useSlideContext';

export interface UseSlideNavigationOptions {
  /** Enable keyboard navigation */
  enabled?: boolean;
  /** Custom key mappings */
  keys?: {
    next?: string[];
    previous?: string[];
    first?: string[];
    last?: string[];
  };
}

const DEFAULT_KEYS = {
  next: ['ArrowRight', 'ArrowDown', ' ', 'PageDown'],
  previous: ['ArrowLeft', 'ArrowUp', 'PageUp'],
  first: ['Home'],
  last: ['End'],
};

/**
 * Set up keyboard navigation for slides
 * @param options - Navigation options
 *
 * @example
 * ```tsx
 * function Deck() {
 *   useSlideNavigation({ enabled: true });
 *   return <div>...</div>;
 * }
 * ```
 */
export function useSlideNavigation(options: UseSlideNavigationOptions = {}) {
  const { enabled = true, keys = DEFAULT_KEYS } = options;
  const { nextSlide, previousSlide, goToSlide, totalSlides } = useSlideContext();

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = event.key;

      if (keys.next?.includes(key)) {
        event.preventDefault();
        nextSlide();
      } else if (keys.previous?.includes(key)) {
        event.preventDefault();
        previousSlide();
      } else if (keys.first?.includes(key)) {
        event.preventDefault();
        goToSlide(0);
      } else if (keys.last?.includes(key)) {
        event.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, keys, nextSlide, previousSlide, goToSlide, totalSlides]);
}
