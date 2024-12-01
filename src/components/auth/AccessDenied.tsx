import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function AccessDenied() {
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
          <div className="absolute inset-0 bg-FDEAE9 rounded-full opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldAlert className="h-24 w-24 text-EF7874" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Erişim Reddedildi
        </h1>
        <p className="text-gray-600 mb-8">
          Bu sayfaya erişim yetkiniz bulunmamaktadır. 
          Lütfen gerekli izinlere sahip olduğunuzdan emin olun.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center gap-2 bg-EF7874 text-white px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
          Geri Dön
        </button>
      </div>
    </div>
  );
}