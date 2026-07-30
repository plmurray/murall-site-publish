import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoomPageClient from "./RoomPageClient";
import { ROOMS, RoomKey } from "./data";

type Props = { params: Promise<{ room: string }> };

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
