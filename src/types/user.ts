  export interface UserCreate {
  fullName: string;
  email: string;
  createdAt: any; // Firebase Timestamp type
}
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  telephone?: string | null;
  profileImage?: string | null;
  gender?: 'MALE' | 'FEMALE' | 'OTHER'| null;
  birthDay?: number | null;
  birthMonth?: number | null;
  birthYear?: number | null;
  birthHour?: number | null;
  birthMinute?: number | null;
  city?: string | null;
  timeZone?: string;
  latitude?: number | null;
  longitude?: number | null;
  notifications: boolean;
  emailConfirmed: boolean;
  telephoneConfirmed: boolean;
  roles: string[];
  createdAt: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserInterface {
user: User;
tokens: Tokens;
}