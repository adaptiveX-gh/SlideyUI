<!--
  Quote Component
  Quote block with author attribution
-->

<script lang="ts">

  /**
   * Author name
   */
  export let author: string | undefined = undefined;

  /**
   * Author title/source
   */
  export let source: string | undefined = undefined;

  /**
   * Quote style
   */
  export let variant: 'default' | 'large' | 'minimal' = 'default';

  /**
   * Additional CSS classes
   */
  let className: string = '';
  export { className as class };

</script>

<!--
  Styled quote block with author and source attribution

  @example
  ```svelte
  <Quote
    author="Steve Jobs"
    source="Apple CEO"
    variant="large"
  >
    Stay hungry, stay foolish.
  </Quote>
  ```
-->

<blockquote class="slide-quote slide-quote-{variant} {className}">
  <div class="slide-quote-mark">"</div>
  <div class="slide-quote-content">
    <slot />
  </div>
  {#if author || source}
    <footer class="slide-quote-footer">
      {#if author}
        <cite class="slide-quote-author">{author}</cite>
      {/if}
      {#if source}
        <span class="slide-quote-source">{source}</span>
      {/if}
    </footer>
  {/if}
</blockquote>
