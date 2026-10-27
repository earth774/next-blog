import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import PostMeta from "@/app/components/PostMeta";
import { jetbrainsMono, literata, playfairDisplay } from "@/lib/fonts";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import { getExcerpt } from "@/lib/post-meta";

const TECH_STACK = ["TypeScript", "Go", "React", "PostgreSQL", "Docker"];

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


const SECTION = "border-t border-[var(--am-border)] px-4 py-16 md:px-12 md:py-24";

function SectionHeader({
  id,
  index,
  label,
  title,
  blurb,
  href,
  cta,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  blurb: string;
  href: string;
  cta: string;
}) {
  return (
    <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-[560px]">
        <p
          className={`${jetbrainsMono.className} text-[11px] uppercase tracking-[0.16em] text-[var(--am-text-muted)]`}
        >
          <span className="text-[var(--am-accent)]">{index}</span> / {label}
        </p>
        <h2
          id={id}
          className={`${playfairDisplay.className} mt-3 text-[28px] font-bold leading-tight md:text-[36px]`}
        >
          {title}
        </h2>
        <p className="mt-3 text-[15px] leading-[1.7] text-[var(--am-text-secondary)]">
          {blurb}
        </p>
      </div>
      <Link
        href={href}
        className="group inline-flex shrink-0 items-center gap-1.5 self-start border-b border-[var(--am-accent)] pb-0.5 text-[14px] font-medium text-[var(--am-accent)] md:self-auto"
      >
        {cta}
        <ArrowRight
          size={14}
          aria-hidden="true"
          className="transition-transform motion-safe:group-hover:translate-x-0.5"
        />
      </Link>
    </header>
  );
}

// Same 3:2 frame for every card; imageless posts get a typographic tile so the grid rhythm holds.
function Thumb({ image, label, sizes }: { image?: string; label: string; sizes: string }) {
  return (
    <div className="relative aspect-[3/2] overflow-hidden bg-[var(--am-bg-secondary)]">
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
          sizes={sizes}
        />
      ) : (
        <div className="flex h-full flex-col justify-between bg-[var(--am-accent-soft)] p-5">
          <span
            className={`${jetbrainsMono.className} text-[10px] uppercase tracking-[0.16em] text-[var(--am-accent)]`}
          >
            Amiearth
          </span>
          <span
            className={`${playfairDisplay.className} text-[28px] font-bold italic leading-none text-[var(--am-accent)] transition-transform duration-500 motion-safe:group-hover:translate-x-1 md:text-[32px]`}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const posts = getAllPosts();
  const [featuredPost, ...recentPosts] = posts;
  const latestPosts = recentPosts.slice(0, 4);
  const selectedProjects = getAllProjects()
    .filter((project) => project.category === "project")
    .slice(0, 3);

  return (
    <div
      className={`${literata.className} relative left-1/2 -mt-8 w-screen -translate-x-1/2 bg-[var(--am-bg)] text-[var(--am-text-primary)]`}
    >
      <div className="flex min-h-screen w-full flex-col">
        <SiteNav />

        <main className="flex-1">
          {/* Masthead */}
          <section className="px-4 py-16 md:px-12 md:py-28">
            <div className="mx-auto flex w-full max-w-[960px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-[640px]">
                <h1
                  className={`${playfairDisplay.className} text-[56px] font-bold leading-none tracking-[-0.02em] md:text-[88px]`}
                >
                  Earth
                </h1>
                <p className="mt-5 text-[19px] font-medium md:text-[22px]">
                  Sutthiphong Nuanma
                </p>
                <p
                  className={`${jetbrainsMono.className} mt-2 text-[11px] uppercase tracking-[0.16em] text-[var(--am-accent)]`}
                >
                  Software Developer · Chiang Rai, Thailand
                </p>
                <p className="mt-6 max-w-[540px] text-[17px] leading-[1.8] md:text-[19px] text-[var(--am-text-secondary)]">
                  I build thoughtful software and write about the craft of
                  programming. Currently exploring distributed systems and
                  frontend performance.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-[var(--am-accent)] px-6 py-[11px] text-sm font-semibold text-[var(--am-bg)] transition-opacity hover:opacity-90"
                  >
                    Read Blog
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="https://github.com/earth774"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-[var(--am-border)] px-6 py-[10px] text-sm transition-colors hover:bg-[var(--am-bg-secondary)]"
                  >
                    GitHub
                    <ExternalLink size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4 md:flex-col md:items-end">
                <Image
                  src="/profile.jpg"
                  alt="Sutthiphong Nuanma (Earth)"
                  width={84}
                  height={84}
                  priority
                  className="h-[72px] w-[72px] rounded-full border-2 border-[var(--am-border)] object-cover md:h-[84px] md:w-[84px]"
                  sizes="84px"
                />
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {TECH_STACK.map((tech) => (
                    <span
                      key={tech}
                      className={`${jetbrainsMono.className} rounded-full bg-[var(--am-accent-soft)] px-3 py-[5px] text-xs text-[var(--am-accent)]`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 01 Featured */}
          {featuredPost ? (
            <section className={SECTION} aria-labelledby="featured">
              <div className="mx-auto w-full max-w-[960px]">
                <SectionHeader
                  id="featured"
                  index="01"
                  label="Featured"
                  title="Featured article"
                  blurb="The latest long read — notes from what I'm building and learning right now."
                  href="/blog"
                  cta="View all posts"
                />

                <article className="mt-10 md:mt-12">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group grid gap-6 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-10"
                  >
                    <Thumb
                      image={featuredPost.image}
                      label={featuredPost.tags?.[0] ?? "Writing"}
                      sizes="(max-width: 767px) calc(100vw - 32px), 520px"
                    />
                    <div className="space-y-4">
                      <PostMeta post={featuredPost} />
                      <h3
                        className={`${playfairDisplay.className} text-[28px] font-bold leading-[1.15] tracking-[-0.01em] transition-colors group-hover:text-[var(--am-accent)] md:text-[36px]`}
                      >
                        {featuredPost.title}
                      </h3>
                      <p className="line-clamp-4 text-[16px] leading-[1.75] text-[var(--am-text-secondary)]">
                        {featuredPost.excerpt || getExcerpt(featuredPost.content, 220)}
                      </p>
                      <span className="inline-flex items-center gap-1.5 pt-1 text-[14px] font-medium text-[var(--am-accent)]">
                        Read article
                        <ArrowRight
                          size={14}
                          aria-hidden="true"
                          className="transition-transform motion-safe:group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </article>
              </div>
            </section>
          ) : null}

          {/* 02 Writing */}
          {latestPosts.length > 0 ? (
            <section className={SECTION} aria-labelledby="writing">
              <div className="mx-auto w-full max-w-[960px]">
                <SectionHeader
                  id="writing"
                  index="02"
                  label="Writing"
                  title="Recent writing"
                  blurb="Shorter posts on tools, workflows, and the craft of shipping software."
                  href="/blog"
                  cta="View all"
                />

                <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-12">
                  {latestPosts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
                        <Thumb
                          image={post.image}
                          label={post.tags?.[0] ?? "Writing"}
                          sizes="(max-width: 639px) calc(100vw - 32px), 464px"
                        />
                        <div className="mt-5 space-y-2.5">
                          <PostMeta post={post} />
                          <h3
                            className={`${playfairDisplay.className} line-clamp-2 text-[21px] font-semibold leading-snug transition-colors group-hover:text-[var(--am-accent)] md:text-[23px]`}
                          >
                            {post.title}
                          </h3>
                          <p className="line-clamp-2 text-[15px] leading-[1.65] text-[var(--am-text-secondary)]">
                            {post.excerpt || getExcerpt(post.content)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {/* 03 Projects */}
          {selectedProjects.length > 0 ? (
            <section
              className={`${SECTION} bg-[var(--am-bg-secondary)]/40`}
              aria-labelledby="selected-projects"
            >
              <div className="mx-auto w-full max-w-[960px]">
                <SectionHeader
                  id="selected-projects"
                  index="03"
                  label="Projects"
                  title="Selected projects"
                  blurb="Small tools and products I've designed, built, and still maintain."
                  href="/project"
                  cta="View all projects"
                />

                <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-12 md:grid-cols-3">
                  {selectedProjects.map((project) => {
                    const external = project.link.startsWith("http");
                    return (
                      <li key={project.slug}>
                        <Link
                          href={project.link}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="group block"
                        >
                          <Thumb
                            image={project.image}
                            label={project.title}
                            sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 767px) calc((100vw - 56px) / 2), 304px"
                          />
                          <div className="mt-4 flex items-start justify-between gap-3">
                            <h3
                              className={`${playfairDisplay.className} text-[19px] font-semibold leading-snug transition-colors group-hover:text-[var(--am-accent)]`}
                            >
                              {project.title}
                            </h3>
                            <ArrowUpRight
                              size={16}
                              aria-hidden="true"
                              className="mt-1 shrink-0 text-[var(--am-text-muted)] transition-all group-hover:text-[var(--am-accent)] motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                            />
                          </div>
                          <p className="mt-1 line-clamp-1 text-[14px] text-[var(--am-text-secondary)]">
                            {project.description}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-14 max-w-[640px] text-[15px] leading-[1.7] text-[var(--am-text-secondary)]">
                  More about me, my experience, and how to get in touch.{" "}
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1 text-[var(--am-accent)] underline-offset-4 hover:underline"
                  >
                    About Earth
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </p>
              </div>
            </section>
          ) : null}
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
