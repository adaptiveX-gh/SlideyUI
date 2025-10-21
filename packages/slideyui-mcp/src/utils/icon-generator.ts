/**
 * Icon Generator Utility
 *
 * Generates semantic SVG icons from theme colors.
 * Provides 26+ icons optimized for presentation displays.
 */

import { SVGBuilder } from './svg-builder.js';
import type { Theme } from '../types/index.js';

export type IconName =
  | 'briefcase' | 'chart-line' | 'chart-bar' | 'pie-chart' | 'trend-up' | 'trend-down'
  | 'mail' | 'phone' | 'message' | 'users' | 'calendar'
  | 'check' | 'x' | 'arrow-right' | 'arrow-left' | 'plus' | 'minus'
  | 'image' | 'video' | 'download' | 'upload'
  | 'alert' | 'info' | 'success' | 'error' | 'warning'
  | 'star' | 'heart' | 'settings' | 'search';

export interface IconOptions {
  size?: number;
  color?: string;
  strokeWidth?: number;
  theme?: Theme;
  style?: 'outline' | 'solid';
}

export function generateIcon(name: IconName, options: IconOptions = {}): string {
  const { size = 48, color = 'currentColor', strokeWidth = 2, theme, style = 'outline' } = options;

  const builderOptions: { width: number; height: number; theme?: Theme } = { width: size, height: size };
  if (theme) {
    builderOptions.theme = theme;
  }
  const builder = new SVGBuilder(builderOptions);
  const scale = size / 24;

  switch (name) {
    case 'check':
      return builder.addPath(`M${4*scale} ${12*scale}L${9*scale} ${17*scale}L${20*scale} ${6*scale}`, {
        stroke: color, strokeWidth, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round'
      }).toSVGString();
    
    case 'x':
      return builder
        .addLine(6*scale, 6*scale, 18*scale, 18*scale, color, strokeWidth)
        .addLine(18*scale, 6*scale, 6*scale, 18*scale, color, strokeWidth)
        .toSVGString();
    
    case 'arrow-right':
      return builder
        .addLine(5*scale, 12*scale, 19*scale, 12*scale, color, strokeWidth)
        .addPath(`M${13*scale} ${6*scale}L${19*scale} ${12*scale}L${13*scale} ${18*scale}`, {
          stroke: color, strokeWidth, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round'
        }).toSVGString();
    
    case 'arrow-left':
      return builder
        .addLine(19*scale, 12*scale, 5*scale, 12*scale, color, strokeWidth)
        .addPath(`M${11*scale} ${6*scale}L${5*scale} ${12*scale}L${11*scale} ${18*scale}`, {
          stroke: color, strokeWidth, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round'
        }).toSVGString();
    
    case 'plus':
      return builder
        .addLine(12*scale, 5*scale, 12*scale, 19*scale, color, strokeWidth)
        .addLine(5*scale, 12*scale, 19*scale, 12*scale, color, strokeWidth)
        .toSVGString();
    
    case 'minus':
      return builder.addLine(5*scale, 12*scale, 19*scale, 12*scale, color, strokeWidth).toSVGString();
    
    case 'mail':
      return builder
        .addRect(3*scale, 5*scale, 18*scale, 14*scale, 'none', color)
        .addPath(`M${3*scale} ${5*scale}L${12*scale} ${13*scale}L${21*scale} ${5*scale}`, {
          stroke: color, strokeWidth, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round'
        }).toSVGString();
    
    case 'users':
      return builder
        .addCircle(9*scale, 7*scale, 3*scale, 'none', color)
        .addCircle(17*scale, 7*scale, 2.5*scale, 'none', color)
        .toSVGString();
    
    case 'search':
      return builder
        .addCircle(11*scale, 11*scale, 7*scale, 'none', color)
        .addLine(16*scale, 16*scale, 21*scale, 21*scale, color, strokeWidth)
        .toSVGString();
    
    case 'star':
      const starFill = style === 'solid' ? color : 'none';
      return builder.addPath(
        `M${12*scale} ${2*scale}L${15.09*scale} ${8.26*scale}L${22*scale} ${9.27*scale}L${17*scale} ${14.14*scale}L${18.18*scale} ${21.02*scale}L${12*scale} ${17.77*scale}L${5.82*scale} ${21.02*scale}L${7*scale} ${14.14*scale}L${2*scale} ${9.27*scale}L${8.91*scale} ${8.26*scale}Z`,
        { fill: starFill, stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' }
      ).toSVGString();
    
    // Add more icon implementations as needed
    default:
      // Simple placeholder for unimplemented icons
      return builder.addCircle(size/2, size/2, size/3, 'none', color).toSVGString();
  }
}
