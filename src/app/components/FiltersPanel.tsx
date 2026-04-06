import { useState } from 'react';

interface FiltersPanelProps {
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  category: string;
  minValue: number;
  maxValue: number;
  startDate: string;
  endDate: string;
}

export function FiltersPanel({ categories, onFilterChange }: FiltersPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    minValue: 0,
    maxValue: 100000,
    startDate: '',
    endDate: '',
  });

  const handleChange = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
      <h3 className="text-[#0f172a] font-semibold mb-1">Filters</h3>
      <p className="text-sm text-[#64748b] mb-6">Refine your data view</p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#0f172a] mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0f172a] mb-2">Value Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minValue}
              onChange={(e) => handleChange('minValue', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxValue}
              onChange={(e) => handleChange('maxValue', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0f172a] mb-2">Date Range</label>
          <div className="space-y-2">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
            />
          </div>
        </div>

        <button
          onClick={() => {
            setFilters({
              category: '',
              minValue: 0,
              maxValue: 100000,
              startDate: '',
              endDate: '',
            });
            onFilterChange({
              category: '',
              minValue: 0,
              maxValue: 100000,
              startDate: '',
              endDate: '',
            });
          }}
          className="w-full text-[#3b82f6] hover:text-[#2563eb] font-medium transition-colors text-sm py-2"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
