import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import ProductPageClient from "./ProductPageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const title = `${product.name} by ${product.brand} — Murall Wallpaper`;
  const description = product.description;
  const image = product.imageUrl;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://murallwallpaper.com/products/${slug}`,
      images: [{ url: image, width: 1200, height: 900, alt: product.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function ProductPage({ params }: Props) {
  return <ProductPageClient params={params} />;
}
