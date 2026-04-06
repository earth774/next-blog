import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Literata, Playfair_Display } from "next/font/google";
import BlogNav from "@/app/blog/BlogNav";
import { getAllProjects, Project } from "@/lib/projects";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/project", label: "Projects" },
  { href: "/about", label: "About" },
];

const FOOTER_LINKS = [
  { href: "/feed.xml", label: "RSS" },
  { href: "https://x.com/SutthiponGEarth", label: "Twitter" },
  { href: "https://github.com/amiearth", label: "GitHub" },
];

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

const TABS: { key: Project["category"]; label: string }[] = [
  { key: "project", label: "Project" },
  { key: "npm", label: "NPM" },
  { key: "wordpress", label: "WordPress" },
];

const getStatusLabel = (status: "active" | "closed" | "maintenance") => {
  switch (status) {
    case "active":
      return "Live";
    case "maintenance":
      return "Maintenance";
    case "closed":
      return "Archived";
    default:
      return "Live";
  }
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: Project["category"] }>;
}) {
  const resolvedSearchParams = await searchParams;
  const projects: Project[] = getAllProjects();
  const tabParam = resolvedSearchParams?.tab ?? "project";
  const activeTab = TABS.some((tab) => tab.key === tabParam)
    ? (tabParam as Project["category"])
    : "project";
  const filteredProjects = projects.filter(
    (project) => project.category === activeTab,
  );

  return (
    <div
      className={`${literata.className} relative left-1/2 -mt-8 w-screen -translate-x-1/2 bg-[var(--am-bg)] text-[var(--am-text-primary)]`}
    >
      <div className="flex min-h-screen w-full flex-col">
        <BlogNav navLinks={NAV_LINKS} />

        <main className="flex-1 px-4 py-16 md:px-12">
          <section className="mx-auto w-full max-w-[960px]">
            <header className="space-y-2 pb-12">
              <h1
                className={`${playfairDisplay.className} text-4xl font-bold text-[var(--am-text-primary)] md:text-[42px]`}
              >
                Projects
              </h1>
              <p className="text-[16px] leading-[1.6] text-[var(--am-text-secondary)]">
                Things I&apos;ve built, open-sourced, and occasionally maintain.
              </p>
            </header>

            <nav className="mb-10 flex flex-wrap items-center gap-2">
              {TABS.map((tab) => {
                const isActive = tab.key === activeTab;
                const href =
                  tab.key === "project" ? "/project" : `/project?tab=${tab.key}`;

                return (
                  <Link
                    key={tab.key}
                    href={href}
                    className={`rounded-full border px-3 py-1 text-[13px] transition-colors ${
                      isActive
                        ? "border-[var(--am-accent)] bg-[var(--am-accent-soft)] text-[var(--am-accent)]"
                        : "border-[var(--am-border)] text-[var(--am-text-secondary)] hover:text-[var(--am-text-primary)]"
                    }`}
                    aria-selected={isActive}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </nav>

            <div className="h-px w-full bg-[var(--am-border)]" />

            {filteredProjects.length === 0 ? (
              <div className="py-10 text-[15px] text-[var(--am-text-secondary)]">
                No {activeTab} items yet.
              </div>
            ) : (
              <ul>
                {filteredProjects.map((project) => {
                  const isExternal = project.link.startsWith("http");
                  const projectLinkHost = isExternal
                    ? new URL(project.link).hostname.replace("www.", "")
                    : "Internal";

                  return (
                    <li
                      key={project.slug}
                      className="border-b border-[var(--am-border)] py-9"
                    >
                      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
                        <div className="min-w-0 flex-1 space-y-3">
                          <h2
                            className={`${playfairDisplay.className} text-[28px] leading-tight text-[var(--am-text-primary)] md:text-[32px]`}
                          >
                            {project.title ||
                              project.link
                                .replace(/https?:\/\//, "")
                                .replace(/\/$/, "")}
                          </h2>
                          <p className="text-[15px] leading-[1.7] text-[var(--am-text-secondary)]">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-[var(--am-accent-soft)] px-2.5 py-1 font-mono text-[11px] text-[var(--am-accent)]">
                              {activeTab.toUpperCase()}
                            </span>
                            <span className="rounded-full bg-[var(--am-accent-soft)] px-2.5 py-1 font-mono text-[11px] text-[var(--am-accent)]">
                              {getStatusLabel(project.status)}
                            </span>
                          </div>
                        </div>

                        <div className="flex shrink-0 flex-col items-start gap-2 text-[13px] md:items-end">
                          <Link
                            href={project.link}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-1.5 text-[var(--am-accent)] transition-colors hover:text-[var(--am-text-primary)]"
                          >
                            {projectLinkHost}
                            <ExternalLink size={13} aria-hidden="true" />
                          </Link>
                          <span className="text-[var(--am-text-muted)]">
                            {new Date(project.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </main>

        <footer className="border-t border-[var(--am-border)]">
          <div className="hidden h-16 w-full items-center justify-between px-12 md:flex">
            <p className="text-[13px] text-[var(--am-text-muted)]">
              © 2026 Earth. Made with care in Chiang Rai.
            </p>
            <div className="flex items-center gap-6 text-[13px] text-[var(--am-text-muted)]">
              {FOOTER_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="transition-colors hover:text-[var(--am-text-secondary)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-3 px-6 py-4 text-center md:hidden">
            <p className="text-[13px] text-[var(--am-text-muted)]">
              © 2026 Earth. Made with care in Chiang Rai.
            </p>
            <div className="flex items-center gap-5 text-[13px] text-[var(--am-text-muted)]">
              {FOOTER_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="transition-colors hover:text-[var(--am-text-secondary)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </div>

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
