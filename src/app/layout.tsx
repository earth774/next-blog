import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import ClientWrapper from "@/app/components/ClientWrapper";

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
  title: {
    default: "Amiearth Blog - Software Developer & Tech Enthusiast",
    template: "%s | Amiearth Blog",
  },
  description:
    "Personal blog of Sutthiphong Nuanma, a Software Developer from Chiang Rai, Thailand. Sharing insights on web development, programming, and technology.",
  keywords: [
    "software developer",
    "web development",
    "programming",
    "thailand",
    "chiang rai",
    "tech blog",
    "coding",
    "nextjs",
    "react",
  ],
  authors: [{ name: "Sutthiphong Nuanma" }],
  creator: "Sutthiphong Nuanma",
  publisher: "Amiearth",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://amiearth.com"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "https://amiearth.com/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amiearth.com",
    siteName: "Amiearth Blog",
    title: "Amiearth Blog - Software Developer & Tech Enthusiast",
    description:
      "Personal blog of Sutthiphong Nuanma, a Software Developer from Chiang Rai, Thailand. Sharing insights on web development, programming, and technology.",
    images: [
      {
        url: "https://amiearth.com/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Sutthiphong Nuanma - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amiearth Blog - Software Developer & Tech Enthusiast",
    description:
      "Personal blog of Sutthiphong Nuanma, a Software Developer from Chiang Rai, Thailand.",
    images: ["https://amiearth.com/profile.jpg"],
    creator: "@amiearth",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "G-JRKV3SB66K",
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

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Amiearth" />
        <link rel="apple-touch-icon" href="/profile.jpg" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sutthiphong Nuanma",
              alternateName: "Amiearth",
              jobTitle: "Software Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chiang Rai",
                addressCountry: "TH",
              },
              url: "https://amiearth.com",
              sameAs: ["https://github.com/amiearth"],
              image: "https://amiearth.com/profile.jpg",
              description: "Software Developer from Chiang Rai, Thailand",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-black antialiased max-w-3xl mx-4 mt-8 lg:mx-auto`}
      >
        {children}
        <SpeedInsights />
        <ClientWrapper />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6751234358755697"
          crossOrigin="anonymous"
        ></script>

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
      <GoogleAnalytics gaId="G-JRKV3SB66K" />
    </html>
  );
}
