import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import instance from '../../http/instance';
import { Package } from '../../types/report';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { selectPackage } from '../../store/slices/marketSlice';
import NoPackageComponent from '../common/NoPackage';

export default function Pricing() {
  const [horaryPackages, setHoraryPackages] = useState<Package[] | null>([]);
  const navigate = useNavigate();
const dispatch = useAppDispatch();

  const getPackages = async () => {
    const response = await instance.get("/market/reports/Horary");
    const packages = response.data?.packages;
    console.log('Horary packages:', response.data);
    if (!packages || packages.length === 0) {
      console.log("No packages found");
      return;
    }
    setHoraryPackages(packages);
  };

  useEffect(() => {
    getPackages();
  }, []);


  const handlePurchase = (pkg: Package) => {
    console.log("Selected package:", pkg);
    dispatch(selectPackage(pkg));
    navigate("/checkout");
  };



  return (
    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Hizmet Ücretimiz</h2>
        <p className="text-gray-600">
          Detaylı bir astrolojik analiz ile sorunuza rehberlik ediyoruz.
          Şimdi uygun fiyatlarla bu eşsiz deneyimi yaşayın!
        </p>
      </div>
{!horaryPackages|| horaryPackages.length >= 0 ? (
     <NoPackageComponent />
    ):(horaryPackages?.map((pkg, index) => (
      <div className="max-w-lg mx-auto">
            <div className="bg-FDEAE9 rounded-xl p-8 text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tek Soru Astrolojisi</h3>
              <div className="text-4xl font-bold text-EF7874 mb-6">299₺</div>
              <ul className="space-y-4 mb-8">
                {pkg.description.split('\n').map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-EF7874 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={()=>handlePurchase(pkg)}
                className="w-full bg-EF7874 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                Şimdi Hemen Sorumu Sor!
              </button>
            </div>
    
            <div className="text-center text-gray-600">
              <p className="font-medium">Ekstra Sorular</p>
              <p>Her ek soru için +150₺</p>
            </div>
          </div>
        ))) }
  
    </div>
  );
}