'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '../../components/client/Header';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";


export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle loading state
  if (status === 'loading') {
    return (
      <div className="font-[family-name:var(--font-geist-sans)] flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Protect the route: redirect to login if unauthenticated
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  // Sign-out handler
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      toast.success('Signed out successfully!', {
        duration: 3000,
        className: 'bg-green-500 text-white border border-green-700 rounded-xl shadow-md',
        descriptionClassName: 'text-sm font-medium',
      });
      router.push('/login');
    } catch (error) {
      toast.error('An error occurred while signing out.', {
        duration: 3000,
        className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
        descriptionClassName: 'text-sm font-medium',
      });
    }
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="bg-white p-4 min-h-screen rounded-2xl border border-gray-200 m-3.5 px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4 ml-4">Your Profile</h1>
      <p className="text-gray-700 mb-6 ml-4 text-lg">Welcome, {session.user.name || 'User'}!</p>
      <Accordion type="single" collapsible className="w-full px-4">
      <AccordionItem value="item-1">
        <AccordionTrigger className={"text-xl"}>Account Details</AccordionTrigger>
        <AccordionContent>
          <div>
              <label className="block text-gray-700 font-bold mb-0.5">Full Name</label>
              <p className="text-gray-900 p-2 border rounded-lg mb-0.5">
                {session.user.name || 'Not provided'}
              </p>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-0.5">Email</label>
              <p className="text-gray-900 p-2 border rounded-lg mb-0.5">
                {session.user.email || 'Not provided'}
              </p>
            </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className={"text-xl"}>Settings</AccordionTrigger>
        <AccordionContent>
          We will implement "theming" here
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className={"text-xl"}>About</AccordionTrigger>
        <AccordionContent>
          <a href="/about">Read more about this emergency application</a>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
        <Button
          onClick={handleSignOut}
          className="w-full h-12 bg-red-600 text-white text-xl p-2 rounded-full hover:bg-red-700 mt-6"
        >
          Sign Out
        </Button>
      </main>
    </div>
  );
}