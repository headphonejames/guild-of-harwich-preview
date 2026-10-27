# Guild of Harwich Artists — Astro preview

An independent redesign preview built from the Guild’s verified public website, https://guildofharwichartists.org/. It does not replace or modify WordPress.

## Development

Run `npm ci`, `npm run check`, then `npm run build`. `npm run dev` starts a local development server. Open the printed server URL with `/guild-of-harwich-preview/` appended. `npm run preview -- --port 4322` serves the built site. Astro 7 requires Node >=22.23.4; a compatible project-local Node dev dependency is included. No credentials or environment secrets are required.

## Pages

Target: https://headphonejames.github.io/guild-of-harwich-preview/
Repository: https://github.com/headphonejames/guild-of-harwich-preview

The workflow checks and builds the static site, uploads its artifact, and deploys using GitHub’s Pages action. Repository Settings → Pages must use GitHub Actions. A push to main triggers deployment. The user approved public source visibility for this dedicated preview repository. GitHub Pages is configured with GitHub Actions; the workflow checks, builds and publishes changes to main. See the Actions run for the current deployment result.

All internal links and public images use `src/data/urls.ts`, which applies Astro’s configured base path. No production domain, DNS, CNAME or WordPress configuration is changed. Preview remains noindexed.

## Content

Eight routes: homepage, artist index, three profiles, gallery visit, community, membership. Artist/news records are in `src/data/content.ts`; media provenance is in `src/data/assets.json`. Shared layout and CSS live in `src/layouts/` and `src/styles/`. Only three artists are featured; remaining content and forms link to the existing public site. No contact submission backend is included.

See `docs/MIGRATION.md` for CMS alternatives and editorial discrepancies. Original artwork remains copyright its artists. Local research snapshots and browser screenshots are excluded from git.
