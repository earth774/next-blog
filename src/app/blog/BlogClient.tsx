"use client";

import { useMemo, useState } from "react";
import { JetBrains_Mono, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { Search } from "lucide-react";
import { getUniqueYears, searchAndFilterPosts, type Post } from "@/lib/blog-utils";

interface BlogClientProps {
  initialPosts: Post[];
}

const POSTS_PER_PAGE = 6;

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

function getReadingTime(content: string) {
  const plainText = content.replace(/[#*_`>\-\n]/g, " ").replace(/\s+/g, " ").trim();
  const estimatedMinutes = Math.max(1, Math.round(plainText.length / 900));
  return `${estimatedMinutes} min read`;
}

function getExcerpt(content: string) {
  const plainText = content.replace(/[#*_`>\-\n]/g, " ").replace(/\s+/g, " ").trim();
  if (plainText.length <= 130) {
    return plainText;
  }

  return `${plainText.slice(0, 130).trim()}...`;
}

function formatPostDate(dateValue: string) {
  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const availableYears = useMemo(() => getUniqueYears(initialPosts), [initialPosts]);
  const filteredPosts = useMemo(
    () => searchAndFilterPosts(initialPosts, searchQuery, selectedYear),
    [initialPosts, searchQuery, selectedYear]
  );
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const paginatedPosts = useMemo(() => {
    const startIndex = (activePage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, activePage]);

  return (
    <div className="mt-7 w-full">
      <div className="flex flex-col gap-4 border-b border-[var(--am-border)] pb-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-7">
          <button
            type="button"
            onClick={() => {
              setSelectedYear("all");
              setCurrentPage(1);
            }}
            className="group inline-flex flex-col items-center gap-1 text-[14px]"
          >
            <span
              className={`transition-colors ${
                selectedYear === "all"
                  ? "font-semibold text-[var(--am-text-primary)]"
                  : "text-[var(--am-text-muted)] group-hover:text-[var(--am-text-secondary)]"
              }`}
            >
              All
            </span>
            <span
              className={`h-px w-5 bg-[var(--am-accent)] transition-opacity ${
                selectedYear === "all" ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
          {availableYears.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => {
                setSelectedYear(year);
                setCurrentPage(1);
              }}
              className={`text-[14px] transition-colors ${
                selectedYear === year
                  ? "font-semibold text-[var(--am-text-primary)]"
                  : "text-[var(--am-text-muted)] hover:text-[var(--am-text-secondary)]"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <label className="flex w-full max-w-[220px] items-center gap-2 border-b border-[var(--am-border)] py-1 text-[14px] text-[var(--am-text-muted)]">
          <Search size={15} aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search posts..."
            className="w-full bg-transparent text-[var(--am-text-secondary)] outline-none placeholder:text-[var(--am-text-muted)]"
            aria-label="Search posts"
          />
        </label>
      </div>

      {filteredPosts.length > 0 ? (
        <div>
          {paginatedPosts.map((post, index) => (
            <article
              key={post.slug}
              className="border-b border-[var(--am-border)] py-7 last:border-b"
            >
              <Link href={`/blog/${post.slug}`} className="group block space-y-2">
                <div className="flex flex-wrap items-center gap-3 text-[12px]">
                  <span className={`${jetbrainsMono.className} text-[11px] text-[var(--am-text-muted)]`}>
                    {((activePage - 1) * POSTS_PER_PAGE + index + 1)
                      .toString()
                      .padStart(2, "0")}
                  </span>
                  <span
                    className={`${jetbrainsMono.className} rounded-full bg-[var(--am-accent-soft)] px-[10px] py-[3px] text-[11px] text-[var(--am-accent)]`}
                  >
                    {formatPostDate(post.date).slice(-4)}
                  </span>
                  <span className="text-[12px] text-[var(--am-text-muted)]">
                    {formatPostDate(post.date)}
                  </span>
                </div>
                <h2
                  className={`${playfairDisplay.className} text-[26px] font-bold leading-tight text-[var(--am-text-primary)] transition-colors group-hover:text-[var(--am-accent)] md:text-[30px]`}
                >
                  {post.title}
                </h2>
                <p className="text-[15px] leading-[1.6] text-[var(--am-text-secondary)]">
                  {getExcerpt(post.content)}
                </p>
                <p className="text-[12px] text-[var(--am-text-muted)]">
                  {getReadingTime(post.content)}
                </p>
              </Link>
            </article>
          ))}

          <nav
            className="flex flex-wrap items-center justify-between gap-3 py-6"
            aria-label="Blog pagination"
          >
            <button
              type="button"
              onClick={() => setCurrentPage((previousPage) => Math.max(1, previousPage - 1))}
              disabled={activePage === 1}
              className="rounded border border-[var(--am-border)] px-3 py-1.5 text-[13px] text-[var(--am-text-secondary)] transition-colors hover:text-[var(--am-text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActivePage = pageNumber === activePage;

                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`h-8 min-w-8 rounded border px-2 text-[13px] transition-colors ${
                      isActivePage
                        ? "border-[var(--am-accent)] bg-[var(--am-accent-soft)] text-[var(--am-accent)]"
                        : "border-[var(--am-border)] text-[var(--am-text-secondary)] hover:text-[var(--am-text-primary)]"
                    }`}
                    aria-current={isActivePage ? "page" : undefined}
                    aria-label={`Go to page ${pageNumber}`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                setCurrentPage((previousPage) => Math.min(totalPages, previousPage + 1))
              }
              disabled={activePage === totalPages}
              className="rounded border border-[var(--am-border)] px-3 py-1.5 text-[13px] text-[var(--am-text-secondary)] transition-colors hover:text-[var(--am-text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </nav>
        </div>
      ) : (
        <div className="py-14 text-center">
          <p className="text-[15px] text-[var(--am-text-secondary)]">
            No posts match this filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedYear("all");
              setCurrentPage(1);
            }}
            className="mt-3 text-[14px] text-[var(--am-accent)] transition-colors hover:opacity-80"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
