# Contributing to SlideyUI

Thank you for your interest in contributing to SlideyUI! This document provides guidelines and instructions for contributing.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates. When creating a bug report, include:

- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (browser, OS, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear, descriptive title
- Provide a detailed description of the proposed feature
- Explain why this enhancement would be useful
- Include mockups or examples if applicable

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or pnpm
- Git

### Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/slideyui.git
cd slideyui

# Install dependencies
npm install

# Start development server
npm run dev

# Build all packages
npm run build
```

### Project Structure

```
slideyui/
├── packages/
│   ├── slideyui-core/    # Core Tailwind plugin
│   └── slideyui-react/   # React components
├── docs/                 # Documentation site
└── examples/            # Example presentations
```

### Development Workflow

1. **Make changes** in the appropriate package
2. **Test locally** by running `npm run dev`
3. **Build** with `npm run build`
4. **Type check** with `npm run type-check`
5. **Verify** the docs site reflects your changes

## Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Avoid `any` types when possible
- Document complex types with JSDoc comments

### React Components

- Use functional components with hooks
- Include prop types with TypeScript interfaces
- Add JSDoc comments with usage examples
- Keep components focused and composable
- Use semantic HTML

### CSS/Tailwind

- Follow Tailwind CSS best practices
- Use CSS custom properties for theme values
- Ensure responsive design
- Maintain high contrast for readability
- Test on different screen sizes

### Commit Messages

Follow the conventional commits specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat(react): add SectionSlide component`

## Adding New Components

When adding a new component:

1. Create the component file in `packages/slideyui-react/src/components/`
2. Add TypeScript types in `packages/slideyui-react/src/types/`
3. Export from `packages/slideyui-react/src/index.tsx`
4. Add CSS styles if needed in `packages/slideyui-core/src/components.css`
5. Document in `docs/src/routes/docs/components/+page.svelte`
6. Add usage example

## Adding New Themes

When adding a new theme:

1. Define theme in `packages/slideyui-core/src/themes.ts`
2. Follow the `Theme` interface structure
3. Choose appropriate colors (high contrast)
4. Select readable fonts
5. Document in `docs/src/routes/docs/themes/+page.svelte`
6. Add theme showcase

## Testing

Currently, we focus on manual testing through the documentation site. Before submitting a PR:

1. Test your changes in multiple browsers
2. Verify responsive behavior
3. Check accessibility
4. Test with different themes
5. Ensure no console errors

## Documentation

When changing functionality:

1. Update relevant documentation pages
2. Add code examples
3. Include screenshots if helpful
4. Update the changelog

## Questions?

Feel free to open an issue with the `question` label if you need help or clarification.

## License

By contributing to SlideyUI, you agree that your contributions will be licensed under the MIT License.
