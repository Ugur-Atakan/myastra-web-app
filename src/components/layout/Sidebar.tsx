import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/slices/userSlice';
import { LayoutDashboard, Sparkles, Users, HelpCircle, Settings, X, Heart, LogOut, FileText, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { removeTokens } from '../../utils/storage';

interface SidebarProps {
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Ana Sayfa', path: '/dashboard' },
  { icon: Sparkles, label: 'Doğum Haritası', path: '/dashboard/birth-chart' },
  { icon: Heart, label: 'İlişki Analizi', path: '/dashboard/relationship' },
  { icon: UserPlus, label: 'Kişilerim', path: '/dashboard/my-people' },
  { icon: FileText, label: 'Raporlarım', path: '/dashboard/reports' },
  { icon: HelpCircle, label: 'Destek', path: '/dashboard/support' },
  { icon: Settings, label: 'Ayarlar', path: '/dashboard/settings' },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logOut());
      removeTokens();
      toast.success('Başarıyla çıkış yapıldı');
      navigate('/');
    } catch (error) {
      toast.error('Çıkış yapılırken bir hata oluştu');
    }
  };

  return (
    <div className="w-full h-full bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <img
              src="https://myastra.com.tr/wp-content/uploads/2024/10/myastra-logo.png"
              alt="Myastra Logo"
              className="h-8"
            />
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-FDEAE9 text-EF7874'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}