import AIModelsSection from '@/components/sections/AIModels';
import ControlTheOutcome from '@/components/sections/ControlTheOutcome';
import Footer from '@/components/sections/Footer';
import Hero from '@/components/sections/Hero';
import Navbar from '@/components/sections/Navbar';
import ProfessionalTools from '@/components/sections/ProfessionalTools';
import WorkflowsSlider from '@/components/sections/WorkflowsSlider';

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
