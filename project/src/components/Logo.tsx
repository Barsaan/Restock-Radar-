import React from 'react';
import { Radar } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-8 h-8 bg-[#00FFFF] rounded-lg">
      <Radar size={20} className="text-black" />
    </div>
  );
};

export default Logo;