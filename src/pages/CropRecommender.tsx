import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Thermometer, 
  Droplets, 
  Cloud, 
  Beaker,
  Leaf,
  TrendingUp,
  MapPin,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  temperature: z.string().min(1, "Temperature is required"),
  humidity: z.string().min(1, "Humidity is required"),
  rainfall: z.string().min(1, "Rainfall is required"),
  nitrogen: z.string().min(1, "Nitrogen content is required"),
  phosphorus: z.string().min(1, "Phosphorus content is required"),
  potassium: z.string().min(1, "Potassium content is required"),
  soilPh: z.string().min(1, "Soil pH is required"),
  soilType: z.string().min(1, "Soil type is required"),
  season: z.string().min(1, "Season is required"),
});

interface CropRecommendation {
  id: string;
  name: string;
  image: string;
  expectedYield: string;
  description: string;
  suitability: number;
  advantages: string[];
}

const CropRecommender = () => {
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      temperature: "",
      humidity: "",
      rainfall: "",
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      soilPh: "",
      soilType: "",
      season: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setHasSubmitted(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockRecommendations: CropRecommendation[] = [
        {
          id: "1",
          name: "Tomatoes",
          image: "🍅",
          expectedYield: "15-20 tons/hectare",
          description: "High-value crop with excellent market demand. Suitable for your soil conditions.",
          suitability: 95,
          advantages: ["High market value", "Good yield potential", "Disease resistant varieties available"]
        },
        {
          id: "2",
          name: "Corn",
          image: "🌽",
          expectedYield: "8-12 tons/hectare",
          description: "Staple crop with consistent demand and good storage characteristics.",
          suitability: 88,
          advantages: ["Stable market", "Good storage life", "Multiple harvest seasons"]
        },
        {
          id: "3",
          name: "Potatoes",
          image: "🥔",
          expectedYield: "20-25 tons/hectare",
          description: "Excellent choice for your climate. High yield and versatile market applications.",
          suitability: 92,
          advantages: ["High yield", "Multiple varieties", "Year-round market demand"]
        },
        {
          id: "4",
          name: "Carrots",
          image: "🥕",
          expectedYield: "30-40 tons/hectare",
          description: "Root vegetable that thrives in your soil type with good nutritional value.",
          suitability: 85,
          advantages: ["High nutritional value", "Good soil compatibility", "Extended harvest period"]
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 2000);
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
            🌱 Crop Recommender
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Get AI-powered crop recommendations based on your specific farm conditions and soil analysis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="agricultural-card p-6"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />
              Farm Conditions
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Climate Conditions */}
                  <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-orange-500" />
                          Temperature (°C)
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="25"
                            className="agricultural-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="humidity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          Humidity (%)
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="65"
                            className="agricultural-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rainfall"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Cloud className="w-4 h-4 text-cyan-500" />
                          Rainfall (mm)
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="150"
                            className="agricultural-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="soilPh"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Beaker className="w-4 h-4 text-purple-500" />
                          Soil pH
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="6.5"
                            className="agricultural-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Soil Nutrients */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                    <Beaker className="w-5 h-5 text-primary" />
                    Soil Nutrients (kg/ha)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="nitrogen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nitrogen (N)</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="40"
                              className="agricultural-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phosphorus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phosphorus (P)</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="50"
                              className="agricultural-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="potassium"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Potassium (K)</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="60"
                              className="agricultural-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="soilType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soil Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="agricultural-input">
                              <SelectValue placeholder="Select soil type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sandy">Sandy</SelectItem>
                            <SelectItem value="clay">Clay</SelectItem>
                            <SelectItem value="loam">Loam</SelectItem>
                            <SelectItem value="silt">Silt</SelectItem>
                            <SelectItem value="peaty">Peaty</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="season"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-500" />
                          Season
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="agricultural-input">
                              <SelectValue placeholder="Select season" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="spring">Spring</SelectItem>
                            <SelectItem value="summer">Summer</SelectItem>
                            <SelectItem value="autumn">Autumn</SelectItem>
                            <SelectItem value="winter">Winter</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="agricultural-button w-full text-lg py-6"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin"></div>
                      Analyzing Conditions...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Leaf className="w-5 h-5" />
                      Get AI Recommendations
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Recommendations Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="agricultural-card p-6"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              AI Recommendations
            </h2>

            <AnimatePresence mode="wait">
              {!hasSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-gradient-sage rounded-full flex items-center justify-center mx-auto mb-6">
                    <Leaf className="w-12 h-12 text-sage-dark" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Ready for Analysis
                  </h3>
                  <p className="text-muted-foreground">
                    Fill in your farm conditions to get personalized crop recommendations from our AI.
                  </p>
                </motion.div>
              ) : isLoading ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <div className="w-12 h-12 border-4 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Analyzing Your Farm
                  </h3>
                  <p className="text-muted-foreground">
                    Our AI is processing your soil conditions and climate data...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {recommendations.map((crop, index) => (
                    <motion.div
                      key={crop.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{crop.image}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-foreground">{crop.name}</h4>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm font-medium text-green-600">{crop.suitability}% match</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{crop.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <TrendingUp className="w-4 h-4 text-primary" />
                              <span>{crop.expectedYield}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {crop.advantages.map((advantage, i) => (
                              <span 
                                key={i}
                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                              >
                                {advantage}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommender;