# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual (English/Traditional Chinese) personal portfolio and blog built with Next.js 14+ App Router. Content is managed through Markdown files with YAML frontmatter, supporting static site generation for optimal performance.

**Tech Stack:** Next.js 14+, React 18+, TypeScript (strict mode), TailwindCSS, shadcn/ui, React Query, React Hook Form, gray-matter, react-markdown

## Development Commands

```bash
# Install dependencies (uses Yarn)
yarn --frozen-lockfile

# Run development server
yarn dev

# Run unit tests (Vitest + React Testing Library)
yarn test

# Build for production
yarn build

# Lint code
yarn lint

# Format code
yarn format
```

**Note:** This project uses Yarn as the package manager. The CI/CD pipeline uses Node 18.17.

## Architecture

### Routing Structure (Next.js App Router)

The app uses route groups and dynamic segments for organization:

```
/[lang]/(home)/page.tsx              → Homepage (e.g., /en-US/, /zh-TW/)
/[lang]/(blog)/blog/[category]/page.tsx    → Category listing (e.g., /en-US/blog/frontend)
/[lang]/(blog)/blog/[category]/[slug]/page.tsx  → Individual post (e.g., /en-US/blog/frontend/my-post)
```

**Supported Languages:**
- `en-US` (English)
- `zh-TW` (Traditional Chinese)

**Supported Categories:**
- `frontend` (displayed as "前端" in zh-TW)
- `uncategorized` (displayed as "未分類" in zh-TW)

### Content Management System (Markdown-Based)

Blog posts are stored as Markdown files with YAML frontmatter:

**File structure:** `posts/[lang]/[category]/[slug].md`

**Frontmatter schema:**
```yaml
---
title: "Article Title"
lang: "en-US"
publish_at: 2024-11-27
category: "frontend"
Author: "@Emily D."
description: "Meta description for SEO"
visibility: true
cover_image_path: "/image/upload/v1728458492/..."
slug: "unique-slug"
---
```

**Key utilities (src/utils/readMarkdown.ts):**
- `getPostBySlug(slug, lang, category)` - Retrieves a single post. Falls back to zh-TW if en-US post doesn't exist.
- `getAllPosts(lang, category?)` - Returns all posts for a language/category. Pass `category: 'all'` or omit to get all posts across categories.
- `countPostsByCategory(posts, category)` - Counts posts in a category

### Component Architecture

Three-layer component system:

1. **UI Components** (`src/components/ui/`) - shadcn/ui primitives (Button, Card, Sheet, Accordion, etc.). No business logic.

2. **Custom Components** (`src/components/custom/`) - Project-specific reusable components:
   - `Markdown.tsx` - Renders markdown with syntax highlighting (Prism themes)
   - `LanguageSwitcher.tsx` - Language dropdown menu
   - `CldImage.tsx` - Cloudinary image wrapper
   - `icons/` - SVG icon components (React, TypeScript, NextJs, etc.)

3. **Container Components** (`src/containers/`) - Page-level composition:
   - `landing-page/` - HomeBlock, AboutMe, RecentWorks
   - `layouts/` - Navbar, Footer, BlogSideBar (desktop + mobile)
   - `Articles.tsx` - Article card list

### Service Layer

Services are split by environment:

**Server-side** (`src/service/server/`):
- `articleService.ts` - Article CRUD operations
- `categoryService.ts` - Category operations
- `uiService.ts` - UI configuration
- `fetcher.ts` - HTTP utility (uses Axios with 30s timeout)

**Client-side** (`src/service/client/`):
- `uiService.ts` - Client UI service
- `instance.ts` - Axios instance configuration

**Shared** (`src/service/`):
- `type.ts` - Centralized TypeScript type definitions
- `utils/` - Shared utilities (formatDate, urlJoin, languageMapping, processSearchParams)

### Configuration

Central configuration file: `src/constants/uiConfig.ts`

Contains:
- `navbarConfig` - Navigation links
- `languageMapping` - Language code mappings (`'en-US': 'en'`, `'zh-TW': 'zh-Hant-TW'`)
- `categories` - Category definitions per language
- `cardInfo` - Portfolio project cards
- `backGroundColorSettings` - Gradient color schemes
- `categoriesWithPostsCount(posts, lang)` - Helper to count posts per category

## Testing

**Framework:** Vitest with React Testing Library

**Test locations:**
- Component tests: `src/components/custom/__tests__/`
- Container tests: `src/containers/landing-page/__tests__/`

**Running tests:**
```bash
yarn test           # Run all tests
yarn test --watch   # Watch mode
```

**Common patterns:**
- Mock Next.js navigation hooks (`useRouter`, `usePathname`)
- Use `@testing-library/user-event` for interactions
- Jest DOM matchers available via `@testing-library/jest-dom`

## Internationalization (i18n)

**Language detection:** Extracted from URL pathname (`/en-US/...` or `/zh-TW/...`)

**Adding a new language:**
1. Add language code to `languageMapping` in `src/constants/uiConfig.ts`
2. Add categories configuration for the language in `categories` object
3. Create `posts/[new-lang]/` directory
4. Update `generateStaticParams()` in page components to include new language

**Content fallback:** If an English (`en-US`) post is missing, the system falls back to the Traditional Chinese (`zh-TW`) version automatically.

## Styling

**Framework:** TailwindCSS with custom configuration

**Global styles:** `src/globals.css`

**Utility helper:** `src/lib/utils.ts` exports `cn()` function for conditional class merging (clsx + tailwind-merge)

**Responsive breakpoints:** sm, md, lg, xl, 2xl (standard Tailwind)

**Color system:** Uses HSL color space for gradient backgrounds (see `backGroundColorSettings` in uiConfig)

## Image Handling

**Cloudinary integration:**
- Environment variables: `NEXT_PUBLIC_CLOUDINARY_DOMAIN`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- Use `CldImage` component from `src/components/custom/CldImage.tsx`
- Cover images stored in Cloudinary, paths in post frontmatter

**Next.js Image:**
- Use for static assets in `src/assets/`
- Automatic optimization enabled

## Deployment & CI/CD

**Platform:** Vercel (production and preview deployments)

**GitHub Actions workflows:**

1. **Unit Tests** (`.github/workflows/nextjs-build-test.yml`)
   - Triggers: Push to any branch, PRs
   - Runs: `yarn --frozen-lockfile && yarn test`
   - Node version: 18.17

2. **SonarQube Analysis** (`.github/workflows/build.yml`)
   - Triggers: Push to main/develop branches
   - Requires: `SONAR_TOKEN`, `SONAR_HOST_URL`

3. **Vercel Preview** (`.github/workflows/deploy-to-vercel.yml`)
   - Triggers: Push to non-main branches
   - Requires: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

**Git hooks:** Husky is configured (`.husky/`) - likely runs linting and tests pre-commit

## Environment Variables

Required for local development:
```
NEXT_PUBLIC_WEBSITE_LINK=           # Portfolio website URL
NEXT_PUBLIC_CLOUDINARY_DOMAIN=      # Cloudinary API domain
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=  # Cloudinary cloud name
GIT_HUB_LINK=                       # GitHub profile URL
LINKEDIN_LINK=                      # LinkedIn profile URL
```

CI/CD specific:
```
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
SONAR_TOKEN=
SONAR_HOST_URL=
```

## Analytics & Monitoring

- **Google Tag Manager:** ID `G-31W15B76BT` (configured in layout files)
- **Vercel Speed Insights:** Performance monitoring enabled

## Key Architectural Notes

1. **Static Generation Strategy:** All blog posts are pre-rendered at build time using `generateStaticParams()`. Add new posts by creating markdown files - they'll be included in the next build.

2. **Server vs Client Components:**
   - Layouts and page routes are async server components
   - Interactive components (LanguageSwitcher, Sheet menus) are client components
   - Use `'use client'` directive only when needed

3. **Markdown Rendering:** The `Markdown` component supports:
   - GitHub Flavored Markdown (via remark-gfm)
   - Syntax highlighting for: tsx, typescript, markdown, json, javascript, bash, ini
   - Custom styling for tables, links, lists, blockquotes
   - Code blocks use Prism themes

4. **TypeScript Patterns:**
   - Strict mode enabled
   - Extensive use of generics (especially with React Hook Form)
   - Type definitions centralized in `src/service/type.ts`
   - Component prop types use `Parameters<typeof Component>` pattern for MUI integration

5. **Navigation:** The `Navbar` component reads current language from pathname and passes it to `LanguageSwitcher`. When language changes, user is redirected to the same route in the new language.

6. **Category Display:** Categories have both a `name` (display name, localized) and `path` (URL segment, consistent across languages). Always use `path` for routing and `name` for display.
