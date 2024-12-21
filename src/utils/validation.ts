import { User } from '../types/user';
import toast from 'react-hot-toast';
import instance from '../http/instance';

export const checkBirthDataComplete = (userData: User): boolean => {
  const requiredFields = [
    'birthDay',
    'birthMonth',
    'birthYear',
    'birthHour',
    'birthMinute',
    'city',
    'latitude',
    'longitude'
  ];

  const hasIncompleteData = requiredFields.some(field => !userData[field]);

  if (hasIncompleteData) {
    toast.error('Lütfen önce doğum bilgilerinizi tamamlayın');
    return false;
  }

  return true;
};

export const saveBillingInfo = async (data: any, shouldSave: boolean) => {
  if (!shouldSave) return;
  
  try {
    await instance.post('/user/update-me', {
      billingInfo: {
        idNumber: data.idNumber,
        fullName: data.fullName,
        address: data.address,
        phone: data.phone,
        email: data.email
      }
    });
    toast.success('Fatura bilgileri kaydedildi');
  } catch (error) {
    toast.error('Fatura bilgileri kaydedilemedi');
  }
};