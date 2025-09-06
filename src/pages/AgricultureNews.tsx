import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  Search,
  Filter,
  Bookmark,
  Share2,
  TrendingUp,
  Globe,
  Leaf
} from "lucide-react";

const AgricultureNews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock news data
  const newsArticles = [
    {
      id: 1,
      title: "Revolutionary Drought-Resistant Wheat Varieties Show 40% Higher Yields",
      summary: "New genetically modified wheat varieties developed by international researchers demonstrate remarkable resistance to drought conditions while maintaining nutritional value.",
      category: "technology",
      source: "Agricultural Research Today",
      publishedAt: "2024-06-15T08:30:00Z",
      readTime: "5 min read",
      imageUrl: "/api/placeholder/400/200",
      trending: true
    },
    {
      id: 2,
      title: "Global Fertilizer Prices Expected to Stabilize by Q4 2024",
      summary: "Market analysts predict fertilizer prices will normalize as supply chain disruptions ease and new production facilities come online.",
      category: "market",
      source: "Farm Economics Weekly",
      publishedAt: "2024-06-14T14:15:00Z",
      readTime: "3 min read",
      imageUrl: "/api/placeholder/400/200",
      trending: false
    },
    {
      id: 3,
      title: "AI-Powered Pest Detection Systems Reduce Crop Loss by 35%",
      summary: "Farmers adopting AI-based monitoring systems report significant reduction in pest-related crop damage and decreased pesticide usage.",
      category: "technology",
      source: "Smart Farming Magazine",
      publishedAt: "2024-06-14T10:45:00Z",
      readTime: "4 min read",
      imageUrl: "/api/placeholder/400/200",
      trending: true
    },
    {
      id: 4,
      title: "Climate Change Adaptation Strategies for Small-Scale Farmers",
      summary: "New research reveals effective low-cost adaptation techniques helping small farmers cope with changing weather patterns.",
      category: "climate",
      source: "Environmental Agriculture",
      publishedAt: "2024-06-13T16:20:00Z",
      readTime: "6 min read",
      imageUrl: "/api/placeholder/400/200",
      trending: false
    },
    {
      id: 5,
      title: "Organic Farming Market Grows 15% Annually as Consumer Demand Rises",
      summary: "The organic farming sector continues its strong growth trajectory, driven by health-conscious consumers and premium pricing.",
      category: "market",
      source: "Organic Trade Association",
      publishedAt: "2024-06-13T09:00:00Z",
      readTime: "4 min read",
      imageUrl: "/api/placeholder/400/200",
      trending: false
    },
    {
      id: 6,
      title: "Vertical Farming Ventures Secure $500M in New Investment Funding",
      summary: "Major agricultural technology companies attract significant investment as vertical farming scales up for commercial production.",
      category: "technology",
      source: "AgTech Investor",
      publishedAt: "2024-06-12T12:30:00Z",
      readTime: "3 min read",
      imageUrl: "/api/placeholder/400/200",
      trending: true
    }
  ];

  const categories = [
    { value: "all", label: "All News", icon: <Globe className="w-4 h-4" /> },
    { value: "technology", label: "Technology", icon: <TrendingUp className="w-4 h-4" /> },
    { value: "market", label: "Market", icon: <Calendar className="w-4 h-4" /> },
    { value: "climate", label: "Climate", icon: <Leaf className="w-4 h-4" /> }
  ];

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technology": return "bg-blue-100 text-blue-800";
      case "market": return "bg-green-100 text-green-800";
      case "climate": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-full bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            📰 Agricultural News
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Stay updated with the latest developments in agriculture, technology, and market trends.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="agricultural-card p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search news articles..."
                className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${selectedCategory === category.value 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }
                    `}
                  >
                    {category.icon}
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trending Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            Trending Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.filter(article => article.trending).slice(0, 3).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="agricultural-card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="relative mb-4">
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    🔥 Trending
                  </div>
                  <div className="w-full h-40 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <Leaf className="w-12 h-12 text-green-500" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                  </div>
                  
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Latest News ({filteredNews.length} articles)
          </h2>
          
          <div className="space-y-6">
            {filteredNews.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="agricultural-card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="lg:w-48 lg:h-32 w-full h-40 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-8 h-8 text-green-500" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                          </span>
                          {article.trending && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              🔥 Trending
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        
                        <p className="text-muted-foreground">
                          {article.summary}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{article.source}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(article.publishedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredNews.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or category filter.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AgricultureNews;