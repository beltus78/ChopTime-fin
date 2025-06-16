
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const EmailConfirmed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-choptime-cream to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Email Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for verifying your email address. Your account is now fully activated.
            </p>
          </div>

          <div className="space-y-3">
            <Link to="/" className="block">
              <Button className="w-full bg-choptime-orange hover:bg-choptime-orange/90">
                Start Ordering
              </Button>
            </Link>
            
            <Link to="/profile" className="block">
              <Button variant="outline" className="w-full">
                Go to Profile
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            You'll be automatically redirected to the homepage in 5 seconds...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailConfirmed;
