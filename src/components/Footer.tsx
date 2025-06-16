
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-choptime-brown text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/b045b0f7-18cc-4bde-bed3-e0d354ea7954.png" 
                alt="ChopTime Mascot" 
                className="w-8 h-8 object-contain"
              />
              <h3 className="text-2xl font-bold font-poppins">ChopTime</h3>
            </div>
            <p className="text-white/80">
              Bringing the taste of Cameroon to your doorstep. Fresh, fast, and always delicious.
            </p>
            <div className="flex space-x-3">
              <Button size="sm" variant="ghost" className="text-white hover:text-choptime-orange hover:bg-white/10">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:text-choptime-orange hover:bg-white/10">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:text-choptime-orange hover:bg-white/10">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/restaurants" className="hover:text-white transition-colors">Restaurants</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/track" className="hover:text-white transition-colors">Order Tracking</a></li>
              <li><a href="/partner" className="hover:text-white transition-colors">Partner with Us</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3 text-white/80">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-choptime-orange" />
                <span className="text-sm">1st Trust Buea, Cameroon</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-choptime-orange" />
                <span className="text-sm">+237 673 289 043</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-choptime-orange" />
                <span className="text-sm">choptime237@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>&copy; 2024 ChopTime. All rights reserved. Made with ❤️ in Cameroon.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
