export interface Product {
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  price: number;
  priceUnit: string;
  installType: "paste-the-wall" | "peel-and-stick" | "both";
  imageUrl: string;
  images: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  details: {
    rollWidth: string;
    rollLength: string;
    patternRepeat: string;
    match: string;
    material: string;
    finish: string;
    origin: string;
  };
  tags: string[];
  relatedSlugs: string[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "verdant-canopy",
    name: "Verdant Canopy",
    brand: "Rebel Walls",
    brandSlug: "rebel-walls",
    price: 74,
    priceUnit: "per roll",
    installType: "paste-the-wall",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    images: [
      "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
      "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
      "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    ],
    isBestseller: true,
    rating: 5,
    reviewCount: 214,
    description: "An expansive botanical mural that transforms any wall into a lush, verdant canopy. Sweeping tropical leaves in deep forest greens create a sense of depth and drama, bringing the outside world indoors with breathtaking effect. Printed to order on eco-certified substrate by Rebel Walls, Sweden's most celebrated mural house.",
    details: {
      rollWidth: "52cm (20.5 in)",
      rollLength: "10m (32.8 ft)",
      patternRepeat: "64cm straight match",
      match: "Straight match",
      material: "Non-woven substrate",
      finish: "Matt",
      origin: "Sweden",
    },
    tags: ["Botanical", "Paste-the-Wall", "Eco-certified", "Bestseller", "Mural"],
    relatedSlugs: ["midnight-garden", "emerald-conservatory"],
  },
  {
    slug: "hex-noir",
    name: "Hex Noir",
    brand: "Graham & Brown",
    brandSlug: "graham-brown",
    price: 58,
    priceUnit: "per roll",
    installType: "peel-and-stick",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    images: [
      "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
      "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    ],
    isNew: true,
    rating: 5,
    reviewCount: 87,
    description: "A bold geometric statement in deep noir tones. Interlocking hexagonal forms create a hypnotic, dimensional surface that commands attention without overwhelming a space. Perfect for feature walls in home offices, hallways, and dining rooms. Available as peel-and-stick for renter-friendly installation.",
    details: {
      rollWidth: "52cm (20.5 in)",
      rollLength: "10m (32.8 ft)",
      patternRepeat: "32cm half drop",
      match: "Half drop",
      material: "Vinyl-coated non-woven",
      finish: "Satin",
      origin: "United Kingdom",
    },
    tags: ["Geometric", "Peel & Stick", "Bold", "New", "Renter-friendly"],
    relatedSlugs: ["midnight-garden", "verdant-canopy"],
  },
  {
    slug: "midnight-garden",
    name: "Midnight Garden",
    brand: "Chasing Paper",
    brandSlug: "chasing-paper",
    price: 84,
    priceUnit: "per roll",
    installType: "paste-the-wall",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    images: [
      "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
      "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    ],
    isBestseller: true,
    rating: 5,
    reviewCount: 163,
    description: "A dark, moody garden scene rendered in the deep hours before dawn. Delicate botanicals emerge from an inky background in a palette of midnight blues and forest greens. This is wallpaper for those who understand that the most beautiful rooms are the ones that make you feel something.",
    details: {
      rollWidth: "52cm (20.5 in)",
      rollLength: "10m (32.8 ft)",
      patternRepeat: "53cm straight match",
      match: "Straight match",
      material: "Non-woven substrate",
      finish: "Matt",
      origin: "United States",
    },
    tags: ["Dark & Moody", "Botanical", "Paste-the-Wall", "Bestseller"],
    relatedSlugs: ["verdant-canopy", "hex-noir"],
  },
  {
    slug: "emerald-conservatory",
    name: "Emerald Conservatory",
    brand: "Tempaper",
    brandSlug: "tempaper",
    price: 62,
    priceUnit: "per roll",
    installType: "peel-and-stick",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
    images: [
      "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
      "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    ],
    isNew: true,
    rating: 4,
    reviewCount: 52,
    description: "Step into the golden age of the Victorian conservatory. Lush emerald fronds and botanical specimens rendered in jewel-toned greens on a warm cream ground. Tempaper's signature self-adhesive formula means this luxury look installs in hours and removes cleanly — ideal for rental properties and temporary transformations.",
    details: {
      rollWidth: "52cm (20.5 in)",
      rollLength: "10m (32.8 ft)",
      patternRepeat: "48cm half drop",
      match: "Half drop",
      material: "Self-adhesive vinyl",
      finish: "Matt",
      origin: "United States",
    },
    tags: ["Botanical", "Peel & Stick", "New", "Removable", "Victorian"],
    relatedSlugs: ["verdant-canopy", "midnight-garden"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string): Product[] {
  const product = getProduct(slug);
  if (!product) return [];
  return product.relatedSlugs.map((s) => getProduct(s)).filter(Boolean) as Product[];
}
