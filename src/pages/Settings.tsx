import DashboardLayout from '../components/layout/DashboardLayout';
import { useAppSelector } from '../store/hooks';
import BasicInfoSection from '../components/settings/BasicInfoSection';
import PasswordSection from '../components/settings/PasswordSection';
import ContactSection from '../components/settings/ContactSection';
import BirthInfoSection from '../components/settings/BirthInfoSection';

export default function Settings() {
  const userData = useAppSelector((state) => state.user.userData);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Profil Ayarları</h1>
        
        <div className="space-y-6">
          <BasicInfoSection
            firstName={userData.firstName}
            lastName={userData.lastName}
            notifications={userData.notifications}
          />
          
         
          
          <ContactSection
            email={userData.email}
            telephone={userData.telephone}
            emailConfirmed={userData.emailConfirmed}
            telephoneConfirmed={userData.telephoneConfirmed}
          />
          
          <BirthInfoSection
            birthDay={userData.birthDay}
            birthMonth={userData.birthMonth}
            birthYear={userData.birthYear}
            birthHour={userData.birthHour}
            birthMinute={userData.birthMinute}
            city={userData.city}
          />
           <PasswordSection />
        </div>
      </div>
    </DashboardLayout>
  );
}