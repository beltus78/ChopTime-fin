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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Payment {
  id: string;
  created_at: string;
  order_id: string;
  amount: number;
  status: string; // e.g., 'completed', 'pending', 'refunded'
  payment_method: string;
}

const AdminPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("payments").select("*");

    if (error) {
      toast({
        title: "Error fetching payments",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setPayments(data as Payment[]);
    }
    setLoading(false);
  };

  // Placeholder for refund functionality
  const handleRefund = async (paymentId: string) => {
    if (confirm(`Are you sure you want to refund payment ID: ${paymentId}?`)) {
      // In a real application, you would interact with a payment gateway here
      // For now, we'll simulate a status update in Supabase if a 'payments' table exists
      toast({
        title: "Refund Initiated",
        description: `Simulating refund for payment ID: ${paymentId}. Real refund logic would go here.`,
      });
      // Example: update payment status to 'refunded' if it's in your schema
      // const { error } = await supabase.from("payments").update({ status: "refunded" }).eq("id", paymentId);
      // if (!error) fetchPayments();
    }
  };

  if (loading) {
    return <div>Loading payments...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payment Management</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue (Placeholder)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦1,234,567</div>
            <p className="text-sm text-muted-foreground">Aggregated revenue from all orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Successful Payments (Placeholder)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">987</div>
            <p className="text-sm text-muted-foreground">Number of completed transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Refunds Issued (Placeholder)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">Total refunds processed</p>
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payment ID</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.id.substring(0, 8)}...</TableCell>
              <TableCell>{payment.order_id.substring(0, 8)}...</TableCell>
              <TableCell>₦{payment.amount.toLocaleString()}</TableCell>
              <TableCell>{payment.status}</TableCell>
              <TableCell>{payment.payment_method}</TableCell>
              <TableCell>{new Date(payment.created_at).toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => handleRefund(payment.id)}>
                  Refund (Simulate)
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminPayments; 