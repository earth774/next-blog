import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Link from "next/link";
import Markdown from "markdown-to-jsx";
import { JetBrains_Mono, Literata, Playfair_Display } from "next/font/google";
import BlogNav from "../BlogNav";
import styles from "./page.module.css";

interface Post {
  slug: string;
  title: string;
  content: string;
  date: string;
  image?: string;
  excerpt?: string;
}

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

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

function formatPostDate(dateValue: string) {
  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getReadingTime(content: string) {
  const plainText = content.replace(/[#*_`>\-\n]/g, " ").replace(/\s+/g, " ").trim();
  const estimatedMinutes = Math.max(1, Math.round(plainText.length / 900));
  return `${estimatedMinutes} min read`;
}

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
  const posts = getAllPosts() as Post[];

  const { previousPost, nextPost } = getPrevAndNextPosts(posts, slug);

  if (!post) {
    return (
      <div
        className={`${literata.className} relative left-1/2 -mt-8 w-screen -translate-x-1/2 bg-[var(--am-bg)] text-[var(--am-text-primary)]`}
      >
        <div className="flex min-h-screen w-full flex-col">
          <BlogNav navLinks={NAV_LINKS} />
          <main className="mx-auto flex w-full max-w-[720px] flex-1 items-center justify-center px-4 py-20 md:px-12">
            <div className="text-center">
              <h1
                className={`${playfairDisplay.className} text-3xl font-bold text-[var(--am-text-primary)]`}
              >
                Post not found
              </h1>
              <p className="mt-3 text-[15px] text-[var(--am-text-secondary)]">
                The requested post was not found.
              </p>
              <Link
                href="/blog"
                className="mt-6 inline-flex items-center gap-1 text-[14px] text-[var(--am-text-muted)] transition-colors hover:text-[var(--am-text-primary)]"
              >
                <span aria-hidden="true">←</span>
                Back to blog
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${literata.className} relative left-1/2 -mt-8 w-screen -translate-x-1/2 bg-[var(--am-bg)] text-[var(--am-text-primary)]`}
    >
      <div className="flex min-h-screen w-full flex-col">
        <BlogNav navLinks={NAV_LINKS} />

        <main className="flex-1 px-4 py-14 md:px-12">
          <article className="mx-auto w-full max-w-[720px]">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-[var(--am-text-muted)] transition-colors hover:text-[var(--am-text-primary)]"
            >
              <span aria-hidden="true">←</span>
              All Posts
            </Link>

            <header className="space-y-4">
              <h1
                className={`${playfairDisplay.className} text-[34px] font-bold leading-[1.25] text-[var(--am-text-primary)] md:text-[40px]`}
              >
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-[13px] text-[var(--am-text-muted)]">
                <time>{formatPostDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{getReadingTime(post.content)}</span>
                <span aria-hidden="true">·</span>
                <span
                  className={`${jetbrainsMono.className} rounded-full bg-[var(--am-accent-soft)] px-[10px] py-[3px] text-[11px] text-[var(--am-accent)]`}
                >
                  {new Date(post.date).getFullYear()}
                </span>
              </div>
            </header>

            <div className="mt-7 h-px w-full bg-[var(--am-border)]" />

            <div className={`${styles.content} mt-8`}>
              <Markdown>{post.content}</Markdown>
            </div>

            <div className="mt-10 h-px w-full bg-[var(--am-border)]" />

            {(previousPost || nextPost) && (
              <nav
                className="flex flex-col gap-8 py-8 text-[14px] md:flex-row md:items-start md:justify-between"
                aria-label="Post navigation"
              >
                {previousPost ? (
                  <Link
                    href={`/blog/${previousPost.slug}`}
                    className="group max-w-[280px] space-y-1"
                  >
                    <p className="text-[12px] text-[var(--am-text-muted)]">← Previous</p>
                    <p className="text-[var(--am-text-primary)] transition-colors group-hover:text-[var(--am-accent)]">
                      {previousPost.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group max-w-[280px] space-y-1 md:text-right"
                  >
                    <p className="text-[12px] text-[var(--am-text-muted)]">Next →</p>
                    <p className="text-[var(--am-text-primary)] transition-colors group-hover:text-[var(--am-accent)]">
                      {nextPost.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
              </nav>
            )}
          </article>
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
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="transition-colors hover:text-[var(--am-text-secondary)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
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
