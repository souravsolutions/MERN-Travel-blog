import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-200'>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-24 h-24 bg-indigo-100 rounded-full opacity-20 animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-slate-100 rounded-full opacity-25 animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
      </div>

      <div className='flex flex-col items-center relative z-10'>
        
        {/* Enhanced spinner container */}
        <div className="relative mb-6">
          
          {/* Outer decorative ring */}
          <div className="absolute -inset-4 border border-gray-200 rounded-full animate-spin opacity-20" style={{animationDuration: '8s'}}></div>
          
          {/* Main spinner with enhanced styling */}
          <div className='relative w-20 h-20 border-4 border-gradient-to-r from-blue-400 to-indigo-600 border-t-transparent rounded-full animate-spin shadow-lg'>
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" style={{animationDuration: '0.8s', animationDirection: 'reverse'}}></div>
          </div>
          
          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin" style={{animationDuration: '3s'}}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 bg-indigo-400 rounded-full transform -translate-x-1/2"></div>
            <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2"></div>
          </div>
        </div>

        {/* Enhanced loading text */}
        <div className="text-center">
          <p className='text-xl font-semibold text-gray-800 mb-2'>
            Loading<span className="text-blue-500">{dots}</span>
          </p>
          <p className="text-sm text-gray-600 animate-pulse">Please wait a moment</p>
        </div>

        {/* Progress indicator dots */}
        <div className="flex space-x-2 mt-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-gray-300 rounded-full mt-8 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse origin-left">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-ping"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Loading;