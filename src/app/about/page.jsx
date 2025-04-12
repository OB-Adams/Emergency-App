import Header from "../../components/client/Header";
//import Image from "../../../public/images";
import Image from "next/image";

export default function About() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header/>
      <br />

      <main className="bg-amber-50 min-h-screen w-full items-center">
      <h1 className="text-center font-bold text-[25px]">About Page</h1>

        <p>About the team</p>
        <div className= "flex flex-col space-x-4 space-y-20 items-center ">
          <div className="flex">

      
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
   

      <div>
        <Image src="/images/pic.png" width={200} height={200} alt="Team member image"/>
        <p className="mt-2">Ebenezer Adams</p>
      </div>
      <div>
        <Image src="/images/pic.png" width = {200} height={200} alt="Team member image"/>
        <p className="mt-6">Delphine Camon</p>      
      </div>
      <div>
        <Image src="/images/pic.png" width = {200} height={200} alt="Team member image"/>
        <p className="mt-6">Elvis Lamptey</p>      
      </div>
      <div>
        <Image src="/images/pic.png" width = {200} height={200} alt="Team member image"/>
        <p className="mt-6">Jedd Fiafor</p>      
      </div>


          </div>
        </div>
     


      </main>
    </div>
  )
}
