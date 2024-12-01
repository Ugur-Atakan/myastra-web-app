import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../http/instance";
import { Package } from "../../types/report";
import { useAppDispatch } from "../../store/hooks";
import { selectPackage } from "../../store/slices/marketSlice";
import NoPackageComponent from "../common/NoPackage";

export default function Packages() {
  const [natalPackages, setNatalPackages] = useState<Package[] | null>([]);
  const dispatch = useAppDispatch();

  const getPackages = async () => {
    const response = await instance.get("/market/reports/Natal");
    const packages = response.data[0]?.packages;
    if (!packages || packages.length === 0) {
      console.log("No packages found");
      return;
    }
    setNatalPackages(packages);
  };

  useEffect(() => {
    getPackages();
  }, []);

  const navigate = useNavigate();

  const handlePurchase = (pkg: Package) => {
    console.log("Selected package:", pkg);
    dispatch(selectPackage(pkg));
    navigate("/checkout");
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Sana Uygun Paketi Seç!
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Her ihtiyaca uygun paketlerimizle astrolojik rehberliğe ulaş.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {!natalPackages || natalPackages.length == 0 ? (
          <div className="center">
            <NoPackageComponent />
          </div>
        ) : (
          natalPackages?.map((pkg, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {pkg.name}
                </h3>
                <div className="text-3xl font-bold text-EF7874 mb-6">
                  {pkg.price}₺
                </div>
                <ul className="space-y-4 mb-8">
                  {pkg.description.split("\n").map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="text-EF7874 h-6 w-6" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handlePurchase(pkg)}
                className="w-full bg-EF7874 text-white px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors mt-auto"
              >
                Hemen Al
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
