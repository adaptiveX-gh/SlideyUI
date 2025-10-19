<script lang="ts">
  /**
   * FooterSocial - Social media icon links for footer
   *
   * @example
   * ```svelte
   * <FooterSocial
   *   links={[
   *     { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
   *     { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" }
   *   ]}
   * />
   * ```
   */

  interface Props {
    /**
     * Social media links
     */
    links?: Array<{
      icon: string; // Can be emoji or SVG string
      href: string;
      label: string;
    }>;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    links = [],
    class: className = ''
  }: Props = $props();
</script>

<div class="card-footer-social {className}">
  {#each links as link}
    <a href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
      {@html link.icon}
    </a>
  {/each}
</div>
