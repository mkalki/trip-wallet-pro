import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Utensils, Hotel, Plane, Coffee, ShoppingBag } from "lucide-react";

const mockCategoryBudgets = [
  {
    category: "Food",
    icon: Utensils,
    budget: 1200,
    spent: 750,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    category: "Accommodation",
    icon: Hotel,
    budget: 2000,
    spent: 1600,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    category: "Travel",
    icon: Plane,
    budget: 1500,
    spent: 800,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    category: "Activities",
    icon: Coffee,
    budget: 800,
    spent: 350,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    category: "Misc",
    icon: ShoppingBag,
    budget: 500,
    spent: 200,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
];

const BudgetOverview = () => {
  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "bg-destructive";
    if (percentage >= 75) return "bg-warning";
    return "bg-success";
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Category Budget Cards */}
      {mockCategoryBudgets.map((item) => {
        const Icon = item.icon;
        const percentage = (item.spent / item.budget) * 100;
        const remaining = item.budget - item.spent;

        return (
          <Card key={item.category} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${item.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{item.category}</CardTitle>
                    <CardDescription>
                      ${item.spent.toLocaleString()} of ${item.budget.toLocaleString()}
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${percentage >= 90 ? 'text-destructive' : percentage >= 75 ? 'text-warning' : 'text-success'}`}>
                    {percentage.toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground">spent</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={percentage} className={getStatusColor(percentage)} />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="font-medium">${remaining.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Summary Card */}
      <Card className="md:col-span-2 shadow-medium">
        <CardHeader>
          <CardTitle>Budget Summary</CardTitle>
          <CardDescription>Your spending across all categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Total Budget</span>
              <span className="text-2xl font-bold">
                ${mockCategoryBudgets.reduce((acc, item) => acc + item.budget, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Total Spent</span>
              <span className="text-2xl font-bold text-secondary">
                ${mockCategoryBudgets.reduce((acc, item) => acc + item.spent, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Remaining</span>
              <span className="text-2xl font-bold text-success">
                ${mockCategoryBudgets.reduce((acc, item) => acc + (item.budget - item.spent), 0).toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetOverview;