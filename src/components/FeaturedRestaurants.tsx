
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedRestaurants = () => {
  const restaurants = [
    {
      id: 1,
      name: "Mama Africa Kitchen",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      cuisine: "Traditional Cameroonian",
      rating: 4.8,
      deliveryTime: "25-35 min",
      location: "Mile 16, Buea",
      specialties: ["Ndolé", "Koki", "Suya"],
      featured: true
    },
    {
      id: 2,
      name: "Spice Route",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      cuisine: "West African Fusion",
      rating: 4.6,
      deliveryTime: "30-40 min",
      location: "Molyko, Buea",
      specialties: ["Jollof Rice", "Grilled Fish", "Plantain"],
      featured: false
    },
    {
      id: 3,
      name: "The Village Kitchen",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      cuisine: "Home-style Cooking",
      rating: 4.9,
      deliveryTime: "20-30 min",
      location: "Great Soppo, Buea",
      specialties: ["Eru", "Achu", "Pepper Soup"],
      featured: true
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-poppins mb-4">
            Featured <span className="text-gradient">Restaurants</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the best local restaurants serving authentic Cameroonian cuisine in Buea
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {restaurant.featured && (
                  <Badge className="absolute top-3 left-3 bg-choptime-orange hover:bg-choptime-orange">
                    Featured
                  </Badge>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{restaurant.rating}</span>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <h3 className="text-xl font-bold group-hover:text-choptime-orange transition-colors">
                  {restaurant.name}
                </h3>
                <p className="text-muted-foreground">{restaurant.cuisine}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-choptime-orange" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-choptime-orange" />
                    <span>{restaurant.location}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Popular dishes:</p>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Link to={`/restaurant/${restaurant.id}`}>
                  <Button className="w-full bg-choptime-orange hover:bg-choptime-orange/90">
                    View Menu
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/restaurants">
            <Button size="lg" variant="outline" className="border-choptime-orange text-choptime-orange hover:bg-choptime-orange hover:text-white">
              View All Restaurants
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
