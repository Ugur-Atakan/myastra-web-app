import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <img 
          src="https://myastra.com.tr/wp-content/uploads/2024/10/myastra-logo.png" 
          alt="Myastra Logo" 
          className="h-12 mx-auto mb-8"
        />

        {/* 404 Image */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 bg-FDEAE9 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-bold text-EF7874">404</span>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Sayfa Bulunamadı
        </h1>
        <p className="text-gray-600 mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
          Ana sayfaya dönerek yolculuğunuza devam edebilirsiniz.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 bg-EF7874 text-white px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Home className="h-5 w-5" />
            Ana Sayfaya Dön
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all border border-gray-200"
          >
            <ArrowLeft className="h-5 w-5" />
            Geri Git
          </button>
        </div>
      </div>
    </div>
  );
}