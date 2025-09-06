import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Calendar,
  Target,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const MarketAnalyst = () => {
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [timeframe, setTimeframe] = useState("1month");

  // Mock market data
  const marketData = {
    wheat: {
      currentPrice: 45.50,
      change: 2.3,
      trend: "up",
      recommendation: "Hold - Prices expected to rise by 12% in 2 weeks",
      confidence: 85,
      priceHistory: [
        { date: "Jan", price: 42 },
        { date: "Feb", price: 44 },
        { date: "Mar", price: 43 },
        { date: "Apr", price: 45 },
        { date: "May", price: 46 },
        { date: "Jun", price: 45.5 }
      ]
    },
    corn: {
      currentPrice: 38.20,
      change: -1.5,
      trend: "down",
      recommendation: "Sell Now - Expected decline of 8% next month",
      confidence: 78,
      priceHistory: [
        { date: "Jan", price: 40 },
        { date: "Feb", price: 39 },
        { date: "Mar", price: 40.5 },
        { date: "Apr", price: 39.8 },
        { date: "May", price: 38.5 },
        { date: "Jun", price: 38.2 }
      ]
    },
    rice: {
      currentPrice: 52.75,
      change: 4.2,
      trend: "up",
      recommendation: "Buy More - Strong upward trend continues",
      confidence: 92,
      priceHistory: [
        { date: "Jan", price: 48 },
        { date: "Feb", price: 49 },
        { date: "Mar", price: 50 },
        { date: "Apr", price: 51 },
        { date: "May", price: 52 },
        { date: "Jun", price: 52.75 }
      ]
    }
  };

  const topCrops = [
    { name: "Rice", price: 52.75, change: 4.2, volume: "1,245 tons" },
    { name: "Wheat", price: 45.50, change: 2.3, volume: "2,180 tons" },
    { name: "Corn", price: 38.20, change: -1.5, volume: "3,420 tons" },
    { name: "Soybeans", price: 67.30, change: 1.8, volume: "890 tons" },
    { name: "Cotton", price: 89.45, change: -0.8, volume: "560 tons" }
  ];

  const currentCropData = marketData[selectedCrop as keyof typeof marketData];

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation.includes("Buy") || recommendation.includes("Hold")) return "text-green-700";
    if (recommendation.includes("Sell")) return "text-red-700";
    return "text-yellow-700";
  };

  const getRecommendationBg = (recommendation: string) => {
    if (recommendation.includes("Buy") || recommendation.includes("Hold")) return "bg-green-50 border-green-200";
    if (recommendation.includes("Sell")) return "bg-red-50 border-red-200";
    return "bg-yellow-50 border-yellow-200";
  };

  return (
    <div className="min-h-full bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            📊 Market Analyst
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Real-time market prices, trends analysis, and AI-powered trading recommendations for agricultural commodities.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="agricultural-card p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Crop
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="wheat">Wheat</option>
                  <option value="corn">Corn</option>
                  <option value="rice">Rice</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Timeframe
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="1week">1 Week</option>
                  <option value="1month">1 Month</option>
                  <option value="3months">3 Months</option>
                  <option value="1year">1 Year</option>
                </select>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-2 space-y-6"
          >
            {/* Current Price Card */}
            <div className="agricultural-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground capitalize">
                  {selectedCrop} Market Price
                </h2>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Last updated: 2 mins ago</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-1">
                    ${currentCropData.currentPrice}
                  </div>
                  <div className="text-sm text-muted-foreground">per quintal</div>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-1 flex items-center justify-center gap-2 ${
                    currentCropData.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {currentCropData.trend === 'up' ? (
                      <TrendingUp className="w-6 h-6" />
                    ) : (
                      <TrendingDown className="w-6 h-6" />
                    )}
                    {currentCropData.change > 0 ? '+' : ''}{currentCropData.change}%
                  </div>
                  <div className="text-sm text-muted-foreground">24h change</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {currentCropData.confidence}%
                  </div>
                  <div className="text-sm text-muted-foreground">AI confidence</div>
                </div>
              </div>

              {/* Price Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentCropData.priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#64748b"
                      fontSize={12}
                      domain={['dataMin - 2', 'dataMax + 2']}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#16a34a" 
                      strokeWidth={3}
                      dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#16a34a', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Market Overview */}
            <div className="agricultural-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-primary" />
                Today's Top Performers
              </h3>
              
              <div className="space-y-4">
                {topCrops.map((crop, index) => (
                  <motion.div
                    key={crop.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {crop.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{crop.name}</div>
                        <div className="text-sm text-muted-foreground">Vol: {crop.volume}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold text-foreground">${crop.price}</div>
                      <div className={`text-sm font-medium ${
                        crop.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {crop.change > 0 ? '+' : ''}{crop.change}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* AI Recommendation */}
            <div className={`agricultural-card p-6 border ${getRecommendationBg(currentCropData.recommendation)}`}>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
                <Target className="w-5 h-5 text-primary" />
                AI Recommendation
              </h3>
              
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="space-y-4"
              >
                <div className={`text-lg font-semibold ${getRecommendationColor(currentCropData.recommendation)}`}>
                  {currentCropData.recommendation}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Confidence Level</span>
                    <span className="font-medium">{currentCropData.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${currentCropData.confidence}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="bg-green-600 h-2 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Market Insights */}
            <div className="agricultural-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Market Insights
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Global Demand</h4>
                  <p className="text-sm text-blue-700">
                    Wheat demand from Asian markets increased by 15% this quarter.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Supply Update</h4>
                  <p className="text-sm text-green-700">
                    Favorable weather conditions expected to boost harvest yields.
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">Price Driver</h4>
                  <p className="text-sm text-orange-700">
                    Currency fluctuations impacting export competitiveness.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="agricultural-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Quick Statistics
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">52W High</span>
                  </div>
                  <span className="font-medium">$58.20</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-muted-foreground">52W Low</span>
                  </div>
                  <span className="font-medium">$38.45</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Avg Volume</span>
                  </div>
                  <span className="font-medium">2.4K tons</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-muted-foreground">Volatility</span>
                  </div>
                  <span className="font-medium">Medium</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalyst;