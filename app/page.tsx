import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import ScopeInvestmentSection from '@/components/ScopeInvestmentSection';
import TransmissionSection from '@/components/TransmissionSection';
import ClickSpark from '@/components/ClickSpark';

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-black selection:text-white scroll-smooth relative">
      <ClickSpark
        sparkColor="#000000"
        sparkSize={10}
        sparkRadius={20}
        sparkCount={8}
        duration={500}
      >
        <HeroSection />
        <PortfolioSection />
        <ScopeInvestmentSection />
        <TransmissionSection />
      </ClickSpark>
    </main>
  );
}
