<script lang="ts">
  /**
   * ThemeModeSwitcher Component
   *
   * Provides a toggle to switch between light and dark theme modes.
   * Respects system preferences when set to 'auto' mode and persists
   * user preferences to localStorage.
   *
   * @example
   * ```svelte
   * <script>
   *   import { ThemeModeSwitcher } from '@slideyui/svelte';
   * </script>
   *
   * <ThemeModeSwitcher />
   *
   * <Presentation theme="corporate">
   *   <!-- cards -->
   * </Presentation>
   * ```
   */

  import { onMount } from 'svelte';
  import type { ThemeMode } from '@slideyui/core';

  const STORAGE_KEY = 'slideyui-theme-mode';

  /**
   * Optional class name for custom styling
   */
  export let className: string = '';

  /**
   * Default mode if no preference is stored
   */
  export let defaultMode: ThemeMode = 'auto';

  /**
   * Callback when mode changes
   */
  export let onChange: ((mode: ThemeMode) => void) | undefined = undefined;

  /**
   * Show labels next to icons
   */
  export let showLabels: boolean = false;

  /**
   * Variant style
   */
  export let variant: 'button' | 'toggle' | 'dropdown' = 'button';

  let mode = $state<ThemeMode>(defaultMode);
  let mounted = $state(false);

  /**
   * Get the effective mode considering system preferences
   */
  function getEffectiveMode(currentMode: ThemeMode): 'light' | 'dark' {
    if (currentMode === 'auto') {
      // Check system preference
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light';
    }
    return currentMode;
  }

  /**
   * Apply theme mode to the document
   */
  function applyThemeMode(currentMode: ThemeMode): void {
    if (typeof document === 'undefined') return;

    const effectiveMode = getEffectiveMode(currentMode);
    document.documentElement.setAttribute('data-theme-mode', effectiveMode);
  }

  /**
   * Toggle between light, dark, and auto modes
   */
  function toggleMode() {
    const modes: ThemeMode[] = ['light', 'dark', 'auto'];
    const currentIndex = modes.indexOf(mode);
    const nextMode = modes[(currentIndex + 1) % modes.length];

    mode = nextMode;
    localStorage.setItem(STORAGE_KEY, nextMode);
    applyThemeMode(nextMode);
    onChange?.(nextMode);
  }

  /**
   * Set a specific mode
   */
  function setSpecificMode(newMode: ThemeMode) {
    mode = newMode;
    localStorage.setItem(STORAGE_KEY, newMode);
    applyThemeMode(newMode);
    onChange?.(newMode);
  }

  // Load saved preference on mount
  onMount(() => {
    mounted = true;

    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      const initialMode = savedMode || defaultMode;
      mode = initialMode;
      applyThemeMode(initialMode);

      // Listen for system theme changes when in auto mode
      if (mode === 'auto') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => applyThemeMode('auto');
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    }
  });

  // Watch mode changes for system preference updates
  $effect(() => {
    if (typeof window === 'undefined' || mode !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyThemeMode('auto');

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  });

  // Derived effective mode for display
  let effectiveMode = $derived(getEffectiveMode(mode));
</script>

{#if !mounted}
  <div class={className} style="opacity: 0"></div>
{:else if variant === 'button'}
  <!-- Button variant (simple toggle) -->
  <button
    onclick={toggleMode}
    class="inline-flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-[var(--slidey-muted)] {className}"
    aria-label="Switch theme mode (currently {mode})"
    title="Current mode: {mode}"
  >
    {#if mode === 'light'}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    {:else if mode === 'dark'}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    {:else}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    {/if}
    {#if showLabels}
      <span class="text-sm font-medium capitalize">{mode}</span>
    {/if}
  </button>
{:else if variant === 'toggle'}
  <!-- Toggle variant (switch between light/dark only) -->
  <button
    onclick={() => setSpecificMode(mode === 'dark' ? 'light' : 'dark')}
    class="relative inline-flex items-center h-6 w-11 rounded-full transition-colors {mode === 'dark' ? 'bg-[var(--slidey-primary)]' : 'bg-[var(--slidey-muted)]'} {className}"
    aria-label="Toggle {mode === 'dark' ? 'light' : 'dark'} mode"
  >
    <span
      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {mode === 'dark' ? 'translate-x-6' : 'translate-x-1'}"
    ></span>
  </button>
{:else}
  <!-- Dropdown variant (select from all modes) -->
  <div class="inline-flex gap-1 p-1 rounded-lg bg-[var(--slidey-muted)] {className}">
    <!-- Light mode button -->
    <button
      onclick={() => setSpecificMode('light')}
      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors {mode === 'light'
        ? 'bg-[var(--slidey-background)] text-[var(--slidey-foreground)] shadow-sm'
        : 'text-[var(--slidey-muted-foreground)] hover:text-[var(--slidey-foreground)]'}"
      aria-label="Set light mode"
      aria-pressed={mode === 'light'}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      {#if showLabels}<span class="capitalize">light</span>{/if}
    </button>

    <!-- Dark mode button -->
    <button
      onclick={() => setSpecificMode('dark')}
      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors {mode === 'dark'
        ? 'bg-[var(--slidey-background)] text-[var(--slidey-foreground)] shadow-sm'
        : 'text-[var(--slidey-muted-foreground)] hover:text-[var(--slidey-foreground)]'}"
      aria-label="Set dark mode"
      aria-pressed={mode === 'dark'}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      {#if showLabels}<span class="capitalize">dark</span>{/if}
    </button>

    <!-- Auto mode button -->
    <button
      onclick={() => setSpecificMode('auto')}
      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors {mode === 'auto'
        ? 'bg-[var(--slidey-background)] text-[var(--slidey-foreground)] shadow-sm'
        : 'text-[var(--slidey-muted-foreground)] hover:text-[var(--slidey-foreground)]'}"
      aria-label="Set auto mode"
      aria-pressed={mode === 'auto'}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
      {#if showLabels}<span class="capitalize">auto</span>{/if}
    </button>
  </div>
{/if}
