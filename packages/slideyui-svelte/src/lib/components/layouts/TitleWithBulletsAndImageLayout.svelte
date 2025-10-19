<script lang="ts">
  /**
   * TitleWithBulletsAndImageLayout - Title, bullets on left, image on right
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
     * Image source URL
     */
    image: string;

    /**
     * Image alt text
     */
    imageAlt?: string;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    title,
    items,
    image,
    imageAlt = '',
    class: className = '',
    ...restProps
  }: Props = $props();

  const classes = $derived(['card-layout-title-bullets-image', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  <div class="card-layout-title-bullets-image-content">
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
  <div class="card-layout-split-image">
    <img src={image} alt={imageAlt} />
  </div>
</div>
