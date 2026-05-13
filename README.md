# Personal Portfolio Website with Jekyll

A modern, responsive personal portfolio website built with Jekyll and
plain CSS, designed for easy deployment on GitHub Pages.

**Live site:** <https://rlorenzo.github.io/portfolio>

## Features

- 📱 Responsive design with plain CSS and CSS custom properties
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
│   │   └── styles.css    # CSS source
│   ├── favicon/      # Favicon files
│   ├── js/           # JavaScript files
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
   git clone https://github.com/rlorenzo/portfolio.git
   cd portfolio
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

   This command builds the CSS, then concurrently watches for CSS changes and serves Jekyll.

8. Visit `http://localhost:4000/portfolio` in your browser

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

### CSS

All styles live in `assets/css/styles.css`. Design tokens (colors, fonts, transitions)
are defined as CSS custom properties in the `@layer base` block at the top of the file.
Dark mode tokens are on the `.dark` selector in the same block.

## Deployment to GitHub Pages

This site uses Jekyll 4.4.1 which requires GitHub Actions for deployment
(GitHub Pages only supports Jekyll 3.10.0 by default).

### Deployment Steps

1. **Create a GitHub repository:**
   - Repository can be named anything (e.g., `portfolio`, `my-website`, etc.)
   - Current configuration uses `baseurl: "/portfolio"` for project-style deployment

2. **Push your code to GitHub:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPOSITORY_NAME.git
   git push -u origin main
   ```

3. **Enable GitHub Pages with Actions:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The deployment workflow is already configured in `.github/workflows/deploy.yml`

4. **Access your live site:**
   - Your site will be available at: `https://USERNAME.github.io/REPOSITORY_NAME`
   - Example: `https://rlorenzo.github.io/portfolio`

### How It Works

The GitHub Actions workflow automatically:

- Minifies CSS with csskit
- Builds the Jekyll site with production settings
- Deploys to GitHub Pages on every push to main branch

### Troubleshooting

- Check the **Actions** tab in your GitHub repository for build logs
- Ensure your repository is public (or you have GitHub Pro for private repos)
- Verify the GitHub Pages source is set to "GitHub Actions"

## Local Development

### Build Commands

- **Development Mode**: `npm run dev` - Builds CSS, then watches for changes
  and serves Jekyll concurrently
- **Build CSS Only**: `npm run build:css` - Minifies CSS once via csskit
- **Watch CSS Only**: `npm run watch:css` - Watches and re-minifies CSS on change
- **Jekyll Server Only**: `npm run serve` - Runs only the Jekyll server
- **Production Build**: `npm run build` - Minifies CSS, bundles JS, and builds
  Jekyll site for production

### Notes

- Changes to `_config.yml` require server restart
- Content changes in `_data/*.yml` files are reloaded automatically
- CSS changes are automatically re-minified when using `npm run dev`

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

### Pre-commit Hook

This project uses **Husky** and **lint-staged** for automated pre-commit linting:

- **CSS/SCSS linting** with Stylelint (auto-fix enabled)
- **JavaScript linting** with ESLint (auto-fix enabled)
- **Markdown linting** with markdownlint (auto-fix enabled)

#### Setup and Installation

The pre-commit hook is **automatically installed** when you run `npm install` (via the `prepare` script).

**Features:**

- Only lints and fixes files that are staged for commit
- Automatically fixes issues when possible
- Rejects commits if unfixable linting errors remain
- Handles CI/CD environments gracefully
- Cross-platform compatible (Windows, macOS, Linux)

**To bypass the hook** (not recommended):

```bash
git commit --no-verify
```

### GitHub Actions

Linting checks also run automatically on push and pull requests via GitHub Actions
workflows.

## Visual Regression Testing

This project uses [Playwright](https://playwright.dev/) for visual regression
testing to verify that changes don't break the site's appearance.

Tests automatically start the dev server via Playwright's `webServer` configuration:

```bash
npm test               # Run all Playwright tests (including visual regression)
```

Baseline screenshots are stored in `tests/screenshots/baseline/` and cover
full page (light and dark mode) and individual sections.

To update baselines after intentional visual changes:

```bash
npx playwright test --update-snapshots
```

## Development Troubleshooting

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
- For CSS issues, run `npm run build:css` to regenerate `assets/css/styles.min.css`
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
