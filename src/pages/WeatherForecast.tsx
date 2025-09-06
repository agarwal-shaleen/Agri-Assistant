import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Sun, 
  Cloud, 
  CloudRain,
  AlertTriangle,
  MessageCircle,
  Navigation
} from "lucide-react";

const WeatherForecast = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({
    current: {
      temperature: 28,
      humidity: 65,
      rainfall: 0,
      windSpeed: 12,
      visibility: 10,
      condition: "partly-cloudy"
    },
    forecast: [
      { day: "Today", temp: { high: 32, low: 22 }, condition: "sunny", rain: 0 },
      { day: "Tomorrow", temp: { high: 30, low: 20 }, condition: "cloudy", rain: 5 },
      { day: "Wed", temp: { high: 25, low: 18 }, condition: "rainy", rain: 25 },
      { day: "Thu", temp: { high: 27, low: 19 }, condition: "partly-cloudy", rain: 0 },
      { day: "Fri", temp: { high: 29, low: 21 }, condition: "sunny", rain: 0 }
    ],
    alerts: [
      {
        type: "critical",
        title: "Heavy Rain Alert",
        message: "Moderate to heavy rainfall expected in the next 48 hours. Consider protecting sensitive crops and adjusting irrigation schedules.",
        icon: <CloudRain className="w-5 h-5" />
      }
    ]
  });

  const getWeatherIcon = (condition: string, size = "w-8 h-8") => {
    switch (condition) {
      case "sunny":
        return <Sun className={`${size} text-orange-500`} />;
      case "cloudy":
        return <Cloud className={`${size} text-gray-500`} />;
      case "partly-cloudy":
        return <Cloud className={`${size} text-blue-500`} />;
      case "rainy":
        return <CloudRain className={`${size} text-blue-600`} />;
      default:
        return <Sun className={`${size} text-orange-500`} />;
    }
  };

  const getAutoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
        // Here you would typically call a reverse geocoding API
        console.log("Location:", position.coords);
      });
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            🌤️ Weather Forecasting
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Get accurate weather forecasts and agricultural insights to optimize your farming operations.
          </p>
        </motion.div>

        {/* Location Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="agricultural-card p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location (city, state, or coordinates)"
                className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={getAutoLocation}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              Auto-locate
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Current Weather */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-2 space-y-6"
          >
            {/* Current Conditions */}
            <div className="agricultural-card p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Current Weather</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main Weather Display */}
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full">
                    {getWeatherIcon(weatherData.current.condition, "w-12 h-12")}
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-foreground mb-1">
                      {weatherData.current.temperature}°C
                    </div>
                    <div className="text-muted-foreground capitalize">
                      {weatherData.current.condition.replace('-', ' ')}
                    </div>
                  </div>
                </div>

                {/* Weather Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-sm text-muted-foreground">Humidity</div>
                      <div className="font-semibold">{weatherData.current.humidity}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Wind className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-muted-foreground">Wind</div>
                      <div className="font-semibold">{weatherData.current.windSpeed} km/h</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <CloudRain className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-sm text-muted-foreground">Rainfall</div>
                      <div className="font-semibold">{weatherData.current.rainfall} mm</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Eye className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="text-sm text-muted-foreground">Visibility</div>
                      <div className="font-semibold">{weatherData.current.visibility} km</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="agricultural-card p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6">5-Day Forecast</h2>
              
              <div className="space-y-4">
                {weatherData.forecast.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 text-sm font-medium text-muted-foreground">
                        {day.day}
                      </div>
                      {getWeatherIcon(day.condition, "w-6 h-6")}
                      <div className="capitalize text-foreground">
                        {day.condition.replace('-', ' ')}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span>{day.rain}%</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-foreground">
                          {day.temp.high}° / {day.temp.low}°
                        </div>
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
            {/* Weather Alerts */}
            {weatherData.alerts.length > 0 && (
              <div className="agricultural-card p-6 border-orange-200 bg-orange-50/50">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Weather Alerts
                </h3>
                
                <div className="space-y-4">
                  {weatherData.alerts.map((alert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`
                        p-4 rounded-lg border-l-4
                        ${alert.type === 'critical' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'}
                      `}
                    >
                      <div className="flex items-start gap-3">
                        {alert.icon}
                        <div>
                          <h4 className="font-medium text-foreground mb-1">
                            {alert.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {alert.message}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Highlights */}
            <div className="agricultural-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                AI Farming Insights
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Irrigation Recommendation</h4>
                  <p className="text-sm text-blue-700">
                    With upcoming rainfall, consider reducing irrigation by 30% for the next 3 days.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Optimal Conditions</h4>
                  <p className="text-sm text-green-700">
                    Tomorrow's weather is ideal for fertilizer application before the rain.
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Pest Alert</h4>
                  <p className="text-sm text-yellow-700">
                    High humidity may increase fungal disease risk. Monitor crops closely.
                  </p>
                </div>
              </div>
            </div>

            {/* Chat with Weather Specialist */}
            <div className="agricultural-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-primary" />
                Weather Specialist
              </h3>
              
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Get personalized weather advice for your specific crops and location.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-primary text-primary-foreground py-3 rounded-lg font-medium hover:shadow-md transition-all duration-200"
                >
                  Start Weather Chat
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;