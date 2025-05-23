import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, ChevronDown, User } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { Notification } from '../../types';

interface HeaderProps {
  toggleSidebar: () => void;
  notifications: Notification[];
}

const Header = ({ toggleSidebar, notifications }: HeaderProps) => {
  const { user, logout } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <header className="bg-white border-b border-neutral-200 shadow-sm py-4 px-4 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="md:hidden text-neutral-500 hover:text-neutral-700 focus:outline-none"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-4 md:ml-0 text-lg md:text-xl font-semibold text-neutral-900">
            Sports Club Manager
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              className="relative p-2 text-neutral-500 hover:text-neutral-700 rounded-full hover:bg-neutral-100 focus:outline-none"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-error-500 text-[10px] font-bold text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-dropdown z-40 border border-neutral-200">
                <div className="p-3 border-b border-neutral-100">
                  <h3 className="text-sm font-semibold text-neutral-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="py-2">
                      {notifications.map((notification) => (
                        <Link
                          key={notification.id}
                          to={notification.link || '#'}
                          className={`block px-4 py-3 hover:bg-neutral-50 transition-colors ${
                            !notification.read ? 'bg-primary-50' : ''
                          }`}
                          onClick={() => setShowNotifications(false)}
                        >
                          <div className="flex items-start">
                            <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                              notification.type === 'info' ? 'bg-primary-500' : 
                              notification.type === 'success' ? 'bg-success-500' : 
                              notification.type === 'warning' ? 'bg-warning-500' : 
                              'bg-error-500'
                            }`} />
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-neutral-900">{notification.title}</p>
                              <p className="text-xs text-neutral-500 mt-1">{notification.message}</p>
                              <p className="text-xs text-neutral-400 mt-1">
                                {new Date(notification.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-sm text-neutral-500">No notifications</p>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-neutral-100 text-center">
                  <Link 
                    to="/notifications" 
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                    onClick={() => setShowNotifications(false)}
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile menu */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-neutral-700 focus:outline-none"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img
                className="h-8 w-8 rounded-full border border-neutral-200"
                src={user?.avatar || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                alt={user?.name || "User"}
              />
              <span className="hidden md:block text-sm font-medium">{user?.name}</span>
              <ChevronDown size={16} className="hidden md:block" />
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-dropdown z-40 border border-neutral-200">
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      Your Profile
                    </div>
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <div className="flex items-center">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </div>
                  </Link>
                  <div className="border-t border-neutral-100 my-1"></div>
                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    <div className="flex items-center">
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;