
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileHeader from "@/components/MobileHeader";
import MobileNavigation from "@/components/MobileNavigation";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { Link } from "react-router-dom";

const Orders = () => {
  const { user } = useAuth();
  const { data: orders = [], isLoading, error } = useOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-blue-500";
      case "preparing": return "bg-yellow-500";
      case "ready": return "bg-orange-500";
      case "in_transit": return "bg-purple-500";
      case "delivered": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    return status.replace('_', ' ').toUpperCase();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <MobileHeader title="Orders" showSearch={false} />
        <div className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-6 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Sign in to view orders</h2>
              <p className="text-muted-foreground mb-4">
                Please sign in to see your order history and track your deliveries.
              </p>
              <Link to="/auth">
                <Button className="bg-choptime-orange hover:bg-choptime-orange/90">
                  Sign In
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <MobileNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <MobileHeader title="My Orders" showSearch={false} />

      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Desktop Header */}
        <div className="text-center mb-8 hidden md:block">
          <h1 className="text-4xl font-bold font-poppins mb-4">My Orders</h1>
          <p className="text-lg text-muted-foreground">
            Track your current orders and view order history
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-red-600">Error loading orders. Please try again.</p>
            </CardContent>
          </Card>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-4">
                When you place your first order, it will appear here.
              </p>
              <Link to="/restaurants">
                <Button className="bg-choptime-orange hover:bg-choptime-orange/90">
                  Browse Restaurants
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{order.restaurants?.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Order #{order.id.slice(0, 8)}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-semibold mb-2">Items ordered:</h4>
                    <div className="space-y-1">
                      {order.order_items?.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.menu_items?.name}</span>
                          <span>{(item.total_price / 100).toLocaleString()} FCFA</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2 text-choptime-orange" />
                        <span>{new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                      {order.delivery_address && (
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-choptime-orange" />
                          <span className="truncate">{order.delivery_address}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Total: </span>
                        <span className="text-choptime-orange font-bold">
                          {(order.total_amount / 100).toLocaleString()} FCFA
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Payment: </span>
                        <span className="capitalize">{order.payment_method}</span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {order.payment_status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4">
                    {order.status === 'in_transit' && (
                      <Link to={`/track?order=${order.id}`}>
                        <Button size="sm" className="bg-choptime-orange hover:bg-choptime-orange/90">
                          Track Order
                        </Button>
                      </Link>
                    )}
                    <Link to={`/restaurant/${order.restaurant_id}`}>
                      <Button size="sm" variant="outline">
                        Order Again
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default Orders;
