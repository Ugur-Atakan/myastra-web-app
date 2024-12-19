import { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { UserPlus, Pencil, Trash2, Search } from 'lucide-react';
import instance from '../http/instance';
import toast from 'react-hot-toast';
import AddPersonModal from '../components/my-people/AddPersonModal';
import PersonCard from '../components/my-people/PersonCard';
import { PartnerInfoDto } from '../types/partner';

export default function MyPeople() {
  const [people, setPeople] = useState<PartnerInfoDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingPerson, setEditingPerson] = useState<PartnerInfoDto | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await instance.get('/user/my-partners');
      setPeople(response.data);
    } catch (error) {
      toast.error('Kişiler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await instance.delete(`/user/delete-partner/${id}`);
      toast.success('Kişi başarıyla silindi');
      fetchPeople();
    } catch (error) {
      toast.error('Kişi silinirken bir hata oluştu');
    }
  };

  const handleEdit = (person: PartnerInfoDto) => {
    setEditingPerson(person);
    setIsModalOpen(true);
  };

  const filteredPeople = people.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Kişilerim</h1>
            <p className="text-gray-600">Yakınlarınızın doğum bilgilerini yönetin</p>
          </div>
          <button
            onClick={() => {
              setEditingPerson(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-EF7874 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <UserPlus className="h-5 w-5" />
            Yeni Kişi Ekle
          </button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Kişi ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent"
            />
          </div>
        </div>

        {/* People Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredPeople.length === 0 ? (
          <div className="text-center py-12">
            <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz Kişi Eklenmemiş</h3>
            <p className="text-gray-600">
              Yakınlarınızın doğum bilgilerini ekleyerek astrolojik analizler yapabilirsiniz
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPeople.map((person) => (
              <PersonCard
                key={person.name}
                person={person}
                onEdit={() => handleEdit(person)}
                onDelete={() => handleDelete(person.id)}
              />
            ))}
          </div>
        )}

        <AddPersonModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPerson(null);
          }}
          onSuccess={fetchPeople}
          editingPerson={editingPerson}
        />
      </div>
    </DashboardLayout>
  );
}