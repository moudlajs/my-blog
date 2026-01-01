# DeeCee's Blog

Personal blog built with Astro Paper theme. DevOps engineering, fantasy football analysis, and technical writing.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run dev server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Writing Posts

1. Create a new `.md` file in `src/data/blog/`
2. Add frontmatter:
```yaml
---
title: "Your Post Title"
pubDatetime: 2026-01-01
author: "Daniel Czetner"
description: "Post description for SEO"
tags:
  - tag1
  - tag2
---
```
3. Write your content in Markdown
4. Push to GitHub - CI/CD will deploy automatically

## 🎨 Customization

- **Theme colors**: `src/styles/global.css` (light/dark mode variables)
- **Site config**: `src/config.ts` (title, description, timezone)
- **Social links**: `src/constants.ts`
- **Projects**: `src/pages/projects.astro` (hard-coded cards)
- **Books**: `src/pages/books.astro`
- **Header/Nav**: `src/components/Header.astro`

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Comments**: [Giscus](https://giscus.app/) (GitHub Discussions)
- **Deployment**: GitHub Pages + GitHub Actions

## 📚 More Info

See `ASTRO_GUIDE.md` for detailed customization and debugging guide.

## 📜 License

Based on [AstroPaper theme](https://github.com/satnaing/astro-paper) by Sat Naing.
