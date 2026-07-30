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

export default function JournalArticlePage({ params }: Props) {
  return <JournalArticleClient params={params} />;
}
