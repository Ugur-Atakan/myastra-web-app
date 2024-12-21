import { Activity, Briefcase, CalendarRange, Heart, Sparkles } from 'lucide-react';
import instance from '../../http/instance';
import { useEffect, useState } from 'react';

interface DailyHoroscope {
  sign: string;
  date: string;
  horoscope: string;
  love: string;
  career: string;
  health: string;
}

export default function DailyHoroscope({sunSign}: {sunSign: string}) {
  const [dailyHoroscope, setDailyHoroscope] = useState<DailyHoroscope>();
  const [loading, setLoading] = useState(true);


  const getDailyHoroscope = async() => {
    setLoading(true);
   const res= await instance.get(`/astrology/get-daily-by-sign/${sunSign}`);
    const dailyHoroscope= res.data[0];
    console.log("dailyHoroscope",dailyHoroscope); 
    setDailyHoroscope(dailyHoroscope);
    setLoading(false);
  }

  useEffect(() => {
    getDailyHoroscope();
  }
  , []);  

  if(loading){
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Bugün Sizi Neler Bekliyor?</h2>
          </div>
          <Sparkles className="h-6 w-6 text-EF7874" />
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-100 rounded-lg" />
          <div className="h-6 bg-gray-100 rounded-lg" />
          <div className="h-6 bg-gray-100 rounded-lg" />
          <div className="h-6 bg-gray-100 rounded-lg" />
        </div>  
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Bugün Sizi Neler Bekliyor?</h2>
        </div>
        <Sparkles className="h-6 w-6 text-EF7874" />
      </div>

        <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CalendarRange className="h-6 w-6 text-EF7874" />
          <h2 className='text-lg font-semibold text-gray-900'>Genel</h2>
          </div>            <p className="text-gray-600 mb-6">
              {dailyHoroscope?.horoscope}
              </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-EF7874" />
          <h2 className='text-lg font-semibold text-gray-900'>Aşk</h2>
          </div>

            <p className="text-gray-600 mb-6">
              {dailyHoroscope?.love}
              </p>
        </div>

        <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-EF7874" />
          <h2 className='text-lg font-semibold text-gray-900'>Kariyer</h2>
          </div>

            <p className="text-gray-600 mb-6">
              {dailyHoroscope?.career}
              </p>
        </div>
        

        <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-EF7874" />
          <h2 className='text-lg font-semibold text-gray-900'>Sağlık</h2>
          </div>
            <p className="text-gray-600 mb-6">
              {dailyHoroscope?.health}
              </p>
        </div>
    </div>
  );
}