import { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import TicketList from '../components/support/TicketList';
import NewTicketModal from '../components/support/NewTicketModal';
import { Plus } from 'lucide-react';
import instance from '../http/instance';

export default function Support() {
  const [userTickets, setUserTickets] = useState([]);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/support/my-tickets');
        const ticketsData = response.data;
        console.log('ticketsData', ticketsData);
        setUserTickets(ticketsData);
      } catch (error) {
        console.error('Veriler yüklenirken bir hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-100 rounded-2xl" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Destek</h1>
            <p className="text-gray-600">Size nasıl yardımcı olabiliriz?</p>
          </div>
          <button
            onClick={() => setIsNewTicketModalOpen(true)}
            className="flex items-center gap-2 bg-EF7874 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Yeni Destek Talebi
          </button>
        </div>

        {/* Tickets List */}
        <TicketList tickets={userTickets} loading={loading} />

        {/* New Ticket Modal */}
        <NewTicketModal
          isOpen={isNewTicketModalOpen}
          onClose={() => setIsNewTicketModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}