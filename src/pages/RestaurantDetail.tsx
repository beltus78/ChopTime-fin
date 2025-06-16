
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, MapPin, ArrowLeft, Plus, Minus, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [cart, setCart] = useState<{[key: number]: number}>({});

  // Mock restaurant data (in a real app, this would come from an API)
  const restaurant = {
    id: parseInt(id || "1"),
    name: "Mama Africa Kitchen",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    cuisine: "Traditional Cameroonian",
    rating: 4.8,
    reviews: 156,
    deliveryTime: "25-35 min",
    location: "Mile 16, Buea",
    deliveryFee: "500 FCFA",
    description: "Authentic Cameroonian cuisine prepared with traditional methods and fresh local ingredients. Experience the rich flavors of Cameroon in every bite.",
    categories: [
      {
        name: "Main Dishes",
        items: [
          {
            id: 1,
            name: "Ndolé Special",
            description: "Traditional stew with bitter leaves, groundnuts, and assorted meat",
            price: 3500,
            image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
            popular: true
          },
          {
            id: 2,
            name: "Eru with Water Fufu",
            description: "Wild spinach cooked with crayfish, palm oil, and served with fufu",
            price: 3000,
            image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
            popular: false
          },
          {
            id: 3,
            name: "Achu Yellow Soup",
            description: "Traditional Achu served with yellow soup and assorted meat",
            price: 4000,
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            popular: true
          }
        ]
      },
      {
        name: "Rice Dishes",
        items: [
          {
            id: 4,
            name: "Jollof Rice",
            description: "Perfectly seasoned rice with tomatoes, peppers, and your choice of protein",
            price: 2500,
            image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
            popular: true
          },
          {
            id: 5,
            name: "Coconut Rice",
            description: "Fragrant rice cooked in coconut milk with spices",
            price: 2200,
            image: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a",
            popular: false
          }
        ]
      },
      {
        name: "Grilled Items",
        items: [
          {
            id: 6,
            name: "Suya",
            description: "Grilled meat skewers with traditional spice blend",
            price: 1800,
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            popular: true
          },
          {
            id: 7,
            name: "Grilled Fish",
            description: "Fresh fish grilled with local spices and served with plantain",
            price: 3200,
            image: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
            popular: false
          }
        ]
      }
    ]
  };

  const addToCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = restaurant.categories
        .flatMap(cat => cat.items)
        .find(item => item.id === parseInt(itemId));
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/restaurants" className="inline-flex items-center text-choptime-orange hover:text-choptime-orange/80 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Restaurants
        </Link>

        {/* Restaurant Header */}
        <div className="bg-card rounded-lg shadow-sm mb-8 overflow-hidden">
          <div className="relative h-64">
            <img 
              src={restaurant.image} 
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-4xl font-bold font-poppins mb-2">{restaurant.name}</h1>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{restaurant.rating}</span>
                  <span className="text-white/80">({restaurant.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{restaurant.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">{restaurant.cuisine}</Badge>
              <span className="text-sm text-muted-foreground">Delivery: {restaurant.deliveryFee}</span>
            </div>
            <p className="text-muted-foreground">{restaurant.description}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Menu */}
          <div className="lg:col-span-3">
            {restaurant.categories.map((category) => (
              <div key={category.name} className="mb-8">
                <h2 className="text-2xl font-bold font-poppins mb-6 text-choptime-brown">
                  {category.name}
                </h2>
                
                <div className="grid gap-4">
                  {category.items.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-24 h-24 object-cover"
                          />
                          <div className="flex-1 p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="font-semibold">{item.name}</h3>
                                  {item.popular && (
                                    <Badge className="bg-choptime-orange text-xs">Popular</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {item.description}
                                </p>
                                <p className="font-bold text-choptime-orange">
                                  {item.price.toLocaleString()} FCFA
                                </p>
                              </div>
                              
                              <div className="flex items-center space-x-2 ml-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1 h-8 w-8"
                                >
                                  <Heart className="w-4 h-4" />
                                </Button>
                                
                                {cart[item.id] ? (
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="p-1 h-8 w-8"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="font-semibold min-w-[20px] text-center">
                                      {cart[item.id]}
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="p-1 h-8 w-8"
                                      onClick={() => addToCart(item.id)}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <Button
                                    size="sm"
                                    className="bg-choptime-orange hover:bg-choptime-orange/90"
                                    onClick={() => addToCart(item.id)}
                                  >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-lg">
                <CardHeader>
                  <h3 className="font-bold">Your Order</h3>
                  <p className="text-sm text-muted-foreground">
                    {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(cart).filter(([_, quantity]) => quantity > 0).map(([itemId, quantity]) => {
                    const item = restaurant.categories
                      .flatMap(cat => cat.items)
                      .find(item => item.id === parseInt(itemId));
                    
                    if (!item) return null;
                    
                    return (
                      <div key={itemId} className="flex items-center justify-between text-sm">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-muted-foreground">
                            {item.price.toLocaleString()} FCFA × {quantity}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-6 w-6"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="min-w-[20px] text-center">{quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-6 w-6"
                            onClick={() => addToCart(item.id)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  
                  {getTotalItems() === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Your cart is empty
                    </p>
                  )}
                  
                  {getTotalItems() > 0 && (
                    <>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span className="text-choptime-orange">
                            {getCartTotal().toLocaleString()} FCFA
                          </span>
                        </div>
                      </div>
                      
                      <Link to="/cart">
                        <Button className="w-full bg-choptime-orange hover:bg-choptime-orange/90">
                          Go to Cart
                        </Button>
                      </Link>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RestaurantDetail;
