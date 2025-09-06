import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  MessageCircle, 
  Sprout, 
  Beaker, 
  Calendar,
  ArrowRight,
  Users,
  TrendingUp,
  Shield
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Chat Assistant",
      description: "Get instant answers to your farming questions from our intelligent AI assistant.",
      href: "/chat",
      color: "text-blue-500"
    },
    {
      icon: Sprout,
      title: "Crop Recommender",
      description: "Discover the best crops for your soil and climate conditions.",
      href: "/crop-recommender",
      color: "text-green-500"
    },
    {
      icon: Beaker,
      title: "Fertilizer Guide",
      description: "Get personalized fertilizer recommendations for optimal crop growth.",
      href: "/fertilizer-guide",
      color: "text-orange-500"
    },
    {
      icon: Calendar,
      title: "Irrigation Planner",
      description: "Plan your irrigation schedule with AI-powered insights.",
      href: "/irrigation-planner",
      color: "text-cyan-500"
    }
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Active Farmers" },
    { icon: TrendingUp, value: "40%", label: "Yield Increase" },
    { icon: Shield, value: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-16"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-primary rounded-2xl mb-6 shadow-glow">
              <span className="text-4xl">🌱</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AgriBot
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your AI-powered farming assistant for smarter crop management, 
              better yields, and sustainable agriculture practices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link 
              to="/chat"
              className="agricultural-button group flex items-center gap-2 text-lg px-8 py-4"
            >
              Start Farming Chat
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/crop-recommender"
              className="bg-background text-foreground border-2 border-border font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:bg-muted hover:scale-105 text-lg"
            >
              Explore Tools
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="px-6 py-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Farming Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to optimize your farming operations in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Link to={feature.href} className="block">
                  <div className="agricultural-card p-6 h-full hover:shadow-glow transition-all duration-300">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-primary group-hover:gap-3 transition-all">
                      <span className="text-sm font-medium">Get started</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="px-6 py-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="agricultural-card p-12 bg-gradient-to-r from-card via-muted/20 to-card">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of farmers already using AgriBot to increase yields 
              and optimize their farming operations.
            </p>
            <Link 
              to="/chat"
              className="agricultural-button group text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;