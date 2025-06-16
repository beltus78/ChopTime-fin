
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Truck, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Food",
      description: "We believe great food brings people together and creates lasting memories."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Supporting local restaurants and connecting them with food lovers in Buea."
    },
    {
      icon: Truck,
      title: "Fast & Reliable",
      description: "Quick delivery without compromising on quality or freshness."
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Working only with the best restaurants to ensure exceptional dining experiences."
    }
  ];

  const team = [
    {
      name: "Emmanuel Tabi",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      description: "Passionate about connecting food lovers with authentic Cameroonian cuisine."
    },
    {
      name: "Grace Ngome",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c002",
      description: "Ensuring smooth operations and exceptional customer experiences."
    },
    {
      name: "Paul Nkeng",
      role: "Tech Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      description: "Building the technology that powers ChopTime's seamless food delivery."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
            About <span className="text-gradient">ChopTime</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ChopTime was born from a simple idea: to make authentic Cameroonian cuisine accessible 
            to everyone in Buea. We're more than just a food delivery service – we're a bridge 
            connecting local restaurants with food enthusiasts who appreciate the rich flavors 
            of our culture.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold font-poppins mb-6 text-choptime-brown">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2024 in the heart of Buea, ChopTime emerged from our founders' 
                love for traditional Cameroonian food and their desire to support local 
                restaurant owners. We noticed that many amazing restaurants were hidden 
                gems, known only to locals, while food lovers struggled to discover 
                authentic dishes.
              </p>
              <p>
                Today, ChopTime serves as the premier food delivery platform in Buea, 
                partnering with over 50 local restaurants and delivering thousands of 
                meals monthly. We're proud to be part of Buea's growing digital economy 
                while preserving and promoting our culinary heritage.
              </p>
              <p>
                Our mission goes beyond delivery – we're building a community where 
                food lovers can explore, discover, and enjoy the best of Cameroonian 
                cuisine from the comfort of their homes.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              alt="ChopTime team working"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -right-6 bg-choptime-orange text-white p-6 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm">Partner Restaurants</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold font-poppins text-center mb-12 text-choptime-brown">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-choptime-orange/10 rounded-full flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-choptime-orange" />
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold font-poppins text-center mb-12 text-choptime-brown">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-choptime-orange font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-choptime rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold font-poppins mb-8">ChopTime by Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-white/90">Partner Restaurants</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-white/90">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-white/90">Deliveries Made</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25min</div>
              <div className="text-white/90">Average Delivery Time</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
