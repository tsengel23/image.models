# Copilot Instructions for image.models

## Project Overview

**image.models** is a Next.js 16 + React 19 web application for AI-powered food image analysis. It provides three integrated AI features: image analysis (detect ingredients from photos), ingredient recognition (describe food to get ingredients), and image creation (generate food images from text descriptions).

## Architecture & Key Components

### Component Organization

- **`src/app/_components/`**: Feature-specific client components (`"use client"`)
  - `TabsModel.tsx`: Main UI orchestrator - manages 3 feature tabs
  - `ImageAnalysis.tsx`: File upload + ingredient detection
  - `Ingredients.tsx`: Text-to-ingredients converter
  - `ImageCreator.tsx`: Text-to-image generation
  - `ResultMessage.tsx`: Shared result display component (icon + title + text)
  - `ChatMessage.tsx`: Floating chat widget (bottom-right corner)
  - `TabTitle.tsx`: Consistent tab header component

- **`src/components/ui/`**: Reusable Radix UI / Shadcn primitives (Button, Input, Textarea, Tabs, Card, etc.)

### Data Flow Pattern

1. User interacts with feature tab (file input, textarea, or button)
2. Component maintains local state (`useState`) for form data
3. Form submission → would trigger API call (currently placeholders in ResultMessage)
4. Results displayed via `ResultMessage` component with custom icons + styling

### Type System

- Minimal types in `types/Tabs.ts` - only `TabTitle`
- Prefer inline prop types (see `ResultMessage.tsx` pattern)
- Use TypeScript strict mode (enabled in tsconfig)

## Development Workflow

### Build & Development

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Build for production
npm run start     # Run production build
npm run lint      # Run ESLint
```

### Key Dependencies

- **Next.js 16.1**: App Router (not Pages Router)
- **React 19.2**: Latest with new compiler
- **Tailwind 4 + Radix UI**: Styling (not Material-UI or Bootstrap)
- **Lucide Icons**: Lightweight icon library (currently used in ResultMessage, ChatMessage)
- **clsx + tailwind-merge**: Class composition utilities

## Code Patterns & Conventions

### Component Structure

1. Always use `"use client"` at top of feature components (all in `_components/` are client)
2. Import UI primitives from `@/components/ui/` (alias configured in tsconfig)
3. Use Tailwind classes directly - no CSS modules or styled-components
4. Component naming: PascalCase, exported as named exports (not default)

### State & Logic

- Use React hooks (`useState`) for local component state
- No context/provider pattern yet - keep state local unless sharing across features
- Component responsibilities are clearly separated (ImageAnalysis ≠ Ingredients)

### Styling Patterns

```tsx
// Use className with Tailwind + Lucide icons
<Button variant={"outline"} className="">
<Icon className="w-5 h-5 text-orange-600" />
```

### Placeholder Code

- Several components have commented-out code (ImageAnalysis line 36-40)
- ResultMessage has commented fields (`result`, `image`) - clean up when implementing API

## Integration Points

### Form Submission (To Be Implemented)

- ImageAnalysis: File upload → POST /api/analyze (stub)
- Ingredients: Textarea → POST /api/recognize-ingredients (stub)
- ImageCreator: Textarea → POST /api/generate-image (stub)

### Multilingual Support

- Placeholder text already in Mongolian ("Хоолны тайлбар", "Орц тодорхойлох")
- Consider i18n library when expanding language support

## Common Tasks

### Adding a New Feature Tab

1. Create component in `src/app/_components/Feature.tsx` with `"use client"`
2. Import into `TabsModel.tsx`
3. Add `<TabsTrigger>` and `<TabsContent>` entries (see ImageAnalysis pattern)
4. Use `ResultMessage` for output display with appropriate icon from lucide-react

### Creating UI Components

1. Reference `src/components/ui/button.tsx` pattern (Radix UI + Tailwind wrapper)
2. Use `clsx` + `tailwind-merge` for class composition
3. Export as named export with TypeScript prop types

### Working with Icons

- Import from `lucide-react`: `{ FileText, Image, MessageCircle, Send }`
- Pass as LucideIcon type to components
- Apply colors via className: `text-orange-600`, `text-green-600`

## Useful Files to Reference

- [src/app/page.tsx](src/app/page.tsx) - Layout structure
- [src/app/\_components/TabsModel.tsx](src/app/_components/TabsModel.tsx) - Feature routing pattern
- [src/app/\_components/ResultMessage.tsx](src/app/_components/ResultMessage.tsx) - Reusable display component
- [tsconfig.json](tsconfig.json) - Path aliases (`@/` = `src/`)
- [next.config.ts](next.config.ts) - Next.js config (currently minimal)
