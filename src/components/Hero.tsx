import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, Download } from "lucide-react";

const Hero = () => {
  const scrollToGenerator = () => {
    const generator = document.getElementById('password-generator');
    generator?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="p-4 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Secure Password
            </span>
            <br />
            <span className="text-foreground">Generator</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Create ultra-strong, customizable passwords instantly. 
            Protect your digital life with military-grade security.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={scrollToGenerator}
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
            >
              <Lock className="h-5 w-5 mr-2" />
              Generate Password Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 hover:bg-primary/5 text-lg px-8 py-6"
            >
              <Eye className="h-5 w-5 mr-2" />
              Learn More
            </Button>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50">
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-lg">Ultra Secure</h3>
              <p className="text-muted-foreground text-sm">
                Military-grade encryption with customizable complexity levels
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50">
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-full bg-accent/10">
                  <Download className="h-6 w-6 text-accent" />
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-lg">Instant Generation</h3>
              <p className="text-muted-foreground text-sm">
                Generate and copy passwords instantly with one click
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50">
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-full bg-primary/10">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-lg">Privacy First</h3>
              <p className="text-muted-foreground text-sm">
                No data stored or transmitted - everything happens locally
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;