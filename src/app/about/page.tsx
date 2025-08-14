import { getAboutBySlug } from "@/lib/about";
import Markdown from "markdown-to-jsx";
import styles from "./page.module.css";
import dynamic from "next/dynamic";

const MainLayout = dynamic(() => import("@/app/components/MainLayout"));
const Header = dynamic(() => import("@/app/components/Header"));
const Footer = dynamic(() => import("@/app/components/Footer"));

// Add metadata for each blog post
export async function generateMetadata() {
  return {
    title: `About | Amiearth`,
    description: `Learn more about Sutthiphong Nuanma (Amiearth), a Software Developer from Chiang Rai, Thailand. Discover my journey, skills, and passion for technology.`,
    keywords: [
      "about",
      "software developer",
      "thailand",
      "chiang rai",
      "web development",
      "programming",
      "career",
      "background",
    ],
    openGraph: {
      title: "About | Amiearth",
      description:
        "Learn more about Sutthiphong Nuanma (Amiearth), a Software Developer from Chiang Rai, Thailand.",
      url: "https://amiearth.com/about",
      siteName: "Amiearth Blog",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: "About | Amiearth",
      description:
        "Learn more about Sutthiphong Nuanma (Amiearth), a Software Developer from Chiang Rai, Thailand.",
    },
    alternates: {
      canonical: "/about",
      types: {
        "application/rss+xml": "https://amiearth.com/feed.xml",
      },
    },
  };
}

// Add caching configuration for better performance
export const revalidate = 86400; // Revalidate every 24 hours (about page changes less frequently)

export default async function About() {
  const about = await getAboutBySlug("about");

  return (
    <div>
      <Header />
      <MainLayout>
        {/* About Header */}
        <div className={styles.content}>
          <Markdown>{about.content}</Markdown>
        </div>
      </MainLayout>
      <Footer />

      {/* Structured Data for About Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Sutthiphong Nuanma",
            alternateName: "Amiearth",
            jobTitle: "Software Developer",
            worksFor: {
              "@type": "Organization",
              name: "Freelance",
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Chiang Rai",
              addressCountry: "TH",
            },
            url: "https://amiearth.com",
            sameAs: ["https://github.com/amiearth"],
            image: "https://amiearth.com/profile.jpg",
            description:
              "Software Developer from Chiang Rai, Thailand with expertise in modern web technologies",
            knowsAbout: [
              "Web Development",
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Laravel",
              "MySQL",
              "PostgreSQL",
            ],
          }),
        }}
      />
    </div>
  );
}
