<script lang="ts">
  /**
   * ThreeColumnWithHeadingsLayout - Three columns each with a heading
   *
   * @component
   */

  interface Props {
    /**
     * First column heading
     */
    firstHeading?: import('svelte').Snippet;

    /**
     * First column content
     */
    firstContent?: import('svelte').Snippet;

    /**
     * Second column heading
     */
    secondHeading?: import('svelte').Snippet;

    /**
     * Second column content
     */
    secondContent?: import('svelte').Snippet;

    /**
     * Third column heading
     */
    thirdHeading?: import('svelte').Snippet;

    /**
     * Third column content
     */
    thirdContent?: import('svelte').Snippet;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    firstHeading,
    firstContent,
    secondHeading,
    secondContent,
    thirdHeading,
    thirdContent,
    class: className = '',
    ...restProps
  }: Props = $props();

  const classes = $derived(['card-layout-3col', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  <div class="card-layout-col">
    <h3 class="card-layout-col-heading">{@render firstHeading?.()}</h3>
    <div class="card-layout-col-content">{@render firstContent?.()}</div>
  </div>
  <div class="card-layout-col">
    <h3 class="card-layout-col-heading">{@render secondHeading?.()}</h3>
    <div class="card-layout-col-content">{@render secondContent?.()}</div>
  </div>
  <div class="card-layout-col">
    <h3 class="card-layout-col-heading">{@render thirdHeading?.()}</h3>
    <div class="card-layout-col-content">{@render thirdContent?.()}</div>
  </div>
</div>
