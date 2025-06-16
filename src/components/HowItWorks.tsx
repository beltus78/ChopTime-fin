
import { Card, CardContent } from "@/components/ui/card";
import { Search, ShoppingCart, Truck, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse & Choose",
      description: "Explore hundreds of local restaurants and discover your favorite Cameroonian dishes",
      color: "text-blue-500"
    },
    {
      icon: ShoppingCart,
      title: "Order & Pay",
      description: "Add items to your cart and pay securely with Mobile Money or card",
      color: "text-green-500"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Our delivery partners bring your hot, fresh meal right to your doorstep",
      color: "text-choptime-orange"
    },
    {
      icon: Star,
      title: "Enjoy & Rate",
      description: "Savor your meal and share your experience with the ChopTime community",
      color: "text-yellow-500"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-poppins mb-4">
            How <span className="text-gradient">ChopTime</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting your favorite food delivered is easier than ever
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md text-center">
              <CardContent className="p-8 space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto bg-gradient-choptime rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-choptime-brown text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold font-poppins group-hover:text-choptime-orange transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
