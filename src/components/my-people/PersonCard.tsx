import { Pencil, Trash2, Calendar, Clock, MapPin } from 'lucide-react';
import { PartnerInfoDto } from '../../types/partner';

interface PersonCardProps {
  person: PartnerInfoDto;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PersonCard({ person, onEdit, onDelete }: PersonCardProps) {
  const getGenderColor = (gender: string) => {
    switch (gender) {
      case 'MALE':
        return 'bg-blue-100 text-blue-600';
      case 'FEMALE':
        return 'bg-pink-100 text-pink-600';
      default:
        return 'bg-purple-100 text-purple-600';
    }
  };

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case 'MALE':
        return 'Erkek';
      case 'FEMALE':
        return 'Kadın';
      default:
        return 'Diğer';
    }
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
      {/* Top Actions */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          title="Düzenle"
        >
          <Pencil className="h-4 w-4 text-gray-600" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
          title="Sil"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-FDEAE9 flex items-center justify-center">
              <span className="text-xl">{person.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
              <span className={`inline-block px-3 py-1 text-sm rounded-full ${getGenderColor(person.gender)}`}>
                {getGenderLabel(person.gender)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 transition-colors hover:bg-gray-100">
            <Calendar className="h-5 w-5 text-EF7874" />
            <div>
              <p className="text-sm text-gray-500">Doğum Tarihi</p>
              <p className="font-medium">{person.birthDay}/{person.birthMonth}/{person.birthYear}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 transition-colors hover:bg-gray-100">
            <Clock className="h-5 w-5 text-EF7874" />
            <div>
              <p className="text-sm text-gray-500">Doğum Saati</p>
              <p className="font-medium">
                {String(person.birthHour).padStart(2, '0')}:{String(person.birthMinute).padStart(2, '0')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 transition-colors hover:bg-gray-100">
            <MapPin className="h-5 w-5 text-EF7874" />
            <div>
              <p className="text-sm text-gray-500">Doğum Yeri</p>
              <p className="font-medium">{person.city}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}