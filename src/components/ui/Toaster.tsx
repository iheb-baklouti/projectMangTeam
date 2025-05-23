import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { XCircle, CheckCircle, AlertCircle, Info } from 'lucide-react';

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// Toast interface
interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

// Toast component
const Toast: React.FC<ToastProps> = ({ id, message, type, duration = 3000, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 300); // Start exit animation before removal
    
    const removeTimer = setTimeout(() => {
      onClose(id);
    }, duration);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [duration, id, onClose]);
  
  // Styles based on toast type
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-success-500 text-white';
      case 'error':
        return 'bg-error-500 text-white';
      case 'warning':
        return 'bg-warning-500 text-white';
      case 'info':
        return 'bg-primary-500 text-white';
      default:
        return 'bg-neutral-700 text-white';
    }
  };
  
  // Icons based on toast type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} />;
      case 'error':
        return <XCircle size={18} />;
      case 'warning':
        return <AlertCircle size={18} />;
      case 'info':
        return <Info size={18} />;
      default:
        return null;
    }
  };
  
  return (
    <div
      className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto overflow-hidden transition-all transform ${
        isExiting ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
      } ${getTypeStyles()}`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="inline-flex text-white hover:opacity-80 focus:outline-none focus:ring-1 focus:ring-white"
              onClick={() => {
                setIsExiting(true);
                setTimeout(() => onClose(id), 300);
              }}
            >
              <span className="sr-only">Close</span>
              <XCircle size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast container
const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<Array<Omit<ToastProps, 'onClose'> & { id: string }>>([]);
  
  const removeToast = (id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };
  
  // Expose toast function through window
  useEffect(() => {
    const showToast = (message: string, type: ToastType = 'info', duration = 3000) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((currentToasts) => [...currentToasts, { id, message, type, duration }]);
      return id;
    };
    
    // Attach to window for global access
    window.showToast = showToast;
    
    return () => {
      // @ts-ignore - Cleanup
      delete window.showToast;
    };
  }, []);
  
  return (
    <div className="fixed top-0 right-0 p-4 w-full md:max-w-sm z-50 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

// Declare global interface
declare global {
  interface Window {
    showToast: (message: string, type?: ToastType, duration?: number) => string;
  }
}

export default Toaster;