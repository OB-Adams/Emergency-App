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
      <nav className="flex text-red-600 gap-2 sm:gap-4">
        <Link href="/">
          <Button
            variant={activeButton === 'home' ? 'default' : 'ghost'}
            onClick={() => handleButtonClick('home')}
            className={`flex flex-col w-auto h-10 sm:h-12 md:h-14 ${
              activeButton === 'home' ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-red-100'
            }`}
          >
            <img
              src="/icons/home.svg"
              alt="Home"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1"
            />
            Home
          </Button>
        </Link>
        <Link href="/homepage">
          <Button
            variant={activeButton === 'sos' ? 'default' : 'ghost'}
            onClick={() => handleButtonClick('sos')}
            className={`flex flex-col w-auto h-10 sm:h-12 md:h-14 ${
              activeButton === 'sos' ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-red-100'
            }`}
          >
            <img
              src="/icons/sos.svg"
              alt="SOS"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1"
            />
            SOS
          </Button>
        </Link>
        <Link href="/about">
          <Button
            variant={activeButton === 'about' ? 'default' : 'ghost'}
            onClick={() => handleButtonClick('about')}
            className={`flex flex-col w-auto h-10 sm:h-12 md:h-14 ${
              activeButton === 'about' ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-red-100'
            }`}
          >
            <img
              src="/icons/about.svg"
              alt="About"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1"
            />
            About
          </Button>
        </Link>
        <Link href="/profile">
          <Button
            variant={activeButton === 'profile' ? 'default' : 'ghost'}
            onClick={() => handleButtonClick('profile')}
            className={`flex flex-col w-auto h-10 sm:h-12 md:h-14 ${
              activeButton === 'profile' ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-red-100'
            }`}
          >
            <img
              src="/icons/profile.svg"
              alt="Profile"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1"
            />
            Profile
          </Button>
        </Link>
      </nav>
    </header>
  );
}