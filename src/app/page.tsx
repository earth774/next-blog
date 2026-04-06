import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { JetBrains_Mono, Literata, Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/project", label: "Projects" },
  { href: "/about", label: "About" },
];

const TECH_STACK = ["TypeScript", "Go", "React", "PostgreSQL", "Docker"];

const FOOTER_LINKS = [
  { href: "/feed.xml", label: "RSS" },
  { href: "https://x.com/SutthiponGEarth", label: "Twitter" },
  { href: "https://github.com/amiearth", label: "GitHub" },
];

// Add metadata for each blog post
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Home | Amiearth`,
    description: `Welcome to Amiearth Blog - Personal blog of Sutthiphong Nuanma, a Software Developer from Chiang Rai, Thailand. Discover insights on web development, programming, and technology.`,
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
    openGraph: {
      title: "Amiearth Blog - Software Developer & Tech Enthusiast",
      description:
        "Personal blog of Sutthiphong Nuanma, a Software Developer from Chiang Rai, Thailand. Sharing insights on web development, programming, and technology.",
      url: "https://amiearth.com",
      siteName: "Amiearth Blog",
      images: [
        {
          url: "https://amiearth.com/profile.jpg",
          width: 1200,
          height: 630,
          alt: "Sutthiphong Nuanma - Software Developer",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Amiearth Blog - Software Developer & Tech Enthusiast",
      description:
        "Personal blog of Sutthiphong Nuanma, a Software Developer from Chiang Rai, Thailand.",
      images: ["https://amiearth.com/profile.jpg"],
    },
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": "https://amiearth.com/feed.xml",
      },
    },
  };
}

// Add caching configuration for better performance
export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  return (
    <div
      className={`${literata.className} relative left-1/2 -mt-8 w-screen -translate-x-1/2 bg-[var(--am-bg)] text-[var(--am-text-primary)]`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col">
        <nav className="h-16 border-b border-[var(--am-border)]">
          <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 md:px-12">
            <div className="flex items-center gap-2 text-[22px] leading-none text-[var(--am-text-primary)]">
              <Link href="/" className={`${playfairDisplay.className} italic`}>
                Earth
              </Link>
              <Link
                href="https://webring.wonderful.software#amiearth.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="วงแหวนเว็บ"
              >
                <Image
                  alt="วงแหวนเว็บ"
                  width={32}
                  height={32}
                  src="https://webring.wonderful.software/webring.black.svg"
                  sizes="32px"
                  loading="lazy"
                />
              </Link>
            </div>

            <div className="hidden items-center gap-9 text-[15px] text-[var(--am-text-secondary)] md:flex">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-[var(--am-text-primary)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <button
              type="button"
              className="text-[15px] text-[var(--am-text-secondary)] md:hidden"
              aria-label="Open navigation menu"
            >
              Menu
            </button>
          </div>
        </nav>

        <main className="flex min-h-[calc(100vh-128px)] items-center justify-center px-4 py-16 md:py-0">
          <section className="flex w-full max-w-[680px] flex-col items-center text-center">
            <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full border-2 border-[var(--am-border)] bg-[var(--am-bg-secondary)]">
              <Image
                src="/profile.jpg"
                alt="Earth profile photo"
                width={84}
                height={84}
                priority
                className="h-[84px] w-[84px] rounded-full object-cover"
                sizes="84px"
              />
            </div>

            <div className="h-7" />

            <div className="flex items-center gap-2">
              <h1
                className={`${playfairDisplay.className} text-5xl font-bold leading-tight text-[var(--am-text-primary)] md:text-[56px]`}
              >
                Earth
              </h1>
              <Link
                href="https://webring.wonderful.software#amiearth.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="วงแหวนเว็บ"
              >
                <Image
                  alt="วงแหวนเว็บ"
                  width={32}
                  height={32}
                  src="https://webring.wonderful.software/webring.black.svg"
                  sizes="32px"
                  loading="lazy"
                />
              </Link>
            </div>

            <p className="mt-1 text-[15px] text-[var(--am-text-muted)]">
              Software Developer · Chiang Rai, Thailand
            </p>

            <p className="mt-5 max-w-[575px] text-[17px] leading-[1.8] text-[var(--am-text-secondary)]">
              I build thoughtful software and write about the craft of
              programming. Currently exploring distributed systems and frontend
              performance.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className={`${jetbrainsMono.className} rounded-full bg-[var(--am-accent-soft)] px-3 py-[5px] text-xs text-[var(--am-accent)]`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/blog"
                className="bg-[var(--am-accent)] px-6 py-[11px] text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Read Blog
              </Link>
              <Link
                href="https://github.com/amiearth"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-[var(--am-border)] px-6 py-[10px] text-sm text-[var(--am-text-primary)] transition-colors hover:bg-[var(--am-bg-secondary)]"
              >
                GitHub
                <ExternalLink size={14} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </main>

        <footer className="border-t border-[var(--am-border)]">
          <div className="mx-auto hidden h-16 w-full max-w-[1440px] items-center justify-between px-12 md:flex">
            <p className="text-[13px] text-[var(--am-text-muted)]">
              © 2026 Earth. Made with care in Chiang Rai.
            </p>
            <div className="flex items-center gap-6 text-[13px] text-[var(--am-text-muted)]">
              {FOOTER_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="transition-colors hover:text-[var(--am-text-secondary)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-3 px-6 py-4 text-center md:hidden">
            <p className="text-[13px] text-[var(--am-text-muted)]">
              © 2026 Earth. Made with care in Chiang Rai.
            </p>
            <div className="flex items-center gap-5 text-[13px] text-[var(--am-text-muted)]">
              {FOOTER_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="transition-colors hover:text-[var(--am-text-secondary)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
