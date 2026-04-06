import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export interface DataRow {
  id: string;
  name: string;
  category: string;
  value: number;
  date: string;
}

interface ManualDataEntryProps {
  onSave: (data: DataRow[]) => void;
  onCancel: () => void;
}

export function ManualDataEntry({ onSave, onCancel }: ManualDataEntryProps) {
  const [rows, setRows] = useState<DataRow[]>([
    { id: '1', name: '', category: '', value: 0, date: '' },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { id: Date.now().toString(), name: '', category: '', value: 0, date: '' },
    ]);
  };

  const removeRow = (id: string) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const updateRow = (id: string, field: keyof DataRow, value: string | number) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
        <h3 className="text-[#0f172a] font-semibold mb-1">Manual Data Entry</h3>
        <p className="text-sm text-[#64748b] mb-6">Enter your data row by row</p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e2e8f0]">
                <th className="text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider py-3 px-4">Name</th>
                <th className="text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider py-3 px-4">Category</th>
                <th className="text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider py-3 px-4">Value</th>
                <th className="text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider py-3 px-4">Date</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-[#e2e8f0]">
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                      placeholder="Enter name"
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={row.category}
                      onChange={(e) => updateRow(row.id, 'category', e.target.value)}
                      placeholder="Category"
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      value={row.value}
                      onChange={(e) => updateRow(row.id, 'value', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) => updateRow(row.id, 'date', e.target.value)}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => removeRow(row.id)}
                      disabled={rows.length === 1}
                      className="text-[#64748b] hover:text-[#ef4444] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={addRow}
          className="flex items-center gap-2 text-[#3b82f6] hover:text-[#2563eb] font-medium mt-4 transition-colors"
        >
          <Plus size={18} />
          Add Row
        </button>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => onSave(rows)}
            className="flex-1 bg-[#3b82f6] text-white py-3 px-6 rounded-xl hover:bg-[#2563eb] transition-all font-medium shadow-lg shadow-[#3b82f6]/20"
          >
            Save Data
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-white text-[#64748b] border border-[#e2e8f0] py-3 px-6 rounded-xl hover:bg-[#f8fafc] transition-all font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
