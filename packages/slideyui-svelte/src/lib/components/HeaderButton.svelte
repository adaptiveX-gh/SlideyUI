<script lang="ts">
  /**
   * HeaderButton - Styled button for header actions
   */

  interface Props {
    /**
     * Button variant
     */
    variant?: 'solid' | 'outline';

    /**
     * Additional CSS classes
     */
    class?: string;

    /**
     * Button type
     */
    type?: 'button' | 'submit' | 'reset';

    /**
     * Children content
     */
    children?: import('svelte').Snippet;
  }

  let {
    variant = 'solid',
    type = 'button',
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const variantClass = $derived(variant === 'outline' ? 'card-header-button-outline' : '');
</script>

<button {type} class="card-header-button {variantClass} {className}" {...restProps}>
  {@render children?.()}
</button>
