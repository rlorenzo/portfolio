# Personal Portfolio Website with Jekyll

A modern, responsive personal portfolio website built with Jekyll and
Tailwind CSS, designed for easy deployment on GitHub Pages.

**Live site:** <https://rlorenzo.github.io/portfolio>

## Features

- 📱 Responsive design using Tailwind CSS
- 🎯 8 customizable sections (Hero, About, Projects, Experience, etc.)
- 📝 Content management through YAML files
- 🔄 Interactive components (FAQ accordion, random quotes)
- 🖼️ Optimized image handling
- 🚀 GitHub Pages compatible

## Directory Structure

```text
.
├── _config.yml        # Site configuration
├── _data/             # Content in YAML format
│   ├── experience.yml  # Work experience entries
│   ├── faq.yml        # FAQ questions and answers
│   ├── navigation.yml  # Navigation menu items
│   ├── presentations.yml # Presentation entries
│   ├── projects.yml    # Project showcases
│   └── quotes.yml      # Testimonial quotes
├── _includes/         # Reusable components
│   ├── head.html      # Document head content
│   ├── header.html    # Site header/navigation
│   ├── footer.html    # Site footer
│   └── sections/      # Page sections
├── _layouts/          # Page layouts
│   ├── default.html   # Base layout
│   └── home.html      # Home page layout
├── assets/            # Site assets
│   ├── css/          # CSS files
│   │   └── tailwind.css  # Generated Tailwind CSS
│   ├── favicon/      # Favicon files
│   ├── js/           # JavaScript files
├── src/              # Source files
│   └── tailwind.css  # Tailwind CSS source
└── public/           # Public assets
    └── assets/       # Static files
        └── images/   # Image files
```

## Setup Instructions

### Prerequisites

- [Homebrew](https://brew.sh/) (for macOS users)
- [Node.js](https://nodejs.org/) (14.x or newer)
- [Ruby](https://www.ruby-lang.org/en/) (3.3.0 or newer)

### Installation

1. Install Ruby using Homebrew (for macOS users):

   ```bash
   brew install ruby
   ```

2. Add Homebrew Ruby to your path (for zsh):

   ```bash
   echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

3. Verify your Ruby installation:

   ```bash
   ruby -v    # Should show the Ruby version
   ```

4. Install Jekyll and Bundler:

   ```bash
   gem install jekyll bundler
   ```

5. Clone this repository:

   ```bash
   git clone https://github.com/rlorenzo/rlorenzo.github.io.git
   cd rlorenzo.github.io
   ```

6. Install all dependencies (both npm and bundle) with a single command:

   ```bash
   npm run setup
   ```

   This command runs both `npm install` and `bundle install`.

7. Start the development server with both CSS building and Jekyll:

   ```bash
   npm run dev
   ```

   This command concurrently runs the Tailwind CSS watcher and Jekyll server.

8. Visit `http://localhost:4000/portfolio` in your browser

## Analytics

### GoatCounter Setup

This site uses GoatCounter for privacy-friendly analytics without cookies.
To set up GoatCounter:

1. Create a free account at [GoatCounter.com](https://www.goatcounter.com/)
2. After signing up, you'll get a site code (e.g., "yourname")
3. Update `_config.yml` with your site code:

   ```yaml
   goatcounter_code: "yourname" # Replace with your actual GoatCounter site code
   ```

4. Deploy your site - the tracking script will be automatically included

Benefits of GoatCounter:

- Privacy-focused analytics (no cookies, GDPR compliant)
- No need for cookie consent banners
- Simple dashboard with key metrics
- Free for personal use and small sites

## Content Management

### Modifying Content

All content is stored in YAML files in the `_data` directory:

1. **Experience** (`_data/experience.yml`):

   ```yaml
   - title: Job Title
     company: Company Name
     dates: Date Range
     highlights:
       - Achievement 1
       - Achievement 2
   ```

2. **Projects** (`_data/projects.yml`):

   ```yaml
   - name: Project Name
     description: Project Description
     tech_stack:
       - Technology 1
       - Technology 2
     github_link: https://github.com/...
   ```

3. **Presentations** (`_data/presentations.yml`):

   ```yaml
   - title: Presentation Title
     date: YYYY-MM-DD
     embed_url: https://docs.google.com/.../embed
     description: Presentation Description
   ```

4. **FAQ** (`_data/faq.yml`):

   ```yaml
   - question: Your Question?
     answer: Your Answer
   ```

5. **Quotes** (`_data/quotes.yml`):

   ```yaml
   - text: Quote Text
     author: Author Name
     position: Author Position
   ```

### Adding New Sections

1. Create a new section template in `_includes/sections/`
2. Add corresponding data file in `_data/` if needed
3. Include the section in `_layouts/home.html`

## Customization

### Tailwind CSS

Modify Tailwind CSS settings in `tailwind.config.js` or source styles in
`src/tailwind.css`. The project uses Tailwind CSS utility classes for styling.

Common customizations:

```js
// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',  // Change primary color
        secondary: '#1e40af'  // Change secondary color
      }
    }
  }
  // ...
}
```

## Deployment to GitHub Pages

1. Create a new repository on GitHub

2. Update `_config.yml`:

   ```yaml
   baseurl: "/portfolio"  # Repository name
   url: "https://rlorenzo.github.io"  # GitHub Pages URL
   ```

3. Push your code to GitHub:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/rlorenzo/rlorenzo.github.io.git
   git push -u origin main
   ```

4. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to "Pages" section
   - Select "main" branch and "/root" folder
   - Click "Save"

5. Your site will be available at `https://rlorenzo.github.io/portfolio`

## Local Development

### Build Commands

- **Development Mode**: `npm run dev` - Starts both the Tailwind CSS watcher
  and Jekyll server concurrently
- **Build CSS Only**: `npm run build:css` - Builds the Tailwind CSS file once
- **Watch CSS Only**: `npm run watch:css` - Watches and rebuilds CSS when
  source files change
- **Jekyll Server Only**: `npm run serve` - Runs only the Jekyll server
  without CSS processing
- **Production Build**: `npm run build` - Builds both CSS and Jekyll site
  for production

### Notes

- Changes to `_config.yml` require server restart
- Content changes in `_data/*.yml` files are reloaded automatically
- CSS changes are automatically processed when using `npm run dev`
- When adding new Tailwind classes, the CSS will be rebuilt automatically

## Linting and Code Quality

This project includes several linting tools to maintain code quality:

- ESLint for JavaScript
- Stylelint for CSS/SCSS
- HTMLHint for HTML
- markdownlint for Markdown

### Setup Linting Tools

1. Install Node.js dependencies:

   ```bash
   npm install
   ```

2. Run linters:

   ```bash
   npm run lint
   ```

3. Fix auto-fixable issues:

   ```bash
   npm run fix
   ```

### VS Code Integration

This project includes VS Code settings for automatic linting on save.
Install the recommended extensions when prompted or from the Extensions view.

### GitHub Actions

Linting checks run automatically on push and pull requests via GitHub Actions
workflows.

## Troubleshooting

### Ruby 3.4.0+ Compatibility

If you're using Ruby 3.4.0 or newer, you might encounter warnings or errors
about missing standard libraries. This is because Ruby 3.4.0+ no longer
includes certain libraries as default gems. The Gemfile has been updated to
include these dependencies and support Ruby 3.4.x:

```ruby
# Add explicit dependencies for Ruby 3.4.0+ compatibility
gem "logger"
gem "csv"
gem "bigdecimal"

# Specify compatible Ruby version
ruby ">= 3.3.0", :optional => true
```

If you encounter errors related to missing gems when running Jekyll:

```bash
# Make sure your bundle is up to date
bundle update
```

### Other Common Issues

- If Bundler fails, try `gem update bundler`
- For Jekyll build errors, check `_config.yml` syntax
- For CSS issues, ensure Tailwind is properly imported
- For linting errors, run `npm run fix` to auto-fix issues

### Ruby Version Management

If you continue experiencing issues with Ruby 3.4.0, consider using a Ruby
version manager like `rbenv` or `rvm` to install and use Ruby 3.3.0 for
Jekyll projects:

```bash
# Using rbenv
rbenv install 3.3.0
rbenv local 3.3.0

# Using rvm
rvm install 3.3.0
rvm use 3.3.0
```

## License

This project is open source and available under the MIT License.

## Support

For issues and feature requests, please create an issue in the GitHub
repository.
