import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    server: 'src/server.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  splitting: false,
  treeshake: true,
  outDir: 'dist',
  target: 'node18',
  platform: 'node',
  // Preserve shebang for server.ts
  esbuildOptions(options) {
    options.banner = {
      js: '#!/usr/bin/env node',
    };
  },
});
