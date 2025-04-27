
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VideoAnalyzer from "./pages/VideoAnalyzer";
import Login from "./pages/Login";
import TitleGenerator from "./pages/TitleGenerator";
import ScriptGenerator from "./pages/ScriptGenerator";
import SubnicheValidator from "./pages/SubnicheValidator";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const AuthenticatedRoutes = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/video-analyzer" element={<VideoAnalyzer />} />
      <Route path="/title-generator" element={<TitleGenerator />} />
      <Route path="/script-generator" element={<ScriptGenerator />} />
      <Route path="/subnicho-validator" element={<SubnicheValidator />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipPrimitive.Provider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <AuthProvider>
              <AuthenticatedRoutes />
            </AuthProvider>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipPrimitive.Provider>
  </QueryClientProvider>
);

export default App;
