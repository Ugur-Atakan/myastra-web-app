export interface PartnerInfoDto {
  id: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  name: string;
  city: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour: number;
  birthMinute: number;
  latitude: number;
  longitude: number;
  timeZone: string;
  userId: string;
}