import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

interface RestaurantAnalyticsData {
  totalOrders: number;
  totalRevenue: number;
  popularDishes: { name: string; count: number }[];
  dailySales: { date: string; amount: number }[];
}

const RestaurantAnalytics = () => {
  const [analytics, setAnalytics] = useState<RestaurantAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // For now, assume a static restaurant_id for development. In a real app, this comes from auth context.
  const restaurantId = "your_restaurant_id_here"; 

  useEffect(() => {
    fetchAnalyticsData();
  }, [restaurantId]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    // In a real application, you would fetch aggregated data from Supabase views or functions
    // filtered by restaurantId
    const simulatedData: RestaurantAnalyticsData = {
      totalOrders: 350,
      totalRevenue: 56789000, // in kobo or cents
      popularDishes: [
        { name: 'Jollof Rice', count: 120 },
        { name: 'Fried Rice', count: 90 },
        { name: 'Efo Riro', count: 70 },
        { name: 'Pounded Yam', count: 50 },
      ],
      dailySales: [
        { date: '2024-07-25', amount: 500000 },
        { date: '2024-07-26', amount: 650000 },
        { date: '2024-07-27', amount: 700000 },
        { date: '2024-07-28', amount: 800000 },
        { date: '2024-07-29', amount: 750000 },
        { date: '2024-07-30', amount: 900000 },
      ],
    };
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    setAnalytics(simulatedData);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  if (!analytics) {
    return <div>No analytics data available.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Restaurant Analytics</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
              <path d="M9 18h6" />
              <path d="M10 22h4" />
              <path d="M2 21h20" />
              <path d="M12 21v-8" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total orders received.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
              <circle cx="7" cy="15" r="2" />
              <path d="M17 15h.01" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{(analytics.totalRevenue / 100).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total revenue generated.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Dishes</CardTitle>
            <CardDescription>Top selling menu items.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {analytics.popularDishes.map((dish, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span>{dish.name}</span>
                  <span className="font-medium">{dish.count}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Sales</CardTitle>
          <CardDescription>Revenue per day.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analytics.dailySales}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `₦${(value / 100).toLocaleString()}`} />
                <Tooltip formatter={(value) => [`₦${(Number(value) / 100).toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantAnalytics; 