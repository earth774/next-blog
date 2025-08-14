import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Markdown from "markdown-to-jsx";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const NavMenu = dynamic(() => import("@/app/components/NavMenu"));
const Footer = dynamic(() => import("@/app/components/Footer"));

interface Post {
  title: string;
  content: string;
  date: string;
  image?: string;
  excerpt?: string;
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

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post: Post | null = await getPostBySlug(slug);
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Post not found
          </h1>
          <p className="text-gray-600">The requested post was not found.</p>
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavMenu />
      <article className={styles.blogPost}>
        {/* Post Header */}
        <header className="mb-8">
          <h1 className={styles.title}>{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <time className={styles.date}>
              <em>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </em>
            </time>
            <span className={styles.date}>•</span>
            <span className={styles.date}>By Sutthiphong Nuanma</span>
          </div>
          {/* {post.excerpt && (
            <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-blue-500 pl-4 mb-6">
              {post.excerpt}
            </p>
          )}
          {post.image && (
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )} */}
        </header>

        {/* Post Content */}
        <div className={styles.content}>
          <Markdown>{post.content}</Markdown>
        </div>

        {/* Post Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p>
                Written by <strong>Sutthiphong Nuanma</strong>
              </p>
              <p>Software Developer from Chiang Rai, Thailand</p>
            </div>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </footer>
      </article>
      <Footer />

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
    </>
  );
};

export default BlogPage;
