import { Check } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: number;
}

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const steps = [
    { number: 1, label: 'Teslimat Bilgileri' },
    { number: 2, label: 'Ödeme' },
  ];

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
      
      <div className="relative flex justify-between">
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          
          return (
            <div key={step.number} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 
                  ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-EF7874' : 'bg-gray-200'} 
                  ${isCompleted || isCurrent ? 'text-white' : 'text-gray-500'}`}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${isCurrent ? 'text-EF7874' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}