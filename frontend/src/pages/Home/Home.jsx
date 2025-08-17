import React from "react";
import Navbar from "../../components/Navbar.jsx";
import Body from "../../components/Body.jsx";
import useAuthStore from "../../context/AuthContext";

function Home() {
  const {isLoading } = useAuthStore();
 
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <div className='flex flex-col items-center'>
          <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
          <p className='mt-4 text-lg font-medium text-gray-700'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
        <Navbar/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Body/>
        </div>
    </div>
  );
}

export default Home;
