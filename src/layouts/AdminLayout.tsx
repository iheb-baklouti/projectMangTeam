import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';
import { useUser } from '../contexts/UserContext';
import { getNotificationsByUserId } from '../data/mockData';
import { Notification } from '../types';

const AdminLayout = () => {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Close sidebar on mobile when changing routes
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Load notifications for current user
    if (user) {
      const userNotifications = getNotificationsByUserId(user.id);
      setNotifications(userNotifications);
    }
  }, [user]);

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-neutral-800 bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            <Sidebar mobile onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          toggleSidebar={() => setSidebarOpen(prev => !prev)}
          notifications={notifications}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;