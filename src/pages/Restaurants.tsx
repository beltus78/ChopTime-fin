import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Clock, MapPin, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileHeader from "@/components/MobileHeader";
import MobileNavigation from "@/components/MobileNavigation";

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

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
      featured: true,
      deliveryFee: "500 FCFA"
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
      featured: false,
      deliveryFee: "300 FCFA"
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
      featured: true,
      deliveryFee: "400 FCFA"
    },
    {
      id: 4,
      name: "Street Food Paradise",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      cuisine: "Street Food",
      rating: 4.4,
      deliveryTime: "15-25 min",
      location: "Lower Estates, Buea",
      specialties: ["Puff Puff", "Beignets", "Roasted Corn"],
      featured: false,
      deliveryFee: "200 FCFA"
    },
    {
      id: 5,
      name: "Royal Feast",
      image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17",
      cuisine: "Continental",
      rating: 4.7,
      deliveryTime: "35-45 min",
      location: "Bonduma, Buea",
      specialties: ["Steaks", "Pasta", "Salads"],
      featured: false,
      deliveryFee: "600 FCFA"
    },
    {
      id: 6,
      name: "Coastal Delights",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
      cuisine: "Seafood",
      rating: 4.5,
      deliveryTime: "40-50 min",
      location: "Limbe Road, Buea",
      specialties: ["Grilled Fish", "Shrimp", "Crab"],
      featured: true,
      deliveryFee: "700 FCFA"
    }
  ];

  const filteredRestaurants = restaurants
    .filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(restaurant => 
      cuisineFilter === "all" || restaurant.cuisine.toLowerCase().includes(cuisineFilter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "delivery-time") return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Header */}
      <Header />
      
      {/* Mobile Header */}
      <MobileHeader title="Restaurants" />
      
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* Desktop Header */}
        <div className="text-center mb-8 hidden md:block">
          <h1 className="text-4xl font-bold font-poppins mb-4">
            <span className="text-gradient">Restaurants</span> in Buea
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover amazing food from local restaurants
          </p>
        </div>

        {/* Mobile Filters */}
        <div className="md:hidden mb-6">
          <div className="flex space-x-2 mb-4">
            <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="traditional">Traditional</SelectItem>
                <SelectItem value="fusion">Fusion</SelectItem>
                <SelectItem value="street">Street Food</SelectItem>
                <SelectItem value="continental">Continental</SelectItem>
                <SelectItem value="seafood">Seafood</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="delivery-time">Fastest</SelectItem>
                <SelectItem value="name">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm hidden md:block">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search restaurants or cuisine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuisines</SelectItem>
                <SelectItem value="traditional">Traditional Cameroonian</SelectItem>
                <SelectItem value="fusion">West African Fusion</SelectItem>
                <SelectItem value="street">Street Food</SelectItem>
                <SelectItem value="continental">Continental</SelectItem>
                <SelectItem value="seafood">Seafood</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="delivery-time">Fastest Delivery</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden">
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
                  <div className="flex flex-wrap gap-1">
                    {restaurant.specialties.slice(0, 2).map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {restaurant.specialties.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{restaurant.specialties.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Delivery: {restaurant.deliveryFee}
                  </span>
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

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No restaurants found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setCuisineFilter("all");
              }}
              className="mt-4"
              variant="outline"
            >
              Clear Filters
            </Button>
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

export default Restaurants;
