import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/userSlice';
import toast from 'react-hot-toast';
import { Mail, Lock } from 'lucide-react';
import { axiosInstance, baseApi } from '../http';
import { getUserTokens, saveUserTokens } from '../utils/storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const tokens = getUserTokens();
    if (tokens) {
      axiosInstance.post('/user/me');
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await baseApi.post('/auth/sign-in', { email, password });
      dispatch(login(response.data));
      saveUserTokens(response.data.tokens);
      setLoading(false);
      navigate('/dashboard');
    } catch (error: any) {
      const errorCode = error.response.status;
      setLoading(false);
      switch (errorCode) {
        case 404:
          toast.error('Kullanıcı adı veya şifre hatalı');
          break;
        default:
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="https://myastra.com.tr/wp-content/uploads/2024/10/myastra-logo.png"
            alt="Myastra Logo"
            className="mx-auto h-12 mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-900">Myastra'ya Hoş Geldiniz</h2>
          <p className="mt-2 text-gray-600">Hesabınıza giriş yapın</p>
        </div>

        <div className="bg-FDEAE9 rounded-xl shadow-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
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

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Şifre
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-EF7874 hover:underline"
                >
                  Şifremi Unuttum
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-EF7874 text-white rounded-lg px-4 py-3 font-medium hover:bg-opacity-90 transition-colors duration-200"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Hesabınız yok mu?{' '}
              <Link to="/register" className="text-EF7874 hover:underline font-medium">
                Hemen Kaydolun
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}