
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AppShell from "./components/layout/AppShell";
import Dashboard from "./pages/Dashboard";
import Scans from "./pages/Scans";
import NewScan from "./pages/NewScan";
import ScanResults from "./pages/ScanResults";
import Vulnerabilities from "./pages/Vulnerabilities";
import Reports from "./pages/Reports";
import Console from "./pages/Console";
import Settings from "./pages/Settings";
import TargetManager from "./pages/TargetManager";
import { ThemeProvider } from "./contexts/ThemeContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppShell><Dashboard /></AppShell>} />
            <Route path="/scans" element={<AppShell><Scans /></AppShell>} />
            <Route path="/scans/new" element={<AppShell><NewScan /></AppShell>} />
            <Route path="/scans/results/:id" element={<AppShell><ScanResults /></AppShell>} />
            <Route path="/vulnerabilities" element={<AppShell><Vulnerabilities /></AppShell>} />
            <Route path="/reports" element={<AppShell><Reports /></AppShell>} />
            <Route path="/console" element={<AppShell><Console /></AppShell>} />
            <Route path="/targets" element={<AppShell><TargetManager /></AppShell>} />
            <Route path="/settings" element={<AppShell><Settings /></AppShell>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
