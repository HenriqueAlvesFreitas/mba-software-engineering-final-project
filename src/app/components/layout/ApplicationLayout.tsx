import { useState, useEffect } from "react";
import { BrowserRouter, Outlet, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { ROUTES } from "../../routes/AnimatedRoutes";
import { DataRow } from "../ManualDataEntry";
import { Message } from "../ChatBox";
import { generateMockData } from "../../utils/mockData";
import { generateAIResponse } from "../../utils/aiSimulation";
import { Sidebar } from "../Sidebar";
import { MobileMenu } from "../MobileMenu";
import { Header } from "../Header";


export default function ApplicationLayout() {
  const [data, setData] = useState<DataRow[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const route = ROUTES.find(r => r.path === location.pathname);
  const title = route?.title || "Dashboard";

  useEffect(() => {
    const mockData = generateMockData();
    setData(mockData);
  }, []);

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const aiResponse = generateAIResponse(text, data);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);
  };

 

  return (
      <div className="flex h-screen bg-[#f8fafc]">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center gap-4 lg:hidden px-4 py-3 bg-white border-b border-[#e2e8f0]">
            <button onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h1>{title}</h1>
          </div>

          <div className="hidden lg:block">
            <Header title={title}/>
          </div>

          <div className="flex-1 overflow-auto">
            <Outlet/>
          </div>
        </div>
      </div>
  );
}