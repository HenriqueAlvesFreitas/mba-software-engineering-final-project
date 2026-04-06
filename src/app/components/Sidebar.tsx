import { LayoutDashboard, Upload, History, Settings, BarChart3 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/upload", label: "Data Upload", icon: Upload },
    { path: "/chat", label: "AI Chat", icon: History },
    { path: "/statistics", label: "Statistics", icon: BarChart3 },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-[250px] h-screen bg-[#1e293b] flex flex-col">
      <div className="p-6 border-b border-[#334155]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-lg flex items-center justify-center">
            <BarChart3 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">DataInsight</h1>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
       {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                isActive
                  ? 'bg-[#3b82f6] text-white'
                  : 'text-[#cbd5e1] hover:bg-[#334155]'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#334155]">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-white">John Doe</div>
            <div className="text-xs text-[#94a3b8]">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
