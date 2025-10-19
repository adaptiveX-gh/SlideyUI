<script lang="ts">
  /**
   * Divider - Presentation-optimized divider component with optional text
   *
   * @example
   * ```svelte
   * <!-- Simple horizontal divider -->
   * <Divider />
   *
   * <!-- Divider with text -->
   * <Divider>OR</Divider>
   *
   * <!-- Vertical divider -->
   * <Divider orientation="vertical" />
   *
   * <!-- Colored divider -->
   * <Divider variant="accent">Section Break</Divider>
   * ```
   *
   * @component
   * @see https://daisyui.com/components/divider/
   */

  /**
   * Orientation of the divider
   * @default "horizontal"
   */
  export let orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Color variant of the divider
   * @default undefined (uses border color)
   */
  export let variant: 'primary' | 'secondary' | 'accent' | undefined = undefined;

  /**
   * Additional CSS classes
   */
  let className = '';
  export { className as class };

  $: baseClass = 'divider';
  $: orientationClass = orientation === 'vertical' ? 'divider-vertical' : 'divider-horizontal';
  $: variantClass = variant ? `divider-${variant}` : '';
  $: classes = [baseClass, orientationClass, variantClass, className].filter(Boolean).join(' ');
</script>

<div class={classes} role="separator" aria-orientation={orientation} {...$$restProps}>
  <slot />
</div>
