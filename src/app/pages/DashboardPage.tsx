import { useState } from "react";
import { SummaryCards } from "../components/SummaryCards";
import { DataTable } from "../components/DataTable";
import { FiltersPanel, FilterState } from "../components/FiltersPanel";
import { calculateStats, filterData } from "../utils/mockData";
import { useNavigate } from "react-router-dom";
import { DataRow } from "../components/ManualDataEntry";

type Props = {
  data: DataRow[];
};

export default function DashboardPage({ data }: Props) {
  const [filteredData, setFilteredData] = useState(data);
  const navigate = useNavigate();

  const stats = calculateStats(filteredData);
  const categories = [...new Set(data.map((row: any) => row.category as string))];

   const handleFilterChange = (filters: FilterState) => {
    const filtered = filterData(data, filters);
    setFilteredData(filtered);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <SummaryCards {...stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <DataTable data={filteredData} />
                </div>
                <div>
                  <FiltersPanel
                    categories={categories}
                    onFilterChange={handleFilterChange}
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
                  <h3 className="text-[#0f172a] font-semibold mb-2">AI Insights</h3>
                  <p className="text-[#64748b] mb-4">
                    Get intelligent insights about your data
                  </p>
                  <button
                    // onClick={() => setCurrentScreen('history')}
                    className="bg-[#3b82f6] text-white px-6 py-3 rounded-xl hover:bg-[#2563eb] transition-all font-medium shadow-lg shadow-[#3b82f6]/20"
                  >
                    Ask AI Questions
                  </button>
                </div>
              </div>
    </div>
  );
}