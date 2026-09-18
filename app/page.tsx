import { Hero } from "@/components/Hero";
import { CategoriesGrid } from "@/components/CategoriesGrid";
import { ChartsSection } from "@/components/ChartsSection";
import { CTASection } from "@/components/CTASection";
import { StatsBar } from "@/components/StatsBar";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <StatsBar />
      <CategoriesGrid />
      <ChartsSection />
      <CTASection />
    </div>
  );
}