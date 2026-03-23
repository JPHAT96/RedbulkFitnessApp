import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] w-full animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <Loader2 className="w-16 h-16 text-red-600 animate-spin relative z-10" />
      </div>
      <h3 className="mt-8 text-2xl font-bold text-white tracking-wide">
        Curating Videos from n8n...
      </h3>
      <p className="text-gray-400 mt-2">Analyzing your goal for maximum gains.</p>
    </div>
  );
};

export default LoadingScreen;
