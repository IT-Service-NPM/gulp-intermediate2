import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: [
    'src/index.ts',
    'src/lib/intermediate/index.ts'
  ],
  format: ['cjs', 'esm'],
  splitting: false,
  dts: true,
  outDir: 'dist',
  clean: true,
  sourcemap: true
});
