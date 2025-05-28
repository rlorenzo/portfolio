/**
 * Theme Manager Module
 * Handles theme management, preferences, and switching functionality
 */

// Constants
const THEME_STORAGE_KEY = 'theme';
const THEME_OPTIONS = ['light', 'dark', 'auto'];

/**
 * Get the user's theme preference
 * Checks localStorage first, then falls back to auto theme
 * @returns {string} The theme preference ('light', 'dark', or 'auto')
 */
export function getThemePreference() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme && THEME_OPTIONS.includes(savedTheme) ? savedTheme : 'auto';
}

/**
 * Update theme toggle icons based on current theme
 * @param {string} theme The current theme ('light', 'dark', or 'auto')
 */
function updateThemeIcons(theme) {
  // Desktop theme toggle icons
  const lightIcon = document.getElementById('theme-icon-light');
  const darkIcon = document.getElementById('theme-icon-dark');

  // Mobile theme toggle icons
  const lightIconMobile = document.getElementById('theme-icon-light-mobile');
  const darkIconMobile = document.getElementById('theme-icon-dark-mobile');

  const isDark = theme === 'dark' ||
                (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Update desktop icons if they exist
  if (lightIcon && darkIcon) {
    if (isDark) {
      lightIcon.classList.remove('hidden');
      lightIcon.classList.add('text-gray-50'); // Light color for dark mode
      lightIcon.style.display = '';
      lightIcon.style.color = '#f9fafb'; // Inline style as backup
      darkIcon.classList.add('hidden');
      darkIcon.style.display = 'none';
    } else {
      lightIcon.classList.add('hidden');
      lightIcon.style.display = 'none';
      darkIcon.classList.remove('hidden');
      darkIcon.style.display = '';
    }
  }

  // Update mobile icons if they exist
  if (lightIconMobile && darkIconMobile) {
    if (isDark) {
      lightIconMobile.classList.remove('hidden');
      lightIconMobile.style.display = '';
      darkIconMobile.classList.add('hidden');
      darkIconMobile.style.display = 'none';
    } else {
      lightIconMobile.classList.add('hidden');
      lightIconMobile.style.display = 'none';
      darkIconMobile.classList.remove('hidden');
      darkIconMobile.style.display = '';
    }
  }
}

/**
 * Apply a theme to the document
 * @param {string} theme The theme to apply ('light', 'dark', or 'auto')
 */
export function applyTheme(theme) {
  // Remove all theme classes
  document.documentElement.classList.remove('light-theme', 'dark-theme', 'auto-theme');

  // Add the new theme class
  document.documentElement.classList.add(`${theme}-theme`);

  // Store the theme preference
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  // Apply dark mode class for styling
  if (theme === 'auto') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } else if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Update the theme toggle icons
  updateThemeIcons(theme);

  // Dispatch an event to notify other components of theme change
  const themeChangeEvent = new CustomEvent('themeChanged', { detail: { theme } });
  document.dispatchEvent(themeChangeEvent);
}

/**
 * Toggle between themes (light → dark → auto → light)
 */
export function toggleTheme() {
  const currentTheme = getThemePreference();
  const currentIndex = THEME_OPTIONS.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % THEME_OPTIONS.length;
  applyTheme(THEME_OPTIONS[nextIndex]);
}

/**
 * Initialize theme system
 * Sets up event listeners for OS theme changes
 */
export function initTheme() {
  // Apply initial theme
  applyTheme(getThemePreference());

  // Listen for OS theme changes if using auto theme
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getThemePreference() === 'auto') {
      applyTheme('auto');
    }
  });
}