<script lang="ts">
  /**
   * HeaderBrand - Brand/logo section of the header
   */

  interface Props {
    /**
     * Optional link href
     */
    href?: string;

    /**
     * Optional logo image source
     */
    logo?: string;

    /**
     * Logo alt text
     */
    logoAlt?: string;

    /**
     * Optional subtitle
     */
    subtitle?: string;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    href = undefined,
    logo = undefined,
    logoAlt = 'Logo',
    subtitle = undefined,
    class: className = '',
    ...restProps
  }: Props = $props();
</script>

{#if href}
  <a {href} class="card-header-brand {className}" {...restProps}>
    {#if logo}
      <img src={logo} alt={logoAlt} class="card-header-logo" />
    {/if}
    <div>
      <div><slot /></div>
      {#if subtitle}
        <div class="card-header-subtitle">{subtitle}</div>
      {/if}
    </div>
  </a>
{:else}
  <div class="card-header-brand {className}">
    {#if logo}
      <img src={logo} alt={logoAlt} class="card-header-logo" />
    {/if}
    <div>
      <div><slot /></div>
      {#if subtitle}
        <div class="card-header-subtitle">{subtitle}</div>
      {/if}
    </div>
  </div>
{/if}
