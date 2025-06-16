
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone } from "lucide-react";

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderFound, setOrderFound] = useState(false);

  // Mock order data
  const mockOrder = {
    id: "CT2024001",
    status: "in_transit",
    restaurant: "Mama Africa Kitchen",
    items: ["Ndolé Special", "Jollof Rice", "Plantain"],
    total: 6500,
    estimatedTime: "15-20 minutes",
    driver: {
      name: "Jean Paul",
      phone: "+237 679 123 456"
    },
    timeline: [
      { status: "confirmed", time: "2:30 PM", completed: true, message: "Order confirmed by restaurant" },
      { status: "preparing", time: "2:35 PM", completed: true, message: "Restaurant is preparing your food" },
      { status: "ready", time: "3:05 PM", completed: true, message: "Order ready for pickup" },
      { status: "in_transit", time: "3:10 PM", completed: true, message: "Driver is on the way" },
      { status: "delivered", time: "Est. 3:25 PM", completed: false, message: "Order will be delivered" }
    ]
  };

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      setOrderFound(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-blue-500";
      case "preparing": return "bg-yellow-500";
      case "ready": return "bg-orange-500";
      case "in_transit": return "bg-purple-500";
      case "delivered": return "bg-green-500";
      default: return "bg-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="w-5 h-5" />;
      case "preparing": return <Clock className="w-5 h-5" />;
      case "ready": return <Package className="w-5 h-5" />;
      case "in_transit": return <Truck className="w-5 h-5" />;
      case "delivered": return <CheckCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-poppins mb-4">Track Your Order</h1>
          <p className="text-lg text-muted-foreground">
            Enter your order number to see real-time updates
          </p>
        </div>

        {/* Tracking Input */}
        <Card className="max-w-md mx-auto mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Enter order number (e.g., CT2024001)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="pl-12"
                />
              </div>
              <Button 
                onClick={handleTrack}
                className="w-full bg-choptime-orange hover:bg-choptime-orange/90"
              >
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        {orderFound && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Order #{mockOrder.id}</CardTitle>
                    <p className="text-muted-foreground">{mockOrder.restaurant}</p>
                  </div>
                  <Badge className={`${getStatusColor(mockOrder.status)} text-white`}>
                    {mockOrder.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Order Items</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      {mockOrder.items.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Info</h4>
                    <div className="space-y-1 text-muted-foreground">
                      <p className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        ETA: {mockOrder.estimatedTime}
                      </p>
                      <p className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        1st Trust Buea, Cameroon
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrder.timeline.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${step.completed ? getStatusColor(step.status) : 'bg-gray-200'} text-white`}>
                        {getStatusIcon(step.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {step.message}
                          </p>
                          <span className="text-sm text-muted-foreground">{step.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Driver Info */}
            {mockOrder.status === "in_transit" && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Driver</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-choptime-orange rounded-full flex items-center justify-center text-white font-bold">
                      {mockOrder.driver.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{mockOrder.driver.name}</p>
                      <p className="text-muted-foreground">Delivery Driver</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Driver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* No Tracking Number Entered */}
        {!orderFound && !trackingNumber && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Enter your order number above to track your delivery
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OrderTracking;
