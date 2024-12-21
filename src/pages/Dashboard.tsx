import DashboardLayout from '../components/layout/DashboardLayout';
import DailyHoroscope from '../components/dashboard/DailyHoroscope';
import HeroSection from '../components/dashboard/HeroSection';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { calculateZodiacSign } from '../utils/astrology';
import { UserReport } from '../types/report';
import instance from '../http/instance';

export default function Dashboard() {
    const [sunSign, setSunSign] = useState<string>('');
    const [report, setReports] = useState<UserReport>();
    const userData=useAppSelector((state) => state.user.userData);
  
    useEffect(() => {
      const fetchData = () => {
        const { birthDay, birthMonth} = userData;
        if (!birthDay || !birthMonth) {
          return;
        }
        const sunSign = calculateZodiacSign(birthMonth,birthDay);
        setSunSign(sunSign);
      };
  
      fetchData();
    }, [userData]);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportsResponse = await instance.get('/user/my-reports');
        const reportsData =reportsResponse.data[0];
        setReports(reportsData);
      } catch (error) {
        console.error('Veriler yüklenirken bir hata oluştu:', error);
      } 
    };
    fetchData();
  }, []);
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <HeroSection name={userData.firstName} sunSign={sunSign} latestOrder={report} />
        <div className="grid grid-cols-1 gap-6">
          <DailyHoroscope sunSign={sunSign}  />
       
        </div>
      </div>
    </DashboardLayout>
  );
}