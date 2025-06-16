
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileHeader from "@/components/MobileHeader";
import MobileNavigation from "@/components/MobileNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Phone, CreditCard, Smartphone, Banknote, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock cart data
  const cartItems = [
    { id: 1, name: "Ndolé Special", price: 3500, quantity: 2 },
    { id: 2, name: "Jollof Rice", price: 2500, quantity: 1 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 500;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Order placed successfully! You'll receive a confirmation shortly.");
    navigate("/track");
    setIsProcessing(false);
  };

  const handleCallSupport = () => {
    window.open("tel:+237673289043", "_self");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <MobileHeader title="Checkout" showSearch={false} />
      
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* Back Button */}
        <Link to="/cart" className="inline-flex items-center text-choptime-orange hover:text-choptime-orange/80 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-choptime-orange" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+237 6XX XXX XXX" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="Enter your street address" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value="Buea" readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="landmark">Landmark (Optional)</Label>
                    <Input id="landmark" placeholder="Near MTN office, etc." />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                  <Textarea 
                    id="instructions" 
                    placeholder="Any special instructions for the delivery driver..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-choptime-orange" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    {/* Cash on Delivery */}
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="cash" id="cash" />
                      <Banknote className="w-6 h-6 text-green-600" />
                      <div>
                        <Label htmlFor="cash" className="font-medium">Cash on Delivery</Label>
                        <p className="text-sm text-muted-foreground">Pay with cash when your order arrives</p>
                      </div>
                    </div>

                    {/* Mobile Money */}
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="mobile_money" id="mobile_money" />
                      <Smartphone className="w-6 h-6 text-orange-600" />
                      <div>
                        <Label htmlFor="mobile_money" className="font-medium">Mobile Money</Label>
                        <p className="text-sm text-muted-foreground">MTN Mobile Money or Orange Money</p>
                      </div>
                    </div>

                    {/* Bank Transfer */}
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <div>
                        <Label htmlFor="bank_transfer" className="font-medium">Bank Transfer</Label>
                        <p className="text-sm text-muted-foreground">Transfer to our bank account</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                {/* Mobile Money Details */}
                {paymentMethod === "mobile_money" && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-3">Mobile Money Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>MTN Mobile Money:</strong> 673 289 043</p>
                      <p><strong>Orange Money:</strong> 693 289 043</p>
                      <p className="text-muted-foreground">
                        Send payment and provide transaction ID to confirm your order
                      </p>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Details */}
                {paymentMethod === "bank_transfer" && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-3">Bank Transfer Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Bank:</strong> Afriland First Bank</p>
                      <p><strong>Account Name:</strong> ChopTime SARL</p>
                      <p><strong>Account Number:</strong> 10001 234567 89</p>
                      <p className="text-muted-foreground">
                        Transfer the total amount and provide transaction reference
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium">
                        {(item.price * item.quantity).toLocaleString()} FCFA
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee.toLocaleString()} FCFA</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-choptime-orange">
                    {total.toLocaleString()} FCFA
                  </span>
                </div>

                {/* Place Order Button */}
                <Button 
                  className="w-full bg-choptime-orange hover:bg-choptime-orange/90 text-lg py-6"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                {/* Estimated Delivery */}
                <div className="text-center text-sm text-muted-foreground">
                  <p>Estimated delivery: 30-45 minutes</p>
                </div>

                {/* Contact Support */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Need help?</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-choptime-orange"
                    onClick={handleCallSupport}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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

export default Checkout;
