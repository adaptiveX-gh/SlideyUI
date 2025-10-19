<script lang="ts">
  /**
   * TwoColumnLayout - Simple two-column layout
   *
   * @component
   */

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
     * Additional CSS classes
     */
    class?: string;
  }

  let { left, right, class: className = '', ...restProps }: Props = $props();

  const classes = $derived(['card-layout-2col', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  <div>{@render left?.()}</div>
  <div>{@render right?.()}</div>
</div>
