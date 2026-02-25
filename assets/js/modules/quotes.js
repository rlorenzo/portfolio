/**
 * Quotes Module
 * Handles quote rotation and dot indicator display
 */

/**
 * Rotate through quotes at a specified interval
 * @param {string} quoteSelector CSS selector for quote elements
 * @param {number} intervalMs Time in milliseconds between quote rotations
 * @returns {number} The interval ID (can be used to clear the interval)
 */
export function rotateQuotes(quoteSelector = '.quote', intervalMs = 10000) {
  const quotes = document.querySelectorAll(quoteSelector);
  if (!quotes.length) return null;

  const dots = document.querySelectorAll('.quote-dot');

  function updateDots(activeIndex) {
    dots.forEach((dot, i) => {
      if (i === activeIndex) {
        dot.classList.remove('bg-gray-300', 'dark:bg-gray-600');
        dot.classList.add('bg-primary');
      } else {
        dot.classList.remove('bg-primary');
        dot.classList.add('bg-gray-300', 'dark:bg-gray-600');
      }
    });
  }

  // Initialize: position all quotes and show a random one
  let currentIndex = Math.floor(Math.random() * quotes.length);
  quotes.forEach((quote, index) => {
    if (index === currentIndex) {
      quote.style.position = 'relative';
      quote.style.opacity = '1';
      quote.style.transform = 'translateX(0)';
      quote.setAttribute('aria-hidden', 'false');
    } else {
      quote.style.position = 'absolute';
      quote.style.opacity = '0';
      quote.style.transform = 'translateX(100%)';
      quote.setAttribute('aria-hidden', 'true');
    }
  });
  updateDots(currentIndex);

  // Set up interval to rotate quotes
  const intervalId = setInterval(() => {
    const currentQuote = quotes[currentIndex];

    // Slide current quote out to the left
    currentQuote.style.opacity = '0';
    currentQuote.style.transform = 'translateX(-100%)';

    // After slide out completes, position it off screen and show next
    setTimeout(() => {
      currentQuote.style.position = 'absolute';
      currentQuote.setAttribute('aria-hidden', 'true');

      // Move to next quote
      currentIndex = (currentIndex + 1) % quotes.length;
      const nextQuote = quotes[currentIndex];

      // Prepare next quote to slide in from the right
      nextQuote.style.position = 'relative';
      nextQuote.style.transform = 'translateX(100%)';
      nextQuote.style.opacity = '0';
      nextQuote.setAttribute('aria-hidden', 'false');

      updateDots(currentIndex);

      // Trigger slide in from right after a small delay
      requestAnimationFrame(() => {
        nextQuote.style.opacity = '1';
        nextQuote.style.transform = 'translateX(0)';
      });
    }, 500); // Match the CSS transition duration
  }, intervalMs);

  return intervalId;
}
