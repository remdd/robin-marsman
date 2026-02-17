# Centralise Links Config

## Overview

Create a central `src/config/` directory to consolidate all hardcoded URLs and links across the application. The config will serve as the single source of truth for site metadata, routes, social links, and external URLs, improving maintainability and reducing duplication.

## Structure

```
src/config/
├── index.ts      # Re-exports all config
├── site.ts       # Base site info (moved from metadata.ts)
├── routes.ts     # Internal navigation routes
├── links.ts      # External URLs (social, content, embeds)
```

## Tasks

- [x] **Create `src/config/site.ts`** - Move `SITE_CONFIG` from `metadata.ts` with site name, URL, description, locale, location, and genre

- [x] **Create `src/config/routes.ts`** - Define internal navigation routes (`/`, `/about`, `/mixes`, `/productions`) with labels, used by Navigation and preloadConfig

- [x] **Create `src/config/links.ts`** - External URLs organised by category:
  - `social`: Bandcamp, Mixcloud, Facebook profile URLs, email
  - `albums`: Bandcamp album URLs (e.g., Red World Dawning)
  - `mixcloudEmbeds`: Widget URLs for each embedded mix

- [x] **Create `src/config/index.ts`** - Barrel export for clean imports

- [x] **Update `src/lib/metadata.ts`** - Import `siteConfig` from config, remove duplicated `SITE_CONFIG`

- [x] **Update `src/components/Navigation/Navigation.tsx`** - Import routes from config instead of hardcoded `navItems`

- [x] **Update `src/components/SocialLinks/SocialLinks.tsx`** - Import social URLs from config

- [x] **Update `src/app/page.tsx`** - Import album URL from config

- [x] **Update `src/app/productions/page.tsx`** - Import album URL from config

- [x] **Update `src/app/mixes/page.tsx`** - Import Mixcloud profile and embed URLs from config

- [x] **Update `src/utils/preloadConfig.ts`** - Import routes from config instead of hardcoded paths
