import { useState, useEffect } from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

interface PaymentFrameProps {
  paymentLink: string;
  onSuccess: () => void;
  onError: (message: string) => void;
  onClose: () => void;
}

interface PaymentStatus {
  status: 'loading' | 'success' | 'error';
  message?: string;
  referenceNo?: string;
  amount?: number;
  date?: string;
}

export default function PaymentFrame({paymentLink, onSuccess, onError, onClose }: PaymentFrameProps) {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({ status: 'loading' });

  useEffect(() => {
    // Listen for messages from PayTR iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://www.paytr.com') {
        const { status, message, referenceNo, amount, date } = event.data;
        
        setPaymentStatus({
          status,
          message,
          referenceNo,
          amount,
          date
        });

        if (status === 'success') {
          onSuccess();
        } else if (status === 'error') {
          onError(message || 'Ödeme işlemi başarısız oldu.');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSuccess, onError]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full">
        {paymentStatus.status === 'loading' && (
          <div className="p-8 text-center">
            <Loader2 className="h-12 w-12 text-EF7874 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Ödeme sayfası yükleniyor...</p>
          </div>
        )}

        {paymentStatus.status === 'success' && (
          <div className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Ödemeniz Başarıyla Tamamlandı
            </h3>
            <div className="space-y-2 mb-6 text-gray-600">
              <p>İşlem Referans No: {paymentStatus.referenceNo}</p>
              <p>Ödeme Tutarı: {paymentStatus.amount?.toFixed(2)}₺</p>
              <p>Tarih: {paymentStatus.date}</p>
            </div>
            <button
              onClick={onClose}
              className="bg-EF7874 text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Kapat
            </button>
          </div>
        )}

        {paymentStatus.status === 'error' && (
          <div className="p-8 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Ödeme İşlemi Başarısız
            </h3>
            <p className="text-gray-600 mb-6">{paymentStatus.message}</p>
            <button
              onClick={onClose}
              className="bg-EF7874 text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Kapat
            </button>
          </div>
        )}

        {paymentStatus.status === 'loading' && (
          <iframe
            src={paymentLink}
            style={{ width: '800px', height: '600px', border: 'none' }}
            className="mx-auto"
          />
        )}
      </div>
    </div>
  );
}