import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";

export const metadata: Metadata = {
  title: "Murall Wallpaper — Walls that tell stories",
  description: "The world's most beautiful wallpaper, curated from 25 leading global brands. Botanical, geometric, murals, peel & stick, luxury — delivered to 50+ countries.",
  openGraph: {
    title: "Murall Wallpaper — Walls that tell stories",
    description: "The world's most beautiful wallpaper, curated from 25 leading global brands. Delivered to 50+ countries.",
    images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen">
        {/* JSON-LD: Organisation + Website with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Murall Wallpaper",
                url: "https://murallwallpaper.com",
                logo: "https://murallwallpaper.com/assets/brand/logo-website.svg",
                sameAs: [
                  "https://instagram.com/murallwallpaper",
                  "https://pinterest.com/murallwallpaper",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  availableLanguage: "English",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Murall Wallpaper",
                url: "https://murallwallpaper.com",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://murallwallpaper.com/search?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              },
            ]),
          }}
        />
        <CartProvider>
          <SearchProvider>
            {children}
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
