import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  created_at: string;
  user_id: string;
  restaurant_id: string;
  total_amount: number;
  status: string;
  delivery_address: string;
  order_items: OrderItem[];
  users: { email: string }; // Assuming a join with users table
}

const RestaurantOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // For now, assume a static restaurant_id for development. In a real app, this comes from auth context.
  const restaurantId = "your_restaurant_id_here"; 

  const ORDER_STATUSES = ["Pending", "Accepted", "Preparing", "Ready for Pickup", "Out for Delivery", "Delivered", "Cancelled"];

  useEffect(() => {
    fetchOrders();
  }, [restaurantId]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        created_at,
        user_id,
        restaurant_id,
        total_amount,
        status,
        delivery_address,
        order_items,
        users(email)
      `)
      .eq("restaurant_id", restaurantId);

    if (error) {
      toast({
        title: "Error fetching orders",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setOrders(data as Order[]);
    }
    setLoading(false);
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      toast({
        title: "Error updating order status",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Order status updated",
        description: `Order #${orderId} status changed to ${newStatus}.`,
      });
      fetchOrders();
    }
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  const incomingOrders = orders.filter(order => order.status === "Pending");
  const activeOrders = orders.filter(order => order.status !== "Pending" && order.status !== "Delivered" && order.status !== "Cancelled");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Restaurant Order Management</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Incoming Orders</CardTitle>
            <CardDescription>New orders awaiting your action.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomingOrders.length > 0 ? (
                  incomingOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                      <TableCell>{order.users?.email || "N/A"}</TableCell>
                      <TableCell>₦{order.total_amount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" onClick={() => handleStatusChange(order.id, "Accepted")} className="mr-2">
                          Accept
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleStatusChange(order.id, "Cancelled")}>
                          Decline
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={4} className="text-center">No incoming orders.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
            <CardDescription>Orders currently being processed or delivered.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Update Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeOrders.length > 0 ? (
                  activeOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                      <TableCell>{order.users?.email || "N/A"}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Select onValueChange={(value) => handleStatusChange(order.id, value)} value={order.status}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Update Status" />
                          </SelectTrigger>
                          <SelectContent>
                            {ORDER_STATUSES.filter(s => s !== "Pending" && s !== "Cancelled").map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={4} className="text-center">No active orders.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>Comprehensive list of all orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Restaurant ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                    <TableCell>{order.users?.email || "N/A"}</TableCell>
                    <TableCell>{order.restaurant_id.substring(0, 8)}...</TableCell>
                    <TableCell>₦{order.total_amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={6} className="text-center">No orders found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantOrders; 