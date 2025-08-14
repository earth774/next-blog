import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

interface Post {
  slug: string;
  date: string;
  title: string;
  content: string;
  image?: string;
  excerpt?: string;
}

// Function to get a post by slug
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}/${slug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Generate excerpt from content if not provided
    const excerpt =
      data.excerpt || content.slice(0, 150).replace(/[#*`]/g, "") + "...";

    return {
      slug,
      date: data.date,
      title: data.title,
      content,
      image: data.image || `/images/posts/${slug}/1.webp`, // Default image path
      excerpt,
    };
  } catch (error) {
    console.error(`Error reading file at ${fullPath}:`, error); // Debugging
    return null; // Return null if the file does not exist
  }
}

// Function to get all posts
export function getAllPosts(): Post[] {
  const fileNames = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const posts = fileNames
    .map((fileName) => {
      const slug = fileName;
      return getPostBySlug(slug);
    })
    .filter((post): post is Post => post !== null); // Filter out null values

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}
