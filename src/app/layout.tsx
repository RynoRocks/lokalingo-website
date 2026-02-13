import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Where Corrections Inspire Progress | LokaLingo",
    template: "%s | LokaLingo",
  },
  description: "LokaLingo empowers language educators with AI-powered tools and gives learners a curriculum built from their real conversations.",
  keywords: ["language learning", "EdTech", "AI curriculum", "language teaching", "CIP", "LokaLingo", "The Living Textbook"],
  authors: [{ name: "LokaLingo" }],
  creator: "LokaLingo",
  metadataBase: new URL("https://lokalingo.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lokalingo.com",
    siteName: "LokaLingo",
    title: "Where Corrections Inspire Progress | LokaLingo",
    description: "LokaLingo empowers language educators with AI-powered tools and gives learners a curriculum built from their real conversations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Where Corrections Inspire Progress | LokaLingo",
    description: "LokaLingo empowers language educators with AI-powered tools and gives learners a curriculum built from their real conversations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
