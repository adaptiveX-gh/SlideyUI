<script lang="ts">
  import { getPresentationContext } from '../stores/presentation';

  /**
   * Position of the progress bar
   * @default 'bottom'
   */
  export let position: 'top' | 'bottom' = 'bottom';

  /**
   * Additional CSS classes
   */
  let className = '';
  export { className as class };

  const presentation = getPresentationContext();

  $: progress =
    $presentation.totalCards > 0
      ? (($presentation.currentCard + 1) / $presentation.totalCards) * 100
      : 0;
</script>

<!--
  Progress indicator component
  Displays a horizontal bar showing presentation progress
-->
<div
  class="slide-progress fixed left-0 right-0 z-50 {position === 'top'
    ? 'top-0'
    : 'bottom-0'} {className}"
>
  <div class="slide-progress-bar" style="width: {progress}%"></div>
</div>
