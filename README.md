# Personal Portfolio Website with Jekyll

A modern, responsive personal portfolio website built with Jekyll and Tailwind CSS, designed for easy deployment on GitHub Pages.

**Live site:** https://rlorenzo.github.io/portfolio

## Features

- 📱 Responsive design using Tailwind CSS
- 🎯 8 customizable sections (Hero, About, Projects, Experience, etc.)
- 📝 Content management through YAML files
- 🔄 Interactive components (FAQ accordion, random quotes)
- 🖼️ Optimized image handling
- 🚀 GitHub Pages compatible

## Directory Structure

```
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
│   └── css/          # CSS files
│       └── main.scss  # Main stylesheet
└── public/           # Public assets
    └── assets/       # Static files
        └── images/   # Image files
```

## Setup Instructions

### Prerequisites

- [Homebrew](https://brew.sh/) (for macOS users)

### Installation

1. Install Ruby using Homebrew:
   ```bash
   brew install ruby
   ```

2. Add Homebrew Ruby to your path (for zsh):
   ```bash
   echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

3. Verify Homebrew Ruby installation:
   ```bash
   which ruby  # Should show /usr/local/opt/ruby/bin/ruby
   ruby -v    # Should show the latest Ruby version
   ```

4. Install Jekyll and Bundler:
   ```bash
   gem install jekyll bundler
   ```

5. Clone this repository:
   ```bash
   git clone https://github.com/rlorenzo/portfolio.git
   cd portfolio
   ```

6. Install project dependencies:
   ```bash
   bundle config set --local path 'vendor/bundle'
   bundle install
   ```

7. Start the development server:
   ```bash
   bundle exec jekyll serve
   ```

8. Visit `http://127.0.0.1:4000/portfolio/` in your browser

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

Modify styles in `assets/css/main.scss`. The project uses Tailwind CSS utility classes for styling.

Common customizations:

```scss
// assets/css/main.scss
// Override Tailwind default colors
$primary-color: #3b82f6;  // Change primary color
$secondary-color: #1e40af;  // Change secondary color
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
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

4. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to "Pages" section
   - Select "main" branch and "/root" folder
   - Click "Save"

5. Your site will be available at `https://username.github.io/repo-name`

## Local Development

- Run `bundle exec jekyll serve` for local development
- Changes to `_config.yml` require server restart
- Content changes in `_data/*.yml` files are reloaded automatically

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

This project includes VS Code settings for automatic linting on save. Install the recommended extensions when prompted or from the Extensions view.

### GitHub Actions

Linting checks run automatically on push and pull requests via GitHub Actions workflows.

## Troubleshooting

### Ruby 3.4.0+ Compatibility

If you're using Ruby 3.4.0 or newer, you might encounter warnings or errors about missing standard libraries. This is because Ruby 3.4.0+ no longer includes certain libraries as default gems. The Gemfile has been updated to include these dependencies and support Ruby 3.4.x:

```ruby
# Add explicit dependencies for Ruby 3.4.0+ compatibility
gem "logger"
gem "csv"

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

If you continue experiencing issues with Ruby 3.4.0, consider using a Ruby version manager like `rbenv` or `rvm` to install and use Ruby 3.3.0 for Jekyll projects:

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

For issues and feature requests, please create an issue in the GitHub repository.