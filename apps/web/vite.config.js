import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const allDeps = Object.keys(pkg.dependencies || {});
const reviewStats = JSON.parse(readFileSync(path.resolve(__dirname, 'src/data/reviewStats.json'), 'utf-8'));

// index.html's business schema carries the exact Google review count from reviewStats.json.
const reviewCountHtml = {
  name: 'review-count-html',
  transformIndexHtml: (html) => html.replaceAll('%REVIEW_COUNT%', String(reviewStats.reviewCount)),
};

export default defineConfig({
  optimizeDeps: {
    include: allDeps,
  },
  plugins: [
    react(),
    reviewCountHtml,
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      external: [
        '@babel/parser',
        '@babel/traverse',
        '@babel/generator',
        '@babel/types',
      ],
    },
    outDir: '../../dist/apps/web',
    emptyOutDir: true,
  },
});
