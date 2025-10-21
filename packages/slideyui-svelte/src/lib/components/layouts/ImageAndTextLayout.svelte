<script lang="ts">
  /**
   * ImageAndTextLayout - Image on left, text content on right
   *
   * @component
   */

  import type { LayoutDensity } from '$lib/types';

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
     * Layout density for controlling spacing
     */
    density?: LayoutDensity;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    image,
    imageAlt = '',
    density = 'normal',
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(['card-layout-split', className].filter(Boolean).join(' '));
</script>

<div class={classes} data-layout-density={density} {...restProps}>
  <div class="card-layout-split-image">
    <img src={image} alt={imageAlt} />
  </div>
  <div class="card-layout-split-content">
    {@render children?.()}
  </div>
</div>
