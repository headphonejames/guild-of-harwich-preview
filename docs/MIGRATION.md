# Research and migration decisions

## Verified public source

https://guildofharwichartists.org/ is the Guild's public WordPress site, identifying the Guild of Harwich Artists, its 1979 founding, gallery at 551 Route 28 / Main Street, Harwich Port, and (508) 432-1012. Search results independently identified the Art Gallery of the Guild of Harwich Artists in Harwich Port. The homepage currently calls itself a “Beta Site”; this is what the public domain serves, not an inference that our local redesign has been published.

Inspected homepage, gallery, Chris Banks, Larry Folding, Martha Little Fuentes, contact, membership opportunities, October 29 painting-session and November 21 general-meeting pages on 2026-10-27. Read-only parsed snapshots in `public-source-snapshots/`. Homepage browser inspection confirmed black navigation, burgundy links, serif identity, community photographs, gallery sign, artist dropdown and a dense news/sidebar layout. Redesign retains burgundy and serif character with warm gallery-paper surfaces and much larger artwork. It consolidates navigation around artists, gallery, community, and membership.

## Data issues requiring editorial confirmation

- Gallery page says daily June to mid-October; sidebar says Memorial Day to Columbus Day; May announcement says through Labor Day. Shared fall guidance says weekends 11–4 through mid-December. Preview only gives the fall guidance with a call-before-travel caveat; do not build an open-now badge until the Guild confirms a single schedule.
- Thursday event description says Thursday afternoon, but calendar recurrence starts October 29 at 1 pm and ends October 31 at 3:30 pm (similar two-day offsets recur). Preview describes the program and links to source without silently correcting or repeating unreliable event end dates.
- November 21, 2026 general meeting is listed 1:30–4 at Harwich Community Center. Preview links directly to that source listing rather than creating an independent calendar.
- Membership homepage says Cape Cod residents; contact page includes Barnstable County residents or taxpayers. Older forms and 2022 membership page remain linked. Do not promise current dues or eligibility before editorial review.
- 2024 calendar label points at a 2023 upload; scholarship form is 2020. Avoid promoting outdated downloads as current.
- Source gallery states 22 artists but navigation links contain a shorter list. Three verified profiles are featured, explicitly described as a first collection rather than the complete roster.

## CMS choices — no commitment yet

**Retain WordPress as editorial CMS.** Astro can consume a read-only REST API at build time, using stable WordPress IDs and slugs. Editors keep familiar media/posts and The Events Calendar. Requires inspection of public API coverage, artist custom fields, event recurrence and media metadata; draft previews need separately scoped authorization. Content changes trigger rebuilds only after hosting is selected. Keep WordPress secure and maintained even when the front end moves.

**Import into Astro content collections.** Export approved WordPress content into typed Markdown/JSON; copy media with provenance, caption and alt text; commit only after user approval. Strong portability and no live CMS dependency, but volunteer editors need an acceptable editing workflow. WordPress WXR export or authenticated read-only export may help later; admin access is not needed now.

**Hybrid.** Static organization/gallery pages plus API-backed news/events at build time. Could reduce initial migration but creates two editing paths. Decide after a short editor walkthrough and inventory.

Current prototype uses local typed records as a reversible presentation layer. It deliberately does not install WordPress plugins, request credentials, choose hosting or wire write APIs.

## Future migration checklist

Confirm content owners, active artists, rights and seasonal hours; inventory slugs/posts/media/forms/events; choose editor workflow; retain source IDs and redirect map; normalize event timezone to America/New_York and repair recurrence; migrate all artist artwork with credits; implement accessible search if needed; decide contact-form delivery and spam controls; test link redirects, SEO/canonicals/social previews, keyboard/screen-reader paths and performance; obtain launch approval before production work.

