import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShoppingBag, Utensils, Hotel, Plane, Coffee, Trash2 } from "lucide-react";

// Mock data
const mockExpenses = [
  {
    id: "1",
    tripId: "1",
    tripTitle: "Summer in Tokyo",
    amount: 85,
    category: "Food",
    date: "2024-07-16",
    description: "Dinner at Ichiran Ramen",
    paymentMethod: "Credit Card",
  },
  {
    id: "2",
    tripId: "1",
    tripTitle: "Summer in Tokyo",
    amount: 120,
    category: "Accommodation",
    date: "2024-07-15",
    description: "Hotel Park Hyatt - Night 1",
    paymentMethod: "Credit Card",
  },
  {
    id: "3",
    tripId: "2",
    tripTitle: "European Adventure",
    amount: 450,
    category: "Travel",
    date: "2024-09-10",
    description: "Round-trip flight tickets",
    paymentMethod: "Debit Card",
  },
  {
    id: "4",
    tripId: "1",
    tripTitle: "Summer in Tokyo",
    amount: 45,
    category: "Activities",
    date: "2024-07-17",
    description: "Sensoji Temple tour",
    paymentMethod: "Cash",
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Food":
      return <Utensils className="w-4 h-4" />;
    case "Accommodation":
      return <Hotel className="w-4 h-4" />;
    case "Travel":
      return <Plane className="w-4 h-4" />;
    case "Activities":
      return <Coffee className="w-4 h-4" />;
    default:
      return <ShoppingBag className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Food":
      return "bg-secondary/10 text-secondary border-secondary/20";
    case "Accommodation":
      return "bg-primary/10 text-primary border-primary/20";
    case "Travel":
      return "bg-accent/10 text-accent border-accent/20";
    case "Activities":
      return "bg-warning/10 text-warning border-warning/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const ExpenseList = () => {
  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Filter Expenses</CardTitle>
          <CardDescription>Search and filter your expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search expenses..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="accommodation">Accommodation</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="activities">Activities</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Trip" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trips</SelectItem>
                <SelectItem value="1">Summer in Tokyo</SelectItem>
                <SelectItem value="2">European Adventure</SelectItem>
                <SelectItem value="3">Beach Getaway</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Expense List */}
      <div className="space-y-3">
        {mockExpenses.map((expense) => (
          <Card key={expense.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(expense.category)}`}>
                    {getCategoryIcon(expense.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{expense.description}</h4>
                      <Badge variant="outline" className="text-xs">
                        {expense.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{expense.tripTitle}</span>
                      <span>•</span>
                      <span>{new Date(expense.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{expense.paymentMethod}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">
                      ${expense.amount.toLocaleString()}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;