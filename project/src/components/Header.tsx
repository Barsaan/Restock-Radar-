import React from 'react';
import { Bell, Plus, User, RefreshCw, Home, LayoutGrid } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onNotificationClick: () => void;
  onAddProductClick: () => void;
  onRefreshAll: () => void;
  onNavigate: (page: 'home' | 'dashboard') => void;
  currentPage: 'home' | 'dashboard';
}

const Header: React.FC<HeaderProps> = ({ 
  onNotificationClick, 
  onAddProductClick, 
  onRefreshAll,
  onNavigate,
  currentPage
}) => {
  return (
    <header className="bg-[#121212] border-b border-gray-800 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <h1 className="ml-2 text-xl font-bold text-white">Restock Radar</h1>
          
          <nav className="ml-8 hidden md:flex space-x-4">
            <button 
              onClick={() => onNavigate('home')}
              className={`flex items-center px-3 py-1 rounded-md transition-colors duration-300 ${
                currentPage === 'home' ? 'bg-gray-800 text-[#00FFFF]' : 'hover:bg-gray-800'
              }`}
            >
              <Home size={16} className="mr-2" />
              Home
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center px-3 py-1 rounded-md transition-colors duration-300 ${
                currentPage === 'dashboard' ? 'bg-gray-800 text-[#00FFFF]' : 'hover:bg-gray-800'
              }`}
            >
              <LayoutGrid size={16} className="mr-2" />
              Dashboard
            </button>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="bg-[#00FFFF] hover:bg-[#33FFFF] text-black font-medium rounded-lg px-4 py-2 flex items-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={onAddProductClick}
          >
            <Plus size={18} className="mr-2" />
            Add Product
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-300 relative"
            onClick={onNotificationClick}
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-[#00FFFF] rounded-full"></span>
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
            onClick={onRefreshAll}
          >
            <RefreshCw size={20} />
          </button>
          
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;