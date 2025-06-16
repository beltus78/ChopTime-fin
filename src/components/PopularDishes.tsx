
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Heart } from "lucide-react";

const PopularDishes = () => {
  const dishes = [
    {
      id: 1,
      name: "Ndolé",
      description: "Traditional Cameroonian stew with bitter leaves, groundnuts, and assorted meat",
      price: "3,500 FCFA",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      restaurant: "Mama Africa Kitchen",
      spicy: true
    },
    {
      id: 2,
      name: "Jollof Rice",
      description: "Perfectly seasoned rice with tomatoes, peppers, and your choice of protein",
      price: "2,500 FCFA",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      restaurant: "Spice Route",
      spicy: false
    },
    {
      id: 3,
      name: "Suya",
      description: "Grilled meat skewers with traditional Nigerian spice blend",
      price: "1,800 FCFA",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      restaurant: "Street Food Central",
      spicy: true
    },
    {
      id: 4,
      name: "Eru with Water Fufu",
      description: "Wild spinach cooked with crayfish, palm oil, and served with fufu",
      price: "3,000 FCFA",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      restaurant: "The Village Kitchen",
      spicy: false
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-poppins mb-4">
            Most <span className="text-gradient">Popular Dishes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Try the favorites that keep our customers coming back for more
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <Card key={dish.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
                {dish.spicy && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    🌶️ Spicy
                  </div>
                )}
              </div>
              
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg group-hover:text-choptime-orange transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{dish.restaurant}</p>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {dish.description}
                </p>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-choptime-orange">
                    {dish.price}
                  </span>
                  <Button size="sm" className="bg-choptime-orange hover:bg-choptime-orange/90">
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;
