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

// Function to get appropriate icon/emoji for each project
const getProjectIcon = (link: string, slug: string): string => {
  const url = link.toLowerCase();

  if (url.includes("chat") || slug.includes("chat")) return "💬";
  if (url.includes("excalidraw") || slug.includes("excalidraw")) return "🎨";
  if (url.includes("formatter") || slug.includes("formatter")) return "🔧";
  if (url.includes("career") || slug.includes("career")) return "🎯";
  if (
    url.includes("infinitymb") &&
    !url.includes("chat") &&
    !url.includes("imsrt")
  )
    return "📱";
  if (url.includes("imsrt") || slug.includes("debt")) return "💰";
  if (url.includes("pixies") || slug.includes("pixies")) return "✨";

  return "🚀"; // default icon
};

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
        <div className="space-y-6 mt-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <span className="text-4xl">🛠️</span>
              Projects
            </h1>
            <p className="text-gray-600">
              Things I&apos;ve built and experimented with
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project: Project) => (
              <Link
                key={project.slug}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 bg-white/50 backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg group-hover:text-[#51a800] transition-colors flex items-center gap-2">
                      <span className="text-xl">
                        {getProjectIcon(project.link, project.slug)}
                      </span>
                      {project.title ||
                        project.link
                          .replace(/https?:\/\//, "")
                          .replace(/\/$/, "")}
                    </h3>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-[#51a800] transition-colors flex-shrink-0 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>

                  <div className="mb-4">
                    <div
                      className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold tracking-wide ${
                        getStatusBadge(project.status).className
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2.5 h-2.5 rounded-full shadow-lg ${
                            getStatusBadge(project.status).dotColor
                          } ${getStatusBadge(project.status).pulseClass}`}
                        ></div>
                        <span className="text-base leading-none">
                          {getStatusBadge(project.status).emoji}
                        </span>
                      </div>
                      <span className="uppercase tracking-wider">
                        {getStatusBadge(project.status).text}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4 text-xs text-gray-400">
                    {new Date(project.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
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
