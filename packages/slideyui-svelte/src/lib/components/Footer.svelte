<script lang="ts">
  /**
   * Footer - Presentation-optimized footer component for cards and slides
   *
   * @example
   * ```svelte
   * <!-- Simple footer -->
   * <Footer>
   *   <p>© 2024 Company Name</p>
   * </Footer>
   *
   * <!-- Footer with grid layout -->
   * <Footer layout="grid-3">
   *   <FooterSection title="Products">
   *     <a href="#">Product 1</a>
   *     <a href="#">Product 2</a>
   *   </FooterSection>
   * </Footer>
   *
   * <!-- Footer with background image -->
   * <Footer backgroundImage="/footer-bg.jpg">
   *   <FooterSection title="Contact Us">
   *     <p>Get in touch</p>
   *   </FooterSection>
   * </Footer>
   * ```
   *
   * @component
   */

  interface Props {
    /**
     * Footer layout style
     * @default "default"
     */
    layout?: 'default' | 'grid-2' | 'grid-3' | 'grid-4' | 'center';

    /**
     * Background image URL for the footer
     */
    backgroundImage?: string;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    layout = 'default',
    backgroundImage = undefined,
    class: className = '',
    ...restProps
  }: Props = $props();

  const baseClass = 'card-footer';
  const layoutClass = $derived(layout !== 'default' ? `card-footer-${layout}` : '');
  const imageClass = $derived(backgroundImage ? 'card-footer-image' : '');
  const classes = $derived([baseClass, layoutClass, imageClass, className].filter(Boolean).join(' '));
  const styleAttr = $derived(backgroundImage ? `background-image: url(${backgroundImage})` : '');
</script>

<footer class={classes} style={styleAttr} {...restProps}>
  <slot />
</footer>
