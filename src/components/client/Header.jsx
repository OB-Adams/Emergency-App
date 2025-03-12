import { Button } from "../ui/button";


export default function Header() {
    return (
      <header className="flex justify-between items-center p-2.5 m-3.5 bg-white h-14 rounded-2xl drop-shadow-lg shadow-red-600">
        <div className="text-red-600 font-bold">Emergency Response App</div>
        <nav className="flex text-red-600 gap-4">
          <a href="/signup" className="hover:underline">Sign Up</a>
          <a href="/login" className="hover:underline">Login</a>
          <a href="/homepage" className="hover:underline">Home</a>
        </nav>
      </header>
    );
  }