<script lang="ts">
  import { getPresentationContext } from '../stores/presentation';

  /**
   * Additional CSS classes
   */
  let className = '';
  export { className as class };

  const presentation = getPresentationContext();
</script>

<!--
  Presentation controls overlay
  Displays navigation controls in presenter mode
-->
{#if $presentation.presenterMode}
  <div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 {className}">
    <div
      class="flex items-center gap-4 bg-base-100/95 backdrop-blur rounded-full px-6 py-3 shadow-xl border border-base-300"
    >
      <button
        on:click={() => presentation.previousCard()}
        disabled={$presentation.currentCard === 0}
        class="btn btn-circle btn-sm btn-ghost"
        aria-label="Previous card"
      >
        ←
      </button>

      <div class="text-sm font-medium">
        {$presentation.currentCard + 1} / {$presentation.totalCards}
      </div>

      <button
        on:click={() => presentation.nextCard()}
        disabled={$presentation.currentCard >= $presentation.totalCards - 1}
        class="btn btn-circle btn-sm btn-ghost"
        aria-label="Next card"
      >
        →
      </button>
    </div>
  </div>
{/if}
