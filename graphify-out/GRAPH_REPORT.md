# Graph Report - murall-next  (2026-06-12)

## Corpus Check
- 44 files · ~39,641 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 275 nodes · 324 edges · 22 communities (15 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `255a5945`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `useCart()` - 11 edges
3. `WEEK 4 — Conversion & Community` - 10 edges
4. `WEEK 1 — Brand Introduction` - 8 edges
5. `WEEK 2 — Education & Trust` - 8 edges
6. `WEEK 3 — Social Proof & Trade` - 8 edges
7. `Murall Wallpaper — Affiliate Network Applications` - 7 edges
8. `Murall Wallpaper — 30-Day Social Media Content Calendar` - 7 edges
9. `scripts` - 5 edges
10. `ProductPage()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `ProductPage()` --calls--> `NotFound()`  [INFERRED]
  src/app/products/[slug]/page.tsx → src/app/not-found.tsx
- `CartDrawer()` --calls--> `useCart()`  [EXTRACTED]
  src/app/components/CartDrawer.tsx → src/context/CartContext.tsx
- `Navbar()` --calls--> `useCart()`  [EXTRACTED]
  src/app/components/Navbar.tsx → src/context/CartContext.tsx
- `ProductCard()` --calls--> `useCart()`  [EXTRACTED]
  src/app/components/ProductGrid.tsx → src/context/CartContext.tsx
- `SearchOverlay()` --calls--> `useSearch()`  [EXTRACTED]
  src/app/components/SearchOverlay.tsx → src/context/SearchContext.tsx

## Import Cycles
- None detected.

## Communities (22 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (14): FOOTER_LINKS, HERO_SLIDES, TRUST_ITEMS, WHY_ITEMS, TRANSFORMATIONS, STORIES, PRESS, STATS (+6 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (16): metadata, SUGGESTED, Navbar(), SHOP_CATEGORIES, SearchOverlay(), SUGGESTIONS, TRENDING, SearchContext (+8 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (19): CartDrawer(), Product, ProductCard(), PRODUCTS, ProductWithRating, CartContext, CartContextType, CartItem (+11 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (22): dependencies, framer-motion, next, react, react-dom, devDependencies, eslint, eslint-config-next (+14 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): Day 1 — Monday (Brand Story), Day 22 — Monday (Offer), Day 23 — Tuesday (Brand), Day 24 — Wednesday (Tips), Day 25 — Thursday (Aspirational), Day 26 — Friday (Community), Day 27 — Saturday (Product), Day 28 — Sunday (Wrap-up/Reflective) (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (10): BENEFITS, FAQS, Step, STEPS, WHO, SampleRequestModalProps, Step, ALL_CATEGORIES (+2 more)

### Community 7 - "Community 7"
Cohesion: 0.15
Nodes (12): 1. ShareASale, 2. Awin, 3. CJ Affiliate (Commission Junction), 4. Impact, 5. Direct — Rebel Walls, Application Fields, Application Fields, Application Fields (+4 more)

### Community 8 - "Community 8"
Cohesion: 0.18
Nodes (9): BENEFITS, FAQS, FormStep, PRESS, RESOURCES, SHOWCASE, STATS, STEPS (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.20
Nodes (7): NotFound(), Article, ArticlePage(), ARTICLES, CATEGORY_COLORS, IMAGES, Section

### Community 10 - "Community 10"
Cohesion: 0.20
Nodes (4): CATEGORIES, Category, FILTER_OPTIONS, InstallType

### Community 11 - "Community 11"
Cohesion: 0.25
Nodes (8): Day 10 — Wednesday (Tips), Day 11 — Thursday (Luxury), Day 12 — Friday (Community), Day 13 — Saturday (Product), Day 14 — Sunday (Aspirational), Day 8 — Monday (How-to), Day 9 — Tuesday (Brand Spotlight), WEEK 2 — Education & Trust

### Community 12 - "Community 12"
Cohesion: 0.25
Nodes (8): Day 15 — Monday (Trade), Day 16 — Tuesday (Review/Social Proof), Day 17 — Wednesday (Education), Day 18 — Thursday (Trend), Day 19 — Friday (Behind the scenes), Day 20 — Saturday (UGC), Day 21 — Sunday (Lifestyle), WEEK 3 — Social Proof & Trade

### Community 15 - "Community 15"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **148 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+143 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Murall Wallpaper — 30-Day Social Media Content Calendar` connect `Community 4` to `Community 11`, `Community 12`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `useCart()` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _148 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07862903225806452 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1032258064516129 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._