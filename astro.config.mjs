import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL;

export default defineConfig({
  site: 'https://usgarhotels.com',
  output: 'static',
  adapter: isVercel ? vercel() : node({ mode: 'standalone' }),
  integrations: [sitemap()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
        webp: { effort: 6, quality: 80 },
        jpeg: { mozjpeg: true, quality: 80 },
      },
    },
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

