import React, { useState } from 'react';
import { X, Search, AlertCircle } from 'lucide-react';
import PlatformIcon from './PlatformIcon';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (url: string) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [url, setUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [platform, setPlatform] = useState('');
  const [previewData, setPreviewData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a product URL');
      return;
    }
    
    setError('');
    setIsValidating(true);
    
    // Simulate URL validation and platform detection
    setTimeout(() => {
      setIsValidating(false);
      
      // Detect platform from URL (simplified example)
      if (url.includes('amazon')) {
        setPlatform('amazon');
        setPreviewData({
          title: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
          price: '$348.00',
          image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
          inStock: true
        });
      } else if (url.includes('nike') || url.includes('snkrs')) {
        setPlatform('nike');
        setPreviewData({
          title: "Nike Air Force 1 '07",
          price: '$110.00',
          image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
          inStock: false
        });
      } else if (url.includes('bestbuy')) {
        setPlatform('bestbuy');
        setPreviewData({
          title: 'Apple MacBook Pro 14" Laptop - M3 Pro chip',
          price: '$1,999.00',
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1626&q=80',
          inStock: true
        });
      } else {
        setError('Unsupported platform or invalid product URL');
        setPlatform('');
        setPreviewData(null);
      }
    }, 1500);
  };

  const handleAddProduct = () => {
    if (previewData) {
      onAddProduct(url);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-gray-900 rounded-lg w-full max-w-md overflow-hidden shadow-xl transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-bold">Add New Product</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors duration-300"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="productUrl" className="block text-sm font-medium text-gray-400 mb-1">
                Product URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="productUrl"
                  placeholder="https://www.amazon.com/product/..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search size={18} className="text-gray-500" />
                </div>
              </div>
              {error && (
                <div className="mt-2 text-red-400 text-sm flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {error}
                </div>
              )}
            </div>
            
            <button
              type="submit"
              className={`w-full bg-[#00FFFF] hover:bg-[#33FFFF] text-black font-medium rounded-lg px-4 py-2 transition-all duration-300 ${
                isValidating ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isValidating}
            >
              {isValidating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Validating...
                </span>
              ) : (
                'Validate URL'
              )}
            </button>
          </form>
          
          {previewData && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-400 mb-3">PRODUCT PREVIEW</h3>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden bg-gray-700">
                  <img 
                    src={previewData.image} 
                    alt={previewData.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white line-clamp-1">{previewData.title}</h4>
                    <PlatformIcon platform={platform} />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-white">{previewData.price}</span>
                    <div className="flex items-center">
                      <span 
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          previewData.inStock ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      ></span>
                      <span className={`text-sm ${previewData.inStock ? 'text-green-500' : 'text-red-500'}`}>
                        {previewData.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">NOTIFICATION SETTINGS</h3>
                
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Notify when in stock</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        defaultChecked={true}
                      />
                      <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00FFFF]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notify on price drop</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        defaultChecked={true}
                      />
                      <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00FFFF]"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleAddProduct}
                className="mt-4 w-full bg-[#00FFFF] hover:bg-[#33FFFF] text-black font-medium rounded-lg px-4 py-2 transition-all duration-300"
              >
                Add Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;