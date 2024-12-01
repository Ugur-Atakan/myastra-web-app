export interface BirthChart {
  userId: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  birthHour: number;
  birthMinute: number;
  birthPlace: {
    city: string;
    latitude: number;
    longitude: number;
  };
  createdAt: any; // Firebase Timestamp
}
export interface BuyPackageRequest {
  packageId: string;
  billingInfo: {
    idNumber: string;
    fullName: string;
    address: string;
    phone: string;
    email: string;
  };
}


