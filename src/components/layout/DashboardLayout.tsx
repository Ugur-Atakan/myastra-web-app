import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import BottomTabs from './BottomTabs';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile menu button */}
      <button
       
        className="lg:hidden fixed bottom-4 left-0 right-0 left-4 z-50 p-2 rounded-lg bg-white shadow-sm"
      >
                    {/* Bottom Tabs */}
          <BottomTabs  openSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-200 ease-in-out fixed lg:sticky top-0 left-0 z-40 h-screen overflow-y-auto`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}