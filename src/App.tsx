
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VideoAnalyzer from "./pages/VideoAnalyzer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipPrimitive.Provider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/video-analyzer" element={<VideoAnalyzer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipPrimitive.Provider>
  </QueryClientProvider>
);

export default App;
