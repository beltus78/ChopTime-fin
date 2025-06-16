
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import PopularDishes from "@/components/PopularDishes";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import MobileHeader from "@/components/MobileHeader";
import MobileNavigation from "@/components/MobileNavigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Header */}
      <Header />
      
      {/* Mobile Header */}
      <MobileHeader />
      
      <div className="pb-20 md:pb-0">
        <Hero />
        <FeaturedRestaurants />
        <PopularDishes />
        <HowItWorks />
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

export default Index;
