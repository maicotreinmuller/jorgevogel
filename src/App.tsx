import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import Index from "./pages/Index";
import Clients from "./pages/Clients";
import ServiceOrders from "./pages/ServiceOrders";
import Purchases from "./pages/Purchases";
import DataManagement from "./pages/DataManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex flex-1 flex-col pb-16 md:pb-0">
              <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-4 md:px-6">
                <SidebarTrigger className="md:inline-flex hidden" />
                <h2 className="ml-4 md:ml-4 text-lg font-semibold md:text-xl">Vogel | InfoControl</h2>
              </header>
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/service-orders" element={<ServiceOrders />} />
                  <Route path="/purchases" element={<Purchases />} />
                  <Route path="/data-management" element={<DataManagement />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;