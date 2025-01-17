import { getAllPosts } from "@/lib/posts";
import RSS from "rss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amiearth Blog",
  description: "Amiearth Blog",
  alternates: {
    types: {
      "application/rss+xml": "https://amiearth.com/feed.xml",
    },
  },
};

export async function GET() {
  const feed = new RSS({
    title: "Amiearth Blog",
    description: "Amiearth Blog",
    site_url: "https://amiearth.com",
    feed_url: "https://amiearth.com/feed.xml",
    copyright: `${new Date().getFullYear()} Amiearth`,
    language: "en",
    pubDate: new Date(),
  });

  const posts = await getAllPosts();

  posts.map((post) => {
    feed.item({
      title: post.title,
      guid: `https://amiearth.com/${post.slug}`,
      url: `https://amiearth.com/${post.slug}`,
      date: post.date,
      description: post.content.slice(0, 1000),
      author: "Sutthipong Nuanma",
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
