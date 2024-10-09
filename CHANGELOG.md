# Changes since v1.0.4:

## SEO Optimization
- 🤖 Added robots.txt for search engine crawling instructions
- 🗺️ Implemented sitemap.xml for improved search engine indexing
- 🔄 Modified SSG function to accommodate slug name changes

## Refactoring and Optimizations
- 🔗 Changed article identification from 'id' to 'slug' for more semantic URLs
- 🖼️ Added cover image to article pages
- 🧹 Removed unused NestedAccordion component
- 🎨 Optimized CldImage component

## Bug Fixes
- 📄 Fixed robots.txt filename
- 🔍 Various SEO-related adjustments and fixes

## Other Changes
- 🔀 Merged multiple branches including 'develop' and 'refactor/seo-optimization'


# Changes since v1.0.3:

## New Features
- ✨ Added recent works showcase
- 🏗️ Refactored folder structure and implemented `generateStaticParams` function for static pages

## Refactoring and Optimizations
### Sidebar Improvements
- 🗑️ Removed sub-sidebar
- 🔄 Using only category data in sidebar
- 🛠️ Made general sidebar adjustments

### Other Refactoring
- 🔧 Navbar and footer adjustments
- 📱 Installed drawer component for mobile sidebar
- 🔨 Refactored article page, deleted redundant `CardWrapper` component
- ⏱️ Adjusted fetcher revalidate time settings
- 🎨 Adjusted `LanguageSwitcher` component style

## Bug Fixes
- 📅 Added title and publish time in article content
- ⏲️ Implemented `processDateTime` utility function

## Performance Improvements
- 📜 Installed scroll area component
- 🖱️ Added scroll area to the articles section
- 🚀 Deleted `loading.tsx` as loading UI is now customized

## Other Changes
- 🔀 Merged multiple branches including `develop`, `bugfix/articles-scroll-area`, and `refactor/blog-side-bar`
