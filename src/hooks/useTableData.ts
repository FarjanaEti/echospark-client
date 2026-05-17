"use client";

import { useMemo, useState } from "react";

interface UseTableDataOptions<T> {
  data: T[];
  searchFields?: (keyof T)[];
  filterField?: keyof T;
  itemsPerPage?: number;
}

interface UseTableDataReturn<T> {
  // Data
  filteredData: T[];
  paginatedData: T[];

  // State
  searchQuery: string;
  filterValue: string;
  currentPage: number;
  itemsPerPage: number;

  // Actions
  setSearchQuery: (query: string) => void;
  setFilterValue: (value: string) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;

  // Computed
  totalPages: number;
  totalItems: number;
}

export function useTableData<T extends Record<string, any>>({
  data,
  searchFields = [],
  filterField,
  itemsPerPage: initialItemsPerPage = 10,
}: UseTableDataOptions<T>): UseTableDataReturn<T> {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Filter data based on search and filter
  const filteredData = useMemo(() => {
    let filtered = data;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        searchFields.some((field) => {
          const value = item[field];
          return value && String(value).toLowerCase().includes(query);
        })
      );
    }

    // Apply category/status filter
    if (filterField && filterValue !== "all") {
      filtered = filtered.filter((item) => {
        const fieldValue = item[filterField];
        return fieldValue === filterValue;
      });
    }

    return filtered;
  }, [data, searchQuery, filterValue, searchFields, filterField]);

  // Calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSetFilterValue = (value: string) => {
    setFilterValue(value);
    setCurrentPage(1);
  };

  const handleSetItemsPerPage = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return {
    // Data
    filteredData,
    paginatedData,

    // State
    searchQuery,
    filterValue,
    currentPage,
    itemsPerPage,

    // Actions
    setSearchQuery: handleSetSearchQuery,
    setFilterValue: handleSetFilterValue,
    setCurrentPage,
    setItemsPerPage: handleSetItemsPerPage,

    // Computed
    totalPages,
    totalItems,
  };
}