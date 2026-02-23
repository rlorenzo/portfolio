/**
 * FAQ Module
 * Handles FAQ accordion/toggle functionality
 */

/**
 * Initialize FAQ toggle functionality
 * @param {string} toggleSelector CSS selector for FAQ toggle buttons
 * @param {string} iconSelector CSS selector for toggle icon
 * @param {string} activeClass CSS class to use for active/expanded state
 */
export function initFaqToggles(
  toggleSelector = '.faq-toggle',
  iconSelector = '.icon',
  activeClass = 'rotate-180',
) {
  const toggleButtons = document.querySelectorAll(toggleSelector);

  toggleButtons.forEach((button) => {
    // Set up event listener for each FAQ toggle
    button.addEventListener('click', () => {
      // Get the associated content (next sibling by default)
      const content = button.nextElementSibling;
      if (!content) return;

      // Toggle visibility of content
      content.classList.toggle('hidden');

      // Find and toggle the icon rotation
      const icon = button.querySelector(iconSelector);
      if (icon) {
        icon.classList.toggle(activeClass);
      }

      // Add accessibility attributes
      const isExpanded = !content.classList.contains('hidden');
      button.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');

      // Additional animation for smooth opening/closing
      if (isExpanded) {
        content.style.maxHeight = `${content.scrollHeight}px`;
        content.classList.add('opacity-100');
        content.classList.remove('opacity-0');
      } else {
        content.style.maxHeight = '0';
        content.classList.add('opacity-0');
        content.classList.remove('opacity-100');
      }
    });

    // Initialize state
    const content = button.nextElementSibling;
    if (content) {
      // Set initial state - closed by default
      button.setAttribute('aria-expanded', 'false');
    }
  });
}
