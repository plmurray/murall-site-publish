import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoomPageClient from "./RoomPageClient";

type Props = { params: Promise<{ room: string }> };

export const ROOMS = {
  "living-room": {
    name: "Living Room",
    headline: "Living room wallpaper",
    subheadline: "Make the room everyone sees first the room they remember longest.",
    description:
      "The living room is where a home tells its story. A single statement wall — botanical, geometric, or dramatically dark — turns an everyday space into something worth lingering in. These are our editors' picks for the room that matters most.",
    metaDescription:
      "Shop living room wallpaper from 12 world-class brands. Botanical murals, bold geometrics, dark feature walls — delivered worldwide from $74/roll.",
    productSlugs: [
      "verdant-canopy",
      "midnight-garden",
      "strawberry-thief",
      "woods-cole-son",
      "diamond-lattice",
      "hummingbirds",
      "imperial-garden",
      "papilio-botanical",
    ],
    tips: [
      {
        heading: "The sofa wall",
        body: "The wall behind your sofa is the natural focal point of a living room. A botanical mural or a bold geometric here anchors the whole space — and it's visible from the moment anyone walks in.",
      },
      {
        heading: "Dark walls, bright rooms",
        body: "A deep, moody wallpaper in a well-lit living room glows rather than closes in. The key is light: natural light from large windows, or warm artificial light that grazes the surface and reveals the texture.",
      },
      {
        heading: "One wall or four",
        body: "For busy, multicoloured patterns: one wall is safer. For quieter, tonal designs — a single-colour botanical, a subtle geometric — four walls create an enveloping, considered result that single-wall treatments can't match.",
      },
    ],
    filterHref: "/products",
  },
  "bedroom": {
    name: "Bedroom",
    headline: "Bedroom wallpaper",
    subheadline: "The one room that's entirely yours. Make it feel like it.",
    description:
      "Bedrooms reward intimacy. A wallpaper behind the bed — botanical, floral, or chinoiserie — replaces the headboard and becomes the room's defining element. These are our picks for spaces that are personal, considered, and genuinely restful.",
    metaDescription:
      "Shop bedroom wallpaper from 12 world-class brands. Vintage florals, soft botanicals, chinoiserie — the perfect feature wall behind your bed, delivered worldwide.",
    productSlugs: [
      "archive-rose",
      "garden-party",
      "papilio-botanical",
      "magnolia-peel-stick",
      "strawberry-thief",
      "hummingbirds",
      "imperial-garden",
      "blackthorn",
    ],
    tips: [
      {
        heading: "The headboard wall",
        body: "Paper the wall behind the bed from floor to ceiling. The bed frame becomes secondary — the wallpaper is the headboard. Choose something with strong vertical movement to draw the eye upward and make the ceiling feel higher.",
      },
      {
        heading: "Peel & Stick for rented bedrooms",
        body: "Renting doesn't mean plain walls. Peel & stick papers go up in an afternoon and come down cleanly when you move — with no damage to the paintwork beneath. Several of our best bedroom designs are available in peel & stick.",
      },
      {
        heading: "Scale in small bedrooms",
        body: "In a small bedroom, a large botanical behind the bed can actually feel calmer than a small repeat — it gives the eye a clear focal point rather than visual noise across every surface.",
      },
    ],
    filterHref: "/products?tag=Vintage+Floral",
  },
  "nursery": {
    name: "Nursery",
    headline: "Nursery wallpaper",
    subheadline: "The first room that's entirely theirs. Make it magical.",
    description:
      "Nursery wallpaper should be joyful, safe, and easy to change as they grow. We favour botanical designs that work from infancy through childhood, and peel & stick papers that go up without fuss and come down without damage when the time comes for something new.",
    metaDescription:
      "Shop nursery wallpaper — child-safe, removable peel & stick and paste options. Soft botanicals and gentle patterns, delivered worldwide. Samples from $12.",
    productSlugs: [
      "magnolia-peel-stick",
      "garden-party",
      "emerald-conservatory",
      "blackthorn",
      "verdant-canopy",
      "papilio-botanical",
    ],
    tips: [
      {
        heading: "Peel & Stick is ideal for nurseries",
        body: "Children's tastes change. Peel & stick papers can be removed cleanly in a few hours — no steaming, no damage — when it's time for something new. All our peel & stick options use pressure-sensitive, non-toxic adhesives.",
      },
      {
        heading: "Botanical over character prints",
        body: "Character wallpaper dates quickly. A botanical or nature-inspired design grows with a child and still looks considered when they're eight years old. It also photographs beautifully, which the nursery Instagram account will thank you for.",
      },
      {
        heading: "One accent wall",
        body: "In a small nursery, paper one wall — typically behind the cot — and paint the remaining three in the darkest shade of the wallpaper's background colour. It's cohesive, calming, and doesn't overwhelm a small room.",
      },
    ],
    filterHref: "/products?install=Peel+%26+Stick",
  },
  "dining-room": {
    name: "Dining Room",
    headline: "Dining room wallpaper",
    subheadline: "The room for long evenings. Give it something worth staring at.",
    description:
      "Dining rooms are made for drama. A dark botanical, a sweeping chinoiserie scene, or a rich floral behind the host's chair rewards sustained attention over a dinner in a way that plain paint simply cannot. These are our picks for the room that earns its boldness.",
    metaDescription:
      "Shop dining room wallpaper — dark botanicals, chinoiserie, vintage florals for a dramatic feature wall. 12 world-class brands, delivered worldwide from $56/roll.",
    productSlugs: [
      "midnight-garden",
      "woods-cole-son",
      "imperial-garden",
      "hummingbirds",
      "strawberry-thief",
      "archive-rose",
      "blackthorn",
      "diamond-lattice",
    ],
    tips: [
      {
        heading: "The end wall",
        body: "In a rectangular dining room, paper the wall at the short end — behind the host's seat. It becomes the focal point for every guest across the table, and at a candlelit dinner, it will look extraordinary.",
      },
      {
        heading: "Dark and dramatic",
        body: "Dining rooms tolerate bold choices better than any other room. A deep botanical or a rich chinoiserie in a dark ground is sophisticated at dinner and still striking in daylight. Don't let anyone talk you into something safer than you want.",
      },
      {
        heading: "Chinoiserie and the art of the room",
        body: "Chinoiserie panels are one of the oldest wallpaper traditions — and one of the most effective. A single scenic design on the main wall creates the feeling of a room designed around a piece of art.",
      },
    ],
    filterHref: "/products?tag=Dark+%26+Moody",
  },
} as const;

export type RoomKey = keyof typeof ROOMS;

export function generateStaticParams() {
  return Object.keys(ROOMS).map((room) => ({ room }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { room } = await params;
  if (!(room in ROOMS)) notFound();
  const data = ROOMS[room as RoomKey];
  const title = `${data.headline} — Murall Wallpaper`;
  const description = data.metaDescription;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://murallwallpaper.com/rooms/${room}`,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function RoomPage({ params }: Props) {
  return <RoomPageClient params={params} />;
}
