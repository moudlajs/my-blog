# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an **AstroPaper** blog - a minimal, responsive, accessible, and SEO-friendly Astro blog theme. The project uses Astro as the main framework with TypeScript, TailwindCSS for styling, and pnpm as the package manager.

**Tech Stack:**
- Framework: Astro 5
- Type Checking: TypeScript (strict mode)
- Styling: TailwindCSS 4
- Search: Pagefind (static search)
- Deployment: Cloudflare Pages

## Essential Commands

### Development
```bash
pnpm install              # Install dependencies
pnpm run dev              # Start dev server at localhost:4321
pnpm run build            # Type check, build site, generate search index
pnpm run preview          # Preview production build locally
pnpm run sync             # Generate TypeScript types for Astro modules
```

### Code Quality
```bash
pnpm run lint             # Lint with ESLint
pnpm run format:check     # Check code formatting with Prettier
pnpm run format           # Auto-format code with Prettier
```

**Important:** The build command has a multi-step process:
1. `astro check` - TypeScript type checking
2. `astro build` - Build to `./dist/`
3. `pagefind --site dist` - Generate search index
4. `cp -r dist/pagefind public/` - Copy search index to public

### Docker (Alternative)
```bash
docker build -t astropaper .
docker run -p 4321:80 astropaper
# Or use docker-compose
docker compose up -d
```

## Code Architecture

### Content Management System
- **Blog posts** are stored as Markdown files in `src/data/blog/`
- Content schema is defined in `src/content.config.ts` using Astro's Content Collections API
- Posts starting with `_` are ignored by the loader (e.g., `_releases/` directory for drafts/templates)
- Post filtering and sorting logic is centralized in `src/utils/` (see `postFilter.ts`, `getSortedPosts.ts`)

**Required frontmatter fields:**
- `pubDatetime` (Date) - Publication date
- `title` (string) - Post title
- `description` (string) - Post description

**Optional frontmatter fields:**
- `author`, `modDatetime`, `featured`, `draft`, `tags`, `ogImage`, `canonicalURL`, `hideEditPost`, `timezone`

### Site Configuration
- **Global site config:** `src/config.ts` - Contains SITE object with website URL, author, metadata, pagination settings, timezone
- **Astro config:** `astro.config.ts` - Framework configuration, integrations (sitemap), markdown plugins (remarkToc, remarkCollapse), Shiki syntax highlighting themes
- **TypeScript paths:** Use `@/` alias for `./src/` imports (configured in `tsconfig.json`)

### Routing & Pages
Astro uses file-based routing in `src/pages/`:
- `index.astro` - Homepage with recent posts
- `about.md` - About page (Markdown with layout)
- `posts/` - Dynamic post routes
- `tags/` - Tag listing and tag-specific post pages
- `archives/` - Archive view of all posts
- `search.astro` - Client-side fuzzy search using Pagefind
- `og.png.ts` - Dynamic OG image generation endpoint
- `rss.xml.ts` - RSS feed generation
- `robots.txt.ts` - Dynamic robots.txt

### Layout System
Four main layouts in `src/layouts/`:
- `Layout.astro` - Base HTML layout with SEO meta tags, light/dark mode support
- `Main.astro` - Main content wrapper with header/footer
- `PostDetails.astro` - Individual blog post layout with table of contents, sharing, edit link
- `AboutLayout.astro` - About page specific layout

### Dynamic OG Image Generation
- OG images are generated dynamically using Satori (HTML/CSS to SVG) and @resvg/resvg-js (SVG to PNG)
- Template functions in `src/utils/og-templates/`
- Controlled by `SITE.dynamicOgImage` config option
- Generated at build time for each post

### Utility Functions
Key utilities in `src/utils/`:
- `getSortedPosts.ts` - Sorts posts by publication/modification date
- `postFilter.ts` - Filters posts based on draft status, scheduled posts, and environment
- `getPostsByTag.ts` - Groups posts by tag
- `slugify.ts` - Converts strings to URL-safe slugs
- `generateOgImages.ts` - OG image generation logic

### Code Style & Standards
- **ESLint:** TypeScript + Astro plugin, `no-console` enforced as error
- **Prettier:** 2-space indent, 80 char width, semicolons, double quotes, LF line endings
- **Plugins:** prettier-plugin-astro, prettier-plugin-tailwindcss
- **Ignored paths:** `dist/`, `.astro/`, `public/pagefind/`

### Markdown Features
- **Syntax highlighting:** Shiki with dual themes (min-light/night-owl)
- **Code transformers:** Filename display, notation highlighting, word highlighting, diff notation
- **Remark plugins:** Table of contents generation, collapsible sections ("Table of contents" auto-collapsed)

## Development Notes

### Environment Variables
- `PUBLIC_GOOGLE_SITE_VERIFICATION` (optional) - Google Search Console verification tag

### Timezone Handling
- Default timezone: `Asia/Bangkok` (can be overridden per-post or globally in config)
- Scheduled posts have a 15-minute margin (`scheduledPostMargin` in config)

### CI/CD
- GitHub Actions workflow (`.github/workflows/ci.yml`) runs on PRs
- Steps: lint → format check → build
- Uses pnpm 10.11.1, Node.js 20

### Adding New Blog Posts
1. Create `.md` file in `src/data/blog/`
2. Add required frontmatter (pubDatetime, title, description)
3. Posts are auto-discovered by the content collection loader
4. Use `draft: true` to exclude from production builds

### Modifying Site Metadata
Edit `src/config.ts` SITE object to change:
- Website URL, author, description, title
- Posts per page/index
- Light/dark mode toggle
- Archives visibility
- Edit post link configuration
