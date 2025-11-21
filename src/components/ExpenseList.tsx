import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  note: string | null;
  payment_method: string | null;
  trip_id: string;
  trips?: {
    title: string;
  };
}

const ExpenseList = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  const fetchExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select(`
          *,
          trips (title)
        `)
        .eq("user_id", user?.id)
        .order("date", { ascending: false })
        .limit(10);

      if (error) throw error;
      setExpenses(data || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="shadow-soft">
        <CardContent className="py-8 text-center text-muted-foreground">
          Loading expenses...
        </CardContent>
      </Card>
    );
  }

  if (expenses.length === 0) {
    return (
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Your latest expense entries across all trips</CardDescription>
        </CardHeader>
        <CardContent className="py-8 text-center text-muted-foreground">
          No expenses yet. Add expenses to your trips to see them here!
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
        <CardDescription>Your latest expense entries across all trips</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary">{expense.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {expense.trips?.title || "Unknown Trip"}
                  </span>
                </div>
                {expense.note && (
                  <p className="text-sm text-muted-foreground mb-1">{expense.note}</p>
                )}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(expense.date).toLocaleDateString()}</span>
                  </div>
                  {expense.payment_method && (
                    <>
                      <span>•</span>
                      <span>{expense.payment_method}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-lg font-semibold text-foreground">
                    ${expense.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
