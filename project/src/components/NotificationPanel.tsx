import React, { useState, useEffect } from 'react';
import { X, Mail, MessageCircle, Send, Clock, Bell } from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    emailEnabled: boolean;
    whatsappEnabled: boolean;
    telegramEnabled: boolean;
    frequency: string;
  };
  onSave: (settings: any) => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ 
  isOpen, 
  onClose, 
  settings,
  onSave
}) => {
  const [emailEnabled, setEmailEnabled] = useState(settings.emailEnabled);
  const [whatsappEnabled, setWhatsappEnabled] = useState(settings.whatsappEnabled);
  const [telegramEnabled, setTelegramEnabled] = useState(settings.telegramEnabled);
  const [frequency, setFrequency] = useState(settings.frequency);

  // Update local state when settings prop changes
  useEffect(() => {
    setEmailEnabled(settings.emailEnabled);
    setWhatsappEnabled(settings.whatsappEnabled);
    setTelegramEnabled(settings.telegramEnabled);
    setFrequency(settings.frequency);
  }, [settings]);

  const handleSave = () => {
    onSave({
      emailEnabled,
      whatsappEnabled,
      telegramEnabled,
      frequency
    });
  };

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-80 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-bold flex items-center">
          <Bell size={18} className="mr-2 text-[#00FFFF]" />
          Notification Center
        </h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-800 transition-colors duration-300"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-3">NOTIFICATION CHANNELS</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail size={18} className="mr-3 text-[#00FFFF]" />
              <span>Email Alerts</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={emailEnabled}
                onChange={() => setEmailEnabled(!emailEnabled)}
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FFFF]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle size={18} className="mr-3 text-[#00FFFF]" />
              <span>WhatsApp Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={whatsappEnabled}
                onChange={() => setWhatsappEnabled(!whatsappEnabled)}
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FFFF]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Send size={18} className="mr-3 text-[#00FFFF]" />
              <span>Telegram Updates</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={telegramEnabled}
                onChange={() => setTelegramEnabled(!telegramEnabled)}
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FFFF]"></div>
            </label>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
            <Clock size={16} className="mr-2" />
            NOTIFICATION FREQUENCY
          </h3>
          
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="frequency" 
                value="immediate" 
                checked={frequency === 'immediate'}
                onChange={() => setFrequency('immediate')}
                className="form-radio h-4 w-4 text-[#00FFFF] border-gray-700 focus:ring-[#00FFFF]"
              />
              <span>Immediate (As soon as available)</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="frequency" 
                value="hourly" 
                checked={frequency === 'hourly'}
                onChange={() => setFrequency('hourly')}
                className="form-radio h-4 w-4 text-[#00FFFF] border-gray-700 focus:ring-[#00FFFF]"
              />
              <span>Hourly summary</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="frequency" 
                value="daily" 
                checked={frequency === 'daily'}
                onChange={() => setFrequency('daily')}
                className="form-radio h-4 w-4 text-[#00FFFF] border-gray-700 focus:ring-[#00FFFF]"
              />
              <span>Daily digest</span>
            </label>
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          className="mt-8 w-full bg-[#00FFFF] hover:bg-[#33FFFF] text-black font-medium rounded-lg px-4 py-2 transition-all duration-300"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;