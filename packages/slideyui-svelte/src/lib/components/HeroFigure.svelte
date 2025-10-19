<script lang="ts">
  /**
   * HeroFigure - Image/media container for split layout
   *
   * @component
   */

  interface Props {
    /**
     * Image source
     */
    src: string;

    /**
     * Alt text
     */
    alt?: string;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    src,
    alt = '',
    class: className = '',
    ...restProps
  }: Props = $props();

  const classes = $derived(['card-hero-figure', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  <img {src} {alt} />
</div>
