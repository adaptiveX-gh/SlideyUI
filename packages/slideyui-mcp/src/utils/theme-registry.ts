/**
 * Theme Registry
 *
 * Manages custom theme storage and retrieval for the MCP server.
 * Themes are stored in-memory for the duration of the conversation.
 */

import type { CustomTheme } from '../schema/index.js';

/**
 * In-memory theme storage
 * Key: theme name, Value: CustomTheme object
 */
const themeRegistry = new Map<string, CustomTheme>();

/**
 * Register a custom theme
 *
 * @param theme - Custom theme to register
 * @throws Error if theme with same name already exists
 *
 * @example
 * registerTheme({
 *   name: "acme-corp",
 *   displayName: "ACME Corporation",
 *   colors: { primary: "#FF5733", ... }
 * });
 */
export function registerTheme(theme: CustomTheme): void {
  if (themeRegistry.has(theme.name)) {
    throw new Error(
      `Theme "${theme.name}" already exists. Use a different name or clear the registry first.`
    );
  }

  themeRegistry.set(theme.name, theme);
}

/**
 * Get a custom theme by name
 *
 * @param name - Theme name
 * @returns CustomTheme if found, undefined otherwise
 *
 * @example
 * const theme = getTheme("acme-corp");
 * if (theme) {
 *   console.log(theme.colors.primary);
 * }
 */
export function getTheme(name: string): CustomTheme | undefined {
  return themeRegistry.get(name);
}

/**
 * Check if a theme exists in the registry
 *
 * @param name - Theme name
 * @returns true if theme exists, false otherwise
 *
 * @example
 * if (hasTheme("acme-corp")) {
 *   console.log("Theme exists!");
 * }
 */
export function hasTheme(name: string): boolean {
  return themeRegistry.has(name);
}

/**
 * Get all registered custom themes
 *
 * @returns Array of all custom themes
 *
 * @example
 * const allThemes = getAllCustomThemes();
 * allThemes.forEach(theme => {
 *   console.log(`${theme.displayName}: ${theme.colors.primary}`);
 * });
 */
export function getAllCustomThemes(): CustomTheme[] {
  return Array.from(themeRegistry.values());
}

/**
 * Clear all custom themes from the registry
 * Useful for testing or resetting the conversation state
 *
 * @example
 * clearThemes(); // Removes all custom themes
 */
export function clearThemes(): void {
  themeRegistry.clear();
}

/**
 * Get the number of registered themes
 *
 * @returns Number of themes in registry
 *
 * @example
 * const count = getThemeCount();
 * console.log(`${count} custom themes registered`);
 */
export function getThemeCount(): number {
  return themeRegistry.size;
}

/**
 * Update an existing theme
 *
 * @param theme - Updated theme object
 * @throws Error if theme doesn't exist
 *
 * @example
 * updateTheme({
 *   name: "acme-corp",
 *   displayName: "ACME Corporation (Updated)",
 *   colors: { primary: "#FF5733", ... }
 * });
 */
export function updateTheme(theme: CustomTheme): void {
  if (!themeRegistry.has(theme.name)) {
    throw new Error(
      `Theme "${theme.name}" does not exist. Use registerTheme() to create it first.`
    );
  }

  themeRegistry.set(theme.name, theme);
}

/**
 * Remove a theme from the registry
 *
 * @param name - Theme name to remove
 * @returns true if theme was removed, false if it didn't exist
 *
 * @example
 * const removed = removeTheme("acme-corp");
 * console.log(removed ? "Theme removed" : "Theme not found");
 */
export function removeTheme(name: string): boolean {
  return themeRegistry.delete(name);
}
