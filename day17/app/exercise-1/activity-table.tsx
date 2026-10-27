"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchActivities, type Activity } from "./mock-api";
import { Button } from "@/components/ui/button";

export default function ActivityTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<keyof Activity>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["activities", page, limit, sortBy, sortDir],
    queryFn: () => fetchActivities(page, limit, sortBy, sortDir),
    placeholderData: keepPreviousData, 
  });

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
    <div className="border rounded-lg bg-card p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Activity Log</h2>
        <div className="flex items-center gap-2 text-sm">
          <span className={isFetching ? "opacity-100 text-blue-500" : "opacity-0"}>Updating...</span>
          <select 
            value={limit} 
            onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
            className="border rounded p-1"
          >
            <option value={10}>10 rows</option>
            <option value={25}>25 rows</option>
            <option value={50}>50 rows</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-muted text-muted-foreground border-b">
            <tr>
              {["date", "user", "action", "tower", "floor", "status"].map((col) => (
                <th 
                  key={col} 
                  onClick={() => handleSort(col as keyof Activity)}
                  className="px-4 py-3 font-medium capitalize cursor-pointer hover:bg-muted/80 transition-colors"
                >
                  {col} {sortBy === col && (sortDir === "asc" ? "↑" : "↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y relative">
            {isLoading ? (
              <tr><td colSpan={6} className="text-center py-8">Loading initial data...</td></tr>
            ) : (
              data?.data.map((row) => (
                <tr key={row.id} className="hover:bg-muted/50 transition-colors">
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