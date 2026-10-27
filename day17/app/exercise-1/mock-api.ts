export type Activity = {
  id: string;
  date: string;
  user: string;
  action: string;
  tower: string;
  floor: string;
  status: "Success" | "Failed" | "Pending";
};

// Generate 120 fake records
const MOCK_DB: Activity[] = Array.from({ length: 550 }).map((_, i) => ({
  id: `ACT-${1000 + i}`,
  date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
  user: i % 3 === 0 ? "Usman" : i % 2 === 0 ? "Madhu" : "Zuber",
  action: i % 4 === 0 ? "Approved Inspection" : "Updated Progress",
  tower: i % 2 === 0 ? "Tower Alpha" : "Tower Beta",
  floor: `Floor ${Math.floor(Math.random() * 50) + 1}`,
  status: i % 5 === 0 ? "Failed" : i % 7 === 0 ? "Pending" : "Success",
}));

export const fetchActivities = async (
  page: number, 
  limit: number, 
  sortBy: keyof Activity = "date", 
  sortDir: "asc" | "desc" = "desc"
) => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  let sortedData = [...MOCK_DB].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortDir === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const startIndex = (page - 1) * limit;
  const paginatedData = sortedData.slice(startIndex, startIndex + limit);

  return {
    data: paginatedData,
    totalRecords: MOCK_DB.length,
    totalPages: Math.ceil(MOCK_DB.length / limit),
  };
};