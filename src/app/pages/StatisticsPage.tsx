import { useEffect, useState } from "react";
import { DataRow } from "../components/ManualDataEntry";
import { calculateStats, generateMockData } from "../utils/mockData";

type Props = {
  data: DataRow[];
};

export default function StatisticsPage({ data }: Props) {
  const categories = [...new Set(data.map((row: DataRow) => row.category as string))];
  const [filteredData, setFilteredData] = useState<DataRow[]>([]);
  const stats = calculateStats(filteredData);

  useEffect(() => {
    const mockData = generateMockData();
    setFilteredData(mockData);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
          <h3 className="text-[#0f172a] font-semibold mb-4">Category Distribution</h3>
          <div className="space-y-3">
            {categories.map((category) => {
              const count = data.filter((row) => row.category === category).length;
              const percentage = ((count / data.length) * 100).toFixed(1);
              return (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-[#0f172a] font-medium">{category}</span>
                    <span className="text-sm text-[#64748b]">{percentage}%</span>
                  </div>
                  <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
          <h3 className="text-[#0f172a] font-semibold mb-4">Top Performers</h3>
          <div className="space-y-3">
            {data
              .sort((a, b) => b.value - a.value)
              .slice(0, 5)
              .map((row, index) => (
                <div
                  key={row.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f8fafc] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#0f172a]">{row.name}</p>
                    <p className="text-xs text-[#64748b]">{row.category}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#10b981]">
                    ${row.value.toFixed(2)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
        <h3 className="text-[#0f172a] font-semibold mb-4">All Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#f8fafc] rounded-lg">
            <p className="text-xs text-[#64748b] mb-1">Total Value</p>
            <p className="text-2xl font-bold text-[#0f172a]">
              ${data.reduce((sum, row) => sum + row.value, 0).toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-[#f8fafc] rounded-lg">
            <p className="text-xs text-[#64748b] mb-1">Categories</p>
            <p className="text-2xl font-bold text-[#0f172a]">{categories.length}</p>
          </div>
          <div className="p-4 bg-[#f8fafc] rounded-lg">
            <p className="text-xs text-[#64748b] mb-1">Average per Record</p>
            <p className="text-2xl font-bold text-[#0f172a]">
              ${stats.averageValue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}