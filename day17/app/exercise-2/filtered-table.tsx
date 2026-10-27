"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchFilteredActivities, type Activity } from "./mock-api";
import { Button } from "@/components/ui/button";

export default function FilteredTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<keyof Activity>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const [statusFilter, setStatusFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["activities", page, limit, sortBy, sortDir, { statusFilter, userFilter, dateFilter }],
    queryFn: () => fetchFilteredActivities(page, limit, sortBy, sortDir, {
      status: statusFilter,
      user: userFilter,
      date: dateFilter
    }),
    placeholderData: keepPreviousData,
  });

  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setPage(1); // Reset to page 1 on filter change
  };

  const handleSort = (column: keyof Activity) => {
    if (sortBy === column) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
    setPage(1);
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
            onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
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
            onChange={(e) => handleFilterChange(setUserFilter, e.target.value)}
          >
            <option value="">All Users</option>
            <option value="Usman">Usman</option>
            <option value="Madhu">Madhu</option>
            <option value="Zuber">Zuber</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-muted-foreground">Specific Date</label>
          <input 
            type="date"
            className="border rounded p-2 text-sm bg-background h-10"
            value={dateFilter}
            onChange={(e) => handleFilterChange(setDateFilter, e.target.value)}
          />
        </div>
        
        <div className="flex items-end ml-auto">
          <Button 
            variant="outline" 
            onClick={() => { setStatusFilter(""); setUserFilter(""); setDateFilter(""); setPage(1); }}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Filtered Activity Log</h2>
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
              <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">No records found matching filters.</td></tr>
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
        <p className="text-sm text-muted-foreground">
          Showing page {page} of {data?.totalPages || 1} ({data?.totalRecords || 0} total records)
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
          <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={page === (data?.totalPages || 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
}