import { useState } from 'react';
import { Calendar, Clock, MapPin, Pencil, Check, X } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { updateUser } from '../../store/slices/userSlice';
import toast from 'react-hot-toast';
import instance from '../../http/instance';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

interface BirthInfoProps {
  birthDay?: number | null;
  birthMonth?: number | null;
  birthYear?: number | null;
  birthHour?: number | null;
  birthMinute?: number | null;
  city?: string | null;
}

export default function BirthInfoSection({
  birthDay,
  birthMonth,
  birthYear,
  birthHour,
  birthMinute,
  city,
}: BirthInfoProps) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    birthDay: birthDay || 1,
    birthMonth: birthMonth || 1,
    birthYear: birthYear || 2000,
    birthHour: birthHour || 0,
    birthMinute: birthMinute || 0,
  });

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

  const handlePlaceSelect = async (suggestion: any) => {
    setValue(suggestion.description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: suggestion.description });
      await getLatLng(results[0]);
    } catch (error) {
      toast.error('Konum bilgisi alınamadı');
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleSave = async () => {
    if (!value) {
      toast.error('Lütfen doğum yerini seçin');
      return;
    }

    setLoading(true);
    try {
      const results = await getGeocode({ address: value });
      const { lat: latitude, lng: longitude } = await getLatLng(results[0]);
      
      const response = await instance.post('/user/update-me', {
        ...formData,
        city: value,
        latitude,
        longitude,
        timeZone: 'Europe/Istanbul'
      });
      
      dispatch(updateUser(response.data));
      toast.success('Doğum bilgileriniz başarıyla güncellendi');
      setIsEditing(false);
    } catch (error) {
      toast.error('Bilgileriniz güncellenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      birthDay: birthDay || 1,
      birthMonth: birthMonth || 1,
      birthYear: birthYear || 2000,
      birthHour: birthHour || 0,
      birthMinute: birthMinute || 0,
    });
    setValue(city || '');
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-EF7874" />
          Doğum Bilgileri
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Pencil className="h-5 w-5 text-gray-500" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="p-2 hover:bg-green-100 rounded-full transition-colors text-green-600"
            >
              <Check className="h-5 w-5" />
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="p-2 hover:bg-red-100 rounded-full transition-colors text-red-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Birth Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doğum Tarihi
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={formData.birthDay}
                onChange={(e) => setFormData({ ...formData, birthDay: Number(e.target.value) })}
                disabled={!isEditing}
                className={`rounded-lg border border-gray-300 px-2 py-2 ${
                  !isEditing ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select
                value={formData.birthMonth}
                onChange={(e) => setFormData({ ...formData, birthMonth: Number(e.target.value) })}
                disabled={!isEditing}
                className={`rounded-lg border border-gray-300 px-2 py-2 ${
                  !isEditing ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <select
                value={formData.birthYear}
                onChange={(e) => setFormData({ ...formData, birthYear: Number(e.target.value) })}
                disabled={!isEditing}
                className={`rounded-lg border border-gray-300 px-2 py-2 ${
                  !isEditing ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Birth Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doğum Saati
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={formData.birthHour}
                onChange={(e) => setFormData({ ...formData, birthHour: Number(e.target.value) })}
                disabled={!isEditing}
                className={`rounded-lg border border-gray-300 px-2 py-2 ${
                  !isEditing ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                {hours.map(hour => (
                  <option key={hour} value={hour}>{String(hour).padStart(2, '0')}</option>
                ))}
              </select>
              <select
                value={formData.birthMinute}
                onChange={(e) => setFormData({ ...formData, birthMinute: Number(e.target.value) })}
                disabled={!isEditing}
                className={`rounded-lg border border-gray-300 px-2 py-2 ${
                  !isEditing ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                {minutes.map(minute => (
                  <option key={minute} value={minute}>{String(minute).padStart(2, '0')}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Birth Place */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doğum Yeri
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!isEditing || !ready}
                placeholder="Şehir ara..."
                className={`pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 ${
                  !isEditing ? 'bg-gray-50' : 'bg-white'
                }`}
              />
              {status === "OK" && isEditing && (
                <ul className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {data.map((suggestion) => (
                    <li
                      key={suggestion.place_id}
                      className="cursor-pointer p-3 hover:bg-gray-100"
                      onClick={() => handlePlaceSelect(suggestion)}
                    >
                      {suggestion.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="bg-FDEAE9 rounded-lg p-4">
          <p className="text-sm text-EF7874">
            Uyarı: Doğum bilgilerinizi doğru girdiğinizden emin olun. Bu bilgiler astrolojik hesaplamalar için kullanılacaktır.
          </p>
        </div>
      </div>
    </div>
  );
}