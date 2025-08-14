import { getAllPosts } from "@/lib/posts";
import dynamic from "next/dynamic";
import BlogClient from "./BlogClient";

const Header = dynamic(() => import("@/app/components/Header"));
const MainLayout = dynamic(() => import("@/app/components/MainLayout"));
const Footer = dynamic(() => import("@/app/components/Footer"));

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

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <MainLayout>
        {/* Blog Header */}

        <div className="mb-8 mt-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <span className="text-4xl">💻</span>
            Blog
          </h1>
          <p className="text-gray-600">
            Sharing insights on web development, programming, and technology
            from my personal experience
          </p>
        </div>

        <BlogClient initialPosts={posts} />
      </MainLayout>
      <Footer />

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
    </>
  );
}
