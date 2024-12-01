import { useForm } from 'react-hook-form';
import { User, MapPin, Phone, Mail, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DeliveryFormProps {
  initialData: {
      fullName: string;
      idNumber: string;
      address: string;
      phone: string;
      email: string
  };
  onSubmit: (data: any) => void;
}

export default function DeliveryForm({ initialData, onSubmit }: DeliveryFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  const [checked, setChecked] = useState(false);


  const saveBillingInfo = (data: any) => {
    if (data.saveAddress) {
      localStorage.setItem('billingInfo', JSON.stringify(data.billingInfo));
    }
  }
  const handleCheckBox = () => {
    setChecked(!checked);
  };

  useEffect(() => {
  if(checked) {
    saveBillingInfo(initialData);
  } else {
    localStorage.removeItem('billingInfo');
  }
  }
  , [checked]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Teslimat Bilgileri</h2>
      
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

        <div className="space-y-6">
        <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
            TC Kimlik No (Fatura için zorunludur)
          </label>
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              {...register('idNumber', { 
                required: 'T.C. Kimlik No zorunludur',
                pattern: {
                  value: /^[0-9]{11}$/,
                  message:'Geçerli bir TC kimlik numarası giriniz'
                }
              })}
              className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent"
              placeholder={'TC Kimlik No'}
            />
        </div>
          </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teslimat Adresi
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
             checked={checked}
             onChange={handleCheckBox}
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