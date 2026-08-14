# Portfolio Cinematic Redesign Implementation Plan

## 1. Objective

Implement the approved cinematic portfolio design across the live portfolio while preserving verified production content and the existing dual-video landing hero.

The redesign must merge the portfolio into three primary service pillars:

1. **Software Development**: websites, web applications, mobile applications, platforms, frontend systems, backend services, APIs, integrations, and broader IT product development.
2. **3D Design & Visualization**: 3D modeling, UV work, texturing, lighting, rendering, animation, spatial design, exhibition design, branded environments, character and cloth work.
3. **VR Solutions**: immersive experiences, real-time interactive environments, VR applications, spatial interaction, Unity/Unreal/WebXR delivery, and XR-oriented product experiences.

The final product must follow the supplied concept screens proportion-for-proportion rather than pixel-for-pixel. It must remain responsive, accessible, evidence-based, and production-appropriate.

## 2. Non-negotiable source hierarchy

Implementation decisions must use this priority order:

1. Current explicit user instructions.
2. Supplied concept screens.
3. Root `DESIGN.md`.
4. `docs/DESIGN_RULES.md`.
5. Existing verified portfolio content and real project imagery.
6. Existing reusable implementation primitives.
7. General web conventions.

No lower-priority source may override a higher-priority source.

## 3. Locked hero constraint

The existing landing-page hero is a hard preservation boundary.

Do not change:

- `src/components/ModernHero.tsx` media structure;
- `/renders/bg_video_lightmode.mp4`;
- `/renders/bg_video_darkmode.mp4`;
- stacked light/dark video behavior;
- light theme to light video mapping;
- dark theme to dark video mapping;
- full-bleed video coverage;
- autoplay, loop, muted, `playsInline`, and preload behavior.

The rest of the application may be redesigned around it.

## 4. Evidence and content-integrity rules

The concept screens contain fictional names and example content such as AVELLINO, Echoes, Beyond, Interval, Awwwards awards, engagement metrics, dates, response-time claims, and concept contact information. These are layout references only.

Implementation must:

- retain real portfolio project names, brands, roles, years, agencies, deliverables, and imagery already present in source;
- never invent awards, metrics, testimonials, client relationships, case-study outcomes, or software/VR projects;
- use extracted concept assets as brand/presentation imagery only where they are not represented as real client work;
- use real project renders for actual project entries and case studies;
- centralize shared project data so project metadata cannot drift between archive, featured work, and case-study views.

## 5. Existing assets to use

### Locked hero media

- `public/renders/bg_video_darkmode.mp4`
- `public/renders/bg_video_lightmode.mp4`

### Extracted cinematic reference assets

Use as presentation assets where appropriate:

- `public/renders/assets/approach-assets (1).png` through `(6).png`
- `public/renders/assets/what-do-assets (1).png` through `(6).png`
- `public/renders/assets/echoes-assets (1).png` through `(6).png`

These assets may support About, Services, transition compositions, and cinematic editorial surfaces. They must not be labeled as real client projects unless source data proves that relationship.

### Real project media

Continue using existing project renders from `src/data/renderAssets.ts` for Netflix, Arknights, SEGA/Sonic, Genshin Impact, CeraVe, Hulu, Heineken, Pepsi, Discovery Bank, Mercedes-Benz/Daimler, GAC, and other verified portfolio work.

## 6. Information architecture

The primary navigation becomes:

- `WORK`
- `SERVICES`
- `ABOUT`
- `CONTACT`

The production identity at top left returns to Home.

The route/page model becomes:

- Home
- Work
- Services
- About
- Contact
- Project detail

The active navigation state must use the restrained Steel Blue underline defined in `DESIGN.md`.

## 7. Shared data architecture

Create `src/data/portfolioContent.ts` as the canonical source for:

- project metadata;
- project detail content;
- featured project ordering;
- project categories;
- service definitions;
- service deliverables;
- process steps;
- tools/capabilities;
- contact project-type options;
- page index labels.

Remove duplicated project arrays from page components.

This prevents inconsistencies between project archive and case-study metadata and avoids future spaghetti-code drift.

## 8. Visual system implementation

Create `src/styles/cinematic-portfolio.css`, imported after existing styles.

It must encode the approved system:

### Color system

Dark theme:

- Void `#070707` page canvas
- Graphite `#111214` supporting dark surface
- Steel `#2A2D31` dividers and low-contrast structure
- Silver `#A2A6A0` secondary text
- Paper `#EDEDE0` primary text
- Steel Blue `#4A6A8A` single accent

Light theme:

- Paper `#EDEDE0` page canvas
- Void/Graphite primary text
- Steel secondary text and dividers
- Steel Blue retained as the single accent

### Typography

Use the approved font-family declarations:

- display: `Druk Condensed`, then documented condensed fallbacks;
- functional/body: `Neue Haas Grotesk`, then documented Helvetica fallbacks.

Do not download or redistribute proprietary fonts. If licensed font files are absent, preserve the exact family declarations and use the approved fallback chain.

### Geometry

- 12-column desktop grid
- maximum content width near 1440px
- 32px desktop column gutters
- 80px large-screen outer margins
- sharp 0px component corners by default
- 1px hairline structural rules
- no decorative card shadow system
- no glassmorphism
- no generic rounded-card grids

### Motion

Use only minimal state transitions:

- active navigation underline;
- text/link color changes;
- selected filter state;
- theme video crossfade already present;
- image viewer open/close state without decorative animation.

Honor `prefers-reduced-motion`.

## 9. Navigation and global shell

Rewrite `ImprovedCreativeNavigation.tsx` to match the concepts:

- visually transparent canvas-integrated header;
- production text identity on the left, no invented monogram;
- WORK, SERVICES, ABOUT, CONTACT aligned right;
- thin Steel Blue active underline;
- theme toggle remains functional but visually subordinate;
- no background blur, floating pill, large CTA, or navigation shadow;
- mobile menu becomes a full-canvas editorial menu using hairline separators and large readable targets.

Update `App.tsx` to add the Services page and preserve theme as the single source of truth.

## 10. Home page

Keep `ModernHero` unchanged.

`CreativeHomePage.tsx` should become a minimal wrapper around the locked hero rather than reintroducing the old content stack.

Do not add hero text, buttons, badges, overlays, project cards, client rails, or decorative particles over the video.

The user should reach Work, Services, About, and Contact through the persistent navigation.

## 11. Work page

Rewrite `CreativeProjectsPage.tsx` using the `selected-projects.png` proportions.

Desktop composition:

- left editorial rail with `WORK / SELECTED PROJECTS` and a very large `SELECTED WORK` display heading;
- supporting copy beneath the heading;
- large negative space treated as composition, not filled with generic modules;
- top-right project filters;
- asymmetric real-project compositions across the main field;
- large image-first modules with small two-digit indices, category, title, short verified role summary, and `VIEW PROJECT` action;
- straight image edges and no rounded cards;
- bottom page index and scroll affordance where appropriate.

Filtering:

- `ALL`
- `SOFTWARE`
- `3D`
- `VR`

Only classify a project into Software or VR where source evidence exists. Do not fabricate entries to populate a filter. If a category has no documented case studies, show a restrained empty result and direct users to Services rather than inventing work.

Mobile:

- preserve heading dominance but reduce type scale with `clamp()`;
- filters become horizontally scrollable text controls, not pills;
- project image and metadata stack in a deliberate editorial order;
- no horizontal overflow.

## 12. Services page

Create `CreativeServicesPage.tsx` using `what-i-do.png` proportions.

Hero composition:

- `WHAT I DO` label;
- very large `DIGITAL EXPERIENCES THAT FEEL REAL.` display statement;
- precise supporting paragraph;
- cinematic extracted asset on the right;
- right-side statement: `EXPERIENCES / DESIGNED TO CONNECT. / BUILT TO LAST.`

Service band:

Three connected structural columns rather than floating cards:

### 01 Software Development

Primary description:

Custom digital products and software systems spanning websites, web applications, mobile applications, platforms, frontend systems, backend services, APIs, integrations, and interactive web experiences.

Key deliverables may include:

- websites and web applications;
- mobile applications;
- product platforms and internal systems;
- frontend engineering;
- backend services and APIs;
- integrations and automation;
- real-time and 3D web experiences.

### 02 3D Design & Visualization

Key deliverables:

- 3D modeling;
- UV unwrapping and texturing;
- spatial and exhibition design;
- high-quality visualization and rendering;
- lighting and materials;
- animation and motion;
- character and cloth work where relevant.

### 03 VR Solutions

Key deliverables:

- VR environment design;
- interactive immersive experiences;
- real-time prototypes and applications;
- Unity, Unreal, and WebXR-oriented delivery;
- spatial interaction systems;
- training, experiential, product, or branded immersive solutions where appropriate to the brief.

Use `what-do-assets` as cinematic background imagery in the same integrated way as the concept, not as rounded image cards.

Process band:

- 01 Discover
- 02 Define
- 03 Design
- 04 Develop
- 05 Deliver

Desktop uses a horizontal sequence. Mobile uses a vertical editorial timeline.

## 13. About page

Rewrite `CreativeAboutPage.tsx` using `approach.png` proportions.

Top composition:

- `ABOUT / APPROACH`
- small `APPROACH` section marker
- huge `DESIGN AS EXPERIENCE ENGINEERING.` display statement
- compact supporting paragraph
- real production identity: Michael Ndhlovu / Mikey Nu
- descriptor that accurately reflects multidisciplinary design and development
- service rail listing Software Development, 3D Design, VR Solutions
- cinematic `approach-assets` figure or architectural asset at center-right

Lower band:

- Philosophy
- Capabilities
- Process

Capabilities should represent the three service pillars plus relevant art direction/creative direction only where supported by existing portfolio information.

No fake percentages, arbitrary experience metrics, or unsupported claims.

## 14. Project detail page

Rewrite `CaseStudyPage.tsx` using `project-detailed-view.png` proportions while keeping each real case study's verified data.

Desktop layout:

- breadcrumb-style project context at upper left;
- very large project title in Druk-style display type;
- compact year, agency, role, and scope metadata;
- large primary project image occupying the right half or right two-thirds;
- three aligned text columns for Challenge, Approach, and Outcome-equivalent verified project information;
- no fabricated engagement metrics, awards, jury quotes, or outcomes;
- image gallery uses straight frames and the reference three-small-plus-one-wide rhythm where enough media exists;
- real project images remain unaltered in factual context, with CSS grayscale treatment used only if necessary to integrate visually;
- previous/next project navigation follows the reference footer rhythm.

Use extracted `echoes-assets` only as optional presentation texture or reference imagery where it is clearly not labeled as the real project.

Keep the accessible image lightbox behavior.

## 15. Contact page

Rewrite `CreativeContactPage.tsx` using `contact.png` proportions while preserving the working EmailJS flow and direct-contact functionality.

Desktop split:

Left side:

- `CONTACT / INQUIRY`
- huge `LET'S CRAFT SOMETHING REAL.` heading
- supporting text covering all three service pillars
- cinematic presentation asset
- direct email
- WhatsApp
- intro-call action
- social links only where real URLs exist

Right side:

- architectural form panel with 1px structural grid
- Full Name + Email Address in first row
- Project Type full width
- Budget or Scope full width
- Project Details textarea
- full-width `SEND INQUIRY` primary action
- no rounded inputs or floating form card

Project Type choices must cover:

- Software Development
- 3D Design & Visualization
- VR Solutions
- Multidisciplinary / Combined

Preserve required, sending, success, and recoverable-error states.

Do not claim a response time unless the repository contains an approved promise.

## 16. Footer

Simplify `CreativeFooter.tsx` to match the reference system:

- thin top rule;
- production identity/copyright;
- minimal navigation;
- email/contact access;
- no large generic CTA section;
- no service-card summary;
- sharp flat styling.

Hide or minimize the global footer on the locked Home hero so it does not disturb the full-viewport landing composition.

## 17. Responsive implementation

Validate these viewports at minimum:

- 360px
- 390px
- 430px
- 768px
- 1024px
- 1440px
- 1920px

Responsive rules:

- scale display type with `clamp()`;
- use fluid page gutters that resolve toward 80px on large screens;
- avoid simply stacking every desktop column into oversized mobile cards;
- preserve editorial order and section hierarchy;
- convert horizontal process sequences to vertical timelines on mobile;
- maintain 44px minimum interactive targets;
- avoid horizontal overflow;
- retain legible body measure;
- do not hide essential project or service information merely to simplify mobile.

## 18. Accessibility and interaction requirements

- semantic landmarks and headings;
- keyboard-operable navigation, filters, project actions, theme toggle, contact form, and lightbox;
- visible Steel Blue focus states;
- accurate `aria-current` for navigation;
- form labels explicitly associated with controls;
- error messages not communicated by color alone;
- sufficient contrast in both themes;
- media has useful alternative text where content-bearing;
- decorative extracted assets use empty alt text or `aria-hidden`;
- respect reduced motion;
- keep the existing theme selection persistent.

## 19. Code quality requirements

- no duplicated project metadata across components;
- no unused decorative components left reachable from `App`;
- no hardcoded one-off palette outside the approved system except functional error colors;
- no `transition-all`;
- no giant all-purpose component containing every page;
- no unnecessary comments or AI narration in source;
- no emojis in source;
- no em dash characters in source or documentation;
- no fake metrics or placeholder claims;
- no new dependency unless implementation genuinely requires it.

## 20. Implementation sequence

### Phase A: Baseline and data consolidation

1. Create branch from current `master`.
2. Commit this implementation plan before UI code.
3. Create `portfolioContent.ts` and consolidate project/service/process data.
4. Extend `renderAssets.ts` with semantic references to extracted concept assets.

### Phase B: Design system foundation

5. Create `cinematic-portfolio.css` with brand tokens, typography roles, grid, structural rules, responsive primitives, and component states.
6. Import it after existing styles.
7. Preserve existing hero CSS unchanged.

### Phase C: Shell and navigation

8. Update `App.tsx` with Services route/state.
9. Rewrite navigation to match the concept header.
10. Simplify footer.

### Phase D: Page implementation

11. Reduce Home to the locked video hero.
12. Rebuild Work.
13. Build Services.
14. Rebuild About.
15. Rebuild Project Detail.
16. Rebuild Contact.

### Phase E: Cleanup

17. Remove or disconnect obsolete home-only modules that no longer belong in the new information architecture.
18. Remove stale classes and dead imports caused by the redesign.
19. Search for generic AI-slop patterns prohibited by `DESIGN_RULES.md`.
20. Search for em dash characters, decorative gradients, glass blur, heavy shadows, arbitrary radii, and `transition-all` in the active source path.

### Phase F: Validation

21. Vite production build must succeed.
22. Validate every navigation destination.
23. Validate project filtering.
24. Validate every real case study.
25. Validate previous/next project behavior.
26. Validate contact form states at source level and deployed runtime where possible.
27. Validate theme persistence and dark/light surface tokens.
28. Confirm locked hero implementation and video source lines are unchanged.
29. Verify no horizontal overflow at required viewports.
30. Verify keyboard focus and accessible labels.
31. Compare desktop proportions against all supplied screens.
32. Compare mobile hierarchy against the desktop source rather than applying generic card stacking.
33. Verify final Vercel preview is READY with no build errors.
34. Open PR with exact scope and validation evidence.
35. Merge only after the final branch head is validated.
36. Verify the production deployment is built from the merge commit and reaches READY.

## 21. Acceptance criteria

Implementation is complete only when all conditions below are true:

- locked dual-video hero remains unchanged in behavior and media;
- WORK, SERVICES, ABOUT, CONTACT architecture is live;
- all three service pillars are visible and accurately described;
- real 3D portfolio content remains intact and prominently represented;
- no fictitious portfolio evidence is introduced;
- page composition clearly matches the supplied concept proportions and hierarchy;
- brand CI palette, typography roles, sharp geometry, hairline rules, negative space, and accent scarcity are consistently applied;
- dark and light themes both remain coherent;
- mobile and desktop layouts are intentional;
- contact form remains functional;
- case-study navigation remains functional;
- active source contains no prohibited AI-slop patterns identified by the design governance documents;
- Vercel preview and final production deployment both build successfully;
- all changes are committed and pushed to the remote repository.
