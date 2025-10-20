/**
 * HTML generation engine for SlideyUI presentations
 *
 * Converts presentation specifications into standalone HTML files with
 * embedded CSS and optimized for projection and export.
 */

import type {
  PresentationSpec,
  SlideSpec,
  GenerationOptions,
  GenerationResult,
} from '../types/index.js';
import { getTemplate } from '../templates/index.js';
import { embedCSS, minifyHTML } from '../utils/index.js';

/**
 * Generate a complete standalone HTML presentation
 *
 * @param spec - Presentation specification
 * @returns Generation result with HTML and metadata
 */
export async function generatePresentation(
  spec: PresentationSpec
): Promise<GenerationResult> {
  const options: GenerationOptions = {
    aspectRatio: '16:9',
    fontSize: 'default',
    minify: true,
    includeSlideyUICSS: true,
    embedFonts: true,
    theme: spec.theme,
    ...spec.options,
  };

  // Generate individual slides
  const slideHTML = spec.slides
    .map((slide, index) => generateSlide(slide, options, index))
    .join('\n');

  // Build complete HTML document
  const htmlParams: {
    title: string;
    theme: string;
    slideHTML: string;
    options: GenerationOptions;
    metadata?: Record<string, unknown>;
  } = {
    title: spec.title,
    theme: spec.theme,
    slideHTML,
    options,
  };

  if (spec.metadata) {
    htmlParams.metadata = spec.metadata as Record<string, unknown>;
  }

  const html = await generateStandaloneHTML(htmlParams);

  // Optionally minify
  const finalHTML = options.minify ? await minifyHTML(html) : html;

  return {
    html: finalHTML,
    metadata: {
      slideCount: spec.slides.length,
      theme: spec.theme,
      generatedAt: new Date().toISOString(),
      size: Buffer.byteLength(finalHTML, 'utf8'),
    },
  };
}

/**
 * Generate HTML for a single slide
 *
 * @param spec - Slide specification
 * @param options - Generation options
 * @param index - Slide index (optional)
 * @returns HTML string for the slide
 */
export function generateSlide(
  spec: SlideSpec,
  options: GenerationOptions,
  index?: number
): string {
  const template = getTemplate(spec.type);
  const slideId = spec.id ?? `slide-${index ?? 0}`;
  const stateAttr = spec.state ? `data-card-state="${spec.state}"` : '';

  const slideContent = template(spec, options);

  return `
    <div class="slideyui-slide" id="${slideId}" ${stateAttr}>
      ${slideContent}
    </div>
  `;
}

/**
 * Generate complete standalone HTML document
 *
 * @param params - HTML generation parameters
 * @returns Complete HTML document string
 */
export async function generateStandaloneHTML(params: {
  title: string;
  theme: string;
  slideHTML: string;
  options: GenerationOptions;
  metadata?: Record<string, unknown>;
}): Promise<string> {
  const { title, theme, slideHTML, options, metadata } = params;

  // Get SlideyUI CSS
  const css = options.includeSlideyUICSS ? await embedCSS(theme) : '';

  // Generate metadata tags
  const metaTags = metadata
    ? Object.entries(metadata)
        .map(
          ([key, value]) =>
            `<meta name="${key}" content="${String(value)}">`
        )
        .join('\n    ')
    : '';

  const aspectRatioClass =
    options.aspectRatio === '4:3' ? 'slideyui-aspect-4-3' : 'slideyui-aspect-16-9';
  const fontSizeClass =
    options.fontSize === 'large'
      ? 'slideyui-text-large'
      : options.fontSize === 'xlarge'
      ? 'slideyui-text-xlarge'
      : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="generator" content="SlideyUI MCP v0.1.0">
  ${metaTags}
  <title>${title}</title>
  <style>
    ${css}

    /* Base presentation styles */
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .slideyui-deck {
      width: 100vw;
      height: 100vh;
      position: relative;
    }

    .slideyui-slide {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      padding: 5%;
      box-sizing: border-box;
    }

    .slideyui-slide:first-child {
      display: block;
    }

    .slideyui-slide.active {
      display: block;
    }

    /* Print styles */
    @media print {
      .slideyui-slide {
        display: block !important;
        page-break-after: always;
        position: relative;
      }

      .slideyui-slide:last-child {
        page-break-after: auto;
      }
    }
  </style>
</head>
<body>
  <div class="slideyui-deck ${aspectRatioClass} ${fontSizeClass}" data-theme="${theme}">
    ${slideHTML}
  </div>

  <script>
    // Basic slide navigation
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slideyui-slide');

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      currentSlide = index;
    }

    function nextSlide() {
      if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
      }
    }

    function prevSlide() {
      if (currentSlide > 0) {
        showSlide(currentSlide - 1);
      }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        showSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        showSlide(slides.length - 1);
      }
    });

    // Touch navigation
    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    });

    // Initialize first slide
    showSlide(0);
  </script>
</body>
</html>`;
}
