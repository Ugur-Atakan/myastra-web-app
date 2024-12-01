import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import DeliveryForm from "../components/checkout/DeliveryForm";
import OrderSummary from "../components/checkout/OrderSummary";
import CheckoutProgress from "../components/checkout/CheckoutProgress";
import { BuyPackageRequest } from "../types/birthChart";
import { useAppSelector } from "../store/hooks";
import instance from "../http/instance";

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const selectedPackageId = useAppSelector((state) => state.market.selectedPackage?.id);
  const [deliveryData, setDeliveryData] = useState<BuyPackageRequest['billingInfo']>({
      fullName: "",
      idNumber: "",
      address: "",
      phone: "",
      email: "",
  });

  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPackageId) {
      setDeliveryData((prevData) => ({
        ...prevData,
        packageId: selectedPackageId,
      }));
    }
    console.log('Selected package id',selectedPackageId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeliverySubmit = async (data:BuyPackageRequest['billingInfo']) => {
    try {
      setDeliveryData(data);
      const response = await instance.post("/market/buy", {
        packageId: selectedPackageId,
        billingInfo: data,
      });
      setPaymentLink(response.data);
      setCurrentStep(2);
      setShowPayment(true);
    } catch (error) {
      console.error("Ödeme sayfası yüklenirken bir hata oluştu:", error);
    }
  };

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
          <div className="lg:col-span-2 space-y-8">
            {currentStep === 1 && (
              <DeliveryForm
                initialData={deliveryData}
                onSubmit={handleDeliverySubmit}
              />
            )}
          </div>
          <div className="lg:col-span-1">
            <OrderSummary
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
