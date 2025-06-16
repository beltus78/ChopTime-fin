
import { Button } from "@/components/ui/button";
import { Play, Clock, Star, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-choptime-cream via-background to-choptime-cream/50 py-12 md:py-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-choptime-orange/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-choptime-brown/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-choptime-orange/10 text-choptime-orange px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                Rated #1 Food Delivery in Buea
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight">
                Authentic <span className="text-gradient">Cameroon</span><br />
                Flavors Delivered
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Craving Ndolé, Jollof, or Suya? Get your favorite Cameroonian dishes delivered hot and fresh in under 30 minutes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/restaurants">
                <Button size="lg" className="bg-gradient-choptime hover:opacity-90 text-lg px-8 w-full sm:w-auto">
                  Order Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link to="/about">
                <Button variant="outline" size="lg" className="text-lg px-8 w-full sm:w-auto">
                  <Play className="w-5 h-5 mr-2" />
                  How it Works
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8 pt-6 md:pt-8">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-choptime-orange/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-choptime-orange" />
                </div>
                <div>
                  <div className="font-semibold text-sm">30 min</div>
                  <div className="text-xs text-muted-foreground">Average delivery</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-choptime-orange/10 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-choptime-orange" />
                </div>
                <div>
                  <div className="font-semibold text-sm">50+</div>
                  <div className="text-xs text-muted-foreground">Local restaurants</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-choptime-orange/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-choptime-orange" />
                </div>
                <div>
                  <div className="font-semibold text-sm">All Buea</div>
                  <div className="text-xs text-muted-foreground">Free delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Dish Card */}
          <div className="relative max-w-md mx-auto lg:max-w-none">
            {/* Main dish card */}
            <div className="relative bg-white rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                alt="Delicious Ndolé" 
                className="w-full h-48 md:h-56 object-cover rounded-2xl mb-4"
              />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl">Ndolé Special</h3>
                    <p className="text-sm text-muted-foreground">Mama Africa Kitchen</p>
                  </div>
                  <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-green-600 fill-current mr-1" />
                    <span className="text-sm font-medium text-green-600">4.8</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Traditional Cameroonian stew with groundnuts, bitter leaves, and assorted meat
                </p>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-2xl font-bold text-choptime-orange">3,500 FCFA</span>
                  <Link to="/restaurants">
                    <Button size="sm" className="bg-choptime-orange hover:bg-choptime-orange/90">
                      Add to Cart
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Delivery time badge */}
              <div className="absolute -top-3 -left-3 bg-choptime-orange text-white rounded-full px-3 py-1 text-sm font-medium shadow-lg">
                🚀 25 min
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
              <img 
                src="/lovable-uploads/b045b0f7-18cc-4bde-bed3-e0d354ea7954.png" 
                alt="ChopTime Mascot" 
                className="w-8 h-8"
              />
            </div>
            
            {/* Background decoration */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-choptime-orange/20 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
