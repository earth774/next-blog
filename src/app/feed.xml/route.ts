import { getAllPosts } from "@/lib/posts";
import RSS from "rss";

export async function GET() {
  const feed = new RSS({
    title: "Amiearth Blog - Software Developer & Tech Enthusiast",
    description:
      "Personal blog of Sutthiphong Nuanma, a Software Developer from Chiang Rai, Thailand. Sharing insights on web development, programming, and technology.",
    site_url: "https://amiearth.com",
    feed_url: "https://amiearth.com/feed.xml",
    copyright: `${new Date().getFullYear()} Sutthiphong Nuanma (Amiearth)`,
    language: "en",
    pubDate: new Date(),
    managingEditor: "Sutthiphong Nuanma",
    webMaster: "Sutthiphong Nuanma",
    categories: [
      "Technology",
      "Web Development",
      "Programming",
      "Software Development",
    ],
    ttl: 1440, // 24 hours
  });

  const posts = await getAllPosts();

  posts.map((post) => {
    feed.item({
      title: post.title,
      guid: `https://amiearth.com/blog/${post.slug}`,
      url: `https://amiearth.com/blog/${post.slug}`,
      date: post.date,
      description: post.excerpt || post.content.slice(0, 500),
      author: "Sutthiphong Nuanma",
      categories: ["Technology", "Web Development", "Programming"],
      custom_elements: [
        {
          "content:encoded": post.content,
        },
        {
          "dc:creator": "Sutthiphong Nuanma",
        },
      ],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
}
