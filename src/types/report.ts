import { OrderStatus } from "./enums";

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
    packageType: string;
  }


  export interface UserReport {
    id: string;
    type: string;
    status: OrderStatus;
    merchant_oid: string;
    createdAt: Date;
    meetLink: string;
    meetingDate: Date;
    documentLink: string;
    packageName: string;
    originalPrice: number;
    discountPrice: number;
    finalPrice: number;
    completedAt: Date;
    packageDescription: string;
    packageImage: string;
    packageId: string;
  }