"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchFilteredActivities, type Activity } from "./mock-api";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

export default function UrlSyncedTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Read state directly from the URL
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const sortBy = (searchParams.get("sortBy") as keyof Activity) || "date";
  const sortDir = (searchParams.get("sortDir") as "asc" | "desc") || "desc";
  const statusFilter = searchParams.get("status") || "";
  const userFilter = searchParams.get("user") || "";
  const dateFilter = searchParams.get("date") || "";

  // 2. Helper function to update the URL
  const updateUrl = useCallback((updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    // router.replace updates the URL without adding a new history entry for every single keystroke
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  // 3. React Query fetches based on URL state
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["activities-url", page, limit, sortBy, sortDir, { statusFilter, userFilter, dateFilter }],
    queryFn: () => fetchFilteredActivities(page, limit, sortBy, sortDir, {
      status: statusFilter,
      user: userFilter,
      date: dateFilter
    }),
    placeholderData: keepPreviousData,
  });

  const handleSort = (column: keyof Activity) => {
    if (sortBy === column) {
      updateUrl({ sortDir: sortDir === "asc" ? "desc" : "asc", page: 1 });
    } else {
      updateUrl({ sortBy: column, sortDir: "asc", page: 1 });
    }
  };

  return (
    <div className="border rounded-lg bg-card p-4 space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-md border">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-muted-foreground">Status</label>
          <select 
            className="border rounded p-2 text-sm bg-background h-10"
            value={statusFilter} 
            onChange={(e) => updateUrl({ status: e.target.value, page: 1 })}
          >
            <option value="">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-muted-foreground">User</label>
          <select 
            className="border rounded p-2 text-sm bg-background h-10"
            value={userFilter} 
            onChange={(e) => updateUrl({ user: e.target.value, page: 1 })}
          >
            <option value="">All Users</option>
            <option value="Usman">Usman</option>
            <option value="Madhu">Madhu</option>
            <option value="Zuber">Zuber</option>
          </select>
        </div>

        <div className="flex items-end ml-auto">
          <Button 
            variant="outline" 
            onClick={() => { router.replace(pathname); }} // Clears all search params
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">URL-Synced Activity Log</h2>
        <span className={isFetching ? "opacity-100 text-blue-500 text-sm" : "opacity-0"}>Updating...</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-muted text-muted-foreground border-b">
            <tr>
              {["date", "user", "action", "tower", "floor", "status"].map((col) => (
                <th 
                  key={col} 
                  onClick={() => handleSort(col as keyof Activity)}
                  className="px-4 py-3 font-medium capitalize cursor-pointer hover:bg-muted/80"
                >
                  {col} {sortBy === col && (sortDir === "asc" ? "↑" : "↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y relative">
            {isLoading ? (
              <tr><td colSpan={6} className="text-center py-8">Loading initial data...</td></tr>
            ) : data?.data.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">No records found.</td></tr>
            ) : (
              data?.data.map((row) => (
                <tr key={row.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3 font-medium">{row.user}</td>
                  <td className="px-4 py-3">{row.action}</td>
                  <td className="px-4 py-3">{row.tower}</td>
                  <td className="px-4 py-3">{row.floor}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${row.status === 'Success' ? 'bg-green-100 text-green-700' : 
                        row.status === 'Failed' ? 'bg-red-100 text-red-700' : 
                        'bg-yellow-100 text-yellow-700'}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2 text-sm">
          <select 
            value={limit} 
            onChange={(e) => updateUrl({ limit: Number(e.target.value), page: 1 })}
            className="border rounded p-1"
          >
            <option value={10}>10 rows</option>
            <option value={25}>25 rows</option>
            <option value={50}>50 rows</option>
          </select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => updateUrl({ page: Math.max(1, page - 1) })} disabled={page === 1}>Previous</Button>
          <Button variant="outline" size="sm" onClick={() => updateUrl({ page: page + 1 })} disabled={page === (data?.totalPages || 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
}