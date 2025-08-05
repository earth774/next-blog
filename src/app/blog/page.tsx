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
    description: `Blog page of amiearth`,
    alternates: {
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
        <BlogClient initialPosts={posts} />
      </MainLayout>
      <Footer />
    </>
  );
}
