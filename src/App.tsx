
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogListPage from "./pages/BlogListPage";
import BlogPage from "./pages/BlogPage";
import { useUrlFilter } from "./hooks/use-url-filter";

const queryClient = new QueryClient();

const AppContent = () => {
  useUrlFilter();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/:id" element={<BlogPage />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
