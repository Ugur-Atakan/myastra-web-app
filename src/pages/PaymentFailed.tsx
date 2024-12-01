import { useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <img 
          src="https://myastra.com.tr/wp-content/uploads/2024/10/myastra-logo.png" 
          alt="Myastra Logo" 
          className="h-12 mx-auto mb-8"
        />

        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 bg-red-50 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <XCircle className="h-24 w-24 text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Ödeme İşlemi Başarısız
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="space-y-4">
            <p className="text-gray-600">
              Üzgünüz, ödeme işleminiz tamamlanamadı. Bu durum şu nedenlerden kaynaklanabilir:
            </p>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Kart bilgileriniz hatalı olabilir</li>
              <li>• Kartınızda yeterli bakiye olmayabilir</li>
              <li>• Bankanız işlemi onaylamıyor olabilir</li>
              <li>• Geçici bir sistem hatası oluşmuş olabilir</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/checkout')}
            className="inline-flex items-center justify-center gap-2 bg-EF7874 text-white px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all"
          >
            <RefreshCw className="h-5 w-5" />
            Tekrar Dene
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all border border-gray-200"
          >
            <ArrowLeft className="h-5 w-5" />
            Geri Dön
          </button>
        </div>
      </div>
    </div>
  );
}