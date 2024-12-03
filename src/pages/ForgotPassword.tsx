import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { requestPasswordReset } from '../http/requests/authRequest';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await requestPasswordReset(email);
      setIsEmailSent(true);
      toast.success('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Bir hata oluştu';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="w-full max-w-md text-center">
          <img 
            src="https://myastra.com.tr/wp-content/uploads/2024/10/myastra-logo.png" 
            alt="Myastra Logo" 
            className="mx-auto h-12 mb-8" 
          />
          <div className="bg-FDEAE9 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">E-postanızı Kontrol Edin</h2>
            <p className="text-gray-600 mb-6">
              Şifre sıfırlama bağlantısı {email} adresine gönderildi. 
              Lütfen e-postanızı kontrol edin ve bağlantıya tıklayarak şifrenizi sıfırlayın.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 text-EF7874 hover:underline font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Giriş sayfasına dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="https://myastra.com.tr/wp-content/uploads/2024/10/myastra-logo.png" 
            alt="Myastra Logo" 
            className="mx-auto h-12 mb-6" 
          />
          <h2 className="text-2xl font-bold text-gray-900">Şifrenizi mi Unuttunuz?</h2>
          <p className="mt-2 text-gray-600">
            E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim
          </p>
        </div>
        
        <div className="bg-FDEAE9 rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent"
                  placeholder="ornek@email.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-EF7874 text-white rounded-lg px-4 py-3 font-medium hover:bg-opacity-90 transition-colors duration-200"
            >
              {loading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Bağlantısı Gönder'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-EF7874 hover:underline font-medium">
              Giriş sayfasına dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}