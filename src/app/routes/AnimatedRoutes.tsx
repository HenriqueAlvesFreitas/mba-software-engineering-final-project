import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy load das páginas
const UploadPage = lazy(() => import("../pages/UploadPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const ChatPage = lazy(() => import("../pages/ChatPage"));
const StatisticsPage = lazy(() => import("../pages/StatisticsPage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));

// Fallback loader simples
const Loader = () => <div>Loading...</div>;

// (Opcional) Proteção futura
const ProtectedRoute = ({ children }: any) => {
  const hasData = true; // depois você pode validar se tem dados carregados
  if (!hasData) return <Navigate to="/" />;
  return children;
};

export const ROUTES = [
    { path: "/dashboard", title: "Data Analysis" },
    { path: "/upload", title: "Data Upload" },
    { path: "/chat", title: "History" },
    { path: "/statistics", title: "Statistics" },
    { path: "/settings", title: "Settings" },
  ];

export default function AnimatedRoutes(props: any) {
  return (  
    <Suspense fallback={<Loader />}>
      <Routes>

        {/* Upload (entrada do sistema) */}
        <Route path="/" element={<UploadPage {...props} />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage {...props} />
            </ProtectedRoute>
          }
        />

        {/* Chat IA */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage {...props} />
            </ProtectedRoute>
          }
        />

        {/* Estatísticas */}
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <StatisticsPage {...props} />
            </ProtectedRoute>
          }
        />

        {/* Configurações */}
        <Route
          path="/settings"
          element={
            <SettingsPage {...props} />
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}