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
