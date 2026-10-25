"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import PostMeta from "@/app/components/PostMeta";
import { jetbrainsMono, playfairDisplay } from "@/lib/fonts";
import { getUniqueYears, searchAndFilterPosts, type Post } from "@/lib/blog-utils";
import { formatPostDate, getExcerpt, getReadingTime } from "@/lib/post-meta";

interface BlogClientProps {
  initialPosts: Post[];
}

const HERO_POST_COUNT = 4;
const POSTS_PER_PAGE = 10;

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const listTopRef = useRef<HTMLDivElement>(null);
  const availableYears = useMemo(() => getUniqueYears(initialPosts), [initialPosts]);
  const filteredPosts = useMemo(
    () => searchAndFilterPosts(initialPosts, searchQuery, selectedYear),
    [initialPosts, searchQuery, selectedYear]
  );

  // Unfiltered view leads with a featured post + "Recent" column; the index holds the rest.
  const isUnfiltered = !searchQuery.trim() && selectedYear === "all";
  const heroPosts = isUnfiltered ? filteredPosts.slice(0, HERO_POST_COUNT) : [];
  const indexPosts = filteredPosts.slice(heroPosts.length);
  const totalPages = Math.max(1, Math.ceil(indexPosts.length / POSTS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const pagePosts = indexPosts.slice((activePage - 1) * POSTS_PER_PAGE, activePage * POSTS_PER_PAGE);
  const [featuredPost, ...recentPosts] = activePage === 1 ? heroPosts : [];
  // Reserve the thumbnail column only when this page has a cover, so text-only pages use the full width.
  const pageHasCover = pagePosts.some((post) => post.image);

  const yearFilters = [{ value: "all", label: "All" }, ...availableYears.map((year) => ({ value: year, label: year }))];

  const goToPage = (page: number) => {
    setCurrentPage(page);
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedYear("all");
    setCurrentPage(1);
  };

  return (
    <div ref={listTopRef} className="w-full scroll-mt-6">
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

      {filteredPosts.length === 0 ? (
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
            onClick={resetFilters}
            className="mt-6 border border-[var(--am-border)] px-5 py-2 text-[14px] text-[var(--am-accent)] transition-colors hover:bg-[var(--am-bg-secondary)]"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {featuredPost ? (
            <div className="grid gap-10 border-b border-[var(--am-border)] py-10 md:grid-cols-12 md:gap-0 md:py-12">
              <article className="md:col-span-7 md:pr-10">
                <Link href={`/blog/${featuredPost.slug}`} className="group block space-y-4">
                  <p
                    className={`${jetbrainsMono.className} text-[11px] uppercase tracking-[0.14em] text-[var(--am-accent)]`}
                  >
                    Featured
                  </p>
                  {featuredPost.image ? (
                    <div className="overflow-hidden bg-[var(--am-bg-secondary)]">
                      <Image
                        src={featuredPost.image}
                        alt=""
                        width={1200}
                        height={800}
                        priority
                        className="aspect-[3/2] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
                        sizes="(max-width: 767px) calc(100vw - 32px), 540px"
                      />
                    </div>
                  ) : null}
                  <PostMeta post={featuredPost} />
                  <h2
                    className={`${playfairDisplay.className} text-[28px] font-bold leading-[1.2] tracking-[-0.01em] transition-colors group-hover:text-[var(--am-accent)] md:text-[34px]`}
                  >
                    {featuredPost.title}
                  </h2>
                  <p className="line-clamp-3 text-[16px] leading-[1.7] text-[var(--am-text-secondary)]">
                    {featuredPost.excerpt || getExcerpt(featuredPost.content, 220)}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--am-accent)]">
                    Read article
                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </article>

              {recentPosts.length > 0 ? (
                <aside
                  className="md:col-span-5 md:border-l md:border-[var(--am-border)] md:pl-10"
                  aria-labelledby="recent-posts"
                >
                  <h2
                    id="recent-posts"
                    className={`${jetbrainsMono.className} text-[11px] uppercase tracking-[0.14em] text-[var(--am-text-muted)]`}
                  >
                    Recent
                  </h2>
                  <ul className="mt-2">
                    {recentPosts.map((post) => (
                      <li key={post.slug} className="border-b border-[var(--am-border)] last:border-b-0">
                        <Link href={`/blog/${post.slug}`} className="group block space-y-2 py-6">
                          <PostMeta post={post} />
                          <h3
                            className={`${playfairDisplay.className} text-[19px] font-semibold leading-snug transition-colors group-hover:text-[var(--am-accent)]`}
                          >
                            {post.title}
                          </h3>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </aside>
              ) : null}
            </div>
          ) : null}

          {pagePosts.length > 0 ? (
            <section aria-labelledby="all-posts" className={featuredPost ? "pt-12" : "pt-2"}>
              {featuredPost ? (
                <h2
                  id="all-posts"
                  className={`${playfairDisplay.className} text-[24px] font-bold md:text-[28px]`}
                >
                  More writing
                </h2>
              ) : (
                <h2 id="all-posts" className="sr-only">
                  Posts
                </h2>
              )}

              <ul className={featuredPost ? "mt-4" : ""}>
                {pagePosts.map((post) => (
                  <li key={post.slug} className="border-b border-[var(--am-border)]">
                    <Link
                      href={`/blog/${post.slug}`}
                      className={`group grid gap-3 py-7 md:grid-cols-[136px_minmax(0,1fr)] md:gap-8 ${
                        pageHasCover ? "lg:grid-cols-[136px_minmax(0,1fr)_168px]" : ""
                      }`}
                    >
                      <div
                        className={`${jetbrainsMono.className} flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.12em] text-[var(--am-text-muted)] md:flex-col md:items-start md:gap-y-1.5 md:pt-1.5`}
                      >
                        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                        <span aria-hidden="true" className="md:hidden">
                          ·
                        </span>
                        <span>{getReadingTime(post.content)}</span>
                        {post.tags?.[0] ? (
                          <span className="ml-1 rounded-full bg-[var(--am-accent-soft)] px-2.5 py-[3px] normal-case tracking-normal text-[var(--am-accent)] md:ml-0">
                            {post.tags[0]}
                          </span>
                        ) : null}
                      </div>
                      <div className="min-w-0 space-y-2">
                        <h3
                          className={`${playfairDisplay.className} text-[21px] font-semibold leading-snug transition-colors group-hover:text-[var(--am-accent)] md:text-[23px]`}
                        >
                          {post.title}
                        </h3>
                        <p className="line-clamp-2 text-[15px] leading-[1.65] text-[var(--am-text-secondary)]">
                          {post.excerpt || getExcerpt(post.content)}
                        </p>
                      </div>
                      {post.image ? (
                        <div className="hidden overflow-hidden bg-[var(--am-bg-secondary)] lg:block">
                          <Image
                            src={post.image}
                            alt=""
                            width={336}
                            height={224}
                            className="aspect-[3/2] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                            sizes="168px"
                          />
                        </div>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {totalPages > 1 ? (
            <nav
              className="flex items-center justify-between gap-3 pt-8"
              aria-label="Blog pagination"
            >
              <button
                type="button"
                onClick={() => goToPage(Math.max(1, activePage - 1))}
                disabled={activePage === 1}
                className="inline-flex items-center gap-1.5 border border-[var(--am-border)] px-4 py-2 text-[13px] text-[var(--am-text-secondary)] transition-colors hover:bg-[var(--am-bg-secondary)] hover:text-[var(--am-text-primary)] disabled:pointer-events-none disabled:opacity-40"
              >
                <ArrowLeft size={13} aria-hidden="true" />
                Previous
              </button>

              <p
                className={`${jetbrainsMono.className} text-[11px] uppercase tracking-[0.12em] text-[var(--am-text-muted)] sm:hidden`}
                aria-live="polite"
              >
                {activePage} / {totalPages}
              </p>

              <div className={`${jetbrainsMono.className} hidden items-center gap-1 sm:flex`}>
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const isActivePage = pageNumber === activePage;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => goToPage(pageNumber)}
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
                onClick={() => goToPage(Math.min(totalPages, activePage + 1))}
                disabled={activePage === totalPages}
                className="inline-flex items-center gap-1.5 border border-[var(--am-border)] px-4 py-2 text-[13px] text-[var(--am-text-secondary)] transition-colors hover:bg-[var(--am-bg-secondary)] hover:text-[var(--am-text-primary)] disabled:pointer-events-none disabled:opacity-40"
              >
                Next
                <ArrowRight size={13} aria-hidden="true" />
              </button>
            </nav>
          ) : null}
        </>
      )}
    </div>
  );
}
