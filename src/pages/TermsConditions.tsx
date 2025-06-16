
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-poppins mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to ChopTime. These Terms and Conditions ("Terms") govern your use of our food delivery 
                  platform and services. By accessing or using ChopTime, you agree to be bound by these Terms. 
                  If you disagree with any part of these terms, you may not use our services.
                </p>
              </section>

              {/* Definitions */}
              <section>
                <h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  <p><strong>"ChopTime"</strong> refers to the food delivery platform operated in Buea, Cameroon.</p>
                  <p><strong>"User"</strong> refers to anyone who uses our platform to order food.</p>
                  <p><strong>"Partner Restaurant"</strong> refers to restaurants listed on our platform.</p>
                  <p><strong>"Delivery Partner"</strong> refers to our delivery drivers.</p>
                  <p><strong>"Services"</strong> refers to food ordering and delivery services.</p>
                </div>
              </section>

              {/* User Accounts */}
              <section>
                <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>3.1 You must provide accurate and complete information when creating an account.</p>
                  <p>3.2 You are responsible for maintaining the confidentiality of your account credentials.</p>
                  <p>3.3 You must be at least 18 years old to create an account and place orders.</p>
                  <p>3.4 One person may not maintain more than one account.</p>
                </div>
              </section>

              {/* Orders and Payments */}
              <section>
                <h2 className="text-2xl font-bold mb-4">4. Orders and Payments</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>4.1 All orders are subject to acceptance by the partner restaurant.</p>
                  <p>4.2 Prices are displayed in Central African CFA francs (FCFA) and include applicable taxes.</p>
                  <p>4.3 Payment can be made via cash on delivery, mobile money, or bank transfer.</p>
                  <p>4.4 Delivery fees are clearly displayed before order confirmation.</p>
                  <p>4.5 Orders cannot be cancelled once the restaurant has confirmed preparation.</p>
                </div>
              </section>

              {/* Delivery */}
              <section>
                <h2 className="text-2xl font-bold mb-4">5. Delivery</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>5.1 Estimated delivery times are approximate and may vary due to weather, traffic, or order volume.</p>
                  <p>5.2 Delivery is available within our service areas in Buea during operating hours (7 AM - 11 PM).</p>
                  <p>5.3 You must provide accurate delivery address and contact information.</p>
                  <p>5.4 Someone must be available to receive the order at the delivery address.</p>
                </div>
              </section>

              {/* Cancellations and Refunds */}
              <section>
                <h2 className="text-2xl font-bold mb-4">6. Cancellations and Refunds</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>6.1 Orders can be cancelled within 5 minutes of placement for a full refund.</p>
                  <p>6.2 If a restaurant cancels your order, you will receive a full refund.</p>
                  <p>6.3 Refunds for quality issues will be reviewed case-by-case.</p>
                  <p>6.4 Refund processing takes 3-5 business days for mobile money and bank transfers.</p>
                </div>
              </section>

              {/* User Conduct */}
              <section>
                <h2 className="text-2xl font-bold mb-4">7. User Conduct</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>7.1 Users must treat delivery partners and restaurant staff with respect.</p>
                  <p>7.2 Fraudulent orders or payment disputes may result in account suspension.</p>
                  <p>7.3 Users may not use the platform for any illegal or unauthorized purpose.</p>
                  <p>7.4 Abusive behavior towards staff will result in immediate account termination.</p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>8.1 ChopTime acts as an intermediary between users and partner restaurants.</p>
                  <p>8.2 We are not responsible for food quality, preparation, or food safety issues.</p>
                  <p>8.3 Our liability is limited to the value of your order.</p>
                  <p>8.4 We are not liable for delays due to circumstances beyond our control.</p>
                </div>
              </section>

              {/* Privacy */}
              <section>
                <h2 className="text-2xl font-bold mb-4">9. Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. We collect and use your information in accordance with 
                  applicable Cameroonian data protection laws. Your personal information will not be shared 
                  with third parties except as necessary to fulfill your orders.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. Users will be notified of 
                  significant changes via email or app notification. Continued use of our services 
                  constitutes acceptance of modified Terms.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms are governed by the laws of the Republic of Cameroon. Any disputes 
                  shall be resolved in the courts of Cameroon.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
                <div className="text-muted-foreground leading-relaxed">
                  <p>For questions about these Terms, please contact us:</p>
                  <div className="mt-3 space-y-1">
                    <p><strong>Email:</strong> choptime237@gmail.com</p>
                    <p><strong>Phone:</strong> +237 673 289 043</p>
                    <p><strong>Address:</strong> 1st Trust Buea, Cameroon</p>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsConditions;
