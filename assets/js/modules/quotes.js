/**
 * Quotes Module
 * Handles random quote selection and display
 */

/**
 * Display a random quote from a collection
 * @param {string} quoteSelector CSS selector for quote elements
 * @param {string} animationClass CSS class to apply for animation
 */
export function displayRandomQuote(
  quoteSelector = '.quote', 
  animationClass = 'animate-fadeIn'
) {
  // Get all available quotes
  const quotes = document.querySelectorAll(quoteSelector);
  if (!quotes.length) return;
  
  // Hide all quotes initially
  quotes.forEach(quote => {
    quote.classList.add('hidden');
    quote.setAttribute('aria-hidden', 'true');
  });
  
  // Select a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];
  
  // Display the selected quote with animation
  selectedQuote.classList.remove('hidden');
  selectedQuote.classList.add(animationClass);
  selectedQuote.setAttribute('aria-hidden', 'false');
  
  return randomIndex; // Return the selected index for potential reference
}

/**
 * Rotate through quotes at a specified interval
 * @param {string} quoteSelector CSS selector for quote elements
 * @param {number} intervalMs Time in milliseconds between quote rotations
 * @param {string} animationClass CSS class to apply for animation
 * @returns {number} The interval ID (can be used to clear the interval)
 */
export function rotateQuotes(
  quoteSelector = '.quote',
  intervalMs = 10000,
  animationClass = 'animate-fadeIn'
) {
  // Initial display
  let currentIndex = displayRandomQuote(quoteSelector, animationClass);
  const quotes = document.querySelectorAll(quoteSelector);
  if (!quotes.length) return null;
  
  // Set up interval to rotate quotes
  const intervalId = setInterval(() => {
    // Hide current quote
    quotes[currentIndex].classList.add('hidden');
    quotes[currentIndex].setAttribute('aria-hidden', 'true');
    
    // Move to next quote
    currentIndex = (currentIndex + 1) % quotes.length;
    
    // Show new quote
    quotes[currentIndex].classList.remove('hidden');
    quotes[currentIndex].classList.add(animationClass);
    quotes[currentIndex].setAttribute('aria-hidden', 'false');
  }, intervalMs);
  
  return intervalId;
}