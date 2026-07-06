import { defineConfig, passthroughImageService } from 'astro/config';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL;

export default defineConfig({
  output: 'static',
  adapter: isVercel ? vercel() : node({ mode: 'standalone' }),
  image: {
    // Using passthrough locally (Sharp blocked by Windows policy)
    // Vercel will optimize images automatically in production
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});

