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


export interface PartnerInfo {
  birthYear: number
  birthMonth: number
  birthDay: number
  birthHour: number
  birthMinute: number
  latitude: number
  longitude: number
  city: string
  timezone: string
  name: string
  gender:"MALE"|"FEMALE"|"OTHER"
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
  partnerInfo:PartnerInfo
  couponCode?: string | null;
}

export interface BirthChartUpdateRequest {
  birthYear: number
  birthMonth: number
  birthDay: number
  birthHour: number
  birthMinute: number
  latitude: number
  longitude: number
  city: string
  timezone: string
}


