import React, { useState } from 'react';
import Header from './components/Header';
import GoalInput from './components/GoalInput';
import LoadingScreen from './components/LoadingScreen';
import VideoDashboard from './components/VideoDashboard';
import { fetchWorkoutVideos } from './services/workoutService';
import { AppState, VideoRecommendation } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [recommendations, setRecommendations] = useState<VideoRecommendation[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoalSubmit = async (goal: string) => {
    setAppState(AppState.LOADING);
    setErrorMsg(null);
    try {
      const data = await fetchWorkoutVideos(goal);
      setRecommendations(data.videoRecommendations);
      setAppState(AppState.RESULTS);
    } catch (err: any) {
      console.error(err);
      // Use the actual error message if available
      setErrorMsg(err.message || "Failed to connect to n8n webhook. Please check the URL in constants.ts or ensure the webhook is active.");
      setAppState(AppState.ERROR);
    }
  };

  const resetApp = () => {
    setAppState(AppState.INPUT);
    setRecommendations([]);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header onReset={resetApp} />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none -z-0"></div>

        <div className="relative z-10 w-full flex-1 flex flex-col">
          
          {appState === AppState.INPUT && (
            <div className="flex-1 flex items-center justify-center">
              <GoalInput onSubmit={handleGoalSubmit} />
            </div>
          )}

          {appState === AppState.LOADING && (
             <div className="flex-1 flex items-center justify-center">
               <LoadingScreen />
             </div>
          )}

          {appState === AppState.RESULTS && (
            <VideoDashboard recommendations={recommendations} />
          )}

          {appState === AppState.ERROR && (
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center animate-fade-in">
              <div className="bg-red-900/20 p-6 rounded-2xl border border-red-900/50 max-w-md">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Connection Error</h3>
                <p className="text-gray-400 mb-6">{errorMsg || 'An unexpected error occurred.'}</p>
                <button 
                  onClick={resetApp}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-500 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Red Bulk. Power your potential.</p>
      </footer>
    </div>
  );
};

export default App;