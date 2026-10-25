"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import PostMeta from "@/app/components/PostMeta";
import { jetbrainsMono, playfairDisplay } from "@/lib/fonts";
import { getUniqueYears, searchAndFilterPosts, type Post } from "@/lib/blog-utils";
import { getExcerpt } from "@/lib/post-meta";

interface BlogClientProps {
  initialPosts: Post[];
}

const POSTS_PER_PAGE = 6;

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

  const isDefaultView = !searchQuery.trim() && selectedYear === "all" && activePage === 1;
  const featuredPost = isDefaultView ? paginatedPosts[0] : undefined;
  const listPosts = featuredPost ? paginatedPosts.slice(1) : paginatedPosts;

  const yearFilters = [{ value: "all", label: "All" }, ...availableYears.map((year) => ({ value: year, label: year }))];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5 border-b border-[var(--am-border)] pb-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2" role="group" aria-label="Filter by year">
          {yearFilters.map(({ value, label }) => {
            const isActive = selectedYear === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setSelectedYear(value);
                  setCurrentPage(1);
                }}
                className={`${jetbrainsMono.className} border-b py-1 text-[12px] uppercase tracking-[0.12em] transition-colors ${
                  isActive
                    ? "border-[var(--am-accent)] text-[var(--am-text-primary)]"
                    : "border-transparent text-[var(--am-text-muted)] hover:text-[var(--am-text-secondary)]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <label className="flex w-full items-center gap-2 border-b border-[var(--am-border)] py-1.5 text-[14px] text-[var(--am-text-muted)] focus-within:border-[var(--am-accent)] md:max-w-[240px]">
          <Search size={15} aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search posts..."
            className="w-full bg-transparent text-[var(--am-text-primary)] outline-none placeholder:text-[var(--am-text-muted)]"
            aria-label="Search posts"
          />
        </label>
      </div>

      {filteredPosts.length > 0 ? (
        <div>
          {featuredPost ? (
            <article className="border-b border-[var(--am-border)] py-10">
              <Link href={`/blog/${featuredPost.slug}`} className="group block space-y-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span
                    className={`${jetbrainsMono.className} text-[11px] uppercase tracking-[0.14em] text-[var(--am-accent)]`}
                  >
                    Latest
                  </span>
                  <PostMeta post={featuredPost} />
                </div>
                {featuredPost.image ? (
                  <div className="overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt=""
                      width={1200}
                      height={800}
                      priority
                      className="aspect-[2/1] w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
                      sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1056px) calc(100vw - 96px), 960px"
                    />
                  </div>
                ) : null}
                <h2
                  className={`${playfairDisplay.className} max-w-[800px] text-[32px] font-bold leading-[1.15] tracking-[-0.01em] transition-colors group-hover:text-[var(--am-accent)] md:text-[44px]`}
                >
                  {featuredPost.title}
                </h2>
                <p className="max-w-[720px] text-[17px] leading-[1.75] text-[var(--am-text-secondary)]">
                  {featuredPost.excerpt || getExcerpt(featuredPost.content, 220)}
                </p>
                <span className="inline-flex items-center gap-1.5 pt-1 text-[14px] font-medium text-[var(--am-accent)]">
                  Read article
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </article>
          ) : null}

          {listPosts.map((post) => (
            <article key={post.slug} className="border-b border-[var(--am-border)]">
              <Link href={`/blog/${post.slug}`} className="group flex items-start justify-between gap-8 py-7">
                <div className="min-w-0 max-w-[720px] space-y-2">
                  <PostMeta post={post} />
                  <h2
                    className={`${playfairDisplay.className} text-[21px] font-semibold leading-snug transition-colors group-hover:text-[var(--am-accent)] md:text-[24px]`}
                  >
                    {post.title}
                  </h2>
                  <p className="line-clamp-2 text-[15px] leading-[1.65] text-[var(--am-text-secondary)]">
                    {post.excerpt || getExcerpt(post.content)}
                  </p>
                </div>
                {post.image ? (
                  <div className="hidden shrink-0 overflow-hidden sm:block">
                    <Image
                      src={post.image}
                      alt=""
                      width={320}
                      height={213}
                      className="aspect-[3/2] w-40 object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03] md:w-48"
                      sizes="192px"
                    />
                  </div>
                ) : null}
              </Link>
            </article>
          ))}

          {totalPages > 1 ? (
            <nav
              className="flex flex-wrap items-center justify-between gap-3 pt-8"
              aria-label="Blog pagination"
            >
              <button
                type="button"
                onClick={() => setCurrentPage(Math.max(1, activePage - 1))}
                disabled={activePage === 1}
                className="border border-[var(--am-border)] px-4 py-2 text-[13px] text-[var(--am-text-secondary)] transition-colors hover:bg-[var(--am-bg-secondary)] hover:text-[var(--am-text-primary)] disabled:pointer-events-none disabled:opacity-40"
              >
                Previous
              </button>

              <div className={`${jetbrainsMono.className} flex flex-wrap items-center gap-1`}>
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const isActivePage = pageNumber === activePage;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`h-9 min-w-9 px-2 text-[12px] transition-colors ${
                        isActivePage
                          ? "bg-[var(--am-accent)] text-[var(--am-bg)]"
                          : "text-[var(--am-text-secondary)] hover:bg-[var(--am-bg-secondary)] hover:text-[var(--am-text-primary)]"
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
                onClick={() => setCurrentPage(Math.min(totalPages, activePage + 1))}
                disabled={activePage === totalPages}
                className="border border-[var(--am-border)] px-4 py-2 text-[13px] text-[var(--am-text-secondary)] transition-colors hover:bg-[var(--am-bg-secondary)] hover:text-[var(--am-text-primary)] disabled:pointer-events-none disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          ) : null}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className={`${playfairDisplay.className} text-[24px] font-semibold`}>
            Nothing here yet
          </p>
          <p className="mt-2 text-[15px] text-[var(--am-text-secondary)]">
            {searchQuery.trim()
              ? `No posts match “${searchQuery.trim()}”${selectedYear === "all" ? "" : ` in ${selectedYear}`}.`
              : "No posts match this filter."}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedYear("all");
              setCurrentPage(1);
            }}
            className="mt-6 border border-[var(--am-border)] px-5 py-2 text-[14px] text-[var(--am-accent)] transition-colors hover:bg-[var(--am-bg-secondary)]"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
