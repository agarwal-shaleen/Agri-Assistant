import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Beaker, 
  Leaf,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Sprout,
  FlaskConical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  nitrogen: z.string().min(1, "Nitrogen content is required"),
  phosphorus: z.string().min(1, "Phosphorus content is required"),
  potassium: z.string().min(1, "Potassium content is required"),
  soilPh: z.string().min(1, "Soil pH is required"),
  soilType: z.string().min(1, "Soil type is required"),
  crop: z.string().min(1, "Crop selection is required"),
});

interface FertilizerRecommendation {
  id: string;
  type: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  dosage: string;
  applicationMethod: string;
  timing: string;
  benefits: string[];
  precautions: string[];
  priority: 'high' | 'medium' | 'low';
}

const FertilizerGuide = () => {
  const [recommendations, setRecommendations] = useState<FertilizerRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      soilPh: "",
      soilType: "",
      crop: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setHasSubmitted(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockRecommendations: FertilizerRecommendation[] = [
        {
          id: "1",
          type: "Organic",
          icon: <Leaf className="w-6 h-6 text-green-500" />,
          title: "Compost & Organic Matter",
          description: "Rich organic compost to improve soil structure and provide slow-release nutrients.",
          dosage: "2-3 tons per hectare",
          applicationMethod: "Broadcast and incorporate into soil",
          timing: "2-3 weeks before planting",
          benefits: [
            "Improves soil structure",
            "Enhances water retention",
            "Provides micronutrients",
            "Environmentally friendly"
          ],
          precautions: [
            "Ensure compost is well-decomposed",
            "Apply when soil moisture is adequate"
          ],
          priority: 'high'
        },
        {
          id: "2",
          type: "NPK Fertilizer",
          icon: <FlaskConical className="w-6 h-6 text-blue-500" />,
          title: "Balanced NPK 15-15-15",
          description: "Balanced chemical fertilizer to address immediate nutrient needs for optimal growth.",
          dosage: "150-200 kg per hectare",
          applicationMethod: "Side-dress application",
          timing: "Split application: 50% at planting, 25% at 30 days, 25% at 60 days",
          benefits: [
            "Quick nutrient availability",
            "Balanced macro-nutrients",
            "Boosts initial growth",
            "Easy to apply"
          ],
          precautions: [
            "Don't over-apply to avoid burning",
            "Apply away from plant stems",
            "Water thoroughly after application"
          ],
          priority: 'high'
        },
        {
          id: "3",
          type: "Phosphorus Booster",
          icon: <Sprout className="w-6 h-6 text-purple-500" />,
          title: "Bone Meal Supplement",
          description: "Slow-release phosphorus source to support root development and flowering.",
          dosage: "50-75 kg per hectare",
          applicationMethod: "Work into planting holes",
          timing: "At planting and early flowering stage",
          benefits: [
            "Promotes root development",
            "Enhances flowering",
            "Long-lasting effect",
            "Natural source"
          ],
          precautions: [
            "Mix well with soil",
            "Avoid direct contact with seeds"
          ],
          priority: 'medium'
        },
        {
          id: "4",
          type: "pH Adjustment",
          icon: <Beaker className="w-6 h-6 text-orange-500" />,
          title: "Lime Application",
          description: "Agricultural lime to adjust soil pH and improve nutrient availability.",
          dosage: "500-1000 kg per hectare",
          applicationMethod: "Broadcast and till into soil",
          timing: "3-4 months before planting",
          benefits: [
            "Adjusts soil pH",
            "Improves nutrient uptake",
            "Reduces soil acidity",
            "Enhances microbial activity"
          ],
          precautions: [
            "Test soil pH before application",
            "Apply well in advance of planting",
            "Don't over-lime"
          ],
          priority: 'medium'
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-500 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-500 bg-green-50 border-green-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
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
            🧪 Fertilizer Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Get personalized fertilizer recommendations based on your soil analysis and crop selection.
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
              <FlaskConical className="w-6 h-6 text-primary" />
              Soil Analysis Input
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                {/* Soil Properties */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                {/* Crop Selection */}
                <FormField
                  control={form.control}
                  name="crop"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Sprout className="w-4 h-4 text-green-500" />
                        Crop Type
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="agricultural-input">
                            <SelectValue placeholder="Select your crop" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tomatoes">Tomatoes</SelectItem>
                          <SelectItem value="corn">Corn</SelectItem>
                          <SelectItem value="potatoes">Potatoes</SelectItem>
                          <SelectItem value="carrots">Carrots</SelectItem>
                          <SelectItem value="beans">Beans</SelectItem>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="rice">Rice</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="agricultural-button w-full text-lg py-6"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin"></div>
                      Analyzing Soil...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Beaker className="w-5 h-5" />
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
              <ShieldCheck className="w-6 h-6 text-primary" />
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
                  <div className="w-24 h-24 bg-gradient-earth rounded-full flex items-center justify-center mx-auto mb-6">
                    <Beaker className="w-12 h-12 text-earth-dark" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Ready for Analysis
                  </h3>
                  <p className="text-muted-foreground">
                    Enter your soil analysis data to get customized fertilizer recommendations.
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
                    Analyzing Soil Data
                  </h3>
                  <p className="text-muted-foreground">
                    Our AI is creating personalized fertilizer recommendations...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {recommendations.map((recommendation, index) => (
                    <motion.div
                      key={recommendation.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.15, type: "spring" }}
                      className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-muted rounded-lg">
                          {recommendation.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold text-foreground">{recommendation.title}</h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getPriorityColor(recommendation.priority)}`}>
                              {recommendation.priority} priority
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{recommendation.description}</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h5 className="font-medium text-foreground mb-1">Dosage</h5>
                              <p className="text-sm text-muted-foreground">{recommendation.dosage}</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-foreground mb-1">Application</h5>
                              <p className="text-sm text-muted-foreground">{recommendation.applicationMethod}</p>
                            </div>
                            <div className="sm:col-span-2">
                              <h5 className="font-medium text-foreground mb-1">Timing</h5>
                              <p className="text-sm text-muted-foreground">{recommendation.timing}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                Benefits
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {recommendation.benefits.map((benefit, i) => (
                                  <span 
                                    key={i}
                                    className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md"
                                  >
                                    {benefit}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-500" />
                                Precautions
                              </h5>
                              <ul className="space-y-1">
                                {recommendation.precautions.map((precaution, i) => (
                                  <li 
                                    key={i}
                                    className="text-sm text-muted-foreground flex items-start gap-2"
                                  >
                                    <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                                    {precaution}
                                  </li>
                                ))}
                              </ul>
                            </div>
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

export default FertilizerGuide;