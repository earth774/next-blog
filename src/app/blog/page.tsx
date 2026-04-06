import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { Literata, Playfair_Display } from "next/font/google";
import BlogClient from "./BlogClient";
import BlogNav from "./BlogNav";

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

// Add metadata for each blog post
export async function generateMetadata() {
  return {
    title: `Blog | Amiearth`,
    description: `Explore articles on web development, programming, and technology. Learn from real-world experiences and practical insights shared by Sutthiphong Nuanma, a Software Developer from Thailand.`,
    keywords: [
      "blog",
      "web development",
      "programming",
      "technology",
      "software development",
      "coding tutorials",
      "tech insights",
    ],
    openGraph: {
      title: "Blog | Amiearth",
      description:
        "Explore articles on web development, programming, and technology. Learn from real-world experiences and practical insights.",
      url: "https://amiearth.com/blog",
      siteName: "Amiearth Blog",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | Amiearth",
      description:
        "Explore articles on web development, programming, and technology.",
    },
    alternates: {
      canonical: "/blog",
      types: {
        "application/rss+xml": "https://amiearth.com/feed.xml",
      },
    },
  };
}

// Add caching configuration for better performance
export const revalidate = 3600; // Revalidate every hour

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div
      className={`${literata.className} relative left-1/2 -mt-8 w-screen -translate-x-1/2 bg-[var(--am-bg)] text-[var(--am-text-primary)]`}
    >
      <div className="flex min-h-screen w-full flex-col">
        <BlogNav navLinks={NAV_LINKS} />

        <main className="flex-1 px-4 py-16 md:px-12">
          <section className="mx-auto w-full max-w-[720px]">
            <header className="space-y-2">
              <h1
                className={`${playfairDisplay.className} text-4xl font-bold text-[var(--am-text-primary)] md:text-[42px]`}
              >
                Writing
              </h1>
              <p className="text-[16px] leading-[1.6] text-[var(--am-text-secondary)]">
                Occasional thoughts on software, systems, and the quiet craft of
                building things.
              </p>
            </header>

            <BlogClient initialPosts={posts} />
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

      {/* Structured Data for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Amiearth Blog",
            description:
              "Personal blog sharing insights on web development, programming, and technology",
            url: "https://amiearth.com/blog",
            author: {
              "@type": "Person",
              name: "Sutthiphong Nuanma",
              alternateName: "Amiearth",
            },
            blogPost: posts.slice(0, 5).map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.date,
              url: `https://amiearth.com/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: "Sutthiphong Nuanma",
              },
            })),
          }),
        }}
      />
    </div>
  );
}
