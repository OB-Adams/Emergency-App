'use client';

import Image from 'next/image';
import Link from 'next/link';
import michaelSOS from '../../../public/images/sosButton.png';
import { Button } from '../ui/button';

export default function SOSpage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h5 className="text-lg font-semibold text-center sm:text-xl ">
        Help is just a click away!
      </h5>
      <h5 className="text-lg font-semibold text-center mb-6 sm:text-xl md:mb-8">
        Login to get started!
      </h5>
      <Link href={"/homepage"}>
      <div className="relative">
        <div
          className="animate-zoom transition-transform duration-1000 ease-in-out rounded-full
            w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]"
        >
          <Image
            src={michaelSOS}
            alt="SOS Button"
            width={400} // Set to the largest size
            height={400} // Set to the largest size
            className="rounded-full object-cover"
          />
        </div>
      </div>
      </Link>
      <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8">
        <Link href={"/signup"}>
        <Button
          variant="default"
          className="text-white bg-red-600 w-32 h-12 hover:bg-red-700"
        >
          Sign Up
        </Button>
        </Link>
        <Link href={"/login"}>
        <Button
          variant="outline"
          className="w-32 h-12 border-red-600 text-red-600 hover:bg-red-100"
          
        >
          Login
        </Button>
        </Link>
        
      </div>
    </div>
  );
}