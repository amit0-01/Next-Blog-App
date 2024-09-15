'use client';

import React, { useState } from 'react'
interface User {
    name: string;
  }
  
  interface HeaderProps {
    user?: User;  
    error?: string;
  }
function Header({ user, error }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
  return (
<>
      <nav className="bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="text-white text-2xl font-bold">Blogify</a>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
            <div className={`md:flex items-center ${isOpen ? 'block' : 'hidden'} md:block`}>
              <ul className="flex flex-col md:flex-row items-center">
                <li>
                  <a href="/" className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                </li>
                  <>
                    <li>
                      <a href="/add-blog" className="text-white px-3 py-2 rounded-md text-sm font-medium">Add Blog</a>
                    </li>
                  </>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {error && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-red-500 text-white py-2 px-4 rounded-md">
            {error}
          </div>
        </div>
      )}
    </>  )
}

export default Header