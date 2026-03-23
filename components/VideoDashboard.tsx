import React, { useState, useEffect } from 'react';
import { Play, Calendar, Zap } from 'lucide-react';
import { VideoRecommendation } from '../types';

interface VideoDashboardProps {
  recommendations: VideoRecommendation[];
}

const VideoDashboard: React.FC<VideoDashboardProps> = ({ recommendations }) => {
  const [currentVideo, setCurrentVideo] = useState<VideoRecommendation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (recommendations.length > 0) {
      setCurrentVideo(recommendations[0]);
      setIsPlaying(false);
    }
  }, [recommendations]);

  const handleVideoSelect = (video: VideoRecommendation) => {
    setCurrentVideo(video);
    setIsPlaying(false);
  };

  if (!currentVideo) return null;

  // Improved Regex to strictly extract the 11-character video ID
  // Handles standard URLs, short URLs, embeds, and handles query params correctly.
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(currentVideo.videoUrl);
  // Using hqdefault as it is always available.
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Video Player Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800 ring-1 ring-white/10 group">
            
            {!isPlaying && videoId ? (
              // Thumbnail View
              <div 
                className="absolute inset-0 cursor-pointer z-10"
                onClick={() => setIsPlaying(true)}
              >
                <img 
                  src={thumbnailUrl} 
                  alt={currentVideo.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-900/50 transform group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-white font-medium">Click to start workout</p>
                </div>
              </div>
            ) : (
              // Active Player View - using youtube-nocookie to fix "Video Unavailable" issues
              videoId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={currentVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-500">
                   <p>Video ID not found</p>
                </div>
              )
            )}
            
            {/* Fallback if no valid ID found at all */}
            {!videoId && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-500">
                <p>Invalid Video URL</p>
              </div>
            )}

          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 text-xs font-bold text-black bg-yellow-400 rounded-full uppercase tracking-wider">
                Now Playing
              </span>
              <span className="text-red-500 font-medium text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {currentVideo.dayLabel}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{currentVideo.title}</h2>
            <p className="text-gray-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-500" />
              Focus: <span className="text-gray-300">{currentVideo.focus}</span>
            </p>
          </div>
        </div>

        {/* Scrollable Recommendation List */}
        <div className="lg:col-span-1 flex flex-col h-full max-h-[calc(100vh-12rem)] min-h-[400px]">
          <h3 className="text-lg font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            Your Schedule
          </h3>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {recommendations.map((video) => {
              const isActive = currentVideo.id === video.id;
              return (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className={`
                    group relative p-4 rounded-xl cursor-pointer border transition-all duration-300
                    ${isActive 
                      ? 'bg-gray-800 border-red-600 shadow-lg shadow-red-900/20' 
                      : 'bg-gray-800/40 border-gray-700 hover:bg-gray-700 hover:border-gray-600'}
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-l-xl"></div>
                  )}
                  
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <p className={`text-xs font-bold uppercase mb-1 ${isActive ? 'text-red-500' : 'text-gray-500 group-hover:text-gray-400'}`}>
                        {video.dayLabel}
                      </p>
                      <h4 className={`text-sm font-semibold leading-tight mb-2 ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {video.focus}
                      </p>
                    </div>
                    <div className={`
                      mt-1 p-2 rounded-full flex-shrink-0 transition-colors
                      ${isActive ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400 group-hover:bg-gray-600 group-hover:text-white'}
                    `}>
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VideoDashboard;