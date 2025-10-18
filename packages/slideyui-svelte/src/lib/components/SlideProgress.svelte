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

  // Calculate progress using reactive statements
  $: totalSlides = $presentationContext.totalCards;
  $: currentSlide = $presentationContext.currentCard;
  $: progress = totalSlides > 0 ? ((currentSlide + 1) / totalSlides) * 100 : 0;
  $: percentage = Math.round(progress);
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
  ></div>
  {#if showPercentage}
    <span class="slide-progress-text">
      {percentage}%
    </span>
  {/if}
</div>
