import DashboardLayout from '../components/layout/DashboardLayout';
import HeroSection from '../components/relationship/HeroSection';
import ServiceInfo from '../components/relationship/ServiceInfo';
import Advantages from '../components/relationship/Advantages';
import HowItWorks from '../components/relationship/HowItWorks';
import Testimonials from '../components/relationship/Testimonials';
import Pricing from '../components/relationship/Pricing';
import FAQ from '../components/relationship/FAQ';
import SecurityInfo from '../components/relationship/SecurityInfo';
import { useRef } from 'react';

export default function RelationshipAnalysis() {

 
  const packagesRef = useRef<HTMLDivElement>(null);
  const serviceInfoRef = useRef<HTMLDivElement>(null);
  const scrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: 'smooth' }); // Burada scroll fonksiyonunu çağırıyoruz
  };
  const scrollToServiceInfo = () => {
      serviceInfoRef.current?.scrollIntoView({ behavior: 'smooth' }); // Burada scroll fonksiyonunu çağırıyoruz
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-24 py-8">
        <HeroSection onScrollToPackages={scrollToPackages}  onScrollToServiceInfo={scrollToServiceInfo}/>
      <div ref={serviceInfoRef}>
      <ServiceInfo />
      </div>
        <Advantages />
        <HowItWorks />
        <div ref={packagesRef}> {/* Ref Packages bileşenine bağlanıyor */}
          <Pricing />
        </div>
        <Testimonials />
        <FAQ />
        <SecurityInfo />
      </div>
    </DashboardLayout>
  );
}