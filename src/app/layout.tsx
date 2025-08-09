import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Amiearth Blog",
  description: "Amiearth Blog",
  alternates: {
    types: {
      "application/rss+xml": "https://amiearth.com/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/profile.jpg"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
        <link
          rel="preconnect"
          href="https://pagead2.googlesyndication.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://webring.wonderful.software"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://webring.wonderful.software" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-black antialiased max-w-3xl mx-4 mt-8 lg:mx-auto`}
      >
        {children}
        <SpeedInsights />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6751234358755697"
          crossOrigin="anonymous"
        ></script>
      </body>
      <GoogleAnalytics gaId="G-JRKV3SB66K" />
    </html>
  );
}
