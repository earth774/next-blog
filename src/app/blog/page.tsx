import { getAllPosts } from "@/lib/posts";
import { literata, playfairDisplay } from "@/lib/fonts";
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
