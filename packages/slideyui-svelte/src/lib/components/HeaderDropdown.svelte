<script lang="ts">
  /**
   * HeaderDropdown - Dropdown menu for header
   */

  interface Props {
    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    class: className = ''
  }: Props = $props();

  let isOpen = $state(false);
</script>

<div class="card-header-dropdown {className}">
  <div
    class="card-header-dropdown-trigger"
    onclick={() => isOpen = !isOpen}
    role="button"
    tabindex="0"
  >
    <slot name="trigger" />
  </div>
  <div
    class="card-header-dropdown-menu"
    data-open={isOpen}
  >
    <slot />
  </div>
</div>
