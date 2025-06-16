
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Store, Truck, TrendingUp, Users, DollarSign, Clock } from "lucide-react";

const PartnerWithUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-poppins mb-4">Partner with ChopTime</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join Cameroon's fastest-growing food delivery platform and grow your business with us
          </p>
        </div>

        {/* Partnership Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Store className="w-8 h-8 text-choptime-orange" />
                <CardTitle className="text-2xl">Restaurant Partner</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                List your restaurant on ChopTime and reach thousands of hungry customers across Buea.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Increase your sales by up to 40%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Access to 10,000+ active customers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Competitive commission rates</span>
                </div>
              </div>
              <Button className="w-full bg-choptime-orange hover:bg-choptime-orange/90">
                Become a Restaurant Partner
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Truck className="w-8 h-8 text-choptime-orange" />
                <CardTitle className="text-2xl">Delivery Partner</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Become a ChopTime delivery driver and earn money on your own schedule.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Flexible working hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Earn 15,000 - 50,000 FCFA per week</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Join 200+ active drivers</span>
                </div>
              </div>
              <Button className="w-full bg-choptime-orange hover:bg-choptime-orange/90">
                Become a Driver
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Why Partner with ChopTime?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-choptime-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-choptime-orange" />
                </div>
                <h3 className="font-bold mb-2">Grow Your Business</h3>
                <p className="text-muted-foreground">Reach new customers and increase your revenue with our platform</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-choptime-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-choptime-orange" />
                </div>
                <h3 className="font-bold mb-2">Dedicated Support</h3>
                <p className="text-muted-foreground">24/7 customer support and account management</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-choptime-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-choptime-orange" />
                </div>
                <h3 className="font-bold mb-2">Competitive Rates</h3>
                <p className="text-muted-foreground">Fair commission structure and weekly payouts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Get Started Today</CardTitle>
            <p className="text-center text-muted-foreground">
              Fill out the form below and our team will contact you within 24 hours
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+237 6XX XXX XXX" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business">Business Name</Label>
                <Input id="business" placeholder="Your restaurant or business name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Partnership Type</Label>
                <select className="w-full p-2 border border-border rounded-md">
                  <option value="">Select partnership type</option>
                  <option value="restaurant">Restaurant Partner</option>
                  <option value="driver">Delivery Driver</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Tell us about your business</Label>
                <Textarea 
                  id="message" 
                  placeholder="Describe your restaurant, cuisine type, or delivery experience..."
                  rows={4}
                />
              </div>

              <Button className="w-full bg-choptime-orange hover:bg-choptime-orange/90 text-lg py-3">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-2">Have questions? Contact our partnership team</p>
          <div className="space-y-1">
            <p className="font-semibold">📞 +237 673 289 043</p>
            <p className="font-semibold">✉️ choptime237@gmail.com</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PartnerWithUs;
