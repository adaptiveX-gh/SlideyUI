/**
 * SVGBuilder - Composable SVG generation utility for SlideyUI
 *
 * Provides a fluent API for building complex SVG graphics server-side.
 * Uses SVG.js with svgdom for Node.js compatibility.
 *
 * Features:
 * - Server-side SVG rendering
 * - Theme color integration
 * - Composable builder pattern
 * - Zero client-side dependencies
 *
 * @example
 * ```typescript
 * const svg = new SVGBuilder({ width: 800, height: 600, theme: 'corporate' })
 *   .addRect(0, 0, 800, 600, 'var(--slidey-background)')
 *   .addCircle(400, 300, 100, 'var(--slidey-primary)')
 *   .addText('Hello', 400, 300, { fontSize: 24 })
 *   .toSVGString();
 * ```
 */

import { SVG, registerWindow } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';
import type { Theme } from '../types/index.js';

// Server-side SVG setup (singleton pattern)
let windowInstance: ReturnType<typeof createSVGWindow> | null = null;

function getWindow() {
  if (!windowInstance) {
    windowInstance = createSVGWindow();
    const document = windowInstance.document;
    registerWindow(windowInstance, document);
  }
  return windowInstance;
}

/**
 * Theme color mappings for SVG generation
 */
const themeColors: Record<Theme, Record<string, string>> = {
  corporate: {
    primary: '#1e40af',
    secondary: '#0891b2',
    accent: '#64748b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
  },
  'pitch-deck': {
    primary: '#7c3aed',
    secondary: '#ec4899',
    accent: '#f59e0b',
    background: '#ffffff',
    surface: '#faf5ff',
    text: '#1e293b',
  },
  academic: {
    primary: '#1e3a8a',
    secondary: '#92400e',
    accent: '#065f46',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
  },
  workshop: {
    primary: '#2563eb',
    secondary: '#10b981',
    accent: '#f97316',
    background: '#ffffff',
    surface: '#fef3c7',
    text: '#1e293b',
  },
  startup: {
    primary: '#0ea5e9',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    background: '#ffffff',
    surface: '#f0f9ff',
    text: '#1e293b',
  },
};

/**
 * Options for SVGBuilder constructor
 */
export interface SVGBuilderOptions {
  /** SVG width in pixels */
  width: number;
  /** SVG height in pixels */
  height: number;
  /** Theme for color palette (optional) */
  theme?: Theme;
  /** Additional CSS classes for the SVG element */
  className?: string;
  /** Custom view box (overrides width/height) */
  viewBox?: string;
}

/**
 * Text rendering options
 */
export interface TextOptions {
  /** Font size in pixels */
  fontSize?: number;
  /** Font family */
  fontFamily?: string;
  /** Font weight (100-900) */
  fontWeight?: number | 'normal' | 'bold';
  /** Text anchor: start, middle, end */
  textAnchor?: 'start' | 'middle' | 'end';
  /** Fill color */
  fill?: string;
  /** Stroke color */
  stroke?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Dominant baseline: auto, middle, hanging */
  dominantBaseline?: 'auto' | 'middle' | 'hanging' | 'central';
}

/**
 * Gradient stop definition
 */
export interface GradientStop {
  /** Offset position (0-1) */
  offset: number;
  /** Stop color */
  color: string;
  /** Stop opacity (0-1) */
  opacity?: number;
}

/**
 * Path options
 */
export interface PathOptions {
  /** Fill color */
  fill?: string;
  /** Stroke color */
  stroke?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Stroke line cap: butt, round, square */
  strokeLinecap?: 'butt' | 'round' | 'square';
  /** Stroke line join: miter, round, bevel */
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  /** Fill opacity (0-1) */
  fillOpacity?: number;
  /** Stroke opacity (0-1) */
  strokeOpacity?: number;
}

/**
 * SVGBuilder - Composable SVG generation utility
 */
export class SVGBuilder {
  private canvas: any;
  private themeColors: Record<string, string>;

  /**
   * Create a new SVGBuilder instance
   */
  constructor(options: SVGBuilderOptions) {
    const window = getWindow();
    const document = window.document;

    this.themeColors = options.theme ? themeColors[options.theme] : {};

    // Create SVG canvas
    this.canvas = SVG(document.documentElement);
    this.canvas.size(options.width, options.height);

    if (options.viewBox) {
      this.canvas.viewbox(options.viewBox);
    } else {
      this.canvas.viewbox(0, 0, options.width, options.height);
    }

    if (options.className) {
      this.canvas.addClass(options.className);
    }
  }

  /**
   * Resolve color (handles CSS variables and theme colors)
   */
  private resolveColor(color?: string): string | undefined {
    if (!color) {
      return undefined;
    }

    // Handle CSS variable references like var(--slidey-primary)
    const varMatch = color.match(/var\(--slidey-(\w+)\)/);
    if (varMatch) {
      const colorKey = varMatch[1];
      if (colorKey) {
        return this.themeColors[colorKey] || color;
      }
    }

    return color;
  }

  /**
   * Add a circle to the SVG
   */
  addCircle(x: number, y: number, radius: number, fill?: string, stroke?: string): this {
    const circle = this.canvas.circle(radius * 2);
    circle.cx(x).cy(y);

    if (fill) {
      circle.fill(this.resolveColor(fill));
    }
    if (stroke) {
      circle.stroke(this.resolveColor(stroke));
    }

    return this;
  }

  /**
   * Add a rectangle to the SVG
   */
  addRect(
    x: number,
    y: number,
    width: number,
    height: number,
    fill?: string,
    stroke?: string,
    rx?: number
  ): this {
    const rect = this.canvas.rect(width, height);
    rect.move(x, y);

    if (fill) {
      rect.fill(this.resolveColor(fill));
    }
    if (stroke) {
      rect.stroke(this.resolveColor(stroke));
    }
    if (rx !== undefined) {
      rect.radius(rx);
    }

    return this;
  }

  /**
   * Add a path to the SVG
   */
  addPath(pathData: string, options: PathOptions = {}): this {
    const path = this.canvas.path(pathData);

    if (options.fill !== undefined) {
      path.fill(options.fill === 'none' ? 'none' : this.resolveColor(options.fill));
    }
    if (options.stroke) {
      path.stroke({
        color: this.resolveColor(options.stroke),
        width: options.strokeWidth || 1,
        linecap: options.strokeLinecap || 'butt',
        linejoin: options.strokeLinejoin || 'miter',
        opacity: options.strokeOpacity,
      });
    }
    if (options.fillOpacity !== undefined) {
      path.opacity(options.fillOpacity);
    }

    return this;
  }

  /**
   * Add text to the SVG
   */
  addText(text: string, x: number, y: number, options: TextOptions = {}): this {
    const textElement = this.canvas.text(text);
    textElement.move(x, y);

    if (options.fontSize) {
      textElement.font({ size: options.fontSize });
    }
    if (options.fontFamily) {
      textElement.font({ family: options.fontFamily });
    }
    if (options.fontWeight) {
      textElement.font({ weight: options.fontWeight });
    }
    if (options.textAnchor) {
      textElement.attr('text-anchor', options.textAnchor);
    }
    if (options.dominantBaseline) {
      textElement.attr('dominant-baseline', options.dominantBaseline);
    }
    if (options.fill) {
      textElement.fill(this.resolveColor(options.fill));
    }
    if (options.stroke) {
      textElement.stroke({
        color: this.resolveColor(options.stroke),
        width: options.strokeWidth || 1,
      });
    }

    return this;
  }

  /**
   * Add a linear gradient definition
   */
  addLinearGradient(
    id: string,
    stops: GradientStop[],
    x1: number = 0,
    y1: number = 0,
    x2: number = 1,
    y2: number = 0
  ): this {
    const gradient = this.canvas.gradient('linear', (add: any) => {
      stops.forEach((stop) => {
        add.stop(stop.offset, stop.color, stop.opacity);
      });
    });

    gradient.from(x1, y1).to(x2, y2);
    gradient.id(id);

    return this;
  }

  /**
   * Add a radial gradient definition
   */
  addRadialGradient(id: string, stops: GradientStop[], cx: number = 0.5, cy: number = 0.5): this {
    const gradient = this.canvas.gradient('radial', (add: any) => {
      stops.forEach((stop) => {
        add.stop(stop.offset, stop.color, stop.opacity);
      });
    });

    gradient.attr({ cx, cy });
    gradient.id(id);

    return this;
  }

  /**
   * Add a line to the SVG
   */
  addLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    stroke?: string,
    strokeWidth: number = 1
  ): this {
    const line = this.canvas.line(x1, y1, x2, y2);

    if (stroke) {
      line.stroke({ color: this.resolveColor(stroke), width: strokeWidth });
    }

    return this;
  }

  /**
   * Add an ellipse to the SVG
   */
  addEllipse(x: number, y: number, rx: number, ry: number, fill?: string, stroke?: string): this {
    const ellipse = this.canvas.ellipse(rx * 2, ry * 2);
    ellipse.cx(x).cy(y);

    if (fill) {
      ellipse.fill(this.resolveColor(fill));
    }
    if (stroke) {
      ellipse.stroke(this.resolveColor(stroke));
    }

    return this;
  }

  /**
   * Add a polygon to the SVG
   */
  addPolygon(points: Array<[number, number]>, fill?: string, stroke?: string): this {
    const polygon = this.canvas.polygon(points);

    if (fill) {
      polygon.fill(this.resolveColor(fill));
    }
    if (stroke) {
      polygon.stroke(this.resolveColor(stroke));
    }

    return this;
  }

  /**
   * Add a polyline to the SVG
   */
  addPolyline(
    points: Array<[number, number]>,
    stroke?: string,
    strokeWidth: number = 1,
    fill: string = 'none'
  ): this {
    const polyline = this.canvas.polyline(points);

    polyline.fill(fill);
    if (stroke) {
      polyline.stroke({ color: this.resolveColor(stroke), width: strokeWidth });
    }

    return this;
  }

  /**
   * Add a group element
   */
  addGroup(id?: string): this {
    const group = this.canvas.group();
    if (id) {
      group.id(id);
    }
    return this;
  }


  /**
   * Export SVG as string
   */
  toSVGString(): string {
    const svgString = this.canvas.svg();

    // Clean up the SVG output
    return svgString
      .replace(/xmlns:svgjs="[^"]*"/g, '') // Remove svgjs namespace
      .replace(/svgjs:data="[^"]*"/g, '') // Remove svgjs data attributes
      .trim();
  }

  /**
   * Get the raw canvas (for advanced usage)
   */
  getCanvas(): any {
    return this.canvas;
  }

  /**
   * Get theme color by name
   */
  getThemeColor(colorName: string): string | undefined {
    return this.themeColors[colorName];
  }
}

/**
 * Helper function to create a quick SVG
 */
export function createSVG(
  width: number,
  height: number,
  theme?: Theme,
  builder?: (svg: SVGBuilder) => void
): string {
  const svgOptions: { width: number; height: number; theme?: Theme } = { width, height };
  if (theme) {
    svgOptions.theme = theme;
  }
  const svg = new SVGBuilder(svgOptions);

  if (builder) {
    builder(svg);
  }

  return svg.toSVGString();
}
