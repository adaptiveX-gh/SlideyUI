<script lang="ts">
  /**
   * HeroTitle - Hero title/heading
   *
   * @component
   */

  interface Props {
    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(['card-hero-title', className].filter(Boolean).join(' '));
</script>

<h1 class={classes} {...restProps}>
  {@render children?.()}
</h1>
