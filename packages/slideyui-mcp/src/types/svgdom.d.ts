/**
 * Type definitions for svgdom
 * This provides minimal type definitions for the svgdom module
 */

declare module 'svgdom' {
  export function createSVGWindow(): {
    document: Document;
    XMLSerializer: typeof XMLSerializer;
  };
}
