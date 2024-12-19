import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import instance from '../../http/instance';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { PartnerInfoDto } from '../../types/partner';

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingPerson: PartnerInfoDto | null;
}

const initialFormData = {
  name: '',
  gender: 'OTHER' as const,
  birthDay: 1,
  birthMonth: 1,
  birthYear: 2000,
  birthHour: 0,
  birthMinute: 0,
  city: '',
  latitude: 0,
  longitude: 0,
  timeZone: 'Europe/Istanbul',
};

export default function AddPersonModal({ isOpen, onClose, onSuccess, editingPerson }: AddPersonModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "initMap",
    requestOptions: {
      types: ['(cities)'],
      componentRestrictions: { country: 'TR' }
    },
    debounce: 300,
  });

  useEffect(() => {
    if (isOpen) {
      if (editingPerson) {
        setFormData(editingPerson);
        setValue(editingPerson.city);
      } else {
        setFormData(initialFormData);
        setValue('');
      }
    }
  }, [isOpen, editingPerson]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const results = await getGeocode({ address: value });
      const { lat, lng } = await getLatLng(results[0]);
      
      const payload = {
        ...formData,
        city: value,
        latitude: lat,
        longitude: lng,
      };

      if (editingPerson) {
        await instance.post(`/user/edit-partner/${editingPerson.id}`, payload);
        toast.success('Kişi başarıyla güncellendi');
      } else {
        await instance.post('/user/create-partner', payload);
        toast.success('Kişi başarıyla eklendi');
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(editingPerson ? 'Güncelleme başarısız oldu' : 'Ekleme başarısız oldu');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingPerson ? 'Kişiyi Düzenle' : 'Yeni Kişi Ekle'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İsim
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cinsiyet
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['MALE', 'FEMALE', 'OTHER'].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: gender as 'MALE' | 'FEMALE' | 'OTHER' })}
                    className={`py-2 rounded-lg border ${
                      formData.gender === gender
                        ? 'bg-EF7874 text-white border-EF7874'
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    {gender === 'MALE' ? 'Erkek' : gender === 'FEMALE' ? 'Kadın' : 'Diğer'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Doğum Tarihi
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={formData.birthDay}
                    onChange={(e) => setFormData({ ...formData, birthDay: Number(e.target.value) })}
                    className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent appearance-none"
                    required
                  >
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={formData.birthMonth}
                    onChange={(e) => setFormData({ ...formData, birthMonth: Number(e.target.value) })}
                    className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent appearance-none"
                    required
                  >
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={formData.birthYear}
                    onChange={(e) => setFormData({ ...formData, birthYear: Number(e.target.value) })}
                    className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent appearance-none"
                    required
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Doğum Saati
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={formData.birthHour}
                    onChange={(e) => setFormData({ ...formData, birthHour: Number(e.target.value) })}
                    className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent appearance-none"
                    required
                  >
                    {hours.map(hour => (
                      <option key={hour} value={hour}>{String(hour).padStart(2, '0')}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={formData.birthMinute}
                    onChange={(e) => setFormData({ ...formData, birthMinute: Number(e.target.value) })}
                    className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent appearance-none"
                    required
                  >
                    {minutes.map(minute => (
                      <option key={minute} value={minute}>{String(minute).padStart(2, '0')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doğum Yeri
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  disabled={!ready}
                  placeholder="Şehir ara..."
                  className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent"
                  required
                />
                {status === "OK" && (
                  <ul className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {data.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        className="cursor-pointer p-3 hover:bg-gray-100"
                        onClick={() => {
                          setValue(suggestion.description, false);
                          clearSuggestions();
                        }}
                      >
                        {suggestion.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-EF7874 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Kaydediliyor...' : editingPerson ? 'Güncelle' : 'Ekle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}