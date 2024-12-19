import { useState, useEffect } from 'react';
import { UserPlus, Users, ChevronDown, ChevronUp } from 'lucide-react';
import instance from '../../http/instance';
import { PartnerInfoDto } from '../../types/partner';
import AddPersonModal from '../my-people/AddPersonModal';

interface RelationshipPersonSelectorProps {
  onSelect: (person: PartnerInfoDto) => void;
  selectedPerson: PartnerInfoDto | null;
}

export default function RelationshipPersonSelector({ onSelect, selectedPerson }: RelationshipPersonSelectorProps) {
  const [people, setPeople] = useState<PartnerInfoDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 2;

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await instance.get('/user/my-partners');
      setPeople(response.data);
    } catch (error) {
      console.error('Kişiler yüklenirken bir hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayedPeople = showAll ? people : people.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">İlişki Analizi Yapılacak Kişi</h2>
      <p className="text-gray-600 mb-6">Doğum haritası karşılaştırması yapılacak kişiyi seçin</p>
      
      <div className="space-y-4">
        {/* Kayıtlı kişiler */}
        {displayedPeople.map((person) => (
          <button
            key={person.id}
            onClick={() => onSelect(person)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
              selectedPerson?.id === person.id
                ? 'border-EF7874 bg-FDEAE9'
                : 'border-gray-200 hover:border-EF7874'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-FDEAE9 flex items-center justify-center">
              <span className="text-lg font-medium text-EF7874">
                {person.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-900">{person.name}</p>
              <p className="text-sm text-gray-500">{person.city}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              person.gender === 'MALE' 
                ? 'bg-blue-100 text-blue-600' 
                : person.gender === 'FEMALE'
                ? 'bg-pink-100 text-pink-600'
                : 'bg-purple-100 text-purple-600'
            }`}>
              {person.gender === 'MALE' ? 'Erkek' : person.gender === 'FEMALE' ? 'Kadın' : 'Diğer'}
            </div>
          </button>
        ))}

        {/* Show More/Less Button */}
        {people.length > INITIAL_DISPLAY_COUNT && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full flex items-center justify-center gap-2 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-5 w-5" />
                <span>Daha Az Göster</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-5 w-5" />
                <span>{people.length - INITIAL_DISPLAY_COUNT} Kişi Daha Göster</span>
              </>
            )}
          </button>
        )}

        {/* Yeni kişi ekle */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-EF7874 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <UserPlus className="h-5 w-5 text-gray-600" />
          </div>
          <div className="text-left">
            <p className="font-medium text-gray-900">Yeni Kişi Ekle</p>
            <p className="text-sm text-gray-500">Yeni biri için ilişki analizi yap</p>
          </div>
        </button>
      </div>

      <AddPersonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          fetchPeople();
          setIsModalOpen(false);
        }}
        editingPerson={null}
      />
    </div>
  );
}