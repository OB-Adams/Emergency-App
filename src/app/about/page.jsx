import Header from "../../components/client/Header";
//import Image from "../../../public/images";
import Image from "next/image";

export default function About() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header/>
      <br />
      <main className="bg-amber-50 min-h-screen w-full items-center">
        <h1>About Page</h1>

        <p>About the team</p>
        <div className= "flex space-x-4">
        <Image src="/images/pic.png" width={200} height={200}/>
        <Image src="/images/pic.png" width={200} height={200}/>
        <Image src="/images/pic.png" width={200} height={200}/>
        </div>
     


      </main>
    </div>
  )
}
