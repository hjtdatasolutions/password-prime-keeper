import Hero from "@/components/Hero";
import PasswordGenerator from "@/components/PasswordGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <section id="password-generator" className="py-16 bg-gradient-hero">
        <div className="container mx-auto">
          <PasswordGenerator />
        </div>
      </section>
    </div>
  );
};

export default Index;
