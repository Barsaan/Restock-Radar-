import React, { useState } from 'react';
import { RefreshCw, MoreVertical, Trash2, Bell, ExternalLink } from 'lucide-react';
import PlatformIcon from './PlatformIcon';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  inStock: boolean;
  platform: string;
  lastChecked: string;
}

interface ProductCardProps {
  product: Product;
  onRefresh: () => void;
  onRemove: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onRefresh, onRemove }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showAlertSettings, setShowAlertSettings] = useState(false);
  const [priceAlertEnabled, setPriceAlertEnabled] = useState(true);
  const [stockAlertEnabled, setStockAlertEnabled] = useState(true);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onRefresh();
    }, 1000);
  };

  const handleRemove = () => {
    onRemove();
    setShowMenu(false);
  };

  const toggleAlertSettings = () => {
    setShowAlertSettings(!showAlertSettings);
    setShowMenu(false);
  };

  const handleSaveAlerts = () => {
    setShowAlertSettings(false);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]">
      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden bg-gray-800">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <button 
            className="p-1.5 bg-gray-900 bg-opacity-70 rounded-full hover:bg-opacity-100 transition-all duration-300"
            onClick={handleRefresh}
          >
            <RefreshCw size={16} className={`text-white ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <div className="relative">
            <button 
              className="p-1.5 bg-gray-900 bg-opacity-70 rounded-full hover:bg-opacity-100 transition-all duration-300"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical size={16} className="text-white" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-md shadow-lg z-10 py-1">
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"
                  onClick={toggleAlertSettings}
                >
                  <Bell size={14} className="mr-2" />
                  Customize alerts
                </button>
                <a 
                  href="#" 
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"
                >
                  <ExternalLink size={14} className="mr-2" />
                  Visit product page
                </a>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center"
                  onClick={handleRemove}
                >
                  <Trash2 size={14} className="mr-2" />
                  Remove product
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-3 left-3">
          <PlatformIcon platform={product.platform} />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-white line-clamp-2 leading-tight">{product.title}</h3>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-white">{product.price}</span>
          <div className="flex items-center">
            <span 
              className={`inline-block w-2 h-2 rounded-full mr-2 ${
                product.inStock ? 'bg-green-500' : 'bg-red-500'
              } ${product.inStock ? 'animate-pulse' : ''}`}
            ></span>
            <span className={`text-sm ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-gray-400">
          Last checked: {product.lastChecked}
        </div>
      </div>

      {/* Alert Settings Modal */}
      {showAlertSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg w-full max-w-md overflow-hidden shadow-xl">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center">
                <Bell size={18} className="mr-2 text-[#00FFFF]" />
                Alert Settings
              </h2>
              <button 
                onClick={() => setShowAlertSettings(false)}
                className="p-1 rounded-full hover:bg-gray-800 transition-colors duration-300"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-3">PRODUCT DETAILS</h3>
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded overflow-hidden mr-3">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium line-clamp-1">{product.title}</p>
                    <p className="text-sm text-gray-400">{product.price}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-3">ALERT PREFERENCES</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Stock notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={stockAlertEnabled}
                        onChange={() => setStockAlertEnabled(!stockAlertEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FFFF]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Price drop alerts</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={priceAlertEnabled}
                        onChange={() => setPriceAlertEnabled(!priceAlertEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FFFF]"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {priceAlertEnabled && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">PRICE THRESHOLD</h3>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="10"
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Any drop</span>
                      <span>10% off</span>
                      <span>25% off</span>
                      <span>50%+ off</span>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={handleSaveAlerts}
                className="mt-4 w-full bg-[#00FFFF] hover:bg-[#33FFFF] text-black font-medium rounded-lg px-4 py-2 transition-all duration-300"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;