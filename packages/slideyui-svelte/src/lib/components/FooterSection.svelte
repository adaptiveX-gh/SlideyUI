<script lang="ts">
  /**
   * FooterSection - A section within a footer for organizing content
   *
   * @example
   * ```svelte
   * <FooterSection title="Company">
   *   <a href="/about">About</a>
   *   <a href="/careers">Careers</a>
   * </FooterSection>
   * ```
   */

  interface Props {
    /**
     * Section title
     */
    title?: string;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    title = undefined,
    class: className = ''
  }: Props = $props();
</script>

<div class="card-footer-section {className}">
  {#if title}
    <h3 class="card-footer-title">{title}</h3>
  {/if}
  <slot />
</div>
