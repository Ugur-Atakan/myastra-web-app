import { useForm } from 'react-hook-form';
import { User, MapPin, Phone, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import instance from '../../http/instance';
import toast from 'react-hot-toast';

interface DeliveryFormProps {
  initialData: {
    fullName: string;
    idNumber: string;
    address: string;
    phone: string;
    email: string;
  };
  onSubmit: (data: any) => void;
}

export default function DeliveryForm({ initialData, onSubmit }: DeliveryFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: initialData
  });

  const [saveAddress, setSaveAddress] = useState(false);
  
  useEffect(() => {
    // Load saved billing info from localStorage if exists
    const savedBillingInfo = localStorage.getItem('billingInfo');
    if (savedBillingInfo) {
      const parsedInfo = JSON.parse(savedBillingInfo);
      Object.keys(parsedInfo).forEach(key => {
        setValue(key, parsedInfo[key]);
      });
    }
  }, [setValue]);

  const handleFormSubmit = async (data: any) => {
    if (saveAddress) {
      try {
        await instance.post('/user/update-me', {
          billingInfo: {
            fullName: data.fullName,
            address: data.address,
            phone: data.phone,
            email: data.email
          }
        });
        localStorage.setItem('billingInfo', JSON.stringify(data));
        toast.success('Fatura bilgileri kaydedildi');
      } catch (error) {
        toast.error('Fatura bilgileri kaydedilemedi');
      }
    }
    const formData = {
      ...data,
      idNumber: '11111111111'
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Fatura Bilgileri</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ad Soyad
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              {...register('fullName', { required: 'Ad soyad zorunludur' })}
              className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent"
              placeholder="Ad Soyad"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fatura Adresi
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
            <textarea
              {...register('address', { required: 'Adres zorunludur' })}
              rows={3}
              className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent"
              placeholder="Adres"
            />
          </div>
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefon
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="tel"
              {...register('phone', { 
                required: 'Telefon zorunludur',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Geçerli bir telefon numarası giriniz'
                }
              })}
              className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent"
              placeholder="5XX XXX XX XX"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-posta
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              {...register('email', { 
                required: 'E-posta zorunludur',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Geçerli bir e-posta adresi giriniz'
                }
              })}
              className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent"
              placeholder="ornek@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={saveAddress}
            onChange={() => setSaveAddress(!saveAddress)}
            className="h-4 w-4 text-EF7874 focus:ring-EF7874 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Bu adresi kaydet
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-EF7874 text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
        >
          Ödeme Ekranına Geç
        </button>
      </div>
    </form>
  );
}