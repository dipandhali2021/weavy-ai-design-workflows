import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import AIModelsSection from "@/components/sections/ai-models";
import ProfessionalTools from "@/components/sections/ProfessionalTools";
import ControlTheOutcome from "@/components/sections/ControlTheOutcome";
import WorkflowsSlider from "@/components/sections/WorkflowsSlider";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <AIModelsSection />
      <ProfessionalTools />
      <ControlTheOutcome />
      <WorkflowsSlider />
      <Footer />
    </main>
  );
}
