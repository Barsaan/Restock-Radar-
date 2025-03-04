import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ToastNotificationProps {
  show: boolean;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ show, message, type, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div 
        className={`rounded-lg shadow-lg p-4 flex items-center space-x-3 ${
          type === 'success' ? 'bg-green-900' : 'bg-red-900'
        }`}
      >
        {type === 'success' ? (
          <CheckCircle size={20} className="text-green-400" />
        ) : (
          <AlertCircle size={20} className="text-red-400" />
        )}
        <p className="text-white">{message}</p>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-black hover:bg-opacity-20 transition-colors duration-300"
        >
          <X size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;