import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  MessageCircle,
  Sprout,
  Droplets,
  Bug,
  Settings,
  Home,
  CloudSun,
  TrendingUp,
  Newspaper,
  Clock,
  Star
} from "lucide-react";

const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("features");

  const features = [
    { title: "Home", url: "/", icon: Home },
    { title: "AI Chat", url: "/chat", icon: MessageCircle },
    { title: "Crop Advisor", url: "/crop-recommender", icon: Sprout },
    { title: "Pest & Disease Expert", url: "/pest-expert", icon: Bug },
    { title: "Irrigation Planner", url: "/irrigation-planner", icon: Droplets },
    { title: "Weather Forecast", url: "/weather-forecast", icon: CloudSun },
    { title: "Soil & Fertilizer Guide", url: "/fertilizer-guide", icon: Settings },
    { title: "Market Analyst", url: "/market-analyst", icon: TrendingUp },
    { title: "Agricultural News", url: "/agriculture-news", icon: Newspaper },
  ];

  const chatHistory = [
    { id: 1, title: "Tomato pest identification", time: "2 hours ago", starred: true },
    { id: 2, title: "Wheat fertilizer recommendations", time: "1 day ago", starred: false },
    { id: 3, title: "Irrigation schedule for corn", time: "3 days ago", starred: false },
    { id: 4, title: "Market prices for soybeans", time: "1 week ago", starred: true },
    { id: 5, title: "Weather forecast discussion", time: "2 weeks ago", starred: false },
  ];

  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarHeader className="border-b border-border p-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Sprout className="w-6 h-6 text-primary-foreground" />
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="text-lg font-bold text-foreground">AgriBot</h2>
              <p className="text-sm text-muted-foreground">Smart Farming Assistant</p>
            </div>
          )}
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {state === "expanded" && (
          <div className="mb-6">
            <div className="flex border-b border-border">
              <button
                onClick={() => setActiveTab("features")}
                className={`flex-1 py-2 px-3 text-sm font-medium transition-colors ${
                  activeTab === "features"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-2 px-3 text-sm font-medium transition-colors ${
                  activeTab === "history"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Chat History
              </button>
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <SidebarMenu>
            {features.map((item, index) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`
                    }
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>
                    {state === "expanded" && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.1 }}
                        className="font-medium"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}

        {activeTab === "history" && state === "expanded" && (
          <div className="space-y-2">
            {chatHistory.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {chat.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                  </div>
                  {chat.starred && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;