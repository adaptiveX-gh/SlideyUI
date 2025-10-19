<script lang="ts">
  /**
   * HeaderSearch - Search input for header
   */

  interface Props {
    /**
     * Search input value
     */
    value?: string;

    /**
     * Change handler
     */
    onChange?: (value: string) => void;

    /**
     * Placeholder text
     */
    placeholder?: string;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    value = $bindable(''),
    onChange = undefined,
    placeholder = 'Search...',
    class: className = ''
  }: Props = $props();

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    value = target.value;
    onChange?.(target.value);
  }
</script>

<div class="card-header-search {className}">
  <slot name="icon">
    <div class="card-header-search-icon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  </slot>
  <input
    type="search"
    {value}
    on:input={handleInput}
    {placeholder}
  />
</div>
