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
  | { type: "cta"; heading: string; body: string; buttonText: string }
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
                <button
                  onClick={() => document.dispatchEvent(new CustomEvent("open-rolls-calculator"))}
                  className="px-8 py-3 bg-white text-stone-900 text-sm font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {section.buttonText}
                </button>
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
