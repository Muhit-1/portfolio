import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    // three real pages; the mockups at the repo root and in mockups/ are left out
    rollupOptions: {
      input: {
        main: 'index.html',
        projects: 'projects.html',
        project: 'project.html',
      },
    },
  },
});
