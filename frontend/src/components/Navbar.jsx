import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuthStore from "../context/AuthContext";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white bg-opacity-80 backdrop-blur-md shadow-sm border-b border-slate-200'>
      <div className='mx-auto flex items-center justify-around h-16'>
        <div className='flex items-center gap-2'>
          <img src='/logo-t.png' alt='Logo' className='h-10 w-auto' />
          <span className='text-lg font-bold bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent'>
            Travel Blogger
          </span>
        </div>

        <div className='hidden md:flex gap-10 font-medium justify-center'>
          <a
            href='/dashboard'
            className='text-slate-600 hover:text-blue-600 transition-colors duration-200'
          >
            Dashboard
          </a>
          <a
            href='/stories'
            className='text-slate-600 hover:text-blue-600 transition-colors duration-200'
          >
            My Stories
          </a>
          <a
            href='/explore'
            className='text-slate-600 hover:text-blue-600 transition-colors duration-200'
          >
            Explore
          </a>
        </div>

        <div className='hidden md:flex items-center gap-3'>
          {user ? (
            <>
              <span className='text-slate-700 font-medium'>
                {user.fullName}
              </span>
              <img
                src={user.avatar || "/pfp.jpeg"}
                alt='User Avatar'
                className='h-8 w-8 rounded-full border border-slate-300'
              />
            </>
          ) : (
            <a
              href='/login'
              className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1 rounded-full hover:shadow-md transition-all duration-200'
            >
              Login
            </a>
          )}
        </div>

        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)} className='text-slate-600'>
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out px-4
    ${
      isOpen
        ? "max-h-60 opacity-100 mt-2 pt-4 border-t border-slate-200"
        : "max-h-0 opacity-0"
    }`}
      >
        <a
          href='/dashboard'
          className='text-slate-600 hover:text-blue-600 transition-colors duration-200'
        >
          Dashboard
        </a>
        <a
          href='/stories'
          className='text-slate-600 hover:text-blue-600 transition-colors duration-200'
        >
          My Stories
        </a>
        <a
          href='/explore'
          className='text-slate-600 hover:text-blue-600 transition-colors duration-200'
        >
          Explore
        </a>

        {user ? (
          <div className='flex items-center gap-3 pb-5'>
            <img
              src={user.avatar || "/pfp.jpeg"}
              alt='User Avatar'
              className='h-8 w-8 rounded-full border border-slate-300'
            />
            <span className='text-slate-700 font-medium'>{user.fullName}</span>
          </div>
        ) : (
          <a
            href='/login'
            className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1 rounded-full hover:shadow-md text-center transition-all duration-200 mb-4'
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
