import { Navigation } from "@/components/ui/Navigation";
import {
  HeroSection,
  SocialProofSection,
  HowItWorksSection,
  WhyThisWorksSection,
  AIFeaturesSection,
  PricingSection,
  TestimonialsSection,
  FinalCTASection,
  FooterSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#000000] noise-overlay">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Social Proof Strip */}
      <SocialProofSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Why This Works Section */}
      <WhyThisWorksSection />

      {/* AI Features Section */}
      <AIFeaturesSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
