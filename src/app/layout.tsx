import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-black antialiased max-w-3xl mx-4 mt-8 lg:mx-auto`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
