import React, { useState, useRef } from 'react';
import { PRESET_GOALS } from '../constants';

interface GoalInputProps {
  onSubmit: (goal: string) => void;
}

const GoalInput: React.FC<GoalInputProps> = ({ onSubmit }) => {
  const [goal, setGoal] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!goal.trim()) {
      // If goal is empty, focus the textarea to encourage input
      textareaRef.current?.focus();
      return;
    }
    
    onSubmit(goal);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 animate-fade-in flex flex-col items-center">
      
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight text-center">
        What's your 30-day goal?
      </h2>

      {/* Main Card Container - Removed backdrop-blur-sm */}
      <div className="w-full bg-gray-800/80 border border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl">
        
        {/* Text Input */}
        <div className="mb-6">
          <textarea
            ref={textareaRef}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., 'Build upper body strength and add muscle mass to my legs...'"
            className="w-full h-32 bg-gray-900/80 border border-gray-700 text-gray-100 placeholder-gray-500 text-lg rounded-xl p-4 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all resize-none"
          />
        </div>

        {/* Preset Buttons - Added hover:bg-red-600 and hover:border-red-600 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {PRESET_GOALS.map((preset, index) => (
            <button
              key={index}
              onClick={() => setGoal(preset)}
              className="px-4 py-3 bg-gray-700/50 hover:bg-red-600 border border-gray-600 hover:border-red-600 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all text-center flex items-center justify-center h-full"
            >
              {preset.replace('Generate ', '')}
            </button>
          ))}
        </div>

        {/* Dashed Separator */}
        <div className="w-full border-t-2 border-dashed border-yellow-600/20 mb-8"></div>

        {/* Action Button - Removed disabled state and ensured solid styling */}
        <button
          onClick={() => handleSubmit()}
          className="w-full py-4 rounded-xl text-lg font-bold text-white shadow-lg transition-colors duration-200 bg-red-600 hover:bg-red-500 cursor-pointer"
        >
          Find My Workout Videos
        </button>

      </div>
    </div>
  );
};

export default GoalInput;