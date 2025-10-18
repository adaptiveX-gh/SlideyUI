<script lang="ts">
  import { getPresentationContext } from '../stores/presentation';

  /**
   * Position of the card number indicator
   * @default 'bottom-right'
   */
  export let position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' =
    'bottom-right';

  /**
   * Additional CSS classes
   */
  let className = '';
  export { className as class };

  const presentation = getPresentationContext();

  const positionClasses: Record<string, string> = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };
</script>

<!--
  Card number indicator
  Displays current card number and total
-->
<div class="slide-number fixed z-50 {positionClasses[position]} {className}">
  {$presentation.currentCard + 1} / {$presentation.totalCards}
</div>
