<script lang="ts">
  /**
   * TitleWithBulletsLayout - Title at top with bullet points
   *
   * @component
   */

  interface Props {
    /**
     * Title text
     */
    title?: import('svelte').Snippet;

    /**
     * Bullet point items (array of strings or snippets)
     */
    items: (string | import('svelte').Snippet)[];

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let { title, items, class: className = '', ...restProps }: Props = $props();

  const classes = $derived(['card-layout-title-bullets', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  <h2 class="card-layout-title-bullets-header">{@render title?.()}</h2>
  <ul class="card-layout-bullets">
    {#each items as item}
      <li>
        {#if typeof item === 'string'}
          {item}
        {:else}
          {@render item?.()}
        {/if}
      </li>
    {/each}
  </ul>
</div>
