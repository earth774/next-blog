import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import { jetbrainsMono, literata, playfairDisplay } from "@/lib/fonts";
import { getAllProjects, Project } from "@/lib/projects";

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
        <SiteNav />

        <main className="flex-1">
          <header className="border-b border-[var(--am-border)] px-4 py-14 md:px-12 md:py-20">
            <div className="mx-auto w-full max-w-[960px]">
              <p
                className={`${jetbrainsMono.className} text-[11px] uppercase tracking-[0.16em] text-[var(--am-accent)]`}
              >
                Projects · {projects.length} items
              </p>
              <h1
                className={`${playfairDisplay.className} mt-3 text-[44px] font-bold leading-none tracking-[-0.02em] md:text-[64px]`}
              >
                Projects
              </h1>
              <p className="mt-5 max-w-[560px] text-[17px] leading-[1.75] text-[var(--am-text-secondary)]">
                Things I&apos;ve built, open-sourced, and occasionally maintain.
              </p>
            </div>
          </header>

          <section className="px-4 py-10 md:px-12 md:py-14">
            <div className="mx-auto w-full max-w-[960px]">
              <nav
                className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[var(--am-border)] pb-4"
                aria-label="Project categories"
              >
                {TABS.map((tab) => {
                  const isActive = tab.key === activeTab;
                  const href =
                    tab.key === "project" ? "/project" : `/project?tab=${tab.key}`;

                  return (
                    <Link
                      key={tab.key}
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={`${jetbrainsMono.className} border-b py-1 text-[12px] uppercase tracking-[0.12em] transition-colors ${
                        isActive
                          ? "border-[var(--am-accent)] text-[var(--am-text-primary)]"
                          : "border-transparent text-[var(--am-text-muted)] hover:text-[var(--am-text-secondary)]"
                      }`}
                    >
                      {tab.label}
                    </Link>
                  );
                })}
              </nav>

              {filteredProjects.length === 0 ? (
                <div className="py-20 text-center">
                  <p className={`${playfairDisplay.className} text-[24px] font-semibold`}>
                    Nothing here yet
                  </p>
                  <p className="mt-2 text-[15px] text-[var(--am-text-secondary)]">
                    No {TABS.find((tab) => tab.key === activeTab)?.label} items to show.
                  </p>
                  <Link
                    href="/project"
                    className="mt-6 inline-flex border border-[var(--am-border)] px-5 py-2 text-[14px] text-[var(--am-accent)] transition-colors hover:bg-[var(--am-bg-secondary)]"
                  >
                    View all projects
                  </Link>
                </div>
              ) : (
                <ul>
                  {filteredProjects.map((project) => {
                    const hasLink = project.link !== "#";
                    const isExternal = project.link.startsWith("http");
                    const projectLinkHost = isExternal
                      ? new URL(project.link).hostname.replace("www.", "")
                      : null;
                    const rowClassName =
                      "group flex flex-col gap-5 py-8 sm:flex-row sm:items-start sm:gap-8";
                    const rowContent = (
                      <>
                        {project.image ? (
                          <div className="shrink-0 overflow-hidden sm:w-56">
                            <Image
                              src={project.image}
                              alt=""
                              width={960}
                              height={640}
                              className="aspect-[3/2] w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
                              sizes="(max-width: 639px) calc(100vw - 32px), 224px"
                            />
                          </div>
                        ) : null}
                        <div className="min-w-0 flex-1 space-y-2">
                          <p
                            className={`${jetbrainsMono.className} flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.12em] text-[var(--am-text-muted)]`}
                          >
                            <time dateTime={project.date}>
                              {new Date(project.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                              })}
                            </time>
                            <span aria-hidden="true">·</span>
                            <span
                              className={`ml-1 rounded-full px-2.5 py-[3px] normal-case tracking-normal ${
                                project.status === "closed"
                                  ? "bg-[var(--am-bg-secondary)] text-[var(--am-text-secondary)]"
                                  : "bg-[var(--am-accent-soft)] text-[var(--am-accent)]"
                              }`}
                            >
                              {getStatusLabel(project.status)}
                            </span>
                          </p>
                          <h2
                            className={`${playfairDisplay.className} text-[22px] font-semibold leading-snug transition-colors group-hover:text-[var(--am-accent)] md:text-[26px]`}
                          >
                            {project.title}
                          </h2>
                          <p className="max-w-[640px] text-[15px] leading-[1.65] text-[var(--am-text-secondary)]">
                            {project.description}
                          </p>
                          {projectLinkHost ? (
                            <span className="inline-flex items-center gap-1.5 pt-1 text-[13px] text-[var(--am-accent)]">
                              {projectLinkHost}
                              <ArrowUpRight
                                size={13}
                                aria-hidden="true"
                                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              />
                            </span>
                          ) : null}
                        </div>
                      </>
                    );

                    return (
                      <li
                        key={project.slug}
                        className="border-b border-[var(--am-border)]"
                      >
                        {hasLink ? (
                          <Link
                            href={project.link}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className={rowClassName}
                          >
                            {rowContent}
                          </Link>
                        ) : (
                          <div className={rowClassName}>{rowContent}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>
        </main>

        <SiteFooter />
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
