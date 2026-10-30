import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "The Muscle Paradise — Unisex Gym, Naubasta, Kanpur",
  description:
    "Two floors: cardio downstairs, weights upstairs. Boys & girls train together. Contest prep for the stage. First session free.",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
