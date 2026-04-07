import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy load das páginas
const UploadPage = lazy(() => import("../pages/UploadPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const ChatPage = lazy(() => import("../pages/ChatPage"));
const StatisticsPage = lazy(() => import("../pages/StatisticsPage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const ApplicationLayout = lazy(() => import("../components/layout/ApplicationLayout"));


// Fallback loader simples
const Loader = () => <div>Loading...</div>;



const ProtectedRoute = ({ children }: any) => {
  const connected = localStorage.getItem("isAuthenticated");

  console.log(connected)
  if (!connected) return <Navigate to="/login" />;

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

        <Route element={<ApplicationLayout />}>

          <Route path="/" 
            element={
              <ProtectedRoute>
                <UploadPage {...props} />
              </ProtectedRoute>
              
            }  
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage {...props} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage {...props} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/statistics"
            element={
              <ProtectedRoute>
                <StatisticsPage {...props} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage {...props} />
              </ProtectedRoute>
              
            }
          />

          <Route path="*" 
            element={
              <ProtectedRoute>
                <Navigate to="/" />
              </ProtectedRoute>
              } 
          />

        </Route>

        <Route
          path="/login"
          element={
            <LoginPage {...props} />
          }
        />
        
      </Routes>
    </Suspense>
  );
}