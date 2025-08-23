import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuthStore from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white/90 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 lg:h-15'>
          <div className='flex items-center gap-3 flex-shrink-0'>
            <img src='/logo-t.png' alt='Logo' className='h-10 w-auto sm:h-12' />
            <span className='text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 bg-clip-text text-transparent tracking-tight'>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-8 xl:space-x-12'>
            <Link
              to='/dashboard'
              className='relative text-slate-600 hover:text-blue-600 font-medium transition-all duration-300 group'
            >
              Dashboard
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-full'></span>
            </Link>
            <Link
              to='/YourStory'
              className='relative text-slate-600 hover:text-blue-600 font-medium transition-all duration-300 group'
            >
              My Stories
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-full'></span>
            </Link>
            <Link
              to='/uploadstory'
              className='relative text-slate-600 hover:text-blue-600 font-medium transition-all duration-300 group'
            >
              Upload-Story
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-full'></span>
            </Link>
          </div>

          {/* Desktop User Section */}
          <div className='hidden lg:flex items-center gap-4'>
            {user ? (
              <div className='flex items-center gap-3 bg-slate-50/80 rounded-full px-4 py-2 border border-slate-200/50'>
                <img
                  src={user.avatar || "/pfp.jpeg"}
                  alt='User Avatar'
                  className='h-9 w-9 rounded-full border-2 border-white shadow-sm ring-2 ring-slate-100'
                />
                <span className='text-slate-700 font-medium text-sm'>
                  {user.fullName}
                </span>
              </div>
            ) : (
              <Link
                to='/login'
                className='bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm'
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='lg:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            >
              <div className='relative w-6 h-6'>
                <FaBars
                  size={22}
                  className={`absolute top-0 left-0 transition-all duration-300 ${
                    isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                  }`}
                />
                <FaTimes
                  size={22}
                  className={`absolute top-0 left-0 transition-all duration-300 ${
                    isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/50 transition-all duration-300 ease-out ${
          isOpen
            ? "max-h-screen opacity-100 shadow-xl"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className='px-4 py-6 space-y-4'>
          <div className='space-y-3'>
            <Link
              to='/dashboard'
              className='block px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl font-medium transition-all duration-200 border border-transparent hover:border-blue-100'
            >
              Dashboard
            </Link>
            <Link
              to='/YourStory'
              className='block px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl font-medium transition-all duration-200 border border-transparent hover:border-blue-100'
            >
              My Stories
            </Link>
            <Link
              to='/uploadstory'
              className='block px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl font-medium transition-all duration-200 border border-transparent hover:border-blue-100'
            >
              Upload-Story
            </Link>
          </div>

          <div className='pt-3 border-t border-slate-200/50'>
            {user ? (
              <div className='flex items-center gap-4 px-4 py-3 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl border border-slate-200/50'>
                <img
                  src={user.avatar || "/pfp.jpeg"}
                  alt='User Avatar'
                  className='h-12 w-12 rounded-full border-2 border-white shadow-md ring-2 ring-slate-100'
                />
                <div>
                  <span className='block text-slate-800 font-semibold text-base'>
                    {user.fullName}
                  </span>
                  <span className='text-slate-500 text-sm'>Logged in</span>
                </div>
              </div>
            ) : (
              <Link
                to='/login'
                className='block bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold text-center shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200'
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
