'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState(''); // Track active button

  useEffect(() => {
    const path = pathname || '/';
    switch (path) {
      case '/':
        setActiveButton('home');
        break;
      case '/homepage':
        setActiveButton('sos');
        break;
      case '/about':
        setActiveButton('about');
        break;
      case '/profile':
        setActiveButton('profile');
        break;
      default:
        setActiveButton(null);
    }
  }, [pathname]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Update active button state
    console.log(`Clicked: ${buttonName}`); // Debug log
  };

  return (
    <header className="flex justify-between items-center p-2 m-2 sm:p-3 sm:m-3 md:p-4 md:m-4 bg-white h-12 sm:h-14 md:h-16 rounded-2xl shadow-[0_4px_6px_rgba(220,38,38,0.3)]">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img
            src="/icons/logo.svg"
            alt="Emergency Icon"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          <span className="text-red-600 font-bold text-sm sm:text-base md:text-lg hidden sm:inline">
            Emergency Response App
          </span>
        </Link>
      </div>
      <nav className="flex gap-2 border-2 border-red-400 rounded-xl p-1">
        <Link href="/" className="flex-1">
          <Button
            variant="ghost"
            onClick={() => handleButtonClick('home')}
            className={`w-full flex items-center justify-center hover:cursor-pointer rounded-lg px-4 py-2 tracking-widest ${
              activeButton === 'home'
                ? 'bg-gradient-to-r from-red-500 to-red-700 text-white'
                : 'text-gray-700 hover:bg-red-100'
            }`}
          >
            <img
              src="/icons/home.svg"
              alt="Home"
              className={`w-5 h-5 hover:cursor-pointer mr-2 ${activeButton === 'home' ? 'brightness-0 invert' : ''}`}
            />
            Home
          </Button>
        </Link>
        <Link href="/homepage" className="flex-1">
          <Button
            variant="ghost"
            onClick={() => handleButtonClick('sos')}
            className={`w-full flex items-center justify-center hover:cursor-pointer rounded-lg px-4 py-2 tracking-widest ${
              activeButton === 'sos'
                ? 'bg-gradient-to-r from-red-500 to-red-700 text-white'
                : 'text-gray-700 hover:bg-red-100'
            }`}
          >
            <img
              src="/icons/sos.svg"
              alt="SOS"
              className={`w-5 h-5 hover:cursor-pointer mr-2 ${activeButton === 'sos' ? 'brightness-0 invert' : ''}`}
            />
            SOS
          </Button>
        </Link>
        <Link href="/about" className="flex-1">
          <Button
            variant="ghost"
            onClick={() => handleButtonClick('about')}
            className={`w-full flex items-center justify-center hover:cursor-pointer rounded-lg px-4 py-2 tracking-widest ${
              activeButton === 'about'
                ? 'bg-gradient-to-r from-red-500 to-red-700 text-white'
                : 'text-gray-700 hover:bg-red-100'
            }`}
          >
            <img
              src="/icons/about.svg"
              alt="About"
              className={`w-5 h-5 hover:cursor-pointer mr-2 ${activeButton === 'about' ? 'brightness-0 invert' : ''}`}
            />
            About
          </Button>
        </Link>
        <Link href="/profile" className="flex-1">
          <Button
            variant="ghost"
            onClick={() => handleButtonClick('profile')}
            className={`w-full hover:cursor-pointer flex items-center justify-center rounded-lg px-4 py-2 tracking-widest ${
              activeButton === 'profile'
                ? 'bg-gradient-to-r from-red-500 to-red-700 text-white'
                : 'text-gray-700 hover:bg-red-100'
            }`}
          >
            <img
              src="/icons/profile.svg"
              alt="Profile"
              className={`w-5 h-5 mr-2 ${activeButton === 'profile' ? 'brightness-0 invert' : ''}`}
            />
            Profile
          </Button>
        </Link>
      </nav>
    </header>
  );
}