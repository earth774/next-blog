import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import { jetbrainsMono, literata, playfairDisplay } from "@/lib/fonts";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import { formatPostDate, getExcerpt, getReadingTime } from "@/lib/post-meta";
import type { Post } from "@/lib/blog-utils";

const TECH_STACK = ["TypeScript", "Go", "React", "PostgreSQL", "Docker"];

function PostMeta({ post }: { post: Post }) {
  return (
    <p
      className={`${jetbrainsMono.className} flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.12em] text-[var(--am-text-muted)]`}
    >
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{getReadingTime(post.content)}</span>
      {post.tags?.[0] ? (
        <span className="ml-1 rounded-full bg-[var(--am-accent-soft)] px-2.5 py-[3px] normal-case tracking-normal text-[var(--am-accent)]">
          {post.tags[0]}
        </span>
      ) : null}
    </p>
  );
}

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
          <section className="border-b border-[var(--am-border)] px-4 py-16 md:px-12 md:py-28">
            <div className="mx-auto flex w-full max-w-[960px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-[640px]">
                <p
                  className={`${jetbrainsMono.className} text-[11px] uppercase tracking-[0.16em] text-[var(--am-accent)]`}
                >
                  Software Developer · Chiang Rai, Thailand
                </p>
                <h1
                  className={`${playfairDisplay.className} mt-5 text-[56px] font-bold leading-none tracking-[-0.02em] md:text-[88px]`}
                >
                  Earth
                </h1>
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
                    href="https://github.com/amiearth"
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
                  alt="Earth profile photo"
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

          {/* Latest writing */}
          {featuredPost ? (
            <section className="px-4 py-16 md:px-12 md:py-24" aria-labelledby="latest-writing">
              <div className="mx-auto w-full max-w-[960px]">
                <div className="flex items-baseline justify-between gap-4">
                  <h2
                    id="latest-writing"
                    className={`${playfairDisplay.className} text-[28px] font-bold md:text-[32px]`}
                  >
                    Latest writing
                  </h2>
                  <Link
                    href="/blog"
                    className="inline-flex shrink-0 items-center gap-1.5 text-[14px] text-[var(--am-accent)] transition-colors hover:text-[var(--am-text-primary)]"
                  >
                    All posts
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>

                <article className="mt-10 border-b border-[var(--am-border)] pb-12">
                  <Link href={`/blog/${featuredPost.slug}`} className="group block space-y-4">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span
                        className={`${jetbrainsMono.className} text-[11px] uppercase tracking-[0.14em] text-[var(--am-accent)]`}
                      >
                        Featured
                      </span>
                      <PostMeta post={featuredPost} />
                    </div>
                    {featuredPost.image ? (
                      <div className="overflow-hidden">
                        <Image
                          src={featuredPost.image}
                          alt=""
                          width={1200}
                          height={630}
                          className="aspect-[2/1] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 960px"
                        />
                      </div>
                    ) : null}
                    <h3
                      className={`${playfairDisplay.className} max-w-[800px] text-[32px] font-bold leading-[1.15] tracking-[-0.01em] transition-colors group-hover:text-[var(--am-accent)] md:text-[44px]`}
                    >
                      {featuredPost.title}
                    </h3>
                    <p className="max-w-[720px] text-[17px] leading-[1.75] text-[var(--am-text-secondary)]">
                      {featuredPost.excerpt || getExcerpt(featuredPost.content, 220)}
                    </p>
                    <span className="inline-flex items-center gap-1.5 pt-1 text-[14px] font-medium text-[var(--am-accent)]">
                      Read article
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </article>

                <div>
                  {latestPosts.map((post) => (
                    <article key={post.slug} className="border-b border-[var(--am-border)] last:border-b-0">
                      <Link href={`/blog/${post.slug}`} className="group block space-y-2 py-7">
                        <PostMeta post={post} />
                        <h3
                          className={`${playfairDisplay.className} max-w-[760px] text-[21px] font-semibold leading-snug transition-colors group-hover:text-[var(--am-accent)] md:text-[24px]`}
                        >
                          {post.title}
                        </h3>
                        <p className="line-clamp-2 max-w-[720px] text-[15px] leading-[1.65] text-[var(--am-text-secondary)]">
                          {post.excerpt || getExcerpt(post.content)}
                        </p>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {/* Selected projects */}
          {selectedProjects.length > 0 ? (
            <section
              className="border-t border-[var(--am-border)] bg-[var(--am-bg-secondary)]/40 px-4 py-16 md:px-12 md:py-24"
              aria-labelledby="selected-projects"
            >
              <div className="mx-auto w-full max-w-[960px]">
                <div className="flex items-baseline justify-between gap-4">
                  <h2
                    id="selected-projects"
                    className={`${playfairDisplay.className} text-[28px] font-bold md:text-[32px]`}
                  >
                    Selected projects
                  </h2>
                  <Link
                    href="/project"
                    className="inline-flex shrink-0 items-center gap-1.5 text-[14px] text-[var(--am-accent)] transition-colors hover:text-[var(--am-text-primary)]"
                  >
                    All projects
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>

                <div className="mt-10 grid gap-px border border-[var(--am-border)] bg-[var(--am-border)] md:grid-cols-3">
                  {selectedProjects.map((project) => (
                    <Link
                      key={project.slug}
                      href={project.link}
                      target={project.link.startsWith("http") ? "_blank" : undefined}
                      rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex min-h-[180px] flex-col justify-between gap-6 bg-[var(--am-bg)] p-6 transition-colors hover:bg-[var(--am-bg-secondary)]"
                    >
                      <div className="space-y-2">
                        <h3
                          className={`${playfairDisplay.className} text-[21px] font-semibold leading-snug group-hover:text-[var(--am-accent)]`}
                        >
                          {project.title}
                        </h3>
                        <p className="text-[14px] leading-[1.6] text-[var(--am-text-secondary)]">
                          {project.description}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[13px] text-[var(--am-accent)]">
                        Visit
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>

                <p className="mt-10 max-w-[640px] text-[15px] leading-[1.7] text-[var(--am-text-secondary)]">
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
