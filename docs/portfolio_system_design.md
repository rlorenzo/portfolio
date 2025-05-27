# Portfolio Website System Design

## Implementation approach

For the professional Jekyll portfolio website with sticky navigation, back-to-top button, light/dark mode, and improved design aesthetics, I recommend the following implementation approach:

### Technology Stack
- **Jekyll 4.4.1**: Static site generator for building the portfolio website
- **Ruby 3.4 compatibility**: Ensuring the site works with modern Ruby versions
- **Tailwind CSS**: For responsive and utility-first styling with proper build optimization
- **PostCSS**: For processing CSS and applying optimizations like autoprefixer and minification
- **JavaScript**: Vanilla JS for interactive elements without framework dependencies

### Key Design Decisions

1. **Static Site Generation**
   - Jekyll provides excellent static site generation capabilities, ideal for a portfolio website
   - Content is separated from presentation using Jekyll's templating system
   - Data-driven approach with YAML files for easy content updates

2. **CSS Architecture**
   - Tailwind CSS provides a utility-first approach for rapid development
   - Custom extended theme configuration with CSS variables for theming support
   - PurgeCSS integration to eliminate unused CSS in the production build
   - Mobile-first responsive design approach

3. **Performance Optimization**
   - Optimized build process for CSS and JavaScript
   - Responsive image loading strategy
   - Deferred non-critical JavaScript loading
   - Minification and compression for production builds

4. **Interactive Features**
   - Sticky navigation with scroll position detection
   - Smooth scrolling to section anchors
   - Back-to-top button that appears after scrolling
   - Light/dark mode toggle with local storage persistence

5. **Accessibility Considerations**
   - Semantic HTML throughout the templates
   - Proper color contrast ratios
   - Keyboard navigation support
   - ARIA attributes where appropriate

### Implementation Challenges and Solutions

1. **Theme Toggle Implementation**
   - **Challenge**: Implementing a theme toggle with proper state persistence and preventing FOUC (Flash of Unstyled Content)
   - **Solution**: Combination of CSS variables, localStorage, and early theme detection script in the head

2. **Smooth Scrolling with Fixed Header**
   - **Challenge**: Ensuring smooth scrolling to sections accounts for the fixed header height
   - **Solution**: Calculate scroll offset based on dynamic header height and use scroll-padding-top

3. **CSS Optimization**
   - **Challenge**: Balancing the advantages of Tailwind with performance concerns
   - **Solution**: Implementing PurgeCSS in the build process to eliminate unused CSS

4. **Responsive Design**
   - **Challenge**: Creating a consistent experience across all device sizes
   - **Solution**: Mobile-first approach with strategic breakpoints and flexible layouts

## Data structures and interfaces

The portfolio website is structured using a component-based architecture. Below is a detailed description of the key data structures and interfaces:

### Configuration Data (`_config.yml`)

```yaml
title: Professional Portfolio
description: A showcase of my professional work and skills
author: [Author Name]
email: [Email Address]
baseurl: ""
url: "https://example.com"

# Build settings
markdown: kramdown
plugins:
  - jekyll-feed
  - jekyll-seo-tag

# Theme settings
theme_mode: auto # Options: light, dark, auto
```

### Navigation Structure (`_data/navigation.yml`)

```yaml
- title: Home
  url: "#hero"
- title: About
  url: "#about"
- title: Projects
  url: "#projects"
- title: Experience
  url: "#experience"
- title: Skills
  url: "#skills"
- title: Contact
  url: "#contact"
```

### Project Data (`_data/projects.yml`)

```yaml
- title: Project One
  description: A comprehensive web application for project management
  image: /assets/images/projects/project1.jpg
  url: https://project1.example.com
  github: https://github.com/username/project1
  technologies: [React, Node.js, MongoDB]
  featured: true
  
- title: Project Two
  description: Mobile app for tracking fitness goals
  image: /assets/images/projects/project2.jpg
  url: https://project2.example.com
  github: https://github.com/username/project2
  technologies: [Flutter, Firebase]
  featured: true
```

### Experience Data (`_data/experience.yml`)

```yaml
- company: Company ABC
  title: Senior Developer
  location: New York, NY
  period: Jan 2022 - Present
  description: Led development team in creating enterprise web applications.
  responsibilities:
    - Architected and implemented microservices architecture
    - Mentored junior developers
    - Optimized CI/CD pipeline
    
- company: Company XYZ
  title: Web Developer
  location: Boston, MA
  period: Mar 2019 - Dec 2021
  description: Full-stack development of customer-facing web applications.
  responsibilities:
    - Built responsive front-end interfaces using React
    - Developed RESTful APIs using Node.js
    - Implemented automated testing strategy
```

### Skills Data (`_data/skills.yml`)

```yaml
categories:
  - name: Frontend
    skills:
      - name: HTML/CSS
        level: 95
      - name: JavaScript
        level: 90
      - name: React
        level: 85
      - name: Vue.js
        level: 80
        
  - name: Backend
    skills:
      - name: Node.js
        level: 85
      - name: Python
        level: 80
      - name: Ruby
        level: 75
      - name: PHP
        level: 70
```

### Component Interfaces

The following interfaces define the major components of the portfolio website:

#### Site Configuration Interface

```typescript
interface SiteConfig {
  title: string;
  description: string;
  author: string;
  email: string;
  baseurl: string;
  url: string;
  theme_mode: 'light' | 'dark' | 'auto';
}
```

#### Navigation Item Interface

```typescript
interface NavigationItem {
  title: string;
  url: string;
  active?: boolean;
}
```

#### Project Interface

```typescript
interface Project {
  title: string;
  description: string;
  image: string;
  url?: string;
  github?: string;
  technologies: string[];
  featured?: boolean;
}
```

#### Experience Interface

```typescript
interface Experience {
  company: string;
  title: string;
  location: string;
  period: string;
  description: string;
  responsibilities: string[];
}
```

#### Skill Category Interface

```typescript
interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}
```

## Program call flow

The portfolio website follows a clear flow of operations, particularly for the interactive features:

### Initial Page Load

1. User requests the website
2. Jekyll serves the static HTML, CSS, and JavaScript
3. The browser parses the HTML and loads CSS and JavaScript resources
4. An early script in the head checks for theme preference in localStorage
5. The appropriate theme (light/dark) is applied before the page is fully rendered
6. The page content is displayed to the user
7. JavaScript initializes interactive elements (navigation, back-to-top button, theme toggle)

### Theme Toggle Interaction

1. User clicks the theme toggle button
2. The click event listener is triggered
3. The theme toggle function checks the current theme
4. The theme is switched (light to dark, or dark to light)
5. CSS classes are updated on the html element
6. The new theme preference is stored in localStorage
7. UI elements are updated to reflect the new theme

### Navigation Interaction

1. User clicks a navigation link
2. The click event listener prevents the default anchor behavior
3. The target section ID is extracted from the href attribute
4. The scroll position of the target section is calculated, accounting for the header height
5. The window is smoothly scrolled to the calculated position
6. The active state of navigation items is updated

### Scroll-based Interactions

1. User scrolls the page
2. The scroll event listener is triggered (throttled for performance)
3. The current scroll position is compared to thresholds
4. If scroll position > header threshold, header becomes sticky
5. If scroll position > back-to-top threshold, back-to-top button becomes visible
6. The section currently in view is determined
7. The active state of navigation items is updated accordingly

### Back-to-Top Interaction

1. User clicks the back-to-top button
2. The click event listener is triggered
3. The window is smoothly scrolled to the top of the page
4. As scrolling occurs, scroll-based interactions are triggered
5. When scroll position < back-to-top threshold, the button becomes hidden

## Optimization Strategies

### CSS Optimization

1. **PurgeCSS Implementation**
   - Configured to scan all template files for used classes
   - Removes unused CSS from the Tailwind framework
   - Significantly reduces final CSS bundle size

2. **CSS Variables for Theming**
   - Base variables defined for both light and dark themes
   - Reduces duplication and simplifies theme switching

3. **Minification for Production**
   - CSS is minified using cssnano in the production build
   - Comments and whitespace are removed
   - Optimizations are applied while preserving functionality

### JavaScript Optimization

1. **Event Delegation**
   - Used for handling multiple similar events
   - Reduces the number of event listeners

2. **Throttling/Debouncing**
   - Applied to scroll and resize event handlers
   - Prevents excessive function calls during rapid events

3. **Lazy Initialization**
   - Components are initialized only when needed
   - Reduces initial page load overhead

### Asset Optimization

1. **Responsive Images**
   - Different image sizes for different device widths
   - Proper srcset and sizes attributes
   - WebP format with fallbacks for older browsers

2. **Font Loading Strategy**
   - Font-display: swap for text visibility during font loading
   - Preload critical fonts
   - Consider system font fallbacks

3. **Resource Hints**
   - Preconnect for external resources
   - Preload for critical resources
   - Prefetch for resources needed on subsequent pages

## Anything UNCLEAR

1. **Analytics Implementation**
   - The system now includes GoatCounter analytics integration
   - GoatCounter provides privacy-focused analytics without cookies
   - GDPR compliant and doesn't require consent banners

2. **Contact Form Handling**
   - The current design mentions a contact section but does not specify form handling
   - Options include Netlify Forms, Formspree, or a custom serverless function
   - Form validation and anti-spam measures should be implemented

3. **Content Management Strategy**
   - While Jekyll provides good content management via Markdown and YAML files, the update process requires Git knowledge
   - Consider implementing a headless CMS like Forestry.io or NetlifyCMS for easier content updates
   - Document the content update process for non-technical users

4. **Performance Metrics and Targets**
   - Specific performance targets (e.g., Lighthouse scores, Core Web Vitals metrics) should be defined
   - Implement monitoring to track performance metrics over time
   - Create a performance budget for the website