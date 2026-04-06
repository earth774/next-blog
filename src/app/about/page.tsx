import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Literata, Playfair_Display } from "next/font/google";
import BlogNav from "@/app/blog/BlogNav";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/project", label: "Projects" },
  { href: "/about", label: "About" },
];

const FOOTER_LINKS = [
  { href: "/feed.xml", label: "RSS" },
  { href: "https://x.com/SutthiponGEarth", label: "Twitter" },
  { href: "https://github.com/amiearth", label: "GitHub" },
];

type ExperienceItem = {
  years: string;
  title: string;
  company: string;
  description?: string;
  location?: string;
  highlights?: string[];
};

const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    years: "May 2018 - Present",
    title: "Full-stack Developer",
    company: "MUI BERRYSOFT · Full-time",
    location: "Phayao, Thailand",
    highlights: [
      "Develop web application",
      "Develop web service API",
      "Develop mobile application",
    ],
  },
];

const SKILL_GROUPS = [
  {
    label: "Languages",
    value: "JavaScript · TypeScript · SQL · Bash",
  },
  {
    label: "Backend",
    value: "PostgreSQL · Redis · Docker",
  },
  {
    label: "Frontend",
    value: "React · Next.js · TypeScript · CSS",
  },
  {
    label: "Tooling",
    value: "Git · tmux",
  },
];

// Add metadata for each blog post
export async function generateMetadata() {
  return {
    title: `About | Amiearth`,
    description: `Learn more about Sutthiphong Nuanma (Amiearth), a Software Developer from Chiang Rai, Thailand. Discover my journey, skills, and passion for technology.`,
    keywords: [
      "about",
      "software developer",
      "thailand",
      "chiang rai",
      "web development",
      "programming",
      "career",
      "background",
    ],
    openGraph: {
      title: "About | Amiearth",
      description:
        "Learn more about Sutthiphong Nuanma (Amiearth), a Software Developer from Chiang Rai, Thailand.",
      url: "https://amiearth.com/about",
      siteName: "Amiearth Blog",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: "About | Amiearth",
      description:
        "Learn more about Sutthiphong Nuanma (Amiearth), a Software Developer from Chiang Rai, Thailand.",
    },
    alternates: {
      canonical: "/about",
      types: {
        "application/rss+xml": "https://amiearth.com/feed.xml",
      },
    },
  };
}

// Add caching configuration for better performance
export const revalidate = 86400; // Revalidate every 24 hours (about page changes less frequently)

export default async function About() {
  return (
    <div
      className={`${literata.className} relative left-1/2 -mt-8 w-screen -translate-x-1/2 bg-[var(--am-bg)] text-[var(--am-text-primary)]`}
    >
      <div className="flex min-h-screen w-full flex-col">
        <BlogNav navLinks={NAV_LINKS} />

        <main className="flex-1 px-4 py-16 md:px-12">
          <section className="mx-auto w-full max-w-[720px] space-y-8">
            <div className="h-[240px] w-full overflow-hidden md:h-[340px]">
              <Image
                src="https://images.unsplash.com/photo-1706801484143-9cc962a0e033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Landscape in Chiang Rai"
                width={1080}
                height={340}
                className="h-full w-full object-cover"
                loading="lazy"
                unoptimized
              />
            </div>
            <p className="text-[13px] italic text-[var(--am-text-muted)]">
              Chiang Rai, 2025
            </p>

            <h1
              className={`${playfairDisplay.className} text-4xl font-bold md:text-[42px]`}
            >
              About
            </h1>

            <div className="space-y-5 text-[17px] leading-[1.8] text-[var(--am-text-primary)]">
              <p>
                I&apos;m Earth, a full-stack developer from Chiang Rai in
                northern Thailand. I focus on building reliable web products
                with JavaScript and TypeScript, with a strong emphasis on clean
                architecture and maintainable code.
              </p>
              <p>
                I care deeply about software craftsmanship: clear naming,
                thoughtful APIs, and systems that are easy to reason about.
                My approach is simple-first, then optimize with real data when
                it matters.
              </p>
              <p>
                Outside of coding, I enjoy coffee, reading, and spending time in
                nature. This site is my space to share what I learn while
                building software.
              </p>
            </div>

            <div className="h-px w-full bg-[var(--am-border)]" />

            <section className="space-y-6 pt-1">
              <h2
                className={`${playfairDisplay.className} text-[26px] font-semibold`}
              >
                Experience
              </h2>
              <div>
                {EXPERIENCE_ITEMS.map((item, index) => (
                  <div
                    key={item.title}
                    className={`flex flex-col gap-3 py-7 md:flex-row md:gap-8 ${
                      index < EXPERIENCE_ITEMS.length - 1
                        ? "border-b border-[var(--am-border)]"
                        : ""
                    }`}
                  >
                    <p className="w-24 shrink-0 font-mono text-[12px] text-[var(--am-text-muted)]">
                      {item.years}
                    </p>
                    <div className="space-y-1.5">
                      <p className="text-[16px] font-semibold text-[var(--am-text-primary)]">
                        {item.title}
                      </p>
                      <p className="text-[14px] text-[var(--am-text-secondary)]">
                        {item.company}
                      </p>
                      {item.location ? (
                        <p className="text-[14px] text-[var(--am-text-secondary)]">
                          {item.location}
                        </p>
                      ) : null}
                      {item.highlights ? (
                        <ul className="list-disc space-y-1 pl-5 text-[14px] leading-[1.6] text-[var(--am-text-primary)]">
                          {item.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[14px] leading-[1.6] text-[var(--am-text-secondary)]">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-px w-full bg-[var(--am-border)]" />

            <section className="space-y-6 pt-1">
              <h2
                className={`${playfairDisplay.className} text-[26px] font-semibold`}
              >
                Skills
              </h2>
              <div className="space-y-4 py-2">
                {SKILL_GROUPS.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-1 md:flex-row md:gap-8"
                  >
                    <p className="w-[120px] shrink-0 font-mono text-[12px] text-[var(--am-text-muted)]">
                      {item.label}
                    </p>
                    <p className="text-[15px] text-[var(--am-text-primary)]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-px w-full bg-[var(--am-border)]" />

            <section className="space-y-4 pt-1 pb-14">
              <h2
                className={`${playfairDisplay.className} text-[26px] font-semibold`}
              >
                Get in touch
              </h2>
              <p className="text-[16px] leading-[1.7] text-[var(--am-text-secondary)]">
                The best way to reach me is by email. I try to respond to
                everyone, though it may take a few days.
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-2 pt-2 text-[15px]">
                <a
                  href="mailto:sutthiphongnuanma@gmail.com"
                  className="text-[var(--am-accent)] transition-colors hover:text-[var(--am-text-primary)]"
                >
                  sutthiphongnuanma@gmail.com
                </a>
                <Link
                  href="https://github.com/amiearth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--am-text-secondary)] transition-colors hover:text-[var(--am-text-primary)]"
                >
                  GitHub
                  <ExternalLink size={13} aria-hidden="true" />
                </Link>
                <Link
                  href="https://x.com/SutthiponGEarth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--am-text-secondary)] transition-colors hover:text-[var(--am-text-primary)]"
                >
                  Twitter
                  <ExternalLink size={13} aria-hidden="true" />
                </Link>
              </div>
            </section>
          </section>
        </main>

        <footer className="border-t border-[var(--am-border)]">
          <div className="hidden h-16 w-full items-center justify-between px-12 md:flex">
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
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
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
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
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

      {/* Structured Data for About Page */}
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
            description:
              "Software Developer from Chiang Rai, Thailand with expertise in modern web technologies",
            knowsAbout: [
              "Web Development",
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Laravel",
              "MySQL",
              "PostgreSQL",
            ],
          }),
        }}
      />
    </div>
  );
}
