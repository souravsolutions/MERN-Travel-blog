import { useState } from 'react';
import { Mail } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = () => {
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
        <Navbar/>

      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-blue-200 rounded-full opacity-40"></div>
        <div className="absolute top-1/3 left-1/6 w-3 h-3 bg-blue-300 rounded-full opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/6 w-5 h-5 bg-blue-100 rounded-full opacity-50"></div>
        
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-40"></div>
        <div className="absolute top-3/4 right-1/3 w-2.5 h-2.5 bg-blue-200 rounded-full opacity-35"></div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border border-blue-100 rounded-full opacity-20"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-64 h-64 border border-blue-200 rounded-full opacity-30"></div>
        </div>

        <div className="absolute bottom-1/4 right-1/4 transform rotate-45">
          <div className="w-8 h-1 bg-blue-200 rounded-full opacity-40"></div>
        </div>
        <div className="absolute top-1/4 left-1/3 transform -rotate-12">
          <div className="w-6 h-1 bg-blue-300 rounded-full opacity-30"></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="mb-16 relative">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-blue-500 rounded-full relative">
              <div className="absolute -inset-4 border-2 border-blue-500 rounded-full transform rotate-12 opacity-80"></div>
              <div className="absolute -top-2 -left-2 w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="absolute -bottom-3 -right-3 w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="absolute top-1/2 -right-6 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-light mb-8 text-blue-500 tracking-[0.3em]">
          COMING SOON
        </h1>

        <p className="text-gray-400 text-sm md:text-base tracking-[0.2em] mb-20 font-light">
          ARE YOU READY?
        </p>

        <div className="w-full max-w-md">
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR EMAIL"
              className="flex-1 px-6 py-4 border border-gray-200 text-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm tracking-wide"
            />
            <button
              onClick={handleEmailSubmit}
              disabled={isSubmitted}
              className="px-8 py-4 bg-blue-500 text-white font-medium text-sm tracking-wide hover:bg-blue-600 transition-colors duration-200 disabled:opacity-75"
            >
              {isSubmitted ? 'SUBSCRIBED!' : 'NOTIFY ME'}
            </button>
          </div>
          
          {isSubmitted && (
            <p className="text-green-500 text-sm mt-4 tracking-wide">
              Thank you! We'll notify you when we launch.
            </p>
          )}
        </div>
      </div>

      <div className="absolute bottom-20 left-20">
        <div className="flex items-center space-x-2 opacity-30">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="w-8 h-0.5 bg-blue-400"></div>
        </div>
      </div>
      
      <div className="absolute top-32 right-20">
        <div className="flex items-center space-x-2 opacity-30 transform rotate-45">
          <div className="w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
          <div className="w-6 h-0.5 bg-blue-300"></div>
        </div>
      </div>
    </div>
  );
}