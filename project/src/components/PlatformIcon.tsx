import React from 'react';
import { ShoppingBag, ShoppingCart, Target, Store } from 'lucide-react';

interface PlatformIconProps {
  platform: string;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform }) => {
  const getIcon = () => {
    switch (platform.toLowerCase()) {
      case 'amazon':
        return (
          <div className="bg-[#FF9900] p-1.5 rounded-md">
            <ShoppingCart size={14} className="text-black" />
          </div>
        );
      case 'nike':
        return (
          <div className="bg-white p-1.5 rounded-md">
            <ShoppingBag size={14} className="text-black" />
          </div>
        );
      case 'bestbuy':
        return (
          <div className="bg-[#0046BE] p-1.5 rounded-md">
            <ShoppingBag size={14} className="text-white" />
          </div>
        );
      case 'target':
        return (
          <div className="bg-[#CC0000] p-1.5 rounded-md">
            <Target size={14} className="text-white" />
          </div>
        );
      case 'walmart':
        return (
          <div className="bg-[#0071DC] p-1.5 rounded-md">
            <Store size={14} className="text-white" />
          </div>
        );
      default:
        return (
          <div className="bg-gray-600 p-1.5 rounded-md">
            <ShoppingBag size={14} className="text-white" />
          </div>
        );
    }
  };

  return (
    <div className="flex items-center justify-center rounded-md shadow-sm">
      {getIcon()}
    </div>
  );
};

export default PlatformIcon;