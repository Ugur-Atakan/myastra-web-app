import { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ReportCard from '../components/reports/ReportCard';
import { FileText } from 'lucide-react';
import instance from '../http/instance';
import { UserReport } from '../types/report';
import toast from 'react-hot-toast';


export default function Reports() {
  const [reports, setReports] = useState<UserReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportsResponse = await instance.get('/user/my-reports');
   
        const reportsData =reportsResponse.data;
        console.log('Raporlar:', reportsData);
        setReports(reportsData);
      } catch (error) {
        console.error('Veriler yüklenirken bir hata oluştu:', error);
        toast.error('Raporlar yüklenirken bir hata oluştu');
        setLoading(false);
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
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Raporlarım</h1>
          <p className="text-gray-600">
            Satın aldığınız astrolojik analizlerin raporları
          </p>
        </div>

        {/* Reports List */}
        { !reports || reports.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="bg-FDEAE9 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-EF7874" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Henüz Raporunuz Bulunmuyor
            </h3>
            <p className="text-gray-600">
              Astrolojik analiz hizmetlerimizden faydalanarak raporlar edinebilirsiniz.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
  
            {reports?.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}