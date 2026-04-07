import { LayoutDashboard, Upload, History, Settings, BarChart3 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const getUserInfo = () => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      return {
        name: "John Doe",
        initials: "JD",
      };
    }

    try {
      const parsed = JSON.parse(stored);
      const email: string = parsed.email || "";

      const namePart = email.split("@")[0]; // antes do @

      // separa por ponto (henrique.freitas)
      const parts = namePart.split(".");

      // nome formatado
      const name = parts
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");

      // iniciais (HF)
      const initials = parts
        .map((p) => p.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("");

      return {
        name: name || "John Doe",
        initials: initials || "JD",
      };
    } catch {
      return {
        name: "John Doe",
        initials: "JD",
      };
    }
  };

  const { name, initials } = getUserInfo();

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
        
        {/* Ícone */}
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] blur-md opacity-50 rounded-xl"></div>

          {/* Box principal */}
          <div className="relative w-10 h-10 bg-gradient-to-br from-[#2563eb] to-[#7c3aed] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">🤖</span>
          </div>
        </div>

        {/* Nome */}
        <h1 className="text-white text-lg">
          <span className="font-semibold">Agent</span>
          <span className="font-light text-[#cbd5e1]">Squad</span>
        </h1>

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
            {initials}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-white">{name}</div>
            <div className="text-xs text-[#94a3b8]">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
