# Astro Blog Customization & Debugging Guide

Complete guide for customizing and debugging your Astro Paper blog. Since you forked this theme and don't do frontend regularly, this covers everything you need.

---

## 📁 Project Structure

```
my-blog/
├── src/
│   ├── assets/          # Images, icons (imported in components)
│   ├── components/      # Reusable UI components (.astro files)
│   ├── data/
│   │   └── blog/        # Your blog posts (.md files) ← ADD POSTS HERE
│   ├── layouts/         # Page layouts (base templates)
│   ├── pages/           # Routes (posts.astro = /posts URL)
│   ├── styles/          # Global CSS (colors, fonts, custom styles)
│   ├── utils/           # Helper functions (reading time, etc.)
│   ├── config.ts        # Site config (title, description, timezone)
│   └── constants.ts     # Social links, site metadata
├── public/              # Static files (avatar.jpeg, etc.)
└── astro.config.ts      # Astro framework config
```

**Key Concept**:
- Files in `src/pages/` = routes (e.g., `about.md` → `/about`)
- Files in `src/data/blog/` = blog posts (NOT routes, processed by Astro Content Collections)

---

## 🎨 Customizing Styles

### 1. **Colors (Light & Dark Mode)**

**File**: `src/styles/global.css`

```css
:root,
html[data-theme="light"] {
  --background: #fdfdfd;    /* Page background */
  --foreground: #282728;    /* Text color */
  --accent: #006cac;        /* Links, highlights (BLUE in light mode) */
  --muted: #e6e6e6;         /* Muted backgrounds */
  --border: #ece9e9;        /* Border colors */
}

html[data-theme="dark"] {
  --background: #212737;    /* Dark bg */
  --foreground: #eaedf3;    /* Light text */
  --accent: #ff6b01;        /* Links, highlights (ORANGE in dark mode) */
  --muted: #343f60;         /* Dark muted bg */
  --border: #ab4b08;        /* Dark borders */
}
```

**How to change**:
- Want different accent color? Change `--accent` hex values
- Want pure black dark mode? Change `--background` in dark theme to `#000000`

### 2. **Typography (Fonts)**

**File**: `src/styles/global.css`

Current font: `font-mono` (monospace font)

To change to sans-serif:
```css
body {
  @apply font-sans;  /* Change from font-mono to font-sans */
}
```

To use custom font:
1. Add to `src/layouts/Layout.astro` in `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```
2. Update Tailwind config to use it (or just use inline styles)

### 3. **Navigation Styles**

**File**: `src/components/Header.astro`

Current: Parallelogram hover effect (orange background)

To change hover color:
```css
/* In src/styles/global.css */
.nav-parallelogram:hover::before {
  background: var(--color-accent);  /* Change to any color */
}
```

To make hover rectangular (no slant):
```css
.nav-parallelogram::before {
  clip-path: none;  /* Remove polygon, makes it a rectangle */
}
```

### 4. **Avatar Size**

**File**: `src/components/Header.astro` (line 49)

Current:
```astro
<img src="/avatar.jpeg" class="w-16 h-16 sm:w-20 sm:h-20" />
```

To make bigger:
```astro
<img src="/avatar.jpeg" class="w-24 h-24 sm:w-28 sm:h-28" />
```

Tailwind sizes: `w-16` = 4rem (64px), `w-20` = 5rem (80px), `w-24` = 6rem (96px)

---

## 🔧 Common Customizations

### Change Site Title & Description

**File**: `src/config.ts`

```typescript
export const SITE = {
  website: "https://danielczetner.com/",
  author: "Daniel Czetner",
  title: "DeeCee's blog",  // ← Change this
  desc: "Your blog description here",  // ← And this
  timezone: "Europe/Prague",
  // ...
}
```

### Change Social Links

**File**: `src/constants.ts`

```typescript
export const SOCIALS: Social[] = [
  { name: "GitHub", href: "https://github.com/moudlajs", ... },
  { name: "X", href: "https://x.com/YourHandle", ... },
  // Add/remove as needed
];
```

### Add New Navigation Item

**File**: `src/components/Header.astro` (around line 95)

```astro
<li class="col-span-2">
  <a href="/your-new-page" class="nav-parallelogram whitespace-nowrap px-3 py-2 text-base font-semibold sm:text-lg">
    <span>New Page</span>
  </a>
</li>
```

Then create the page at `src/pages/your-new-page.astro`

### Modify Projects Page

**File**: `src/pages/projects.astro`

Projects are **hard-coded** (not from a data file). To add a new project:

```astro
<div class="border border-border rounded-lg p-5 bg-background hover:border-accent hover:shadow-xl hover:scale-105 transition-all duration-300">
  <h2 class="text-xl font-semibold text-accent mb-2">Project Name</h2>
  <p class="text-sm text-foreground mb-4">
    Project description here.
  </p>
  <div class="flex flex-wrap gap-2 pt-3 border-t border-border/50">
    <span class="px-2 py-1 text-xs font-medium rounded-md bg-muted text-foreground">#Tag</span>
  </div>
</div>
```

---

## 🐛 Debugging

### Dev Server Not Showing Changes?

**Solution**: Clear Astro cache and restart

```bash
rm -rf .astro
npm run dev
```

Astro caches aggressively. Always clear `.astro/` folder if changes aren't appearing.

### Styles Not Applying?

**Common issues**:

1. **Tailwind class typo**: Check for typos in class names
2. **CSS specificity**: Your custom CSS might be overridden. Use `!important` to test:
   ```css
   .my-class {
     color: red !important;
   }
   ```
3. **Dark mode override**: Check if your styles work in both light AND dark mode

**Debug process**:
1. Open browser DevTools (F12)
2. Inspect element
3. Check "Computed" tab to see which styles are applied
4. Look for strikethrough styles (overridden)

### Build Errors

**Common errors**:

1. **"Cannot find module"**:
   - Check import paths (use `@/` for `src/` alias)
   - Run `npm install` to ensure deps are installed

2. **Markdown frontmatter error**:
   - Check YAML syntax in blog posts
   - Dates must be valid format: `2026-01-01`
   - Tags must be array: `tags: [tag1, tag2]`

3. **Type errors**:
   - Run `npm run sync` to regenerate Astro types
   - Check `src/content.config.ts` for schema validation

**Debug command**:
```bash
npm run build  # See full error output
```

### Git Issues

**Changes not pushing?**

```bash
git status              # Check what's staged
git add .               # Stage all changes
git commit -m "message" # Commit
git push                # Push to GitHub
```

**Deployment not working?**

1. Check GitHub Actions: https://github.com/moudlajs/my-blog/actions
2. Look for red X (failed build)
3. Click on failed job to see error logs

---

## 📝 Content Management

### Writing Posts

Create: `src/data/blog/your-post-slug.md`

```markdown
---
title: "Post Title"
pubDatetime: 2026-01-01
author: "Daniel Czetner"
description: "SEO description (appears in search results)"
tags:
  - devops
  - tutorial
---

Your content here.

## Headings work

- Lists work
- Bullet points

**Bold**, *italic*, `code`

\`\`\`javascript
// Code blocks work
console.log("Hello");
\`\`\`
```

**Important**:
- `pubDatetime` format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ss`
- File name becomes URL slug: `my-post.md` → `/posts/my-post`

### Draft Posts

Add `draft: true` to frontmatter:

```yaml
---
title: "Work in Progress"
draft: true
---
```

Draft posts won't appear on production site.

---

## 🚀 Astro Perks & Possibilities

### What Makes Astro Great?

1. **Zero JS by Default**: Pages are pure HTML until you need interactivity
2. **Component Islands**: Only hydrate components that need JS
3. **Content Collections**: Type-safe markdown with validation
4. **Fast Builds**: Astro compiles to static HTML (no runtime)

### Advanced Features You Can Add

#### 1. **View Transitions** (Page Animations)

Already disabled in your blog, but can re-enable:

**File**: `src/layouts/Layout.astro`

```astro
---
import { ViewTransitions } from "astro:transitions";
---

<html>
  <head>
    <ViewTransitions />
  </head>
</html>
```

#### 2. **MDX Support** (React in Markdown)

Install:
```bash
npm install @astrojs/mdx
```

Use React components in markdown:
```mdx
import { MyComponent } from './components';

# My Post

<MyComponent />
```

#### 3. **RSS Feed** (Already Built-In)

Your blog has RSS at `/rss.xml` automatically.

#### 4. **Search** (Already Built-In)

Search page at `/search` uses Pagefind (static search, no backend needed).

#### 5. **Analytics**

Add Google Analytics:

**File**: `src/layouts/Layout.astro`

```astro
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script is:inline>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

Or use [Plausible](https://plausible.io/) for privacy-friendly analytics.

---

## 🔍 Tailwind CSS Quick Reference

Your blog uses Tailwind for styling. Here's what you need to know:

### Common Classes

```
Spacing:
  p-4      = padding: 1rem
  m-4      = margin: 1rem
  px-4     = padding left/right
  py-4     = padding top/bottom
  mt-4     = margin-top

Sizing:
  w-full   = width: 100%
  h-16     = height: 4rem (64px)
  max-w-3xl = max-width: 48rem

Text:
  text-sm  = 0.875rem (14px)
  text-base = 1rem (16px)
  text-lg  = 1.125rem (18px)
  text-xl  = 1.25rem (20px)
  font-bold = bold
  font-semibold = semi-bold

Colors:
  text-accent = uses --color-accent variable
  bg-background = uses --color-background
  border-border = uses --color-border

Responsive:
  sm:text-lg = on screens ≥640px, use text-lg
  md:text-xl = on screens ≥768px, use text-xl
  lg:text-2xl = on screens ≥1024px, use text-2xl
```

### Custom Classes You Added

```css
.nav-parallelogram       /* Navbar hover effect */
.article-hover-bg        /* Article title hover (unused now) */
.active-nav              /* Active nav indicator */
```

---

## 🌐 Deployment

### GitHub Pages Setup

1. **Enable GitHub Actions source**:
   - Repo settings → Pages → Build and deployment
   - Source: **GitHub Actions**

2. **Push triggers deployment**:
   ```bash
   git push
   ```
   - Workflow runs automatically
   - Check progress: https://github.com/moudlajs/my-blog/actions

3. **Live at**:
   - Default: `https://moudlajs.github.io/my-blog/`
   - Custom domain: `https://danielczetner.com/` (after DNS setup)

### Custom Domain Setup

**DNS Records** (in your domain registrar):

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     moudlajs.github.io
```

**GitHub Settings**:
1. Repo settings → Pages
2. Custom domain: `danielczetner.com`
3. Wait for DNS check (can take 24-48 hours)
4. Enable "Enforce HTTPS"

---

## 📚 Resources

### Official Docs
- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/) (HTML/CSS reference)

### Astro-Specific
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro Layouts](https://docs.astro.build/en/core-concepts/layouts/)
- [Astro Components](https://docs.astro.build/en/core-concepts/astro-components/)

### Tailwind Help
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind Color Reference](https://tailwindcss.com/docs/customizing-colors)

### Debugging
- [Astro Troubleshooting](https://docs.astro.build/en/guides/troubleshooting/)
- [Chrome DevTools Guide](https://developer.chrome.com/docs/devtools/)

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Changes not showing in dev | Clear cache: `rm -rf .astro && npm run dev` |
| Build fails | Check `npm run build` output for errors |
| Styles broken | Check Tailwind class names, clear cache |
| Posts not appearing | Check frontmatter YAML syntax, `draft: false` |
| Deployment fails | Check GitHub Actions logs, verify `astro.config.ts` |
| Giscus not loading | Verify Discussions enabled, correct repo ID |
| Dark mode broken | Check CSS variables in `src/styles/global.css` |

---

## 💡 Tips

1. **Always test locally** before pushing:
   ```bash
   npm run build
   npm run preview
   ```

2. **Use browser DevTools** (F12) to debug styles

3. **Check GitHub Actions logs** if deployment fails

4. **Keep Astro/deps updated**:
   ```bash
   npm outdated          # Check for updates
   npm update            # Update packages
   ```

5. **Commit often**, push when stable

---

That's it! You now have everything you need to customize, debug, and maintain your Astro blog. Happy blogging! 🚀
