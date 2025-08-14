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

export default function Home() {
  const posts = getAllPosts().slice(0, 3); // Get latest 3 posts
  const projects = getAllProjects().slice(0, 2); // Get latest 2 projects

  return (
    <>
      <Header className="min-h-screen justify-center" />
      <MainLayout>
        {/* Featured Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover insights on web development, programming, and technology
              from my personal experience
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {post.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 bg-gray-50 -mx-4 px-4 lg:-mx-8 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out some of my recent projects and contributions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
              >
                <h3 className="text-xl font-semibold mb-3">
                  <a
                    href={`/project/${project.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {project.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a
                  href={`/project/${project.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Learn more →
                </a>
              </article>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="/project"
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
            >
              View All Projects
            </a>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Get notified when I publish new articles about web development,
              programming, and technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              No spam, unsubscribe at any time
            </p>
          </div>
        </section>
      </MainLayout>
      <Footer />
    </>
  );
}
