import { useState, useEffect } from 'react';
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

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PartnerInfoDto | null>(null);
  const selectedPackage = useAppSelector((state) => state.market.selectedPackage);
  const appliedCoupon = useAppSelector((state) => state.market.appliedCoupon);
  const [deliveryData, setDeliveryData] = useState<BuyPackageRequest['billingInfo']>({
    fullName: "",
    idNumber: "",
    address: "",
    phone: "",
    email: "",
  });

  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPackage?.id) {
      setDeliveryData((prevData) => ({
        ...prevData,
        packageId: selectedPackage.id,
      }));
    }
  }, [selectedPackage?.id]);

  // Add scroll to top effect when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleDeliverySubmit = async (data: BuyPackageRequest['billingInfo']) => {
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
      console.error("Ödeme sayfası yüklenirken bir hata oluştu:", error);
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