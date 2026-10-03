import type { Metadata } from "next";
import CalculatorPageClient from "./CalculatorPageClient";

export const metadata: Metadata = {
  title: "Wallpaper Calculator — How Many Rolls Do You Need? | Murall",
  description: "Free wallpaper rolls calculator. Enter your wall dimensions, door and window count, and pattern repeat to get an exact roll count — including waste and contingency.",
  openGraph: {
    title: "Wallpaper Calculator — How Many Rolls Do You Need?",
    description: "Free wallpaper rolls calculator. Enter your wall dimensions, door and window count, and pattern repeat to get an exact roll count — including waste and contingency.",
    url: "https://murallwallpaper.com/wallpaper-calculator",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Wallpaper Calculator — How Many Rolls Do You Need?",
    description: "Free wallpaper rolls calculator. Enter your wall dimensions to get an exact roll count including pattern repeat waste.",
  },
};

export default function WallpaperCalculatorPage() {
  return <CalculatorPageClient />;
}
