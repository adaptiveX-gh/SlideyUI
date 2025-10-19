<script lang="ts">
  /**
   * FooterLink - A styled link for footer navigation
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
     * Link content
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

<a {href} class="card-footer-link {className}" {...restProps}>
  {@render children?.()}
</a>
