<!--
  Callout Component
  Highlighted callout box for important information
-->

<script lang="ts">
  /**
   * Callout type
   */
  export let type: 'info' | 'key' | 'warning' | 'success' | 'question' = 'info';

  /**
   * Additional CSS classes
   */
  let className: string = '';
  export { className as class };
</script>

<!--
  Callout box component for highlighting important information

  @example
  ```svelte
  <Callout type="warning" title="Important Note">
    This feature requires administrator access.
  </Callout>

  <Callout type="key">
    Remember this key concept for the exam.
  </Callout>
  ```
-->

<div class="card-callout card-callout-{type} {className}">
  {#if $$slots.icon}
    <slot name="icon" />
  {:else}
    {#if type === 'info'}
      <svg class="card-callout-icon" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
      </svg>
    {:else if type === 'key'}
      <svg class="card-callout-icon" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" />
      </svg>
    {:else if type === 'warning'}
      <svg class="card-callout-icon" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    {:else if type === 'success'}
      <svg class="card-callout-icon" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
    {:else if type === 'question'}
      <svg class="card-callout-icon" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
    {/if}
  {/if}
  <div class="card-callout-content">
    <slot />
  </div>
</div>
