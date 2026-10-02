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
