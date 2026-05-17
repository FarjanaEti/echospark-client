"use client";

import { useState } from "react";
import SearchInput from "@/components/ui/SearchInput";
import TableFilter from "@/components/ui/TableFilter";
import Pagination from "@/components/ui/Pagination";
import { useTableData } from "@/hooks/useTableData";

interface Category {
  id: string;
  name: string;
  isActive: boolean;
}

interface CategoryTableProps {
  categories: Category[];
}

export default function CategoryTable({ categories }: CategoryTableProps) {
  const {
    paginatedData,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  } = useTableData({
    data: categories,
    searchFields: ["name"],
    itemsPerPage: 10,
  });

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search categories..."
            className="w-full sm:w-80"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {totalItems} categor{totalItems !== 1 ? "ies" : "y"} found
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
        <table className="min-w-full text-sm text-card-foreground text-left">
          <thead className="bg-muted text-muted-foreground uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  {searchQuery ? "No categories match your filters" : "No categories found"}
                </td>
              </tr>
            ) : (
              paginatedData.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-muted transition"
                >
                  <td className="px-6 py-4 font-medium text-card-foreground">
                    {category.name}
                  </td>

                  <td className="px-6 py-4">
                    {category.isActive ? (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      className="text-destructive hover:text-destructive/80 text-sm font-medium"
                    >
                      {category.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="justify-center"
      />
    </div>
  );
}