
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientsPage from "./pages/ClientsPage";
import ClientDetailsPage from "./pages/ClientDetailsPage";
import ClientFormPage from "./pages/ClientFormPage";
import TinLookupPage from "./pages/TinLookupPage";
import Layout from "./components/Layout";
import { ClientProvider } from "./context/ClientContext";
import { LocaleProvider } from "./context/LocaleContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ClientProvider>
        <LocaleProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/clients/new" element={<ClientFormPage />} />
                <Route path="/clients/:clientId" element={<ClientDetailsPage />} />
                <Route path="/clients/:clientId/edit" element={<ClientFormPage />} />
                <Route path="/tin-lookup" element={<TinLookupPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </LocaleProvider>
      </ClientProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
