import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import CropRecommender from "./pages/CropRecommender";
import FertilizerGuide from "./pages/FertilizerGuide";
import IrrigationPlanner from "./pages/IrrigationPlanner";
import PestExpert from "./pages/PestExpert";
import WeatherForecast from "./pages/WeatherForecast";
import MarketAnalyst from "./pages/MarketAnalyst";
import AgricultureNews from "./pages/AgricultureNews";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<SidebarProvider><Layout><Index /></Layout></SidebarProvider>} />
          <Route path="/chat" element={<SidebarProvider><Layout><Chat /></Layout></SidebarProvider>} />
          <Route path="/crop-recommender" element={<SidebarProvider><Layout><CropRecommender /></Layout></SidebarProvider>} />
          <Route path="/fertilizer-guide" element={<SidebarProvider><Layout><FertilizerGuide /></Layout></SidebarProvider>} />
          <Route path="/irrigation-planner" element={<SidebarProvider><Layout><IrrigationPlanner /></Layout></SidebarProvider>} />
          <Route path="/pest-expert" element={<SidebarProvider><Layout><PestExpert /></Layout></SidebarProvider>} />
          <Route path="/weather-forecast" element={<SidebarProvider><Layout><WeatherForecast /></Layout></SidebarProvider>} />
          <Route path="/market-analyst" element={<SidebarProvider><Layout><MarketAnalyst /></Layout></SidebarProvider>} />
          <Route path="/agriculture-news" element={<SidebarProvider><Layout><AgricultureNews /></Layout></SidebarProvider>} />
          <Route path="*" element={<SidebarProvider><Layout><NotFound /></Layout></SidebarProvider>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;