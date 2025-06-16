
import { ShoppingBag, DollarSign, Clock, Menu } from "lucide-react";
import { useRestaurantStats } from "@/hooks/useRestaurantStats";
import StatsCard from "@/components/admin/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RestaurantDashboard = () => {
  const { data: stats, isLoading } = useRestaurantStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={ShoppingBag}
          description="All time orders"
        />
        <StatsCard
          title="Total Revenue"
          value={`₦${((stats?.totalRevenue || 0) / 100).toLocaleString()}`}
          icon={DollarSign}
          description="Total earnings"
        />
        <StatsCard
          title="Pending Orders"
          value={stats?.pendingOrders || 0}
          icon={Clock}
          description="Orders awaiting processing"
        />
        <StatsCard
          title="Menu Items"
          value={stats?.menuItemsCount || 0}
          icon={Menu}
          description="Active menu items"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your restaurant efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Pending Orders</h3>
              <p className="text-2xl font-bold text-orange-600">{stats?.pendingOrders || 0}</p>
              <p className="text-sm text-muted-foreground">Need attention</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Menu Items</h3>
              <p className="text-2xl font-bold text-blue-600">{stats?.menuItemsCount || 0}</p>
              <p className="text-sm text-muted-foreground">Available items</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Total Revenue</h3>
              <p className="text-2xl font-bold text-green-600">
                ₦{((stats?.totalRevenue || 0) / 100).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">All time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantDashboard;
