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
    <header className="flex justify-between items-center p-2.5 m-3.5 bg-white h-14 rounded-2xl shadow-[0_4px_6px_rgba(220,38,38,0.3)]">
      <div>
        <Link href={"/"} className="flex items-center">
          <img src="/icons/logo.svg" alt="Emergency Icon" className="w-12 h-12 mr-2" />
          <span className="text-red-600 font-bold">Emergency Response App</span>
        </Link>
      </div>
      <nav className="flex text-red-600 gap-4">
      <Link href={'/'}>  
          <Button
            variant={activeButton === 'home' ? 'default' : 'ghost'}
            onClick={() => handleButtonClick('home')}
            className={"flex flex-col w-auto h-14"}
          >
            <img src="/icons/home.svg" alt="Home" className="w-5 h-5 mr-1" /> 
            Home
          </Button>
        </Link>
        <Link href="/homepage">
          <Button
            variant={activeButton === 'sos' ? 'default' : 'ghost'}
            onClick={() => handleButtonClick('sos')}
            className={"flex flex-col w-auto h-14"}
          >
            <img src="/icons/sos.svg" alt="SOS" className={`w-5 h-5 mr-1`}/>
            SOS
          </Button>
        </Link>  
        <Link href={'/about'}>
          <Button
            variant={activeButton === 'about' ? 'default' : 'ghost'}
            onClick={() => handleButtonClick('about')}
            className={"flex flex-col w-auto h-14"}
          >
            <img src="/icons/about.svg" alt="About" className="w-5 h-5 mr-1" /> About
          </Button>
        </Link>
        <Link href={'/profile'}>
          <Button
            variant={activeButton === 'profile' ? 'default' : 'ghost'}
            onClick={() => handleButtonClick('profile')}
            className={"flex flex-col w-auto h-14"}
          >
            <img src="/icons/profile.svg" alt="Profile" className="w-5 h-5 mr-1" /> Profile
          </Button>
        </Link>
      </nav>
    </header>
  );
}