import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import DeliveryForm from '../components/checkout/DeliveryForm';
import OrderSummary from '../components/checkout/OrderSummary';
import CheckoutProgress from '../components/checkout/CheckoutProgress';
import PersonSelector from '../components/checkout/PersonSelector';
import RelationshipPersonSelector from '../components/relationship/RelationshipPersonSelector';
import { BuyPackageRequest } from '../types/birthChart';
import { useAppSelector } from '../store/hooks';
import instance from '../http/instance';
import { PartnerInfoDto } from '../types/partner';
import toast from 'react-hot-toast';
import { checkBirthDataComplete } from '../utils/validation';

export default function Checkout() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PartnerInfoDto | null>(null);
  const selectedPackage = useAppSelector((state) => state.market.selectedPackage);
  const appliedCoupon = useAppSelector((state) => state.market.appliedCoupon);
  const userData = useAppSelector((state) => state.user.userData);
  
  const [deliveryData, setDeliveryData] = useState<BuyPackageRequest['billingInfo']>({
    fullName: "",
    idNumber: "",
    address: "",
    phone: "",
    email: "",
  });

  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedPackage) {
      navigate('/dashboard');
      return;
    }

    if (!checkBirthDataComplete(userData)) {
      navigate('/dashboard/settings');
      return;
    }
  }, [selectedPackage, userData, navigate]);

  useEffect(() => {
    if (selectedPackage?.id) {
      setDeliveryData((prevData) => ({
        ...prevData,
        packageId: selectedPackage.id,
      }));
    }
  }, [selectedPackage?.id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleDeliverySubmit = async (data: BuyPackageRequest['billingInfo']) => {
    const isRelationshipPackage = selectedPackage?.packageType === 'SYNASTRY';
    
    if (isRelationshipPackage && !selectedPerson) {
      toast.error('Lütfen ilişki analizi yapılacak kişiyi seçin');
      return;
    }

    try {
      setDeliveryData(data);
      const response = await instance.post("/checkout/buy", {
        packageId: selectedPackage?.id,
        billingInfo: data,
        couponCode: appliedCoupon?.code || null,
        partnerInfo: selectedPerson,
      });
      setPaymentLink(response.data);
      setCurrentStep(2);
      setShowPayment(true);
    } catch (error) {
      toast.error("Ödeme sayfası yüklenirken bir hata oluştu");
    }
  };

  const isRelationshipPackage = selectedPackage?.packageType === 'SYNASTRY';

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <CheckoutProgress currentStep={currentStep} />

        {showPayment && paymentLink && (
          <div className="mt-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Güvenli Ödeme</h2>
              <iframe
                src={paymentLink}
                style={{ width: "100%", height: "800px" }}
                className="mx-auto border-0"
                title="PayTR Ödeme Formu"
              />
            </div>
          </div>
        )}

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className={`${currentStep === 1 ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-8`}>
            {currentStep === 1 && (
              <>
                {isRelationshipPackage ? (
                  <RelationshipPersonSelector
                    selectedPerson={selectedPerson}
                    onSelect={setSelectedPerson}
                  />
                ) : (
                  <PersonSelector
                    selectedPerson={selectedPerson}
                    onSelect={setSelectedPerson}
                  />
                )}
                <DeliveryForm
                  initialData={deliveryData}
                  onSubmit={handleDeliverySubmit}
                />
              </>
            )}
          </div>
          {currentStep === 1 && (
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}