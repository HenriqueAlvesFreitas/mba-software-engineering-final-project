import { useState, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { MobileMenu } from "./components/MobileMenu";

import AnimatedRoutes, { ROUTES } from "./routes/AnimatedRoutes";

import { generateMockData } from "./utils/mockData";
import { generateAIResponse } from "./utils/aiSimulation";
import type { DataRow } from "./components/ManualDataEntry";
import type { Message } from "./components/ChatBox";

export default function App() {
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
            <AnimatedRoutes
              data={data}
              setData={setData}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          
  );
}