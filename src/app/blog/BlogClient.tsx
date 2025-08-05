"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  searchAndFilterPosts,
  paginatePosts,
  getUniqueYears,
  type Post,
} from "@/lib/blog-utils";
import SearchFilter from "@/app/components/SearchFilter";
import Pagination from "@/app/components/Pagination";

interface BlogClientProps {
  initialPosts: Post[];
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const [titleQuery, setTitleQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Get available years from posts
  const availableYears = useMemo(() => {
    return getUniqueYears(initialPosts);
  }, [initialPosts]);

  // Memoized filtered posts based on search query and year filter
  const filteredPosts = useMemo(() => {
    return searchAndFilterPosts(initialPosts, titleQuery, selectedYear);
  }, [initialPosts, titleQuery, selectedYear]);

  // Memoized paginated posts
  const paginatedData = useMemo(() => {
    return paginatePosts(filteredPosts, currentPage, postsPerPage);
  }, [filteredPosts, currentPage]);

  // Handle search with useCallback to prevent unnecessary re-renders
  const handleSearch = useCallback(
    (newTitleQuery: string, newSelectedYear: string) => {
      setTitleQuery(newTitleQuery);
      setSelectedYear(newSelectedYear);
      setCurrentPage(1); // Reset to first page when searching
    },
    []
  );

  // Handle page change with useCallback
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const hasActiveFilters = titleQuery.trim() !== "" || selectedYear !== "all";

  return (
    <div className="w-full mt-8">
      {/* Search and Filter */}
      <SearchFilter
        onSearch={handleSearch}
        availableYears={availableYears}
        initialTitleQuery={titleQuery}
        initialYear={selectedYear}
      />

      {/* Search Results Info */}
      {hasActiveFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {filteredPosts.length > 0
              ? `พบ ${filteredPosts.length} บทความจากการค้นหา`
              : `ไม่พบบทความที่ตรงกับเงื่อนไขการค้นหา`}
          </div>
        </div>
      )}

      {/* Posts List */}
      {paginatedData.posts.length > 0 ? (
        <>
          <div className="grid gap-4">
            {paginatedData.posts.map((post, index) => (
              <article key={post.slug} className="group relative">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#51a800] transition-all duration-300 group-hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#51a800] transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-3">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <time className="text-sm text-gray-500 font-medium">
                          {post.date}
                        </time>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#51a800] transition-colors duration-200">
                        <svg
                          className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Post number indicator */}
                  <div className="absolute -left-2 -top-2 w-6 h-6 bg-[#51a800] text-white text-xs font-bold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {(currentPage - 1) * postsPerPage + index + 1}
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={paginatedData.currentPage}
            totalPages={paginatedData.totalPages}
            onPageChange={handlePageChange}
            totalPosts={paginatedData.totalPosts}
            postsPerPage={postsPerPage}
          />
        </>
      ) : (
        // No posts found
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="max-w-md mx-auto">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <div className="text-gray-500 text-lg mb-3">
              {hasActiveFilters
                ? "ไม่พบบทความที่ตรงกับเงื่อนไขการค้นหา"
                : "ไม่มีบทความ"}
            </div>
            <div className="text-gray-400 text-sm mb-4">
              {hasActiveFilters && "ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือกรอง"}
            </div>
            {hasActiveFilters && (
              <button
                onClick={() => handleSearch("", "all")}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#51a800] bg-white border border-[#51a800] rounded-lg hover:bg-[#51a800] hover:text-white transition-all duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                แสดงบทความทั้งหมด
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
