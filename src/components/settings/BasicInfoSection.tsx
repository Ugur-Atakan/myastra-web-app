import { useState } from 'react';
import { User, Bell, Pencil, Check, X } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { updateUser } from '../../store/slices/userSlice';
import toast from 'react-hot-toast';
import instance from '../../http/instance';

interface BasicInfoProps {
  firstName: string;
  lastName: string;
  notifications: boolean;
}

export default function BasicInfoSection({ firstName, lastName, notifications }: BasicInfoProps) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(notifications);
  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);
  const [loading, setLoading] = useState(false);

  const handleNotificationToggle = async () => {
    try {
      const response = await instance.post('/user/toggle-notifications');
      dispatch(updateUser(response.data));
      setIsNotificationsEnabled(!isNotificationsEnabled);
      toast.success('Bildirim tercihiniz güncellendi');
    } catch (error) {
      toast.error('Bildirim tercihi güncellenirken bir hata oluştu');
    }
  };

  const handleSave = async () => {
    if (!editedFirstName.trim() || !editedLastName.trim()) {
      toast.error('Ad ve soyad alanları boş bırakılamaz');
      return;
    }

    setLoading(true);
    try {
      const response = await instance.post('/user/update-me', {
        firstName: editedFirstName,
        lastName: editedLastName
      });
      
      dispatch(updateUser(response.data));
      toast.success('Bilgileriniz başarıyla güncellendi');
      setIsEditing(false);
    } catch (error) {
      toast.error('Bilgileriniz güncellenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <User className="h-5 w-5 text-EF7874" />
          Temel Bilgiler
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
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
          <input
            type="text"
            value={editedFirstName}
            onChange={(e) => setEditedFirstName(e.target.value)}
            disabled={!isEditing}
            className={`w-full rounded-lg border border-gray-300 px-4 py-2 ${
              !isEditing ? 'bg-gray-50' : 'bg-white focus:ring-2 focus:ring-EF7874 focus:border-transparent'
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
          <input
            type="text"
            value={editedLastName}
            onChange={(e) => setEditedLastName(e.target.value)}
            disabled={!isEditing}
            className={`w-full rounded-lg border border-gray-300 px-4 py-2 ${
              !isEditing ? 'bg-gray-50' : 'bg-white focus:ring-2 focus:ring-EF7874 focus:border-transparent'
            }`}
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-EF7874" />
            <span className="text-sm font-medium text-gray-700">Bildirimleri Etkinleştir</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isNotificationsEnabled}
              onChange={handleNotificationToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-EF7874/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-EF7874"></div>
          </label>
        </div>
      </div>
    </div>
  );
}