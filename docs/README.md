# SlideyUI Documentation Website

Professional documentation website built with SvelteKit, Tailwind CSS, and DaisyUI.

## Structure

```
docs/
├── src/
│   ├── lib/components/          # Reusable components
│   │   ├── CodeBlock.svelte
│   │   ├── ComponentPreview.svelte
│   │   ├── ThemeShowcase.svelte
│   │   ├── SideNav.svelte
│   │   └── ThemeSwitcher.svelte
│   │
│   ├── routes/
│   │   ├── +layout.svelte       # Main layout
│   │   ├── +page.svelte         # Homepage
│   │   └── docs/                # Documentation pages
│   │       ├── intro/
│   │       ├── install/
│   │       ├── themes/
│   │       ├── layouts/
│   │       ├── typography/
│   │       ├── components/
│   │       ├── utilities/
│   │       └── examples/
│   │
│   └── app.css                  # Global styles
│
├── tailwind.config.js           # Tailwind + DaisyUI config
├── svelte.config.js             # SvelteKit (adapter-static)
└── package.json
```

## Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- Modern SvelteKit + Tailwind CSS + DaisyUI stack
- Fully responsive, mobile-first design
- Theme switcher with 5+ themes
- Reusable documentation components
- Static site generation with adapter-static
- SEO optimized with proper meta tags
- WCAG-compliant accessibility

## Documentation Pages

- **Homepage**: Hero, features, quick start, CTA
- **Introduction**: What is SlideyUI, core concepts
- **Installation**: Setup guide, framework integration
- **Themes**: 4 professional themes with previews
- **Layouts**: Pre-built slide layout templates
- **Typography**: Presentation-optimized type system
- **Components**: Specialized presentation components
- **Utilities**: Presentation-specific utility classes
- **Examples**: Complete example presentations

## Tech Stack

- SvelteKit 2.43
- TypeScript 5.9
- Tailwind CSS 3.4
- DaisyUI 4.12
- Vite 7.1

## Deployment

Built as a static site, ready to deploy to:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- Any static hosting
