import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Plane, Wallet, TrendingUp, BarChart3, MapPin, Shield } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Plane,
      title: "Plan Your Trips",
      description: "Create and manage trips with destinations, dates, and detailed itineraries.",
    },
    {
      icon: Wallet,
      title: "Set Budgets",
      description: "Define budgets for each trip and category to stay on track financially.",
    },
    {
      icon: TrendingUp,
      title: "Track Expenses",
      description: "Log expenses in real-time and see your remaining budget update instantly.",
    },
    {
      icon: BarChart3,
      title: "Visual Insights",
      description: "View interactive charts and breakdowns of your spending patterns.",
    },
    {
      icon: MapPin,
      title: "All-in-One Platform",
      description: "No more juggling multiple apps—plan and budget from one dashboard.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your travel plans and financial data are encrypted and protected.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)',
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-strong">
                <Plane className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Plan Smarter. Travel Better.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Your all-in-one travel planner and budget tracker. Create trips, set budgets, log expenses, and stay on track—all from one beautiful dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 shadow-strong"
                onClick={() => navigate("/auth")}
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
                onClick={() => navigate("/dashboard")}
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need to Travel Smart
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              SmartTrip brings together powerful planning tools and real-time budget tracking in one simple platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-medium hover:shadow-strong transition-all">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Travel Planning?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join travelers worldwide who use SmartTrip to plan amazing trips without overspending.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 shadow-strong"
            onClick={() => navigate("/auth")}
          >
            Start Planning Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-card">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 SmartTrip. Built with ❤️ for travelers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
