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

<blockquote class="card-quote card-quote-{variant} {className}">
  <div class="card-quote-text">
    <slot />
  </div>
  {#if author || source}
    <footer class="card-quote-author">
      {author}
      {#if source}<span> — {source}</span>{/if}
    </footer>
  {/if}
</blockquote>
