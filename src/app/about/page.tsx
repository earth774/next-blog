import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import { jetbrainsMono, literata, playfairDisplay } from "@/lib/fonts";

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

const CONTACT_LINKS = [
  { href: "https://github.com/amiearth", label: "GitHub" },
  { href: "https://x.com/SutthiponGEarth", label: "Twitter" },
];

// Add metadata for the about page
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
  const sectionTitleClassName = `${playfairDisplay.className} text-[26px] font-semibold md:text-[30px]`;

  return (
    <div
      className={`${literata.className} relative left-1/2 -mt-8 w-screen -translate-x-1/2 bg-[var(--am-bg)] text-[var(--am-text-primary)]`}
    >
      <div className="flex min-h-screen w-full flex-col">
        <SiteNav />

        <main className="flex-1">
          <header className="border-b border-[var(--am-border)] px-4 py-14 md:px-12 md:py-20">
            <div className="mx-auto w-full max-w-[720px]">
              <p
                className={`${jetbrainsMono.className} text-[11px] uppercase tracking-[0.16em] text-[var(--am-accent)]`}
              >
                Software Developer · Chiang Rai, Thailand
              </p>
              <h1
                className={`${playfairDisplay.className} mt-3 text-[44px] font-bold leading-none tracking-[-0.02em] md:text-[64px]`}
              >
                About
              </h1>
              <div className="mt-8 inline-flex items-center gap-3">
                <Image
                  src="/profile.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-[var(--am-border)] object-cover"
                  sizes="40px"
                />
                <span className="flex flex-col">
                  <span className="text-[14px] font-medium">
                    Sutthiphong Nuanma
                  </span>
                  <span
                    className={`${jetbrainsMono.className} text-[10px] uppercase tracking-[0.14em] text-[var(--am-text-muted)]`}
                  >
                    Software Developer
                  </span>
                </span>
              </div>
            </div>
          </header>

          <div className="px-4 py-12 md:px-12 md:py-16">
            <div className="mx-auto w-full max-w-[720px]">
              <figure>
                <Image
                  src="https://images.unsplash.com/photo-1706801484143-9cc962a0e033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Landscape in Chiang Rai"
                  width={1080}
                  height={540}
                  className="aspect-[2/1] w-full object-cover"
                  priority
                  unoptimized
                />
                <figcaption
                  className={`${jetbrainsMono.className} mt-3 text-[11px] uppercase tracking-[0.14em] text-[var(--am-text-muted)]`}
                >
                  Chiang Rai, 2025
                </figcaption>
              </figure>

              <div className="mt-10 space-y-5 text-[17px] leading-[1.8] md:text-[18px]">
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

              <section className="mt-14 border-t border-[var(--am-border)] pt-10">
                <h2 className={sectionTitleClassName}>Experience</h2>
                <ul className="mt-4">
                  {EXPERIENCE_ITEMS.map((item) => (
                    <li
                      key={item.title}
                      className="flex flex-col gap-3 border-b border-[var(--am-border)] py-7 last:border-b-0 sm:flex-row sm:gap-8"
                    >
                      <p
                        className={`${jetbrainsMono.className} shrink-0 pt-1 text-[11px] uppercase tracking-[0.12em] text-[var(--am-text-muted)] sm:w-40`}
                      >
                        {item.years}
                      </p>
                      <div className="min-w-0 flex-1 space-y-1.5">
                        <h3
                          className={`${playfairDisplay.className} text-[20px] font-semibold leading-snug`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-[14px] text-[var(--am-text-secondary)]">
                          {item.company}
                          {item.location ? (
                            <>
                              <span aria-hidden="true"> · </span>
                              {item.location}
                            </>
                          ) : null}
                        </p>
                        {item.highlights ? (
                          <ul className="list-disc space-y-1 pt-2 pl-5 text-[15px] leading-[1.65] marker:text-[var(--am-text-muted)]">
                            {item.highlights.map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="pt-2 text-[15px] leading-[1.65] text-[var(--am-text-secondary)]">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-8 border-t border-[var(--am-border)] pt-10">
                <h2 className={sectionTitleClassName}>Skills</h2>
                <dl className="mt-6 space-y-4">
                  {SKILL_GROUPS.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col gap-1 sm:flex-row sm:gap-8"
                    >
                      <dt
                        className={`${jetbrainsMono.className} shrink-0 pt-1 text-[11px] uppercase tracking-[0.12em] text-[var(--am-text-muted)] sm:w-40`}
                      >
                        {item.label}
                      </dt>
                      <dd className="text-[15px] leading-[1.65]">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="mt-14 border-t border-[var(--am-border)] pt-10">
                <h2 className={sectionTitleClassName}>Get in touch</h2>
                <p className="mt-4 text-[16px] leading-[1.7] text-[var(--am-text-secondary)]">
                  The best way to reach me is by email. I try to respond to
                  everyone, though it may take a few days.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 text-[15px]">
                  <a
                    href="mailto:sutthiphongnuanma@gmail.com"
                    className="border border-[var(--am-border)] px-5 py-2 text-[var(--am-accent)] transition-colors hover:bg-[var(--am-bg-secondary)]"
                  >
                    sutthiphongnuanma@gmail.com
                  </a>
                  {CONTACT_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-[var(--am-text-secondary)] transition-colors hover:text-[var(--am-accent)]"
                    >
                      {item.label}
                      <ArrowUpRight
                        size={13}
                        aria-hidden="true"
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>

        <SiteFooter />
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
