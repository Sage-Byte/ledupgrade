import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import electricMedicLogo from "@/assets/electric-medic-logo.webp";
import ledLivingRoom from "@/assets/led-living-room.jpg";
import { useNavigate } from "react-router-dom";

const LEDLanding = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/led-quiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <SEOHead 
        title="LED Upgrade Savings Calculator | Electric Medic Columbus" 
        description="Discover how much you can save with professional LED lighting upgrades. Get your free LED savings analysis from Electric Medic, Columbus's trusted electricians."
      />
      
      {/* Header */}
      <header className="container px-4 py-6">
        <div className="flex items-center justify-between">
          <img src={electricMedicLogo} alt="Electric Medic" className="h-12 w-auto" />
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Licensed & Certified #46384</p>
            <p className="font-semibold text-primary">(614) 866-6020</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            ⚡ Free LED Savings Calculator
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Shed Some Light On Your LED Savings
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover how much you can save with professional LED lighting upgrades. 
            Take our 60-second quiz and get personalized savings for your Columbus area home.
          </p>
          
          <Button onClick={startQuiz} size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-primary to-primary-variant hover:from-primary-variant hover:to-primary">
            Start My LED Savings Quiz →
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            Serving Columbus, Dublin, Worthington, Hilliard, Upper Arlington & surrounding areas
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="container px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose LED Upgrades?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💰 <span>Save Money</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>LED lights use 75% less energy than traditional bulbs, reducing your electric bills immediately.</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔧 <span>Professional Installation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Licensed electricians ensure safe, code-compliant installation with warranty protection.</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-success">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⏰ <span>Long Lasting</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Quality LED fixtures last 15-25 years, eliminating frequent bulb replacements.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="container px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Transform Your Home with Professional LED Lighting</h3>
              <p className="text-muted-foreground mb-6">
                Electric Medic specializes in comprehensive LED upgrades for homes and businesses throughout the Columbus area. 
                Our certified electricians provide expert installation with premium fixtures and guaranteed results.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">✓ Recessed LED downlights</li>
                <li className="flex items-center gap-2">✓ Under-cabinet kitchen lighting</li>
                <li className="flex items-center gap-2">✓ Outdoor landscape lighting</li>
                <li className="flex items-center gap-2">✓ Commercial LED retrofits</li>
              </ul>
            </div>
            <div>
              <img src={ledLivingRoom} alt="Modern LED living room lighting" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-12">
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Saving?</h3>
            <p className="text-muted-foreground mb-6">
              Get your personalized LED savings analysis in under 2 minutes
            </p>
            <Button onClick={startQuiz} size="lg" className="px-8 py-4 bg-gradient-to-r from-primary to-primary-variant hover:from-primary-variant hover:to-primary">
              Calculate My LED Savings
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container px-4 py-8 text-center text-sm text-muted-foreground">
        <p>© 2024 Electric Medic | Licensed & Certified Electricians | Columbus, Ohio</p>
      </footer>
    </div>
  );
};

export default LEDLanding;