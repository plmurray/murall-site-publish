"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { use } from "react";
import Navbar from "@/app/components/Navbar";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import SampleRequestModal from "@/app/components/SampleRequestModal";

const IMAGES = {
  verdant: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
  hex: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
  midnight: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
  emerald: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
};

type Section =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] }
  | { type: "numbered"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "image"; src: string; caption: string }
  | { type: "cta"; heading: string; body: string; buttonText: string; href?: string }
  | { type: "tip"; text: string }
  | { type: "faq"; items: { q: string; a: string }[] };

interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  authorBio: string;
  date: string;
  readTime: string;
  imageUrl: string;
  relatedSlugs: string[];
  body: Section[];
}

const ARTICLES: Article[] = [
  {
    slug: "how-to-choose-wallpaper-for-small-rooms",
    category: "How-to",
    title: "How to choose wallpaper for small rooms (without making them feel smaller)",
    excerpt: "The conventional wisdom says avoid bold patterns in small spaces. We beg to differ — here's how to use scale, colour, and placement to your advantage.",
    author: "Harriet Cole",
    authorBio: "Harriet is Murall's editorial director and a former contributing editor at World of Interiors. She has been writing about interior design for fifteen years.",
    date: "4 June 2026",
    readTime: "6 min read",
    imageUrl: IMAGES.verdant,
    relatedSlugs: ["botanical-wallpaper-trend-2026", "accent-wall-ideas", "how-many-rolls-do-i-need"],
    body: [
      { type: "p", text: "The received wisdom about small rooms and wallpaper is almost always the same: keep it light, keep it plain, don't make a statement. It's well-meaning advice, but it misses the point. A small room with a confident, well-chosen wallpaper can feel like a jewel box — intimate, considered, and more memorable than any magnolia-painted space twice its size." },
      { type: "p", text: "The key isn't pattern size or colour intensity. It's understanding how your eye moves around a room — and giving it somewhere interesting to go." },
      { type: "h2", text: "The scale myth" },
      { type: "p", text: "Small room, small pattern. It sounds logical, but in practice, tiny repeating patterns on every wall create visual noise that makes a space feel busier and more cramped than a single bold motif. Your eye has nowhere to rest." },
      { type: "p", text: "Counter-intuitively, large-scale designs — a sweeping botanical mural, an oversized geometric — can actually read as calmer in a small space because they give the eye a clear focal point. A single full-bleed leaf pattern behind a bed doesn't compete with itself; it simply is." },
      { type: "quote", text: "A small room done well doesn't try to pretend it's larger. It leans into its scale and becomes a complete, curated world.", attribution: "Harriet Cole" },
      { type: "h2", text: "Vertical patterns and the height trick" },
      { type: "p", text: "Stripes are the oldest trick in the book, but they work. Vertical stripes — whether explicit or implied by a tall botanical repeat — draw the eye upward and make ceilings feel higher. Even in a 2.4m room, a wallpaper with a strong vertical movement changes the perceived proportions dramatically." },
      { type: "p", text: "Look for designs where the dominant lines or shapes run top to bottom rather than side to side. Narrow florals on a climbing vine, classic ticking stripes, or elongated geometric columns all create this effect." },
      { type: "h2", text: "Colour and light" },
      { type: "p", text: "Dark wallpapers in small rooms is where most people hesitate — and where some of the best results happen. A deep, moody wallpaper on all four walls of a small dining room or powder room creates a sense of depth that actually makes the space feel larger. The eye perceives the walls as receding rather than closing in." },
      { type: "p", text: "The critical variable is light. A dark wallpaper in a room with good natural light or well-planned artificial light glows. The same paper in a windowless box becomes oppressive. Before you rule anything out, take a sample home and observe it in the actual light conditions of the room at different times of day." },
      { type: "h2", text: "The ceiling technique" },
      { type: "p", text: "One of the most underused tricks in small spaces: wallpaper the ceiling. Bringing the same pattern up and over creates a cocoon effect that feels intentional rather than cramped. It works especially well in alcoves, under-stair spaces, and box rooms — anywhere with clearly defined limits that benefit from being acknowledged rather than fought." },
      { type: "p", text: "If a full ceiling feels too much, try the fifth-wall approach: wallpaper down from the ceiling to a picture rail or dado height, then paint below it in the darkest shade of the pattern's background colour." },
      { type: "h2", text: "One wall or four?" },
      { type: "p", text: "The accent wall — one wallpapered surface, three painted — is popular for a reason: it's the lowest-commitment approach and it works reliably. But four walls of the same pattern can be more powerful, especially in rooms where you want to lean into their smallness." },
      { type: "p", text: "A good rule of thumb: if the pattern is busy and multicoloured, one wall is usually safer. If the pattern is quieter — a tonal texture, a subtle geometric, a single-colour botanical — four walls create a more enveloping, considered result." },
      { type: "list", items: [
        "One wall: best for bold, multicoloured, or oversized patterns",
        "Four walls: best for tonal, textural, or quieter repeats",
        "Ceiling too: works brilliantly in alcoves and under-stair spaces",
        "Always test a physical sample in the actual room — screens lie"
      ]},
      { type: "h2", text: "The final rule" },
      { type: "p", text: "The only wallpaper that's wrong for a small room is one you chose out of fear. The hallway you've been staring at for years, the powder room nobody photographs — these are precisely the spaces that reward a little courage. Order a sample. Live with it for a week. Then commit." },
    ],
  },
  {
    slug: "peel-and-stick-vs-paste-the-wall",
    category: "Guide",
    title: "Peel & Stick vs Paste-the-Wall: which is right for your project?",
    excerpt: "Both have their place. We break down durability, finish quality, and the real cost difference so you can make the right call for your home.",
    author: "James Whitfield",
    authorBio: "James is Murall's product editor and a qualified interior architect. He has overseen wallpaper specifications on residential and hospitality projects across Europe.",
    date: "28 May 2026",
    readTime: "5 min read",
    imageUrl: IMAGES.hex,
    relatedSlugs: ["how-to-choose-wallpaper-for-small-rooms", "how-many-rolls-do-i-need", "accent-wall-ideas"],
    body: [
      { type: "p", text: "The question comes up in almost every conversation we have with customers: should I go peel and stick or traditional paste? The honest answer is that it depends on your situation — your walls, your rental status, your patience, and how long you intend to stay. Here's everything you need to make the right call." },
      { type: "h2", text: "How each method works" },
      { type: "p", text: "Paste-the-wall is the traditional method: you apply adhesive paste directly to the wall (not the paper), then hang the dry wallpaper strip and smooth it into place. The paper expands slightly as it absorbs moisture from the paste, which is why it's important to work methodically and allow for overlap." },
      { type: "p", text: "Peel-and-stick uses a pressure-sensitive adhesive factory-applied to the back of the wallpaper. You peel off the backing and press it directly to the wall. No paste, no brushes, no drying time. Repositionable during installation, and removable later without damage to most painted surfaces." },
      { type: "h2", text: "Durability" },
      { type: "p", text: "Paste-the-wall wins on longevity. Properly hung on prepared walls, a quality paste-the-wall paper can last fifteen to twenty years without lifting, bubbling, or fading at the seams. It bonds to the wall as it dries and becomes part of the surface." },
      { type: "p", text: "Peel-and-stick, by design, doesn't bond permanently. Seams can lift slightly over time, particularly in humid environments (bathrooms, kitchens) or in rooms with significant temperature fluctuation. The better manufacturers use more aggressive adhesives that perform well for five to ten years, but it's not a like-for-like comparison." },
      { type: "quote", text: "Peel-and-stick has improved enormously in the last five years. For rental properties and temporary installations it's now a genuinely professional-grade option.", attribution: "James Whitfield" },
      { type: "h2", text: "Finish quality" },
      { type: "p", text: "Historically, paste-the-wall papers came in heavier, more luxurious substrates — woven textures, embossed finishes, non-woven backings that hold their form and hang flat. The market has narrowed this gap considerably, but very high-end wallpapers (de Gournay, Cole & Son's flagship ranges, silk-based papers) are still only available as traditional paste." },
      { type: "p", text: "Modern peel-and-stick papers are typically printed on vinyl or a lightweight non-woven substrate. They're crisp and well-suited to graphic, photographic, and geometric patterns. For richly textured or fabric-effect designs, paste-the-wall still tends to look better up close." },
      { type: "h2", text: "Cost" },
      { type: "p", text: "Peel-and-stick papers tend to cost 10–25% more per roll than equivalent paste designs from the same brand. You save on materials (no paste, no brushes, no seam roller) and potentially on labour if you're hanging them yourself — the process is genuinely more forgiving. For a professional hang, most decorators charge the same day rate regardless of method." },
      { type: "table", head: ["", "Peel & Stick", "Paste-the-Wall"], rows: [
        ["Durability", "5–10 years", "15–20+ years"],
        ["Installation", "DIY-friendly", "Some experience needed"],
        ["Removal", "Clean, non-damaging", "May require steaming"],
        ["Wall prep required", "Minimal", "Thorough (primed, smooth)"],
        ["Best for", "Renters, temporary", "Permanent installs"],
        ["Price per roll", "Higher", "Lower"],
      ]},
      { type: "h2", text: "The verdict" },
      { type: "p", text: "If you're renting, redecorating a child's room, or just not sure you want to commit — peel-and-stick is genuinely excellent. Buy from a reputable brand (Chasing Paper, Tempaper, and Hygge & West are the ones we trust), follow the wall prep instructions, and you'll get a result that impresses." },
      { type: "p", text: "If you own your home, you're working with a decorator, or you've fallen for a paper that only comes in paste — go paste. The result will last longer, look richer, and hold up to daily life. A good decorator will hang it flawlessly and it will outlast your furniture." },
    ],
  },
  {
    slug: "botanical-wallpaper-trend-2026",
    category: "Trend",
    title: "Why botanical wallpaper is the defining interior trend of 2026",
    excerpt: "From oversized tropical leaves to delicate herbarium prints, the natural world is making its way indoors in a big way this year.",
    author: "Sofia Laurent",
    authorBio: "Sofia is a Paris-based interiors writer and contributing editor at Murall Journal. She covers trend, design culture, and the spaces that shape us.",
    date: "19 May 2026",
    readTime: "4 min read",
    imageUrl: IMAGES.midnight,
    relatedSlugs: ["accent-wall-ideas", "how-to-choose-wallpaper-for-small-rooms", "interview-rebel-walls"],
    body: [
      { type: "p", text: "The numbers don't lie. Searches for botanical wallpaper across our platform are up 340% compared to this time last year. Designers from London to Los Angeles are specifying lush, nature-inspired wallcoverings in spaces where they would once have chosen plain paint or a quiet stripe. Something has shifted — and it goes deeper than a seasonal trend." },
      { type: "h2", text: "The biophilic moment" },
      { type: "p", text: "Biophilic design — the idea that human wellbeing improves when we maintain a connection to the natural world — has moved from academic theory to mainstream practice. The pandemic accelerated it: years of spending more time at home made people viscerally aware of what their interiors were and weren't giving them." },
      { type: "p", text: "Botanical wallpaper is one of the most direct expressions of this impulse. It brings the outside in permanently, transforming a wall into a living scene regardless of whether you have a garden, access to natural light, or a single houseplant." },
      { type: "quote", text: "Nature doesn't have a style. Botanical wallpaper works in a Georgian terrace, a new-build apartment, a boutique hotel corridor. It's one of the few design moves that's genuinely context-free.", attribution: "Sofia Laurent" },
      { type: "h2", text: "Three looks defining 2026" },
      { type: "h3", text: "1. Oversized tropical" },
      { type: "p", text: "Monstera leaves the size of dinner tables, banana palms reaching toward imaginary ceilings, bird-of-paradise in saturated greens and blacks. The scale is the statement: these designs don't whisper, they declare. Best used on a single feature wall or in rooms with strong light and high ceilings." },
      { type: "h3", text: "2. Delicate herbarium prints" },
      { type: "p", text: "At the opposite end of the spectrum: the pressed-flower aesthetic. Delicate line-drawn botanicals on cream or blush grounds, each plant specimen labelled in italic type as if lifted from a Victorian naturalist's journal. These work in almost any room and pair beautifully with natural linens, warm timbers, and aged brass hardware." },
      { type: "h3", text: "3. Moody botanical" },
      { type: "p", text: "Dark backgrounds — forest green, midnight blue, charcoal black — with richly detailed flora. This is the most dramatic of the three directions, and the one generating the most attention on social media. It reads as both cosy and sophisticated, and is particularly powerful in dining rooms and libraries." },
      { type: "h2", text: "How to style it" },
      { type: "p", text: "The risk with botanical wallpaper is over-theming. Resist the urge to add botanical prints to cushions, botanical illustrations to frames, and trailing plants to every surface. Let the wallpaper be the hero. Pair it with solid, grounded elements: a well-made sofa in a warm neutral, natural-fibre rugs, furniture in dark stained oak or walnut." },
      { type: "p", text: "One plant — one genuinely good plant, properly cared for — is all you need to complete the effect. It should look like the room suggested itself to you, not like you decorated around a theme." },
      { type: "h2", text: "Our picks for 2026" },
      { type: "list", items: [
        "Rebel Walls Verdant Canopy — the oversized tropical benchmark",
        "Sanderson Glasshouse collection — heritage botanical at its best",
        "Morris & Co. Strawberry Thief — the Arts & Crafts original",
        "Graham & Brown Jungle Fever — bold and affordable",
        "Harlequin Floret — delicate herbarium for lighter rooms",
      ]},
    ],
  },
  {
    slug: "how-many-rolls-do-i-need",
    category: "How-to",
    title: "How many rolls do I need? The definitive wallpaper calculator guide",
    excerpt: "Measure twice, order once. We walk you through the exact formula — accounting for pattern repeat, door and window cutouts, and when to order extra.",
    author: "Harriet Cole",
    authorBio: "Harriet is Murall's editorial director and a former contributing editor at World of Interiors. She has been writing about interior design for fifteen years.",
    date: "12 May 2026",
    readTime: "10 min read",
    imageUrl: IMAGES.emerald,
    relatedSlugs: ["peel-and-stick-vs-paste-the-wall", "how-to-choose-wallpaper-for-small-rooms", "accent-wall-ideas"],
    body: [
      { type: "p", text: "Ordering too few rolls is one of the most common — and most expensive — mistakes in home decorating. Wallpaper is printed in batches, and a roll ordered six weeks after your original purchase may come from a different dye lot: subtly different in colour, visible on the wall every time you walk past. The only insurance is to order enough the first time." },
      { type: "p", text: "This guide gives you everything you need to calculate rolls correctly: the step-by-step formula, room-by-room reference tables, an explanation of pattern repeat, and our free calculator that does the arithmetic for you." },

      { type: "h2", text: "Quick reference: how many rolls by room" },
      { type: "p", text: "The table below covers typical UK room sizes using standard rolls (52cm wide × 10m long), with 2.4m ceilings, one door, and one to two windows. Use it as a starting point, then verify with the full calculation below." },
      { type: "table", head: ["Room", "Typical dimensions", "No repeat", "Large repeat (64cm+)"], rows: [
        ["Powder room / WC", "2m × 2m", "5–6 rolls", "7–8 rolls"],
        ["Single bedroom", "3m × 3.3m", "8–10 rolls", "11–13 rolls"],
        ["Double bedroom", "3.6m × 4.2m", "10–12 rolls", "13–15 rolls"],
        ["Master bedroom", "4.5m × 5m", "13–15 rolls", "17–20 rolls"],
        ["Living room", "4.5m × 5.5m", "14–17 rolls", "18–22 rolls"],
        ["Dining room", "3.5m × 4m", "10–12 rolls", "13–15 rolls"],
        ["Hallway (narrow)", "1.2m wide, 6m run", "6–8 rolls", "8–10 rolls"],
        ["Accent wall only", "3.6m wide", "3–4 rolls", "5–6 rolls"],
      ]},
      { type: "tip", text: "Always add at least one extra roll beyond your calculation, regardless of the room size. If you end up with a spare, store it for future repairs — it will be from the same dye lot." },

      { type: "h2", text: "UK vs US roll sizes: know the difference" },
      { type: "p", text: "If you're shopping from a US brand or using a US calculator, the roll dimensions are completely different. UK and European standard rolls are narrower and longer; US rolls are wider and shorter. Using the wrong numbers will throw your entire calculation off." },
      { type: "table", head: ["", "UK / European standard", "US standard"], rows: [
        ["Width", "52–53cm", "68.5cm (27 inches)"],
        ["Length", "10m", "4.5m (15 feet)"],
        ["Usable coverage", "~5.2m²", "~2.8m²"],
        ["Rolls for a double bedroom", "10–12", "20–24"],
      ]},
      { type: "p", text: "Some US brands now offer their designs in European-width rolls. Always check the product specification page — not just the listing title — before calculating." },

      { type: "h2", text: "The full calculation: step by step" },
      { type: "p", text: "You'll need: a tape measure, the product specification for your chosen wallpaper (roll width, roll length, and pattern repeat), and about ten minutes." },

      { type: "h3", text: "Step 1: Measure your walls" },
      { type: "p", text: "Measure the width of each wall you intend to paper, then add them all together to get your total perimeter. Measure ceiling height from top of skirting board to ceiling — or to the cornice if you're stopping there." },
      { type: "p", text: "Example: a room with walls measuring 3.6m, 4.2m, 3.6m, 4.2m has a perimeter of 15.6m. Ceiling height is 2.4m." },

      { type: "h3", text: "Step 2: Find the pattern repeat" },
      { type: "p", text: "Every wallpaper specifies a pattern repeat on its product page — the vertical distance before the design starts again. A plain or textured paper has a repeat of zero. A small geometric might repeat every 9cm. A large botanical mural might repeat every 64cm." },
      { type: "p", text: "The repeat matters because you must align it at every seam. This creates unavoidable waste: the larger the repeat, the more paper is trimmed from each strip." },
      { type: "table", head: ["Pattern repeat", "Waste per strip (2.4m ceiling)"], rows: [
        ["None / plain", "0–5cm"],
        ["Up to 15cm", "~10cm"],
        ["15–30cm", "~20cm"],
        ["30–64cm", "~40cm"],
        ["64cm+", "Up to 64cm"],
      ]},

      { type: "h3", text: "Step 3: Calculate drops per roll" },
      { type: "p", text: "Cut length per drop = ceiling height + pattern repeat. Our example: 2.4m ceiling + 0.64m repeat = 3.04m per drop. A standard 10m roll gives 3 usable drops (10 ÷ 3.04 = 3.28, rounded down — never up)." },
      { type: "tip", text: "Check the roll length on the product spec — some luxury papers come in 5m rolls. This halves your drops per roll and doubles the number of rolls you need." },

      { type: "h3", text: "Step 4: Calculate total drops needed" },
      { type: "p", text: "Divide your total perimeter by the roll width to get the number of drops required. Standard rolls are 52–53cm wide: 15.6m ÷ 0.52m = 30 drops." },

      { type: "h3", text: "Step 5: Account for doors and windows" },
      { type: "p", text: "The strips beside and above doors or windows still need to come from full-length drops to maintain pattern alignment, so the saving is modest. A reliable rule of thumb: subtract one roll per standard door and half a roll per standard window." },
      { type: "p", text: "Our example room with one door and two windows: 30 drops ÷ 3 drops per roll = 10 rolls, minus 1 (door), minus 1 (two windows at 0.5 each) = 8 rolls." },

      { type: "h3", text: "Step 6: Add your safety margin" },
      { type: "p", text: "Add 10% for plain or small-repeat papers, 15% for large-repeat papers. This covers installation errors, trimming mistakes, and future repair patches." },
      { type: "p", text: "Our example: 8 rolls × 1.15 = 9.2, rounded up to 10 rolls. Order 10." },
      { type: "quote", text: "If you're between a number and the next number up, always go up. One extra roll costs very little. A mismatched patch repair costs everything.", attribution: "Harriet Cole" },

      { type: "cta", heading: "Skip the arithmetic", body: "Enter your wall measurements and our calculator gives you an exact roll count in under a minute — accounting for pattern repeat, doors, and windows.", buttonText: "Open the free rolls calculator" },

      { type: "h2", text: "Pattern repeat types explained" },
      { type: "p", text: "Not all repeats work the same way. Understanding the type affects both waste and how you cut your strips." },
      { type: "table", head: ["Repeat type", "How it works", "Waste", "Common on"], rows: [
        ["Free match / plain", "No alignment needed — each strip hangs independently", "Minimal", "Textures, plains, grasscloth"],
        ["Straight match", "Pattern aligns straight across at every seam", "Low–medium", "Small geometrics, stripes"],
        ["Half drop", "Alternating strips drop by exactly half the repeat height", "Medium–high", "Large florals, botanicals, diagonals"],
        ["Random match", "No repeat (e.g. natural fibres)", "None", "Grasscloth, jute, seagrass"],
      ]},
      { type: "p", text: "Half-drop papers are the most wasteful. For every two strips you hang, you lose half a repeat's worth of paper from one of them. On a 64cm half-drop repeat, that's 32cm of wasted paper per alternate strip — always factor this into your calculation." },

      { type: "h2", text: "The five most common mistakes" },
      { type: "numbered", items: [
        "Measuring the full perimeter including doors and windows, then failing to subtract any of it back",
        "Forgetting to check the roll length — especially important with luxury and US-brand papers that often use 5m or 4.5m rolls",
        "Ignoring the dye lot number when ordering extra rolls later — always match this to your original order",
        "Using the ceiling height alone as the drop length, without adding the pattern repeat",
        "Ordering exactly the calculated number with no safety margin, then discovering a damaged roll in the delivery",
      ]},

      { type: "h2", text: "What to do with leftover rolls" },
      { type: "p", text: "Store any unused rolls flat, in the original packaging, away from light and moisture. Label them with the dye lot number and the room they came from. A leftover roll is your best insurance policy against accidental damage: a scuff, a water mark, or a failed attempt at moving a radiator pipe." },
      { type: "p", text: "Most retailers accept returns of unopened, undamaged rolls within their returns window — often 30–60 days. If you're genuinely unsure between quantities, order the higher number and return what you don't open." },

      { type: "h2", text: "Quick reference checklist" },
      { type: "list", items: [
        "Measure total perimeter of all walls to be papered (add widths together)",
        "Note ceiling height and pattern repeat from the product spec",
        "Cut length per drop = ceiling height + pattern repeat",
        "Drops per roll = roll length ÷ cut length (round DOWN)",
        "Total drops needed = perimeter ÷ roll width (usually 0.52m)",
        "Total rolls = total drops ÷ drops per roll",
        "Subtract: 1 roll per door, 0.5 rolls per standard window",
        "Add 10% (plain) or 15% (large repeat) safety margin",
        "Round up to the nearest whole roll — always",
        "Check all rolls are from the same dye lot before opening any",
      ]},

      { type: "h2", text: "Frequently asked questions" },
      { type: "faq", items: [
        { q: "How many rolls of wallpaper do I need for a bedroom?", a: "A standard double bedroom (approximately 3.6m × 4.2m walls, 2.4m ceiling height) typically requires 10–12 rolls of standard UK wallpaper (52cm wide × 10m long) with no pattern repeat, or 13–15 rolls with a large pattern repeat (64cm+). Always add at least one extra roll. Use our free calculator above for an exact figure based on your specific measurements." },
        { q: "How many rolls do I need for a living room?", a: "A typical living room (4.5m × 5.5m walls, 2.4m ceiling) needs 14–17 rolls with no pattern repeat, or 18–22 rolls with a large repeat. Deduct approximately one roll per door and half a roll per standard window. Living rooms often have chimney breasts — measure the face of the breast and its flanking alcoves separately and add the widths together." },
        { q: "How many rolls for a hallway?", a: "A narrow hallway (1.2m wide, 6m run, 2.4m ceiling) typically needs 6–8 rolls with no pattern repeat, or 8–10 rolls with a large repeat. Hallways benefit from papers with strong vertical movement — stripes or tall botanicals — which minimise the visual waste of a narrow space." },
        { q: "What size is a standard wallpaper roll in the UK?", a: "Standard UK and European wallpaper rolls are 52–53cm wide and 10 metres long, giving approximately 5.2m² of paper per roll (slightly less after accounting for trimming and pattern repeat waste). Some luxury papers come in 5m rolls — always check the product specification before calculating." },
        { q: "What is pattern repeat in wallpaper?", a: "Pattern repeat is the vertical distance before a wallpaper's design starts again. A plain or textured paper has a repeat of zero — no alignment is needed and waste is minimal. A large botanical mural might have a repeat of 64cm, meaning up to 64cm of each strip is trimmed to align the pattern at every seam. The larger the repeat, the more rolls you need." },
        { q: "How many rolls do I need for an accent wall?", a: "For a single accent wall approximately 3.6–4.2m wide with 2.4m ceiling height, expect 3–4 rolls with no pattern repeat, or 5–6 rolls with a large repeat. Always add one extra roll as a safety margin." },
        { q: "Should I order extra rolls?", a: "Yes — always order at least one extra roll beyond your calculation, and ideally 10–15% more. Wallpaper is printed in batches; rolls from a different batch (different dye lot) ordered weeks later may have subtle colour variations that are invisible on screen but visible on your wall. Most retailers accept returns of unopened rolls, so the financial risk of one extra roll is minimal." },
        { q: "What do I do if I need more rolls after installation?", a: "Contact the retailer immediately and quote the dye lot number from the labels of your original rolls. Ask them to match it exactly. If the same dye lot is unavailable, you may need to consider whether a full replacement of one wall is feasible — or use any leftover rolls you stored for this purpose. This is why the one-extra-roll rule matters so much." },
        { q: "How do I measure a room with a chimney breast?", a: "Treat the chimney breast as three separate flat surfaces: the front face, and the two return walls on either side. Measure the width of each surface and add them to your total perimeter. The return walls are often narrow enough that you can use off-cuts from the main drops, so factor that into your calculation." },
      ]},
    ],
  },
  {
    slug: "interview-rebel-walls",
    category: "Interview",
    title: "Inside Rebel Walls: the Swedish studio redefining the mural",
    excerpt: "We sat down with Rebel Walls' creative director to talk about their process, their love of imperfect nature, and what's coming in 2027.",
    author: "James Whitfield",
    authorBio: "James is Murall's product editor and a qualified interior architect. He has overseen wallpaper specifications on residential and hospitality projects across Europe.",
    date: "2 May 2026",
    readTime: "8 min read",
    imageUrl: IMAGES.verdant,
    relatedSlugs: ["botanical-wallpaper-trend-2026", "peel-and-stick-vs-paste-the-wall", "accent-wall-ideas"],
    body: [
      { type: "p", text: "Rebel Walls began in a small studio outside Stockholm in 2007 with a simple idea: that photographic-quality murals should be accessible to anyone decorating their home, not just clients with luxury budgets. Nineteen years later, they're one of the most recognised names in the global wallpaper industry, stocked by retailers in over 40 countries and specified regularly on high-end residential and hospitality projects." },
      { type: "p", text: "We spoke with Creative Director Anna Lindqvist about process, philosophy, and what comes next." },
      { type: "h2", text: "The interview" },
      { type: "h3", text: "Murall: The studio started with a focus on photographic murals. How has that evolved?" },
      { type: "p", text: "Anna Lindqvist: We started with photography because that's what the founders had access to — a library of beautiful nature images and a vision for how they could look on a wall. But very quickly we moved toward illustration and original artwork, because we realised that the best murals don't try to recreate a photograph. They create a feeling. They're somewhere between reality and imagination." },
      { type: "p", text: "Today, probably 60% of our catalogue is original illustration. We work with artists from all over the world — Sweden obviously, but also Japan, Brazil, the UK, Australia. The brief is always the same: give us something that rewards a second look. Something with depth." },
      { type: "h3", text: "Murall: The Verdant Canopy series has been extraordinary — it's our bestselling design by a considerable margin. What was the thinking behind it?" },
      { type: "p", text: "Anna Lindqvist: Verdant Canopy came from a brief we gave to one of our Swedish illustrators: paint a forest from inside it. Not from outside looking in — from within the canopy, looking up and around. The original artwork took about eight weeks. We printed it, lived with it, changed the palette three times. The version you see today is the fourth iteration." },
      { type: "p", text: "What makes it work, I think, is that it's not photorealistic. It has brushstroke quality — you can feel the hand of the artist. And the colours are heightened just slightly beyond what you'd see in nature. The greens are a little richer, the light is a little warmer. It's nature as it exists in memory, not on a screen." },
      { type: "quote", text: "The best murals don't try to recreate a photograph. They create a feeling — somewhere between reality and imagination.", attribution: "Anna Lindqvist, Creative Director, Rebel Walls" },
      { type: "h3", text: "Murall: How do you approach sustainability? It's something customers ask about increasingly." },
      { type: "p", text: "Anna Lindqvist: It's been central since day one, actually. All our papers are printed on FSC-certified non-woven substrate using water-based inks. We print to order — every roll we produce has already been sold, so we have virtually zero inventory waste. Our Stockholm facility runs on 100% renewable energy." },
      { type: "p", text: "We're currently working toward full B Corp certification, which we expect to complete by the end of 2026. It's a rigorous process, but it forces you to audit everything — supply chain, packaging, employee welfare — and that's been genuinely valuable even beyond the certification itself." },
      { type: "h3", text: "Murall: What's coming in 2027?" },
      { type: "p", text: "Anna Lindqvist: I can't give you specific designs, but I can tell you the direction. We've been obsessed lately with the space between macro and micro — things that read as one thing from across the room and something completely different up close. Patterns within patterns. Textures that reward proximity." },
      { type: "p", text: "We're also exploring a collaboration with a ceramicist whose work we've admired for years. The idea is to translate surface qualities — the matte depth of a particular glaze, the micro-texture of raw clay — into a wallpaper substrate. It sounds conceptual, but the early samples are extraordinary." },
      { type: "h3", text: "Murall: Final question — what's the one thing you'd tell someone who's nervous about choosing a mural?" },
      { type: "p", text: "Anna Lindqvist: Order a sample. Always, always order a sample. The difference between seeing a design on a screen and seeing it on your actual wall, in your actual light, next to your actual furniture — it changes everything. We've had customers who fell in love with a design online and then fell out of love with it on a sample. And customers who were unconvinced online and fell completely in love with the physical sample. The screen doesn't tell the truth. The paper does." },
    ],
  },
  {
    slug: "best-peel-and-stick-wallpaper",
    category: "Guide",
    title: "Best Peel & Stick Wallpaper 2026: The Definitive Brand Guide",
    excerpt: "We've assessed every major removable wallpaper brand — adhesive quality, print fidelity, wall compatibility, and how cleanly they remove. Here's who actually delivers.",
    author: "James Whitfield",
    authorBio: "James is Murall's product editor and a qualified interior architect. He has overseen wallpaper specifications on residential and hospitality projects across Europe.",
    date: "25 September 2026",
    readTime: "9 min read",
    imageUrl: IMAGES.hex,
    relatedSlugs: ["peel-and-stick-vs-paste-the-wall", "how-many-rolls-do-i-need", "accent-wall-ideas"],
    body: [
      { type: "p", text: "Peel-and-stick wallpaper has had a transformation. What began as a compromise product for renters — thin, plasticky, prone to bubbling at the seams — has become a genuinely premium category. The best brands today use non-toxic pressure-sensitive adhesives, print on high-quality woven substrates, and adhere so cleanly that professional decorators are now specifying them on permanent installations." },
      { type: "p", text: "But the category has exploded with entrants, and quality varies wildly. We assessed papers from six major brands, looking at adhesive performance, print resolution, repositionability, and how cleanly they remove from painted walls. Here is what we found." },

      { type: "h2", text: "At a glance: the best brands in 2026" },
      { type: "table", head: ["Brand", "Price range", "Panel width", "Repositionable?", "Best for"], rows: [
        ["Chasing Paper", "$64–$115 / roll", "24 inches", "Yes — 7 days", "Bold designs, feature walls"],
        ["Tempaper", "$62–$98 / roll", "20.5 inches", "Yes — up to 5 years", "Botanicals, maximalist"],
        ["Hygge & West", "$98–$145 / roll", "24 inches", "Yes", "Design-led, artisan"],
        ["NuWallpaper", "$28–$48 / roll", "20.5 inches", "Limited", "Budget, first-time DIY"],
        ["Rebel Walls", "Mural pricing", "Custom", "Yes", "Full-wall photographic murals"],
      ]},

      { type: "h2", text: "Our detailed verdicts" },

      { type: "h3", text: "Chasing Paper — Best overall" },
      { type: "p", text: "Founded in New York in 2013 by two friends who were tired of renting with plain walls, Chasing Paper has become the benchmark against which every other removable wallpaper brand is measured. Their panels ship pre-cut at 24 inches wide with precision-aligned pattern edges — no trimming at seams, no guesswork. The non-toxic, solvent-free adhesive bonds firmly within 24 hours but remains fully repositionable for seven days after application, which is genuinely useful for a solo installation where you're eyeing the hang from across the room." },
      { type: "p", text: "Print quality is exceptional. Their botanical and geometric designs are produced at a resolution that holds up to close inspection — no visible dot patterns or banding. The substrate is a woven non-woven material that hangs flat without bubbling, even in rooms with minor humidity. A standard bedroom takes four to six hours to hang solo." },
      { type: "tip", text: "Chasing Paper sells sample panels for around $4 each. Always order one before committing to a room — the colours read differently on a wall than on a screen." },

      { type: "h3", text: "Tempaper — Best for botanical designs" },
      { type: "p", text: "Tempaper invented removable wallpaper. Founded in 2008, they hold the original patents on the peel-and-stick format and have spent fifteen years refining the adhesive chemistry. The result is a brand with the deepest trust credentials in the category: clean removal is guaranteed on walls painted more than 30 days ago, and their Tempaper Pure range is fully vinyl-free and VOC-free." },
      { type: "p", text: "Their pattern library is the widest of any removable brand — thousands of designs, updated quarterly. They are particularly strong on botanicals: intricate herbarium prints, lush tropical canopies, delicate climbing vines in colourways that read as rich and complex up close. The 20.5-inch panel width means more seams in a wide room, but the precision of the pattern matching makes joins nearly invisible." },
      { type: "tip", text: "Tempaper's 'Designer' collection features exclusive artist collaborations at a small premium over the standard range. Worth the upgrade for rooms you'll live with for years." },

      { type: "h3", text: "Hygge & West — Best premium option" },
      { type: "p", text: "San Francisco studio Hygge & West operates as a design publisher as much as a wallpaper brand — every design is an exclusive collaboration with an independent artist. You will not find these patterns anywhere else, and many sell out permanently when a collaboration ends. The print quality reflects the premium: water-based inks on a woven non-woven substrate, printed to order." },
      { type: "p", text: "The price premium over Chasing Paper and Tempaper is real — typically 30–50% higher per panel. It is justified by the design exclusivity and the quality of the substrate, which has a slight texture that reads as more premium in person than the photographs suggest. For a powder room, a home office, or any room where you want a genuinely distinctive result, Hygge & West is the right choice." },

      { type: "h3", text: "NuWallpaper — Best budget option" },
      { type: "p", text: "Owned by York Wallcoverings — one of the oldest wallpaper manufacturers in the United States — NuWallpaper gives the brand's century of pattern experience at a fraction of the typical price. A standard bedroom can be wallpapered for under £150 at their entry-level prices. The trade-off is visible: panels feel thinner, the print resolution is lower, and the adhesive has a shorter repositioning window." },
      { type: "p", text: "Their strongest categories are faux textures (shiplap, brick, concrete) and simple geometrics — designs that are less demanding of print precision. For a rental bedroom, a child's room, or any space where budget genuinely matters more than longevity, NuWallpaper is the sensible choice." },

      { type: "h3", text: "Rebel Walls — Best for full-wall murals" },
      { type: "p", text: "The Swedish studio is best known for its photographic-quality murals, and their removable option — available on most designs as a drop-down selection on the product page — extends that capability to renters and commitment-phobes. The mural is printed to your exact wall dimensions and ships as a numbered set of panels that assemble into a seamless image." },
      { type: "p", text: "Pricing is per-mural rather than per-roll, which makes it difficult to compare directly against panel-format brands. A typical bedroom feature wall runs to £200–£400 depending on size and design. The quality justifies it: Rebel Walls murals look as good in person as they do in their beautifully photographed marketing images." },

      { type: "cta", heading: "Shop removable wallpaper", body: "Browse our curated edit of peel-and-stick papers across all price points — from budget-friendly to premium designer.", buttonText: "View peel & stick collection →", href: "/products?install=Peel+%26+Stick" },

      { type: "h2", text: "What to look for when buying" },
      { type: "h3", text: "Substrate: vinyl vs woven non-woven" },
      { type: "p", text: "The substrate is the material the paper is printed on. Cheaper panels use a vinyl (PVC) backing: smooth, slightly plasticky, and not breathable. Premium brands use woven non-woven — a fibre-based material that feels more like traditional wallpaper, breathes better, and tends to lie flatter over time. If you're sensitive to indoor air quality, look for vinyl-free options (Tempaper Pure is the clearest leader here)." },
      { type: "h3", text: "Adhesive: repositionable vs permanent" },
      { type: "p", text: "Most removable wallpaper uses a pressure-sensitive adhesive: it sticks on contact, but can be peeled and repositioned for a short window. The repositioning window varies by brand — seven days for Chasing Paper, up to five years for Tempaper. Beyond the stated window, the adhesive cures more fully and removal can lift paint. Permanent peel-and-stick adhesive (used by some budget brands) should not be applied to rented walls." },
      { type: "h3", text: "Panel width: seam count matters" },
      { type: "p", text: "Standard panels range from 20.5 to 24 inches wide. Narrower panels mean more seams in a given wall width. Seams are minimally visible when the paper is freshly hung, but may become more noticeable over time as the adhesive settles. For pattern-heavy papers, more seams also means more alignment joins to manage. Wider panels are easier to align but harder to handle solo." },
      { type: "h3", text: "Wall compatibility" },
      { type: "p", text: "Peel-and-stick performs best on smooth, flat, hard surfaces: painted plaster, MDF, and glass. Textured surfaces — Artex, orange-peel, knockdown — prevent the adhesive from bonding evenly, causing lifting and bubbling. High-gloss paint is also problematic: the adhesive slides rather than grips. Flat or eggshell paint is ideal." },

      { type: "h2", text: "Wall prep: the step most people skip" },
      { type: "p", text: "Poor wall preparation is the cause of almost every peel-and-stick failure. Follow this sequence regardless of which brand you choose." },
      { type: "numbered", items: [
        "Wipe walls thoroughly with a damp cloth to remove dust, grease, and residue. Allow to dry completely — at least 2 hours.",
        "If the wall was recently painted, wait a minimum of 30 days before applying. Fresh paint continues to off-gas and the adhesive will not bond correctly.",
        "Fill any holes, cracks, or dents with filler. Sand smooth and wipe clean when dry.",
        "For textured walls, apply a skim coat of filler or a dedicated peel-and-stick primer before hanging. Do not apply directly to Artex.",
        "Remove any switch plates or socket covers — tuck the paper behind the fitting rather than cutting around it for a clean result.",
      ]},

      { type: "h2", text: "Seven installation tips from experience" },
      { type: "numbered", items: [
        "Mark a plumb vertical line on the wall before you start. Use a spirit level, not the corner of the room — corners are rarely truly vertical.",
        "Cut all panels to length before peeling any backing. Lay them out in order so pattern alignment is confirmed before you commit.",
        "Peel only 6–8 inches of backing at a time. Exposing the full panel creates an unmanageable sticky surface that will fold on itself.",
        "Press firmly from the centre outward to push air toward the edges. Never smooth from one edge to the other — you trap air in the middle.",
        "Use a plastic smoothing tool or a clean credit card, not your hands. Fingernails create permanent dents in the adhesive surface.",
        "Trim at skirting board and ceiling with a sharp craft knife against a metal rule. Scissors produce a ragged edge that becomes visible over time.",
        "Stand back to check alignment after every 2–3 panels. It is far easier to reposition now than after the adhesive has cured.",
      ]},

      { type: "h2", text: "Frequently asked questions" },
      { type: "faq", items: [
        { q: "Does peel and stick wallpaper damage walls?", a: "Not if applied correctly. On smooth walls with well-cured paint (30+ days old), premium brands remove cleanly without lifting paint. Older latex paints and low-adhesion surfaces are higher risk — always test a small patch in an inconspicuous area before hanging a full room." },
        { q: "How long does peel and stick wallpaper last?", a: "Premium brands (Chasing Paper, Tempaper, Hygge & West) reliably last 5–10 years in normal living conditions. Budget brands may begin lifting at seams after 2–3 years, particularly in kitchens and bathrooms with fluctuating humidity." },
        { q: "Can you use peel and stick wallpaper on textured walls?", a: "Not directly. Textured surfaces prevent the adhesive from bonding evenly, which causes lifting and bubbling within weeks. Apply a skim coat of filler to create a smooth surface, allow to dry and sand smooth, then hang the paper once the skim coat has fully cured (at least 7 days)." },
        { q: "Is peel and stick wallpaper good for bathrooms?", a: "Yes, in well-ventilated bathrooms. Prolonged high humidity (such as a poorly ventilated shower room) can weaken the adhesive bond over time. Ensure adequate ventilation, avoid placing panels directly behind a bath or shower where they will be regularly splashed, and choose a brand with moisture-resistant credentials." },
        { q: "Can you reuse peel and stick wallpaper after removing it?", a: "Generally no. Removing a panel transfers most of the adhesive to the wall or degrades it, and the panels are prone to tearing during removal. Plan to replace rather than reuse. Some panels survive being relocated a short distance if repositioned immediately after installation, but storage and reapplication weeks later is not reliable." },
        { q: "How do you remove peel and stick wallpaper?", a: "Start at a corner and pull slowly at a 45-degree angle, close to the wall. Pulling fast or at a steep angle is the most common cause of paint damage. If adhesive is stubborn, apply gentle heat from a hairdryer on a low setting to soften it. Any residual adhesive on the wall can be removed with a damp sponge or a small amount of adhesive remover." },
        { q: "Is peel and stick wallpaper suitable for renters?", a: "Yes — it's specifically designed for this use case. Most tenancy agreements permit peel-and-stick on smooth walls since it leaves no damage. Check your specific agreement, but the vast majority of landlords have no objection. Paste-the-wall paper should never be used in a rented property without landlord permission." },
        { q: "Can I apply peel and stick wallpaper over existing wallpaper?", a: "No. Applying peel-and-stick to an existing wallpaper surface creates an unstable bond — the adhesive will grip the old paper rather than the wall, and when removed may take the original paper with it. Strip any existing wallpaper, fill and prepare the bare wall, then apply." },
      ]},
    ],
  },
  {
    slug: "living-room-wallpaper-ideas",
    category: "Inspiration",
    title: "Living Room Wallpaper Ideas: 12 Looks That Interior Designers Actually Recommend",
    excerpt: "The living room is the hardest room to get right — and the one where wallpaper makes the most dramatic difference. Here are 12 ideas worth stealing, from dark feature walls to full-room botanical immersion.",
    author: "Sofia Laurent",
    authorBio: "Sofia is a Paris-based interiors writer and contributing editor at Murall Journal. She covers trend, design culture, and the spaces that shape us.",
    date: "18 September 2026",
    readTime: "8 min read",
    imageUrl: IMAGES.verdant,
    relatedSlugs: ["how-to-choose-wallpaper-for-small-rooms", "accent-wall-ideas", "botanical-wallpaper-trend-2026"],
    body: [
      { type: "p", text: "The living room is the room that does the most work. It receives guests, absorbs daily life, and is typically the space you look at most — including from the sofa, which means you're looking at the walls for extended periods in a way you rarely are in a kitchen or hallway. Getting the wallpaper right here matters more than anywhere else in the house." },
      { type: "p", text: "The good news: the living room is also the most forgiving room to experiment in. The scale forgives bold choices. The furniture provides enough visual ballast that even a dramatic paper lands rather than overwhelms. Here are twelve ideas that consistently deliver." },

      { type: "h2", text: "Before you shop: three questions to answer first" },
      { type: "p", text: "Choosing a living room wallpaper before answering these will lead you to the wrong paper, regardless of how beautiful it looks on screen." },
      { type: "numbered", items: [
        "One wall or four? A single feature wall (almost always the wall behind the sofa) is lower commitment and works with any pattern. Four walls demands a quieter design — something tonal, textural, or with enough breathing room that it reads as an environment rather than a busy repeat.",
        "How much natural light does the room get? South- and west-facing rooms can carry dark papers comfortably. North-facing rooms benefit from warm undertones in any colour, including dark ones — avoid anything with a cool or blue-grey cast.",
        "Peel-and-stick or paste? If you rent, or if you're not ready to commit, today's premium removable papers are genuinely indistinguishable from traditional paste papers at normal viewing distances.",
      ]},
      { type: "tip", text: "Order a physical sample before committing. Screens show colours under lab-calibrated light; your living room doesn't. A paper that looks warm and rich on screen can read greenish or flat in a north-facing room. Most brands charge £3–8 for a sample — it's the single best investment in a wallpaper project." },

      { type: "h2", text: "12 living room wallpaper ideas" },

      { type: "h3", text: "1. The dark feature wall" },
      { type: "p", text: "The wall behind the sofa is the living room's natural feature wall: most visitors face it, it grounds the seating arrangement, and it's where a dramatic paper makes the strongest impression. Deep backgrounds — forest green, midnight navy, near-black charcoal — absorb light rather than reflect it, creating warmth and intimacy that pale walls simply cannot achieve." },
      { type: "p", text: "Choose a design with some complexity: a dark botanical, a dense geometric, or an abstract with tonal depth. A single colour flat-painted wall in a dark tone creates drama; a dark patterned wall creates drama with something to reward sustained attention." },

      { type: "h3", text: "2. All-four-walls botanical" },
      { type: "p", text: "The conventional approach is one wallpapered wall, three painted. The braver — and often better — result is four botanical walls. The key is choosing a design with enough tonal variation that it reads as an enveloping environment rather than a busy repeating pattern. Pale-background botanicals with open compositions work in almost any room. Dense, dark-background botanicals are best in rooms with good light or controlled artificial lighting." },
      { type: "p", text: "Done well, a full-room botanical hang transforms a living room into something that feels genuinely distinctive — a room that could not be anyone else's. Rebel Walls' Verdant Canopy is the benchmark for this effect: the scale is confident enough to hold four walls without feeling claustrophobic." },

      { type: "h3", text: "3. Geometric accent wall" },
      { type: "p", text: "A bold geometric — hexagons, large-scale diamonds, overlapping circles — on a single wall creates a graphic statement that anchors a room without overwhelming it. The best geometric papers have depth: metallic accents, subtle embossed texture, or a pattern that shifts in apparent tone depending on the viewing angle and light direction." },
      { type: "p", text: "Pair with solid-colour upholstery in one of the paper's secondary colours. Let the pattern have air around it — a geometric feature wall fighting with patterned cushions and a busy rug is the most common mistake in living room design." },

      { type: "h3", text: "4. Chinoiserie" },
      { type: "p", text: "Chinoiserie — the European interpretation of Chinese decorative arts, featuring pagodas, exotic birds, cherry blossoms, and fantastical landscapes — is one of the few wallpaper styles that is genuinely timeless. It appeared in English country houses in the 1750s and remains correct today. Living rooms with high ceilings and traditional architectural details are its natural home. In contemporary spaces, a single chinoiserie wall behind a low-profile modern sofa creates a dialogue between eras that is more interesting than either alone." },

      { type: "h3", text: "5. Textured grasscloth" },
      { type: "p", text: "Grasscloth is the wallpaper equivalent of a natural-fibre rug: tactile, warm, and so clearly a material that it makes everything around it look better. The texture reads differently in different light conditions — flat and muted in overcast daylight, warm and dimensional under evening lamps — which gives a room with grasscloth walls a quality that changes throughout the day." },
      { type: "p", text: "Use it as a neutral backdrop in a room full of collected objects, art, and layered textiles. It has the rare quality of receding completely when you're looking at everything else in the room, while adding unmistakeable warmth and sophistication to the overall effect." },

      { type: "h3", text: "6. Oversized vintage floral" },
      { type: "p", text: "Large-scale vintage florals — roses the size of fists, peonies trailing from floor to ceiling — are experiencing a sustained revival after years of minimal interiors. The key word is large-scale: small repeating florals create visual noise and make rooms feel busier; an oversized, confidently drawn floral gives the eye a clear subject and reads as almost maximalist-minimal." },
      { type: "p", text: "In living rooms, vintage florals work best on the chimney breast wall, framed by flat colour on either side. Choose a paper where the background tone relates to the room's existing colour — a warm cream background unifies; a stark white background isolates." },

      { type: "h3", text: "7. The panelling effect" },
      { type: "p", text: "Several brands now produce wallpaper that mimics decorative wall panelling — dado rails, raised rectangular panels, picture rails — without any joinery. Applied to all four walls, it creates a Georgian or Arts & Crafts atmosphere at a fraction of the cost of real woodwork. Applied below a picture rail, it gives a Victorian-style two-thirds panelled treatment with painted plaster above." },
      { type: "p", text: "Choose a colourway with enough contrast between the panel tone and the background for the illusion to read convincingly. Dark-on-dark (charcoal panel, near-black background) creates a dramatic library effect. Cream-on-white is quiet and architectural." },

      { type: "h3", text: "8. Full-wall tropical mural" },
      { type: "p", text: "A single full-wall tropical mural — a banana plantation, a magnolia garden, a bird-of-paradise thicket — turns the wall into a destination. The furniture becomes secondary; the mural is the event. Both Rebel Walls and Chasing Paper produce full-wall murals at genuinely impressive print quality, sized to your exact wall dimensions and arriving as numbered panels that assemble in sequence." },
      { type: "p", text: "The instinct is to worry that a mural will date quickly. In practice, the opposite tends to happen: a room built around a strong, singular graphic statement becomes more coherent over time than one assembled from multiple competing patterns." },

      { type: "h3", text: "9. Art Deco geometry" },
      { type: "p", text: "Art Deco wallpaper — fans, sunburst rays, stylised chevrons in gold, black, and deep jewel tones — pairs with the living room's other interwar classics: leather Chesterfields, lacquered side tables, aged brass hardware. The geometry tends to be more complex and layered than contemporary geometric designs, with multiple overlapping motifs and metallic accents that catch light from multiple directions." },
      { type: "p", text: "Treat the pattern as a backdrop rather than a feature: choose a lighter or more neutral tone on three walls and the stronger colourway on the chimney breast or feature wall behind the sofa." },

      { type: "h3", text: "10. Moody stripe" },
      { type: "p", text: "A vertical stripe in a deep colour — navy, bottle green, charcoal — is the most reliable trick for making a living room feel taller. The eye follows the stripe upward and the ceiling appears higher as a result. The depth of colour adds warmth without busy-ness." },
      { type: "p", text: "Use it on all four walls for a library or gentlemen's club atmosphere, or on the chimney breast alone as a more restrained application. Match the deepest stripe tone exactly to the skirting board colour — this grounds the stripe and makes the wall treatment feel complete rather than applied." },

      { type: "h3", text: "11. Abstract painterly" },
      { type: "p", text: "Loose watercolour washes, gestural brushstroke prints, and abstract botanical interpretations share one quality: they suggest art without being art. They give a room the feel of a gallery wall without requiring you to curate one. These papers tend to read as more relaxed than botanical or geometric alternatives, making them better suited to rooms you use constantly and informally than to formal entertaining spaces." },
      { type: "p", text: "Look for papers where the abstraction is genuinely loose — not a rigidly repeating pattern of brushstrokes, but something where the repeat is difficult to detect and the overall effect reads as organic and hand-made." },

      { type: "h3", text: "12. The committed peel-and-stick transformation" },
      { type: "p", text: "For renters, or anyone not ready to commit: a full-wall peel-and-stick installation behind the sofa is now a genuinely viable living room statement. The best brands (Chasing Paper, Tempaper, Hygge & West) produce designs that are indistinguishable from paste papers in photographs and at normal viewing distances — and they remove cleanly without paint damage when you move or change your mind." },
      { type: "p", text: "The inhibition most people have about peel-and-stick in a living room is aesthetic, not practical. Overcome it with a sample. Hang it against the wall and live with it for 48 hours. The decision usually makes itself." },

      { type: "cta", heading: "Shop living room wallpaper", body: "Browse our curated edit of living room wallpapers — from bold feature wall statements to subtle all-room textures.", buttonText: "Explore living room designs →", href: "/rooms/living-room" },

      { type: "h2", text: "How to choose the right wallpaper for your living room" },

      { type: "h3", text: "Scale: match the room, not the sample" },
      { type: "p", text: "Patterns always look larger on a sample than on a wall. A repeat that feels bold on a 30cm swatch can look appropriately scaled in a room with 2.7m ceilings. The reverse is also true: a design that looks subtle on a small sample can become overwhelming when multiplied across 16 square metres of wall. Order the largest sample you can get — A4 minimum, A3 preferred — and pin it to the actual wall before ordering." },

      { type: "h3", text: "Colour: read it in situ, not on screen" },
      { type: "p", text: "Monitor calibration, screen brightness, and ambient lighting all affect how a colour reads on screen. A deep forest green can appear almost black on one screen and vivid lime-adjacent on another. The only reliable way to choose a living room wallpaper colour is to view a physical sample on the actual wall at different times of day: morning light, afternoon light, and evening with your usual lamps on." },

      { type: "h3", text: "Commitment: honest assessment of how long you'll stay" },
      { type: "p", text: "Paste-the-wall paper on a prepared wall lasts 15–20 years and takes significant effort to remove. If you're likely to move within five years, peel-and-stick is often the more rational choice regardless of quality concerns — you're not paying a premium for longevity you won't use. If you're in a long-term home, paste gives a better substrate, longer adhesion, and access to heavier, more luxurious paper grades." },

      { type: "h3", text: "Coverage: feature wall or full room?" },
      { type: "p", text: "A living room feature wall typically uses 3–5 rolls and takes a half-day to hang. A full four-wall hang uses 14–17 rolls and is a full day's work for a professional decorator, or a weekend for an experienced DIY hanger. The cost difference is significant. The impact difference is even more significant — but in both directions. A wrong choice at full-room scale is a bigger problem than a wrong choice on a single wall." },

      { type: "h2", text: "Three things to avoid in living rooms" },
      { type: "numbered", items: [
        "Small-scale repeating patterns on light backgrounds across all four walls. They create visual noise rather than pattern — the eye cannot settle and the room feels restless. Save small repeats for one wall or for rooms with strong architectural detail that provides visual anchoring.",
        "Matching patterned wallpaper with patterned upholstery in the same colourway. The instinct is to coordinate; the result is usually competition. Let one dominate — either the wallpaper or the textiles — and let the other be a foil.",
        "A feature wall in an unexpected location. The wall behind the sofa and the chimney breast are the conventional choices for a reason: they are the natural focal points of the room. Wallpapering a side wall or the wall the sofa faces outward into will look considered only if everything else in the room is very deliberately arranged — which is rare in a working living room.",
      ]},

      { type: "h2", text: "Frequently asked questions" },
      { type: "faq", items: [
        { q: "What is the most popular wallpaper style for living rooms?", a: "Botanical designs consistently top living room wallpaper searches. Dark-background botanicals (forest green, midnight navy) are particularly strong for feature walls. Large-scale geometric patterns are a close second, especially in contemporary and newly-built spaces." },
        { q: "Should I wallpaper one wall or all four in a living room?", a: "Both work, for different reasons. One wall (typically behind the sofa) is lower commitment and works with bolder, busier patterns. Four walls works best with quieter designs — tonal botanicals, textured grasscloth, subtle geometrics — that read as an enveloping environment rather than a repeating pattern." },
        { q: "What colour wallpaper is best for a living room?", a: "Deep colours (forest green, midnight blue, charcoal) are the consistent choice of interior designers for living rooms. They create warmth and intimacy in the evening and age well. Lighter and warm neutral papers work well in rooms with limited natural light where you need to preserve brightness." },
        { q: "How much does it cost to wallpaper a living room?", a: "A full four-wall living room (4.5m × 5.5m, 2.4m ceiling) requires 14–17 rolls of standard UK wallpaper. At mid-range prices (£50–80 per roll), materials alone run to £700–£1,360. Professional hanging typically adds £200–400. A single feature wall cuts material costs by roughly 70%." },
        { q: "Does wallpaper make a living room look smaller?", a: "Not inherently. Small-scale repeating patterns on light backgrounds can actually make rooms feel larger by implying depth and texture. Dark papers in small living rooms, done well, create an intimate jewel-box effect rather than a confined feeling. The key variable is how confidently the choice is committed to." },
        { q: "What wallpaper works best in a north-facing living room?", a: "North-facing rooms receive cool indirect light that makes whites feel cold and blues feel grey. Warm colours — terracotta, amber, deep forest green, warm cream — compensate for the cool light quality. Darker papers often work better than expected in north-facing rooms because the contrast between wall and furnishings is less harsh under cool diffuse light." },
      ]},
    ],
  },
  {
    slug: "how-to-remove-wallpaper",
    category: "How-To",
    title: "How to Remove Wallpaper: The Complete Step-by-Step Guide",
    excerpt: "Wallpaper removal is the step most people rush and then regret. Done correctly, it leaves walls ready to paper or paint immediately. Done badly, it leaves torn plaster, paste residue, and a surface that causes every subsequent finish to fail. Here is how to do it correctly.",
    author: "James Whitfield",
    authorBio: "James is a former interior decorator turned writer, based in Edinburgh. He has hung wallpaper in over 200 homes and writes about craft, materials, and getting things right first time.",
    date: "2 October 2026",
    readTime: "9 min read",
    imageUrl: IMAGES.midnight,
    relatedSlugs: ["how-to-wallpaper-a-room", "how-many-rolls-do-i-need", "wallpaper-cost-guide"],
    body: [
      { type: "p", text: "Wallpaper removal has a reputation for being the worst part of any decorating project. The reputation is mostly earned by people who tried to do it fast. Done slowly and methodically, wallpaper strips cleanly and leaves a wall that is ready to decorate the same day. Done impatiently — dry scraping, inadequate soaking, pulling at angles that tear the plaster — it creates a wall that takes twice as long to prepare as a bare surface would have." },
      { type: "p", text: "The key insight is that you are not fighting the paper. You are dissolving the adhesive bond between the paper and the wall. Get the adhesive wet enough and the paper releases without effort. Every technique in this guide is in service of that single principle." },

      { type: "h2", text: "What you'll need" },
      { type: "list", items: [
        "Scoring tool (perforating roller or paper tiger — do not use a knife)",
        "Large bucket and sponge, or a garden pump sprayer",
        "Hot water — the hotter the better",
        "Fabric softener or washing-up liquid (a tablespoon per bucket improves penetration)",
        "Wide stripping knife (125–150mm) — wider is better for large flat sections",
        "Narrow stripping knife (50–75mm) — for corners, around switches, and detail work",
        "Steam stripper (hire if you do not own one — essential for multiple layers or embossed paper)",
        "Dustsheets to protect the floor",
        "Bucket and sponge for wash-down",
        "Sugar soap or diluted white vinegar for the final wash",
      ]},

      { type: "h2", text: "Before you start: two things to check" },

      { type: "h3", text: "Is it lining paper or finish paper?" },
      { type: "p", text: "Many walls have two layers: a lining paper underneath and a finish paper on top. The finish paper usually strips first, leaving the lining behind. You then have a choice: strip the lining too, or paper over it if it is in good condition. Lining paper that is firmly adhered, flat, and undamaged can be papered over directly — it provides an excellent substrate. Lining paper that is lifting, bubbling, or torn must come off completely." },
      { type: "p", text: "To check how many layers you have, lift a corner at a seam and peel slowly. If a thin decorative layer comes away leaving a white backing, you have a strippable paper and the backing can often be left as lining. If the whole thickness comes off in one, there is a single layer." },

      { type: "h3", text: "What is behind the paper?" },
      { type: "p", text: "The wall substrate determines how aggressive you can be. Solid plaster (the lime or gypsum plaster found in most pre-1980s houses) is forgiving — it can handle vigorous scraping and heavy soaking without damage. Plasterboard (the paper-faced gypsum board used in most modern builds and stud partitions) is not. Its paper facing tears if over-soaked or scraped too aggressively, and damaged plasterboard needs to be either skim-coated or replaced before the wall can be decorated cleanly." },
      { type: "tip", text: "If you are working on plasterboard, use significantly less water than you think you need — just enough to soften the adhesive, not enough to soak through the paper into the board behind. A spray bottle gives better control than a sponge for plasterboard." },

      { type: "h2", text: "Method 1: soaking and hand stripping" },
      { type: "p", text: "This is the right method for most domestic wallpaper removal: single or double layers on solid plaster, paste-the-wall papers, vinyl-coated papers, and most papers hung in the last 20 years." },

      { type: "h3", text: "Step 1: score the surface" },
      { type: "p", text: "Score the wallpaper surface with a perforating roller (also called a paper tiger). This creates hundreds of small perforations that allow water to penetrate through the paper to the adhesive layer beneath. Without scoring, water sits on the surface of most vinyl-coated papers and does not reach the paste." },
      { type: "p", text: "Use moderate pressure — enough to perforate without gouging the plaster. On plasterboard, use very light pressure and make only one or two passes. Do not score with a craft knife or anything with a sharp edge that cuts rather than perforates — this creates ridges in the plaster that are difficult to fill." },

      { type: "h3", text: "Step 2: soak thoroughly" },
      { type: "p", text: "Mix a bucket of the hottest tap water you can get with a tablespoon of fabric softener. Apply generously with a large sponge or a garden pump sprayer. Work in sections of approximately one square metre. The water needs time to penetrate — apply it and move to the next section while the first soaks. Come back to the first section only after it has had at least five minutes of dwell time." },
      { type: "p", text: "The paper is ready to strip when it looks darker and slightly translucent, when it feels soft rather than papery to the touch, and when a corner lifts easily without resistance. If it tears rather than peeling, it needs more water and more time. Apply a second coat and wait again." },

      { type: "h3", text: "Step 3: strip from the bottom up" },
      { type: "p", text: "Work from the bottom of each drop upward, sliding the stripping knife flat against the wall at a shallow angle (15–20 degrees) rather than digging in at a steep angle. A shallow angle lets the knife ride under the paper without gouging. A steep angle concentrates force on a small point and damages the surface." },
      { type: "p", text: "Strip in large sheets where possible. If the paper is tearing into small pieces, it is not wet enough. Stop, re-soak, and wait. The correct sound of stripping is a soft tearing away; the wrong sound is a dry, resistant ripping." },

      { type: "h3", text: "Step 4: wash down" },
      { type: "p", text: "Once all paper is off, wash the entire wall with warm water and a sponge to remove all paste residue. Paste left on the wall dries to a hard film that prevents new adhesive from bonding properly and causes new paper to lift at the seams within weeks. Change the water in the bucket frequently — dirty paste water spread back onto the wall is self-defeating." },
      { type: "p", text: "A final wash with diluted sugar soap (one part sugar soap to ten parts water) removes any grease or remaining residue and leaves the wall ready for sizing. Allow to dry completely — usually 12–24 hours — before continuing." },

      { type: "h2", text: "Method 2: steam stripping" },
      { type: "p", text: "A steam stripper is the right tool for: multiple layers of old paste paper, heavily embossed papers (where the texture prevents water penetration), papers hung directly onto bare plaster without sizing (old houses frequently have this), and any job where soaking is not shifting the paper after two attempts." },

      { type: "h3", text: "How to use a steam stripper" },
      { type: "p", text: "Hold the steam plate against the wall for 20–30 seconds until the section behind it softens — you will hear the paper begin to bubble slightly. Move the plate to the next section and immediately strip the section you just steamed with a wide stripping knife. The steam creates a brief window (approximately 30 seconds) where the adhesive is liquid and the paper strips almost effortlessly. Work in a rhythm: steam a section, move plate, strip the previous section." },
      { type: "p", text: "Do not hold the steamer on one spot for more than 45 seconds on solid plaster or more than 20 seconds on plasterboard. Steam drives moisture deep into the substrate and can cause plasterboard to swell, delaminate, or even mould if over-saturated." },

      { type: "h3", text: "Steam on plasterboard: proceed carefully" },
      { type: "p", text: "Many decorators avoid steam on plasterboard entirely and use soaking with a spray bottle instead. If you must steam plasterboard, use the shortest dwell time possible (15 seconds), move fast, and keep air moving in the room to allow the board to dry out after stripping. Check the board surface after stripping: if the paper facing of the board has lifted or become soft, you will need to apply a bonding primer before any further work." },

      { type: "h2", text: "Removing wallpaper from specific surfaces" },
      { type: "table",
        head: ["Surface", "Method", "Key caution"],
        rows: [
          ["Solid lime plaster (pre-1950)", "Soak and strip or steam", "Old lime plaster can crumble if saturated — soak moderately and work quickly"],
          ["Gypsum plaster (post-1950)", "Soak and strip or steam", "Most forgiving surface — handles full soaking well"],
          ["Plasterboard", "Light scoring, spray bottle, minimal soaking", "Over-wetting destroys the paper face of the board — use minimal water"],
          ["Previously painted walls (paper over paint)", "Score thoroughly, soak well", "Paint layer prevents water reaching paste — score more aggressively than usual"],
          ["Bare brick", "Soak and strip", "Grout lines hold paste — scrub residue with a stiff brush after stripping"],
        ]
      },

      { type: "h2", text: "Dealing with stubborn paste residue" },
      { type: "p", text: "Dried paste residue is the most common cause of new wallpaper failure. It looks invisible when dry but activates when new paste is applied, creating a soft, unstable layer under the new paper that causes it to lift at the seams." },
      { type: "p", text: "To detect residue: shine a raking light (a torch held at a very acute angle to the wall) across the surface. Residue catches the light and appears as a slightly shiny or uneven patch on an otherwise matt surface. Alternatively, run the back of your hand across the wall — residue feels slightly slippery compared to clean plaster." },
      { type: "p", text: "To remove it: rewet with warm water and a sponge, leave for two minutes, then scrub with a coarse sponge or a nail brush. Change the water frequently. Repeat until the wall feels uniformly dry and slightly rough — that is clean plaster. If residue is extensive or very old, a solution of warm water and white vinegar (equal parts) cuts through paste more effectively than water alone." },

      { type: "h2", text: "Preparing the wall after stripping" },
      { type: "p", text: "A stripped wall almost always needs some repair before it is ready for new decoration. What level of work is required depends on the condition of the surface." },
      { type: "numbered", items: [
        "Fill any holes, cracks, or damaged areas with a lightweight ready-mixed filler. Small holes need one application; deeper damage may need two, allowing each coat to dry fully.",
        "Sand the filled areas smooth with 120-grit sandpaper once fully dry. Feather the edges of any patch so it blends into the surrounding plaster without a visible ridge.",
        "Check the whole wall surface with a raking light and fill any further imperfections revealed. Wallpaper does not hide surface imperfections — it emphasises them under the right light.",
        "Apply a coat of size (diluted paste at half-strength) or specialist primer to the entire wall. This seals the plaster, prevents it from absorbing paste too quickly, and improves adhesion for the new paper.",
        "Allow size to dry completely (typically 2–4 hours) before hanging. The wall is ready when it is uniformly dry and very slightly tacky to the touch.",
      ]},

      { type: "cta", heading: "Ready to choose what comes next?", body: "Use our rolls calculator to work out exactly how much wallpaper you'll need for the freshly stripped room.", buttonText: "Open rolls calculator" },

      { type: "h2", text: "Common mistakes" },
      { type: "numbered", items: [
        "Dry scraping without soaking. This tears the plaster surface and creates ridges and craters that are difficult to fill perfectly. Always soak first.",
        "Not soaking long enough. The most common mistake. Paper that has not soaked sufficiently tears into small pieces rather than stripping in sheets. Each small piece takes three times as long to remove as a large sheet would. Apply water and wait.",
        "Using too much water on plasterboard. The opposite problem to under-soaking on solid plaster. Plasterboard cannot absorb the same water loading as solid plaster. Use a spray bottle and minimal dwell time.",
        "Holding the stripping knife at a steep angle. A steep angle digs into the plaster. A shallow angle (15–20 degrees) rides under the paper and does not damage the surface.",
        "Skipping the wash-down. Invisible paste residue on the wall causes new paper to lift at the seams within weeks. Always wash down after stripping, even if the wall looks clean.",
        "Papering the same day as stripping. The wall needs to be fully dry before new adhesive is applied. In a well-ventilated room, allow a minimum of 12 hours after the final wash-down. 24 hours is safer.",
        "Not checking for multiple layers before starting. Finding a second layer of paper midway through a job is demoralising and avoidable. Lift a corner at a seam before you begin.",
      ]},

      { type: "h2", text: "Frequently asked questions" },
      { type: "faq", items: [
        { q: "What is the easiest way to remove wallpaper?", a: "Score with a perforating roller, apply hot water with a tablespoon of fabric softener using a large sponge or pump sprayer, wait at least five minutes for the water to reach the paste, then strip from the bottom up with a wide stripping knife held at a shallow angle. Working in small, fully soaked sections is faster than trying to rush large areas." },
        { q: "Do I need a steam stripper to remove wallpaper?", a: "Not for most jobs. Soaking with hot water and fabric softener is sufficient for single or double layers of modern wallpaper on solid plaster. A steam stripper is worth hiring for: multiple layers of old paper, heavily embossed paper where soaking does not penetrate, and paper hung directly onto bare plaster without sizing." },
        { q: "How do I remove wallpaper without damaging the plaster?", a: "Use a perforating roller (not a knife) to score, apply water with a sponge rather than flooding the wall, and hold the stripping knife at a very shallow angle (15–20 degrees) when stripping. On plasterboard specifically, use minimal water and avoid steam — over-wetting plasterboard damages the paper face of the board." },
        { q: "How do I remove wallpaper from plasterboard?", a: "Score lightly with a perforating roller (one or two passes only), apply water sparingly with a spray bottle rather than a sponge, and wait 3–4 minutes before stripping. Use a wide knife at a very shallow angle. Avoid steam entirely on plasterboard. If the board's paper face lifts or tears, apply a bonding primer to the damaged area before any further decoration." },
        { q: "Can I wallpaper over existing wallpaper?", a: "No, as a general rule. Hanging over existing paper adds moisture to old adhesive, which can cause both layers to lift. The new paste also cannot bond evenly through an uneven surface. The only exception is a single layer of firmly adhered, perfectly flat lining paper — which can be papered over directly. Finish paper should always be stripped." },
        { q: "How long does it take to remove wallpaper from a room?", a: "A standard double bedroom (all four walls, single layer of modern paper, solid plaster) takes one person 3–5 hours to strip and wash down. A room with multiple layers, embossed paper, or plasterboard takes 6–8 hours. Stairwells are significantly longer due to access difficulty — a full stairwell is typically a full day's work." },
        { q: "What do I do with the walls after removing wallpaper?", a: "Fill any holes or cracks with ready-mixed filler, sand smooth, then apply a coat of size or primer to the whole wall. Allow to dry completely (minimum 12 hours, ideally 24) before hanging new paper. Check the entire surface under a raking light to catch any residue or imperfections before sizing — it is much harder to address these after the new paper is up." },
      ]},
    ],
  },
  {
    slug: "wallpaper-cost-guide",
    category: "Buying Guide",
    title: "How Much Does Wallpaper Cost? A Room-by-Room Price Guide for 2026",
    excerpt: "Most wallpaper cost guides online are useless — vague ranges that tell you nothing about what you will actually spend. This one breaks it down by room, by market tier, and by whether you are hanging it yourself or paying someone else.",
    author: "James Whitfield",
    authorBio: "James is a former interior decorator turned writer, based in Edinburgh. He has hung wallpaper in over 200 homes and writes about craft, materials, and getting things right first time.",
    date: "2 October 2026",
    readTime: "9 min read",
    imageUrl: IMAGES.emerald,
    relatedSlugs: ["how-many-rolls-do-i-need", "peel-and-stick-vs-paste-the-wall", "best-peel-and-stick-wallpaper"],
    body: [
      { type: "p", text: "The problem with most wallpaper cost estimates is that they are written to cover every possible scenario without committing to any. 'Wallpaper costs between £10 and £300 per roll' is technically accurate and practically useless. What you need to know is: what will a roll of paper that actually looks good cost, how many rolls will a specific room need, what will a decorator charge, and what are the costs that most people forget to budget for until they are already halfway through the job?" },
      { type: "p", text: "This guide answers all of those questions with specific numbers. All prices are 2026 UK market figures. They will not match every retailer — prices vary by collection, brand, and sale — but they reflect what you should expect to pay for paper at each quality tier." },

      { type: "h2", text: "Wallpaper price per roll: what each tier buys you" },
      { type: "table",
        head: ["Tier", "Price per roll", "What you get", "Best for"],
        rows: [
          ["Budget", "£8–£20", "Thin paper, limited colourways, short repeat, basic print fidelity", "Temporary use, rental properties, children's rooms you'll repaper soon"],
          ["Mid-range", "£20–£60", "Good print quality, wider design range, standard durability ratings, non-woven or vinyl-coated options", "Most rooms in most homes — the best value tier"],
          ["Premium", "£60–£120", "Superior print fidelity, richer colourways, heavier substrate, longer pattern repeats, designer ranges", "Feature walls, main living areas, rooms where the paper is the design statement"],
          ["Luxury", "£120–£300+", "Hand-printed or hand-finished, archival inks, unusual substrates (grasscloth, silk, cork), limited production", "Formal rooms, investment properties, buyers for whom material quality is the point"],
        ]
      },
      { type: "p", text: "The mid-range tier (£20–£60 per roll) is where most good residential wallpaper lives. Below it, the print quality and substrate weight begin to compromise the result. Above it, you are paying for craft and provenance as much as for visual quality — not always the right call for a trend-led design you might repaper in five years, but absolutely correct for a classic pattern in a room you intend to keep long-term." },

      { type: "h2", text: "Cost to wallpaper a room: full breakdown" },
      { type: "p", text: "The table below shows typical total material costs for papering standard-sized rooms in the UK. Figures assume a mid-range paper at £40 per roll and standard ceiling height (2.4m). Pattern repeat waste adds approximately 15–20% to roll count for designs with repeats over 32cm." },
      { type: "table",
        head: ["Room", "Rolls needed (plain)", "Rolls needed (large repeat)", "Mid-range cost", "Premium cost"],
        rows: [
          ["Cloakroom / WC (feature wall)", "1–2", "2–3", "£40–£80", "£80–£240"],
          ["Cloakroom / WC (all walls)", "3–5", "4–6", "£120–£200", "£240–£600"],
          ["Small bedroom (feature wall)", "3–4", "4–5", "£120–£160", "£240–£480"],
          ["Small bedroom (all walls)", "8–10", "10–13", "£320–£400", "£640–£1,200"],
          ["Double bedroom (feature wall)", "4–5", "5–6", "£160–£200", "£320–£600"],
          ["Double bedroom (all walls)", "10–12", "13–16", "£400–£480", "£800–£1,440"],
          ["Hallway (standard, no stairs)", "6–8", "8–10", "£240–£320", "£480–£960"],
          ["Hallway + stairwell", "12–16", "15–20", "£480–£640", "£960–£1,920"],
          ["Living room (feature wall)", "4–5", "5–7", "£160–£200", "£320–£600"],
          ["Living room (all walls)", "14–17", "18–22", "£560–£680", "£1,120–£2,040"],
        ]
      },
      { type: "tip", text: "Always order one roll more than your calculation requires. Wallpaper is produced in batches; a roll from a different batch ordered later may not match the colour exactly. The cost of one extra roll is trivial compared to the cost of a visible colour discrepancy mid-room." },

      { type: "h2", text: "Decorator costs: professional hanging" },
      { type: "p", text: "Professional wallpaper hanging is priced two ways: per roll hung, or as a day rate. Both approaches are common, and which is used typically depends on the decorator." },
      { type: "table",
        head: ["Pricing model", "Typical rate (2026 UK)", "Notes"],
        rows: [
          ["Per roll hung", "£15–£35 per roll", "More common for standard rooms; lower end for plain paper, higher for large repeats"],
          ["Day rate", "£150–£280 per day", "More common for complex jobs (stairwells, murals, difficult rooms)"],
          ["London premium", "+20–40% above national average", "Central London and premium boroughs command significantly higher rates"],
          ["Lining paper (additional)", "£8–£15 per roll hung", "If lining paper is required, this is typically priced separately"],
        ]
      },
      { type: "p", text: "To estimate professional hanging cost for a room: take your roll count, multiply by the per-roll rate, and add the cost of any preparatory work (stripping old paper, filling, lining). A standard double bedroom hang (12 rolls, mid-range decorator) typically costs £180–£420 in labour. A living room all-four-walls hang (16 rolls) runs to £240–£560 in labour." },
      { type: "p", text: "Stairwells are priced higher because of the difficulty: long drops, awkward access, and the time required. Expect to pay 30–50% more per roll than a standard room rate, and two decorators are sometimes required (one at the top of the scaffold, one managing the drop from below)." },

      { type: "h2", text: "The costs most people forget to budget for" },
      { type: "list", items: [
        "Paste — a standard tub of ready-mixed paste costs £8–£15 and covers approximately 10–12 rolls. For a full room, budget £15–£25 in paste.",
        "Primer / size — a litre of wallpaper size costs £5–£12. You will need at least one coat on all walls before hanging.",
        "Lining paper — if the walls are in poor condition or you are hanging a premium paper, lining is strongly advised. Budget £3–£6 per roll of lining paper, plus the hanging cost if using a decorator.",
        "Tools — a pasting table (£20–£40), smoothing brush or plastic smoother (£8–£15), seam roller (£5–£10), long scissors (£10–£20), and a sharp craft knife and spare blades (£10–£15). Total tool budget for a first hang: £50–£100. Tools last for many projects.",
        "Filler and sandpaper — even well-maintained walls typically need some filling before papering. Budget £10–£20 for filler, sandpaper, and a small scraper.",
        "Pattern repeat waste — if your paper has a large repeat (64cm or more), you may waste 20–25% of each roll in trimming. This is already accounted for in the 'large repeat' column above, but worth understanding: a paper that costs £40 per roll and has a 64cm repeat will effectively cost more per square metre covered than the label price suggests.",
        "Delivery — many wallpaper orders ship free above a threshold (typically 4–8 rolls), but sample orders and small quantities often incur delivery charges of £3–£8 per order.",
      ]},

      { type: "h2", text: "DIY vs professional: the real calculation" },
      { type: "p", text: "The decision to hang yourself or hire a decorator should be made on honest self-assessment, not just cost. The material savings from DIY are real — a room that costs £240 in labour becomes £0 — but only if the finished result is good. A poorly hung room (misaligned pattern, visible joins, paste on the woodwork) does not save money if it needs to be re-done." },
      { type: "p", text: "A useful framework: if you have not hung wallpaper before, practise on a small, forgiving room first — a cloakroom, a utility room, a room that will be repainted soon anyway. A plain paper with no pattern repeat, on a well-prepared wall, in a simple room with no awkward obstacles. The first room teaches you more than any guide can. The second room will be notably better." },
      { type: "p", text: "Where professional hanging is clearly worth the cost: stairwells (access and length of drop make this genuinely risky for first-timers), premium papers (the cost of damaging a £120-per-roll paper is significant), and rooms with complex obstacles (many doors, windows, radiators, or a chimney breast with multiple reveals)." },

      { type: "h2", text: "How to reduce costs without compromising the result" },
      { type: "numbered", items: [
        "Paper one wall, not four. A feature wall uses 3–5 rolls instead of 14–17. The visual impact relative to cost is dramatically better on a single wall — the paper reads as a statement rather than wallpaper.",
        "Choose mid-range paper for trend-led designs. If you are following a current trend that may shift in five years, there is no reason to spend £100 per roll on it. A mid-range paper at £35–45 per roll in the same design direction will look identical from normal viewing distances.",
        "Spend more on classic patterns. Chinoiserie, quality stripe, good botanical on a timeless background: these are the papers worth spending £80–120 per roll on, because they will still be correct in fifteen years.",
        "Buy samples before ordering. A sample costs £3–£8. Ordering four rolls of the wrong paper and needing to reorder costs £160–£480. The sample is the best-value purchase in any wallpaper project.",
        "Calculate carefully and order once. The extra delivery charge and the batch-matching risk of a second order both cost money. Use a calculator, add 10% waste, and order everything you need in a single purchase.",
        "Hire a decorator for the stairwell only. If you are competent at standard room hanging but nervous about the stairwell, there is no rule that says you must do the whole house yourself or none of it. Doing the main rooms yourself and paying a professional for the stairwell is a reasonable division.",
      ]},

      { type: "cta", heading: "Calculate before you order", body: "Get a precise roll count for your room — including pattern repeat waste — before placing your order. One calculation, one order, no batch-match risk.", buttonText: "Open rolls calculator" },

      { type: "h2", text: "Frequently asked questions" },
      { type: "faq", items: [
        { q: "How much does it cost to wallpaper a room in the UK?", a: "A standard double bedroom (all four walls, mid-range paper at £40/roll, professional hanging) typically costs £600–£960 total: £400–£480 in materials (12 rolls) plus £200–£480 in labour. DIY reduces the total to £400–£480 in materials plus £50–£80 in tools if it is your first hang. A living room runs to £800–£1,240 total with a professional, or £560–£680 in materials only for DIY." },
        { q: "Is wallpaper more expensive than paint?", a: "Yes, for materials. A litre of mid-range emulsion (£15–£25) covers approximately 12m², making a typical living room paint cost £60–£120 in materials. The equivalent mid-range wallpaper for the same room costs £560–£680 in materials. However, wallpaper lasts 15–20 years without repainting, adds texture and depth that paint cannot, and transforms a room in a way that paint rarely does." },
        { q: "How much does a decorator charge to hang wallpaper?", a: "UK national average is £15–£35 per roll hung, or £150–£280 per day rate. A standard bedroom hang (12 rolls) costs £180–£420 in labour. London and premium areas command 20–40% above the national average. Stairwells are priced higher — 30–50% more per roll than a standard room — due to the difficulty of access and long drops." },
        { q: "What is the cheapest way to wallpaper a room?", a: "Paper one feature wall rather than four walls — this reduces material costs by 70–75%. Choose a mid-range paper (£20–£40 per roll) on a plain or short-repeat design that minimises waste. Hang it yourself on a well-prepared wall. Total cost for a feature wall: £80–£200 in materials plus £50–£80 in tools for a first-time hanger." },
        { q: "Is expensive wallpaper worth it?", a: "For classic, long-term papers — chinoiserie, quality stripe, a botanical on a timeless palette — yes. Premium papers (£60–£120 per roll) have better substrate weight, richer colour fidelity, and longer pattern repeats that waste less per drop. They also tend to hang more forgivingly than budget papers. For a trend-led design you expect to change within five years, mid-range is the better value decision." },
        { q: "How do I avoid wasting wallpaper money?", a: "Order a sample before committing to a full order. Calculate your roll count accurately (use a calculator rather than estimating) and order everything in one purchase to avoid batch-matching issues. Add one roll of contingency to your order. Choose a paper that suits both the trend direction and the room's long-term character — the most expensive mistake is a paper that looks right for two years and wrong for the next ten." },
      ]},
    ],
  },
  {
    slug: "kitchen-wallpaper-ideas",
    category: "Inspiration",
    title: "Kitchen Wallpaper Ideas: What Works, What Doesn't, and 10 Looks Worth Trying",
    excerpt: "Kitchens present the same question as bathrooms: can wallpaper survive here? The answer depends on where in the kitchen and what type of paper. Here is how to get it right — and ten ideas that genuinely work.",
    author: "James Whitfield",
    authorBio: "James is a former interior decorator turned writer, based in Edinburgh. He has hung wallpaper in over 200 homes and writes about craft, materials, and getting things right first time.",
    date: "2 October 2026",
    readTime: "8 min read",
    imageUrl: IMAGES.hex,
    relatedSlugs: ["bathroom-wallpaper-ideas", "peel-and-stick-vs-paste-the-wall", "hallway-wallpaper-ideas"],
    body: [
      { type: "p", text: "The kitchen is the room people most often exclude from wallpaper plans without really thinking it through. The logic is: there is steam, there is grease, therefore wallpaper will not survive. This is partly true and mostly not. Whether wallpaper works in a kitchen depends almost entirely on two variables — where in the kitchen you are putting it and what type of paper you choose — neither of which points to blanket exclusion." },
      { type: "p", text: "A well-chosen, correctly hung kitchen wallpaper on the right wall will outlast most kitchen refits. The mistake is not choosing wallpaper for a kitchen; it is choosing the wrong paper type or the wrong wall position." },

      { type: "h2", text: "Where wallpaper works in a kitchen" },
      { type: "p", text: "Not every wall in a kitchen is equal. Think of the kitchen in three zones:" },
      { type: "list", items: [
        "The cooking wall — behind the hob and oven. High heat, grease vapour, and direct steam. No wallpaper of any type. This wall should be tiled, splashback glass, or a purpose-made panel.",
        "The preparation and appliance walls — adjacent to the cooking zone, near the kettle and toaster, above the worktop. Moderate grease and steam. Vinyl-coated or solid vinyl papers with a washable rating work here, but require more maintenance than in a low-risk position.",
        "The dining and display zone — the wall at the kitchen table, the wall facing the cooking area, a breakfast bar partition, or the wall at the far end of a kitchen-diner. Minimal direct steam or grease. This zone accepts most paper types that would work in a hallway or living room.",
      ]},
      { type: "p", text: "In most kitchen layouts, the best wallpaper wall is the one you look at when seated at the table or standing at the island — typically the wall opposite or perpendicular to the hob. This position is low risk and high impact." },
      { type: "tip", text: "In open-plan kitchen-diners, treat the dining area as a separate room for wallpaper purposes. The living-dining side of the space has no more moisture or grease exposure than a hallway, and can be papered with the same freedom." },

      { type: "h2", text: "10 kitchen wallpaper ideas" },

      { type: "h3", text: "1. Vintage botanical in a kitchen-diner" },
      { type: "p", text: "The wall at the dining end of a kitchen-diner is the most natural kitchen feature wall and one of the strongest positions for a botanical paper in any room. You look at it during every meal; it is far from the hob; and the contrast between the functional kitchen zone (usually cabinetry, tile, worktop) and a richly patterned dining wall gives the whole space a sense of deliberate design rather than accumulated functionality." },
      { type: "p", text: "A dark botanical — forest green, deep teal — works particularly well opposite a light-coloured kitchen. The visual weight of the paper anchors the dining end and makes the two zones feel like a composed whole rather than two rooms that happen to be adjacent." },

      { type: "h3", text: "2. Maximalist print in an open-plan kitchen" },
      { type: "p", text: "Large open-plan kitchen-living spaces often have one wall that is neither kitchen nor living room — an end wall, a chimney breast that runs through the space, a wall beside the staircase. This is the position for a bold, large-scale print that reads across the whole open floor plan. The scale of the space accommodates a more emphatic pattern than a closed room would, and a strong paper on one wall of a large open plan gives the space a centre of gravity it would otherwise lack." },

      { type: "h3", text: "3. Geometric above a breakfast bar" },
      { type: "p", text: "A breakfast bar or kitchen island typically creates a defined zone within the kitchen — half cooking, half dining. The wall behind the seating side of the bar is in the low-risk zone and sees constant use at close range. A bold geometric here — particularly one with a slightly three-dimensional quality, a metallic accent, or a tonal depth — creates the visual interest that makes a breakfast bar feel like a designed space rather than a practical addition." },

      { type: "h3", text: "4. Heritage tile print as a splashback alternative" },
      { type: "p", text: "Several manufacturers produce papers printed with heritage tile designs — Victorian encaustic patterns, Moroccan zellige, Art Deco geometric mosaics — at a fraction of the cost of real tile. Applied to the dining or display zone walls (not the wet splashback position), these papers create a period-appropriate or globally-inspired kitchen atmosphere. In a low-risk wall position with a vinyl-coated paper, this is a convincing and cost-effective alternative to an expensive tiled feature wall." },
      { type: "p", text: "Note: this approach works on the display walls only. The actual splashback behind the hob must remain tile, glass, or a purpose-made panel — no paper, however moisture-resistant, should be used directly behind a hob." },

      { type: "h3", text: "5. Panelling or tongue-and-groove effect below the dado" },
      { type: "p", text: "A wallpaper that simulates tongue-and-groove boarding or raised panel woodwork, applied below the dado rail in a kitchen, creates a country kitchen or farmhouse effect that is significantly cheaper and faster to install than actual joinery. Above the dado, either a complementary paper or a paint in a colour drawn from the paper below. The dado-height divide is also practically useful in kitchens: the painted wall above can be wiped down without concern; the paper below (which is in any case less exposed to cooking vapour) stays decorative." },

      { type: "h3", text: "6. Vertical stripe in a galley kitchen" },
      { type: "p", text: "A galley kitchen — narrow, with runs of units on both sides — is one of the most confined kitchen configurations. Vertical stripe wallpaper on the end wall (the wall you see at the end of the corridor) draws the eye toward it and makes the galley feel longer and taller simultaneously. A tone-on-tone stripe in a deep colour turns what is often a utilitarian space into something intentional. This is one of the few kitchen positions where all four surrounding surfaces are typically tile or cabinetry, making the one wallpapered end wall a genuine focal point." },

      { type: "h3", text: "7. Country floral in a traditional kitchen" },
      { type: "p", text: "A large-scale vintage floral — painted roses, cabbage blooms, rambling garden plants — on the dining wall of a traditional or shaker-style kitchen is a combination that has worked for a century and shows no signs of stopping. The informality of the floral suits the working character of a kitchen better than a more precise or graphic design. The best versions are loose and slightly faded in palette — the kind of paper that looks as if it has been there for twenty years and would be wrong to replace." },

      { type: "h3", text: "8. Toile de Jouy in a classic kitchen" },
      { type: "p", text: "Toile in a kitchen is a French country house tradition — particularly the red-on-cream colourway, which has appeared in every provincial kitchen from Lyon to Burgundy for two hundred years. It works because the pastoral narrative of toile (shepherds, harvest scenes, classical figures in landscape) references exactly the agrarian, food-producing world that a kitchen inhabits. Applied to the dining wall or as an all-four-walls treatment in a small kitchen-diner, it creates an atmosphere that is warm, specific, and entirely timeless." },

      { type: "h3", text: "9. Modern graphic in a handleless kitchen" },
      { type: "p", text: "A contemporary handleless kitchen — flat-front cabinetry, integrated appliances, stone worktop — is typically a precise, restrained space. A bold modern graphic on the dining wall (abstract, geometric, or a strong colour-field print) creates the contrast that gives the kitchen personality without disrupting the clean lines of the cabinetry. The kitchen provides the discipline; the paper provides the character. Neither element works as well without the other." },

      { type: "h3", text: "10. Peel-and-stick in a rental kitchen" },
      { type: "p", text: "Rental kitchens are typically among the bleakest rooms in any property — magnolia walls, white goods, institutional cabinetry. Premium peel-and-stick paper on the dining wall, or on the wall visible from the main living space, transforms this without any risk to the deposit. Choose a paper in the low-risk zone away from the hob, ensure the wall is clean and well-cured, and hang as you would in any other room. Removal is clean, and the next tenant will never know." },

      { type: "h2", text: "Paper types for kitchens" },
      { type: "table",
        head: ["Paper type", "Kitchen suitability", "Best position"],
        rows: [
          ["Standard paste paper (untreated)", "Low-risk zones only, good ventilation", "Dining wall in kitchen-diner, far from hob"],
          ["Vinyl-coated paste paper", "Low-risk and moderate zones", "Best all-round kitchen choice; wipeable"],
          ["Solid vinyl / commercial vinyl", "Moderate and high-risk zones", "Nearest wall to cooking area if required"],
          ["Paste-the-wall (non-woven)", "Low-risk zones", "Good dimensional stability; easier to hang around cabinets"],
          ["Peel-and-stick", "Low-risk zones, good ventilation", "Rental kitchens; dining wall in kitchen-diners"],
          ["Genuine grasscloth", "Not recommended", "Absorbs grease vapour; not washable"],
          ["Embossed / textured paper", "Low-risk zones only", "Grease accumulates in the texture — avoid near cooking"],
        ]
      },

      { type: "h2", text: "Preparing a kitchen for wallpaper" },
      { type: "numbered", items: [
        "Degrease before sizing. Kitchen walls accumulate a film of cooking grease that prevents adhesive from bonding properly. Wash the wall thoroughly with a sugar soap solution and allow to dry completely before applying size.",
        "Check ventilation. An extractor hood that vents to the outside (not recirculating) is the most important variable for kitchen wallpaper longevity. If your extractor only recirculates, grease vapour builds up on wall surfaces regardless of paper type.",
        "Apply a coat of size appropriate to the paper type. Non-woven papers benefit from a paste-the-wall size that slightly extends the open time — useful around kitchen cabinets where accurate positioning matters.",
        "Seal all edges carefully. Run a bead of clear silicone caulk where the paper meets worktop upstands, tile edges, or cabinet surrounds. This prevents moisture and grease from wicking behind the paper from the bottom edge.",
        "Use a fungicidal paste in the area nearest the sink and dishwasher. These appliances generate more moisture than the hob, and fungicidal paste prevents mould forming at the wall-paper junction over time.",
      ]},

      { type: "cta", heading: "How many rolls for a kitchen?", body: "Kitchens have more obstacles per square metre than any room — cabinets, doors, windows. Use our calculator for a precise roll count including waste.", buttonText: "Open rolls calculator" },

      { type: "h2", text: "Frequently asked questions" },
      { type: "faq", items: [
        { q: "Can you put wallpaper in a kitchen?", a: "Yes — in the low-risk zones of the kitchen (the dining wall, the wall opposite the hob, a kitchen-diner partition wall), any vinyl-coated paper performs well. The wall directly behind the hob must be tiled or purpose-panelled — no wallpaper belongs there. Ventilation is the key variable everywhere else." },
        { q: "What is the best wallpaper for a kitchen?", a: "Vinyl-coated paste-the-wall papers are the best all-round kitchen choice — they are wipeable to washable, have good dimensional stability in slightly humid conditions, and are available in the full range of current designs. For walls nearest cooking or steaming appliances, choose a paper with a Class 3 washability rating and hang it with a fungicidal paste." },
        { q: "Can you wallpaper behind a kitchen splashback?", a: "No. The splashback position — the wall directly behind the hob and immediately above the worktop — must be tiled, glass, or a purpose-made splashback panel. Water, heat, and grease in direct contact make this position unsuitable for any wallpaper. Tile-effect papers work well on adjacent lower-risk walls as a visual complement to a tiled splashback." },
        { q: "How do I stop kitchen wallpaper from peeling?", a: "The three most common causes of kitchen wallpaper failure: inadequate degreasing before hanging (prevents adhesive bonding), poor ventilation (moisture and grease vapour accumulate), and unsealed bottom edges (moisture wicks behind from the worktop upstand). Address all three at installation and kitchen wallpaper will last as long as in any other room." },
        { q: "Is peel-and-stick wallpaper suitable for a kitchen?", a: "Yes, in low-risk zones with good ventilation. Keep it away from the hob, kettle, and toaster, and avoid using it on the wall above the sink. On the dining wall of a kitchen-diner or on a low-exposure display wall, premium peel-and-stick performs reliably and is an excellent choice for rentals." },
        { q: "What wallpaper works best in a small galley kitchen?", a: "A vertical stripe on the end wall is the most effective option — it draws the eye toward the wall and makes the corridor feel longer and taller. In a very small galley, avoid busy repeating patterns on all four walls, which will make the space feel more confined. One strong end wall with plain tile or painted surfaces on the long sides reads better." },
      ]},
    ],
  },
  {
    slug: "wallpaper-trends-2026",
    category: "Trend",
    title: "Wallpaper Trends 2026: The 10 Directions Defining Interiors Right Now",
    excerpt: "From the sustained dominance of dark botanicals to the unexpected return of the dado rail, here is what is actually selling, what designers are specifying, and what is quietly fading out — based on what we are seeing across the market in 2026.",
    author: "Sofia Laurent",
    authorBio: "Sofia is a Paris-based interiors writer and contributing editor at Murall Journal. She covers trend, design culture, and the spaces that shape us.",
    date: "2 October 2026",
    readTime: "9 min read",
    imageUrl: IMAGES.verdant,
    relatedSlugs: ["botanical-wallpaper-trend-2026", "living-room-wallpaper-ideas", "bedroom-wallpaper-ideas"],
    body: [
      { type: "p", text: "Wallpaper trends move more slowly than fashion trends, and that is part of their appeal. A paper hung in 2023 does not need to be replaced in 2026. But understanding what is current matters for two reasons: it tells you which directions have market momentum — and therefore wider product ranges, more design variation, and better value — and it tells you which directions are fading, so you do not invest in something that will feel dated before the paste has fully cured." },
      { type: "p", text: "What follows is not a mood board exercise. It is a genuine read of where the market is in 2026, based on what is selling, what designers are specifying, and where the most interesting new work is appearing." },

      { type: "h2", text: "10 wallpaper trends defining 2026" },

      { type: "h3", text: "1. Dark botanicals — still the dominant force" },
      { type: "p", text: "Dark-background botanical wallpaper has been the defining residential wallpaper trend since 2022, and in 2026 it shows no sign of declining. If anything, the category is maturing: the designs are becoming more sophisticated, the colour palette is broadening beyond forest green into deep teal, charcoal-brown, plum, and warm near-black, and the botanical references are becoming more specific — named species, scientific illustration quality, herbarium-adjacent precision." },
      { type: "p", text: "The reason for the trend's longevity is structural: dark botanicals solve a problem that many homeowners have with contemporary interiors. They add warmth and intimacy to rooms that have been stripped of the textiles and object density of older decorating styles. They are complex enough to reward attention without requiring constant visual work. They age well. The trend will not die; it will evolve." },
      { type: "quote", text: "The dark botanical is no longer a trend — it has become a permanent category, like stripe or geometric. The question is no longer 'is this trend over?' but 'which botanical is right for this room?'", attribution: "Interior designer, London" },

      { type: "h3", text: "2. The maximalist chinoiserie revival" },
      { type: "p", text: "Chinoiserie — the European fantasia of Chinese decorative arts, with its pagodas, exotic birds, and flowering branches — has been in the background of interiors for 300 years. What is new in 2026 is the scale and the colourway: modern chinoiserie is going bigger, darker, and more graphic. The pale blue-on-cream of the traditional drawing room is giving way to deep jade-on-black, vermillion-on-navy, and gilt-on-charcoal. The design language is the same; the register is entirely different." },
      { type: "p", text: "This shift makes chinoiserie work in contemporary and even industrial spaces where the pale traditional version would look incongruous. It is appearing in dining rooms, bedroom head walls, and in cloakrooms and bathrooms as an all-walls statement." },

      { type: "h3", text: "3. The mural moment — full-wall narrative" },
      { type: "p", text: "The full-wall mural has moved from hospitality and retail into residential interiors in a way that feels genuinely permanent rather than transitional. The technical reasons are clear: digital printing quality has improved dramatically, custom sizing to the millimetre is standard, and the price gap between a premium patterned paper and a premium mural has narrowed to the point where the mural is no longer a luxury compromise." },
      { type: "p", text: "The design directions within murals are themselves trending in a specific way in 2026: away from literal landscape photography (which has dated quickly) and toward painterly, illustrative, and abstract compositions — murals that feel drawn or painted rather than photographed. Misty forests, tonal washes of colour suggesting landscape, loose botanical panoramas. The mural as art rather than document." },

      { type: "h3", text: "4. Natural textures — grasscloth, linen, sisal" },
      { type: "p", text: "The pendulum swing away from high-contrast printed pattern that characterised the 2015–2020 period has not resolved into minimalism — it has resolved into texture. Grasscloth, linen-textured vinyl, sisal-effect papers, cork-face papers: materials that give a wall depth and warmth without a visible design. These papers read as interior architecture rather than decoration, which is precisely why they suit the current moment: they let the furniture, lighting, and objects in a room do more work." },
      { type: "p", text: "The 2026 development is the colour range. Natural texture papers in white and off-white have been available for years. The current market expansion is in coloured grasscloth and linen papers — deep rust, sage, warm stone, dusty blue — that combine textural warmth with a colour statement." },

      { type: "h3", text: "5. Tonal geometrics — the high-contrast retreat" },
      { type: "p", text: "High-contrast geometric wallpaper — black-and-white hexagons, stark chevron, crisp monochrome diamonds — peaked in the mid-2010s and is now in visible decline. What has replaced it is not the absence of geometric but the tonal version: geometrics where the two colours are close values of the same family, creating pattern through texture and shadow rather than colour contrast. Charcoal on dark grey. Warm white on cream. Deep forest on olive." },
      { type: "p", text: "These papers work in precisely the contexts where high-contrast geometric struggled: living rooms, bedrooms, spaces where you spend extended time and need the wall to recede rather than advance. They are harder to photograph well, which is partly why they were slower to gain traction in the Instagram era — but they are among the best rooms to actually be in." },

      { type: "h3", text: "6. Deep forest green — the colour defining the decade" },
      { type: "p", text: "If you had to name one colour that defines 2020s interior design, it would be deep forest green. Not the bright kelly green of earlier decades, not the grey-green of the 2010s — but a saturated, dark, botanically-grounded green that relates to foliage in low light. It has appeared in paint, upholstery, cabinetry, and tile, but it is in wallpaper that it looks most natural: the complexity of a dark botanical in forest green is greater than any flat painted surface can achieve." },
      { type: "p", text: "The 2026 evolution of this colour direction is the introduction of foils and partners: deep teal (which reads as green in some lights, blue in others), warm near-black with green undertones, and botanical compositions that include multiple greens across the tonal range from near-white to near-black. The colour is not going anywhere — it is becoming more sophisticated." },

      { type: "h3", text: "7. Peel-and-stick goes premium — the quality gap closes" },
      { type: "p", text: "As recently as 2020, there was a visible quality gap between peel-and-stick and paste-the-wall wallpaper. The adhesive was less reliable, the print fidelity was lower, and the material felt plasticky at close range. In 2026, the gap has effectively closed at the premium end. The best peel-and-stick papers — from Chasing Paper, Tempaper, and Hygge & West — are now indistinguishable from paste papers in photographs and at normal viewing distances. Adhesion on properly prepared walls is reliable for 7–10 years." },
      { type: "p", text: "The consequence is a significant shift in who is buying wallpaper. The renter market, previously excluded from paste wallpaper by tenancy agreements, is now a full participant. Younger buyers who move frequently are choosing peel-and-stick not as a compromise but as the strategically correct choice for their situation. This is expanding the market for wallpaper overall rather than cannibalising paste paper sales." },

      { type: "h3", text: "8. The dado rail comeback — architectural wallpaper treatments" },
      { type: "p", text: "After two decades in which the prevailing instinct was to remove Victorian and Georgian architectural features and maximise plain painted wall area, there is a strong counter-movement in 2026. Dado rails, picture rails, and panel mouldings are being reinstated — or simulated in wallpaper — and the two-height treatment (different paper or colour above and below the dado) is appearing regularly in editorial and increasingly in residential projects." },
      { type: "p", text: "The wallpaper industry has responded with papers that simulate panelling, wainscoting, and dado treatments without any joinery. Applied below a picture rail, these papers create a period-appropriate architectural effect in an afternoon. The trend reflects a broader cultural revaluation of craft, detail, and the pre-modernist interior — a reaction to decades of the blank white wall as the default setting." },

      { type: "h3", text: "9. Abstract painterly — the hand-made mark" },
      { type: "p", text: "Across all applied design in 2026, there is a premium on visible human process: the brushstroke, the print registration imperfection, the deliberately uneven repeat. In wallpaper this manifests as abstract painterly designs — loose watercolour washes, gestural mark-making at scale, botanical interpretations that feel drawn rather than designed. The repeat is either very long (so it is not easily detected) or deliberately irregular (so the imperfection is the point)." },
      { type: "p", text: "These papers appeal to buyers who want warmth and individuality but are not ready for a bold botanical or a pattern with an identifiable motif. They are among the most successful papers in living rooms and bedrooms precisely because the abstraction is restful — the eye moves across the surface without resolution, which is relaxing rather than demanding." },

      { type: "h3", text: "10. Quiet luxury — texture without pattern" },
      { type: "p", text: "'Quiet luxury' as a cultural concept peaked in fashion around 2023 but its interior design expression is still gaining ground. In wallpaper terms it means: no visible pattern, no colour statement, maximum material quality. Papers that look, at a glance, like beautifully painted walls but on closer inspection reveal a woven linen texture, a subtle embossed geometric, a silk-effect sheen that shifts under different light sources. The sophistication is in the material rather than the design." },
      { type: "p", text: "These papers are predominantly used in dining rooms, primary bedrooms, and home offices — rooms where the occupant wants to signal quality without decoration. They are expensive relative to their apparent visual complexity, which is exactly the point. The price is the statement." },

      { type: "h2", text: "What is fading" },
      { type: "p", text: "Being clear about what is declining is as useful as knowing what is rising. Avoid investing in these directions in 2026 unless you have a specific reason:" },
      { type: "list", items: [
        "High-contrast black-and-white geometric: peaked mid-2010s, now strongly associated with that period. Tonal geometric has replaced it.",
        "Chevron and herringbone in primary colours: a sub-trend of the geometric peak, now dated quickly.",
        "Coastal/nautical motifs (anchors, ropes, crabs): had a moment in the early 2020s, now feels theme-park rather than designed.",
        "Scandi minimal (white wall, thin line illustration): exhausted by overuse. Still works in children's rooms but has lost its design currency in adult spaces.",
        "Grey as a neutral: the dominant interior colour of the 2010s. The market has moved to warm neutrals — off-whites with yellow or pink undertones, warm stone, cream. Papers with cool grey backgrounds now read as dated in the same way that brown and orange read as the 1970s.",
        "Photographic landscape wallpaper (literal photography of mountains, forests, cities): high-quality painterly murals have replaced this. The literal photograph now reads as lower-end despite the technology that produces it.",
      ]},

      { type: "h2", text: "Trend vs. timeless: how to choose" },
      { type: "p", text: "The question of whether to follow a trend depends on how long you expect to live with the decision. A trend at its peak — meaning it has high product availability, wide design variation, and is being specified at every market level from budget to luxury — is actually a reasonable choice for a long-term paper, because the trend's peak typically reflects a genuine design quality rather than a passing novelty. Dark botanicals peaked around 2023–24 and are still the right choice for thousands of rooms." },
      { type: "p", text: "The papers to avoid on longevity grounds are those tied to a specific cultural moment: a viral colour, a specific pattern tied to a passing aesthetic (mid-century pastiche, coastal kitsch), or a technical novelty that has become ubiquitous and therefore clichéd. These do not age gracefully." },
      { type: "p", text: "The safest long-term choices remain those that were correct before they were trends: grasscloth, tonal stripe, chinoiserie, quality botanical. These have been correct for decades because they reflect genuine design values — materiality, complexity, narrative — rather than cultural moment." },

      { type: "cta", heading: "Browse by trend", body: "Explore our curated edit of 2026's strongest wallpaper directions — from dark botanicals to quiet luxury textures.", buttonText: "Shop new arrivals →", href: "/products" },

      { type: "h2", text: "Frequently asked questions" },
      { type: "faq", items: [
        { q: "What is the biggest wallpaper trend in 2026?", a: "Dark botanical wallpaper remains the dominant residential trend in 2026 — deep-background designs in forest green, teal, and near-black with layered botanical illustrations. The trend has been in place since 2022 and is maturing rather than declining, with the colour palette broadening and the illustration quality increasing." },
        { q: "What wallpaper colours are popular in 2026?", a: "Deep forest green is the defining colour of the decade in interior design. In 2026 it is joined by deep teal, warm near-black with green or brown undertones, and coloured grasscloth papers in rust, sage, and warm stone. Cool greys, which dominated the 2010s, are in significant decline." },
        { q: "Is maximalist wallpaper still in fashion in 2026?", a: "Yes — but the register has shifted. The maximalism that is current in 2026 is more refined than the pattern-everywhere approach of earlier years. The emphasis is on a single strong paper (often a dark botanical or a full-wall mural) with restraint everywhere else: plain upholstery, simple flooring, minimal accessories. Maximalist wallpaper within a disciplined room." },
        { q: "Are geometric wallpapers out of fashion?", a: "High-contrast black-and-white geometric is in decline and now reads as the 2010s. Tonal geometric — pattern created through two close values of the same colour — is current and growing. The geometry is the same; the contrast is not." },
        { q: "Is peel-and-stick wallpaper on trend in 2026?", a: "The quality of peel-and-stick has reached the point where it is no longer a design compromise — premium brands are indistinguishable from paste papers at normal viewing distances. The design directions within peel-and-stick now mirror the broader market, including dark botanicals and abstract designs. It is trend-neutral as a format." },
        { q: "What wallpaper will look dated in a few years?", a: "Designs most likely to date quickly: high-contrast black-and-white geometric, coastal/nautical motifs, photographic landscape murals, and anything with a cool grey background. Safest long-term bets: grasscloth and natural textures, tonal stripe, botanical in a strong colourway, and quality mural designs with painterly rather than photographic execution." },
      ]},
    ],
  },
  {
    slug: "bathroom-wallpaper-ideas",
    category: "Inspiration",
    title: "Bathroom Wallpaper Ideas: Yes, You Can — Here's How to Do It Right",
    excerpt: "The biggest question about bathroom wallpaper isn't which design to choose — it's whether you can use wallpaper at all. The answer is yes, with conditions. Here's what works, what doesn't, and ten ideas worth stealing.",
    author: "James Whitfield",
    authorBio: "James is a former interior decorator turned writer, based in Edinburgh. He has hung wallpaper in over 200 homes and writes about craft, materials, and getting things right first time.",
    date: "2 October 2026",
    readTime: "8 min read",
    imageUrl: IMAGES.emerald,
    relatedSlugs: ["peel-and-stick-vs-paste-the-wall", "best-peel-and-stick-wallpaper", "how-to-wallpaper-a-room"],
    body: [
      { type: "p", text: "The question people type into search engines before choosing bathroom wallpaper is not which pattern they want. It is whether they can use wallpaper at all. The short answer is yes. The longer answer involves understanding where exactly in a bathroom wallpaper works, what type of paper to use, and what makes the difference between a bathroom hang that lasts five years and one that starts peeling within six months." },
      { type: "p", text: "Get those variables right and a bathroom wallpaper is one of the most rewarding interiors decisions you can make. The bathroom is small, enclosed, and used in an almost ritual way — morning light, steam from the shower, the same view every day. A paper that rewards that repeated close-range attention transforms the room entirely." },

      { type: "h2", text: "Can you wallpaper a bathroom? The honest answer" },
      { type: "p", text: "Yes — but not everywhere, and not with every paper type. The variables that matter are: where in the bathroom the paper goes, how well the room is ventilated, and whether you choose a paper rated for humid environments." },
      { type: "p", text: "UK building regulations divide bathrooms into moisture zones. Zone 0 is inside the bath or shower — no wallpaper. Zone 1 is directly above the bath or within the shower enclosure — no wallpaper. Zone 2 is within 600mm of the bath or shower edge — only purpose-made bathroom papers or vinyl-coated papers with appropriate adhesive. Beyond zone 2 is the dry area of the bathroom, where most wallpaper types perform well provided the room has adequate ventilation." },
      { type: "p", text: "In practice, most wallpaper in bathrooms goes on the wall facing the bath (not the wet wall), on the wall behind the toilet, or in a cloakroom/WC that has no shower at all. These are low-risk positions that any good vinyl-coated paper will handle comfortably." },
      { type: "tip", text: "Ventilation is the single most important factor — more important than the paper type. A bathroom with good ventilation (an extractor fan that runs for 20 minutes after showering, or an openable window) will keep any vinyl-coated paper in good condition indefinitely. A bathroom with poor ventilation will damage even the best moisture-resistant paper within two years." },

      { type: "h2", text: "10 bathroom wallpaper ideas" },

      { type: "h3", text: "1. Dark botanical facing the bath" },
      { type: "p", text: "The wall facing the bath — the one you look at while lying in it — is the most rewarding position for a dramatic paper in the whole house. You are at rest, at close range, with time to look. A dark botanical on this wall (forest green, midnight blue, deep teal) creates a genuinely luxurious effect. The steam from the bath adds a quality to the light that makes dark papers look particularly good: warm, atmospheric, slightly hazed." },
      { type: "p", text: "This is the one bathroom wallpaper direction that genuinely competes with hotel interiors. Choose a paper with a vinyl coating and seal the bottom edge with decorator's caulk where it meets the bath surround or tiled splash area." },

      { type: "h3", text: "2. Maximalist floral in an en-suite" },
      { type: "p", text: "An en-suite, particularly a small one, is the ideal room for a paper that would be too overwhelming at larger scale — a dense, maximalist floral, an all-over chintz, a pattern where every square centimetre is filled with something. The room is used briefly and privately, which means the intensity that would be exhausting in a living room reads as richly indulgent here. Small, maximalist, enclosed: the combination works." },

      { type: "h3", text: "3. Navy geometric in a family bathroom" },
      { type: "p", text: "A bold navy or dark teal geometric on the dry wall of a family bathroom is one of the most durable-feeling choices: the dark ground hides minor marks, the graphic pattern distracts from the inevitable splash zone, and the strong contrast reads clearly even under the flat overhead lighting that most family bathrooms have." },
      { type: "p", text: "Choose a paper with a Class 3 washability rating for a family bathroom. This means the surface can be cleaned with a mild detergent and a soft cloth without degrading the print or the coating." },

      { type: "h3", text: "4. Chinoiserie in a cloakroom or WC" },
      { type: "p", text: "The cloakroom or downstairs WC is the most forgiving bathroom environment for wallpaper — no shower, minimal steam, and typically the room where guests spend the most time looking at the walls in any house. It is the room interior designers most reliably recommend for a bold or expensive paper, because the square meterage is small (typically 4–6 rolls total), the risk is low, and the impact per pound spent is higher than anywhere else." },
      { type: "p", text: "Chinoiserie on all four walls of a cloakroom is a classic application — the small room scale suits the intricate, detailed quality of the pattern, and the enclosed space makes the panoramic landscape quality of chinoiserie particularly immersive." },

      { type: "h3", text: "5. Tonal stripe in a narrow bathroom" },
      { type: "p", text: "Most bathrooms are narrow — they are designed to use space efficiently rather than to feel expansive. A vertical stripe in a deep colour on all four walls pulls the ceiling up visually and makes the room feel less corridor-like. Tone-on-tone (deep sage on mid-sage, charcoal on dark grey) is better for bathrooms than high-contrast stripes because the room is typically experienced at close range and high contrast is harder to be near." },

      { type: "h3", text: "6. Art Deco tile effect" },
      { type: "p", text: "Several manufacturers produce papers that mimic ceramic tile patterns — Art Deco geometric mosaics, Victorian encaustic designs, Moorish zellige patterns — at a fraction of the cost of real tiles and with none of the grout-cleaning maintenance. Applied to a splash zone wall (above the basin, on a non-wet wall), a tile-effect paper creates a period-appropriate bathroom look that is entirely convincing at normal viewing distances." },
      { type: "p", text: "Choose a paper specifically rated for wet areas if it will go near a basin splash. Apply a coat of clear matt varnish over the surface after hanging for additional water resistance in high-splash positions." },

      { type: "h3", text: "7. Tropical mural panel" },
      { type: "p", text: "A full-wall tropical mural — banana leaves, palm fronds, bird-of-paradise — behind a freestanding bath is the contemporary luxury bathroom statement. It works because the mural and the freestanding bath together create a scene: the bath is the object, the mural is the backdrop. The composition is complete in itself, in a way that a tiled wall or a plain painted wall never is." },
      { type: "p", text: "For this application, choose a mural printed on a moisture-resistant substrate and seal all edges carefully. Rebel Walls and several other premium brands offer bathroom-rated mural papers." },

      { type: "h3", text: "8. Grasscloth-effect vinyl" },
      { type: "p", text: "Real grasscloth should not go in a humid bathroom — it is organic material that absorbs moisture and can mould in a poorly ventilated space. But several manufacturers produce vinyl papers with a grasscloth texture that replicates the warmth and tactility of the real thing with none of the moisture sensitivity. In a bathroom, this is the better choice: the warmth reads the same, the texture is convincing, and the paper can be wiped clean." },

      { type: "h3", text: "9. Monochrome graphic print" },
      { type: "p", text: "A strong two-colour graphic print — black-on-white, navy-on-cream, deep green-on-pale ground — in a modern abstract or botanical style works particularly well in bathrooms because the high contrast reads clearly under the varying light conditions of a bathroom (bright overhead light for grooming, softer side light for atmosphere). The monochrome palette also means the paper works with whatever tile colour the bathroom already has." },

      { type: "h3", text: "10. Peel-and-stick for easy updates" },
      { type: "p", text: "Bathroom tastes evolve faster than most rooms — trends in tile colour, sanitaryware style, and accessory finish shift regularly, and the bathroom is often updated more frequently than living spaces. Peel-and-stick wallpaper suits this update cycle perfectly: it can be changed every few years without the cost and disruption of a full strip-and-repaste. In the dry zone of a well-ventilated bathroom, premium peel-and-stick adhesion is entirely reliable." },

      { type: "h2", text: "What type of wallpaper to use in a bathroom" },
      { type: "table",
        head: ["Paper type", "Bathroom suitability", "Notes"],
        rows: [
          ["Standard paste paper (untreated)", "Dry zone only, good ventilation", "Will peel in humid conditions within 1–2 years"],
          ["Vinyl-coated paste paper", "Dry zone, zone 2 with caution", "Best all-round bathroom choice; wipeable to washable"],
          ["Solid vinyl / commercial vinyl", "Zones 1–2 with appropriate adhesive", "Maximum moisture resistance; used in commercial bathrooms"],
          ["Peel-and-stick", "Dry zone, good ventilation", "Premium brands reliable in low-humidity bathrooms"],
          ["Genuine grasscloth", "Not recommended", "Organic fibres absorb moisture and can mould"],
          ["Vinyl grasscloth (synthetic)", "Dry zone and zone 2", "Wipeable version safe in bathrooms"],
          ["Non-woven paste-the-wall", "Dry zone, good ventilation", "Better dimensional stability than paper-backed in humidity"],
        ]
      },

      { type: "h2", text: "How to prepare a bathroom for wallpapering" },
      { type: "numbered", items: [
        "Check ventilation first. If the bathroom has no extractor fan or openable window, install one before papering. A bathroom fan rated to at least 15 litres per second is the minimum for a room where you shower daily.",
        "Remove all existing wallpaper. Do not paper over existing paper in a bathroom — the adhesive layer compounds the moisture-retention problem and accelerates failure.",
        "Seal any bare plaster with a diluted PVA coat (1:4 PVA to water) or a specialist bathroom wall primer. Bare plaster in a humid room absorbs moisture through the paper and causes bubbling.",
        "Allow freshly painted walls to cure for at least 30 days before papering. Fresh emulsion off-gasses moisture that interferes with adhesive bonding in already-humid conditions.",
        "Use a moisture-resistant adhesive. Standard cellulose paste is not appropriate for bathrooms. Use a fungicidal paste or a paste specifically formulated for vinyl papers in humid environments.",
        "Seal all cut edges. After hanging, run a bead of clear silicone caulk or decorator's sealant along all cut edges that meet a tile, bath surround, or shower enclosure. This prevents moisture from wicking up behind the paper from the bottom edge.",
      ]},

      { type: "cta", heading: "How many rolls for a bathroom?", body: "Bathrooms are small but have more obstacles per square metre than any other room — basin, toilet, window, door. Use our calculator to get the exact roll count.", buttonText: "Open rolls calculator" },

      { type: "h2", text: "Frequently asked questions" },
      { type: "faq", items: [
        { q: "Can you use wallpaper in a bathroom?", a: "Yes — in the dry zone of a well-ventilated bathroom, any vinyl-coated wallpaper will perform reliably. Avoid the wet zone (inside or directly above the bath or shower) and ensure the room has an extractor fan that runs for at least 15–20 minutes after showering. Ventilation matters more than paper type." },
        { q: "What is the best wallpaper for a bathroom?", a: "Vinyl-coated paste-the-wall papers are the best all-round bathroom choice — they have better dimensional stability than paper-backed types in humid conditions and are typically wipeable to washable. For maximum moisture resistance in a zone 2 position (within 600mm of the bath or shower), use a solid vinyl commercial paper with a fungicidal paste." },
        { q: "Will wallpaper go mouldy in a bathroom?", a: "It can — but only in bathrooms with inadequate ventilation. In a well-ventilated bathroom (extractor fan running 15–20 minutes after every shower), a vinyl-coated paper hung with fungicidal paste will not mould. Using a standard paste paper or genuine grasscloth in a poorly ventilated bathroom will result in mould within 6–18 months." },
        { q: "How do I waterproof bathroom wallpaper?", a: "Apply a coat of clear matt water-based varnish over the hung paper for additional surface protection, particularly near splash zones. Seal all cut edges with clear silicone caulk where the paper meets tiles, the bath surround, or any wet surface. Neither treatment makes the paper suitable for wet zones (zones 0–1), but both improve durability in zone 2 positions." },
        { q: "Can I wallpaper a shower room?", a: "Only the dry walls — those at least 600mm from the shower enclosure. The wet walls inside and immediately adjacent to the shower must be tiled, stone, or a purpose-made wet-room panel. No wallpaper, however moisture-resistant, is suitable for continuous water contact." },
        { q: "Is a downstairs WC or cloakroom safe for wallpaper?", a: "Yes — a cloakroom or WC with no shower is the safest bathroom environment for wallpaper. There is no steam source, humidity levels are close to the rest of the house, and virtually any paper type works well. It is the room interior designers most often recommend for a bold or expensive paper precisely because the risk is negligible and the impact is high." },
      ]},
    ],
  },
  {
    slug: "hallway-wallpaper-ideas",
    category: "Inspiration",
    title: "Hallway Wallpaper Ideas: 12 Ways to Make Your First Impression Count",
    excerpt: "The hallway is the room every visitor sees first — and the one most homeowners neglect. These twelve wallpaper ideas work with the hallway's specific challenges: narrow widths, high traffic, awkward staircases, and the pressure of first impressions.",
    author: "Sofia Laurent",
    authorBio: "Sofia is a Paris-based interiors writer and contributing editor at Murall Journal. She covers trend, design culture, and the spaces that shape us.",
    date: "2 October 2026",
    readTime: "7 min read",
    imageUrl: IMAGES.verdant,
    relatedSlugs: ["living-room-wallpaper-ideas", "how-to-wallpaper-a-room", "how-many-rolls-do-i-need"],
    body: [
      { type: "p", text: "The hallway is the most visited room in the house and the one that gets the least design attention. Every person who enters your home passes through it. You pass through it yourself many times a day. Yet the default treatment is magnolia paint and a coat hook — a non-decision dressed as neutrality." },
      { type: "p", text: "The hallway is also one of the most rewarding rooms to wallpaper. The constraints that make it seem difficult — narrow width, awkward corners, the staircase — are in fact design assets. A narrow hallway makes bold wallpaper more immersive, not more overwhelming. A tight corridor with a strong paper on all four walls is one of the most dramatic domestic interiors possible. A mural at the end of a long corridor stops you in your tracks." },
      { type: "p", text: "Here are twelve directions that work — along with the practical considerations that are specific to hallways." },

      { type: "h2", text: "The hallway's design challenges (and why they're not what you think)" },
      { type: "p", text: "Most people approach hallway wallpaper cautiously because of three perceived problems: it's narrow, it's high-traffic, and it's complicated by the staircase. All three are real, but none of them point to restraint as the solution." },
      { type: "p", text: "Narrow hallways actually suit bold, immersive papers better than large rooms do, because the walls are close and the pattern fills your visual field. High traffic means durability matters — choose a vinyl-coated or washable paper rather than an untreated paste paper. The staircase is genuinely complex to hang but has no bearing on your design choice, only your hanging method." },
      { type: "tip", text: "The single most important thing to do in a hallway: keep the floor and ceiling as simple as possible, then let the walls do everything. A confident wallpaper in a hall with plain ceiling and simple flooring reads brilliantly. The same paper in a hall with a patterned carpet, textured ceiling tiles, and coloured woodwork fights itself into mediocrity." },

      { type: "h2", text: "12 hallway wallpaper ideas" },

      { type: "h3", text: "1. The dark immersive hallway" },
      { type: "p", text: "Dark wallpaper in a narrow hallway is not a mistake — it is the strongest possible use of the space. A deep, richly patterned paper (dark botanical, dense geometric, inky toile) on all four walls of a narrow corridor creates a jewel-box effect. The narrowness amplifies the design rather than making it feel cramped, because the pattern surrounds you and there is no pale wall to dilute it." },
      { type: "p", text: "The practical concern about dark halls being gloomy is resolved by lighting, not paper choice. A well-lit dark hallway is dramatic and welcoming. An unlit pale hallway is just dull. Install a decent pendant or wall lights before reaching for pale paint as your solution to a dark space." },

      { type: "h3", text: "2. Vertical stripe for borrowed height" },
      { type: "p", text: "A narrow hallway with a low ceiling is the prime use case for a vertical stripe wallpaper. The eye follows the stripe upward and the ceiling recedes. Choose a stripe with a relatively tight repeat (5–10cm between stripes) for a classic, elegant effect; a wider repeat (20–30cm) reads more modern and graphic. Tone-on-tone stripes — two values of the same colour — age better in a hallway than high-contrast stripes because they are less visually tiring on the most-used route in the house." },

      { type: "h3", text: "3. Bold print at the stair return" },
      { type: "p", text: "If your hallway opens onto a staircase with a landing return, the wall at the end of the stairs — the one you face as you turn at the landing — is one of the best feature wall positions in any home. It sits at eye level at the moment of pause (the turn) and is typically the most prominent wall in the entire hall and stair zone. A single bold print — a large-scale botanical, a graphic geometric, a mural panel — placed here makes the staircase feel like a designed journey rather than a functional route." },

      { type: "h3", text: "4. End-of-corridor mural" },
      { type: "p", text: "A long corridor with a dead end — a wall at the far end — is an opportunity that most people use for a coat rack or a mirror. A full-wall mural at the end of a corridor does something architecturally interesting: it suggests continuation. A landscape, a colonnade, a garden vista — anything that implies depth — makes the corridor feel longer and more purposeful. It is one of the most effective visual tricks in domestic interiors and requires only one wall." },

      { type: "h3", text: "5. Grasscloth for high-traffic durability" },
      { type: "p", text: "Grasscloth is tactile, warm, and — in its vinyl-backed versions — reasonably resistant to the scuffs and shoulder-brushes that hallways accumulate. It handles all four walls of a hallway well because its tonal neutrality means it never competes with coats, bags, shoes, and the other objects that accumulate in halls. It is the safe choice that does not look like a safe choice." },
      { type: "p", text: "Note that genuine woven grasscloth is not scrubbable — marks must be spot-cleaned carefully. For a genuinely high-traffic hallway with children or pets, choose a vinyl paper with a grasscloth texture rather than the real thing." },

      { type: "h3", text: "6. Chinoiserie runner" },
      { type: "p", text: "A long, narrow hallway hung with chinoiserie — a continuous panoramic landscape of pagodas, exotic birds, and trailing branches — is one of the oldest and most successful uses of wallpaper in the English tradition. Georgian town houses were frequently treated this way because chinoiserie is a landscape paper: it runs continuously around a room (or along a corridor) telling a story from wall to wall. The effect is of moving through a landscape rather than a decorated space." },
      { type: "p", text: "Modern chinoiserie papers are available in panel form (pre-sized to standard wall sections) which makes hanging significantly easier than matching a traditional roll-hung repeat in a narrow space." },

      { type: "h3", text: "7. Dado rail treatment" },
      { type: "p", text: "Hanging wallpaper above the dado rail (approximately 900mm from the floor) with painted woodwork below is the traditional approach to hallway decoration — and it remains highly practical. The lower section, which takes the most abuse from feet, bags, and furniture, is in hard-wearing paint. The upper section, which gets far less contact, carries the decorative paper." },
      { type: "p", text: "The combination also prevents the common hallway problem of a bold paper that is perpetually obscured by coats and bags hung low on the wall. By keeping the paper above the clutter line, it remains visible and unobstructed." },

      { type: "h3", text: "8. Panelling effect" },
      { type: "p", text: "A wallpaper that simulates raised panel woodwork — dado rails, picture rails, framed rectangular panels — creates an architectural quality in a hallway that signals arrival in a way that plain walls never can. Applied below a picture rail in a warm neutral colourway, it reads as a Georgian or Victorian entrance hall regardless of the house's actual age. Applied in a darker colourway across all four walls, it reads as a private members' club." },

      { type: "h3", text: "9. Maximalist botanical (all four walls)" },
      { type: "p", text: "A dense, dark-background botanical on all four walls of a hallway is the statement that has defined the forward end of UK interior design for the past three years. Rebel Walls, House of Hackney, and Cole & Son all produce versions that hang well in narrow spaces. The key requirement: the paper must have a vertical composition (tall plants, trailing vines, upward-reaching branches) rather than a horizontal repeat. A horizontal botanical repeat in a narrow space reads as wallpaper; a vertical one reads as a garden." },

      { type: "h3", text: "10. Bold graphic modern print" },
      { type: "p", text: "A hallway is also the place where a paper that would be too emphatic in a living room can work without reservation — because the hallway is transitory. You move through it rather than settling into it, which means a very high-energy design (strong contrast, large scale, bold colour) can be experienced as energising rather than exhausting. The papers that are too confrontational for a sofa wall are often exactly right for a 90-second corridor." },

      { type: "h3", text: "11. Staircase wall treatment" },
      { type: "p", text: "The wall running alongside a staircase — the oblique surface that follows the rake of the stairs — is one of the most prominent but most often plain surfaces in a house. Papering it in the same design as the rest of the hall creates a continuous, immersive environment. Papering it in a contrasting design treats the staircase as a separate zone — which can work well in larger entrance halls where the staircase is architecturally distinct from the corridor." },
      { type: "p", text: "Hanging on the stair wall is technically demanding because every drop must be cut at the same oblique angle at top and bottom. Measure carefully and cut with a straight-edge rather than scissors for a clean raking line." },

      { type: "h3", text: "12. Peel-and-stick for rented hallways" },
      { type: "p", text: "Rented hallways are among the worst-treated rooms in domestic interiors — blank magnolia that tenants leave untouched for years because traditional wallpaper is not permitted. Premium peel-and-stick papers solve this completely. A full hallway hang in a rental property takes half a day, requires no paste, and leaves the walls entirely undamaged on removal." },
      { type: "p", text: "The hallway is actually a better peel-and-stick environment than many rooms — stable temperature, low humidity, no steam or cooking vapour — which means adhesion is reliable and longevity is good. Use it without hesitation." },

      { type: "h2", text: "Practical considerations specific to hallways" },

      { type: "h3", text: "Durability and washability" },
      { type: "p", text: "Hallways receive more physical contact than any other room. Shoulders brush the wall when carrying shopping. Children drag hands along it. Coats swing against it. Choose a paper with a vinyl coating or a manufacturer durability rating of Class 2 or above (the European standard for abrasion resistance). Check the label — it will specify whether the paper is wipeable, washable, or scrubbable. In a hallway, you want at minimum wipeable; washable is preferable." },

      { type: "h3", text: "The stairwell — what's different" },
      { type: "p", text: "The stairwell combines the hallway's narrow-space challenges with a significant height increase and an awkward access problem. Standard drops may be 4–5 metres long rather than 2.4 metres, which means paste soak time increases and the paper is much heavier to manoeuvre. Two people are almost always required. A scaffold board or platform step (rather than a ladder) is needed to reach the top of the drop safely." },
      { type: "p", text: "Design-wise, the stairwell height works in your favour: a paper with a strong vertical movement (a tall botanical, a long-repeat panoramic print) can be seen at full vertical scale in a way that is impossible in a standard-height room. The stairwell is the one place in the house where a truly tall, dramatic repeat can be appreciated." },

      { type: "cta", heading: "How many rolls for a hallway?", body: "Hallways and stairwells have more waste than standard rooms due to angled cuts and long drops. Use our calculator to get the precise quantity before you order.", buttonText: "Open rolls calculator" },

      { type: "h2", text: "Frequently asked questions" },
      { type: "faq", items: [
        { q: "Is dark wallpaper a good idea in a hallway?", a: "Yes — narrow hallways are one of the best applications for dark wallpaper. The confined width means the pattern surrounds you and reads as immersive rather than oppressive. The solution to a dark hallway feeling gloomy is better lighting, not lighter wallpaper." },
        { q: "What wallpaper is most durable for a hallway?", a: "Vinyl-coated papers and papers with a Class 2 or Class 3 abrasion resistance rating (marked on the label) perform best in hallways. Avoid untreated paste papers, embossed papers with deep texture that traps dirt, and genuine grasscloth in very high-traffic situations — it is not scrubbable." },
        { q: "How many rolls do I need for a hallway?", a: "A standard narrow hallway (1.2m wide, 5m run, 2.4m ceiling) typically needs 6–8 rolls for no pattern repeat, or 8–10 rolls for a paper with a large repeat. A stairwell adds significantly more — often 12–16 rolls due to the long drops and angled cuts at the top and bottom. Use the rolls calculator for your specific dimensions." },
        { q: "Can I wallpaper a stairwell myself?", a: "Yes, but it requires two people, a proper scaffold platform (not a ladder), and experience with hanging long drops. Each stair drop can be 4–5 metres — substantially heavier and more unwieldy than a standard drop. If it is your first wallpapering project, practise on a simpler room first." },
        { q: "What pattern works best in a narrow hallway?", a: "Vertical designs — stripes, tall botanicals, upward-reaching compositions — work best in narrow hallways because they draw the eye upward and make the space feel taller. Avoid strong horizontal patterns, which emphasise the narrowness. Large-scale designs can work well in narrow spaces because the close walls bring you into the pattern rather than letting you observe it from a distance." },
        { q: "Should I use the same wallpaper on the stairs as in the hall?", a: "Using the same paper throughout creates a continuous, intentional environment — the stronger design choice. Different papers for hall and stairs work if the staircase is architecturally distinct (a separate flight visible through an arch, for example) and the two papers relate tonally. Avoid two strong, contrasting patterns in adjacent zones — they compete rather than complement." },
      ]},
    ],
  },
  {
    slug: "bedroom-wallpaper-ideas",
    category: "Inspiration",
    title: "Bedroom Wallpaper Ideas: 10 Designer-Approved Looks for Every Style",
    excerpt: "The bedroom rewards bolder choices than almost any other room — you're looking at it last thing at night and first thing in the morning. Here are ten wallpaper directions that consistently deliver in the space that matters most.",
    author: "Sofia Laurent",
    authorBio: "Sofia is a Paris-based interiors writer and contributing editor at Murall Journal. She covers trend, design culture, and the spaces that shape us.",
    date: "2 October 2026",
    readTime: "8 min read",
    imageUrl: IMAGES.midnight,
    relatedSlugs: ["living-room-wallpaper-ideas", "how-to-choose-wallpaper-for-small-rooms", "botanical-wallpaper-trend-2026"],
    body: [
      { type: "p", text: "The bedroom is the room most people are most cautious about, and it is the room where caution most consistently produces the wrong result. The logic runs something like: this is where I sleep, so it should be calm; calm means pale; pale means safe. But the bedroom is also the room you experience in the most intimate, sustained way — lying in bed, at close range, for hours at a time. A wallpaper that rewards extended attention matters here more than anywhere." },
      { type: "p", text: "The other thing the bedroom has that most rooms do not: an obvious, natural feature wall. The wall behind the bed is one of the strongest architectural statements available in a domestic interior. You can treat it as a headboard at scale — and a confidently chosen wallpaper does exactly that." },

      { type: "h2", text: "Feature wall or full room?" },
      { type: "p", text: "For bedrooms, a single feature wall behind the bed is almost always the right call for a first or second wallpaper project. The scale is forgiving: even a bold, dense pattern works on a single wall because the painted walls on either side provide breathing room. Full-room papering in a bedroom works beautifully but asks more of the design — you need a pattern with enough internal variation that it reads as an environment rather than a repeated motif at close range from the pillow." },
      { type: "p", text: "If you want to paper all four walls, choose a design with a pale or neutral background, a relatively open composition, or a tonal/textural quality that feels enveloping rather than busy. Dense repeat patterns on four walls in a bedroom can make the room feel smaller and are harder to relax in. Dark-background designs can work on four walls if the room has strong natural light — they create a cocooning effect that many people find ideal for sleep." },

      { type: "h2", text: "10 bedroom wallpaper ideas" },

      { type: "h3", text: "1. Dark botanical behind the bed" },
      { type: "p", text: "A deep-background botanical — forest green, inky blue, near-black — on the wall behind the bed is the contemporary bedroom statement that has held its ground for three years running. It works because it does precisely what a bed head wall should: it creates a visual anchor for the bed, makes the white or neutral bedlinen pop against it, and turns the bedroom into a room you want to be in rather than merely sleep in." },
      { type: "p", text: "Choose a design with enough detail — layered leaves, depth, multiple tonal greens or blues — that there is always something to notice. A flat dark botanical with a obvious repeat gets dull quickly at close range. The best options feel almost illustrative, with hand-drawn linework and botanical accuracy." },

      { type: "h3", text: "2. Soft chinoiserie" },
      { type: "p", text: "Chinoiserie at pale scale — pale blue or cream ground, delicate painted birds, blossoming branches, wandering figures — is one of the most enduring bedroom papers because it is simultaneously calm and visually rich. There is always something to look at without the paper ever demanding attention. The traditional colourways (soft blue-grey, warm ivory, blush-touched cream) are also naturally suited to bedrooms because they sit at the cool-warm boundary that reads as restful under lamplight." },
      { type: "p", text: "Use it on all four walls for a period-appropriate treatment, or on the head wall alone against a warm white. Either approach works; the full-room version rewards rooms with high ceilings and traditional architraves." },

      { type: "h3", text: "3. Textured grasscloth" },
      { type: "p", text: "Grasscloth — woven natural fibres bonded to a paper backing — is the most tactile wallpaper available and one of the most flattering in a bedroom. The texture catches the warm light of bedside lamps and reads differently by day and by night: flatter and more neutral in daylight, warm and dimensional under evening lamps. It is also one of the most forgiving choices from a design perspective — it works with almost any furniture style because it reads as a material rather than a pattern." },
      { type: "p", text: "Use it on all four walls in a bedroom without hesitation. The texture is quiet enough that full-room treatment does not overwhelm, and the warmth it adds to a room with even a modest amount of lamplight is dramatic." },

      { type: "h3", text: "4. Pale maximalist floral" },
      { type: "p", text: "Large-scale vintage florals on a pale or white background — the kind with roses or peonies drawn at near life-size — have migrated firmly from traditional to contemporary contexts. The key quality is confidence of drawing: an oversized, boldly rendered floral does not read as fussy. It reads as graphic, even at the scale of a bedroom wall." },
      { type: "p", text: "Pair with plain linen bedding in one of the floral's secondary colours — a dusty pink, a warm sage — and avoid adding any further pattern. The floral is the room's single printed element; everything else should be solid, textured, or natural material." },

      { type: "h3", text: "5. Geometric headboard wall" },
      { type: "p", text: "A bold geometric — particularly one with a strong vertical or diamond emphasis — behind the bed creates the graphic equivalent of a headboard. It defines the bed's position in the room and gives the whole arrangement a deliberate, composed quality that feels considered rather than assembled. This approach works especially well in rooms where the bed does not have a physical headboard: the wallpaper becomes the headboard." },
      { type: "p", text: "Choose a geometric with some depth — metallic ink, tonal variation within the pattern, or a subtle embossed texture — rather than a flat two-colour print. The depth rewards the close-range viewing that the bedroom demands." },

      { type: "h3", text: "6. Moody landscape mural" },
      { type: "p", text: "A single-wall landscape mural — a misty forest, a mountain panorama, a twilight pastoral scene — behind the bed turns the bedroom into something closer to an installation than an interior. The effect is immersive in a way that no repeat pattern can achieve, because the eye reads a mural as continuous space rather than a decorated surface." },
      { type: "p", text: "The practical consideration: murals are printed to your exact wall dimensions and arrive as numbered panels (typically 6–12 for a bedroom head wall). Installation is methodical but straightforward — the panels are hung in sequence and the print bleeds slightly at each join to ensure the join disappears. Most manufacturers supply detailed hanging instructions specific to the print." },

      { type: "h3", text: "7. Vertical stripe for borrowed height" },
      { type: "p", text: "A vertical stripe in a deep colour on the head wall does two things simultaneously: it creates a graphic statement that anchors the bed, and it makes the ceiling appear higher. The eye follows the stripe upward and the room's vertical dimension is exaggerated as a result. This is one of the most effective tricks available in rooms with low or average ceiling heights." },
      { type: "p", text: "Match the darker stripe tone to the skirting board and the lighter stripe to the ceiling. This grounds the stripe visually and makes the whole wall treatment feel resolved rather than applied. Avoid stripes with a strong contrast between stripe and background — the effect becomes too graphic for extended bedroom use. Tone-on-tone stripes (forest green on dark green, navy on blue) wear better." },

      { type: "h3", text: "8. Toile de Jouy" },
      { type: "p", text: "Toile de Jouy — the French pastoral print of romantic scenes, shepherdesses, and classical landscapes in a single colour on cream or white — has outlasted every trend cycle it has been declared unfashionable by. Its durability comes from the same quality that makes it work in bedrooms: the scenes reward close attention without ever demanding it. You can look at a toile wall for an hour and keep finding things you had not previously noticed." },
      { type: "p", text: "Use it on all four walls or on the head wall alone. Traditional colourways (classic red-on-cream, blue-on-white) are correct; contemporary versions in olive, charcoal, or black-on-white are equally valid and work in rooms where the traditional colourways would feel too period-specific." },

      { type: "h3", text: "9. Abstract watercolour wash" },
      { type: "p", text: "Loose, gestural watercolour papers — clouds of colour that bleed and pool across the surface in a way that suggests paint rather than print — are among the most relaxing bedroom choices because the abstraction prevents the eye from ever fully resolving the pattern. There is no repeat to find, no motif to locate. The eye reads it as colour and movement rather than design, which produces a quieter, more restful visual experience than any repeat pattern can." },
      { type: "p", text: "Choose a colourway with enough tonal range to prevent it from reading as flat paint — a watercolour wash that moves from deep to pale across its surface, or one that incorporates two or three colour families, is more interesting in close-quarters bedroom use than a single uniform tone." },

      { type: "h3", text: "10. The renter's bedroom transformation" },
      { type: "p", text: "Premium peel-and-stick wallpaper has made the bedroom feature wall available to renters in a way it genuinely was not five years ago. The adhesive quality of the best brands (Chasing Paper, Tempaper, Hygge & West) is now sufficient for a full bed-head wall that looks and behaves like traditional paste paper and removes cleanly when you move out." },
      { type: "p", text: "The only constraint worth observing: avoid applying peel-and-stick to walls with very fresh paint (under 30 days) or any paint that is already peeling. Both conditions mean the wall surface is weaker than the adhesive, and removal may lift paint. On a sound, well-cured painted wall, a premium peel-and-stick installation is the most practical bedroom upgrade available on a rental budget." },

      { type: "cta", heading: "Shop bedroom wallpaper", body: "Browse our edit of bedroom-specific designs — from dark botanicals to pale chinoiserie, curated for the head wall and beyond.", buttonText: "Explore bedroom designs →", href: "/rooms/bedroom" },

      { type: "h2", text: "Choosing for your bedroom: three specific considerations" },

      { type: "h3", text: "Colour temperature and sleep" },
      { type: "p", text: "Cool colours (blue-greys, cool whites, lavender) are widely understood to support sleep. Warm colours (terracotta, amber, warm greens) are more stimulating but more flattering under lamplight. In practice, the lamp temperature in your bedroom matters more than the wallpaper colour — a warm bulb (2700K) makes almost any colour read warmer and cosier. The more important wallpaper variable for sleep quality is busy-ness: a highly complex, high-contrast repeat pattern is more visually stimulating than a tonal or abstract one, regardless of colour." },

      { type: "h3", text: "Pattern scale in relation to room size" },
      { type: "p", text: "In smaller bedrooms, the instinct is to choose a small pattern. This is frequently wrong. A small, busy repeat on four walls in a small bedroom creates visual noise that makes the room feel more cramped, not less. A confident, oversized pattern on a single wall — with the three remaining walls plain — often reads better because it gives the eye a clear subject and does not multiply the repeat across multiple surfaces." },

      { type: "h3", text: "Morning light vs. evening light" },
      { type: "p", text: "East-facing bedrooms receive morning sun, which is relatively cool and blue. West-facing rooms receive afternoon and evening light, which is warm and orange. South-facing rooms get consistent bright light throughout the day. North-facing rooms get no direct sun and rely on ambient daylight and lamps. Check which direction your bedroom faces and view samples in that light at the time of day you use the room most." },

      { type: "h2", text: "Frequently asked questions" },
      { type: "faq", items: [
        { q: "What is the most popular bedroom wallpaper colour?", a: "Deep botanical greens and midnight navies are consistently the top-searched bedroom wallpaper colours, particularly for feature walls behind the bed. For full-room treatment, warm neutrals and soft botanical designs on pale backgrounds perform better because they are less visually demanding at close range over extended periods." },
        { q: "Should I wallpaper behind the bed only?", a: "For most bedrooms, yes — the head wall is the natural feature wall and creates the strongest design impact per roll of paper used. Full-room papering works beautifully but requires a quieter design. The head-wall-only approach works with a wider range of patterns, including bold and dense designs." },
        { q: "Is dark wallpaper bad for small bedrooms?", a: "No. Dark wallpaper in a small bedroom creates a jewel-box effect rather than a confined one, provided it is used on one wall only. A dark head wall with pale walls on either side gives the room depth and makes it feel more deliberate. Full dark-on-four-walls in a small room with limited light can feel oppressive — that is the specific combination to avoid." },
        { q: "What wallpaper is best for a bedroom with low ceilings?", a: "A vertical stripe on the head wall is the most effective option. The eye follows the stripe upward and the ceiling appears higher. Avoid strong horizontal patterns on all four walls — they draw the eye sideways and emphasise the low ceiling. A mural that includes vertical elements (trees, tall architectural features) achieves a similar effect to the stripe." },
        { q: "Can I use peel-and-stick wallpaper in a bedroom?", a: "Yes — bedrooms are actually ideal for peel-and-stick because they have low humidity and no cooking or steam. The adhesive performs best in stable, dry conditions, which is exactly what most bedrooms provide. Premium brands will last 7–10 years in a bedroom environment." },
        { q: "How many rolls do I need for a bedroom feature wall?", a: "A standard double bedroom head wall (typically 3.6–4.0m wide, 2.4m ceiling) needs 3–4 rolls of standard UK paper (52cm wide) for a plain design, or 4–5 rolls for a paper with a large pattern repeat. Use our rolls calculator for a precise quantity." },
      ]},
    ],
  },
  {
    slug: "how-to-wallpaper-a-room",
    category: "How-To",
    title: "How to Wallpaper a Room: A Complete Beginner's Guide",
    excerpt: "Hanging wallpaper yourself is entirely achievable with the right preparation and a methodical approach. This step-by-step guide covers everything from wall prep to trimming the final drop — no professional experience required.",
    author: "James Whitfield",
    authorBio: "James is a former interior decorator turned writer, based in Edinburgh. He has hung wallpaper in over 200 homes and writes about craft, materials, and getting things right first time.",
    date: "25 September 2026",
    readTime: "11 min read",
    imageUrl: IMAGES.hex,
    relatedSlugs: ["how-many-rolls-do-i-need", "peel-and-stick-vs-paste-the-wall", "best-peel-and-stick-wallpaper"],
    body: [
      { type: "p", text: "Wallpapering has a reputation for being difficult. In practice, it is methodical — a series of straightforward steps that compound into a professional result if executed in order and without rushing. The people who struggle are almost always those who skip the preparation. The people who do the preparation properly find the hanging itself unremarkable." },
      { type: "p", text: "This guide covers the full process: what you need, how to prep the walls, how to hang the first drop correctly, and how to handle the common obstacles — corners, light switches, windows — that intimidate first-timers. Work through it once before you start. The sequence matters." },

      { type: "h2", text: "What you'll need" },
      { type: "h3", text: "Tools" },
      { type: "list", items: [
        "Pasting table (2.4m fold-flat type — do not skip this)",
        "Plumb bob and line, or a long spirit level",
        "Pencil",
        "Wallpaper brush or smoothing tool (plastic smoother for paste-the-wall; bristle brush for traditional paste)",
        "Seam roller",
        "Large scissors and a sharp craft knife with fresh blades",
        "Bucket and large pasting brush (for traditional paste papers)",
        "Sponge and clean water bucket (for wiping paste off surfaces)",
        "Stepladder",
        "Steel straight-edge for trimming",
        "Tape measure",
        "Pencil and notepad for calculations",
      ]},
      { type: "h3", text: "Materials" },
      { type: "list", items: [
        "Wallpaper — correct quantity calculated before purchase (see below)",
        "Paste appropriate to your paper type — check the manufacturer's recommendation",
        "Size/primer or diluted PVA (1 part PVA to 4 parts water) for sealing bare plaster",
        "Lining paper (recommended for walls in poor condition or if hanging a heavy paper)",
        "Filler and sandpaper for wall preparation",
      ]},

      { type: "cta", heading: "How many rolls do you need?", body: "Use our free rolls calculator to get the exact quantity for your room before you order — including pattern repeat waste.", buttonText: "Open rolls calculator" },

      { type: "h2", text: "Step 1: Prepare the walls" },
      { type: "p", text: "Wall preparation is the single most important step. A freshly-hung paper on a poorly-prepared wall will lift, bubble, and peel within weeks. A well-prepared wall gives the adhesive a stable, consistent substrate that holds for years. Do not abbreviate this." },

      { type: "h3", text: "Remove existing wallpaper" },
      { type: "p", text: "Existing wallpaper must come off. Do not hang over it — the added moisture from new paste will re-activate old adhesive and cause both layers to lift. Score the surface lightly with a scoring tool, soak thoroughly with warm water (add a tablespoon of fabric softener to help penetration), and strip in sheets. Hire a steam stripper for a room that is heavily layered or has multiple decades of paper." },
      { type: "p", text: "Once stripped, wash the walls with warm water to remove all paste residue. Any residue left behind will interfere with new adhesive bonding." },

      { type: "h3", text: "Fill, sand, and prime" },
      { type: "p", text: "Fill any holes, cracks, or chips with a lightweight ready-mixed filler. Allow it to dry completely — typically 2–4 hours for small repairs, overnight for deeper fills. Sand smooth with 120-grit paper, then wipe with a damp sponge to remove dust. The wall should feel uniformly smooth to the back of the hand when finished." },
      { type: "p", text: "Apply a coat of size (diluted paste mixed to half-strength) or diluted PVA to all walls you plan to paper. This seals porous surfaces, prevents the wall from absorbing moisture too quickly from the paste, and gives the paper a more workable open time — you will have longer to adjust the drop before it grips. Allow to dry fully before hanging." },
      { type: "tip", text: "On bare plaster, always size before papering. Fresh plaster is highly porous and will suck moisture out of the paste before the paper has time to stick, causing dry joints that lift at the seams within days." },

      { type: "h3", text: "Hang lining paper (optional but recommended)" },
      { type: "p", text: "Lining paper covers minor surface imperfections and gives a consistent, slightly absorbent substrate that improves both adhesion and finish quality. It is worth using on any wall that is not newly plastered and smooth. Hang lining paper horizontally (cross-lining) at 90 degrees to your wallpaper drops — this prevents seams from aligning. Allow to dry fully (typically 24 hours) before hanging the top paper." },

      { type: "h2", text: "Step 2: Calculate and cut your drops" },
      { type: "p", text: "Measure the full height of the wall from ceiling to skirting board. Add 50–75mm to this measurement — 25–37mm for trimming at the top and 25–37mm at the bottom. This is your cut length for a plain paper with no pattern repeat." },
      { type: "p", text: "For a patterned paper, you need to account for the pattern repeat. Add the full pattern repeat length to your cut measurement so each drop can be aligned to the pattern before hanging. Most manufacturers print the repeat length on the label — it might be, for example, 64cm. In that case, add 64cm to your base cut length. You will waste this material as offcuts at the top or bottom of each drop, but alignment takes priority." },
      { type: "tip", text: "Number each cut drop on the back in pencil — top left corner, with an arrow indicating up — before you leave the pasting table. Mixed-up drops are the most common cause of pattern mismatches that cannot be corrected mid-hang." },

      { type: "h2", text: "Step 3: Mark your starting point" },
      { type: "p", text: "Never start from a corner. Corners are rarely perfectly straight, and the first drop sets the reference for every subsequent drop. Start instead from a point one roll-width from the most visually prominent corner in the room — typically the corner nearest the main window, or the chimney breast wall." },
      { type: "p", text: "Mark a perfectly vertical plumb line at your starting point. Use a plumb bob for accuracy, or a long spirit level. This line is more important than any other mark you will make — all subsequent drops are butted against each other, so if the first drop is not truly vertical, the cumulative error across a room will be visible by the time you reach the far wall." },

      { type: "h2", text: "Step 4: Paste (or activate) the paper" },
      { type: "h3", text: "Traditional paste papers" },
      { type: "p", text: "Mix paste according to the manufacturer's instructions. Lay the first drop face-down on the pasting table. Apply paste evenly from the centre outward, covering every millimetre including the edges. Fold the pasted section concertina-style (paste-to-paste, not paper-to-paste) to allow it to soak. Most papers need 2–5 minutes of soak time — check the manufacturer's recommendation. Under-soaked paper tears; over-soaked paper stretches." },
      { type: "p", text: "A paper that has soaked correctly will be slightly limp and flexible — it should drape off the edge of the table without creasing. If it is stiff and resists draping, it needs more time." },
      { type: "h3", text: "Paste-the-wall papers" },
      { type: "p", text: "Apply paste directly to the wall section where your first drop will go, extending slightly beyond the drop width. Do not paste the paper. The paper goes on dry, which means it does not stretch or shrink during hanging — a significant practical advantage, especially for heavier papers and vinyl types. Some paste-the-wall papers also offer a very long open time (30–60 minutes) that makes repositioning easier." },

      { type: "h2", text: "Step 5: Hang the first drop" },
      { type: "p", text: "Unfold the top section of your pasted drop and carry it to the wall. Align the right (or left) edge with your plumb line, leaving the 25–37mm overlap at the ceiling. Press the top section flat with your smoothing brush, working from the centre outward to push out air bubbles. Release the bottom fold and smooth down the rest of the drop, again working from centre to edges." },
      { type: "p", text: "Check the edge against the plumb line. It should be perfectly aligned top to bottom. If it is drifting, peel the lower section away from the wall and re-align — the paper will not have bonded yet and can be adjusted freely within the first few minutes." },
      { type: "p", text: "Trim the ceiling overlap with scissors or a craft knife against a straight-edge. Do the same at the skirting. Wipe any paste from the ceiling and skirting immediately with a clean damp sponge." },

      { type: "h2", text: "Step 6: Hang subsequent drops" },
      { type: "p", text: "Butt-join the second drop directly against the first — edges touching, no gap, no overlap. A slight overlap is almost impossible to sand back cleanly; a visible gap will be permanent. The seam should disappear when the paste dries." },
      { type: "p", text: "If your paper is patterned, align the pattern horizontally before pressing the drop flat against the wall. Stand back and check the alignment at eye level before committing. Once the adhesive grips, the drop cannot be moved." },
      { type: "p", text: "Run a seam roller down every join approximately 10–15 minutes after hanging, when the paste has partially set. This ensures the edges bond fully and do not lift during drying. Do not seam-roll embossed papers — it will crush the texture." },

      { type: "h2", text: "Working around obstacles" },
      { type: "h3", text: "Corners" },
      { type: "p", text: "Do not try to wrap a single drop around an internal corner — corners are almost never perfectly straight and the drop will twist. Instead, measure the distance from the last full drop to the corner, add 12mm, and cut a strip to this width. Hang it into the corner, wrapping the 12mm overlap onto the adjacent wall. On the new wall, strike a fresh plumb line one full roll-width from the corner and start again." },
      { type: "p", text: "External corners (such as a chimney breast) can be wrapped if the paper is flexible. Ensure the overlap is a minimum of 25mm onto each face for adequate adhesion." },

      { type: "h3", text: "Light switches and sockets" },
      { type: "p", text: "Turn off the electricity at the fuse box before working near switches and sockets. Hang the drop over the fitting as if it were not there. Cut diagonal lines from the centre of the fitting outward to its corners, creating four triangular flaps. Press the paper against the wall around the fitting, then trim the flaps flush. Loosen the faceplate screws slightly, tuck the paper edges behind, and re-tighten. The paper will cover the rawl plug holes neatly." },

      { type: "h3", text: "Windows and doors" },
      { type: "p", text: "Hang drops normally up to the window or door frame. For the drop that partially overlaps the opening, hang the full drop onto the wall, smooth the section above (or beside) the opening, then cut away the section over the void leaving a 25mm overlap onto the reveal. Wrap and trim this overlap into the reveal." },

      { type: "h2", text: "Common mistakes to avoid" },
      { type: "numbered", items: [
        "Starting from a corner. Corners are almost never square. The first drop must be set against a plumb line, not a corner edge.",
        "Under-soaking traditional paste papers. An under-soaked drop tears at the seams and bubbles in the centre. When in doubt, give it another two minutes.",
        "Skipping the size coat. Unsized walls pull moisture out of the paste too quickly, causing dry joins and bubbling. Always size first.",
        "Wiping paste off the front of the paper with a dry cloth. This smears it into the surface. Use a clean damp sponge, rinsed frequently.",
        "Seam-rolling too early. If you roll before the paste has partially set, the edge lifts again when you release pressure. Wait 10–15 minutes.",
        "Stretching the paper to close a small gap. This leaves a thin strip that will crack when the paste dries. Re-hang the drop if the gap is visible.",
        "Turning the heating on to dry the paper faster. Forced drying causes shrinkage, cracking, and lifted seams. Keep the room at normal temperature with good ventilation and let it dry at its own pace.",
      ]},

      { type: "h2", text: "How long does it take?" },
      { type: "p", text: "Allow a full day for preparation (stripping, filling, sizing, lining if used) and a full day for hanging a standard room. First-timers should not attempt to prep and hang in the same day — fatigue leads to shortcuts in the hanging stage, and that is when mistakes happen." },
      { type: "p", text: "A professional decorator typically hangs 10–14 drops in a working day, depending on pattern complexity and obstacles. A careful first-timer hanging a plain paper should expect 6–8 drops per day. Patterned papers with long repeats take 30–50% more time because of the alignment work at each seam." },

      { type: "h2", text: "Frequently asked questions" },
      { type: "faq", items: [
        { q: "Do I need to strip old wallpaper before hanging new?", a: "Yes, almost always. Hanging over existing wallpaper adds moisture to old adhesive, which can cause both layers to lift. There are rare cases where a single layer of lining paper over a perfectly adhered original can work, but as a general rule, strip and start from a clean wall." },
        { q: "What paste should I use?", a: "Check the manufacturer's specification on your wallpaper — it will state the correct paste type. Lightweight papers typically use standard cellulose paste. Heavy vinyl and textured papers often require a heavy-duty or border paste with stronger adhesion. Paste-the-wall papers use their own formulation applied to the wall, not the paper." },
        { q: "How long does wallpaper take to dry?", a: "Most papers are touch-dry within 12–24 hours in normal conditions (18–20°C, moderate ventilation). Full bond strength takes 48–72 hours. Avoid moving furniture back against the walls or applying any pressure to seams during this period." },
        { q: "Can I wallpaper over painted walls?", a: "Yes — painted walls are one of the best substrates, provided the paint is sound, fully dry, and not peeling. Apply a coat of size before hanging. Gloss-painted walls need light sanding first to provide a mechanical key for the adhesive." },
        { q: "How do I fix air bubbles after the paper is hung?", a: "Small bubbles often disappear as the paste dries. If they persist after 24 hours, make a small incision with a sharp blade, inject a small amount of paste with a syringe, and press flat. Wipe off any excess paste. Do not attempt this while the paper is still wet — the surface is too delicate and will tear." },
        { q: "What's the difference between paste-the-wall and paste-the-paper?", a: "Paste-the-paper (traditional) applies paste to the back of the paper, which then needs to soak before hanging. This allows the paper to expand with moisture — if not soaked sufficiently, it continues to expand on the wall and causes bubbling. Paste-the-wall applies paste directly to the wall surface. The paper goes on dry, so no soaking is required and there is no expansion issue. Most modern papers specify paste-the-wall." },
        { q: "Should I wallpaper the ceiling?", a: "It is possible but significantly more difficult than walls, particularly for a first-timer, because gravity works against you during hanging. Papering the ceiling before the walls is standard practice if you do proceed. Alternatively, a feature ceiling in a single deep colour often creates a similar effect to wallpaper without the complexity." },
      ]},
    ],
  },
  {
    slug: "accent-wall-ideas",
    category: "Inspiration",
    title: "10 accent wall ideas that interior designers actually approve of",
    excerpt: "Forget the feature wall clichés. These are the wallpaper moments that our favourite designers have used to transform ordinary rooms into something memorable.",
    author: "Sofia Laurent",
    authorBio: "Sofia is a Paris-based interiors writer and contributing editor at Murall Journal. She covers trend, design culture, and the spaces that shape us.",
    date: "24 Apr 2026",
    readTime: "5 min read",
    imageUrl: IMAGES.hex,
    relatedSlugs: ["how-to-choose-wallpaper-for-small-rooms", "botanical-wallpaper-trend-2026", "how-many-rolls-do-i-need"],
    body: [
      { type: "p", text: "The phrase 'feature wall' has taken a battering over the years — unfairly, in our view. A poorly executed accent wall (a random red wall in an otherwise beige room; a printed canvas-look paper behind a sofa it has nothing to say to) deserves the criticism. But a thoughtfully chosen wallpapered surface is one of the most powerful single moves in interior design. Here are ten ways to do it properly." },
      { type: "h2", text: "1. The headboard wall" },
      { type: "p", text: "The wall behind a bed is the natural home for a bedroom's most expressive design moment. Choose a paper with strong vertical movement — a tall botanical, a tonal stripe, a dramatic mural — and run it from floor to ceiling. The bed frame becomes secondary; the wall is the headboard." },
      { type: "h2", text: "2. The fireplace chimney breast" },
      { type: "p", text: "In rooms with a chimney breast, the recessed planes on either side of the breast are crying out for wallpaper. Paper the breast itself and the two flanking alcoves in the same design, and you create a unified focal point that anchors the entire room. Leave the rest of the walls plain." },
      { type: "h2", text: "3. The under-stair nook" },
      { type: "p", text: "Every staircase has a triangular void beneath it. Paper the back wall of this space — even if it's only used for storage — and it transforms from dead space into a moment of delight. Bold, dark, maximalist choices work particularly well here because the scale of the area keeps them in check." },
      { type: "h2", text: "4. The powder room" },
      { type: "p", text: "A powder room or guest WC is the best room in the house to take a wallpaper risk. You're never in there long enough to tire of it, guests see it and remember it, and the small scale means a full-room commit doesn't require many rolls. Go as dramatic as you dare." },
      { type: "quote", text: "The powder room is the only room in a house where every visitor forms an opinion. Make it worth forming.", attribution: "Sofia Laurent" },
      { type: "h2", text: "5. The dining room end wall" },
      { type: "p", text: "In a rectangular dining room, the wall at the short end — usually behind the host's seat — is the natural focal point. Paper it with a design that rewards sustained attention over a dinner: a dense botanical, a scenic mural, an intricate geometric. At candle-lit suppers, it will look extraordinary." },
      { type: "h2", text: "6. The study or home office alcove" },
      { type: "p", text: "Built-in bookshelves flanking a desk create an alcove that's perfectly sized for wallpaper. Paper the back of the alcove, behind the desk, in a design that stimulates rather than soothes — something graphic, bold, or unusual. It will sharpen your focus every time you sit down." },
      { type: "h2", text: "7. The hallway" },
      { type: "p", text: "Hallways are transitional spaces that most people under-invest in. But the hallway is the first interior impression your house makes. A confident wallpapered hallway — perhaps a narrow stripe to emphasise the length, or a rich dark botanical — sets the tone for every room that follows." },
      { type: "h2", text: "8. Inside a wardrobe or armoire" },
      { type: "p", text: "Paper the interior back of a wardrobe, the inside of a sideboard, or the shelved interior of a built-in bookcase. It's a detail that catches people off-guard in the best possible way: a private luxury that makes everyday objects feel considered." },
      { type: "h2", text: "9. The kitchen splashback" },
      { type: "p", text: "An unconventional choice, but one that works beautifully in the right context. A vinyl-coated or glass-fronted wallpaper panel behind a hob or kitchen counter adds a warmth and character that ceramic tiles rarely achieve. Protect it with a panel of tempered glass if it's directly adjacent to cooking." },
      { type: "h2", text: "10. The ceiling" },
      { type: "p", text: "Saved the best for last. A wallpapered ceiling is the move that separates the committed interior enthusiast from the merely interested. In a room with strong natural light, the right paper on the ceiling creates a dappled, shifting quality that changes throughout the day. Botanical designs with light backgrounds work especially well — they read like a canopy overhead." },
      { type: "p", text: "Whatever surface you choose, the principle is the same: pick one, commit to it, and let the rest of the room serve it. Restraint is the secret ingredient in every successful accent wall." },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "How-to": "bg-sky-50 text-sky-700 border-sky-100",
  "Guide": "bg-amber-50 text-amber-700 border-amber-100",
  "Trend": "bg-brand-forest text-brand-gold border-brand-gold",
  "Interview": "bg-violet-50 text-violet-700 border-violet-100",
  "Inspiration": "bg-rose-50 text-rose-700 border-rose-100",
};

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-100">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer gap-4"
        aria-expanded={open}
      >
        <span className="text-base font-medium text-stone-900" style={{ fontFamily: "Inter, sans-serif" }}>{q}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-stone-600 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{a}</p>
        </div>
      )}
    </div>
  );
}

function RelatedCard({ article }: { article: Article }) {
  return (
    <a href={`/journal/${article.slug}`} className="group block cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden rounded-none mb-3">
        <img src={article.imageUrl} alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-none border ${CATEGORY_COLORS[article.category] || ""}`}
            style={{ fontFamily: "Inter, sans-serif" }}>{article.category}</span>
        </div>
      </div>
      <p className="text-xs text-stone-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>{article.date} · {article.readTime}</p>
      <h3 className="text-base font-medium text-stone-900 leading-snug group-hover:text-brand-gold transition-colors duration-200"
        style={{ fontFamily: "'EB Garamond', serif" }}>{article.title}</h3>
    </a>
  );
}

function ArticleBody({ body }: { body: Section[] }) {
  return (
    <div className="prose-murall max-w-none">
      {body.map((section, i) => {
        switch (section.type) {
          case "p":
            return (
              <p key={i} className="text-stone-700 text-lg leading-relaxed mb-6"
                style={{ fontFamily: "Inter, sans-serif" }}>{section.text}</p>
            );
          case "h2":
            return (
              <h2 key={i} className="text-2xl sm:text-3xl font-semibold text-stone-900 mt-12 mb-5"
                style={{ fontFamily: "'EB Garamond', serif" }}>{section.text}</h2>
            );
          case "h3":
            return (
              <h3 key={i} className="text-xl font-semibold text-stone-800 mt-8 mb-3"
                style={{ fontFamily: "'EB Garamond', serif" }}>{section.text}</h3>
            );
          case "quote":
            return (
              <blockquote key={i} className="my-10 pl-6 border-l-2 border-stone-900">
                <p className="text-2xl sm:text-3xl font-medium text-stone-900 leading-snug mb-3 italic"
                  style={{ fontFamily: "'EB Garamond', serif" }}>"{section.text}"</p>
                {section.attribution && (
                  <footer className="text-sm text-stone-500" style={{ fontFamily: "Inter, sans-serif" }}>
                    — {section.attribution}
                  </footer>
                )}
              </blockquote>
            );
          case "list":
            return (
              <ul key={i} className="my-6 space-y-2 pl-0">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-stone-700 text-base"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-stone-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "numbered":
            return (
              <ol key={i} className="my-6 space-y-2 pl-0">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-stone-700 text-base"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    <span className="text-xs font-bold text-stone-400 mt-1 w-5 flex-shrink-0">{j + 1}.</span>
                    {item}
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={i} className="my-8 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-stone-900">
                      {section.head.map((h, j) => (
                        <th key={j} className="text-left py-3 px-4 font-semibold text-stone-900 first:pl-0"
                          style={{ fontFamily: "Inter, sans-serif" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, j) => (
                      <tr key={j} className="border-b border-stone-100">
                        {row.map((cell, k) => (
                          <td key={k} className="py-3 px-4 text-stone-600 first:pl-0 first:font-medium first:text-stone-900"
                            style={{ fontFamily: "Inter, sans-serif" }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "image":
            return (
              <figure key={i} className="my-10">
                <img src={section.src} alt={section.caption} className="w-full aspect-[16/9] object-cover rounded-none" />
                <figcaption className="mt-3 text-xs text-stone-400 text-center"
                  style={{ fontFamily: "Inter, sans-serif" }}>{section.caption}</figcaption>
              </figure>
            );
          case "cta":
            return (
              <div key={i} className="my-10 p-8 bg-stone-900 text-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BF9B5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4" aria-hidden="true">
                  <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="8" x2="16" y1="10" y2="10"/><line x1="8" x2="12" y1="14" y2="14"/>
                </svg>
                <h3 className="text-2xl font-semibold text-white mb-3" style={{ fontFamily: "'EB Garamond', serif" }}>{section.heading}</h3>
                <p className="text-stone-400 text-sm mb-6 max-w-sm mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>{section.body}</p>
                {section.href ? (
                  <a href={section.href}
                    className="inline-block px-8 py-3 bg-white text-stone-900 text-sm font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    {section.buttonText}
                  </a>
                ) : (
                  <button
                    onClick={() => document.dispatchEvent(new CustomEvent("open-rolls-calculator"))}
                    className="px-8 py-3 bg-white text-stone-900 text-sm font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {section.buttonText}
                  </button>
                )}
              </div>
            );
          case "tip":
            return (
              <div key={i} className="my-6 pl-5 border-l-2 py-3 pr-4" style={{ borderColor: "var(--brand-gold)", background: "rgba(191,155,90,0.06)" }}>
                <p className="text-sm text-stone-700" style={{ fontFamily: "Inter, sans-serif" }}>
                  <span className="font-semibold" style={{ color: "var(--brand-forest)" }}>Pro tip: </span>{section.text}
                </p>
              </div>
            );
          case "faq":
            return (
              <div key={i} className="my-8 border-t border-stone-100">
                {section.items.map((item, j) => <FaqItem key={j} q={item.q} a={item.a} />)}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default function JournalArticleClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = article.relatedSlugs
    .map((s) => ARTICLES.find((a) => a.slug === s))
    .filter(Boolean) as Article[];

  const [sampleOpen, setSampleOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      {/* Hero */}
      <div className="relative w-full h-[55vh] min-h-[360px] overflow-hidden">
        <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 max-w-4xl">
          <span className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-none border mb-4 ${CATEGORY_COLORS[article.category] || ""}`}
            style={{ fontFamily: "Inter, sans-serif" }}>{article.category}</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight"
            style={{ fontFamily: "'EB Garamond', serif" }}>{article.title}</h1>
        </div>
      </div>

      {/* Article meta */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-6 border-b border-stone-100">
          <div className="w-9 h-9 rounded-full bg-stone-200 flex items-center justify-center text-sm font-bold text-stone-700 flex-shrink-0">
            {article.author[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-stone-900" style={{ fontFamily: "Inter, sans-serif" }}>{article.author}</p>
            <p className="text-xs text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>{article.date} · {article.readTime}</p>
          </div>
          <a href="/journal" className="ml-auto text-xs text-stone-400 hover:text-stone-900 transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}>← All articles</a>
        </div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="py-12"
        >
          {/* Standfirst */}
          <p className="text-xl sm:text-2xl text-stone-600 leading-relaxed mb-10 font-medium"
            style={{ fontFamily: "'EB Garamond', serif" }}>{article.excerpt}</p>

          <ArticleBody body={article.body} />
        </motion.div>

        {/* Author bio */}
        <div className="py-8 border-t border-stone-100 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center text-base font-bold text-stone-700 flex-shrink-0">
              {article.author[0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>{article.author}</p>
              <p className="text-sm text-stone-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{article.authorBio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-stone-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs text-stone-400 mb-8" style={{ fontFamily: "Inter, sans-serif" }}>Continue reading</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((r) => <RelatedCard key={r.slug} article={r} />)}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-stone-900 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs tracking-widest uppercase text-brand-gold mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Never miss a story</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8" style={{ fontFamily: "'EB Garamond', serif" }}>
            Get the Journal delivered fortnightly
          </h2>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="article-email" className="sr-only">Email address</label>
            <input id="article-email" type="email" placeholder="your@email.com" required
              className="flex-1 px-4 py-3 rounded-none bg-white/10 border border-white/20 text-white placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
              style={{ fontFamily: "Inter, sans-serif" }} />
            <button type="submit" className="px-6 py-3 rounded-none bg-brand-forest text-white text-sm font-semibold hover:bg-brand-forest transition-colors cursor-pointer flex-shrink-0"
              style={{ fontFamily: "Inter, sans-serif" }}>Subscribe</button>
          </form>
        </motion.div>
      </section>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}
