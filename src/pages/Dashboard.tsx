import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Plane, Wallet, TrendingUp, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TripList from "@/components/TripList";
import ExpenseList from "@/components/ExpenseList";
import BudgetOverview from "@/components/BudgetOverview";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const { user, signOut } = useAuth();
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch all trips for the user
      const { data: trips, error: tripsError } = await supabase
        .from("trips")
        .select("total_budget, id")
        .eq("user_id", user?.id);

      if (tripsError) throw tripsError;

      // Calculate total budget
      const budget = trips?.reduce((sum, trip) => sum + trip.total_budget, 0) || 0;
      setTotalBudget(budget);

      // Fetch all expenses for the user
      const { data: expenses, error: expensesError } = await supabase
        .from("expenses")
        .select("amount")
        .eq("user_id", user?.id);

      if (expensesError) throw expensesError;

      // Calculate total spent
      const spent = expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;
      setTotalSpent(spent);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  const budgetPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">SmartTrip</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Here's an overview of your trips and expenses</p>
        </div>

        {/* Budget Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalBudget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Across all trips</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">${totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">{budgetPercentage.toFixed(1)}% of budget</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${(totalBudget - totalSpent).toLocaleString()}</div>
              <Progress 
                value={budgetPercentage} 
                className="mt-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trips">Trips</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            <Button onClick={() => navigate("/trips/new")} className="gap-2">
              <PlusCircle className="w-4 h-4" />
              New Trip
            </Button>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <BudgetOverview />
          </TabsContent>

          <TabsContent value="trips" className="space-y-4">
            <TripList />
          </TabsContent>

          <TabsContent value="expenses" className="space-y-4">
            <ExpenseList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;