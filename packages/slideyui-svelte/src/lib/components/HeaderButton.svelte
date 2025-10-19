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
  }

  let {
    variant = 'solid',
    type = 'button',
    class: className = '',
    ...restProps
  }: Props = $props();

  const variantClass = $derived(variant === 'outline' ? 'card-header-button-outline' : '');
</script>

<button {type} class="card-header-button {variantClass} {className}" {...restProps}>
  <slot />
</button>
