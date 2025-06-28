/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/**/*.{html,js,md}',
    './_layouts/**/*.{html,js,md}',
    './_posts/**/*.{html,js,md}',
    './*.html',
    './assets/js/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        success: 'var(--success-color)',
        warning: 'var(--warning-color)',
        danger: 'var(--danger-color)',
        info: 'var(--info-color)',
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'border-color': 'var(--border-color)'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif']
      },
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'normal': 'var(--transition-normal)',
        'slow': 'var(--transition-slow)'
      }
    }
  },
  plugins: [],
  safelist: [
    'text-primary',
    'text-secondary', 
    'text-accent',
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'bg-bg-primary',
    'bg-bg-secondary',
    'text-text-primary',
    'text-text-secondary',
    'border-border-color',
    'animate-fadeIn',
    'animate-fadeInUp',
    'animate-slideOutLeft',
    'animate-slideInRight',
    'quote-transition',
    'nav-link',
    'btn',
    'btn-primary',
    'btn-outline',
    'card',
    'card-hover',
    'section',
    'section-title',
    'theme-switch'
  ]
};