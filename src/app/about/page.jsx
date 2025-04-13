import Header from '../../components/client/Header';
import Image from 'next/image';

export default function About() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header />
      <br />

      <main className="min-h-screen w-full items-center">
        <h1 className="text-center font-bold text-[25px] mt-4 mb-10">About Page</h1>

        <div className="flex flex-col items-center space-y-10">
          {/* First Row: 4 Team Members */}
          <div className="flex justify-center gap-8 w-full max-w-4xl">
            <div className="text-center">
              <Image src="/images/pic.png" width={200} height={200} alt="Team member image" />
              <p className="mt-2">Michael Darko</p>
            </div>
            <div className="text-center">
              <Image src="/images/pic.png" width={200} height={200} alt="Team member image" />
              <p className="mt-2">Delphine Pratt</p>
            </div>
            <div className="text-center">
              <Image src="/images/pic.png" width={200} height={200} alt="Team member image" />
              <p className="mt-2">Emmanuel Ninsin</p>
            </div>
            <div className="text-center">
              <Image src="/images/pic.png" width={200} height={200} alt="Team member image" />
              <p className="mt-2">Alfred Kwawukume</p>
            </div>
          </div>

          {/* Second Row: 4 Team Members */}
          <div className="flex justify-center gap-8 w-full max-w-4xl mb-10">
            <div className="text-center">
              <Image src="/images/pic.png" width={200} height={200} alt="Team member image" />
              <p className="mt-2">Ebenezer Adams</p>
            </div>
            <div className="text-center">
              <Image src="/images/pic.png" width={200} height={200} alt="Team member image" />
              <p className="mt-2">Delphine Camon</p>
            </div>
            <div className="text-center">
              <Image src="/images/pic.png" width={200} height={200} alt="Team member image" />
              <p className="mt-2">Elvis Lamptey</p>
            </div>
            <div className="text-center">
              <Image src="/images/pic.png" width={200} height={200} alt="Team member image" />
              <p className="mt-2">Jedd Fiafor</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}