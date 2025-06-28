/**
 * Main JavaScript file
 * Initializes and coordinates modules for the portfolio website
 */

import { initTheme, applyTheme, getThemePreference } from './modules/theme.js';
import { 
  initStickyHeader, 
  initBackToTopButton, 
  initMobileMenu, 
  initScrollSpy 
} from './modules/navigation.js';
import { 
  initAOS, 
  setupEntranceAnimations, 
  animateSkillBars 
} from './modules/animations.js';
import { throttle } from './modules/utils.js';
import { initFaqToggles } from './modules/faq.js';
import { displayRandomQuote, rotateQuotes } from './modules/quotes.js';
import { initSmoothScrolling } from './modules/smoothscroll.js';

document.addEventListener('DOMContentLoaded', function() {
  // Cache DOM elements
  const header = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('back-to-top');
  const mobileMenuBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  
  // Initialize theme system
  initTheme();
  
  // Set up theme toggle buttons - simple light/dark toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = getThemePreference();
      // Simple toggle: light ↔ dark (remove auto state)
      const nextTheme = (currentTheme === 'dark') ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }
  
  if (themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener('click', () => {
      const currentTheme = getThemePreference();
      // Simple toggle: light ↔ dark (remove auto state)  
      const nextTheme = (currentTheme === 'dark') ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Initialize navigation components with throttled scroll events
  initStickyHeader(header);
  initBackToTopButton(backToTopBtn, 300);
  initMobileMenu(mobileMenuBtn, mobileMenu);
  initScrollSpy('.nav-link', 'active');
  
  // Initialize animations
  initAOS({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 50
  });
  
  // Animate skill bars when they come into view
  animateSkillBars();
  
  // Set up entrance animations for elements without AOS
  setupEntranceAnimations('.animate-on-scroll');
  
  // Initialize FAQ toggles
  initFaqToggles('.faq-toggle');
  
  // Rotate testimonial quotes every 8 seconds
  rotateQuotes('.quote', 8000, 'animate-fadeIn');
  
  // Initialize smooth scrolling for anchor links
  initSmoothScrolling('a[href^="#"]', '#site-header');
  
  // Handle responsive behavior
  const handleResize = throttle(() => {
    // Handle any responsive adjustments here
    if (window.innerWidth >= 1024) { // lg breakpoint in Tailwind
      mobileMenu.classList.add('hidden');
    }
  }, 100);
  
  window.addEventListener('resize', handleResize);
  
  // Add support for print mode
  window.addEventListener('beforeprint', () => {
    document.documentElement.classList.add('print-mode');
  });
  
  window.addEventListener('afterprint', () => {
    document.documentElement.classList.remove('print-mode');
  });
});