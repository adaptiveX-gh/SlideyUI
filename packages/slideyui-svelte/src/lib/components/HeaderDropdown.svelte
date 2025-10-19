<script lang="ts">
  /**
   * HeaderDropdown - Dropdown menu for header
   */

  interface Props {
    /**
     * Additional CSS classes
     */
    class?: string;

    /**
     * Trigger snippet
     */
    trigger?: import('svelte').Snippet;

    /**
     * Children content (dropdown menu items)
     */
    children?: import('svelte').Snippet;
  }

  let {
    class: className = '',
    trigger,
    children
  }: Props = $props();

  let isOpen = $state(false);

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      isOpen = !isOpen;
    }
  }
</script>

<div class="card-header-dropdown {className}">
  <div
    class="card-header-dropdown-trigger"
    onclick={() => isOpen = !isOpen}
    onkeydown={handleKeydown}
    role="button"
    tabindex="0"
  >
    {@render trigger?.()}
  </div>
  <div
    class="card-header-dropdown-menu"
    data-open={isOpen}
  >
    {@render children?.()}
  </div>
</div>
