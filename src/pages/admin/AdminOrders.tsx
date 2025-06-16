import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  restaurants: { name: string }; // Assuming a join with restaurants table
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  const ORDER_STATUSES = ["Pending", "Preparing", "Ready for Pickup", "Out for Delivery", "Delivered", "Cancelled"];

  useEffect(() => {
    fetchOrders();
  }, []);

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
        users(email),
        restaurants(name)
      `);

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

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailDialogOpen(true);
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order Management</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer Email</TableHead>
            <TableHead>Restaurant</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
              <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
              <TableCell>{order.users?.email || "N/A"}</TableCell>
              <TableCell>{order.restaurants?.name || "N/A"}</TableCell>
              <TableCell>₦{order.total_amount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)} className="mr-2">
                  View Details
                </Button>
                <Select onValueChange={(value) => handleStatusChange(order.id, value)} value={order.status}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id.substring(0, 8)}...</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <p><strong>Customer:</strong> {selectedOrder.users?.email}</p>
              <p><strong>Restaurant:</strong> {selectedOrder.restaurants?.name}</p>
              <p><strong>Delivery Address:</strong> {selectedOrder.delivery_address}</p>
              <p><strong>Total Amount:</strong> ₦{selectedOrder.total_amount.toLocaleString()}</p>
              <p><strong>Status:</strong> <Badge>{selectedOrder.status}</Badge></p>
              <h3 className="font-bold mt-4">Order Items:</h3>
              <ul>
                {selectedOrder.order_items.map((item, index) => (
                  <li key={index}>
                    {item.quantity} x {item.name} (₦{item.price.toLocaleString()})
                  </li>
                ))}
              </ul>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders; 