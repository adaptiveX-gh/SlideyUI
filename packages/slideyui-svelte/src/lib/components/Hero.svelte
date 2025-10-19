<script lang="ts">
  /**
   * Hero - Presentation-optimized hero section for cards and slides
   *
   * @component
   */

  interface Props {
    /**
     * Background image URL
     */
    backgroundImage?: string;

    /**
     * Apply overlay gradient
     */
    overlay?: boolean;

    /**
     * Additional CSS classes
     */
    class?: string;

    /**
     * Additional inline styles
     */
    style?: string;
  }

  let {
    backgroundImage = undefined,
    overlay = false,
    class: className = '',
    style = '',
    children,
    ...restProps
  }: Props = $props();

  const baseClass = 'card-hero';
  const imageClass = $derived(backgroundImage ? 'card-hero-image' : '');
  const overlayClass = $derived(overlay ? 'card-hero-overlay' : '');
  const classes = $derived([baseClass, imageClass, overlayClass, className].filter(Boolean).join(' '));

  const combinedStyle = $derived(
    backgroundImage
      ? `background-image: url(${backgroundImage});${style ? ' ' + style : ''}`
      : style
  );
</script>

<div class={classes} style={combinedStyle} {...restProps}>
  {@render children?.()}
</div>
