/**
 * Pattern Generator Utility
 *
 * Generates SVG background patterns for hero slides and decorative elements.
 * Supports geometric, organic, and abstract pattern types.
 */

import { SVGBuilder } from './svg-builder.js';
import type { Theme } from '../types/index.js';

export type PatternType = 'dots' | 'grid' | 'diagonal-lines' | 'waves' | 'gradient-mesh' | 'hexagon' | 'circles';

export interface PatternOptions {
  width: number;
  height: number;
  theme?: Theme;
  opacity?: number;
  density?: 'low' | 'medium' | 'high';
  color?: string;
}

export function generatePattern(type: PatternType, options: PatternOptions): string {
  const { width, height, theme, opacity = 0.1, density = 'medium', color = 'primary' } = options;

  const builderOptions: { width: number; height: number; theme?: Theme } = { width, height };
  if (theme) {
    builderOptions.theme = theme;
  }
  const builder = new SVGBuilder(builderOptions);
  
  // Density multipliers
  const densityMap = { low: 1.5, medium: 1, high: 0.66 };
  const spacing = 40 * densityMap[density];

  switch (type) {
    case 'dots':
      return generateDots(builder, width, height, spacing, color, opacity);
    case 'grid':
      return generateGrid(builder, width, height, spacing, color, opacity);
    case 'diagonal-lines':
      return generateDiagonalLines(builder, width, height, spacing, color, opacity);
    case 'waves':
      return generateWaves(builder, width, height, color, opacity);
    case 'circles':
      return generateCircles(builder, width, height, spacing, color, opacity);
    case 'hexagon':
      return generateHexagons(builder, width, height, spacing, color, opacity);
    case 'gradient-mesh':
      return generateGradientMesh(builder, width, height, color, opacity);
    default:
      return builder.toSVGString();
  }
}

function generateDots(builder: SVGBuilder, width: number, height: number, spacing: number, color: string, _opacity: number): string {
  const radius = spacing / 10;
  for (let x = spacing / 2; x < width; x += spacing) {
    for (let y = spacing / 2; y < height; y += spacing) {
      builder.addCircle(x, y, radius, color);
    }
  }
  return builder.toSVGString();
}

function generateGrid(builder: SVGBuilder, width: number, height: number, spacing: number, color: string, _opacity: number): string {
  // Vertical lines
  for (let x = 0; x < width; x += spacing) {
    builder.addLine(x, 0, x, height, color, 1);
  }
  // Horizontal lines
  for (let y = 0; y < height; y += spacing) {
    builder.addLine(0, y, width, y, color, 1);
  }
  return builder.toSVGString();
}

function generateDiagonalLines(builder: SVGBuilder, width: number, height: number, spacing: number, color: string, _opacity: number): string {
  const diagonal = Math.sqrt(width * width + height * height);
  for (let offset = -diagonal; offset < diagonal; offset += spacing) {
    builder.addLine(0, offset, diagonal, offset - diagonal, color, 2);
  }
  return builder.toSVGString();
}

function generateWaves(builder: SVGBuilder, width: number, height: number, color: string, _opacity: number): string {
  const amplitude = 30;
  const frequency = 0.01;
  
  for (let y = 0; y < height; y += 60) {
    let pathData = `M 0 ${y}`;
    for (let x = 0; x <= width; x += 10) {
      const waveY = y + Math.sin(x * frequency) * amplitude;
      pathData += ` L ${x} ${waveY}`;
    }
    builder.addPath(pathData, { stroke: color, strokeWidth: 2, fill: 'none' });
  }
  return builder.toSVGString();
}

function generateCircles(builder: SVGBuilder, width: number, height: number, spacing: number, color: string, _opacity: number): string {
  for (let x = spacing; x < width; x += spacing * 2) {
    for (let y = spacing; y < height; y += spacing * 2) {
      builder.addCircle(x, y, spacing / 3, 'none', color);
    }
  }
  return builder.toSVGString();
}

function generateHexagons(builder: SVGBuilder, width: number, height: number, spacing: number, color: string, _opacity: number): string {
  const hexRadius = spacing / 2;
  const hexHeight = hexRadius * Math.sqrt(3);
  const hexWidth = hexRadius * 2;
  
  for (let row = 0; row < height / hexHeight + 1; row++) {
    for (let col = 0; col < width / hexWidth + 1; col++) {
      const x = col * hexWidth * 0.75;
      const y = row * hexHeight + (col % 2 ? hexHeight / 2 : 0);
      
      const points: [number, number][] = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        points.push([
          x + hexRadius * Math.cos(angle),
          y + hexRadius * Math.sin(angle)
        ]);
      }
      builder.addPolygon(points, 'none', color);
    }
  }
  return builder.toSVGString();
}

function generateGradientMesh(builder: SVGBuilder, width: number, height: number, color: string, opacity: number): string {
  builder.addRadialGradient(
    'mesh',
    [
      { offset: 0, color: color, opacity: opacity * 1.5 },
      { offset: 0.5, color: color, opacity: opacity },
      { offset: 1, color: color, opacity: 0 }
    ],
    50,
    50
  );

  // Create mesh pattern with gradient circles
  for (let x = width / 4; x < width; x += width / 3) {
    for (let y = height / 4; y < height; y += height / 3) {
      builder.addCircle(x, y, width / 4, color);
    }
  }

  return builder.toSVGString();
}
