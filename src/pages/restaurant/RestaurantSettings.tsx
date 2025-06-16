import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const RestaurantSettings = () => {
  const [operatingHours, setOperatingHours] = useState("9:00 AM - 10:00 PM");
  const [deliveryRadius, setDeliveryRadius] = useState("5 miles");
  const [acceptingOrders, setAcceptingOrders] = useState(true);
  const [minOrderAmount, setMinOrderAmount] = useState("1000");

  const { toast } = useToast();

  const handleSaveSettings = () => {
    // In a real application, you would send this data to Supabase
    // For now, we'll just show a toast notification
    toast({
      title: "Restaurant Settings Saved",
      description: "Your restaurant settings have been updated.",
    });
    console.log({
      operatingHours,
      deliveryRadius,
      acceptingOrders,
      minOrderAmount,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Restaurant Settings</h1>

      <div className="space-y-4 max-w-2xl">
        <div className="grid gap-2">
          <Label htmlFor="operatingHours">Operating Hours</Label>
          <Input
            id="operatingHours"
            value={operatingHours}
            onChange={(e) => setOperatingHours(e.target.value)}
            placeholder="E.g., 9:00 AM - 10:00 PM"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="deliveryRadius">Delivery Radius</Label>
          <Input
            id="deliveryRadius"
            value={deliveryRadius}
            onChange={(e) => setDeliveryRadius(e.target.value)}
            placeholder="E.g., 5 miles, 10 km"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="acceptingOrders">Accepting New Orders</Label>
          <Switch
            id="acceptingOrders"
            checked={acceptingOrders}
            onCheckedChange={setAcceptingOrders}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="minOrderAmount">Minimum Order Amount (₦)</Label>
          <Input
            id="minOrderAmount"
            type="number"
            step="1"
            value={minOrderAmount}
            onChange={(e) => setMinOrderAmount(e.target.value)}
            placeholder="E.g., 1000"
          />
        </div>

        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  );
};

export default RestaurantSettings; 