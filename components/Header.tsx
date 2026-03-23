import React from 'react';

interface HeaderProps {
  onReset?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-12 pb-4">
      <div 
        className="text-center cursor-pointer group"
        onClick={onReset}
        role="button"
        tabIndex={0}
      >
        <h1 className="text-6xl font-black tracking-tighter text-red-600 mb-2 group-hover:text-red-500 transition-colors">
          Red Bulk
        </h1>
        <p className="text-gray-400 text-lg font-medium">
          What is your 30-day fitness goal?
        </p>
      </div>
    </div>
  );
};

export default Header;