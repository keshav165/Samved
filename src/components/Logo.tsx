import React from 'react';
import { Heart } from 'lucide-react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 24, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-purple-500 rounded-full p-2" style={{ width: size, height: size }}>
        <Heart
          size={size * 0.6}
          className="text-white absolute"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      </div>
    </div>
  );
};

export default Logo;