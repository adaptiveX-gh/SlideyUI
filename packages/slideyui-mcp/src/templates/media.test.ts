/**
 * Tests for media slide template with hero layout support
 */

import { describe, it, expect } from 'vitest';
import { mediaTemplate } from './media.js';
import type { MediaSlideSpec, GenerationOptions } from '../types/index.js';

const defaultOptions: GenerationOptions = {
  aspectRatio: '16:9',
  fontSize: 'default',
  minify: false,
  theme: 'corporate',
};

describe('Media Template - Backward Compatibility', () => {
  it('renders contained layout by default (no layout specified)', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      mediaUrl: 'https://example.com/image.jpg',
      mediaType: 'image',
      title: 'Product Photo',
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('slideyui-media-card');
    expect(html).toContain('img');
    expect(html).toContain('Product Photo');
    expect(html).not.toContain('slideyui-hero-background');
  });

  it('renders contained layout explicitly', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      mediaUrl: 'https://example.com/image.jpg',
      mediaType: 'image',
      layout: 'contained',
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('slideyui-media-card');
    expect(html).not.toContain('slideyui-hero-background');
  });

  it('renders image in contained layout with caption', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      mediaUrl: 'https://example.com/photo.jpg',
      mediaType: 'image',
      caption: 'A beautiful sunset',
      layout: 'contained',
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('A beautiful sunset');
    expect(html).toContain('slideyui-caption');
  });

  it('renders video in contained layout', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      mediaUrl: 'https://example.com/video.mp4',
      mediaType: 'video',
      layout: 'contained',
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('video');
    expect(html).toContain('controls');
  });

  it('renders embed in contained layout', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      mediaUrl: 'https://www.youtube.com/embed/abc123',
      mediaType: 'embed',
      layout: 'contained',
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('iframe');
    expect(html).toContain('youtube.com');
  });
});

describe('Media Template - Hero Layout', () => {
  it('renders basic hero slide with title', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/hero-bg.jpg',
      mediaType: 'image',
      title: 'Welcome to Our Platform',
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('slideyui-hero-background');
    expect(html).toContain('background-image: url(\'https://example.com/hero-bg.jpg\')');
    expect(html).toContain('Welcome to Our Platform');
    expect(html).toContain('slideyui-hero-title');
  });

  it('renders hero slide with title and subtitle', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/hero-bg.jpg',
      mediaType: 'image',
      title: 'Hello World',
      subtitle: 'Welcome to the future',
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('Hello World');
    expect(html).toContain('Welcome to the future');
    expect(html).toContain('slideyui-hero-subtitle');
  });

  it('includes gradient overlay by default', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Test',
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('slideyui-hero-overlay');
    expect(html).toContain('linear-gradient');
  });

  it('uses theme colors in default overlay', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Test',
    };

    const html = mediaTemplate(spec, { ...defaultOptions, theme: 'corporate' });
    // Should contain rgba values for corporate theme colors
    expect(html).toContain('rgba');
  });
});

describe('Media Template - Hero Layout Overlay Configuration', () => {
  it('supports custom overlay colors', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Custom Brand',
      overlay: {
        customColors: ['#FF5733', '#C70039'],
        opacity: 0.85,
      },
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('slideyui-hero-overlay');
    expect(html).toContain('rgba(255, 87, 51, 0.85)');
    expect(html).toContain('rgba(199, 0, 57, 0.85)');
  });

  it('supports theme color names in overlay', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Theme Colors',
      overlay: {
        colors: ['primary', 'accent'],
        opacity: 0.7,
      },
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('slideyui-hero-overlay');
    // Should resolve theme colors
    expect(html).toContain('rgba');
  });

  it('supports solid overlay type', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Solid Overlay',
      overlay: {
        type: 'solid',
        customColors: ['#000000'],
        opacity: 0.5,
      },
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('rgba(0, 0, 0, 0.5)');
    expect(html).not.toContain('linear-gradient');
  });

  it('supports custom gradient direction', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Directional Gradient',
      overlay: {
        type: 'gradient',
        customColors: ['#FF0000', '#0000FF'],
        direction: '90deg',
      },
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('linear-gradient(90deg,');
  });

  it('disables overlay when enabled is false', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'No Overlay',
      overlay: {
        enabled: false,
      },
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).not.toContain('slideyui-hero-overlay');
  });

  it('disables overlay when type is none', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'No Overlay',
      overlay: {
        type: 'none',
      },
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).not.toContain('slideyui-hero-overlay');
  });
});

describe('Media Template - Hero Layout Text Positioning', () => {
  it('centers text by default', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Centered',
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('slideyui-hero-content-center');
  });

  it('positions text at top', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Top Aligned',
      textStyle: {
        position: 'top',
      },
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('slideyui-hero-content-top');
  });

  it('positions text at bottom', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Bottom Aligned',
      textStyle: {
        position: 'bottom',
      },
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('slideyui-hero-content-bottom');
  });

  it('positions text at left', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Left Aligned',
      textStyle: {
        position: 'left',
      },
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('slideyui-hero-content-left');
  });

  it('positions text at right', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Right Aligned',
      textStyle: {
        position: 'right',
      },
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('slideyui-hero-content-right');
  });
});

describe('Media Template - Hero Layout Text Styling', () => {
  it('applies text alignment', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Left Aligned Text',
      textStyle: {
        align: 'left',
      },
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('text-align: left');
  });

  it('applies custom text color', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Colored Text',
      textStyle: {
        color: '#FF5733',
      },
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('color: #FF5733');
  });

  it('uses white text by default', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'White Text',
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('color: white');
    expect(html).toContain('slideyui-hero-text-white');
  });

  it('applies text shadow by default', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Shadowed Text',
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('slideyui-hero-text-shadow');
  });

  it('disables text shadow when specified', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'No Shadow',
      textStyle: {
        shadow: false,
      },
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).not.toContain('slideyui-hero-text-shadow');
  });

  it('applies custom max width', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Custom Width',
      textStyle: {
        maxWidth: '600px',
      },
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('max-width: 600px');
  });
});

describe('Media Template - Integration Tests', () => {
  it('combines all hero features together', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/mountain.jpg',
      mediaType: 'image',
      title: 'Reach New Heights',
      subtitle: 'Join us on this journey',
      overlay: {
        type: 'gradient',
        customColors: ['#FF5733', '#C70039'],
        opacity: 0.75,
        direction: '135deg',
      },
      textStyle: {
        position: 'center',
        align: 'center',
        color: 'white',
        shadow: true,
        maxWidth: '800px',
      },
    };

    const html = mediaTemplate(spec, defaultOptions);

    // Check background
    expect(html).toContain('slideyui-hero-background');
    expect(html).toContain('mountain.jpg');

    // Check overlay
    expect(html).toContain('linear-gradient(135deg,');
    expect(html).toContain('rgba(255, 87, 51, 0.75)');
    expect(html).toContain('rgba(199, 0, 57, 0.75)');

    // Check text
    expect(html).toContain('Reach New Heights');
    expect(html).toContain('Join us on this journey');
    expect(html).toContain('slideyui-hero-content-center');
    expect(html).toContain('text-align: center');
    expect(html).toContain('max-width: 800px');
    expect(html).toContain('slideyui-hero-text-shadow');
  });

  it('escapes HTML in hero slide content', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: '<script>alert("xss")</script>',
      subtitle: '<img src=x onerror=alert(1)>',
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('&lt;img');
  });

  it('works with different themes', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Theme Test',
      overlay: {
        colors: ['primary', 'secondary'],
      },
    };

    const themes = ['corporate', 'pitch-deck', 'academic', 'workshop', 'startup'];

    themes.forEach((theme) => {
      const html = mediaTemplate(spec, { ...defaultOptions, theme } as GenerationOptions);
      expect(html).toContain('slideyui-hero-background');
      expect(html).toContain('linear-gradient');
      expect(html).toContain('rgba');
    });
  });
});

describe('Media Template - Edge Cases', () => {
  it('handles hero slide with only title (no subtitle)', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Only Title',
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('Only Title');
    expect(html).toContain('slideyui-hero-title');
    expect(html).not.toContain('slideyui-hero-subtitle');
  });

  it('handles hero slide with empty overlay config', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Test',
      overlay: {},
    };

    const html = mediaTemplate(spec, defaultOptions);
    // Should use defaults
    expect(html).toContain('slideyui-hero-overlay');
    expect(html).toContain('linear-gradient');
  });

  it('handles hero slide with empty textStyle config', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/bg.jpg',
      mediaType: 'image',
      title: 'Test',
      textStyle: {},
    };

    const html = mediaTemplate(spec, defaultOptions);
    // Should use defaults
    expect(html).toContain('slideyui-hero-content-center');
    expect(html).toContain('text-align: center');
    expect(html).toContain('color: white');
  });

  it('handles special characters in URLs', () => {
    const spec: MediaSlideSpec = {
      type: 'media',
      layout: 'hero',
      mediaUrl: 'https://example.com/image?param=value&other=test',
      mediaType: 'image',
      title: 'Test',
    };

    const html = mediaTemplate(spec, defaultOptions);
    expect(html).toContain('background-image');
  });
});
