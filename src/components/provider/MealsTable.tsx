"use client";

import Link from "next/link";
import { deleteMenuAction } from "@/app/action/deleteMenuAction";
import SearchInput from "@/components/ui/SearchInput";
import TableFilter from "@/components/ui/TableFilter";
import Pagination from "@/components/ui/Pagination";
import { useTableData } from "@/hooks/useTableData";

interface Meal {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  category?: {
    name: string;
  };
  _count?: {
    reviews: number;
  };
  createdAt: string;
  orderItems?: any[];
}

interface MealsTableProps {
  meals: Meal[];
}

export default function MealsTable({ meals }: MealsTableProps) {
  const {
    paginatedData,
    searchQuery,
    setSearchQuery,
    filterValue,
    setFilterValue,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  } = useTableData({
    data: meals,
    searchFields: ["title", "description"],
    filterField: "available",
    itemsPerPage: 5,
  });

  const availabilityOptions = [
    { value: "true", label: "Available" },
    { value: "false", label: "Unavailable" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search meals by title or description..."
            className="w-full sm:w-80"
          />
          <TableFilter
            value={filterValue}
            onChange={setFilterValue}
            options={availabilityOptions}
            placeholder="Filter by availability"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {totalItems} meal{totalItems !== 1 ? "s" : ""} found
        </div>
      </div>

      {paginatedData.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {searchQuery || filterValue !== "all"
            ? "No meals match your filters"
            : "No meals found"}
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedData.map((meal) => {
            const hasOrders = (meal.orderItems?.length ?? 0) > 0;

            return (
              <div
                key={meal.id}
                className="group flex gap-5 rounded-xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={meal.image || "/placeholder-food.png"}
                    alt={meal.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {meal.title}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          meal.available
                            ? "bg-accent/10 text-accent"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {meal.available ? "Available" : "Unavailable"}
                      </span>
                    </div>

                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {meal.description || "No description provided"}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <span>
                        Category: <span className="font-medium text-card-foreground">{meal.category?.name}</span>
                      </span>
                      <span>
                        Reviews: <span className="font-medium text-card-foreground">{meal._count?.reviews ?? 0}</span>
                      </span>
                      <span>
                        Created: <span className="font-medium text-card-foreground">{new Date(meal.createdAt).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-card-foreground">৳{meal.price}</span>
                    <div className="flex gap-2">
                      <Link
                        href={`/provider-dashboard/myMenu/${meal.id}`}
                        className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground hover:opacity-90"
                      >
                        Edit
                      </Link>
                      <form action={hasOrders ? undefined : deleteMenuAction}>
                        <input type="hidden" name="mealId" value={meal.id} />
                        <button
                          type="submit"
                          disabled={hasOrders}
                          className={`rounded-md px-3 py-1 text-sm transition ${
                            hasOrders
                              ? "cursor-not-allowed opacity-40 blur-[1px]"
                              : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          }`}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="justify-center"
      />
    </div>
  );
}
