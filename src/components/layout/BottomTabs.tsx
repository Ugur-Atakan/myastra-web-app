import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Sparkles, Heart, FileText, Menu } from 'lucide-react';

export default function BottomTabs({ openSidebar }: { openSidebar: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Sparkles, label: 'Doğum Haritası', path: '/dashboard/birth-chart' },
    { icon: LayoutDashboard, label: 'Ana Sayfa', path: '/dashboard' },
    { icon: Heart, label: 'İlişki Analizi', path: '/dashboard/relationship' },
    { icon: FileText, label: 'Raporlarım', path: '/dashboard/reports' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t">
      <div className="flex justify-around items-center p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-pink-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
        <button onClick={openSidebar} className="flex flex-col items-center px-3 py-2 text-sm font-medium transition-colors text-gray-500 hover:text-gray-700">
          <Menu className="h-6 w-6" />
          <span className="text-xs">Menü</span>
        </button>
      </div>
    </div>
  );
}
