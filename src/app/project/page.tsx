import Link from "next/link";
import { getAllProjects, Project } from "@/lib/projects";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/app/components/Header"));
const Footer = dynamic(() => import("@/app/components/Footer"));
const MainLayout = dynamic(() => import("@/app/components/MainLayout"));

export async function generateMetadata() {
  return {
    title: "Projects | Amiearth",
    description:
      "Explore my portfolio of software projects, web applications, and experiments. From web development to mobile apps, discover the technologies and solutions I've built.",
    keywords: [
      "projects",
      "portfolio",
      "web development",
      "software",
      "applications",
      "experiments",
      "coding projects",
    ],
    openGraph: {
      title: "Projects | Amiearth",
      description:
        "Explore my portfolio of software projects, web applications, and experiments.",
      url: "https://amiearth.com/project",
      siteName: "Amiearth Blog",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Projects | Amiearth",
      description:
        "Explore my portfolio of software projects, web applications, and experiments.",
    },
    alternates: {
      canonical: "/project",
      types: {
        "application/rss+xml": "https://amiearth.com/feed.xml",
      },
    },
  };
}

// Add caching configuration for better performance
export const revalidate = 86400; // Revalidate every 24 hours (projects change less frequently)

// Function to get status badge styling and text
const getStatusBadge = (status: "active" | "closed" | "maintenance") => {
  switch (status) {
    case "active":
      return {
        text: "Live",
        emoji: "⚡",
        className:
          "bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-lg hover:shadow-xl hover:from-emerald-100 hover:via-green-100 hover:to-emerald-100 transition-all duration-300 badge-active backdrop-blur-sm",
        dotColor: "bg-emerald-400 shadow-emerald-400/50",
        pulseClass: "animate-status-pulse",
      };
    case "maintenance":
      return {
        text: "Maintenance",
        emoji: "🔧",
        className:
          "bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 text-amber-700 border border-amber-200/60 shadow-lg hover:shadow-xl hover:from-amber-100 hover:via-orange-100 hover:to-amber-100 transition-all duration-300 backdrop-blur-sm",
        dotColor: "bg-amber-400 shadow-amber-400/50",
        pulseClass: "animate-pulse",
      };
    case "closed":
      return {
        text: "Archived",
        emoji: "📦",
        className:
          "bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 text-slate-600 border border-slate-200/60 shadow-md hover:shadow-lg hover:from-slate-100 hover:via-gray-100 hover:to-slate-100 transition-all duration-300 backdrop-blur-sm",
        dotColor: "bg-slate-400 shadow-slate-400/30",
        pulseClass: "",
      };
    default:
      return {
        text: "Live",
        emoji: "⚡",
        className:
          "bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-lg hover:shadow-xl hover:from-emerald-100 hover:via-green-100 hover:to-emerald-100 transition-all duration-300 badge-active backdrop-blur-sm",
        dotColor: "bg-emerald-400 shadow-emerald-400/50",
        pulseClass: "animate-status-pulse",
      };
  }
};

export default function ProjectsPage() {
  const projects: Project[] = getAllProjects();

  return (
    <div>
      <Header />
      <MainLayout>
        <div className="space-y-16 mt-12">
          {/* Header Section - Minimal & Clean */}
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-2">💪 Projects</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Things I&apos;ve built and experimented with
            </p>
          </div>

          {/* Projects List - Clean & Spacious */}
          <div className="space-y-1">
            {projects.map((project: Project, index: number) => (
              <Link
                key={project.slug}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative py-8 px-6 md:px-8 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                    {/* Left: Icon + Title + Description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4 mb-3">
                        <span className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {project.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#51a800] dark:group-hover:text-[#6bc924] transition-colors duration-300">
                            {project.title ||
                              project.link
                                .replace(/https?:\/\//, "")
                                .replace(/\/$/, "")}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Status + Date + Arrow */}
                    <div className="flex items-center gap-6 md:gap-8 flex-shrink-0">
                      {/* Status Badge - Minimal */}
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            getStatusBadge(project.status).dotColor
                          } ${getStatusBadge(project.status).pulseClass}`}
                        ></div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {getStatusBadge(project.status).text}
                        </span>
                      </div>

                      {/* Date - Minimal */}
                      <span className="text-sm text-gray-400 dark:text-gray-500 font-light hidden md:block">
                        {new Date(project.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                      </span>

                      {/* Arrow Icon */}
                      <svg
                        className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-[#51a800] dark:group-hover:text-[#6bc924] group-hover:translate-x-1 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </MainLayout>
      <Footer />

      {/* Structured Data for Projects */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Amiearth Projects",
            description: "Portfolio of software projects and experiments",
            url: "https://amiearth.com/project",
            itemListElement: projects.map((project, index) => ({
              "@type": "SoftwareApplication",
              position: index + 1,
              name: project.title || project.slug,
              description: project.description,
              url: project.link,
              datePublished: project.date,
              applicationCategory: "WebApplication",
              operatingSystem: "Web Browser",
              author: {
                "@type": "Person",
                name: "Sutthiphong Nuanma",
                alternateName: "Amiearth",
              },
            })),
          }),
        }}
      />
    </div>
  );
}
