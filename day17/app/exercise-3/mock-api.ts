export type Activity = {
  id: string;
  date: string;
  user: string;
  action: string;
  tower: string;
  floor: string;
  status: "Success" | "Failed" | "Pending";
};

const MOCK_DB: Activity[] = Array.from({ length: 550 }).map((_, i) => ({
  id: `ACT-${1000 + i}`,
  date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
  user: i % 3 === 0 ? "Usman" : i % 2 === 0 ? "Madhu" : "Zuber",
  action: i % 4 === 0 ? "Approved Inspection" : "Updated Progress",
  tower: i % 2 === 0 ? "Tower Alpha" : "Tower Beta",
  floor: `Floor ${Math.floor(Math.random() * 50) + 1}`,
  status: i % 5 === 0 ? "Failed" : i % 7 === 0 ? "Pending" : "Success",
}));

export const fetchFilteredActivities = async (
  page: number, 
  limit: number, 
  sortBy: keyof Activity, 
  sortDir: "asc" | "desc",
  filters: { status: string; user: string; date: string }
) => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  let filteredData = MOCK_DB.filter(row => {
    let matches = true;
    if (filters.status && row.status !== filters.status) matches = false;
    if (filters.user && row.user !== filters.user) matches = false;
    if (filters.date && row.date !== filters.date) matches = false;
    return matches;
  });

  filteredData.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortDir === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const startIndex = (page - 1) * limit;
  const paginatedData = filteredData.slice(startIndex, startIndex + limit);

  return {
    data: paginatedData,
    totalRecords: filteredData.length,
    totalPages: Math.ceil(filteredData.length / limit),
  };
};