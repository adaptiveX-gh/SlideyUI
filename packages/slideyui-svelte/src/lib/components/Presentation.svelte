<script lang="ts">
  /**
   * Presentation Component
   * Full-screen card presentation wrapper
   * Replaces Deck with modern card-centric approach
   *
   * @example
   * ```svelte
   * <Presentation theme="corporate" showProgress cards={[card1, card2, card3]}>
   *   <!-- Or use default slot with manual card management -->
   * </Presentation>
   * ```
   */

  import { setPresentationContext, presentationKeyboard } from '../stores/presentation';
  import PresentationProgress from './PresentationProgress.svelte';
  import PresentationNumber from './PresentationNumber.svelte';
  import PresentationControls from './PresentationControls.svelte';
  import type { SlideTheme } from '../types';
  import { onMount } from 'svelte';

  /**
   * Presentation theme
   * @default 'minimal'
   */
  export let theme: SlideTheme = 'minimal';

  /**
   * Initial card index
   * @default 0
   */
  export let initialCard: number = 0;

  /**
   * Enable keyboard navigation
   * @default true
   */
  export let enableKeyboard: boolean = true;

  /**
   * Show progress indicator
   * @default false
   */
  export let showProgress: boolean = false;

  /**
   * Progress indicator position
   * @default 'bottom'
   */
  export let progressPosition: 'top' | 'bottom' = 'bottom';

  /**
   * Show card numbers
   * @default false
   */
  export let showCardNumbers: boolean = false;

  /**
   * Card number position
   * @default 'bottom-right'
   */
  export let cardNumberPosition: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' =
    'bottom-right';

  /**
   * Enable presenter mode (speaker notes, controls)
   * @default false
   */
  export let presenterMode: boolean = false;

  /**
   * Callback when card changes
   */
  export let onCardChange: ((cardIndex: number) => void) | undefined = undefined;

  /**
   * Additional CSS classes
   */
  let className = '';
  export { className as class };

  // Track children container
  let containerElement: HTMLDivElement;
  let totalCards = 0;

  // Create presentation context
  const presentation = setPresentationContext(
    {
      currentCard: initialCard,
      totalCards: 0,
      theme,
      presenterMode,
      isPresentationMode: true,
    },
    onCardChange
  );

  // Track current card from store
  let currentCard = 0;
  let currentCardStyle = '--current-card: 0';

  // Subscribe to presentation changes
  $: {
    const unsubscribe = presentation.subscribe((state) => {
      currentCard = state.currentCard;
      currentCardStyle = `--current-card: ${state.currentCard}`;
      updateActiveCard();
    });
  }

  // Update active card class on children
  function updateActiveCard() {
    if (containerElement) {
      const children = containerElement.children;
      // Remove active-card class from all children
      for (let i = 0; i < children.length; i++) {
        children[i].classList.remove('active-card');
      }
      // Add active-card class to current card
      if (children[currentCard]) {
        children[currentCard].classList.add('active-card');
      }
    }
  }

  // Count children on mount and when they change
  function updateCardCount() {
    if (containerElement) {
      const children = containerElement.children;
      totalCards = children.length;

      // Update the store's total cards
      presentation.setTotalCards(totalCards);

      // Ensure current card is within bounds
      if (currentCard >= totalCards) {
        presentation.goToCard(Math.max(0, totalCards - 1));
      }

      // Update active card visibility
      updateActiveCard();
    }
  }

  onMount(() => {
    updateCardCount();

    // Watch for DOM changes (in case cards are added/removed dynamically)
    const observer = new MutationObserver(updateCardCount);
    if (containerElement) {
      observer.observe(containerElement, { childList: true });
    }

    return () => observer.disconnect();
  });
</script>

<!--
  Full-screen card presentation wrapper
  Manages card navigation, progress, and presenter controls
-->
<div
  class="presentation-container fixed inset-0 w-screen h-screen overflow-hidden theme-{theme} {className}"
  data-theme={theme}
  use:presentationKeyboard={enableKeyboard ? presentation : undefined}
  style={currentCardStyle}
>
  <!-- Full-screen card container -->
  <div class="w-full h-full flex items-center justify-center p-8">
    <div
      bind:this={containerElement}
      class="presentation-cards w-full max-w-[90vw] max-h-[90vh]"
      style="--current-card: {currentCard}"
    >
      <slot />
    </div>
  </div>

  <!-- Progress indicator -->
  {#if showProgress}
    <PresentationProgress position={progressPosition} />
  {/if}

  <!-- Card numbers -->
  {#if showCardNumbers}
    <PresentationNumber position={cardNumberPosition} />
  {/if}

  <!-- Presenter controls -->
  <PresentationControls />
</div>

<style>
  /* Hide all cards by default */
  .presentation-cards :global(> *) {
    display: none;
    width: 100%;
    height: 100%;
  }

  /* Show the active card (controlled by JavaScript) */
  .presentation-cards :global(> *.active-card) {
    display: flex;
    flex-direction: column;
  }
</style>
