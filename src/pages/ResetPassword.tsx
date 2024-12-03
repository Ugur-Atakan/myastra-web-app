import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { verifyResetToken, resetPassword } from '../http/requests/authRequest';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);

  console.log(token);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        toast.error('Geçersiz veya eksik token');
        navigate('/', { replace: true });
        return;
      }

      try {
        const response = await verifyResetToken(token);
        setEmail(response.email);
      } catch (error) {
        toast.error('Geçersiz veya süresi dolmuş bağlantı');
        navigate('/', { replace: true });
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Şifreler eşleşmiyor');
      return;
    }

    if (password.length < 8) {
      toast.error('Şifre en az 8 karakter olmalıdır');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error('Şifre en az bir büyük harf içermelidir');
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error('Şifre en az bir küçük harf içermelidir');
      return;
    }

    if (!/[0-9]/.test(password)) {
      toast.error('Şifre en az bir rakam içermelidir');
      return;
    }

    if (!token) {
      toast.error('Geçersiz token');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      toast.success('Şifreniz başarıyla güncellendi');
      navigate('/', { replace: true });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Bir hata oluştu';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center">
          <p className="text-gray-600">Token doğrulanıyor...</p>
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
          <h2 className="text-2xl font-bold text-gray-900">Yeni Şifre Oluşturun</h2>
          <p className="mt-2 text-gray-600">
            {email} hesabı için yeni şifrenizi belirleyin
          </p>
        </div>
        
        <div className="bg-FDEAE9 rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yeni Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-12 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şifreyi Onayla
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-12 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p>Şifreniz:</p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li className={password.length >= 8 ? 'text-green-600' : ''}>
                  En az 8 karakter uzunluğunda olmalıdır
                </li>
                <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
                  En az bir büyük harf içermelidir
                </li>
                <li className={/[a-z]/.test(password) ? 'text-green-600' : ''}>
                  En az bir küçük harf içermelidir
                </li>
                <li className={/[0-9]/.test(password) ? 'text-green-600' : ''}>
                  En az bir rakam içermelidir
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-EF7874 text-white rounded-lg px-4 py-3 font-medium hover:bg-opacity-90 transition-colors duration-200"
            >
              {loading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}