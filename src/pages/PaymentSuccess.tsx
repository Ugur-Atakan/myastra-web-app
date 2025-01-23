import { useNavigate } from 'react-router-dom';
import { CheckCircle, FileText, Home } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import instance from '../http/instance';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [isLoading, setIsLoading] = useState(false);
const [total_amount, setTotalAmount] = useState(null);


  useEffect(() => {
    const fetchTotalAmount = async () => {
      setIsLoading(true);
      try {
        const response = await instance.get(`/checkout/get-details/${orderId}`);
        setTotalAmount(response.data.finalPrice);
        setIsLoading(false);
      } catch (error) {
        toast.error('Ödeme bilgileri alınırken bir hata oluştu');
        setIsLoading(false);
        return null;
      } finally {
        setIsLoading(false);
      }
    }
    fetchTotalAmount();
  }, [orderId]);
  


 const amountToCurrency = (amount: string) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(Number(amount));
  }

  if(isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-100 rounded-xl" />
            <div className="h-12 bg-gray-100 rounded-xl" />
            <div className="h-12 bg-gray-100 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <img 
          src="https://myastra.com.tr/wp-content/uploads/2024/10/myastra-logo.png" 
          alt="Myastra Logo" 
          className="h-12 mx-auto mb-8"
        />

        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 bg-green-50 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Ödemeniz Başarıyla Tamamlandı!
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sipariş Numarası</span>
              <span className="font-medium">{orderId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tutar</span>
              <span className="font-medium">{amountToCurrency(total_amount!)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tarih</span>
              <span className="font-medium">{new Date().toLocaleDateString('tr-TR')}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-8">
          Raporunuz hazırlandığında size e-posta ile bilgilendirme yapılacaktır.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/dashboard/reports')}
            className="inline-flex items-center justify-center gap-2 bg-EF7874 text-white px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all"
          >
            <FileText className="h-5 w-5" />
            Raporlarım
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all border border-gray-200"
          >
            <Home className="h-5 w-5" />
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    </div>
  );
}