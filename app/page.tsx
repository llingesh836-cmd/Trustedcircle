import ModernHeader from '@/components/ModernHeader';
import CategoryNav from '@/components/CategoryNav';
import HeroSlider from '@/components/HeroSlider';
import ActivationProcess from '@/components/ActivationProcess';
import VouchersSection from '@/components/VouchersSection';
import FeaturedBrands from '@/components/FeaturedBrands';
import TrendingDeals from '@/components/TrendingDeals';
import RewardsSection from '@/components/RewardsSection';
import TrustSection from '@/components/TrustSection';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-page">
      {/* Header */}
      <ModernHeader />

      {/* Category Navigation */}
      <CategoryNav />

      <main>
        <HeroSlider />
        <ActivationProcess />
        <VouchersSection />
        <FeaturedBrands />

        {/* Trending Deals */}
        <TrendingDeals />

        {/* Rewards Section */}
        <RewardsSection />

        {/* Trust Section */}
        <TrustSection />

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
