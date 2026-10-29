import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.myglobal.site',
  integrations: [
    starlight({
      title: { 'es-MX': 'Guía de MYGLOBAL.site', 'en-US': 'MYGLOBAL.site Guide' },
      defaultLocale: 'root',
      locales: {
        root: { label: 'Español', lang: 'es-MX' },
        en: { label: 'English', lang: 'en-US' },
      },
      head: [
        { tag: 'script', attrs: { src: '/runtime-config.js', defer: true } },
        { tag: 'script', attrs: { src: '/matomo-init.js', defer: true } },
        { tag: 'script', attrs: { src: '/analytics-consent.js', defer: true } },
        { tag: 'script', attrs: { src: '/chatwoot-init.js', defer: true } },
      ],
      sidebar: [
        {
          label: 'Primeros pasos',
          translations: { 'en-US': 'Getting started' },
          items: [{ autogenerate: { directory: 'getting-started' } }],
        },
        {
          label: 'Agora',
          items: [{ autogenerate: { directory: 'agora' } }],
        },
        {
          label: 'Miembros',
          translations: { 'en-US': 'Members' },
          items: [{ autogenerate: { directory: 'members' } }],
        },
        {
          label: 'Consumidores',
          translations: { 'en-US': 'Consumers' },
          items: [{ autogenerate: { directory: 'consumers' } }],
        },
        {
          label: 'Ayuda general',
          translations: { 'en-US': 'General help' },
          items: [{ autogenerate: { directory: 'common' } }],
        },
      ],
    }),
  ],
});
