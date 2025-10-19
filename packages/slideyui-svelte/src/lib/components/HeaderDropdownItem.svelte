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

    /**
     * Children content
     */
    children?: import('svelte').Snippet;
  }

  let {
    href,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();
</script>

<a {href} class="card-header-dropdown-item {className}" {...restProps}>
  {@render children?.()}
</a>
