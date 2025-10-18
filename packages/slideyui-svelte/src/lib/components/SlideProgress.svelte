<!--
  SlideProgress Component
  Progress bar showing presentation progress
-->

<script lang="ts">
  import { getPresentationContext } from '../stores/presentation';

  /**
   * Position
   */
  export let position: 'top' | 'bottom' = 'top';

  /**
   * Show percentage
   */
  export let showPercentage: boolean = false;

  /**
   * Additional CSS classes
   */
  let className: string = '';
  export { className as class };

  // Get presentation context
  const presentationContext = getPresentationContext();

  // Calculate progress
  const progress = $derived.by(() => {
    if (!presentationContext) return 0;
    const state = presentationContext.state;
    const totalSlides = state.totalCards;
    const currentSlide = state.currentCard;
    return totalSlides > 0 ? ((currentSlide + 1) / totalSlides) * 100 : 0;
  });

  const percentage = $derived(Math.round(progress));

  const currentSlide = $derived(presentationContext?.state.currentCard ?? 0);
  const totalSlides = $derived(presentationContext?.state.totalCards ?? 0);
</script>

<!--
  Progress indicator showing current position in presentation

  @example
  ```svelte
  <SlideProgress position="top" showPercentage />
  ```
-->

<div
  class="slide-progress slide-progress-{position} {className}"
  role="progressbar"
  aria-valuenow={percentage}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Slide {currentSlide + 1} of {totalSlides}"
>
  <div
    class="slide-progress-bar"
    style="width: {progress}%"
  />
  {#if showPercentage}
    <span class="slide-progress-text">
      {percentage}%
    </span>
  {/if}
</div>
