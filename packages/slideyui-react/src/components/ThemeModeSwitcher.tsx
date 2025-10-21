/**
 * ThemeModeSwitcher Component
 *
 * Provides a toggle to switch between light and dark theme modes.
 * Respects system preferences when set to 'auto' mode and persists
 * user preferences to localStorage.
 *
 * @example
 * ```tsx
 * import { ThemeModeSwitcher } from '@slideyui/react';
 *
 * function App() {
 *   return (
 *     <div>
 *       <ThemeModeSwitcher />
 *       <Deck theme="corporate">
 *         {/* slides *\/}
 *       </Deck>
 *     </div>
 *   );
 * }
 * ```
 */

import { useEffect, useState } from 'react';
import type { ThemeMode } from '@slideyui/core';

const STORAGE_KEY = 'slideyui-theme-mode';

/**
 * Props for the ThemeModeSwitcher component
 */
export interface ThemeModeSwitcherProps {
  /**
   * Optional class name for custom styling
   */
  className?: string;

  /**
   * Default mode if no preference is stored
   * @default 'auto'
   */
  defaultMode?: ThemeMode;

  /**
   * Callback when mode changes
   */
  onChange?: (mode: ThemeMode) => void;

  /**
   * Show labels next to icons
   * @default false
   */
  showLabels?: boolean;

  /**
   * Variant style
   * @default 'button'
   */
  variant?: 'button' | 'toggle' | 'dropdown';
}

/**
 * Get the effective mode considering system preferences
 */
function getEffectiveMode(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'auto') {
    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }
  return mode;
}

/**
 * Apply theme mode to the document
 */
function applyThemeMode(mode: ThemeMode): void {
  if (typeof document === 'undefined') return;

  const effectiveMode = getEffectiveMode(mode);
  document.documentElement.setAttribute('data-theme-mode', effectiveMode);
}

/**
 * ThemeModeSwitcher component
 */
export function ThemeModeSwitcher({
  className = '',
  defaultMode = 'auto',
  onChange,
  showLabels = false,
  variant = 'button',
}: ThemeModeSwitcherProps): JSX.Element {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [mounted, setMounted] = useState(false);

  // Load saved preference on mount
  useEffect(() => {
    setMounted(true);

    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      const initialMode = savedMode || defaultMode;
      setMode(initialMode);
      applyThemeMode(initialMode);
    }
  }, [defaultMode]);

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyThemeMode('auto');

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode]);

  /**
   * Toggle between light, dark, and auto modes
   */
  const toggleMode = () => {
    const modes: ThemeMode[] = ['light', 'dark', 'auto'];
    const currentIndex = modes.indexOf(mode);
    const nextMode = modes[(currentIndex + 1) % modes.length];

    setMode(nextMode);
    localStorage.setItem(STORAGE_KEY, nextMode);
    applyThemeMode(nextMode);
    onChange?.(nextMode);
  };

  /**
   * Set a specific mode
   */
  const setSpecificMode = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
    applyThemeMode(newMode);
    onChange?.(newMode);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className={className} style={{ opacity: 0 }} />;
  }

  // Button variant (simple toggle)
  if (variant === 'button') {
    const Icon = mode === 'light' ? SunIcon : mode === 'dark' ? MoonIcon : AutoIcon;

    return (
      <button
        onClick={toggleMode}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-[var(--slidey-muted)] ${className}`}
        aria-label={`Switch theme mode (currently ${mode})`}
        title={`Current mode: ${mode}`}
      >
        <Icon />
        {showLabels && <span className="text-sm font-medium capitalize">{mode}</span>}
      </button>
    );
  }

  // Toggle variant (switch between light/dark only)
  if (variant === 'toggle') {
    return (
      <button
        onClick={() => setSpecificMode(mode === 'dark' ? 'light' : 'dark')}
        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
          mode === 'dark' ? 'bg-[var(--slidey-primary)]' : 'bg-[var(--slidey-muted)]'
        } ${className}`}
        aria-label={`Toggle ${mode === 'dark' ? 'light' : 'dark'} mode`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            mode === 'dark' ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    );
  }

  // Dropdown variant (select from all modes)
  return (
    <div className={`inline-flex gap-1 p-1 rounded-lg bg-[var(--slidey-muted)] ${className}`}>
      <ModeButton mode="light" currentMode={mode} onClick={() => setSpecificMode('light')} showLabels={showLabels} />
      <ModeButton mode="dark" currentMode={mode} onClick={() => setSpecificMode('dark')} showLabels={showLabels} />
      <ModeButton mode="auto" currentMode={mode} onClick={() => setSpecificMode('auto')} showLabels={showLabels} />
    </div>
  );
}

/**
 * Individual mode button for dropdown variant
 */
interface ModeButtonProps {
  mode: ThemeMode;
  currentMode: ThemeMode;
  onClick: () => void;
  showLabels: boolean;
}

function ModeButton({ mode, currentMode, onClick, showLabels }: ModeButtonProps) {
  const isActive = mode === currentMode;
  const Icon = mode === 'light' ? SunIcon : mode === 'dark' ? MoonIcon : AutoIcon;

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-[var(--slidey-background)] text-[var(--slidey-foreground)] shadow-sm'
          : 'text-[var(--slidey-muted-foreground)] hover:text-[var(--slidey-foreground)]'
      }`}
      aria-label={`Set ${mode} mode`}
      aria-pressed={isActive}
    >
      <Icon />
      {showLabels && <span className="capitalize">{mode}</span>}
    </button>
  );
}

/**
 * Icon components
 */
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function AutoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export default ThemeModeSwitcher;
