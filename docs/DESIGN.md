---
version: alpha
name: Mikey Nu Cinematic Portfolio
description: "A cinematic, architectural, monochrome portfolio system for Mikey Nu, focused on web design, 3D design, immersive VR experiences, and art direction."
colors:
  void: "#070707"
  graphite: "#111214"
  steel: "#2A2D31"
  silver: "#A2A6A0"
  paper: "#EDEDE0"
  steel-blue: "#4A6A8A"
  error: "#B85C5C"
typography:
  display-hero:
    fontFamily: "Druk Condensed, Arial Narrow, sans-serif"
    fontSize: 152px
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: 0.01em
  display-page:
    fontFamily: "Druk Condensed, Arial Narrow, sans-serif"
    fontSize: 112px
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: 0.01em
  display-section:
    fontFamily: "Druk Condensed, Arial Narrow, sans-serif"
    fontSize: 64px
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: 0.01em
  display-card:
    fontFamily: "Druk Condensed, Arial Narrow, sans-serif"
    fontSize: 44px
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: 0.01em
  body-lg:
    fontFamily: "Neue Haas Grotesk, Helvetica Neue, Helvetica, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  body-md:
    fontFamily: "Neue Haas Grotesk, Helvetica Neue, Helvetica, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  body-sm:
    fontFamily: "Neue Haas Grotesk, Helvetica Neue, Helvetica, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0em
  label-lg:
    fontFamily: "Neue Haas Grotesk, Helvetica Neue, Helvetica, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.1em
  label-md:
    fontFamily: "Neue Haas Grotesk, Helvetica Neue, Helvetica, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.1em
  label-sm:
    fontFamily: "Neue Haas Grotesk, Helvetica Neue, Helvetica, sans-serif"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.08em
spacing:
  micro: 4px
  xs: 8px
  sm: 16px
  md: 24px
  gutter: 32px
  lg: 48px
  xl: 64px
  page: 80px
  section: 96px
  section-lg: 128px
  max-content: 1440px
  grid-columns: 12
rounded:
  none: 0px
components:
  button-primary:
    backgroundColor: "{colors.steel-blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: 56px
    padding: 16px
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: 56px
    padding: 16px
  field:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: 56px
    padding: 16px
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: 44px
    padding: 8px
---

# DESIGN.md

This file is the visual source of truth for the Mikey Nu portfolio. It is written for both human designers and AI coding agents. It must be read together with `docs/DESIGN_RULES.md`. If the two documents overlap, `DESIGN.md` defines the approved visual language and page composition while `DESIGN_RULES.md` defines governance, anti-slop constraints, UX discipline, and implementation behavior.

The reference concept screens supplied for this system are all 1672 by 941 pixels, approximately 16:9. They describe a cinematic desktop composition. They are not permission to freeze the product at one viewport. The implementation must preserve their visual grammar across desktop, tablet, and mobile.

### Agent reading strategy

This document is intentionally detailed because it converts visual references into durable implementation evidence. Do not read every page specification for every task if the scope is narrow. Use this sequence:

1. Always read `Overview`, `Colors`, `Typography`, `Layout`, `Components`, and `Do's and Don'ts`.
2. Read the page specification for the page being changed.
3. Read `Imagery and Asset Language` whenever media, hero imagery, project thumbnails, or service imagery are involved.
4. Read `Motion`, `Responsive Behavior`, and `Accessibility and Interaction Quality` before interaction or responsive work.
5. Read `AI Agent Implementation Protocol` and `Visual QA Protocol` before declaring a design task complete.
6. Use `Reference Copy Inventory` and `Brand CI Reference Details` as evidence when exact labels, visual motifs, or concept details are disputed.

This keeps the repository context navigable while preserving the level of specificity required to reproduce the supplied references.

## Overview

### Design identity

The portfolio is a cinematic digital atelier, not a SaaS marketing template and not a conventional agency grid. It should feel like the interface layer of a restrained art film, architecture monograph, high-end fashion campaign, and interactive exhibition combined into one system.

The defining visual idea is **design in darkness**. Content appears inside a near-black spatial field where light, proportion, scale, and carefully placed typography do most of the work. The interface is intentionally sparse but not empty. It uses strong editorial composition, architectural line work, monochrome imagery, large condensed display type, compact grotesk body type, and one muted steel-blue accent.

The experience must communicate:

- cinematic restraint;
- architectural composition;
- immersive spatial awareness;
- tactile materiality;
- technical precision;
- clarity without sterility;
- confidence without visual noise;
- craft over novelty;
- a strong sense of authored art direction.

The brand CI explicitly describes the essence as:

- **Cinematic**
- **Architectural**
- **Immersive**
- **Tactile**
- **Focused**
- **Timeless**

Those six words are not decorative adjectives. Every screen must express them structurally.

### Production identity versus concept identity

The concept CI uses the name **AVELLINO** and an **AV** monogram. The production portfolio identity is **Mikey Nu**, with Michael Ndhlovu as the person behind the work. Therefore:

- Treat `AVELLINO` as reference copy from the concept board, not production identity.
- Treat the `AV` monogram as a reference for logo scale, contrast, placement, and minimalism unless an approved Mikey Nu monogram asset is supplied.
- Do not invent a new production logo in code.
- If a real production logo asset exists, use it in the same visual role as the concept monogram.
- If no approved logo exists, use a restrained text identity such as `MIKEY NU` or the existing production wordmark treatment. Do not draw a fake symbol with CSS or an arbitrary SVG.

### Source-of-truth hierarchy

When design evidence conflicts, use this order:

1. The user's current explicit instruction.
2. The latest explicitly approved implementation decision.
3. The page-specific concept screen.
4. The Brand CI concept board.
5. This `DESIGN.md`.
6. `docs/DESIGN_RULES.md`.
7. Existing high-quality production components.
8. General web conventions.
9. Agent preference.

A supplied reference is evidence, not a loose inspiration prompt.

### Important approved home-hero override

The concept home screen contains `MIKEY NU`, a category line, a `VIEW SELECTED WORK` button, and a central monochrome figure. A later explicit production decision replaced all hero text and the static graphic with two theme-specific background videos.

That later decision remains authoritative unless explicitly reversed.

The production home hero must therefore remain:

- video-only;
- full bleed below the navigation;
- `bg_video_lightmode.mp4` for light theme;
- `bg_video_darkmode.mp4` for dark theme;
- both videos stacked in the same bounds;
- muted, looping, autoplaying, and `playsInline`;
- switched by theme state through opacity;
- free from reintroduced hero copy, cards, badges, overlays, decorative metrics, or static hero artwork.

The home concept still governs overall cinematic scale, darkness, subject placement philosophy, negative space, navigation placement, and restrained scroll affordance.

### Brand values

The Brand CI defines four explicit values:

**Intention**  
Every detail has purpose.

**Craft**  
Built with care, not speed.

**Clarity**  
Simple on the surface, deep in function.

**Immersion**  
Design that pulls the viewer in and holds attention.

For an AI agent, these values translate to a concrete rule: do not add visual structure merely because a layout feels sparse. Sparse space is part of the design when it creates tension, focus, scale, or breathing room.

## Colors

### Core palette

The Brand CI provides six approved brand colors.

- **Void** `{colors.void}`: `#070707`. Primary dark canvas. It should read as soft near-black rather than absolute RGB black.
- **Graphite** `{colors.graphite}`: `#111214`. Secondary dark surface, field background, form interior, and subtle tonal separation.
- **Steel** `{colors.steel}`: `#2A2D31`. Dividers, low-contrast borders, inactive structural details, muted dark surfaces.
- **Silver** `{colors.silver}`: `#A2A6A0`. Secondary text, quiet labels, descriptions, and muted UI.
- **Paper** `{colors.paper}`: `#EDEDE0`. Primary light text on dark surfaces and primary canvas in light theme. It is intentionally warmer and softer than pure white.
- **Steel Blue** `{colors.steel-blue}`: `#4A6A8A`. The single brand accent. Use it sparingly for active navigation underlines, section indices, links, focus states, selected filters, required markers, and primary actions.
- **Error** `{colors.error}`: a functional exception reserved only for validation and destructive error communication. It is not a brand accent and must never appear decoratively.

### Dark theme

Dark theme is the native visual language.

Use:

- page background: Void;
- large content surfaces: Void or Graphite only when a tonal boundary is needed;
- primary text: Paper;
- secondary text: Silver;
- structural border: Steel, commonly at reduced opacity;
- interaction accent: Steel Blue;
- imagery: grayscale or nearly grayscale with high local contrast and deep blacks.

The dark theme must never drift into neon cyberpunk styling. No cyan glow, blue haze, purple gradient, aurora, luminous cards, or glassmorphism.

### Light theme

Light theme is an inversion of the same material system, not a separate visual identity.

Use:

- page background: Paper;
- primary text: Graphite or Void;
- secondary text: Steel;
- dividers: Steel at reduced opacity;
- active links and focus states: Steel Blue;
- imagery: retain the same monochrome art direction;
- surfaces: prefer the page field itself and hairline divisions rather than white floating cards.

Do not turn light mode into a generic white dashboard. Preserve sharp geometry, editorial spacing, condensed display typography, and restrained accent usage.

### Accent scarcity

Steel Blue is valuable because it is rare. A typical viewport should have only a few blue moments.

Approved blue uses include:

- current navigation underline;
- page or section index;
- active project filter;
- a short rule under a heading;
- required field asterisk;
- text link or arrow;
- primary submit button;
- keyboard focus ring;
- selected state.

Do not color entire sections blue. Do not create multiple blue shades for decoration. Do not use blue for body copy.

### Texture and grain

The reference imagery and backgrounds contain a subtle photographic grain and dust texture. This is a brand-specific exception to the default prohibition on decorative noise.

Rules:

- Prefer grain baked into source media.
- If a page-level grain layer is used, it must be static and extremely low opacity.
- Do not animate noise.
- Do not let texture reduce legibility.
- Do not stack grain with glows, gradients, or blur effects.
- The grain should be felt as material, not noticed as an effect.

## Typography

### Required families

The Brand CI explicitly names:

1. **Druk Condensed** for display typography.
2. **Neue Haas Grotesk** for body, navigation, controls, labels, and supporting copy.

The CI describes Druk Condensed as `BOLD / SUPER / CYR` and Neue Haas Grotesk as `REGULAR / MEDIUM`.

These are part of the identity, not interchangeable suggestions.

### Licensing and implementation rule

Both reference families may require licensed font files or an approved webfont source.

An implementation agent must:

1. inspect the repository for licensed font assets and existing font declarations;
2. use the approved font files if present;
3. never download or redistribute unlicensed proprietary font files;
4. never silently substitute Inter, Geist, Space Grotesk, Roboto, or another generic AI default;
5. if the licensed fonts are unavailable, use the documented fallback only as a temporary implementation state and clearly flag the missing production font asset.

Fallback hierarchy:

- display temporary fallback: `Arial Narrow`, then a system condensed sans-serif;
- body temporary fallback: `Helvetica Neue`, then `Helvetica`, then system sans-serif.

The fallback is not considered final visual QA parity.

### Display typography

Druk Condensed carries the visual identity of the page.

Use it for:

- home identity when text is explicitly approved;
- page titles such as `SELECTED WORK`;
- project titles such as `ECHOES`;
- services such as `WEB DESIGN`;
- process stage names when the layout calls for a stronger display voice;
- large statements such as `DIGITAL EXPERIENCES THAT FEEL REAL.`

Display behavior:

- uppercase by default;
- very tall, narrow letterforms;
- tight line height, usually 0.86 to 0.96;
- slight positive or neutral tracking;
- never use rounded display fonts;
- never add text shadow, glow, gradient fill, stroke, or 3D extrusion;
- preserve substantial scale contrast between display type and body copy.

Recommended desktop fluid implementation:

- hero or identity title: `clamp(6rem, 10vw, 11.5rem)`;
- major page title: `clamp(5rem, 8vw, 9rem)`;
- section statement: `clamp(3.5rem, 5vw, 6rem)`;
- project or service title: `clamp(2.25rem, 3.5vw, 4rem)`.

These values are implementation guidance. The visual relationship to the reference is more important than a single hardcoded pixel size.

### Body typography

Neue Haas Grotesk is the practical voice.

Use it for:

- paragraphs;
- project summaries;
- form fields;
- navigation;
- metadata;
- filter controls;
- labels;
- availability and contact details;
- footer copy.

Body text should feel compact, calm, and precise. It should not become tiny merely to look sophisticated.

Desktop body measure should generally stay between 42 and 66 characters per line. Long descriptive paragraphs should not stretch across large portions of the viewport.

### Labels and metadata

Labels use Neue Haas Grotesk Medium, commonly uppercase, with restrained tracking.

Examples from the concepts include:

- `WORK / SELECTED PROJECTS`
- `CONTACT / INQUIRY`
- `WHAT I DO`
- `KEY DELIVERABLES`
- `YEAR`
- `CHALLENGE`
- `APPROACH`
- `OUTCOME`
- `HOW I WORK`

This is one of the few approved uses of small uppercase tracked text because the reference system uses it consistently as editorial metadata. Do not add additional eyebrow labels to every section.

### Text hierarchy

A screen should usually contain no more than these simultaneous roles:

1. one dominant display statement;
2. one section or project title level;
3. body copy;
4. metadata and labels;
5. navigation and small utility text.

Avoid creating many near-identical intermediate font sizes.

## Layout

### Base desktop grid

The Brand CI defines:

- **12-column grid**
- **maximum content width: 1440px**
- **gutter: 32px**
- **outer margin: 80px**

These are authoritative desktop targets.

Use a centered layout with:

- page inline padding that resolves toward 80px on large desktop;
- content capped near 1440px when the page needs a bounded editorial grid;
- full-bleed media allowed when explicitly shown by the reference;
- 32px gutters between grid columns;
- vertical rhythm built from the spacing tokens rather than arbitrary gaps.

At narrower widths, use fluid margins. Do not force an 80px margin onto a 1024px viewport.

### Spatial character

The compositions are asymmetric and cinematic.

Common patterns:

- huge display type occupying the left third or half;
- a single figure or architectural subject anchored center-right;
- small functional text sitting in otherwise large negative-space fields;
- content bands divided by 1px rules;
- imagery spanning several grid columns without rounded framing;
- text and image modules interlocking rather than forming a uniform card grid.

Negative space is active composition. Do not automatically fill it.

### Section dividers

A section divider is typically:

- a long 1px horizontal rule;
- Steel or Silver at low opacity;
- sometimes interrupted by a short Steel Blue segment;
- paired with a two-digit section number such as `01`;
- never a thick ornamental separator.

### Desktop header

The desktop header is visually light and horizontally distributed.

Reference behavior:

- logo or wordmark at upper left;
- navigation at upper right;
- links: `WORK`, `SERVICES`, `ABOUT`, `CONTACT`;
- active item indicated by a thin Steel Blue underline;
- transparent page background;
- no capsule container;
- no blur;
- no shadow;
- no floating rounded nav bar.

The header should feel embedded into the canvas.

### Footer and page index

Concept screens often use a small bottom-left or bottom-right section index:

- `/ 01 - INTRO`
- `/ 01 - WORK`
- `/ 02 - ABOUT`
- `/ 05 - CONTACT`

The number is Steel Blue, the descriptor is Paper or Silver, and a short horizontal rule may separate them.

The page index is optional on mobile if it competes with primary content.

### Scroll affordance

The concepts use `SCROLL TO EXPLORE` near the bottom-right with a thin vertical Steel Blue rule.

Use this only on immersive, viewport-led pages where scrolling is not visually obvious. Do not repeat it on every ordinary content page.

## Elevation & Depth

The interface is fundamentally flat.

Depth comes from:

- photographic lighting;
- deep value contrast;
- scale;
- spatial composition;
- partial cropping;
- image-to-black transitions;
- tonal separation between Void, Graphite, and Steel;
- fine rules;
- foreground and background media layers.

Do not use card shadows to create depth.

Prohibited unless an explicit component requires it:

- diffuse drop shadows;
- floating panels;
- glass blur;
- bloom;
- neon halo;
- gradient shadows;
- raised cards.

The visual world should feel physically lit, not digitally embellished.

## Shapes

### Geometric language

The system is architectural and sharp.

Rules:

- default radius: 0px;
- buttons: rectangular;
- fields: rectangular;
- project media: rectangular;
- form groups: rectangular;
- navigation: no pill container;
- filters: text tabs with underline, not chips;
- service modules: bounded by straight rules, not rounded cards.

Thin line work and strong rectangular framing are allowed because they are visible in the reference CI.

### Lines

Use 1px rules as the primary grouping mechanism.

Typical roles:

- form boundary;
- service module boundary;
- gallery tile edge;
- column divider;
- footer separator;
- navigation underline;
- text-link underline;
- page section boundary.

Do not make every element boxed. The reference alternates open fields with bounded structural modules.

## Components

### Navigation

Desktop:

- left: approved monogram or restrained production identity;
- right: four primary links;
- uppercase compact grotesk;
- large breathing room between items;
- active link gets a 1px Steel Blue underline;
- hover may move from Silver to Paper and extend the underline;
- no background surface around the navigation.

Mobile:

- identity on left;
- `MENU` plus a minimal menu icon on right;
- opening the menu should reveal a full-height or near-full-height dark navigation surface;
- no rounded drawer card;
- preserve the same typography and line system;
- close on Escape and after navigation.

### Primary button

Use for the highest-priority form or conversion action, especially `SEND INQUIRY`.

Visual treatment:

- Steel Blue background;
- Paper text;
- sharp corners;
- uppercase or compact medium label;
- arrow aligned at trailing edge;
- height approximately 52 to 60px;
- hover: controlled tonal shift, not glow;
- focus: visible outline;
- pressed: slight color change, no scale bounce.

### Secondary button

Use for hero or project navigation when the reference shows an outlined control.

Visual treatment:

- transparent background;
- thin Steel Blue or Steel border;
- Paper or Steel Blue label depending on context;
- trailing arrow;
- no radius;
- no shadow.

The home concept shows `VIEW SELECTED WORK` as a large outlined button. The current production video-only hero must not reintroduce that control unless the user explicitly restores hero copy and controls.

### Text link

Text links frequently use:

- uppercase compact grotesk;
- Steel Blue or Paper label;
- long fine underline;
- right arrow;
- understated hover motion.

Examples:

- `VIEW PROJECT`
- `VIEW DETAILS`
- `COPY EMAIL`
- `BACK TO PROJECTS`
- `PREV PROJECT`
- `NEXT PROJECT`

### Project filter tabs

Use simple text tabs:

- `ALL`
- `WEB`
- `3D`
- `VR`

The active state uses Steel Blue text or underline. Inactive tabs remain Silver or Paper. Do not use pills or filled chips.

### Service module

A service module is a genuine content object and can be bounded.

Each service module contains:

- two-digit index;
- large Druk Condensed title;
- short description;
- `KEY DELIVERABLES` label;
- a compact list;
- `VIEW DETAILS` text action;
- a monochrome environmental image integrated into the module.

The three reference services are:

1. Web Design
2. 3D Design
3. VR Experiences

The modules are full rectangular panels with shared borders and image areas. They should read like editorial case-study panels, not generic feature cards.

### Project module

Project modules are deliberately asymmetric.

They may combine:

- index number;
- large title;
- discipline label;
- 2 to 4 line description;
- underlined `VIEW PROJECT` action;
- large project image.

Do not standardize all project modules into identical thumbnail cards. The selected-projects concept uses different media sizes and staggered composition.

### Contact form

The contact form is a dominant right-side architectural panel.

Structure on large desktop:

1. form header: `TELL ME ABOUT YOUR PROJECT`;
2. first row: Full Name and Email Address, two columns;
3. Project Type select, full width;
4. Budget or Scope select, full width;
5. project-description textarea, full width;
6. `SEND INQUIRY` primary action, full width.

Visual rules:

- 1px Steel border grid;
- nested field boundaries may align with the outer panel;
- no rounded fields;
- labels above controls;
- required asterisk in Steel Blue;
- placeholder text in muted Silver;
- dropdown chevron minimal;
- textarea large enough for meaningful project context;
- submit action uses Steel Blue as the strongest color block on the page.

States required:

- default;
- hover;
- focus-visible;
- invalid;
- disabled during send;
- submitting;
- success;
- recoverable error.

Do not communicate validation through color alone.

### Process steps

The approved process has five stages:

01 Discover  
02 Define  
03 Design  
04 Develop  
05 Deliver

Use:

- large or medium two-digit index;
- short horizontal rule between stages on wide layouts;
- condensed stage title;
- one short explanatory sentence.

This may appear as a horizontal sequence on desktop and a vertical editorial timeline on mobile.

### Capability icons

The Approach concept contains four restrained outline symbols for:

- Web Design and Development;
- 3D Design and Visualization;
- VR Experience Design;
- Art Direction and Branding.

These icons are thin monochrome line drawings with no colored tile behind them. If no approved icons exist, use a consistent outline icon family or omit the icon. Never place them inside rounded squares.

### Gallery

Project detail galleries use straight-edged image frames with thin rules.

The reference layout uses:

- three smaller frames in the top row;
- one wider landscape frame below;
- a quote occupying the remaining lower-right area;
- captions such as `01 / ARRIVAL`, `02 / INTERACTION`, `03 / REFLECTION`, `04 / TRANSITION`.

No rounded corners and no masonry randomness for its own sake.

## Do's and Don'ts

### Do

- Do make the experience feel authored, cinematic, spatial, and deliberately restrained.
- Do use Druk Condensed for expressive hierarchy and Neue Haas Grotesk for functional clarity.
- Do use the exact brand palette as the basis for both themes.
- Do reserve Steel Blue for interaction, selection, and focused emphasis.
- Do use the 12-column desktop grid, 32px gutter, 80px large-screen margin, and 1440px content target as the baseline.
- Do use full-width rules, aligned columns, and negative space to group information.
- Do use real portfolio project names, imagery, metrics, client names, awards, dates, and capabilities.
- Do let real project imagery dominate project pages.
- Do keep project imagery cinematic, monochrome or restrained, high contrast, and spatially composed.
- Do make hover and focus behavior precise and minimal.
- Do maintain visible keyboard focus.
- Do validate text and UI contrast against WCAG 2.2 AA.
- Do respect `prefers-reduced-motion`.
- Do test 200 percent text zoom and narrow reflow.
- Do create intentional mobile compositions rather than shrinking desktop.
- Do compare implemented screens against the approved visual references at target viewports.
- Do treat `docs/DESIGN_RULES.md` as mandatory governance.
- Do remove an element if its only justification is decoration.

### Don't

- Don't add generic rounded cards.
- Don't add pill badges or pill filter chips.
- Don't add glassmorphism.
- Don't add blur-backed navigation.
- Don't add purple, cyan, violet, or rainbow gradients.
- Don't add glow effects, neon borders, or luminous button shadows.
- Don't use decorative background grids, dot fields, random blobs, floating spheres, or generic wireframes.
- Don't use a generic SaaS hero structure.
- Don't create a uniform three-card feature row when the reference calls for architectural editorial modules.
- Don't use a giant centered headline unless the page reference explicitly uses that relationship.
- Don't center all content.
- Don't add random icons to make sections look complete.
- Don't use Lucide icons inside rounded colored squares.
- Don't use arbitrary border radii.
- Don't add heavy shadows.
- Don't use broad `transition-all`.
- Don't animate every element on entry.
- Don't apply scroll parallax merely for spectacle.
- Don't use bounce, spring overshoot, pulse, or elastic motion.
- Don't invent testimonials, awards, availability, client counts, project metrics, engagement metrics, or return rates.
- Don't copy `AVELLINO` or its fake contact details into production.
- Don't treat `ECHOES`, `BEYOND`, or `INTERVAL` as production projects unless the user explicitly confirms them.
- Don't reproduce `03:42`, `68%`, `AWWWARDS`, `SITE OF THE DAY`, or the Awwwards jury quote unless they are verified real achievements for the actual project.
- Don't reintroduce home-hero text or a static hero graphic while the approved video-only hero decision remains active.
- Don't silently replace Druk Condensed or Neue Haas Grotesk with a fashionable default font.
- Don't make light mode look like a different product.
- Don't put all content inside bordered containers.
- Don't use images of text for content that can be rendered as HTML text.
- Don't ship a UI change without visual QA at both desktop and mobile sizes.

## Theme Model

### Dark mode is canonical

All supplied concept screens are dark. When a design choice is ambiguous, solve the dark version first and derive the light version from it.

The dark system is not simply a dark color scheme. It depends on:

- deep negative space;
- sculptural light;
- subdued rules;
- warm off-white typography;
- grayscale media;
- low visual noise;
- rare Steel Blue interaction cues.

### Light mode transformation

Light mode preserves the composition rather than inverting every pixel.

Transform:

- Void page field to Paper;
- Paper text to Graphite or Void;
- Silver secondary copy to Steel;
- Steel rules to a restrained dark rule;
- Steel Blue remains Steel Blue;
- monochrome images remain images, with their original tonal treatment unless a light-mode-specific asset exists;
- no added shadow is needed merely because the background becomes light.

The home hero is the special case where a dedicated light-mode video already exists and is the approved source.

## Imagery and Asset Language

### Image family 1: Anonymous faceless figure

The recurring human figure is anonymous, faceless, and sculptural.

Visual traits:

- puffer jacket or oversized outerwear;
- wide or cargo-like trousers;
- hood or cap;
- face hidden in darkness or abstracted;
- frontal or three-quarter pose;
- isolated by a narrow pool of light;
- deep black background;
- low-key studio lighting;
- grayscale palette;
- subtle floor reflection or soft light falloff.

The figure is not a stock-photo lifestyle model. It functions as scale, presence, mystery, and continuity across the visual system.

Reference uses:

- home concept: full standing figure centered slightly right;
- Brand CI: smaller full standing figure;
- contact: figure between hero copy and form;
- selected projects: small standing figure beneath introduction;
- approach: large cropped figure in cap and puffer jacket;
- services: figure looking toward an illuminated architectural doorway.

### Image family 2: Curved concrete architecture

A monumental curved concrete wall forms a bright sculptural sweep through a dark interior.

Visual traits:

- smooth concrete texture;
- massive scale;
- single tiny human silhouette for scale;
- high contrast between white architectural plane and black void;
- reflective or satin floor;
- grayscale only;
- no clutter.

Reference uses:

- selected-projects primary project image;
- project-detail hero;
- Web Design service panel;
- Brand CI case-study module.

### Image family 3: Monolithic rock landscape

A dark surreal landscape with tall narrow rock spires.

Visual traits:

- matte charcoal stone;
- mist or atmospheric falloff;
- tiny human scale reference;
- cinematic horizon;
- dark sky;
- strong silhouette;
- grayscale.

Reference uses:

- Beyond project;
- 3D Design service panel.

### Image family 4: Luminous rectangular portal

A dark interior with a bright rectangular frame or portal.

Visual traits:

- glowing white rectangular outline;
- one or two human silhouettes;
- focused light beam;
- dark surrounding space;
- restrained glow local to the portal only;
- floor reflection.

Reference uses:

- Interval project;
- VR Experiences service panel;
- project-detail interaction frame.

This is one of the few contexts where a glow exists because it belongs to the represented scene. Do not generalize that glow into UI chrome.

### Image family 5: Doorway or vertical slab

A tall vertical light opening or concrete slab in a dark room.

Visual traits:

- narrow bright rectangular plane;
- small observer figure;
- large black negative space;
- floor light pool.

Reference uses:

- services hero environment;
- Brand CI hero layout sample.

### Image family 6: Project-detail narrative frames

The project detail concept includes four specific scene types:

1. **Arrival**: a person facing a bright opening in a dark rock mass.
2. **Interaction**: a person beneath or facing a luminous square frame.
3. **Reflection**: a tall dark monolith in a barren landscape.
4. **Transition**: a small person inside a narrow vertical gap between two dark rock faces.

These images form a visual narrative sequence and should be treated as one project family, not unrelated stock art.

### Asset implementation rule

Before adding or generating any image:

1. inspect `public/` and existing project data for an approved real asset;
2. use real portfolio work when the screen represents real portfolio work;
3. only generate a new concept asset when the user explicitly needs a new art asset;
4. do not use low-quality placeholders;
5. do not use unrelated stock imagery merely to fill reference positions;
6. preserve correct aspect ratio and focal point;
7. serve responsive image sizes where possible;
8. use meaningful `alt` text for informative imagery and empty alt text for purely decorative imagery;
9. background video must remain muted and non-essential to understanding page content.

## Page Specifications

### 1. Home / Intro

Reference file: `home.png`  
Reference canvas: 1672 x 941.

#### Visual composition in the concept

The concept is a full-viewport black composition.

Top-left:

- minimal white `AV` concept monogram;
- large breathing room around it.

Top-right:

- `WORK`
- `SERVICES`
- `ABOUT`
- `CONTACT`
- active item: `WORK`, indicated by a short Steel Blue underline.

Left-middle:

- small Steel Blue category line: `WEB DESIGN / 3D DESIGN / VR`;
- extremely large white condensed name: `MIKEY NU`;
- outlined rectangular CTA: `VIEW SELECTED WORK` plus a right arrow.

Center-right:

- full-body monochrome anonymous figure;
- strong upper-body highlight;
- wide clothing silhouette;
- feet grounded in a soft lit floor;
- black field around the subject.

Bottom-left:

- `/ 01 - INTRO`.

Bottom-right:

- `SCROLL TO EXPLORE`;
- thin vertical Steel Blue rule.

The layout is not centered. It is a left text mass balanced against a center-right figure.

#### Production behavior

The live production hero currently overrides the concept content:

- remove the category line;
- remove `MIKEY NU`;
- remove the CTA;
- remove the static figure;
- use the approved theme-specific background videos only.

Preserve:

- full-viewport immersive scale;
- transparent minimal navigation;
- black or theme canvas;
- no surrounding card;
- no overlay text;
- no extra graphic treatment;
- optional scroll affordance only if it improves discoverability.

#### Background video implementation

Approved assets:

- `/renders/bg_video_darkmode.mp4`
- `/renders/bg_video_lightmode.mp4`

Both videos occupy the same absolute layer bounds. Theme controls opacity. Do not stop one and start the other on each toggle if that introduces a blank frame. Keep the switch visually continuous.

### 2. Work / Selected Projects

Reference file: `selected-projects.png`  
Reference canvas: 1672 x 941.

#### Page purpose

A visual archive of selected real work. The page should feel like a curated exhibition wall, not a product-card grid.

#### Composition

Top-left:

- concept monogram.

Top-right:

- primary nav with `WORK` active.

Upper-left content:

- Steel Blue eyebrow-style metadata used semantically as breadcrumb: `WORK / SELECTED PROJECTS`;
- huge two-line title: `SELECTED WORK`;
- short body copy: `A selection of digital experiences crafted with intention, precision, and immersive detail.`;
- small standing figure beneath the intro copy;
- bottom-left section marker `/ 01 - WORK`.

Upper-right:

- text filter row: `ALL`, `WEB`, `3D`, `VR`;
- active filter `ALL` with Steel Blue underline.

Main project composition:

**Project 01**
- title `ECHOES`;
- category `WEB DESIGN`;
- description: `A bold portfolio experience exploring identity through contrast, structure, and cinematic flow.`;
- `VIEW PROJECT` action with underline and arrow;
- large wide concrete-architecture image occupying the upper-middle and right.

**Project 02**
- title `BEYOND`;
- category `3D DESIGN`;
- description: `An otherworldly landscape built for mood, scale, and visual storytelling.`;
- `VIEW PROJECT` action;
- large rocky landscape image lower-middle.

**Project 03**
- title `INTERVAL`;
- category `VR EXPERIENCE`;
- description: `An interactive journey through space and time, where perception shifts and adapts.`;
- `VIEW PROJECT` action;
- tall portal image lower-right.

Bottom-right:

- `SCROLL TO EXPLORE`;
- thin vertical blue rule.

#### Production rule

`ECHOES`, `BEYOND`, and `INTERVAL` are visual-reference content. Replace them with real projects and real project metadata. Preserve the asymmetric layout logic rather than the placeholder facts.

Project filters must actually filter the rendered collection. They may not be decorative controls.

### 3. Project Detailed View

Reference file: `project-detailed-view.png`  
Reference canvas: 1672 x 941.

#### Top navigation and breadcrumb

Top-left:

- concept monogram;
- breadcrumb: `/ PROJECTS / ECHOES`, with the project collection cue in Steel Blue.

Top-right:

- standard nav with `WORK` active.

#### Hero composition

Left approximately 45 percent:

- category line: `WEB DESIGN / 3D DESIGN / VR`;
- huge title: `ECHOES`;
- metadata pair:
  - `YEAR`
  - `2024`
- short project summary: `An immersive web experience that explores memory, space, and presence through clean interaction, cinematic visuals, and spatial audio.`;
- `VIEW PROJECT` text action.

Right approximately 55 percent:

- huge curved-concrete project image;
- tiny human figure near the lower middle;
- large black upper cavity and bright curved wall;
- small stacked statement over the image: `WHERE MEMORY TAKES SPACE.`

#### Narrative information band

Below the hero, three aligned text columns:

**Challenge**  
`Create a digital experience that feels introspective yet universal. The challenge was to translate abstract emotions - memory, loss, and reflection - into an interactive journey without relying on literal narrative or text.`

**Approach**  
`We combined minimalist web design with real-time 3D environments and spatial audio to craft an atmosphere of quiet exploration. Every interaction is intentional and measured, guiding users through spaces that respond to scroll, movement, and focus.`

**Outcome**  
`A meditative, award-nominated experience that resonated for its emotional depth, technical execution, and restraint. Users describe it as "poetic", "haunting", and "unlike anything else online."`

These statements are concept copy. Production pages must use real case-study content.

#### Metrics band

The concept shows four large proof points separated by vertical rules:

- `03:42` average engagement time;
- `68%` return visit rate;
- `AWWWARDS` honorable mention;
- `SITE OF THE DAY`, `WWW. AWARDS`.

These are reference-only layout examples. Never invent metrics or awards to reproduce the screenshot.

If a real project has no verified quantitative proof, replace this band with meaningful real metadata such as:

- role;
- client;
- year;
- disciplines;
- software;
- platform;
- deliverables.

Do not preserve empty metric slots.

#### Gallery

Right and lower-right:

- top row: three landscape frames;
- lower row: one wide landscape frame;
- adjacent quote block.

The four gallery image assets are visually distinct and must not be treated as interchangeable placeholders:

1. **01 / ARRIVAL**: a wide, low-light rocky landscape with a solitary figure facing a tall irregular stone opening. The opening contains a bright vertical rectangular light source. The surrounding rock remains almost black, creating a threshold or arrival motif.
2. **02 / INTERACTION**: a dark figure beneath a luminous suspended square or rectangular portal. The portal is the brightest object in the frame and casts a narrow pool of light around the person.
3. **03 / REFLECTION**: a landscape with a tall, nearly black monolithic slab rising vertically from rough terrain. A thin pale vertical marker sits near its base, creating extreme scale contrast.
4. **04 / TRANSITION**: a wide dark canyon or rock corridor with two massive walls framing a very bright, narrow vertical opening. A tiny person stands centered near the opening. This is the widest gallery frame and acts as the visual climax of the sequence.

Reference captions:

- `01 / ARRIVAL`
- `02 / INTERACTION`
- `03 / REFLECTION`
- `04 / TRANSITION`

Reference quote:

`"A MASTERCLASS IN DIGITAL ATMOSPHERE AND STORYTELLING."`

Attribution:

`- AWWWARDS JURY`

Do not use the quote unless it is verified.

#### Bottom project navigation

Left:

- back arrow plus `BACK TO PROJECTS`.

Right:

- `PREV PROJECT`;
- compact nine-dot/grid icon;
- `NEXT PROJECT` plus arrow.

These controls must work and must respect the filtered or canonical project order.

### 4. Services / What I Do

Reference file: `what-i-do.png`  
Reference canvas: 1672 x 941.

#### Top composition

Top-left:

- concept monogram.

Top-right:

- standard nav with `SERVICES` active.

Left:

- Steel Blue label `WHAT I DO`;
- huge two-line statement `DIGITAL EXPERIENCES THAT FEEL REAL.`;
- body copy: `I craft immersive digital experiences at the intersection of design, technology, and storytelling. From concept to execution - built to engage, inspire, and leave a lasting impact.`

Right:

- cinematic scene of a figure facing a tall illuminated doorway;
- small statement:
  - `EXPERIENCES`
  - `DESIGNED TO CONNECT.`
  - `BUILT TO LAST.`
- a short Steel Blue horizontal rule above the statement.

#### Service band

Three large, equal-height rectangular modules sharing borders.

**01 Web Design**
- description: `Strategic, high-performance websites that merge clarity with visual impact.`
- `KEY DELIVERABLES`
- `UI/UX DESIGN`
- `RESPONSIVE DEVELOPMENT`
- `INTERACTIVE PROTOTYPES`
- `VIEW DETAILS`
- background or side image: curved concrete architecture with a small person.

**02 3D Design**
- description: `Photoreal 3D visuals and animations that bring ideas to life.`
- `KEY DELIVERABLES`
- `3D MODELING`
- `VISUALIZATION & RENDERING`
- `MOTION & ANIMATION`
- `VIEW DETAILS`
- image: surreal rock-spire landscape.

**03 VR Experiences**
- description: `Immersive environments that place users inside the story.`
- `KEY DELIVERABLES`
- `VR ENVIRONMENT DESIGN`
- `INTERACTIVE EXPERIENCES`
- `REAL-TIME PROTOTYPING`
- `VIEW DETAILS`
- image: luminous rectangular portal scene.

Service descriptions in production may be refined to match real service scope, but the three-discipline hierarchy is authoritative.

#### Process band

Left intro:

- `HOW I WORK`;
- `A focused, collaborative process that turns ideas into purposeful digital experiences.`

Horizontal stages:

01 Discover  
`Understanding goals, audience, and context.`

02 Define  
`Strategy, structure, and creative direction.`

03 Design  
`Crafting visuals and interactions with intent.`

04 Develop  
`Building, refining, and optimizing.`

05 Deliver  
`Launching experiences that make an impact.`

### 5. About / Approach

Reference file: `approach.png`  
Reference canvas: 1672 x 941.

#### Header

Top-left:

- concept monogram;
- breadcrumb `ABOUT / APPROACH`, with `ABOUT` in Steel Blue.

Top-right:

- standard nav with `ABOUT` active.

#### Main statement

Left:

- small `APPROACH` label and short rule;
- huge two-line statement: `DESIGN AS EXPERIENCE ENGINEERING.`;
- body copy: `I design digital experiences that merge clarity with depth. Where story, systems, and sensory detail align to move people.`

Near the center below the headline:

- `FOUNDER & ART DIRECTOR`;
- reference wordmark `AVELLINO`;
- `BASED IN THE DIGITAL REALM`.

For production, replace the concept identity with Mikey Nu or Michael Ndhlovu as appropriate. Do not retain Avellino.

Right:

- very large monochrome close crop of a person in a cap and puffer jacket;
- the figure fills much of the right half;
- no image card boundary;
- service list at far right:
  - `WEB DESIGN`
  - `3D DESIGN`
  - `VR EXPERIENCES`.

#### Lower structural band

The bottom half is divided by hairline rules.

Left block, Philosophy:

- heading `PHILOSOPHY`;
- statement `Build with intention. Design for perception.`;
- paragraph explaining invisible design, friction removal, meaning, experience, art direction, interaction, and immersive technology;
- second paragraph about shaping how people feel, explore, and connect.

Center block, Capabilities:

1. Web Design and Development  
   `Digital experiences that are fast, fluid, and intentional.`

2. 3D Design and Visualization  
   `Form, space, and light crafted for impact and clarity.`

3. VR Experience Design  
   `Immersive worlds that engage the senses and scale.`

4. Art Direction and Branding  
   `Visual identities and narratives that resonate deeply.`

Each capability has a restrained thin outline symbol, not a colored icon tile.

Right block, Process:

01 Discover  
`Unearthing ideas, goals, and opportunities.`

02 Define  
`Shaping strategy, structure, and creative direction.`

03 Design  
`Crafting visuals, interactions, and immersive layers.`

04 Develop  
`Building with precision and performance.`

05 Deliver  
`Refining, testing, and launching seamless experiences.`

Bottom center statement:

`"WE DON'T JUST DESIGN INTERFACES. WE DESIGN HOW THEY'RE FELT."`

Bottom-left:

- `/ 02 - ABOUT`.

Bottom-right:

- `SCROLL TO EXPLORE`.

### 6. Contact / Inquiry

Reference file: `contact.png`  
Reference canvas: 1672 x 941.

#### Top frame

Top-left:

- concept monogram.

Top-right:

- standard nav with `CONTACT` active.

#### Left content

Steel Blue breadcrumb:

- `CONTACT / INQUIRY`.

Huge two-line display statement:

- `LET'S CRAFT`
- `SOMETHING REAL.`

Body copy:

`I partner with forward-thinking teams and ambitious founders to build digital experiences that are immersive, functional, and built to last.`

A standing faceless figure sits right of the text, still inside the left half, grounded by a horizontal pool of light.

#### Contact information rail

Three columns separated by vertical hairlines.

**Availability**
- blue dot;
- `Open for new projects`;
- concept date: `May-June 2024`.

**Response Time**
- `Within 24-48 hours`;
- `Mon-Fri`.

**Email**
- concept email: `hello@avellino.studio`;
- blue `Copy email` action with arrow.

All availability dates, response promises, and email addresses in the screenshot are placeholders unless verified from production data.

#### Social rail

Heading:

`LET'S CONNECT`

Links:

- `LINKEDIN`
- `DRIBBBLE`
- `BEHANCE`
- `INSTAGRAM`

Each uses a small right arrow and ample horizontal spacing.

Only include social networks with real production URLs. Correct obvious concept typos in production, for example `DRIBBBLE` should not be preserved if the intended service is Dribbble.

#### Right form panel

The form occupies roughly the right 44 percent of the viewport.

The panel is a sharp rectangular grid with:

- outer 1px border;
- internal horizontal divisions;
- two-column top field row;
- full-width selects and textarea;
- full-width blue submit area.

Exact visible labels and placeholders:

- `TELL ME ABOUT YOUR PROJECT`
- `FULL NAME *`
- placeholder `Your name`
- `EMAIL ADDRESS *`
- placeholder `you@company.com`
- `PROJECT TYPE *`
- placeholder `Select project type`
- `BUDGET OR SCOPE *`
- placeholder `Select your budget or scope`
- `TELL ME MORE ABOUT YOUR PROJECT *`
- placeholder `Share goals, ideas, references, or anything that helps.`
- submit `SEND INQUIRY`

Bottom-left:

- concept copyright `© AVELLINO 2024`;
- `ALL RIGHTS RESERVED`.

Bottom-right:

- `/ 05 - CONTACT`.

Production copyright must use the real identity and current year logic.

## Motion

The Brand CI specifies three motion principles:

### Fade

`Soft opacity transitions for entries and exits.`

Use for:

- theme video crossfade;
- image reveal after load;
- modal or menu opacity when a modal is genuinely required.

Recommended duration: 160 to 240ms for interface feedback, 280 to 420ms for cinematic content entry.

### Slide

`Subtle directional movement with ease.`

Use for:

- mobile menu entry;
- project-to-project transition;
- intentional content reveal.

Movement should normally be 8 to 24px, not large off-screen sweeps.

### Reveal

`Content reveals in measured steps.`

Use for:

- page-load editorial sequencing;
- a case-study image sequence;
- service-panel content entry.

Do not apply identical fade-up animation to every section.

### Motion curve

Prefer a controlled ease such as:

`cubic-bezier(0.2, 0, 0, 1)`

Avoid:

- bounce;
- spring overshoot;
- elastic easing;
- perpetual animation;
- hover zoom on every image;
- decorative parallax.

### Reduced motion

When `prefers-reduced-motion: reduce` is active:

- disable spatial movement;
- eliminate non-essential sequencing delays;
- keep state changes immediate or near-immediate;
- keep background video behavior accessible and non-essential;
- preserve all information without relying on animation.

## Responsive Behavior

### Large desktop: 1440px to 1920px and above

Target:

- full cinematic composition;
- 12-column grid;
- 80px outer margin where space allows;
- 32px gutters;
- up to 1440px bounded content;
- strong asymmetry;
- large display type;
- full editorial project relationships.

Do not artificially stretch text to fill ultrawide screens. Maintain readable measures and let negative space grow.

### Desktop: 1024px to 1439px

Adapt:

- reduce outer margin fluidly;
- preserve 12-column logic or collapse to 8 columns if implementation benefits;
- reduce display size with `clamp`;
- keep figure or architectural media dominant;
- avoid overlapping navigation and headings;
- allow case-study hero text and image proportions to rebalance.

### Tablet: 768px to 1023px

Adapt:

- simplify to 6 or 8 logical columns;
- navigation may switch to compact menu;
- service modules may become one plus one or stacked editorial panels;
- project filters must remain accessible and may wrap;
- contact page becomes a vertical sequence with left context followed by form;
- process steps can become a two-column or vertical sequence.

Do not scale the desktop page down as a screenshot.

### Mobile: 320px to 767px

Priority:

1. identity/navigation;
2. page title;
3. essential description;
4. primary content or project media;
5. primary action;
6. supporting metadata;
7. secondary decoration.

Mobile rules:

- use approximately 20 to 24px page padding;
- display typography remains condensed and expressive but must fit without clipping;
- no horizontal overflow;
- large images may crop intentionally using controlled focal points;
- filters become a horizontally scrollable text rail only if necessary, with visible active state;
- service panels stack with image and text order chosen for narrative clarity;
- contact form fields become single-column;
- process steps become vertical;
- bottom section index may be removed when space is limited;
- touch targets should be at least 44px where practical;
- active and focus states must not depend on hover.

### Required visual QA viewports

At minimum, validate:

- 360px;
- 390px;
- 430px;
- 768px;
- 1024px;
- 1440px;
- 1920px.

At each size check:

- horizontal overflow;
- title clipping;
- navigation collision;
- image focal point;
- form usability;
- text wrapping;
- section dividers;
- button hit areas;
- visible keyboard focus;
- light and dark theme parity.

## Accessibility and Interaction Quality

### Contrast

WCAG 2.2 AA is the minimum.

Targets:

- normal text: at least 4.5:1;
- large text: at least 3:1;
- meaningful UI boundaries and focus indicators: maintain sufficient non-text contrast;
- never rely on Steel Blue alone to convey state without an additional underline, label, icon, or structural cue where necessary.

Because Silver on Graphite may be marginal at small sizes depending on opacity, measure actual rendered combinations. Do not assume the palette automatically passes.

### Focus

Every interactive control must have a visible `:focus-visible` treatment.

Recommended system:

- 2px Steel Blue outer outline;
- 2px offset where it prevents collision with the element border;
- no focus removal without replacement;
- ensure the indicator remains visible on both dark and light themes.

### Forms

Required:

- semantic labels;
- accessible error text;
- programmatic association between error and field;
- clear required state;
- success confirmation after send;
- disabled and progress behavior during submission;
- keyboard operability for selects and actions.

### Navigation

Required:

- semantic links or buttons;
- `aria-current="page"` on the active destination;
- mobile menu focus management;
- Escape closes an open menu;
- body scroll managed only while the menu is open;
- active underline is not the only accessible indicator.

### Media

Background video:

- muted;
- no essential information conveyed only through motion;
- no audio autoplay;
- avoid rapid flashing;
- maintain readable fallback background if video cannot load.

Project media:

- informative images receive specific alt text;
- purely atmospheric decorations may use empty alt text;
- clickable images require an accessible name describing the destination.

## Content Integrity

The concept screens deliberately use fictional or placeholder brand and project content to demonstrate layout.

The following are not automatically production facts:

- Avellino;
- AV monogram;
- hello@avellino.studio;
- May-June 2024 availability;
- 24-48 hour response promise;
- Echoes;
- Beyond;
- Interval;
- 2024 project year;
- 03:42 average engagement;
- 68% return visit rate;
- Awwwards honorable mention;
- Site of the Day;
- Awwwards jury quote.

An AI agent must never copy these into production merely because they appear in the screenshots.

Use real project and profile data from the repository or explicit user input.

If real content is unavailable, keep the layout structurally ready but do not fabricate evidence.

## AI Agent Implementation Protocol

This section exists specifically to improve design reliability when UI is created or modified by an AI coding agent.

### Before writing code

1. Read the current user request.
2. Read this `DESIGN.md`.
3. Read `docs/DESIGN_RULES.md`.
4. Inspect the actual target component and its parent layout.
5. Inspect reusable primitives and current theme tokens.
6. Inspect the relevant project data and real media assets.
7. Identify which reference page governs the task.
8. Write down the page's primary user goal and content hierarchy.
9. Determine whether the task is a faithful implementation, a responsive adaptation, or a new page using this system.
10. Only then change code.

### Reference-first behavior

When implementing one of the documented pages:

- preserve the major composition;
- preserve visual hierarchy;
- preserve text-to-image balance;
- preserve use of negative space;
- preserve line structure;
- preserve typography roles;
- preserve image aspect-ratio intent;
- preserve navigation active state;
- preserve component sharpness;
- preserve accent scarcity.

Do not reinterpret the page into a more familiar UI pattern.

### Container deletion test

For every bordered region, ask:

`If this border and container disappeared, would the grouping still be understandable through alignment, proximity, and typography?`

If yes, consider removing the container.

The reference system uses borders intentionally around forms, service modules, and gallery frames, but it does not box every paragraph or section.

### Template smell test

Before finalizing, ask whether the page resembles a common generated template more than the reference.

Warning signs:

- a generic centered hero;
- a row of three rounded feature cards;
- badge above headline;
- gradient CTA;
- icon tiles;
- testimonial carousel;
- invented stats;
- glass nav;
- oversized rounded panels;
- identical project cards;
- background dot grid.

If any appear without direct evidence, remove them.

### Product-specificity test

A successful implementation should still look recognizably like this portfolio if all project names are temporarily replaced with neutral placeholders.

The identity must remain visible through:

- Druk Condensed scale;
- Neue Haas Grotesk utility type;
- near-black field;
- Paper typography;
- Steel Blue scarcity;
- sharp line system;
- cinematic monochrome media;
- asymmetric editorial grid;
- large negative-space composition.

### No guessing about production facts

If a design requires content not present in repository data:

- do not invent it;
- use an existing real field;
- omit the unsupported item;
- or ask the user when the missing content changes meaning.

### Implementation reuse

Prefer existing shared primitives when they match the required visual grammar.

Do not keep a mismatched component merely because it already exists. If a primitive fundamentally violates this design system, refactor it at the correct shared layer rather than overriding it repeatedly on individual screens.

### CSS discipline

- use semantic tokens;
- avoid arbitrary hex values outside the documented palette;
- avoid arbitrary one-off radii;
- avoid broad `transition-all`;
- avoid inline styles for repeated visual rules;
- centralize common layout and typography primitives;
- preserve theme parity;
- do not use `!important` as a routine escape hatch.

## Visual QA Protocol

A build passing is not visual proof.

For every meaningful UI change:

1. run the relevant build and type checks;
2. open the actual page in a browser;
3. capture screenshots at the required target viewports;
4. compare against the governing concept screen;
5. inspect both themes where supported;
6. inspect keyboard focus;
7. inspect hover and active states;
8. inspect realistic long content;
9. inspect missing-image behavior where relevant;
10. fix concrete visual regressions before declaring completion.

### Comparison order

Compare in this order:

1. page silhouette;
2. content width and margins;
3. dominant type scale;
4. image placement and crop;
5. column proportions;
6. major vertical rhythm;
7. navigation;
8. borders and dividers;
9. body copy measure;
10. controls and states;
11. micro-spacing.

Do not waste time tuning a 2px icon offset while the main column proportions are wrong.

### Screenshot regression guidance

When automated screenshot baselines exist:

- treat unexplained changes as regressions until proven intentional;
- maintain baselines at representative mobile and desktop widths;
- update baselines only after reviewing the rendered difference;
- do not blindly regenerate baselines to make CI pass.

## Reference Copy Inventory

This inventory exists so a reader who has never seen the screenshots understands exactly what they contain. It is not permission to publish placeholder copy.

### Home concept

- `WEB DESIGN / 3D DESIGN / VR`
- `MIKEY NU`
- `VIEW SELECTED WORK`
- `/ 01 - INTRO`
- `SCROLL TO EXPLORE`
- nav: `WORK`, `SERVICES`, `ABOUT`, `CONTACT`

### Work concept

- `WORK / SELECTED PROJECTS`
- `SELECTED WORK`
- `A selection of digital experiences crafted with intention, precision, and immersive detail.`
- filters: `ALL`, `WEB`, `3D`, `VR`
- `01 ECHOES`
- `WEB DESIGN`
- `A bold portfolio experience exploring identity through contrast, structure, and cinematic flow.`
- `02 BEYOND`
- `3D DESIGN`
- `An otherworldly landscape built for mood, scale, and visual storytelling.`
- `03 INTERVAL`
- `VR EXPERIENCE`
- `An interactive journey through space and time, where perception shifts and adapts.`
- repeated action: `VIEW PROJECT`
- `/ 01 - WORK`
- `SCROLL TO EXPLORE`

### Services concept

- `WHAT I DO`
- `DIGITAL EXPERIENCES THAT FEEL REAL.`
- `I craft immersive digital experiences at the intersection of design, technology, and storytelling. From concept to execution - built to engage, inspire, and leave a lasting impact.`
- `EXPERIENCES`
- `DESIGNED TO CONNECT.`
- `BUILT TO LAST.`
- `WEB DESIGN`
- `Strategic, high-performance websites that merge clarity with visual impact.`
- `3D DESIGN`
- `Photoreal 3D visuals and animations that bring ideas to life.`
- `VR EXPERIENCES`
- `Immersive environments that place users inside the story.`
- `KEY DELIVERABLES`
- `VIEW DETAILS`
- `HOW I WORK`
- process: `DISCOVER`, `DEFINE`, `DESIGN`, `DEVELOP`, `DELIVER`

### About concept

- `ABOUT / APPROACH`
- `APPROACH`
- `DESIGN AS EXPERIENCE ENGINEERING.`
- `I design digital experiences that merge clarity with depth. Where story, systems, and sensory detail align to move people.`
- `FOUNDER & ART DIRECTOR`
- `AVELLINO`
- `BASED IN THE DIGITAL REALM`
- `WEB DESIGN`
- `3D DESIGN`
- `VR EXPERIENCES`
- `PHILOSOPHY`
- `Build with intention. Design for perception.`
- `CAPABILITIES`
- `PROCESS`
- `"WE DON'T JUST DESIGN INTERFACES. WE DESIGN HOW THEY'RE FELT."`
- `/ 02 - ABOUT`
- `SCROLL TO EXPLORE`

### Contact concept

- `CONTACT / INQUIRY`
- `LET'S CRAFT SOMETHING REAL.`
- `I partner with forward-thinking teams and ambitious founders to build digital experiences that are immersive, functional, and built to last.`
- `AVAILABILITY`
- `Open for new projects`
- `May-June 2024`
- `RESPONSE TIME`
- `Within 24-48 hours`
- `Mon-Fri`
- `EMAIL`
- `hello@avellino.studio`
- `Copy email`
- `LET'S CONNECT`
- `LINKEDIN`
- `DRIBBBLE`
- `BEHANCE`
- `INSTAGRAM`
- `TELL ME ABOUT YOUR PROJECT`
- `FULL NAME *`
- `EMAIL ADDRESS *`
- `PROJECT TYPE *`
- `BUDGET OR SCOPE *`
- `TELL ME MORE ABOUT YOUR PROJECT *`
- `SEND INQUIRY`
- `/ 05 - CONTACT`

### Project-detail concept

- `/ PROJECTS / ECHOES`
- `WEB DESIGN / 3D DESIGN / VR`
- `ECHOES`
- `WHERE MEMORY TAKES SPACE.`
- `YEAR`
- `2024`
- `VIEW PROJECT`
- `CHALLENGE`
- `APPROACH`
- `OUTCOME`
- `03:42 AVG. ENGAGEMENT TIME`
- `68% RETURN VISIT RATE`
- `AWWWARDS HONORABLE MENTION`
- `SITE OF THE DAY`
- `01 / ARRIVAL`
- `02 / INTERACTION`
- `03 / REFLECTION`
- `04 / TRANSITION`
- `"A MASTERCLASS IN DIGITAL ATMOSPHERE AND STORYTELLING."`
- `- AWWWARDS JURY`
- `BACK TO PROJECTS`
- `PREV PROJECT`
- `NEXT PROJECT`

## Brand CI Reference Details

Reference file: `Brand CI.png`  
Reference canvas: 1672 x 941.

The Brand CI concept board is itself a 1672 x 941 dark editorial sheet divided by thin rules into a modular specification.

### Brand essence block

Left side:

- words stacked vertically in Druk Condensed:
  - `CINEMATIC`
  - `ARCHITECTURAL`
  - `IMMERSIVE`
  - `TACTILE`
  - `FOCUSED`
  - `TIMELESS`
- accompanying copy:
  - `Digital experiences shaped with intention.`
  - `Web. 3D. VR.`
  - `Crafted in darkness, designed to be felt.`
- standing figure lit from below.

### Logo direction block

Center-top:

- large white `AV` monogram;
- construction diagram showing the monogram on a measurement grid;
- spaced-out `AVELLINO` wordmark beneath.

For production, preserve the minimal, typographic character of this logo treatment without copying the Avellino name.

### Color palette block

Six physical-looking swatches with names and hex values:

- Void `#070707`
- Graphite `#111214`
- Steel `#2A2D31`
- Silver `#A2A6A0`
- Paper `#EDEDE0`
- Steel Blue `#4A6A8A`

Supporting statement:

`Primarily monochrome with a single restrained accent. The accent is used sparingly for focus, links, and CTAs.`

### Typography block

- `DRUK CONDENSED`
- usage annotation `BOLD / SUPER / CYR`
- `NEUE HAAS GROTESK`
- usage annotation `REGULAR / MEDIUM`
- display example `DESIGN IN THE DARK.`
- body-copy example describing digital experiences with depth, clarity, and purpose.

### Layout and grid block

Explicit values:

- `12 COLUMN GRID`
- `MAX CONTENT WIDTH 1440PX`
- `GUTTER 32PX`
- `MARGIN 80PX`

### Brand values block

Four thin outline symbols with:

- `INTENTION`: `Every detail has purpose.`
- `CRAFT`: `Built with care, not speed.`
- `CLARITY`: `Simple on the surface, deep in function.`
- `IMMERSION`: `Design that pulls you in and holds you.`

### Hero layout principle block

A miniature hero concept showing:

- top-left monogram;
- top-right navigation;
- large left display text: `WE CRAFT DIGITAL EXPERIENCES THAT FEEL REAL.`;
- small figure beside a lit doorway;
- bottom service labels;
- bottom-right `SCROLL`.

### Components block

Buttons:

- filled Steel Blue primary button with trailing arrow;
- outlined secondary button with trailing arrow;
- underlined text link with trailing arrow.

Navigation:

- monogram plus `WORK`, `SERVICES`, `ABOUT`, `CONTACT`;
- active link underlined in Steel Blue.

Section divider:

- long horizontal rule;
- short blue active segment;
- number `01`.

### Motion principles block

- `FADE`: soft opacity transitions for entries and exits.
- `SLIDE`: subtle directional movement with ease.
- `REVEAL`: content reveals in measured steps.

### UI fragments block

Mobile concept:

- logo left;
- `MENU` right;
- `ABOUT`;
- `DESIGNER & ART DIRECTOR FOCUSED ON DIGITAL FORM.`;
- `READ MORE`.

Project fragment:

- `PROJECT`;
- `ECHOES`;
- `VIEW PROJECT`;
- architectural image;
- index rail `01 02 03` with `02` active.

## Design Validation Checklist

Before an AI agent marks any UI task complete, answer all of the following:

### Identity

- Does the screen still look like this portfolio without reading the project name?
- Is the Steel Blue accent scarce?
- Are the two font roles clearly distinct?
- Is the composition cinematic rather than generic?
- Is the imagery spatial and purposeful?

### Layout

- Does the desktop composition use the grid intentionally?
- Is there enough negative space?
- Are large type and imagery balanced?
- Are line divisions aligned?
- Are there any unnecessary rounded cards?
- Is every container semantically justified?

### Content

- Is every project/client/metric/award claim real?
- Are placeholder concept names removed from production?
- Is copy specific rather than generic AI marketing language?
- Are line lengths readable?

### Interaction

- Do filters actually filter?
- Do project links navigate correctly?
- Do prev/next controls use real project order?
- Does the theme toggle switch both the UI and approved hero video correctly?
- Are form states complete?
- Is keyboard focus visible?

### Responsive

- Is there no horizontal overflow?
- Does display text avoid clipping?
- Is the content order still logical on mobile?
- Are images cropped intentionally?
- Are touch targets practical?

### Motion

- Does motion communicate state or continuity?
- Is there any decorative movement that can be removed?
- Does reduced motion preserve full functionality?

### Final standard

The finished interface should feel like it was directed by one person with a specific visual point of view. It must not feel like an AI assembled fashionable components around the content.

## Documentation Method

This file follows the current Google Labs `DESIGN.md` approach: machine-readable tokens in YAML frontmatter plus prose that describes intent, restrictions, and usage. The prose is deliberately specific because design intent cannot be reduced to tokens alone.

The document also incorporates practical lessons from AI coding workflows:

- persistent repository design context reduces repeated prompting;
- direct, prescriptive rules work better than broad adjectives;
- negative constraints prevent agents from falling back to common generated UI patterns;
- reference images should be translated into explicit composition and content relationships;
- visual browser verification and screenshot comparison are necessary because a successful build does not prove visual correctness;
- accessibility, long content, localization, empty states, and focus behavior must be evaluated separately from screenshot beauty.

This `DESIGN.md` is a living source of truth. Update it when the approved design language changes, not when a one-off implementation happens to diverge.

## Research Basis

The structure and operating rules in this file were informed by current primary documentation, current accessibility standards, recent design-to-code research, and practitioner reports about AI-assisted UI work. These references do not override the supplied concept screens or Brand CI. They explain why the specification is structured this way.

### Primary specifications and agent guidance

- Google Labs DESIGN.md format specification: https://github.com/google-labs-code/design.md/blob/main/docs/spec.md
  - establishes the YAML-frontmatter plus Markdown-body model;
  - defines canonical section ordering;
  - treats tokens as normative values and prose as application guidance.
- Google Labs DESIGN.md project: https://github.com/google-labs-code/design.md
  - provides the DESIGN.md parser, lint rules, and token-export tooling.
- OpenAI, Introducing Codex: https://openai.com/index/introducing-codex/
  - supports durable repository instructions and reliable project documentation as agent context.
- OpenAI, How OpenAI uses Codex: https://openai.com/business/guides-and-resources/how-openai-uses-codex/
  - recommends concrete file paths, component references, and persistent repository context instead of vague prompts.
- OpenAI, Harness engineering: https://openai.com/index/harness-engineering/
  - recommends repository knowledge as a structured system of record and warns against undifferentiated instruction blobs. This document responds with explicit headings and a page-scoped reading strategy.

### Accessibility source

- W3C Web Content Accessibility Guidelines 2.2: https://www.w3.org/TR/WCAG22/
  - informs contrast, keyboard focus, reflow, target visibility, and form-accessibility requirements.

### Visual-to-code research

- ScreenCoder, 2025: https://arxiv.org/abs/2507.22827
  - supports decomposing visual references into grounding, planning, and generation stages rather than relying on a single vague style prompt.
- DCGen, 2024: https://arxiv.org/abs/2406.16386
  - reports that segmenting screenshots can reduce element omission, distortion, and misarrangement in multimodal UI generation. The page specifications in this document therefore describe each screen in spatial regions and visual modules.

### Practitioner and community signals

- Hacker News discussion on LLM UI development: https://news.ycombinator.com/item?id=47073838
  - practitioners report better results from explicit Markdown design systems and reference-driven implementation than from generic aesthetic prompts.
- Hacker News screenshot-verification workflow: https://news.ycombinator.com/item?id=47074302
  - describes using browser screenshots and reference baselines as an iterative visual QA loop.
- Reddit r/Frontend discussion on AI design failure modes: https://www.reddit.com/r/Frontend/comments/1ttrs0d/what_are_the_areas_of_design_that_the_best_ai/
  - practitioner feedback repeatedly identifies spacing systems, real-content overflow, empty states, localization, accessibility, and usability as areas requiring explicit rules and human verification.

The implementation standard is therefore reference-first, token-backed, prose-specific, state-aware, content-realistic, accessibility-aware, and screenshot-verified.

