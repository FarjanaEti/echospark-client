"use client";

import { toggleUserStatusAction } from "@/app/action/toggleUser.action";
import { useRouter } from "next/navigation";
import SearchInput from "@/components/ui/SearchInput";
import TableFilter from "@/components/ui/TableFilter";
import Pagination from "@/components/ui/Pagination";
import { useTableData } from "@/hooks/useTableData";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserToggleProps {
  users: User[];
}

export default function UserToggle({ users }: UserToggleProps) {
  const router = useRouter();

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
    data: users,
    searchFields: ["name", "email"],
    filterField: "role",
    itemsPerPage: 10,
  });

  const roleOptions = [
    { value: "ADMIN", label: "Admin" },
    { value: "CUSTOMER", label: "Customer" },
    { value: "PROVIDER", label: "Provider" },
  ];

  const toggleStatus = async (id: string) => {
    const res = await toggleUserStatusAction(id);

    if (!res.success) {
      alert(res.message);
      return;
    }

    router.refresh();
  };

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search users by name or email..."
            className="w-full sm:w-80"
          />
          <TableFilter
            value={filterValue}
            onChange={setFilterValue}
            options={roleOptions}
            placeholder="Filter by role"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {totalItems} user{totalItems !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
        <table className="min-w-full text-sm text-card-foreground text-left">
          <thead className="bg-muted text-muted-foreground uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  {searchQuery || filterValue !== "all"
                    ? "No users match your filters"
                    : "No users found"}
                </td>
              </tr>
            ) : (
              paginatedData.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-muted transition"
                >
                  <td className="px-6 py-4 font-medium text-card-foreground">
                    {user.name || "—"}
                  </td>

                  <td className="px-6 py-4 text-muted-foreground">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    {user.role === "ADMIN" && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                        ADMIN
                      </span>
                    )}

                    {user.role === "CUSTOMER" && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        CUSTOMER
                      </span>
                    )}

                    {user.role === "PROVIDER" && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                        PROVIDER
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {user.status === "ACTIVE" ? (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                        Suspended
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className="text-destructive hover:text-destructive/80 text-sm font-medium"
                    >
                      {user.status === "ACTIVE" ? "Suspend" : "Activate"}
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
