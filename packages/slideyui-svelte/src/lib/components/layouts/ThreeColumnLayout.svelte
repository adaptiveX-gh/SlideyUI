<script lang="ts">
  /**
   * ThreeColumnLayout - Simple three-column layout
   *
   * @component
   */

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
     * Additional CSS classes
     */
    class?: string;
  }

  let { first, second, third, class: className = '', ...restProps }: Props = $props();

  const classes = $derived(['card-layout-3col', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  <div>{@render first?.()}</div>
  <div>{@render second?.()}</div>
  <div>{@render third?.()}</div>
</div>
