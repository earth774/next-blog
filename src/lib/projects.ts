import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "/src/content/projects");

export interface Project {
  slug: string;
  title: string;
  link: string;
  description: string;
  date: string;
  status: "active" | "closed" | "maintenance";
  icon: string;
  category: "project" | "npm" | "wordpress";
}

export function getAllProjects(): Project[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    return getProjectBySlug(slug);
  });

  // Sort posts by status priority (active > maintenance > closed) then by date
  return posts.sort((a, b) => {
    const statusPriority = { active: 3, maintenance: 2, closed: 1 };
    const priorityDiff = statusPriority[b.status] - statusPriority[a.status];

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    // If same status, sort by date (newest first)
    return a.date > b.date ? -1 : 1;
  });
}

export function getProjectBySlug(slug: string): Project {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const { data } = matter(fileContents);

  return {
    slug,
    title:
      data.title ||
      slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()), // Generate title from slug if not provided
    date: data.date,
    link: data.link,
    description: data.description,
    status: data.status || "active", // default to active if not specified
    icon: data.icon || "🚀", // default to rocket emoji if not specified
    category: data.category || "project",
  };
}
