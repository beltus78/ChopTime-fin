
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Phone, Mail, MessageCircle, Clock, Users, ShoppingBag } from "lucide-react";

const HelpCenter = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Browse restaurants, select items, add to cart, and proceed to checkout. You can pay online or cash on delivery."
    },
    {
      question: "What are your delivery hours?",
      answer: "We deliver from 7:00 AM to 11:00 PM, 7 days a week across Buea."
    },
    {
      question: "How long does delivery take?",
      answer: "Average delivery time is 30-45 minutes depending on your location and restaurant preparation time."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash on delivery, mobile money (MTN Mobile Money, Orange Money), and bank transfers."
    },
    {
      question: "Can I track my order?",
      answer: "Yes! Once your order is confirmed, you'll receive tracking information via SMS and can check status on our tracking page."
    },
    {
      question: "What if my order is wrong or missing items?",
      answer: "Contact our support immediately at +237 673 289 043. We'll resolve the issue quickly."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-poppins mb-4">Help Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search for help topics..."
                className="pl-12 py-3 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Options */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contact Support</h2>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Phone className="w-8 h-8 text-choptime-orange" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-muted-foreground">+237 673 289 043</p>
                    <p className="text-sm text-muted-foreground">Available 7AM - 11PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Mail className="w-8 h-8 text-choptime-orange" />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-muted-foreground">choptime237@gmail.com</p>
                    <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <MessageCircle className="w-8 h-8 text-choptime-orange" />
                  <div>
                    <h3 className="font-semibold">Live Chat</h3>
                    <Button className="mt-2 bg-choptime-orange hover:bg-choptime-orange/90">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-choptime-orange" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/track">Track My Order</a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/cart">View My Cart</a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/restaurants">Browse Restaurants</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Help Categories */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6">Browse by Category</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <ShoppingBag className="w-8 h-8 text-choptime-orange" />
                      <div>
                        <h4 className="font-semibold">Ordering & Payments</h4>
                        <p className="text-sm text-muted-foreground">How to place orders and pay</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Users className="w-8 h-8 text-choptime-orange" />
                      <div>
                        <h4 className="font-semibold">Account & Profile</h4>
                        <p className="text-sm text-muted-foreground">Manage your account</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenter;
