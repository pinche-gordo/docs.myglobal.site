# docs.myglobal.site

Public, screenshot-based user documentation for MYGLOBAL.site, built with Astro Starlight and intended for `https://docs.myglobal.site/`. Spanish (Mexico) is the default at `/`; English (United States) is available at `/en/`.

## Project structure

- `src/content/docs/` contains the Spanish pages.
- `src/content/docs/en/` contains corresponding English pages. Keep translated pages on matching paths so Starlight can associate them.
- `src/content/docs/<section>/` holds pages for a section; place page-specific screenshots next to the relevant content and reference them with relative paths.
- `astro.config.mjs` configures the locales, localized sidebar, and public hostname.

## Access and content boundaries

The guide is public and can be read without a MYGLOBAL account. Public pages can also serve as a curated source for search and AI assistants. Starlight generates a static documentation site; role-based access and MYGLOBAL SSO are not provided by Starlight. If private, role-gated documentation is needed, design and verify that separately at the hosting or identity layer before publishing any restricted material.

Use demonstration data in screenshots. Check for names, email addresses, wallet details, referral codes, QR codes, and other account-specific information before publishing. Add useful alt text and keep essential instructions in text.

## Analytics and chat configuration

Matomo and Chatwoot settings are loaded from `public/runtime-config.js`, which is ignored by Git. Start from `config/runtime-config.example.js`, copy it to `public/runtime-config.js`, and set the site-specific values before building or deploying. Keep deployment-specific settings out of the repository. The Matomo site ID and Chatwoot website token are browser-visible identifiers, so they are not server-side secrets even though their source configuration is excluded from Git.

## Source of truth

This repository is canonical for the published guide and documentation-site configuration. Verify product behavior against the owning product code and tests. Obsidian holds project context and links here; it should not duplicate the public guide.

## Local preview

Run `npm install`, then `npm run dev`. Create a production build with `npm run build`.

## Current state

The user reports that `docs.myglobal.site` points to aaPanel. The site is not ready to deploy until DNS, its web-server configuration, document root, and HTTPS are verified. This directory is an independent local Git repository on `main`, with no remote or commits yet. The bilingual Starlight site builds locally; section pages are navigation scaffolds pending verification and writing of product workflows.
