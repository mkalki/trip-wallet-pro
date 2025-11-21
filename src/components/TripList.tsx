import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Edit, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data
const mockTrips = [
  {
    id: "1",
    title: "Summer in Tokyo",
    destination: "Tokyo, Japan",
    startDate: "2024-07-15",
    endDate: "2024-07-25",
    totalBudget: 3500,
    spent: 2100,
    status: "active",
  },
  {
    id: "2",
    title: "European Adventure",
    destination: "Paris, France",
    startDate: "2024-09-10",
    endDate: "2024-09-20",
    totalBudget: 4500,
    spent: 1150,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Beach Getaway",
    destination: "Bali, Indonesia",
    startDate: "2024-06-01",
    endDate: "2024-06-10",
    totalBudget: 2000,
    spent: 2000,
    status: "completed",
  },
];

const TripList = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "upcoming":
        return "secondary";
      case "completed":
        return "outline";
      default:
        return "default";
    }
  };

  const getBudgetStatus = (spent: number, total: number) => {
    const percentage = (spent / total) * 100;
    if (percentage >= 90) return "text-destructive";
    if (percentage >= 75) return "text-warning";
    return "text-success";
  };

  return (
    <div className="space-y-4">
      {mockTrips.map((trip) => {
        const budgetPercentage = (trip.spent / trip.totalBudget) * 100;
        const remaining = trip.totalBudget - trip.spent;

        return (
          <Card key={trip.id} className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{trip.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {trip.destination}
                  </CardDescription>
                </div>
                <Badge variant={getStatusColor(trip.status)}>
                  {trip.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium">Budget</span>
                    </div>
                    <span className={getBudgetStatus(trip.spent, trip.totalBudget)}>
                      ${trip.spent.toLocaleString()} / ${trip.totalBudget.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={budgetPercentage} />
                  <p className="text-xs text-muted-foreground">
                    ${remaining.toLocaleString()} remaining ({(100 - budgetPercentage).toFixed(1)}%)
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TripList;