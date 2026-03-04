# Twig Base

A lightweight PHP/Twig starter template for building static HTML markup with a component-based block system. Designed as a starting point for frontend development projects, with conventions that allow seamless migration to WordPress themes.

## Features

- **PHP/Twig templating** with automatic file-based routing
- **Block component system** for reusable, self-contained content sections
- **Dynamic CSS loading** — block-specific styles are injected only when the block is used
- **Responsive layout** with mobile navigation (hamburger menu)
- **Fixed header** with scroll-triggered show/hide via Headroom.js
- **GDPR cookie consent** popup with expandable description
- **Rich text formatting** class (`.typo`) for structured content
- **SCSS architecture** with variables, mixins, animations, and a CSS reset
- **WordPress-compatible** class names and markup patterns
- **Debug utilities** (`pr()`, `write_log()`)
- **HTML minification** (optional)
- **Cache-busting** via versioned asset URLs
- **SVG sprite** support
- **Complete favicon/PWA icon set**

## Requirements

- PHP 8.3+
- Composer
- [Prepros](https://prepros.io/) (for SCSS/JS compilation)

## Installation

```bash
composer install
```

Point your local server (e.g. Laravel Herd, MAMP, XAMPP) to the project root.

## Directory Structure

```
twig-base/
├── core/                     # PHP application logic
│   ├── init.php              # Constants, helpers, bootstrapping
│   └── includes/
│       ├── twig.php          # Twig setup, context builder, rendering
│       ├── router.php        # URL routing & page resolution
│       └── render.php        # Template rendering
├── assets/
│   ├── scss/                 # SCSS source files
│   │   ├── _variables.scss   # CSS custom properties (colors, sizes, fonts)
│   │   ├── _mixins.scss      # Cross-browser prefixing & utility mixins
│   │   ├── _reset.scss       # CSS reset (normalize)
│   │   ├── _animation.scss   # Keyframe animations (fadeIn, slideUp)
│   │   ├── _wp.scss          # WordPress alignment classes
│   │   ├── _extend.scss      # .typo, .btn, utility classes
│   │   ├── _main.scss        # Header, footer, mobile nav, pages
│   │   ├── style.scss        # Main entry point (imports all partials)
│   │   └── blocks/main/      # Block-specific styles
│   ├── css/                  # Compiled & minified CSS
│   ├── js/
│   │   ├── plugins/          # Headroom.js, jQuery Cookie, Autogrow Textarea
│   │   ├── custom/           # Custom JS modules
│   │   ├── jquery.min.js
│   │   ├── plugins.js        # Concatenated plugins
│   │   └── custom.js         # Concatenated custom scripts
│   ├── svg/                  # SVG sprite & favicon
│   ├── img/                  # Favicons & PWA icons
│   └── video/                # Video assets placeholder
├── views/                    # Twig templates
│   ├── overall/              # Layout & structural templates
│   ├── blocks/main/          # Reusable block components
│   ├── others/               # Special pages (404, password-protected)
│   ├── index.twig            # Template directory listing
│   └── home.twig             # Example homepage
├── index.php                 # Entry point
├── .htaccess                 # Apache rewrites (all routes → index.php)
├── composer.json
└── prepros.config            # Prepros build configuration
```

## Routing

All requests are routed through `index.php` via `.htaccess` rewrites. Pages are resolved automatically from the `views/` directory:

| URL | Template |
|---|---|
| `/` | `views/index.twig` (template listing) |
| `/home/` | `views/home.twig` |
| `/any-page/` | `views/any-page.twig` |
| (not found) | `views/others/404.twig` |

To add a new page, create a `.twig` file in `views/` — it becomes routable immediately.

## Template Architecture

### Layout Hierarchy

```
overall/base.twig              # Full layout (header + footer + mobile nav + cookie popup)
overall/base-clean.twig        # Minimal layout (header + footer + scripts only)
  └── overall/html-header.twig # <head> with meta, favicons, stylesheets
  └── overall/header.twig      # Fixed header with logo & navigation
  └── overall/footer.twig      # Footer with copyright
  └── overall/mobile-nav.twig  # Full-screen mobile menu overlay
  └── overall/cookie.twig      # GDPR cookie consent banner
  └── overall/html-footer.twig # Script tags (jQuery, plugins, custom)
```

### Block System

Blocks are self-contained components that extend `overall/block-base.twig`. Each block has its own Twig template and SCSS file.

**Including a block in a page:**

```twig
{% include 'blocks/main/hero.twig' with {
    'block_group': 'main',
    'block_name': 'hero',
    'fields': {
        'subtitle': 'Welcome',
        'title': 'Page Title',
        'description': 'Description text',
        'buttons': [
            { 'title': 'Get Started', 'url': '#', 'style': 'primary' },
            { 'title': 'Learn More', 'url': '#', 'style': 'secondary' }
        ]
    }
} %}
```

**Built-in blocks:**

| Block | Description |
|---|---|
| `hero` | Hero section with subtitle, title, description, and action buttons |
| `text` | Rich text content area with `.typo` formatting |
| `form` | Contact form with name, email, subject, message, and consent checkbox |

### Creating a New Block

1. Create `views/blocks/main/your-block.twig`:
```twig
{% extends 'overall/block-base.twig' %}

{% block content %}
    <div class="your-block-inner">
        {{ fields.title }}
    </div>
{% endblock %}
```

2. Create `assets/scss/blocks/main/your-block.scss` — the CSS is automatically loaded when the block is rendered.

## Styling

### CSS Custom Properties

Defined in `_variables.scss`:

```scss
--color-dark: #1a1a2e;        // Primary text
--color-primary: #0f3460;     // Brand color
--color-accent: #e94560;      // Action/highlight
--color-grey: #6c757d;        // Secondary text
--color-grey-light: #e9ecef;  // Borders & backgrounds

--main-font-size: 16px;
--main-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ...;
--block-side-padding: 40px;   // 20px on mobile
--primary-block-width: 1200px; // Max content width
--header-height: 72px;        // 60px on mobile
```

### Button Variants

```html
<a href="#" class="btn primary">Primary</a>
<a href="#" class="btn secondary">Secondary</a>
<a href="#" class="btn accent">Accent</a>
```

### Rich Text

Wrap any HTML content in `.typo` to apply full typographic styling (headings, lists, blockquotes, tables, links):

```html
<div class="typo">
    <h2>Heading</h2>
    <p>Paragraph with <a href="#">link</a>.</p>
    <ul><li>List item</li></ul>
</div>
```

### Responsive Breakpoints

| Breakpoint | Usage |
|---|---|
| 1024px | Mobile navigation toggle |
| 960px | Block visibility (mobile/desktop) |
| 768px | General mobile adjustments |

## JavaScript

Scripts are concatenated and minified by Prepros.

**Plugins included:**
- **Headroom.js** — hides/shows the header on scroll
- **jQuery Cookie** — cookie management (used for cookie consent)
- **jQuery Autogrow Textarea** — auto-expanding textareas

**Custom modules** (`assets/js/custom/`):
- `variables.js` — mobile detection, cookie domain
- `functions.js` — page load animation fix, mobile nav toggle
- `document-ready.js` — Headroom init, nav toggle, textarea autogrow, cookie popup logic
- `window-load-resize.js` — resize event handlers (placeholder)
- `window-load-scroll-resize.js` — scroll/resize event handlers (placeholder)

## Template Context

Every template receives a global context object with:

| Variable | Description |
|---|---|
| `site.charset` | UTF-8 |
| `site.url` | Current domain URL |
| `site.name` | Site name |
| `site.assets` | Assets directory URL |
| `assets_version` | Cache-bust version string |
| `svg_sprite` | Path to SVG sprite file |
| `img_folder` | Path to images directory |
| `year` | Current year |
| `request.get` | `$_GET` superglobal |
| `request.post` | `$_POST` superglobal |
| `request.cookie` | `$_COOKIE` superglobal |
| `allowed_templates` | List of available page templates |
| `all_blocks_styles` | Auto-generated `<link>` tags for block CSS |

**Custom Twig functions:**
- `ucfirst(string)` — capitalize first letter
- `rand_id()` — generate random ID (for unique block IDs)

**Custom Twig filters:**
- `pr` — debug output (renders `print_r` overlay)
- `log` — write to debug log

## Build Process

This project uses [Prepros](https://prepros.io/) for asset compilation:

- **SCSS** → minified CSS (`assets/scss/` → `assets/css/`)
- **JS** → concatenated & minified (`assets/js/custom/` → `assets/js/custom.min.js`)

Open the project folder in Prepros — it will detect `prepros.config` automatically.

## Debug Utilities

```php
// Print variable in a fixed overlay (visible on page)
pr($variable);

// Write to /debug.log
write_log('Message or variable');
```

## Configuration

Key constants in `core/init.php`:

| Constant | Default | Description |
|---|---|---|
| `SITE_NAME` | `'Twig Base'` | Site title used in `<title>` tag |
| `MINIFY_HTML` | `false` | Enable/disable HTML output minification |
| `SITE_CHARSET` | `'UTF-8'` | Character encoding |
| `HTML_LOC` | `'en-US'` | HTML lang attribute |

## License

Proprietary
