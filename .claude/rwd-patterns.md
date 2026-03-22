# Responsive Web Design (RWD) Patterns

## Core Principle

**When layouts differ only in spacing, sizing, and order, use responsive classes. Only create separate components when the structure is fundamentally different.**

## Anti-Pattern: Multiple DOM Trees

**DON'T DO THIS:**

```tsx
{/* Desktop */}
<div className="hidden lg:flex flex-row">
  <div>Content A</div>
  <div>Content B</div>
</div>

{/* Tablet */}
<div className="hidden md:flex lg:hidden flex-col">
  <div>Content A</div>
  <div>Content B</div>
</div>

{/* Mobile */}
<div className="flex md:hidden flex-col">
  <div>Content A</div>
  <div>Content B</div>
</div>
```

**Problems:**
- Increased DOM size (browser renders all versions)
- Duplicate markup (same content 3x)
- SEO concerns (duplicate content)
- Performance overhead (more HTML to parse)
- Maintenance burden (changes in 3 places)
- Memory overhead (all DOM trees in memory)

## Recommended Patterns

### Pattern 1: Single DOM with Responsive Classes (PRIMARY)

Use one DOM structure with responsive Tailwind classes.

**DO THIS:**

```tsx
<section className="flex flex-col md:flex-row h-auto md:h-[32.5rem] lg:h-[40.625rem]">
  {/* Text content - left on desktop, bottom on mobile */}
  <div className="order-2 md:order-1 px-5 md:px-6 lg:px-10 py-6 md:py-[1.875rem] lg:py-[3.75rem] w-full md:w-auto lg:w-[32.5rem]">
    <p className="text-xs md:text-[0.6875rem] lg:text-xs">— LABEL</p>
    <h1 className="text-[2.75rem] md:text-[3.25rem] lg:text-[4.375rem] leading-[0.9] md:leading-[0.88]">
      Heading Text
    </h1>
    <p className="text-[0.8125rem] md:text-sm lg:text-[0.875rem]">
      Description text
    </p>
  </div>

  {/* Image - right on desktop, top on mobile */}
  <div className="order-1 md:order-2 relative h-[13.75rem] md:h-[17.5rem] lg:h-full flex-1">
    <Image src="..." fill className="object-cover" />
  </div>
</section>
```

**Benefits:**
- Single source of truth
- Smaller DOM size (~67% reduction)
- Better performance
- Easier maintenance
- Natural responsive flow
- Works seamlessly with Framer Motion

### Pattern 2: CSS Grid with Auto-Fit

For complex multi-column layouts:

```tsx
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32.5rem_1fr] gap-0 md:gap-4 lg:gap-0">
  <div className="order-2 md:order-1">Content A</div>
  <div className="order-1 md:order-2">Content B</div>
</section>
```

**Use when:**
- Multiple items need to reflow
- Column counts change across breakpoints
- Need precise grid control

### Pattern 3: Container Queries (Modern Approach)

For component-level responsiveness:

```tsx
// Install: @tailwindcss/container-queries

<div className="@container">
  <div className="flex flex-col @sm:flex-row @lg:gap-8">
    <div className="@sm:w-1/2">Content</div>
  </div>
</div>
```

**Use when:**
- Component needs to respond to its container size
- Building reusable components for different contexts
- Parent size varies (sidebar vs full-width)

### Pattern 4: Conditional Rendering with useMediaQuery

**ONLY when layouts are fundamentally different:**

```tsx
'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Component() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Only use when structure is COMPLETELY different
  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}
```

**Use when:**
- Structure is fundamentally different (not just spacing/sizing)
- Different interaction patterns (e.g., modal vs inline form)
- Different data requirements per breakpoint

## Refactoring Checklist

When converting multiple DOM trees to single DOM:

1. **Identify common structure**: What's the same across breakpoints?
2. **Extract differences**: Font sizes, spacing, dimensions, order
3. **Apply responsive classes**: Use Tailwind breakpoint prefixes
4. **Use order utilities**: `order-1 md:order-2` for layout reordering
5. **Test animations**: Ensure Framer Motion works with single DOM
6. **Verify visual consistency**: Check all breakpoints
7. **Performance check**: Measure DOM size reduction

## Tailwind Breakpoints Reference

```
sm: 640px   // Small devices
md: 768px   // Tablets
lg: 1024px  // Desktops
xl: 1280px  // Large desktops
2xl: 1536px // Extra large
```

## Common Responsive Patterns

### Spacing Scales

```tsx
// Progressive spacing
className="gap-4 md:gap-6 lg:gap-8"
className="px-5 md:px-6 lg:px-10"
className="py-6 md:py-8 lg:py-12"
```

### Typography Scales

```tsx
// Fluid typography
className="text-[2.75rem] md:text-[3.25rem] lg:text-[4.375rem]"
className="text-sm md:text-base lg:text-lg"
className="leading-[0.9] md:leading-[0.88] lg:leading-[0.92]"
```

### Layout Direction

```tsx
// Column to row
className="flex flex-col md:flex-row"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### Visual Order

```tsx
// Reorder without changing DOM
className="order-2 md:order-1"  // Text first on desktop
className="order-1 md:order-2"  // Image first on mobile
```

### Dimensions

```tsx
// Responsive sizing
className="h-[13.75rem] md:h-[17.5rem] lg:h-full"
className="w-full md:w-auto lg:w-[32.5rem]"
```

## Decision Matrix

| Scenario | Pattern | Rationale |
|----------|---------|-----------|
| Same content, different spacing | Single DOM + responsive classes | Minimal overhead |
| Same content, different order | Single DOM + `order-*` | No duplication |
| Different number of columns | CSS Grid + responsive cols | Semantic layout |
| Component in varying containers | Container Queries | Context-aware |
| Fundamentally different UIs | Conditional Rendering | Rare but valid |

## Performance Impact

Based on this project's refactoring:

- **Before**: ~900 lines of duplicate HTML per page
- **After**: ~300 lines with responsive classes
- **DOM Reduction**: ~67%
- **Bundle Size**: Smaller (less markup)
- **Hydration**: Faster (less DOM to hydrate)
- **Memory**: Lower (single tree in memory)

## Next.js Specific Considerations

### Server Components

Prefer responsive classes in Server Components:

```tsx
// ✅ Server Component - no client-side JS needed
export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row">
      {/* Content */}
    </section>
  );
}
```

### Client Components

Use hooks only when necessary:

```tsx
// ❌ Unnecessary client component
'use client';
export default function Hero() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  // ...
}

// ✅ Better - stay server component
export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row">
      {/* Let CSS handle responsiveness */}
    </section>
  );
}
```

## Resources

- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Container Queries](https://tailwindcss.com/docs/container-queries)
- [Every Layout](https://every-layout.dev/) - Algorithmic layout patterns
- [CSS Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
