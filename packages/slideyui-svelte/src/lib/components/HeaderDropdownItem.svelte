<script lang="ts">
  /**
   * HeaderDropdownItem - Item in dropdown menu
   */

  interface Props {
    /**
     * Link href
     */
    href: string;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    href,
    class: className = '',
    ...restProps
  }: Props = $props();
</script>

<a {href} class="card-header-dropdown-item {className}" {...restProps}>
  <slot />
</a>
