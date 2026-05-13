/**
 * Theme Manager Module
 * Two-state light/dark toggle with localStorage persistence. Icon visibility
 * is driven by the `.dark` class on <html> via CSS, not by JS.
 */

const THEME_STORAGE_KEY = 'theme';

export function getThemePreference() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
}

export function initTheme() {
  applyTheme(getThemePreference());
}
