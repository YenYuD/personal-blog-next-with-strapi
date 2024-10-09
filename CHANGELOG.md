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
