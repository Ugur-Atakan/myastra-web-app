import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Sparkles, Heart, FileText, Menu } from 'lucide-react';

interface BottomTabsProps {
  openSidebar: () => void;
}

export default function BottomTabs({ openSidebar }: BottomTabsProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Sparkles, label: 'Doğum Haritası', path: '/dashboard/birth-chart' },
    { icon: LayoutDashboard, label: 'Ana Sayfa', path: '/dashboard' },
    { icon: Heart, label: 'İlişki Analizi', path: '/dashboard/relationship' },
    { icon: FileText, label: 'Raporlarım', path: '/dashboard/reports' },
  ];

  return (
    <div className="bg-white border-t border-gray-200 py-2 px-4 safe-area-bottom">
      <div className="flex justify-around items-center">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center min-w-[64px] h-12 cursor-pointer ${
                isActive ? 'text-EF7874' : 'text-gray-500'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </div>
          );
        })}
        <div
          onClick={openSidebar}
          className="flex flex-col items-center justify-center min-w-[64px] h-12 cursor-pointer text-gray-500"
        >
          <Menu className="h-5 w-5" />
          <span className="text-xs mt-1 font-medium">Menü</span>
        </div>
      </div>
    </div>
  );
}