import DashboardLayout from '../components/layout/DashboardLayout';
import HeroSection from '../components/birth-chart/HeroSection';
import ServiceInfo from '../components/birth-chart/ServiceInfo';
import Packages from '../components/birth-chart/Packages';
import HowItWorks from '../components/birth-chart/HowItWorks';
import FAQ from '../components/birth-chart/FAQ';
import Testimonials from '../components/birth-chart/Testimonials';
import SecurityInfo from '../components/birth-chart/SecurityInfo';
import { useRef } from 'react';

export default function BirthChartAnalysis() {

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
      <HeroSection onScrollToPackages={scrollToPackages} onScrollToServiceInfo={scrollToServiceInfo} />
      <div ref={serviceInfoRef}>
         <ServiceInfo />     
      </div>
        <HowItWorks />
        <div ref={packagesRef}> {/* Ref Packages bileşenine bağlanıyor */}
          <Packages />
        </div>
        <Testimonials />

        <FAQ />
        <SecurityInfo />
      </div>
    </DashboardLayout>
  );
}