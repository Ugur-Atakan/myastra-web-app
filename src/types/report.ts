export interface Report {
  id: string;
  userId: string;
  type: 'birth-chart' | 'relationship' | 'single-question';
  title: string;
  description: string;
  status: 'processing' | 'completed';
  pdfUrl?: string;
  createdAt: any; // Firebase Timestamp
  completedAt?: any; // Firebase Timestamp
}

export interface Package{
    id: string;
    astroReportId: string;
    name: string;
    description: string;
    price: number;
    image: string | null;
    createdAt: string;
    deletedAt: string | null;
    isActivate: boolean;
  }