# Implementing GoatCounter Analytics: Setup Guide

## Overview

This guide explains how to implement GoatCounter, a lightweight, privacy-focused, cookie-free analytics solution for your portfolio website. GoatCounter provides essential visitor metrics without requiring cookie consent banners, making it an ideal choice for privacy-conscious websites.

## Why GoatCounter?

### Comparison: GoatCounter vs. Cloudflare Web Analytics

| Feature | GoatCounter | Cloudflare Web Analytics |
|---------|-------------|---------------------------|
| **Cost** | Free for personal use (<100K pageviews/month) | 100% Free (no limits) |
| **Cookie Usage** | No cookies | No cookies |
| **Privacy** | High (EU-based) | High (anonymous data) |
| **Self-hosting** | Yes (open source) | No |
| **Data Control** | Full access to raw data | Limited dashboard only |
| **API Access** | Yes | No |
| **Data Retention** | Unlimited | 6 months |
| **Real-time Data** | Updates every few minutes | Near real-time |

### Advantages of GoatCounter

- **Open source** with transparent data handling
- **Lightweight script** (~3KB) minimizing page load impact
- **No cookies or user tracking** - fully GDPR compliant without consent banners
- **Data ownership** - export your data anytime
- **Customizable** with API access
- **Self-hosting option** for complete control

## Implementation Steps

### Step 1: Sign Up for GoatCounter

1. Visit [GoatCounter](https://www.goatcounter.com/)
2. Click "Sign Up" and create a free account
3. Choose a subdomain (e.g., `myportfolio.goatcounter.com`)
4. Complete the registration process

### Step 2: Add GoatCounter to Your Jekyll Portfolio

#### Option 1: Add to Head/Footer Include

The recommended approach is adding the GoatCounter script to your site's footer.

1. Open your `_includes/footer.html` file
2. Add the following code just before the closing `</footer>` tag:

```html
<!-- GoatCounter Analytics - Privacy-friendly, cookie-free analytics -->
<script data-goatcounter="https://YOUR-CODE.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

Replace `YOUR-CODE` with your actual GoatCounter subdomain.

#### Option 2: Create a Dedicated Analytics Include

For better organization, you can create a dedicated analytics include:

1. Create a new file: `_includes/analytics.html`
2. Add the following code to the file:

```html
{% if jekyll.environment == "production" %}
<!-- GoatCounter Analytics - Privacy-friendly, cookie-free analytics -->
<script data-goatcounter="https://YOUR-CODE.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
{% endif %}
```

3. In your `_layouts/default.html`, add this line just before the closing `</body>` tag:

```html
{% include analytics.html %}
```

This approach allows analytics to be included only in production builds, keeping your development environment clean.

### Step 3: Exclude Your Own Visits (Optional)

To prevent your own visits from skewing your analytics data:

1. Create a file `assets/js/analytics-exclude.js` with the following code:

```javascript
/* Exclude your own visits from GoatCounter analytics */
document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('goatcounter-exclude') !== 't') {
    var shouldExclude = confirm('Exclude your visits from GoatCounter analytics?');
    if (shouldExclude) {
      localStorage.setItem('goatcounter-exclude', 't');
      console.log('Your visits will be excluded from GoatCounter analytics.');
    }
  }
});
```

2. Add a reference to this script in your `_includes/analytics.html` or directly in your layout file:

```html
{% if jekyll.environment == "production" %}
<script src="{{ '/assets/js/analytics-exclude.js' | relative_url }}"></script>
{% endif %}
```

### Step 4: Advanced Configuration (Optional)

#### Track Outbound Links

To track clicks on outbound links (links to external websites):

1. Create a file `assets/js/goatcounter-outbound.js` with the following code:

```javascript
/* Track outbound link clicks in GoatCounter */
document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('click', function(e) {
    var target = e.target;
    while (target && target.tagName !== 'A') {
      target = target.parentNode;
      if (!target) return;
    }
    
    // Check if it's an external link
    if (target.host !== window.location.host) {
      if (window.goatcounter && typeof window.goatcounter.count === 'function') {
        window.goatcounter.count({
          path: target.href,
          title: 'Outbound: ' + target.href,
          event: true
        });
      }
    }
  });
});
```

2. Add a reference to this script in your layout file:

```html
<script src="{{ '/assets/js/goatcounter-outbound.js' | relative_url }}"></script>
```

#### Track File Downloads

To track clicks on downloadable files:

```javascript
/* Track file downloads in GoatCounter */
document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('click', function(e) {
    var target = e.target;
    while (target && target.tagName !== 'A') {
      target = target.parentNode;
      if (!target) return;
    }
    
    // Check if it's a file download (adjust file types as needed)
    var fileExtensions = /(pdf|docx?|xlsx?|zip|rar|gz|tar|7z)$/i;
    if (target.href && target.href.match(fileExtensions)) {
      if (window.goatcounter && typeof window.goatcounter.count === 'function') {
        window.goatcounter.count({
          path: target.href,
          title: 'Download: ' + target.href.split('/').pop(),
          event: true
        });
      }
    }
  });
});
```

### Step 5: Verify Implementation

1. Build and deploy your Jekyll site
2. Visit your website (ensure you haven't chosen to exclude your visits)
3. Wait ~30 seconds for data to appear
4. Visit your GoatCounter dashboard at `https://YOUR-CODE.goatcounter.com`
5. Confirm that your visit appears in the analytics

## Accessing Your Analytics

After implementation, you can access your analytics dashboard at:

`https://YOUR-CODE.goatcounter.com`

The dashboard provides insights including:

- Total pageviews and unique visitors
- Traffic sources and referrers
- Popular pages and content
- Visitor locations (countries)
- Browsers and devices used
- Visit times and patterns

## Troubleshooting

### No Data Appearing?

1. **Script Placement**: Ensure the script is properly inserted in your HTML
2. **Ad Blockers**: Some privacy extensions may block GoatCounter domains
3. **Jekyll Environment**: If using the conditional include, ensure `JEKYLL_ENV=production` is set when building
4. **Excluded Visits**: Check if you've enabled the visit exclusion feature

### Browser Console Errors

If you see errors related to GoatCounter in your browser console:

1. Check your GoatCounter code/subdomain for typos
2. Ensure the script is loading (check Network tab in dev tools)
3. Verify your account is active by logging into GoatCounter

## Conclusion

With GoatCounter successfully implemented, you now have privacy-friendly analytics for your portfolio website without requiring cookie consent banners. The lightweight implementation ensures your site performance remains optimized while providing valuable visitor insights.

For more advanced configurations, visit the [GoatCounter documentation](https://www.goatcounter.com/help).