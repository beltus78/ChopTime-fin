
import { Search, ShoppingBag, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  title?: string;
  showSearch?: boolean;
  showCart?: boolean;
  showLocation?: boolean;
}

const MobileHeader = ({ 
  title = "ChopTime", 
  showSearch = true, 
  showCart = true,
  showLocation = true 
}: MobileHeaderProps) => {
  return (
    <div className="md:hidden">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/b045b0f7-18cc-4bde-bed3-e0d354ea7954.png" 
              alt="ChopTime" 
              className="w-8 h-8"
            />
            <h1 className="text-xl font-bold text-gradient">{title}</h1>
          </div>
          
          {showCart && (
            <Link to="/cart">
              <Button size="sm" variant="ghost" className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-choptime-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </Button>
            </Link>
          )}
        </div>
        
        {showLocation && (
          <div className="flex items-center space-x-1 mt-2">
            <MapPin className="w-4 h-4 text-choptime-orange" />
            <span className="text-sm text-gray-600">1st Trust Buea, Cameroon</span>
          </div>
        )}
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="bg-white px-4 py-3 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search restaurants, dishes..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-choptime-orange focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
