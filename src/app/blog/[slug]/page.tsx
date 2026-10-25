import { EXCERPT_LENGTH, getAllPosts, getPostBySlug } from "@/lib/posts";
import { getExcerpt } from "@/lib/post-meta";
import Image from "next/image";
import Link from "next/link";
import Markdown from "markdown-to-jsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import PostMeta from "@/app/components/PostMeta";
import { jetbrainsMono, literata, playfairDisplay } from "@/lib/fonts";
import type { Post } from "@/lib/blog-utils";
import styles from "./page.module.css";

function getPrevAndNextPosts(posts: Post[], slug: string) {
  const currentIndex = posts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { previousPost: null, nextPost: null };
  }

  return {
    previousPost: posts[currentIndex + 1] ?? null,
    nextPost: posts[currentIndex - 1] ?? null,
  };
}

// Add metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: Post | null = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post not found",
      description: "The requested post was not found.",
      alternates: {
        types: {
          "application/rss+xml": "https://amiearth.com/feed.xml",
        },
      },
    };
  }

  const description =
    post.excerpt || post.content.substring(0, 160).replace(/[#*`]/g, "");

  return {
    title: `${post.title} | Amiearth`,
    description,
    keywords: [
      "blog",
      "web development",
      "programming",
      "technology",
      post.title.toLowerCase(),
    ],
    openGraph: {
      title: post.title,
      description,
      url: `https://amiearth.com/blog/${slug}`,
      siteName: "Amiearth Blog",
      type: "article",
      publishedTime: post.date,
      images: post.image
        ? [
            {
              url: `https://amiearth.com${post.image}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.image ? [`https://amiearth.com${post.image}`] : [],
    },
    alternates: {
      canonical: `/blog/${slug}`,
      types: {
        "application/rss+xml": "https://amiearth.com/feed.xml",
      },
    },
  };
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Add caching configuration for better performance
export const revalidate = 3600; // Revalidate every hour

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post: Post | null = await getPostBySlug(slug);
  const posts = getAllPosts();

  const { previousPost, nextPost } = getPrevAndNextPosts(posts, slug);
  // Only authored excerpts work as a dek; derived ones just repeat the opening paragraph.
  const hasAuthoredExcerpt =
    !!post?.excerpt && post.excerpt !== getExcerpt(post.content, EXCERPT_LENGTH);

  if (!post) {
    return (
      <div
        className={`${literata.className} relative left-1/2 -mt-8 w-screen -translate-x-1/2 bg-[var(--am-bg)] text-[var(--am-text-primary)]`}
      >
        <div className="flex min-h-screen w-full flex-col">
          <SiteNav />
          <main className="mx-auto flex w-full max-w-[720px] flex-1 items-center justify-center px-4 py-20 md:px-12">
            <div className="text-center">
              <p
                className={`${jetbrainsMono.className} text-[11px] uppercase tracking-[0.16em] text-[var(--am-accent)]`}
              >
                404
              </p>
              <h1 className={`${playfairDisplay.className} mt-3 text-[36px] font-bold`}>
                Post not found
              </h1>
              <p className="mt-3 text-[15px] text-[var(--am-text-secondary)]">
                The requested post was not found.
              </p>
              <Link
                href="/blog"
                className="mt-8 inline-flex items-center gap-2 border border-[var(--am-border)] px-5 py-2 text-[14px] text-[var(--am-accent)] transition-colors hover:bg-[var(--am-bg-secondary)]"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Back to blog
              </Link>
            </div>
          </main>
          <SiteFooter />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${literata.className} relative left-1/2 -mt-8 w-screen -translate-x-1/2 bg-[var(--am-bg)] text-[var(--am-text-primary)]`}
    >
      <div className="flex min-h-screen w-full flex-col">
        <SiteNav />

        <main className="flex-1 px-4 py-12 md:px-12 md:py-16">
          <article className="mx-auto w-full max-w-[720px]">
            <Link
              href="/blog"
              className={`${jetbrainsMono.className} group inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[var(--am-text-muted)] transition-colors hover:text-[var(--am-accent)]`}
            >
              <ArrowLeft
                size={13}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-0.5"
              />
              All posts
            </Link>

            <header className="mt-8 space-y-5 border-b border-[var(--am-border)] pb-8">
              <PostMeta post={post} />
              <h1
                className={`${playfairDisplay.className} text-[34px] font-bold leading-[1.15] tracking-[-0.01em] md:text-[48px]`}
              >
                {post.title}
              </h1>
              {hasAuthoredExcerpt ? (
                <p className="text-[18px] leading-[1.7] text-[var(--am-text-secondary)] md:text-[19px]">
                  {post.excerpt}
                </p>
              ) : null}
              <Link href="/about" className="group inline-flex items-center gap-3 pt-1">
                <Image
                  src="/profile.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-[var(--am-border)] object-cover"
                  sizes="40px"
                />
                <span className="flex flex-col">
                  <span className="text-[14px] font-medium transition-colors group-hover:text-[var(--am-accent)]">
                    Sutthiphong Nuanma
                  </span>
                  <span
                    className={`${jetbrainsMono.className} text-[10px] uppercase tracking-[0.14em] text-[var(--am-text-muted)]`}
                  >
                    Software Developer
                  </span>
                </span>
              </Link>
            </header>

            {/* Skip derived images that the body already shows inline */}
            {post.image && !post.content.includes(post.image) ? (
              <Image
                src={post.image}
                alt=""
                width={1200}
                height={800}
                priority
                className="mt-10 aspect-[2/1] w-full object-cover"
                sizes="(max-width: 767px) calc(100vw - 32px), 720px"
              />
            ) : null}

            <div
              className={`${styles.content} ${playfairDisplay.variable} ${jetbrainsMono.variable} mt-10`}
            >
              <Markdown>{post.content}</Markdown>
            </div>

            {(previousPost || nextPost) && (
              <nav
                className="mt-14 grid gap-px border border-[var(--am-border)] bg-[var(--am-border)] sm:grid-cols-2"
                aria-label="Post navigation"
              >
                {previousPost ? (
                  <Link
                    href={`/blog/${previousPost.slug}`}
                    className="group flex flex-col gap-2 bg-[var(--am-bg)] p-6 transition-colors hover:bg-[var(--am-bg-secondary)]"
                  >
                    <span
                      className={`${jetbrainsMono.className} inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[var(--am-text-muted)]`}
                    >
                      <ArrowLeft size={12} aria-hidden="true" />
                      Previous
                    </span>
                    <span
                      className={`${playfairDisplay.className} text-[18px] font-semibold leading-snug transition-colors group-hover:text-[var(--am-accent)]`}
                    >
                      {previousPost.title}
                    </span>
                  </Link>
                ) : (
                  <div className="hidden bg-[var(--am-bg)] sm:block" />
                )}

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group flex flex-col gap-2 bg-[var(--am-bg)] p-6 transition-colors hover:bg-[var(--am-bg-secondary)] sm:items-end sm:text-right"
                  >
                    <span
                      className={`${jetbrainsMono.className} inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[var(--am-text-muted)]`}
                    >
                      Next
                      <ArrowRight size={12} aria-hidden="true" />
                    </span>
                    <span
                      className={`${playfairDisplay.className} text-[18px] font-semibold leading-snug transition-colors group-hover:text-[var(--am-accent)]`}
                    >
                      {nextPost.title}
                    </span>
                  </Link>
                ) : (
                  <div className="hidden bg-[var(--am-bg)] sm:block" />
                )}
              </nav>
            )}
          </article>
        </main>

        <SiteFooter />
      </div>

      {/* Structured Data for Blog Post */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt || post.content.substring(0, 160),
            image: post.image ? `https://amiearth.com${post.image}` : undefined,
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Person",
              name: "Sutthiphong Nuanma",
              alternateName: "Amiearth",
            },
            publisher: {
              "@type": "Organization",
              name: "Amiearth Blog",
              logo: {
                "@type": "ImageObject",
                url: "https://amiearth.com/profile.jpg",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://amiearth.com/blog/${slug}`,
            },
            url: `https://amiearth.com/blog/${slug}`,
          }),
        }}
      />
    </div>
  );
};

export default BlogPage;
