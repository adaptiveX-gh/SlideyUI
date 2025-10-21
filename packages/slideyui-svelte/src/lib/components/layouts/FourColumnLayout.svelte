<script lang="ts">
  /**
   * FourColumnLayout - Four-column layout
   *
   * @component
   */

  import type { LayoutDensity } from '$lib/types';

  interface Props {
    /**
     * First column content
     */
    first?: import('svelte').Snippet;

    /**
     * Second column content
     */
    second?: import('svelte').Snippet;

    /**
     * Third column content
     */
    third?: import('svelte').Snippet;

    /**
     * Fourth column content
     */
    fourth?: import('svelte').Snippet;

    /**
     * Layout density for controlling spacing
     */
    density?: LayoutDensity;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let { first, second, third, fourth, density = 'normal', class: className = '', ...restProps }: Props = $props();

  const classes = $derived(['card-layout-4col', className].filter(Boolean).join(' '));
</script>

<div class={classes} data-layout-density={density} {...restProps}>
  <div>{@render first?.()}</div>
  <div>{@render second?.()}</div>
  <div>{@render third?.()}</div>
  <div>{@render fourth?.()}</div>
</div>
