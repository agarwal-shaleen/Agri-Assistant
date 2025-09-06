import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  Droplets, 
  Cloud,
  Sun,
  ChevronLeft,
  ChevronRight,
  Info,
  TrendingUp,
  AlertCircle
} from "lucide-react";

const IrrigationPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // Mock irrigation data
  const irrigationDays = [3, 7, 10, 14, 17, 21, 24, 28];
  const today = new Date().getDate();

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
    setSelectedDay(null);
  };

  const isIrrigationDay = (day: number) => irrigationDays.includes(day);
  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === currentDate.getMonth() && 
           today.getFullYear() === currentDate.getFullYear();
  };

  const getDayStatus = (day: number) => {
    if (isToday(day)) return 'today';
    if (isIrrigationDay(day)) return 'irrigation';
    return 'normal';
  };

  const getIrrigationDetails = (day: number) => {
    if (!isIrrigationDay(day)) return null;
    
    return {
      time: "6:00 AM - 8:00 AM",
      duration: "2 hours",
      amount: "25mm",
      method: "Drip irrigation",
      notes: "Focus on root zone watering for optimal absorption"
    };
  };

  const nextIrrigationDay = irrigationDays.find(day => day > today) || irrigationDays[0];

  const recommendations = [
    {
      icon: <Droplets className="w-5 h-5 text-blue-500" />,
      title: "Optimal Irrigation Schedule",
      description: "Water every 3-4 days based on soil moisture and weather conditions"
    },
    {
      icon: <Sun className="w-5 h-5 text-orange-500" />,
      title: "Best Timing",
      description: "Early morning (6-8 AM) to minimize evaporation and fungal diseases"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      title: "Water Efficiency",
      description: "Drip irrigation reduces water usage by 30-50% compared to sprinklers"
    }
  ];

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
            💧 Irrigation Planner
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Smart irrigation scheduling based on weather patterns, soil moisture, and crop requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:col-span-2 agricultural-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
                <CalendarIcon className="w-6 h-6 text-primary" />
                Irrigation Calendar
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-medium min-w-[200px] text-center">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before the first day of the month */}
              {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, index) => (
                <div key={`empty-${index}`} className="p-2"></div>
              ))}
              
              {/* Days of the month */}
              {Array.from({ length: getDaysInMonth(currentDate) }).map((_, index) => {
                const day = index + 1;
                const status = getDayStatus(day);
                
                return (
                  <motion.button
                    key={day}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                    className={`
                      p-3 rounded-lg text-sm font-medium transition-all duration-200 relative
                      ${status === 'today' ? 'ring-2 ring-primary ring-offset-2 bg-primary/10 text-primary' : ''}
                      ${status === 'irrigation' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : ''}
                      ${status === 'normal' ? 'hover:bg-muted text-foreground' : ''}
                      ${selectedDay === day ? 'scale-105 shadow-soft' : ''}
                    `}
                  >
                    {day}
                    {isIrrigationDay(day) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-bounce-subtle"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary/20 border-2 border-primary rounded"></div>
                <span className="text-sm text-muted-foreground">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 rounded relative">
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm text-muted-foreground">Irrigation Day</span>
              </div>
            </div>

            {/* Day Details */}
            <AnimatePresence>
              {selectedDay && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 bg-card border border-border rounded-lg"
                >
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    {currentDate.toLocaleDateString('en-US', { month: 'long' })} {selectedDay}
                  </h4>
                  
                  {isIrrigationDay(selectedDay) ? (
                    <div className="space-y-3">
                      {(() => {
                        const details = getIrrigationDetails(selectedDay);
                        return details && (
                          <>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Time</p>
                                <p className="font-medium">{details.time}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Duration</p>
                                <p className="font-medium">{details.duration}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Amount</p>
                                <p className="font-medium">{details.amount}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Method</p>
                                <p className="font-medium">{details.method}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-blue-800">{details.notes}</p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Sun className="w-4 h-4" />
                      <span className="text-sm">No irrigation scheduled for this day</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar with AI Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Next Irrigation */}
            <div className="agricultural-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
                <Droplets className="w-5 h-5 text-primary" />
                Next Irrigation
              </h3>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-primary rounded-lg p-4 text-primary-foreground"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">
                    {currentDate.toLocaleDateString('en-US', { month: 'short' })} {nextIrrigationDay}
                  </div>
                  <div className="text-primary-foreground/80 text-sm">
                    {nextIrrigationDay > today ? 
                      `In ${nextIrrigationDay - today} days` : 
                      'Next month'
                    }
                  </div>
                  <div className="mt-3 text-sm">
                    6:00 AM - 8:00 AM
                  </div>
                </div>
              </motion.div>
            </div>

            {/* AI Recommendations */}
            <div className="agricultural-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                AI Suggestions
              </h3>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="p-2 bg-background rounded">
                      {rec.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{rec.title}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">{rec.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Weather Alert */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="agricultural-card p-6 border-orange-200 bg-orange-50/50"
            >
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                Weather Alert
              </h3>
              <div className="flex items-start gap-3">
                <Cloud className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium text-foreground">Rain Expected Tomorrow</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    15mm rainfall predicted. Consider adjusting irrigation schedule.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationPlanner;