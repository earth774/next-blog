import { getAllPosts } from "@/lib/posts";
import { jetbrainsMono, literata, playfairDisplay } from "@/lib/fonts";
import BlogClient from "./BlogClient";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";

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
        <SiteNav />

        <main className="flex-1">
          <header className="border-b border-[var(--am-border)] px-4 py-14 md:px-12 md:py-20">
            <div className="mx-auto w-full max-w-[960px]">
              <p
                className={`${jetbrainsMono.className} text-[11px] uppercase tracking-[0.16em] text-[var(--am-accent)]`}
              >
                Blog · {posts.length} posts
              </p>
              <h1
                className={`${playfairDisplay.className} mt-3 text-[44px] font-bold leading-none tracking-[-0.02em] md:text-[64px]`}
              >
                Writing
              </h1>
              <p className="mt-5 max-w-[560px] text-[17px] leading-[1.75] text-[var(--am-text-secondary)]">
                Occasional thoughts on software, systems, and the quiet craft of
                building things.
              </p>
            </div>
          </header>

          <section className="px-4 py-10 md:px-12 md:py-14">
            <div className="mx-auto w-full max-w-[960px]">
              <BlogClient initialPosts={posts} />
            </div>
          </section>
        </main>

        <SiteFooter />
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
