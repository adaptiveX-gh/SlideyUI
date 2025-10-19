<script lang="ts">
  /**
   * TextAndImageLayout - Text content on left, image on right
   *
   * @component
   */

  interface Props {
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
    image,
    imageAlt = '',
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(
    ['card-layout-split', 'card-layout-split-reverse', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  <div class="card-layout-split-content">
    {@render children?.()}
  </div>
  <div class="card-layout-split-image">
    <img src={image} alt={imageAlt} />
  </div>
</div>
