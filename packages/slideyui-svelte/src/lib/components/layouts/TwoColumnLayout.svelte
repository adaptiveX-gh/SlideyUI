<script lang="ts">
  /**
   * TwoColumnLayout - Simple two-column layout
   *
   * @component
   */

  import type { LayoutDensity } from '$lib/types';

  interface Props {
    /**
     * Left column content
     */
    left?: import('svelte').Snippet;

    /**
     * Right column content
     */
    right?: import('svelte').Snippet;

    /**
     * Layout density for controlling spacing
     */
    density?: LayoutDensity;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let { left, right, density = 'normal', class: className = '', ...restProps }: Props = $props();

  const classes = $derived(['card-layout-2col', className].filter(Boolean).join(' '));
</script>

<div class={classes} data-layout-density={density} {...restProps}>
  <div>{@render left?.()}</div>
  <div>{@render right?.()}</div>
</div>
