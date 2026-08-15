# Portfolio SEO Audit and Remediation Record

## 1. Objective

Improve the technical and on-page search foundation of the Michael Ndhlovu portfolio without changing the approved cinematic design language, inventing portfolio evidence, or re-enabling automatic Vercel deployments.

Primary search themes supported by the real portfolio are:

- Michael Ndhlovu
- Mikey Nu
- software developer
- software development
- website and web application development
- mobile application development
- 3D generalist
- 3D design
- 3D modeling
- 3D visualization
- immersive experience design
- VR design
- VR solutions
- South African creative technology and digital production

These terms are used where they describe actual services or work. The implementation does not create repetitive keyword blocks or search-only copy.

## 2. Source hierarchy

SEO changes follow this priority order:

1. Current user instructions.
2. Root `DESIGN.md`.
3. `docs/DESIGN_RULES.md`.
4. Verified portfolio content in source.
5. Current Google Search Central technical guidance.
6. Current Vercel routing and project configuration guidance.

Search optimization must not override the visual identity or fabricate professional claims.

## 3. Audit findings before remediation

### 3.1 Single generic document title

The application originally shipped one generic HTML title:

`Michael Ndhlovu Design Portfolio`

There was no static meta description, canonical link, Open Graph metadata, Twitter card metadata, robots directive, favicon declaration, or structured data in the initial document.

Impact:

- weak page differentiation in search;
- weak snippet guidance;
- poor social sharing previews;
- no explicit canonical preference;
- no machine-readable person, site, service, project, or breadcrumb entities.

Status: REMEDIATED.

### 3.2 Hash-based application routing

The portfolio used fragment routes such as:

- `#projects`
- `#services`
- `#about`
- `#contact`
- `#case-study/1`

Meaningful site content therefore did not have normal document paths.

Impact:

- weak crawl architecture;
- case studies did not have descriptive, shareable URLs;
- URLs did not communicate page subject;
- direct search landing pages were less explicit.

Status: REMEDIATED.

Canonical paths are now:

- `/`
- `/work`
- `/services`
- `/about`
- `/contact`
- `/work/netflix-multi-show-launch-display`
- `/work/arknights-endfield-gamescom-2025-stand`
- `/work/sonic-racing-crossworlds-stand-gamescom-2025`
- `/work/genshin-impact-exhibition-booth`

Legacy root hash routes remain understood by the client and are replaced with the new path when loaded.

### 3.3 JavaScript buttons used as navigation

Primary navigation, footer navigation, Work case-study navigation, case-study breadcrumbs, case-study previous and next controls, the Home work CTA, and the Services contact CTA relied on buttons or JavaScript actions.

Impact:

Search crawlers could not rely on ordinary anchor discovery for the important internal page graph.

Status: REMEDIATED.

These navigational actions now use real `<a href>` links while normal clicks still use the existing client-side navigation behavior. Modifier clicks remain available for opening links in new tabs or windows.

### 3.4 No sitemap or robots file

The public output had no `robots.txt` or `sitemap.xml`.

Status: REMEDIATED.

`public/robots.txt` now allows crawling and advertises the canonical sitemap.

`public/sitemap.xml` now contains the canonical page set and uses the Google image sitemap extension for relevant portfolio images.

### 3.5 Visual assets not fully discoverable

The portfolio is strongly visual. Some Home design gallery images are intentionally rendered as CSS backgrounds rather than ordinary image elements.

Impact:

These visual assets had weaker direct discovery signals.

Status: REMEDIATED.

The XML sitemap now explicitly lists:

- the eight published interface design gallery images;
- primary Work archive images;
- Netflix gallery imagery;
- Arknights gallery imagery;
- Sonic gallery imagery;
- the Genshin case-study image;
- relevant Services and About presentation imagery.

### 3.6 Duplicate hostnames

The same production project is available through several known Vercel aliases.

Canonical host selected:

`https://michaelndhlovu.vercel.app`

Status: REMEDIATED IN CONFIGURATION.

Known alternate production aliases are configured to permanently redirect to the canonical host after the next manual deployment.

Every indexable page also carries a self-referencing canonical URL.

### 3.7 No route-specific initial HTML metadata

A client-rendered SPA can update document metadata after JavaScript executes, but relying only on runtime changes leaves social crawlers and non-rendering clients with one shared initial document.

Status: REMEDIATED.

The build now runs:

`vite build && node scripts/generate-seo-pages.mjs`

The generator creates route-specific HTML shells for Work, Services, About, Contact, and all four public case studies. Each shell receives its own:

- document title;
- meta description;
- canonical URL;
- Open Graph title;
- Open Graph description;
- Open Graph URL;
- Open Graph image and image alt text;
- Twitter title;
- Twitter description;
- Twitter image and image alt text.

Vercel rewrites the canonical paths to the corresponding generated HTML shell.

### 3.8 No structured data

Status: REMEDIATED.

The SEO layer now maintains structured data for:

- `WebSite`;
- `WebPage`;
- `Person`;
- `ProfilePage` on About;
- service list information on Services;
- `CollectionPage` on Work;
- `CreativeWork` for public case studies;
- `BreadcrumbList` on public case studies;
- `ContactPage` on Contact.

The person entity uses the real name Michael Ndhlovu and public identity Mikey Nu. It links to the public ArtStation and CGTrader profiles already discoverable on the web.

### 3.9 Weak image alt specificity

Project images commonly used only the project title as alt text.

Status: IMPROVED.

Portfolio and case-study imagery now uses descriptive project-oriented alt text where the image carries content. Decorative concept imagery remains empty or hidden from assistive technology as appropriate.

### 3.10 Nested main landmark on project detail

`CaseStudyPage` created another `<main>` inside the application-level `<main>`.

Status: REMEDIATED.

The case-study inner layout no longer creates a nested main landmark.

### 3.11 No search-result favicon

Status: REMEDIATED.

A brand-aligned square SVG favicon is now available at `/favicon.svg` and declared in the document head.

## 4. Metadata strategy

### Home

Title:

`Michael Ndhlovu | Software Developer, 3D Generalist & VR Designer`

Purpose:

Establish the person, the three actual practice areas, and the portfolio identity without keyword repetition.

### Work

Title:

`Selected Work | Michael Ndhlovu 3D & Digital Portfolio`

Purpose:

Describe the portfolio archive while accurately reflecting that the currently documented public case studies are strongest in 3D and experiential production.

### Services

Title:

`Software Development, 3D Design & VR Solutions | Michael Ndhlovu`

Purpose:

Make the three commercial service pillars explicit. Software includes websites, web applications, mobile applications, platforms, frontend engineering, backend services, APIs, integrations, automation, and interactive 3D web work.

### About

Title:

`About Michael Ndhlovu | Software, 3D & VR`

Purpose:

Give branded and non-branded person searches a dedicated profile destination.

### Contact

Title:

`Contact Michael Ndhlovu | Software, 3D & VR Projects`

Purpose:

Create a clear transactional destination for users who already understand the offering.

### Case studies

Each public case study receives a project-specific title and description derived from verified source content rather than generic portfolio text.

## 5. Internal linking strategy

The crawl graph now exposes:

Home -> Work

Global navigation -> Work / Services / About / Contact

Footer -> Work / Services / About / Contact

Work -> each documented public case study

Work empty software or VR filter -> Services

Services -> Contact

Case study -> Work

Case study -> previous case study

Case study -> next case study

This keeps important pages reachable through ordinary anchor relationships without adding artificial SEO sections to the visible design.

## 6. Canonicalization strategy

Preferred host:

`michaelndhlovu.vercel.app`

Signals used together:

1. self-referencing canonical links;
2. canonical URLs in the XML sitemap;
3. canonical URLs in structured data;
4. canonical Open Graph URLs;
5. permanent redirects for known alternate Vercel aliases.

The application no longer uses hash fragments to represent primary content states.

## 7. Structured data integrity rules

Structured data must describe visible and verifiable content.

Do not add:

- fake ratings;
- fake reviews;
- fake awards;
- fake employment relationships;
- unverified addresses;
- fabricated project dates;
- fabricated project outcomes;
- fictional software or VR case studies;
- LocalBusiness markup without a justified public business identity and real location policy.

The site intentionally uses restrained schema rather than maximizing schema types for appearance alone.

## 8. Performance and Core Web Vitals

### Existing strengths

- portfolio imagery has already been converted heavily to WebP;
- critical fonts are self-hosted and preloaded;
- most below-fold project images use lazy loading;
- Vercel serves the application over HTTPS;
- responsive layouts are already implemented for mobile and desktop.

### Hero media constraint

The approved landing hero uses two synchronized MP4 backgrounds:

- `bg_video_darkmode.mp4`: approximately 3.69 MB decimal;
- `bg_video_lightmode.mp4`: approximately 3.27 MB decimal;
- combined: approximately 6.8 MiB.

Both are retained because synchronized light and dark theme switching is an approved design behavior.

Do not optimize this by silently removing one video, converting the hero into a static image, or delaying the alternate video so aggressively that theme switching breaks.

Post-deployment measurement should determine whether the media materially harms LCP, INP, or network contention on representative mobile connections before changing the implementation.

## 9. What was deliberately not done

### No keyword stuffing

The site does not repeat city names, service names, technology names, or brand names purely to target queries.

### No fictional location targeting

The site uses `en-ZA` and accurately identifies Michael as South African in metadata. It does not create doorway pages such as `web-developer-johannesburg`, `web-developer-cape-town`, or similar pages without unique real content.

### No fake testimonial or FAQ schema

There is no evidence base for adding ratings, reviews, or search-oriented FAQ content.

### No deployment automation

`vercel.json` continues to contain:

```json
"git": {
  "deploymentEnabled": false
}
```

The SEO implementation does not restore automatic preview or production deployments.

## 10. Validation performed before merge

Source-level checks include:

- all canonical routes match route parsing and route generation;
- all public case-study slugs match project titles;
- sitemap page URLs match canonical route URLs;
- image sitemap URLs correspond to repository assets;
- navigation anchors retain SPA behavior and valid `href` values;
- modifier-click behavior is preserved;
- legacy root hash routes remain recoverable;
- route-specific metadata generation uses absolute canonical URLs;
- Vercel routing preserves `git.deploymentEnabled: false`;
- the SEO shell generator passes Node syntax validation;
- no catch-all rewrite converts arbitrary unknown URLs into the Home page;
- the case-study content hierarchy contains one application main landmark;
- public case-study breadcrumbs are both visible links and structured data.

A local repository build could not be executed in the current agent container because outbound DNS resolution for `github.com` is unavailable. No successful local build is claimed.

## 11. Required post-merge release steps

Automatic deployments are intentionally disabled. The merged SEO changes will therefore not affect the live site until a manual Vercel deployment is performed.

After manual deployment:

1. Verify `/`, `/work`, `/services`, `/about`, `/contact`, and each case-study URL returns HTTP 200.
2. Verify unknown paths return a real 404 rather than the Home page.
3. Verify the three known alternate Vercel aliases permanently redirect to `michaelndhlovu.vercel.app` while preserving the path.
4. View page source on each major route and confirm route-specific title, description, canonical, Open Graph, and Twitter metadata before JavaScript runs.
5. Verify `/robots.txt`, `/sitemap.xml`, and `/favicon.svg` return HTTP 200.
6. Run Google Rich Results Test on About and at least one case-study URL.
7. Use Google Search Console URL Inspection on Home, Services, Work, and one case study.
8. Submit `https://michaelndhlovu.vercel.app/sitemap.xml` in Google Search Console.
9. Request indexing for the important canonical URLs after validation.
10. Monitor Search Console Page Indexing, Search Performance, Core Web Vitals, HTTPS, and structured-data reports.
11. Run PageSpeed Insights on mobile for Home, Work, Services, and a case study, then optimize measured bottlenecks rather than guessing.

## 12. Search Console dependency

Search Console submission is not performed by this repository change. It requires access to the verified Google Search Console property for the canonical site.

If the property has not yet been created, establish a Search Console property for `michaelndhlovu.vercel.app`, complete verification, and submit the sitemap after the manual deployment.

## 13. Ongoing content opportunities

Technical SEO removes discovery barriers but cannot substitute for useful, evidence-rich content.

The highest-quality future opportunities are:

1. Publish real software development case studies when public examples are available.
2. Publish real VR case studies when public examples are available.
3. Add deeper process notes to major 3D case studies when the information can be shared publicly.
4. Add project-specific image context when it improves understanding rather than padding page length.
5. Link new public work from relevant professional profiles and real project announcements.
6. Keep page titles and sitemap entries synchronized when project names or public case studies change.
7. Refresh `lastmod` only when a page has meaningful content changes.

The goal is to build topical evidence through real work, not manufacture SEO pages around keywords.
