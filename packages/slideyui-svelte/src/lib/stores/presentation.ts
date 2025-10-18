/**
 * PresentationStore
 * Manages presentation state for cards in full-screen mode
 * Replaces SlideContext with card-centric approach
 *
 * This is the Svelte equivalent of PresentationContext from React.
 */

import { writable, get, type Writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';
import type { SlideTheme } from '../types';

const PRESENTATION_KEY = Symbol('presentation');

/**
 * Presentation state interface
 */
export interface PresentationState {
  /** Current card index (0-based) */
  currentCard: number;
  /** Total number of cards */
  totalCards: number;
  /** Current theme */
  theme: SlideTheme;
  /** Whether presenter mode is active */
  presenterMode: boolean;
  /** Whether in presentation mode (full-screen) */
  isPresentationMode: boolean;
}

/**
 * Presentation store type with navigation methods
 */
export interface PresentationStore {
  subscribe: (
    run: (value: PresentationState) => void,
    invalidate?: (value?: PresentationState) => void
  ) => () => void;
  /** Navigate to specific card */
  goToCard: (index: number) => void;
  /** Navigate to next card */
  nextCard: () => void;
  /** Navigate to previous card */
  previousCard: () => void;
  /** Toggle presenter mode */
  togglePresenterMode: () => void;
  /** Update total cards count */
  setTotalCards: (total: number) => void;
}

/**
 * Creates a presentation store with navigation methods
 *
 * @param initialState - Initial presentation state
 * @param onCardChange - Optional callback when card changes
 * @returns Presentation store with methods
 */
export function createPresentationStore(
  initialState: Partial<PresentationState>,
  onCardChange?: (index: number) => void
): PresentationStore {
  const defaults: PresentationState = {
    currentCard: 0,
    totalCards: 0,
    theme: 'minimal',
    presenterMode: false,
    isPresentationMode: true,
  };

  const store = writable<PresentationState>({ ...defaults, ...initialState });

  /**
   * Navigate to specific card
   */
  function goToCard(index: number) {
    const state = get(store);
    if (index >= 0 && index < state.totalCards) {
      store.update((s) => ({ ...s, currentCard: index }));
      onCardChange?.(index);
    }
  }

  /**
   * Navigate to next card
   */
  function nextCard() {
    const state = get(store);
    goToCard(state.currentCard + 1);
  }

  /**
   * Navigate to previous card
   */
  function previousCard() {
    const state = get(store);
    goToCard(state.currentCard - 1);
  }

  /**
   * Toggle presenter mode
   */
  function togglePresenterMode() {
    store.update((s) => ({ ...s, presenterMode: !s.presenterMode }));
  }

  /**
   * Update total cards count
   */
  function setTotalCards(total: number) {
    store.update((s) => ({ ...s, totalCards: total }));
  }

  return {
    subscribe: store.subscribe,
    goToCard,
    nextCard,
    previousCard,
    togglePresenterMode,
    setTotalCards,
  };
}

/**
 * Sets presentation context for child components
 * Use this in the parent Presentation component
 *
 * @param state - Initial presentation state
 * @param onCardChange - Optional callback when card changes
 * @returns Presentation store
 *
 * @example
 * ```svelte
 * <script>
 *   const presentation = setPresentationContext({
 *     currentCard: 0,
 *     totalCards: 5,
 *     theme: 'corporate'
 *   });
 * </script>
 * ```
 */
export function setPresentationContext(
  state: Partial<PresentationState>,
  onCardChange?: (index: number) => void
): PresentationStore {
  const presentation = createPresentationStore(state, onCardChange);
  setContext(PRESENTATION_KEY, presentation);
  return presentation;
}

/**
 * Gets presentation context from parent
 * Use this in child components that need access to presentation state
 *
 * @returns Presentation store
 * @throws Error if used outside PresentationProvider
 *
 * @example
 * ```svelte
 * <script>
 *   import { getPresentationContext } from '@slideyui/svelte';
 *   const presentation = getPresentationContext();
 * </script>
 *
 * <div>Card {$presentation.currentCard + 1} of {$presentation.totalCards}</div>
 * ```
 */
export function getPresentationContext(): PresentationStore {
  const context = getContext<PresentationStore>(PRESENTATION_KEY);
  if (!context) {
    throw new Error('getPresentationContext must be used within a Presentation component');
  }
  return context;
}

/**
 * Svelte action for keyboard navigation in presentations
 * Handles arrow keys, space, page up/down, home, end, and presenter mode toggle
 *
 * @param node - HTML element to attach keyboard listener to
 * @param presentation - Presentation store
 *
 * @example
 * ```svelte
 * <div use:presentationKeyboard={presentation}>
 *   <!-- Presentation content -->
 * </div>
 * ```
 */
export function presentationKeyboard(
  node: HTMLElement,
  presentation: PresentationStore | undefined
) {
  if (!presentation) {
    return {
      destroy() {},
    };
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!presentation) return;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ': // Space
      case 'PageDown':
        event.preventDefault();
        presentation.nextCard();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault();
        presentation.previousCard();
        break;
      case 'p':
      case 'P':
        event.preventDefault();
        presentation.togglePresenterMode();
        break;
      case 'Home':
        event.preventDefault();
        presentation.goToCard(0);
        break;
      case 'End': {
        event.preventDefault();
        let totalCards = 0;
        presentation.subscribe((state) => {
          totalCards = state.totalCards;
        })();
        presentation.goToCard(totalCards - 1);
        break;
      }
      default:
        break;
    }
  }

  node.addEventListener('keydown', handleKeyDown);

  return {
    destroy() {
      node.removeEventListener('keydown', handleKeyDown);
    },
  };
}
