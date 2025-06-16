
import { Users, Store, ShoppingBag, DollarSign } from "lucide-react";
import { useAdminStats } from "@/hooks/useAdminStats";
import StatsCard from "@/components/admin/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AdminDashboard = () => {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={Users}
          description="Registered users"
        />
        <StatsCard
          title="Total Restaurants"
          value={stats?.totalRestaurants || 0}
          icon={Store}
          description="Active restaurants"
        />
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
          description="Platform revenue"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              {stats?.recentOrders || 0} orders in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats?.recentOrders || 0}
            </div>
            <p className="text-sm text-muted-foreground">
              Recent orders this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
            <CardDescription>System status overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Active Restaurants</span>
                <span className="text-sm font-medium">{stats?.totalRestaurants || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Registered Users</span>
                <span className="text-sm font-medium">{stats?.totalUsers || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Orders</span>
                <span className="text-sm font-medium">{stats?.totalOrders || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
