<script lang="ts">
  /**
   * TwoColumnWithHeadingsLayout - Two columns each with a heading
   *
   * @component
   */

  interface Props {
    /**
     * Left column heading
     */
    leftHeading?: import('svelte').Snippet;

    /**
     * Left column content
     */
    leftContent?: import('svelte').Snippet;

    /**
     * Right column heading
     */
    rightHeading?: import('svelte').Snippet;

    /**
     * Right column content
     */
    rightContent?: import('svelte').Snippet;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    leftHeading,
    leftContent,
    rightHeading,
    rightContent,
    class: className = '',
    ...restProps
  }: Props = $props();

  const classes = $derived(['card-layout-2col', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  <div class="card-layout-col">
    <h3 class="card-layout-col-heading">{@render leftHeading?.()}</h3>
    <div class="card-layout-col-content">{@render leftContent?.()}</div>
  </div>
  <div class="card-layout-col">
    <h3 class="card-layout-col-heading">{@render rightHeading?.()}</h3>
    <div class="card-layout-col-content">{@render rightContent?.()}</div>
  </div>
</div>
