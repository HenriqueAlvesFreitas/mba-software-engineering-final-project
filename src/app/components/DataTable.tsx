import type { DataRow } from './ManualDataEntry';

interface DataTableProps {
  data: DataRow[];
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, { bg: string; text: string }> = {
    Marketing: { bg: 'bg-[#dbeafe]', text: 'text-[#1e40af]' },
    Operations: { bg: 'bg-[#fef3c7]', text: 'text-[#b45309]' },
    Sales: { bg: 'bg-[#d1fae5]', text: 'text-[#065f46]' },
    IT: { bg: 'bg-[#e0e7ff]', text: 'text-[#4338ca]' },
    HR: { bg: 'bg-[#fce7f3]', text: 'text-[#9f1239]' },
    Finance: { bg: 'bg-[#f3e8ff]', text: 'text-[#6b21a8]' },
  };
  return colors[category] || { bg: 'bg-[#f1f5f9]', text: 'text-[#64748b]' };
};

export function DataTable({ data }: DataTableProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#e2e8f0]">
        <h3 className="text-[#0f172a] font-semibold">Data Records</h3>
        <p className="text-sm text-[#64748b]">View and analyze all your data entries</p>
      </div>
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-[#f8fafc] sticky top-0">
            <tr>
              <th className="text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider py-3 px-6 border-b border-[#e2e8f0]">
                Name
              </th>
              <th className="text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider py-3 px-6 border-b border-[#e2e8f0]">
                Category
              </th>
              <th className="text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider py-3 px-6 border-b border-[#e2e8f0]">
                Value
              </th>
              <th className="text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider py-3 px-6 border-b border-[#e2e8f0]">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const categoryColor = getCategoryColor(row.category);
              return (
                <tr
                  key={row.id}
                  className={`border-b border-[#e2e8f0] hover:bg-[#f8fafc] transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]/50'
                  }`}
                >
                  <td className="py-4 px-6 text-[#0f172a] font-medium">{row.name}</td>
                  <td className="py-4 px-6">
                    <span className={`${categoryColor.bg} ${categoryColor.text} px-3 py-1 rounded-full text-xs font-semibold`}>
                      {row.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#0f172a] font-semibold">${row.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="py-4 px-6 text-[#64748b]">{row.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
