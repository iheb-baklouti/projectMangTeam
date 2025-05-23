import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { 
  Users, 
  Award, 
  Calendar, 
  BarChart, 
  Settings, 
  LogOut, 
  X, 
  Home, 
  TrendingUp, 
  Aperture 
} from 'lucide-react';

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ mobile = false, onClose }: SidebarProps) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define navigation items based on user role
  const getNavItems = () => {
    const items = [
      { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    ];
    
    if (user?.role === 'super_admin' || user?.role === 'club_admin') {
      items.push({ name: 'Teams', path: '/teams', icon: <Award size={20} /> });
    }
    
    items.push({ name: 'Players', path: '/players', icon: <Users size={20} /> });
    items.push({ name: 'Matches', path: '/matches', icon: <Calendar size={20} /> });
    
    if (user?.role === 'coach' || user?.role === 'analyst') {
      items.push({ name: 'Tactics', path: '/tactics', icon: <Aperture size={20} /> });
    }
    
    items.push({ name: 'Statistics', path: '/statistics', icon: <BarChart size={20} /> });
    
    if (user?.role !== 'player') {
      items.push({ name: 'Performance', path: '/performance', icon: <TrendingUp size={20} /> });
    }
    
    items.push({ name: 'Settings', path: '/settings', icon: <Settings size={20} /> });
    
    return items;
  };
  
  const navItems = getNavItems();
  
  return (
    <div className="h-full w-64 bg-white border-r border-neutral-200 flex flex-col shadow-sidebar">
      {mobile && (
        <div className="p-4 flex justify-end">
          <button onClick={onClose} className="text-neutral-500">
            <X size={24} />
          </button>
        </div>
      )}
      
      <div className="px-6 py-6 flex items-center justify-center border-b border-neutral-100">
        <Link to="/dashboard" className="flex items-center">
          <Aperture className="h-8 w-8 text-primary-600" />
          <span className="ml-2 text-xl font-semibold text-neutral-900">SportsMgr</span>
        </Link>
      </div>
      
      <div className="flex-1 py-6 flex flex-col justify-between">
        <nav className="px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
                             (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                <span className={`mr-3 ${isActive ? 'text-primary-700' : 'text-neutral-500'}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="px-4 mt-6">
          <div className="border-t border-neutral-100 pt-4 space-y-4">
            <div className="px-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user?.avatar || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                    alt={user?.name || "User"}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
                  <p className="text-xs text-neutral-500 capitalize">{user?.role?.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-neutral-600 rounded-lg hover:bg-neutral-50 hover:text-neutral-900"
            >
              <LogOut size={18} className="mr-3 text-neutral-500" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;