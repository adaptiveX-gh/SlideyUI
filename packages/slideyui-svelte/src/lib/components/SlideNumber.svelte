<!--
  SlideNumber Component
  Slide number display indicator
-->

<script lang="ts">
  import { getPresentationContext } from '../stores/presentation';

  /**
   * Position
   */
  export let position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' = 'bottom-right';

  /**
   * Show format (e.g., "1/10" or just "1")
   */
  export let format: 'fraction' | 'current' = 'fraction';

  /**
   * Additional CSS classes
   */
  let className: string = '';
  export { className as class };

  // Get presentation context
  const presentationContext = getPresentationContext();

  // Calculate slide numbers using reactive statements
  $: currentSlide = $presentationContext.currentCard;
  $: totalSlides = $presentationContext.totalCards;
  $: displayNumber = format === 'fraction'
    ? `${currentSlide + 1} / ${totalSlides}`
    : `${currentSlide + 1}`;
</script>

<!--
  Slide number indicator showing current slide position

  @example
  ```svelte
  <SlideNumber position="bottom-right" format="fraction" />
  ```
-->

<div
  class="slide-number slide-number-{position} {className}"
  aria-label="Slide {currentSlide + 1} of {totalSlides}"
>
  {displayNumber}
</div>
