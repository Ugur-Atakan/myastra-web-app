import { FileText, Clock, Download } from 'lucide-react';
import { UserReport } from '../../types/report';



interface ReportCardProps {
  report: UserReport;
}

const formatOrderStatus= (status:string ) => {
  switch (status) {
    case 'COMPLETED':
      return 'Hazır';
    case 'IN_PROGRESS':
      return 'Hazırlanıyor';
    case 'REJECTED':
      return 'Reddedildi';
    case 'CANCELLED':
      return 'İptal Edildi';
    default:
      return 'Hazırlanıyor';
  }
}

export default function ReportCard({ report }: ReportCardProps) {
  const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-FDEAE9 p-2 rounded-lg">
            <FileText className="h-6 w-6 text-EF7874" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{report.packageName}</h3>
            <p className="text-sm text-gray-500">
              {formatDate(report.createdAt)}
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm ${
          report.status === 'COMPLETED' 
            ? 'bg-green-100 text-green-600' 
            : 'bg-yellow-100 text-yellow-600'
        }`}>
          { formatOrderStatus(report.status)}
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-6">{report.packageDescription}</p>

      {report.status === 'COMPLETED' ? (
        <a
          href={report.documentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-EF7874 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <Download className="h-5 w-5" />
          Raporu İndir
        </a>
      ) : (
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <Clock className="h-5 w-5" />
          <span>2-3 gün içinde hazır olacak</span>
        </div>
      )}
    </div>
  );
}