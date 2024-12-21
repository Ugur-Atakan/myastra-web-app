import { Mail, Phone, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import instance from '../../http/instance';

interface ContactSectionProps {
  email: string;
  telephone: string | null;
  emailConfirmed: boolean;
  telephoneConfirmed: boolean;
}

export default function ContactSection({ 
  email, 
  telephone, 
  emailConfirmed, 
  telephoneConfirmed 
}: ContactSectionProps) {
  const handleVerifyEmail = async () => {
    try {
      await instance.post('/user/send-verification-email');
      toast.success('Doğrulama e-postası gönderildi');
    } catch (error) {
      toast.error('Doğrulama e-postası gönderilemedi');
    }
  };

  const handleVerifyPhone = async () => {
    try {
      await instance.post('/user/send-verification-sms');
      toast.success('Doğrulama SMS\'i gönderildi');
    } catch (error) {
      toast.error('Doğrulama SMS\'i gönderilemedi');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Mail className="h-5 w-5 text-EF7874" />
        İletişim Bilgileri
      </h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-posta Adresi
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">{email}</span>
              {emailConfirmed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          </div>
          {!emailConfirmed && (
            <button
              onClick={handleVerifyEmail}
              className="text-EF7874 hover:text-opacity-80 text-sm font-medium"
            >
              Doğrula
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon Numarası
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">{telephone || 'Belirtilmemiş'}</span>
              {telephone && (
                telephoneConfirmed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )
              )}
            </div>
          </div>
          {telephone && !telephoneConfirmed && (
            <button
              onClick={handleVerifyPhone}
              className="text-EF7874 hover:text-opacity-80 text-sm font-medium"
            >
              Doğrula
            </button>
          )}
        </div>
      </div>
    </div>
  );
}