import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JournalArticleClient from "./JournalArticleClient";

type Props = { params: Promise<{ slug: string }> };

const ARTICLE_META = [
  {
    slug: "how-to-choose-wallpaper-for-small-rooms",
    title: "How to choose wallpaper for small rooms (without making them feel smaller)",
    excerpt: "The conventional wisdom says avoid bold patterns in small spaces. We beg to differ — here's how to use scale, colour, and placement to your advantage.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
  },
  {
    slug: "peel-and-stick-vs-paste-the-wall",
    title: "Peel & Stick vs Paste-the-Wall: which is right for your project?",
    excerpt: "Both have their place. We break down durability, finish quality, and the real cost difference so you can make the right call for your home.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
  },
  {
    slug: "botanical-wallpaper-trend-2026",
    title: "Why botanical wallpaper is the defining interior trend of 2026",
    excerpt: "From oversized tropical leaves to delicate herbarium prints, the natural world is making its way indoors in a big way this year.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
  },
  {
    slug: "how-many-rolls-do-i-need",
    title: "How many rolls do I need? The definitive wallpaper calculator guide",
    excerpt: "Measure twice, order once. We walk you through the exact formula — accounting for pattern repeat, door and window cutouts, and when to order extra.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
  },
  {
    slug: "best-peel-and-stick-wallpaper",
    title: "Best Peel & Stick Wallpaper 2026: The Definitive Brand Guide",
    excerpt: "We've assessed every major removable wallpaper brand — adhesive quality, print fidelity, wall compatibility, and how cleanly they remove. Here's who actually delivers.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
  },
  {
    slug: "interview-rebel-walls",
    title: "Inside Rebel Walls: the Swedish studio redefining the mural",
    excerpt: "We sat down with Rebel Walls' creative director to talk about their process, their love of imperfect nature, and what's coming in 2027.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
  },
  {
    slug: "living-room-wallpaper-ideas",
    title: "Living Room Wallpaper Ideas: 12 Looks That Interior Designers Actually Recommend",
    excerpt: "The living room is the hardest room to get right — and the one where wallpaper makes the most dramatic difference. Here are 12 ideas worth stealing, from dark feature walls to full-room botanical immersion.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
  },
  {
    slug: "feature-wall-ideas",
    title: "Feature Wall Ideas: How to Choose the Right Wall and Get It Right",
    excerpt: "A feature wall done well is one of the most cost-effective design decisions in a home. Done badly, it looks like an afterthought. The difference is almost always in which wall you choose and how you treat the three walls around it.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
  },
  {
    slug: "wallpaper-for-dark-rooms",
    title: "Wallpaper for Dark Rooms: What Actually Works (and What Makes It Worse)",
    excerpt: "The standard advice for dark rooms — go pale, go light, avoid pattern — is wrong more often than it is right. Here is what actually works in north-facing, low-light, and basement rooms, and why leaning into the darkness frequently produces a better result than fighting it.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
  },
  {
    slug: "dining-room-wallpaper-ideas",
    title: "Dining Room Wallpaper Ideas: 10 Looks That Make Every Meal Feel Like an Occasion",
    excerpt: "The dining room is the strongest argument for bold wallpaper in the house. You sit in it, at close range, for an hour at a time, under lamplight. Here are ten directions that reward exactly that kind of sustained, intimate attention.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
  },
  {
    slug: "how-to-remove-wallpaper",
    title: "How to Remove Wallpaper: The Complete Step-by-Step Guide",
    excerpt: "Wallpaper removal is the step most people rush and then regret. Done correctly, it leaves walls ready to paper or paint immediately. Done badly, it leaves torn plaster, paste residue, and a surface that causes every subsequent finish to fail.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
  },
  {
    slug: "wallpaper-cost-guide",
    title: "How Much Does Wallpaper Cost? A Room-by-Room Price Guide for 2026",
    excerpt: "Most wallpaper cost guides online are useless — vague ranges that tell you nothing about what you will actually spend. This one breaks it down by room, by market tier, and by whether you are hanging it yourself or paying someone else.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
  },
  {
    slug: "kitchen-wallpaper-ideas",
    title: "Kitchen Wallpaper Ideas: What Works, What Doesn't, and 10 Looks Worth Trying",
    excerpt: "Kitchens present the same question as bathrooms: can wallpaper survive here? The answer depends on where in the kitchen and what type of paper. Here is how to get it right — and ten ideas that genuinely work.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
  },
  {
    slug: "wallpaper-trends-2026",
    title: "Wallpaper Trends 2026: The 10 Directions Defining Interiors Right Now",
    excerpt: "From the sustained dominance of dark botanicals to the unexpected return of the dado rail, here is what is actually selling, what designers are specifying, and what is quietly fading out — based on what we are seeing across the market in 2026.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
  },
  {
    slug: "bathroom-wallpaper-ideas",
    title: "Bathroom Wallpaper Ideas: Yes, You Can — Here's How to Do It Right",
    excerpt: "The biggest question about bathroom wallpaper isn't which design to choose — it's whether you can use wallpaper at all. The answer is yes, with conditions. Here's what works, what doesn't, and ten ideas worth stealing.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
  },
  {
    slug: "hallway-wallpaper-ideas",
    title: "Hallway Wallpaper Ideas: 12 Ways to Make Your First Impression Count",
    excerpt: "The hallway is the room every visitor sees first — and the one most homeowners neglect. These twelve wallpaper ideas work with the hallway's specific challenges: narrow widths, high traffic, awkward staircases, and the pressure of first impressions.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
  },
  {
    slug: "bedroom-wallpaper-ideas",
    title: "Bedroom Wallpaper Ideas: 10 Designer-Approved Looks for Every Style",
    excerpt: "The bedroom rewards bolder choices than almost any other room — you're looking at it last thing at night and first thing in the morning. Here are ten wallpaper directions that consistently deliver in the space that matters most.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
  },
  {
    slug: "how-to-wallpaper-a-room",
    title: "How to Wallpaper a Room: A Complete Beginner's Guide",
    excerpt: "Hanging wallpaper yourself is entirely achievable with the right preparation and a methodical approach. This step-by-step guide covers everything from wall prep to trimming the final drop — no professional experience required.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
  },
  {
    slug: "accent-wall-ideas",
    title: "10 accent wall ideas that interior designers actually approve of",
    excerpt: "Forget the feature wall clichés. These are the wallpaper moments that our favourite designers have used to transform ordinary rooms into something memorable.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLE_META.find((a) => a.slug === slug);
  if (!article) notFound();
  const title = `${article.title} — Murall Journal`;
  const description = article.excerpt;
  const image = article.imageUrl;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://murallwallpaper.com/journal/${slug}`,
      images: [{ url: image, width: 1200, height: 900, alt: article.title }],
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

const FAQ_SCHEMAS: Record<string, object> = {
  "how-many-rolls-do-i-need": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How many rolls of wallpaper do I need for a bedroom?", "acceptedAnswer": { "@type": "Answer", "text": "A standard double bedroom (approximately 3.6m × 4.2m walls, 2.4m ceiling height) typically requires 10–12 rolls of standard UK wallpaper with no pattern repeat, or 13–15 rolls with a large pattern repeat (64cm+). Always add at least one extra roll." } },
      { "@type": "Question", "name": "How many rolls do I need for a living room?", "acceptedAnswer": { "@type": "Answer", "text": "A typical living room (4.5m × 5.5m walls, 2.4m ceiling) needs 14–17 rolls with no pattern repeat, or 18–22 rolls with a large repeat. Deduct approximately one roll per door and half a roll per standard window." } },
      { "@type": "Question", "name": "How many rolls for a hallway?", "acceptedAnswer": { "@type": "Answer", "text": "A narrow hallway (1.2m wide, 6m run, 2.4m ceiling) typically needs 6–8 rolls with no pattern repeat, or 8–10 rolls with a large repeat." } },
      { "@type": "Question", "name": "What size is a standard wallpaper roll in the UK?", "acceptedAnswer": { "@type": "Answer", "text": "Standard UK and European wallpaper rolls are 52–53cm wide and 10 metres long, giving approximately 5.2m² of paper per roll." } },
      { "@type": "Question", "name": "What is pattern repeat in wallpaper?", "acceptedAnswer": { "@type": "Answer", "text": "Pattern repeat is the vertical distance before a wallpaper's design starts again. A plain paper has a repeat of zero. A large botanical mural might have a repeat of 64cm, meaning up to 64cm of each strip is trimmed to align the pattern at every seam." } },
      { "@type": "Question", "name": "Should I order extra rolls?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — always order at least one extra roll, ideally 10–15% more. Wallpaper is printed in batches; rolls from a different batch ordered later may not match exactly." } },
    ],
  },
  "feature-wall-ideas": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Which wall should be the feature wall?", "acceptedAnswer": { "@type": "Answer", "text": "The wall your eye goes to first when you enter the room — typically the wall opposite the door, the chimney breast, the sofa wall in a living room, or the head wall behind the bed in a bedroom. These positions work because the eye naturally travels to them. A feature wall on any other position tends to look applied rather than architectural." } },
      { "@type": "Question", "name": "How many rolls do I need for a feature wall?", "acceptedAnswer": { "@type": "Answer", "text": "A typical living room or bedroom feature wall (3.5–4.5m wide, 2.4m ceiling) needs 3–5 rolls with no pattern repeat, or 4–6 rolls with a large pattern repeat. Use a rolls calculator with your exact wall dimensions for a precise figure." } },
      { "@type": "Question", "name": "What colour should the walls be around a feature wall?", "acceptedAnswer": { "@type": "Answer", "text": "Paint the three surrounding walls in the background colour of the wallpaper, or in a warm off-white that relates to the paper's palette. Avoid bright white — it creates a high-contrast cut that makes the feature wall look pasted on. A cohesive tonal relationship between the paper and the surrounding walls is what makes a feature wall read as designed." } },
      { "@type": "Question", "name": "Is a feature wall still in style in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — the feature wall remains the dominant residential wallpaper approach. What has dated is the early 2010s version: a single wall in a bright accent colour against white. What is current is a feature wall as part of a cohesive tonal room — paper, paint, and woodwork working together rather than the paper applied in isolation." } },
      { "@type": "Question", "name": "Should I do a feature wall or wallpaper the whole room?", "acceptedAnswer": { "@type": "Answer", "text": "A feature wall is lower commitment, uses fewer rolls, and works with a wider range of patterns. A full-room hang creates a more immersive environment and suits quieter, more tonal designs. Dining rooms and bedrooms most consistently benefit from four walls. Living rooms and hallways work well with either approach." } },
    ],
  },
  "wallpaper-for-dark-rooms": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the best wallpaper colour for a dark north-facing room?", "acceptedAnswer": { "@type": "Answer", "text": "Warm tones: forest green with warm undertones, terracotta, amber, warm cream (not bright white), deep teal, burgundy, and warm rust. Avoid cool whites, pale greys, and any colour with a blue or cool undertone — these amplify the cold, flat quality of north-facing light rather than counteracting it." } },
      { "@type": "Question", "name": "Should you use dark or light wallpaper in a dark room?", "acceptedAnswer": { "@type": "Answer", "text": "Warm mid-tones or deliberate darkness are usually better than pale. Pale papers in dark rooms look cold and defeated — they reflect the room's cool light back without adding warmth. A warm mid-depth paper counteracts the cool light quality. A deliberately dark paper combined with warm artificial lighting creates an atmospheric jewel-box effect that outperforms any pale treatment." } },
      { "@type": "Question", "name": "Does dark wallpaper make a room feel smaller?", "acceptedAnswer": { "@type": "Answer", "text": "It makes a room feel more enclosed, which is different from smaller. A well-lit room with dark walls feels intimate and deliberate. The variable that matters is lighting, not paper colour. Warm, layered artificial light transforms dark wallpaper from oppressive to enveloping." } },
      { "@type": "Question", "name": "What wallpaper works in a room with no windows?", "acceptedAnswer": { "@type": "Answer", "text": "With no natural light, you control the light quality entirely. Use warm bulbs (2700K) and the full range opens up — including the most dramatic dark papers. A windowless room with a rich, complex paper and warm layered lighting is one of the most successful interior design outcomes possible." } },
      { "@type": "Question", "name": "Does metallic wallpaper help in a dark room?", "acceptedAnswer": { "@type": "Answer", "text": "Warm-toned metallics (gold, bronze, warm champagne) do help — they catch and reflect available light, creating movement and warmth. Cool-toned metallics (silver, chrome) amplify the blue quality of north-facing light and should be avoided in dark rooms." } },
      { "@type": "Question", "name": "What wallpaper should I avoid in a north-facing room?", "acceptedAnswer": { "@type": "Answer", "text": "Cool white and bright white backgrounds, pale grey tones, cool blue or lavender papers, high-contrast black-and-white geometric, and cold metallic finishes. All interact badly with the cool, flat, blue-cast quality of north-facing natural light." } },
    ],
  },
  "dining-room-wallpaper-ideas": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the best wallpaper for a dining room?", "acceptedAnswer": { "@type": "Answer", "text": "Dark botanical wallpaper is the most consistently successful dining room choice — it creates warmth and intimacy under lamplight, rewards close-range attention, and has the theatrical quality that makes a dining room feel like a destination. For period houses, full chinoiserie is equally strong. For contemporary dining rooms, a rich abstract or tonal geometric on all four walls delivers similar atmosphere." } },
      { "@type": "Question", "name": "Should I wallpaper all four walls in a dining room?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, in most cases. The dining room is where four walls most consistently outperforms a feature wall. The enclosed quality of a fully papered dining room creates genuine atmosphere. A feature wall creates decoration; four walls creates an environment." } },
      { "@type": "Question", "name": "What colour wallpaper is best for a dining room?", "acceptedAnswer": { "@type": "Answer", "text": "Dark colours — forest green, deep navy, burgundy, near-black — are the most successful dining room palette. They absorb ambient light, focus attention on the table, and are highly flattering under warm lamplight. Always view your sample under your actual dining lighting before ordering." } },
      { "@type": "Question", "name": "How does wallpaper look under dining room lighting?", "acceptedAnswer": { "@type": "Answer", "text": "Differently to how it looks in daylight. Warm light (2700K pendants, candles) enriches warm tones and makes dark papers look particularly good — rich, atmospheric, flattering. It flattens cool tones. Always view a sample under your actual dining light before ordering, not just in daylight." } },
      { "@type": "Question", "name": "Can I use a mural in a dining room?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — the dining room is one of the best rooms for a single-wall mural, applied to the wall at the head of the table. The table creates a strong horizontal foreground that grounds the mural's vertical scale. A tropical, botanical, or landscape mural on this one wall makes the room immersive without a full four-wall installation." } },
      { "@type": "Question", "name": "How many rolls of wallpaper do I need for a dining room?", "acceptedAnswer": { "@type": "Answer", "text": "A standard dining room (approximately 3.6m × 4.2m, 2.4m ceiling) needs 12–14 rolls for all four walls with no pattern repeat, or 15–18 rolls with a large repeat. A chimney breast feature wall alone needs 3–4 rolls. Use a rolls calculator with your exact dimensions for a precise figure." } },
    ],
  },
  "how-to-remove-wallpaper": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the easiest way to remove wallpaper?", "acceptedAnswer": { "@type": "Answer", "text": "Score with a perforating roller, apply hot water with a tablespoon of fabric softener, wait at least five minutes for the water to reach the paste, then strip from the bottom up with a wide stripping knife held at a shallow angle. Working in small, fully soaked sections is faster than trying to rush large areas." } },
      { "@type": "Question", "name": "Do I need a steam stripper to remove wallpaper?", "acceptedAnswer": { "@type": "Answer", "text": "Not for most jobs. Soaking with hot water and fabric softener is sufficient for single or double layers of modern wallpaper on solid plaster. A steam stripper is worth hiring for multiple layers of old paper, heavily embossed paper, and paper hung directly onto bare plaster without sizing." } },
      { "@type": "Question", "name": "How do I remove wallpaper without damaging the plaster?", "acceptedAnswer": { "@type": "Answer", "text": "Use a perforating roller (not a knife) to score, apply water with a sponge, and hold the stripping knife at a very shallow angle (15–20 degrees). On plasterboard specifically, use minimal water and avoid steam — over-wetting plasterboard damages the paper face of the board." } },
      { "@type": "Question", "name": "How do I remove wallpaper from plasterboard?", "acceptedAnswer": { "@type": "Answer", "text": "Score lightly with a perforating roller (one or two passes only), apply water sparingly with a spray bottle, and wait 3–4 minutes before stripping with a wide knife at a very shallow angle. Avoid steam entirely on plasterboard. If the board's paper face lifts or tears, apply a bonding primer before any further decoration." } },
      { "@type": "Question", "name": "Can I wallpaper over existing wallpaper?", "acceptedAnswer": { "@type": "Answer", "text": "No, as a general rule. Hanging over existing paper adds moisture to old adhesive, which can cause both layers to lift. The only exception is a single layer of firmly adhered, perfectly flat lining paper — which can be papered over directly. Finish paper should always be stripped." } },
      { "@type": "Question", "name": "How long does it take to remove wallpaper from a room?", "acceptedAnswer": { "@type": "Answer", "text": "A standard double bedroom (single layer of modern paper, solid plaster) takes one person 3–5 hours to strip and wash down. Multiple layers or plasterboard takes 6–8 hours. A full stairwell is typically a full day's work due to access difficulty." } },
    ],
  },
  "wallpaper-cost-guide": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How much does it cost to wallpaper a room in the UK?", "acceptedAnswer": { "@type": "Answer", "text": "A standard double bedroom (all four walls, mid-range paper at £40/roll, professional hanging) typically costs £600–£960 total: £400–£480 in materials (12 rolls) plus £200–£480 in labour. DIY reduces the total to £400–£480 in materials. A living room runs to £800–£1,240 total with a professional, or £560–£680 in materials only for DIY." } },
      { "@type": "Question", "name": "Is wallpaper more expensive than paint?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, for materials. A litre of mid-range emulsion covers approximately 12m², making a typical living room paint cost £60–£120 in materials. The equivalent mid-range wallpaper costs £560–£680. However, wallpaper lasts 15–20 years without repainting and adds texture and depth that paint cannot achieve." } },
      { "@type": "Question", "name": "How much does a decorator charge to hang wallpaper?", "acceptedAnswer": { "@type": "Answer", "text": "UK national average is £15–£35 per roll hung, or £150–£280 per day rate. A standard bedroom hang (12 rolls) costs £180–£420 in labour. London commands 20–40% above the national average. Stairwells are priced 30–50% higher per roll than standard rooms due to access difficulty and long drops." } },
      { "@type": "Question", "name": "What is the cheapest way to wallpaper a room?", "acceptedAnswer": { "@type": "Answer", "text": "Paper one feature wall rather than four — this reduces material costs by 70–75%. Choose a mid-range paper (£20–£40 per roll) on a plain or short-repeat design. Hang it yourself on a well-prepared wall. Total cost for a feature wall: £80–£200 in materials plus £50–£80 in tools for a first-time hanger." } },
      { "@type": "Question", "name": "Is expensive wallpaper worth it?", "acceptedAnswer": { "@type": "Answer", "text": "For classic long-term papers — chinoiserie, quality stripe, a timeless botanical — yes. Premium papers (£60–£120 per roll) have better substrate weight, richer colour fidelity, and tend to hang more forgivingly. For a trend-led design you expect to change within five years, mid-range is the better value decision." } },
      { "@type": "Question", "name": "How much wallpaper do I need for a bedroom?", "acceptedAnswer": { "@type": "Answer", "text": "A standard double bedroom (all four walls, 2.4m ceiling) needs 10–12 rolls with no pattern repeat, or 13–16 rolls with a large pattern repeat (64cm+). A feature wall behind the bed typically needs 4–5 rolls. Always order one extra roll as contingency — wallpaper is printed in batches and a second order may not match." } },
    ],
  },
  "kitchen-wallpaper-ideas": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Can you put wallpaper in a kitchen?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — in the low-risk zones of the kitchen (the dining wall, the wall opposite the hob, a kitchen-diner partition wall), any vinyl-coated paper performs well. The wall directly behind the hob must be tiled or purpose-panelled. Ventilation is the key variable everywhere else." } },
      { "@type": "Question", "name": "What is the best wallpaper for a kitchen?", "acceptedAnswer": { "@type": "Answer", "text": "Vinyl-coated paste-the-wall papers are the best all-round kitchen choice — wipeable to washable, good dimensional stability in slightly humid conditions, available in the full range of designs. For walls nearest cooking appliances, choose a paper with a Class 3 washability rating and hang with a fungicidal paste." } },
      { "@type": "Question", "name": "Can you wallpaper behind a kitchen splashback?", "acceptedAnswer": { "@type": "Answer", "text": "No. The splashback position — behind the hob and above the worktop — must be tiled, glass, or a purpose-made splashback panel. Water, heat, and grease make this position unsuitable for any wallpaper. Tile-effect papers work well on adjacent lower-risk walls as a visual complement to a tiled splashback." } },
      { "@type": "Question", "name": "How do I stop kitchen wallpaper from peeling?", "acceptedAnswer": { "@type": "Answer", "text": "The three most common causes of kitchen wallpaper failure: inadequate degreasing before hanging, poor ventilation, and unsealed bottom edges. Wash the wall with sugar soap before sizing, ensure your extractor vents to the outside, and seal all edges with clear silicone caulk where the paper meets the worktop upstand or tiles." } },
      { "@type": "Question", "name": "Is peel-and-stick wallpaper suitable for a kitchen?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, in low-risk zones with good ventilation — the dining wall of a kitchen-diner, a display wall away from the hob and steam appliances. Keep it away from the hob, kettle, and sink area. Premium peel-and-stick is an excellent choice for rental kitchens." } },
      { "@type": "Question", "name": "What wallpaper works best in a small galley kitchen?", "acceptedAnswer": { "@type": "Answer", "text": "A vertical stripe on the end wall draws the eye toward it and makes the corridor feel longer and taller. Avoid busy repeating patterns on all four walls of a galley — one strong end wall with plain tile or paint on the long sides reads better and feels less confined." } },
    ],
  },
  "wallpaper-trends-2026": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the biggest wallpaper trend in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Dark botanical wallpaper remains the dominant residential trend in 2026 — deep-background designs in forest green, teal, and near-black with layered botanical illustrations. The trend has been in place since 2022 and is maturing rather than declining, with the colour palette broadening and the illustration quality increasing." } },
      { "@type": "Question", "name": "What wallpaper colours are popular in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Deep forest green is the defining colour of the decade in interior design. In 2026 it is joined by deep teal, warm near-black with green or brown undertones, and coloured grasscloth papers in rust, sage, and warm stone. Cool greys, which dominated the 2010s, are in significant decline." } },
      { "@type": "Question", "name": "Is maximalist wallpaper still in fashion in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — but the register has shifted. The maximalism current in 2026 is more refined: a single strong paper (often a dark botanical or full-wall mural) with restraint everywhere else. Maximalist wallpaper within a disciplined room, rather than pattern everywhere." } },
      { "@type": "Question", "name": "Are geometric wallpapers out of fashion?", "acceptedAnswer": { "@type": "Answer", "text": "High-contrast black-and-white geometric is in decline and now reads as the 2010s. Tonal geometric — pattern created through two close values of the same colour — is current and growing. The geometry is the same; the contrast is not." } },
      { "@type": "Question", "name": "What wallpaper will look dated in a few years?", "acceptedAnswer": { "@type": "Answer", "text": "Designs most likely to date quickly: high-contrast black-and-white geometric, coastal and nautical motifs, photographic landscape murals, and anything with a cool grey background. Safest long-term bets: grasscloth and natural textures, tonal stripe, botanical in a strong colourway, and painterly mural designs." } },
      { "@type": "Question", "name": "Is green wallpaper still in style in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — deep forest green is arguably the defining interior colour of the entire 2020s decade and shows no sign of declining in 2026. The trend is evolving rather than ending: the palette is broadening into teal and warm near-black, and the designs are becoming more sophisticated and botanically detailed." } },
    ],
  },
  "bathroom-wallpaper-ideas": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Can you use wallpaper in a bathroom?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — in the dry zone of a well-ventilated bathroom, any vinyl-coated wallpaper will perform reliably. Avoid the wet zone (inside or directly above the bath or shower) and ensure the room has an extractor fan that runs for at least 15–20 minutes after showering. Ventilation matters more than paper type." } },
      { "@type": "Question", "name": "What is the best wallpaper for a bathroom?", "acceptedAnswer": { "@type": "Answer", "text": "Vinyl-coated paste-the-wall papers are the best all-round bathroom choice — they have better dimensional stability in humid conditions and are typically wipeable to washable. For maximum moisture resistance near the bath or shower (zone 2), use a solid vinyl commercial paper with a fungicidal paste." } },
      { "@type": "Question", "name": "Will wallpaper go mouldy in a bathroom?", "acceptedAnswer": { "@type": "Answer", "text": "Only in bathrooms with inadequate ventilation. In a well-ventilated bathroom with an extractor fan running 15–20 minutes after every shower, a vinyl-coated paper hung with fungicidal paste will not mould. Standard paste papers or genuine grasscloth in a poorly ventilated bathroom will mould within 6–18 months." } },
      { "@type": "Question", "name": "How do I waterproof bathroom wallpaper?", "acceptedAnswer": { "@type": "Answer", "text": "Apply a coat of clear matt water-based varnish over the hung paper for additional surface protection near splash zones. Seal all cut edges with clear silicone caulk where the paper meets tiles or the bath surround. Neither treatment makes paper suitable for wet zones, but both improve durability in zone 2 positions." } },
      { "@type": "Question", "name": "Can I wallpaper a shower room?", "acceptedAnswer": { "@type": "Answer", "text": "Only the dry walls — those at least 600mm from the shower enclosure. The wet walls inside and immediately adjacent to the shower must be tiled, stone, or a purpose-made wet-room panel. No wallpaper, however moisture-resistant, is suitable for continuous water contact." } },
      { "@type": "Question", "name": "Is a cloakroom or downstairs WC safe for wallpaper?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — a cloakroom or WC with no shower is the safest bathroom environment for wallpaper. There is no steam source, humidity levels are close to the rest of the house, and virtually any paper type performs well. It is the room most often recommended for a bold or expensive paper because the risk is negligible and the impact is high." } },
    ],
  },
  "hallway-wallpaper-ideas": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Is dark wallpaper a good idea in a hallway?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — narrow hallways are one of the best applications for dark wallpaper. The confined width means the pattern surrounds you and reads as immersive rather than oppressive. The solution to a dark hallway feeling gloomy is better lighting, not lighter wallpaper." } },
      { "@type": "Question", "name": "What is the most durable wallpaper for a hallway?", "acceptedAnswer": { "@type": "Answer", "text": "Vinyl-coated papers and papers with a Class 2 or Class 3 abrasion resistance rating perform best in hallways. Avoid untreated paste papers and genuine grasscloth in very high-traffic situations — it is not scrubbable. Always check the durability rating on the label before purchasing for a hallway." } },
      { "@type": "Question", "name": "How many rolls of wallpaper do I need for a hallway?", "acceptedAnswer": { "@type": "Answer", "text": "A standard narrow hallway (1.2m wide, 5m run, 2.4m ceiling) typically needs 6–8 rolls with no pattern repeat, or 8–10 rolls with a large repeat. A stairwell adds significantly more — often 12–16 rolls due to long drops and angled cuts." } },
      { "@type": "Question", "name": "Can I wallpaper a stairwell myself?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, but it requires two people, a proper scaffold platform (not a ladder), and experience with hanging long drops. Each stair drop can be 4–5 metres long. If it is your first wallpapering project, practise on a simpler room first." } },
      { "@type": "Question", "name": "What pattern works best in a narrow hallway?", "acceptedAnswer": { "@type": "Answer", "text": "Vertical designs — stripes, tall botanicals, upward-reaching compositions — work best in narrow hallways because they draw the eye upward and make the space feel taller. Avoid strong horizontal patterns, which emphasise the narrowness. Large-scale designs can work well because the close walls bring you into the pattern." } },
      { "@type": "Question", "name": "Should I use the same wallpaper on the stairs as in the hall?", "acceptedAnswer": { "@type": "Answer", "text": "Using the same paper throughout creates a continuous, intentional environment — the stronger design choice. Different papers for hall and stairs work if the staircase is architecturally distinct and the two papers relate tonally. Avoid two strong contrasting patterns in adjacent zones." } },
    ],
  },
  "bedroom-wallpaper-ideas": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the most popular bedroom wallpaper colour?", "acceptedAnswer": { "@type": "Answer", "text": "Deep botanical greens and midnight navies are consistently the top-searched bedroom wallpaper colours, particularly for feature walls behind the bed. For full-room treatment, warm neutrals and soft botanical designs on pale backgrounds perform better because they are less visually demanding at close range over extended periods." } },
      { "@type": "Question", "name": "Should I wallpaper behind the bed only?", "acceptedAnswer": { "@type": "Answer", "text": "For most bedrooms, yes — the head wall is the natural feature wall and creates the strongest design impact per roll of paper used. Full-room papering works beautifully but requires a quieter design. The head-wall-only approach works with a wider range of patterns, including bold and dense designs." } },
      { "@type": "Question", "name": "Is dark wallpaper bad for small bedrooms?", "acceptedAnswer": { "@type": "Answer", "text": "No. Dark wallpaper in a small bedroom creates a jewel-box effect rather than a confined one, provided it is used on one wall only. A dark head wall with pale walls on either side gives the room depth. Full dark-on-four-walls in a small room with limited light can feel oppressive — that is the specific combination to avoid." } },
      { "@type": "Question", "name": "What wallpaper is best for a bedroom with low ceilings?", "acceptedAnswer": { "@type": "Answer", "text": "A vertical stripe on the head wall is the most effective option — the eye follows the stripe upward and the ceiling appears higher. Avoid strong horizontal patterns on all four walls. A mural that includes vertical elements (trees, tall architectural features) achieves a similar effect." } },
      { "@type": "Question", "name": "Can I use peel-and-stick wallpaper in a bedroom?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — bedrooms are ideal for peel-and-stick because they have low humidity and no cooking or steam. The adhesive performs best in stable, dry conditions. Premium brands will last 7–10 years in a bedroom environment." } },
      { "@type": "Question", "name": "How many rolls do I need for a bedroom feature wall?", "acceptedAnswer": { "@type": "Answer", "text": "A standard double bedroom head wall (typically 3.6–4.0m wide, 2.4m ceiling) needs 3–4 rolls of standard UK paper for a plain design, or 4–5 rolls for a paper with a large pattern repeat. Use a rolls calculator for a precise quantity based on your exact wall dimensions." } },
    ],
  },
  "how-to-wallpaper-a-room": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Do I need to strip old wallpaper before hanging new?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, almost always. Hanging over existing wallpaper adds moisture to old adhesive, which can cause both layers to lift. There are rare cases where a single layer of lining paper over a perfectly adhered original can work, but as a general rule, strip and start from a clean wall." } },
      { "@type": "Question", "name": "What paste should I use for wallpaper?", "acceptedAnswer": { "@type": "Answer", "text": "Check the manufacturer's specification on your wallpaper — it will state the correct paste type. Lightweight papers typically use standard cellulose paste. Heavy vinyl and textured papers often require a heavy-duty or border paste. Paste-the-wall papers use their own formulation applied to the wall, not the paper." } },
      { "@type": "Question", "name": "How long does wallpaper take to dry?", "acceptedAnswer": { "@type": "Answer", "text": "Most papers are touch-dry within 12–24 hours in normal conditions (18–20°C, moderate ventilation). Full bond strength takes 48–72 hours. Avoid moving furniture back against the walls or applying any pressure to seams during this period." } },
      { "@type": "Question", "name": "Can I wallpaper over painted walls?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — painted walls are one of the best substrates, provided the paint is sound, fully dry, and not peeling. Apply a coat of size before hanging. Gloss-painted walls need light sanding first to provide a mechanical key for the adhesive." } },
      { "@type": "Question", "name": "What is the difference between paste-the-wall and paste-the-paper wallpaper?", "acceptedAnswer": { "@type": "Answer", "text": "Paste-the-paper (traditional) applies paste to the back of the paper, which then needs to soak before hanging. This allows the paper to expand with moisture. Paste-the-wall applies paste directly to the wall surface — the paper goes on dry, so no soaking is required and there is no expansion issue. Most modern papers specify paste-the-wall." } },
      { "@type": "Question", "name": "How do I fix air bubbles in wallpaper?", "acceptedAnswer": { "@type": "Answer", "text": "Small bubbles often disappear as the paste dries. If they persist after 24 hours, make a small incision with a sharp blade, inject a small amount of paste with a syringe, and press flat. Wipe off any excess paste immediately with a damp sponge." } },
      { "@type": "Question", "name": "Where do I start when hanging wallpaper?", "acceptedAnswer": { "@type": "Answer", "text": "Never start from a corner — corners are rarely perfectly straight. Start from a point one roll-width from the most prominent corner, using a plumb bob or spirit level to draw a perfectly vertical line. This plumb line is your reference for every subsequent drop." } },
    ],
  },
  "living-room-wallpaper-ideas": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the most popular wallpaper style for living rooms?", "acceptedAnswer": { "@type": "Answer", "text": "Botanical designs consistently top living room wallpaper searches. Dark-background botanicals (forest green, midnight navy) are particularly strong for feature walls. Large-scale geometric patterns are a close second, especially in contemporary and newly-built spaces." } },
      { "@type": "Question", "name": "Should I wallpaper one wall or all four in a living room?", "acceptedAnswer": { "@type": "Answer", "text": "Both work, for different reasons. One wall (typically behind the sofa) is lower commitment and works with bolder, busier patterns. Four walls works best with quieter designs — tonal botanicals, textured grasscloth, subtle geometrics — that read as an enveloping environment rather than a repeating pattern." } },
      { "@type": "Question", "name": "What colour wallpaper is best for a living room?", "acceptedAnswer": { "@type": "Answer", "text": "Deep colours (forest green, midnight blue, charcoal) are the consistent choice of interior designers for living rooms. They create warmth and intimacy in the evening and age well. Lighter and warm neutral papers work well in rooms with limited natural light where you need to preserve brightness." } },
      { "@type": "Question", "name": "How much does it cost to wallpaper a living room?", "acceptedAnswer": { "@type": "Answer", "text": "A full four-wall living room (4.5m × 5.5m, 2.4m ceiling) requires 14–17 rolls of standard UK wallpaper. At mid-range prices (£50–80 per roll), materials alone run to £700–£1,360. Professional hanging typically adds £200–400. A single feature wall cuts material costs by roughly 70%." } },
      { "@type": "Question", "name": "Does wallpaper make a living room look smaller?", "acceptedAnswer": { "@type": "Answer", "text": "Not inherently. Small-scale repeating patterns on light backgrounds can actually make rooms feel larger by implying depth and texture. Dark papers in small living rooms, done well, create an intimate jewel-box effect rather than a confined feeling. The key variable is how confidently the choice is committed to." } },
      { "@type": "Question", "name": "What wallpaper works best in a north-facing living room?", "acceptedAnswer": { "@type": "Answer", "text": "North-facing rooms receive cool indirect light that makes whites feel cold and blues feel grey. Warm colours — terracotta, amber, deep forest green, warm cream — compensate for the cool light quality. Darker papers often work better than expected in north-facing rooms because the contrast between wall and furnishings is less harsh under cool diffuse light." } },
    ],
  },
  "best-peel-and-stick-wallpaper": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Does peel and stick wallpaper damage walls?", "acceptedAnswer": { "@type": "Answer", "text": "Not if applied correctly. On smooth walls with well-cured paint (30+ days old), premium brands remove cleanly without lifting paint. Always test a small patch in an inconspicuous area before hanging a full room." } },
      { "@type": "Question", "name": "How long does peel and stick wallpaper last?", "acceptedAnswer": { "@type": "Answer", "text": "Premium brands (Chasing Paper, Tempaper, Hygge & West) reliably last 5–10 years in normal living conditions. Budget brands may begin lifting at seams after 2–3 years, particularly in humid rooms." } },
      { "@type": "Question", "name": "Can you use peel and stick wallpaper on textured walls?", "acceptedAnswer": { "@type": "Answer", "text": "Not directly. Textured surfaces prevent the adhesive from bonding evenly, causing lifting and bubbling. Apply a skim coat of filler to create a smooth surface before hanging." } },
      { "@type": "Question", "name": "Is peel and stick wallpaper suitable for renters?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — it's specifically designed for this use case. Most tenancy agreements permit peel-and-stick on smooth walls since it leaves no damage. Check your specific agreement before applying." } },
      { "@type": "Question", "name": "How do you remove peel and stick wallpaper?", "acceptedAnswer": { "@type": "Answer", "text": "Start at a corner and pull slowly at a 45-degree angle, close to the wall. Apply gentle heat from a hairdryer if stubborn. Any residual adhesive can be removed with a damp sponge." } },
      { "@type": "Question", "name": "Can I apply peel and stick wallpaper over existing wallpaper?", "acceptedAnswer": { "@type": "Answer", "text": "No. Strip any existing wallpaper first and prepare the bare wall. Applying peel-and-stick over old wallpaper creates an unstable bond that will fail and may damage the original surface on removal." } },
    ],
  },
};

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  return (
    <>
      {FAQ_SCHEMAS[slug] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMAS[slug]) }}
        />
      )}
      <JournalArticleClient params={params} />
    </>
  );
}
