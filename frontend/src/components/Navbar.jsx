import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import useAuthStore from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/dashboard" },
    { name: "My Stories", path: "/YourStory" },
    { name: "Upload", path: "/uploadstory" },
    { name: "About", path: "/about" },
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <nav className='bg-white/95 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center gap-3 flex-shrink-0'>
            <img src='/logo-t.png' alt='Logo' className='h-10 w-auto sm:h-11' />
            <span className='text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 bg-clip-text text-transparent tracking-tight'>
              StoryApp
            </span>
          </div>

          {/* Desktop Navigation - Pill Style */}
          <div className='hidden lg:flex items-center'>
            <div className='bg-slate-100/80 backdrop-blur-sm rounded-full p-1.5 border border-slate-200/60 shadow-sm'>
              <div className='flex items-center space-x-1'>
                {navItems.map((item, index) => {
                  const isActive = isActiveRoute(item.path);
                  return (
                    <Link
                      key={index}
                      to={item.path}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-slate-800 text-white shadow-lg"
                          : "text-slate-600 hover:text-slate-800 hover:bg-white/80 hover:shadow-sm"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop User Section */}
          <div className='hidden lg:flex items-center gap-4'>
            {user ? (
              <div className='relative'>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className='flex items-center gap-3 bg-slate-50/90 hover:bg-slate-100/90 rounded-full px-4 py-2.5 border border-slate-200/60 transition-all duration-200 group'
                >
                  <img
                    src={user.avatar || "/pfp.jpeg"}
                    alt='User Avatar'
                    className='h-8 w-8 rounded-full border-2 border-white shadow-sm'
                  />
                  <span className='text-slate-700 font-medium text-sm'>
                    {user.fullName}
                  </span>
                  <FaChevronDown className={`text-slate-500 text-xs transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-slate-200/60 py-2 z-50'>
                    <div className='px-4 py-2 border-b border-slate-100'>
                      <p className='text-sm font-medium text-slate-800'>{user.fullName}</p>
                      <p className='text-xs text-slate-500'>{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className='w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-red-600 transition-colors duration-200'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to='/login'
                className='bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm'
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='lg:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='relative p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-30'
            >
              <div className='relative w-6 h-6'>
                <FaBars
                  size={20}
                  className={`absolute top-0 left-0 transition-all duration-300 ${
                    isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                  }`}
                />
                <FaTimes
                  size={20}
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
            ? "max-h-screen opacity-100 shadow-lg"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className='px-4 py-5 space-y-3'>
          <div className='space-y-2'>
            {navItems.map((item, index) => {
              const isActive = isActiveRoute(item.path);
              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-slate-800"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className='pt-3 border-t border-slate-200/50'>
            {user ? (
              <div className='space-y-3'>
                <div className='flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-lg'>
                  <img
                    src={user.avatar || "/pfp.jpeg"}
                    alt='User Avatar'
                    className='h-10 w-10 rounded-full border-2 border-white shadow-sm'
                  />
                  <div>
                    <span className='block text-slate-800 font-medium'>
                      {user.fullName}
                    </span>
                    <span className='text-slate-500 text-sm'>Logged in</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className='w-full text-left px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium'
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to='/login'
                onClick={() => setIsOpen(false)}
                className='block bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white px-6 py-3 rounded-lg font-medium text-center shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200'
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className='fixed inset-0 z-40' 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
}

export default Navbar;