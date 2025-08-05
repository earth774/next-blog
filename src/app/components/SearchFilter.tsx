"use client";

import { useState, useEffect } from "react";

interface SearchFilterProps {
  onSearch: (titleQuery: string, selectedYear: string) => void;
  availableYears: string[];
  initialTitleQuery?: string;
  initialYear?: string;
}

export default function SearchFilter({
  onSearch,
  availableYears,
  initialTitleQuery = "",
  initialYear = "all",
}: SearchFilterProps) {
  const [titleQuery, setTitleQuery] = useState(initialTitleQuery);
  const [selectedYear, setSelectedYear] = useState(initialYear);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(titleQuery, selectedYear);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [titleQuery, selectedYear, onSearch]);

  const handleClearTitle = () => {
    setTitleQuery("");
  };

  const handleClearAll = () => {
    setTitleQuery("");
    setSelectedYear("all");
  };

  const hasActiveFilters = titleQuery.trim() !== "" || selectedYear !== "all";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Title Search */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🔍 ค้นหาชื่อบทความ
          </label>
          <div className="relative">
            <input
              type="text"
              value={titleQuery}
              onChange={(e) => setTitleQuery(e.target.value)}
              placeholder="พิมพ์ชื่อบทความที่ต้องการค้นหา..."
              className="w-full px-4 py-3 pl-11 pr-10 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51a800] focus:border-[#51a800] focus:bg-white transition-all duration-200"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {titleQuery && (
              <button
                onClick={handleClearTitle}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear title search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Year Filter */}
        <div className="lg:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📅 กรองตามปี
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51a800] focus:border-[#51a800] focus:bg-white transition-all duration-200 cursor-pointer"
          >
            <option value="all">ทุกปี</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                ปี {year}
              </option>
            ))}
          </select>
        </div>

        {/* Clear All Button */}
        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={handleClearAll}
              className="px-4 py-3 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 hover:text-gray-700 transition-all duration-200 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
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
              ล้างทั้งหมด
            </button>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">ตัวกรองที่ใช้:</span>
            {titleQuery.trim() && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#51a800] text-white">
                ชื่อ: &ldquo;{titleQuery}&rdquo;
                <button
                  onClick={handleClearTitle}
                  className="ml-2 hover:text-gray-200"
                >
                  ×
                </button>
              </span>
            )}
            {selectedYear !== "all" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                ปี: {selectedYear}
                <button
                  onClick={() => setSelectedYear("all")}
                  className="ml-2 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
