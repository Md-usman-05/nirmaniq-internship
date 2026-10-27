"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchFilteredActivities, bulkUpdateStatus, type Activity } from "./mock-api";
import { Button } from "@/components/ui/button";

export default function BulkActionTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // Selection State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const sortBy = (searchParams.get("sortBy") as keyof Activity) || "date";
  const sortDir = (searchParams.get("sortDir") as "asc" | "desc") || "desc";

  const updateUrl = useCallback((updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") params.delete(key);
      else params.set(key, String(value));
    });
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const { data, isLoading } = useQuery({
    queryKey: ["activities-bulk", page, limit, sortBy, sortDir],
    queryFn: () => fetchFilteredActivities(page, limit, sortBy, sortDir, { status: "", user: "", date: "" }),
    placeholderData: keepPreviousData,
  });

  // Bulk Mutation Logic
  const bulkMutation = useMutation({
    mutationFn: (newStatus: "Success" | "Failed") => bulkUpdateStatus(Array.from(selectedIds), newStatus),
    onSuccess: () => {
      setSelectedIds(new Set()); // Clear selection
      queryClient.invalidateQueries({ queryKey: ["activities-bulk"] }); // Force table to refresh
      alert("Bulk update successful!");
    }
  });

  // Checkbox Handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!data) return;
    if (e.target.checked) {
      const allIdsOnPage = data.data.map(row => row.id);
      setSelectedIds(new Set(allIdsOnPage));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const currentPageIds = data?.data.map(row => row.id) || [];
  const isAllSelected = currentPageIds.length > 0 && currentPageIds.every(id => selectedIds.has(id));

  return (
    <div className="border rounded-lg bg-card p-4 space-y-4">
      {/* Bulk Actions Header */}
      <div className="flex justify-between items-center bg-muted/50 p-3 rounded-md border min-h-[64px]">
        <div>
          <h2 className="text-xl font-bold">Activity Log</h2>
          {selectedIds.size > 0 && (
            <p className="text-sm text-blue-600 font-medium">{selectedIds.size} row(s) selected</p>
          )}
        </div>
        
        {selectedIds.size > 0 && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              onClick={() => bulkMutation.mutate("Success")}
              disabled={bulkMutation.isPending}
            >
              {bulkMutation.isPending ? "Updating..." : "Approve Selected"}
            </Button>
            <Button 
              variant="outline" 
              className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
              onClick={() => bulkMutation.mutate("Failed")}
              disabled={bulkMutation.isPending}
            >
              {bulkMutation.isPending ? "Updating..." : "Reject Selected"}
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-muted text-muted-foreground border-b">
            <tr>
              <th className="px-4 py-3 w-12">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 cursor-pointer"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              {["date", "user", "action", "tower", "status"].map((col) => (
                <th key={col} className="px-4 py-3 font-medium capitalize">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr><td colSpan={6} className="text-center py-8">Loading data...</td></tr>
            ) : (
              data?.data.map((row) => (
                <tr 
                  key={row.id} 
                  className={`hover:bg-muted/50 transition-colors ${selectedIds.has(row.id) ? 'bg-blue-50/50' : ''}`}
                >
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 cursor-pointer"
                      checked={selectedIds.has(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3 font-medium">{row.user}</td>
                  <td className="px-4 py-3">{row.action}</td>
                  <td className="px-4 py-3">{row.tower}</td>
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

      {/* Basic Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-muted-foreground">
          Showing page {page} of {data?.totalPages || 1}
        </p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => { updateUrl({ page: Math.max(1, page - 1) }); setSelectedIds(new Set()); }} 
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => { updateUrl({ page: page + 1 }); setSelectedIds(new Set()); }} 
            disabled={page === (data?.totalPages || 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}