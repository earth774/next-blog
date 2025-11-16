import dynamic from "next/dynamic";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

const Header = dynamic(() => import("@/app/components/Header"));
const MainLayout = dynamic(() => import("@/app/components/MainLayout"));
const Footer = dynamic(() => import("@/app/components/Footer"));

// Add metadata for each blog post
export async function generateMetadata() {
  return {
    title: `Home | Amiearth`,
    description: `Welcome to Amiearth Blog - Personal blog of Sutthiphong Nuanma, a Software Developer from Chiang Rai, Thailand. Discover insights on web development, programming, and technology.`,
    keywords: [
      "software developer",
      "web development",
      "programming",
      "thailand",
      "chiang rai",
      "tech blog",
      "coding",
      "nextjs",
      "react",
    ],
    openGraph: {
      title: "Amiearth Blog - Software Developer & Tech Enthusiast",
      description:
        "Personal blog of Sutthiphong Nuanma, a Software Developer from Chiang Rai, Thailand. Sharing insights on web development, programming, and technology.",
      url: "https://amiearth.com",
      siteName: "Amiearth Blog",
      images: [
        {
          url: "https://amiearth.com/profile.jpg",
          width: 1200,
          height: 630,
          alt: "Sutthiphong Nuanma - Software Developer",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Amiearth Blog - Software Developer & Tech Enthusiast",
      description:
        "Personal blog of Sutthiphong Nuanma, a Software Developer from Chiang Rai, Thailand.",
      images: ["https://amiearth.com/profile.jpg"],
    },
  };
}

// Add caching configuration for better performance
export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  const posts = getAllPosts().slice(0, 3); // Get latest 3 posts
  const projects = getAllProjects().slice(0, 2); // Get latest 2 projects

  return (
    <>
      <Header className="min-h-screen justify-center" />

      <Footer />
    </>
  );
}
