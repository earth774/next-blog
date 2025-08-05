// Client-side utility functions for blog functionality

export interface Post {
  slug: string;
  date: string;
  title: string;
  content: string;
}

// Function to extract unique years from posts
export function getUniqueYears(posts: Post[]): string[] {
  const years = posts
    .map((post) => {
      // Extract year from date (assuming date format includes year)
      const year = post.date.match(/\d{4}/)?.[0];
      return year || "";
    })
    .filter(Boolean);

  return [...new Set(years)].sort((a, b) => b.localeCompare(a)); // Sort descending
}

// Enhanced search function with separate title and year filtering
export function searchAndFilterPosts(
  posts: Post[],
  titleQuery: string,
  selectedYear: string
): Post[] {
  let filteredPosts = posts;

  // Filter by title if query exists
  if (titleQuery.trim()) {
    const searchTerm = titleQuery.toLowerCase().trim();
    filteredPosts = filteredPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by year if selected
  if (selectedYear && selectedYear !== "all") {
    filteredPosts = filteredPosts.filter((post) =>
      post.date.includes(selectedYear)
    );
  }

  return filteredPosts;
}

// Legacy function for backward compatibility
export function searchPosts(posts: Post[], query: string): Post[] {
  if (!query.trim()) return posts;

  const searchTerm = query.toLowerCase().trim();

  return posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(searchTerm);
    const yearMatch = post.date.includes(searchTerm);
    return titleMatch || yearMatch;
  });
}

// Function to paginate posts
export function paginatePosts(
  posts: Post[],
  page: number,
  postsPerPage: number = 25
) {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  return {
    posts: posts.slice(startIndex, endIndex),
    totalPages: Math.ceil(posts.length / postsPerPage),
    totalPosts: posts.length,
    currentPage: page,
    hasNextPage: endIndex < posts.length,
    hasPrevPage: page > 1,
  };
}
