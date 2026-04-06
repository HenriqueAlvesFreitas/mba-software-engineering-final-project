import { Search, Bell, Settings } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="h-[72px] bg-white border-b border-[#e2e8f0] flex items-center justify-between px-8">
      <div>
        <h1 className="text-[#0f172a] text-2xl font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94a3b8]" size={18} />
          <input
            type="text"
            placeholder="Search data, insights..."
            className="pl-10 pr-4 py-2 w-[320px] rounded-lg border border-[#e2e8f0] bg-white text-[#0f172a] placeholder-[#94a3b8] outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20"
          />
        </div>
        <button className="p-2 hover:bg-[#f1f5f9] rounded-lg transition-colors">
          <Bell size={20} className="text-[#64748b]" />
        </button>
        <button className="p-2 hover:bg-[#f1f5f9] rounded-lg transition-colors">
          <Settings size={20} className="text-[#64748b]" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white font-semibold cursor-pointer">
          JD
        </div>
      </div>
    </div>
  );
}
