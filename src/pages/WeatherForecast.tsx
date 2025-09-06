import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Droplets,
  Wind,
  Eye,
  Sun,
  Cloud,
  CloudRain,
  AlertTriangle,
  MessageCircle,
  Navigation,
} from "lucide-react";

const API_KEY = "94fcf5aaafc2d1c3f1d0c7e4b81a120d"; // <-- Replace with your OpenWeatherMap API key

const WeatherForecast = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({
    current: {
      temperature: 0,
      humidity: 0,
      rainfall: 0,
      windSpeed: 0,
      visibility: 0,
      condition: "sunny",
    },
    forecast: [] as any[],
    alerts: [] as any[],
  });

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string, size = "w-8 h-8") => {
    switch (condition) {
      case "sunny":
      case "clear":
        return <Sun className={`${size} text-orange-500`} />;
      case "cloudy":
      case "clouds":
        return <Cloud className={`${size} text-gray-500`} />;
      case "partly-cloudy":
        return <Cloud className={`${size} text-blue-500`} />;
      case "rainy":
      case "rain":
        return <CloudRain className={`${size} text-blue-600`} />;
      default:
        return <Sun className={`${size} text-orange-500`} />;
    }
  };

  // Fetch current weather
  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=94fcf5aaafc2d1c3f1d0c7e4b81a120d`
      );
      const data = await res.json();

      setWeatherData((prev) => ({
        ...prev,
        current: {
          temperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          rainfall: data.rain ? data.rain["1h"] || 0 : 0,
          windSpeed: data.wind.speed,
          visibility: data.visibility / 1000,
          condition: data.weather[0].main.toLowerCase(),
        },
      }));
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  // Fetch 7-day forecast
  // const fetchForecast = async (lat: number, lon: number) => {
  //   try {
  //     const res = await fetch(
  //       `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
  //     );
  //     const data = await res.json();

  //   // Group 3-hourly data into days
  //   const daily: Record<string, any[]> = {};
  //   data.list.forEach((item: any) => {
  //     const date = new Date(item.dt * 1000);
  //     const dayKey = date.toLocaleDateString("en-US", { weekday: "short" });
  //     if (!daily[dayKey]) daily[dayKey] = [];
  //     daily[dayKey].push(item);
  //   });

    // Process each day's forecast
const fetchForecast = async (lat: number, lon: number) => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
    );
    const data = await res.json();

    if (!data.daily) {
      console.error("Forecast API error:", data);
      return;
    }

    const forecast = data.daily.time.map((date: string, idx: number) => {
      const day = new Date(date);
      return {
        day: idx === 0 ? "Today" : day.toLocaleDateString("en-US", { weekday: "short" }),
        temp: {
          high: Math.round(data.daily.temperature_2m_max[idx]),
          low: Math.round(data.daily.temperature_2m_min[idx]),
        },
        condition:
          data.daily.precipitation_sum[idx] > 5
            ? "rain"
            : data.daily.precipitation_sum[idx] > 0
            ? "clouds"
            : "clear",
        rain: Math.round(data.daily.precipitation_sum[idx]), // in mm
      };
    });

    setWeatherData((prev) => ({
      ...prev,
      forecast,
    }));
  } catch (err) {
    console.error("Error fetching forecast:", err);
  }
};
  // Auto-detect location and fetch weather
  const getAutoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude}, ${longitude}`);
        fetchWeather(latitude, longitude);
        fetchForecast(latitude, longitude);
      });
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">🌤️ Weather Forecasting</h1>
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
                    <div className="text-muted-foreground capitalize">{weatherData.current.condition}</div>
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

            {/* 7-Day Forecast */}
            <div className="agricultural-card p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6">7-Day Forecast</h2>
              <div className="space-y-4">
                {weatherData.forecast.map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 text-sm font-medium text-muted-foreground">{day.day}</div>
                      {getWeatherIcon(day.condition, "w-6 h-6")}
                      <div className="capitalize text-foreground">{day.condition}</div>
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
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            {/* AI Highlights */}
            <div className="agricultural-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">AI Farming Insights</h3>
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
