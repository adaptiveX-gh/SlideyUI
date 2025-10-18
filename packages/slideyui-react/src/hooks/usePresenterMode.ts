/**
 * Hook to toggle presenter mode
 */

import { useEffect } from 'react';
import { usePresentationContext } from '../components/Presentation';

export interface UsePresenterModeOptions {
  /** Keyboard shortcut to toggle presenter mode */
  toggleKey?: string;
  /** Enable keyboard shortcut */
  enableShortcut?: boolean;
}

/**
 * Toggle presenter mode with keyboard shortcut
 * @param options - Presenter mode options
 * @returns Presenter mode state and toggle function
 *
 * @example
 * ```tsx
 * function MyPresentation() {
 *   const { presenterMode, togglePresenterMode } = usePresenterMode({
 *     toggleKey: 'p',
 *     enableShortcut: true,
 *   });
 *
 *   return (
 *     <div>
 *       {presenterMode && <CardNotes>Notes here</CardNotes>}
 *     </div>
 *   );
 * }
 * ```
 */
export function usePresenterMode(options: UsePresenterModeOptions = {}) {
  const { toggleKey = 'p', enableShortcut = true } = options;
  const { presenterMode, togglePresenterMode } = usePresentationContext();

  useEffect(() => {
    if (!enableShortcut) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (event.key.toLowerCase() === toggleKey.toLowerCase()) {
        event.preventDefault();
        togglePresenterMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableShortcut, toggleKey, togglePresenterMode]);

  return {
    presenterMode,
    togglePresenterMode,
  };
}
