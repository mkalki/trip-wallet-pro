import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Trip {
  id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  total_budget: number;
  expenses?: { amount: number }[];
}

const TripList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTrips();
    }
  }, [user]);

  const fetchTrips = async () => {
    try {
      const { data, error } = await supabase
        .from("trips")
        .select(`
          *,
          expenses (amount)
        `)
        .eq("user_id", user?.id)
        .order("start_date", { ascending: false });

      if (error) throw error;
      setTrips(data || []);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    try {
      const { error } = await supabase
        .from("trips")
        .delete()
        .eq("id", tripId);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Trip deleted successfully",
      });

      fetchTrips();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete trip",
        variant: "destructive",
      });
    }
  };

  const getTripStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now > end) return "completed";
    if (now >= start && now <= end) return "active";
    return "upcoming";
  };
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

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading trips...</div>;
  }

  if (trips.length === 0) {
    return (
      <Card className="shadow-soft">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground mb-4">No trips yet. Create your first trip to get started!</p>
          <Button onClick={() => navigate("/trips/new")}>Create Trip</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {trips.map((trip) => {
        const spent = trip.expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0;
        const budgetPercentage = (spent / trip.total_budget) * 100;
        const remaining = trip.total_budget - spent;
        const status = getTripStatus(trip.start_date, trip.end_date);

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
                <Badge variant={getStatusColor(status)}>
                  {status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium">Budget</span>
                    </div>
                    <span className={getBudgetStatus(spent, trip.total_budget)}>
                      ${spent.toLocaleString()} / ${trip.total_budget.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={budgetPercentage} />
                  <p className="text-xs text-muted-foreground">
                    ${remaining.toLocaleString()} remaining ({(100 - budgetPercentage).toFixed(1)}%)
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/trips/${trip.id}`)}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteTrip(trip.id)}
                  >
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