import { Activity, Briefcase, CalendarRange, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import instance from '../../http/instance';
import { DailyHoroscope as DailyHoroscopeType } from '../../types/horoscope';
import { DailyHoroscopeSkeleton } from './DailyHoroscopeSkeleton';

interface DailyHoroscopeProps {
  sunSign: string;
}

export default function DailyHoroscope({ sunSign }: DailyHoroscopeProps) {
  const [dailyHoroscope, setDailyHoroscope] = useState<DailyHoroscopeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDailyHoroscope = async () => {
      if (!sunSign) {
        setError('Burç bilgisi bulunamadı');
        setLoading(false);
        return;
      }

      try {
        const response = await instance.get(`/horoscope/daily/${sunSign}`);
        setDailyHoroscope(response.data);
      } catch (error) {
        setError('Günlük burç yorumu yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    getDailyHoroscope();
  }, [sunSign]);

  if (loading) {
    return <DailyHoroscopeSkeleton />;
  }

  if (error || !dailyHoroscope) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <p className="text-gray-600 text-center">{error || 'Burç yorumu bulunamadı'}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Bugün Sizi Neler Bekliyor?</h2>
        </div>
      </div>

      <div className="space-y-6">
        <HoroscopeSection
          icon={CalendarRange}
          title="Genel"
          content={dailyHoroscope.horoscope}
        />
        <HoroscopeSection
          icon={Heart}
          title="Aşk"
          content={dailyHoroscope.love}
        />
        <HoroscopeSection
          icon={Briefcase}
          title="Kariyer"
          content={dailyHoroscope.career}
        />
        <HoroscopeSection
          icon={Activity}
          title="Sağlık"
          content={dailyHoroscope.health}
        />
      </div>
    </div>
  );
}

interface HoroscopeSectionProps {
  icon: React.ElementType;
  title: string;
  content: string;
}

function HoroscopeSection({ icon: Icon, title, content }: HoroscopeSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className="h-6 w-6 text-EF7874" />
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}